from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, func, Numeric
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

    estadisticas = relationship("Estadistica", back_populates="usuario", cascade="all, delete-orphan")
    inscripciones = relationship("Inscripcion", back_populates="usuario", cascade="all, delete-orphan")


# Modelo para la tabla "estadisticas"
class Estadistica(Base):
    __tablename__ = "estadisticas"

    estadistica_id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.usuario_id", ondelete="CASCADE"), nullable=False)
    lecciones_vocabulario = Column(Integer, default=0)
    lecciones_gramatica = Column(Integer, default=0)
    lecciones_habla = Column(Integer, default=0)
    fecha_actualizacion = Column(DateTime, server_default=func.now(), onupdate=func.now())

    usuario = relationship("Usuario", back_populates="estadisticas")

class Leccion(Base):
    __tablename__ = "lecciones"

    leccion_id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(100))
    contenido = Column(String(500))
    tipo = Column(String(50))
    fecha_creacion = Column(DateTime, server_default=func.now())

    # Relación con usuarios
    curso_id = Column(Integer, ForeignKey("cursos.curso_id", ondelete="CASCADE"), nullable=False)
    usuario = relationship("cursos", back_populates="lecciones")

class Curso(Base):
    __tablename__ = "cursos"

    curso_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    fecha_ultima_actualizacion = Column(DateTime, server_default=func.now())

    lecciones = relationship("Leccion", back_populates="curso", cascade="all, delete-orphan")
    inscripciones = relationship("Inscripcion", back_populates="curso", cascade="all, delete-orphan")

class Inscripcion(Base):
    __tablename__ = "inscripciones"

    inscripcion_id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.usuario_id", ondelete="CASCADE"), nullable=False)
    curso_id = Column(Integer, ForeignKey("cursos.curso_id", ondelete="CASCADE"), nullable=False)
    fecha_inscripcion = Column(DateTime, server_default=func.now())
    progreso = Column(Numeric(5,2), default=0)

    usuario = relationship("Usuario", back_populates="inscripciones")
    curso = relationship("Curso", back_populates="inscripciones")