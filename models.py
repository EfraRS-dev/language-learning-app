from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from db_config import Base

# Modelo para la tabla "usuarios"
class Usuario(Base):
    __tablename__ = "usuarios"

    usuario_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    email = Column(String(150), unique=True, nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    fecha_registro = Column(DateTime, server_default=func.now())
    activo = Column(Boolean, default=True)

    # Relación con estadísticas
    estadisticas = relationship("Estadistica", back_populates="usuario", cascade="all, delete-orphan")


# Modelo para la tabla "estadisticas"
class Estadistica(Base):
    __tablename__ = "estadisticas"

    estadistica_id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.usuario_id", ondelete="CASCADE"), nullable=False)
    lecciones_vocabulario = Column(Integer, default=0)
    lecciones_gramatica = Column(Integer, default=0)
    lecciones_habla = Column(Integer, default=0)
    fecha_actualizacion = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relación inversa
    usuario = relationship("Usuario", back_populates="estadisticas")
