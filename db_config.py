from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

# Configuración de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://lla_postgres_user:xmuCB30yr8m80h1PEHM4nk8g4HmuBMPX@dpg-ct7os2pu0jms73apm8k0-a.oregon-postgres.render.com/lla_postgres")

# Crear el motor de conexión
engine = create_engine(DATABASE_URL)

# Sesión para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base para los modelos
Base = declarative_base()

uri = "mongodb+srv://manuelyepto:JoH6QOpGbJqVApID@cluster0.22o7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(e)

