from sqlalchemy.orm import Session
from models import Usuario, Estadistica

# Crear un nuevo usuario
def crear_usuario(db: Session, email: str, username: str, password_hash: str):
    nuevo_usuario = Usuario(nombre= "Jhon Doe", email=email, username=username, password_hash=password_hash)
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

# Obtener un usuario por ID
def obtener_usuario_por_id(db: Session, usuario_id: int):
    return db.query(Usuario).filter(Usuario.usuario_id == usuario_id).first()

# Obtener un usuario por username
def obtener_usuario_por_username(db: Session, usuario_username: str):
    return db.query(Usuario).filter(Usuario.username == usuario_username).first()

# Actualizar estadísticas
def actualizar_estadisticas(db: Session, usuario_id: int, vocabulario: int, gramatica: int, habla: int):
    estadistica = db.query(Estadistica).filter(Estadistica.usuario_id == usuario_id).first()
    if estadistica:
        estadistica.lecciones_vocabulario += vocabulario
        estadistica.lecciones_gramatica += gramatica
        estadistica.lecciones_habla += habla
        db.commit()
        db.refresh(estadistica)
        return estadistica
    return None
