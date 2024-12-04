from db_config import SessionLocal
from crud import crear_usuario, obtener_usuario_por_id, actualizar_estadisticas
from passlib.hash import bcrypt
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

# Secret key to encode and decode JWT tokens
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# Crear una nueva sesión
db = SessionLocal()

# Crear un usuario
password_hash = bcrypt.hash("password123")  # Usa bcrypt para generar el hash
nuevo_usuario = crear_usuario(db, "Juan Pérez", "juan.perez@example.com", "juan123", password_hash)
print(f"Usuario creado: {nuevo_usuario.username}")

# Consultar un usuario
usuario = obtener_usuario_por_id(db, nuevo_usuario.usuario_id)
print(f"Usuario obtenido: {usuario.nombre}")

# Actualizar estadísticas
actualizar_estadisticas(db, usuario.usuario_id, vocabulario=5, gramatica=3, habla=2)
print("Estadísticas actualizadas.")
