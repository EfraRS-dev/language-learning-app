from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, List
from models import Usuario as User

from db_config import SessionLocal, client
from crud import crear_usuario, obtener_usuario_por_id, actualizar_estadisticas, obtener_usuario_por_username
db = client["LLA"]
collection = db["English"]

# Secret key to encode and decode JWT tokens
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    #allow_origins=["http://127.0.0.1:5500"],  # Permite el origen desde tu frontend
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los encabezados HTTP
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    usuario_id: int
    nombre: str
    email: str
    username: str

class UpdateStats(BaseModel):
    vocabulario: int
    gramatica: int
    habla: int

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    
class Question(BaseModel):
    q: str
    options: List[str]
    answer: int

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Utility functions for JWT
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return bcrypt.verify(plain_password, hashed_password)

# def get_user(db, username: str):
#     return obtener_usuario_por_id(db, username)

def authenticate_user(db, username: str, password: str):
    user = obtener_usuario_por_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = obtener_usuario_por_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# Get a user by ID endpoint
@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    usuario = obtener_usuario_por_id(db, user_id)
    if usuario is None:
        raise HTTPException(status_code=404, detail="User not found")
    return usuario

# Update user statistics endpoint
@app.put("/users/{user_id}/stats")
def update_stats(user_id: int, stats: UpdateStats, db: Session = Depends(get_db)):
    actualizar_estadisticas(db, user_id, stats.vocabulario, stats.gramatica, stats.habla)
    return {"message": "Statistics updated"}

# Login endpoint
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Protected endpoint example
@app.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: UserResponse = Depends(get_current_user)):
    return current_user

# Get questions endpoint
@app.get("/questions/{lesson_id}", response_model=List[Question])
async def get_questions(lesson_id: int):
    lesson = collection.find_one({"lessonID": lesson_id})
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson.get("questions", [])

# Register endpoint
@app.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el nombre de usuario ya está registrado
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre de usuario ya está registrado.",
        )

    # Verificar si el correo electrónico ya está registrado
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado.",
        )

    hashed_password = bcrypt.hash(user.password)

    nuevo_usuario = crear_usuario(db, user.email, user.username, hashed_password)

    return nuevo_usuario

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)