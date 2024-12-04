
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import gridfs

uri = "mongodb+srv://manuelyepto:JoH6QOpGbJqVApID@cluster0.22o7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["Activitys&Answers"]
collection = db["English"]

document = [
  {
    "type": "Grammar",
    "lesson": "Verb to be",
    "questions": [
      {
        "q": "I ___ a student.",
        "options": ["is", "am", "are", "was"],
        "answer": 1
      },
      {
        "q": "She ___ my sister.",
        "options": ["is", "are", "am", "were"],
        "answer": 0
      },
      {
        "q": "They ___ friends.",
        "options": ["is", "are", "am", "was"],
        "answer": 1
      },
      {
        "q": "We ___ in the same class.",
        "options": ["is", "are", "am", "was"],
        "answer": 1
      },
      {
        "q": "You ___ very smart.",
        "options": ["is", "are", "am", "was"],
        "answer": 1
      }
    ],
    "level": "A1"
  },
  {
    "type": "Grammar",
    "lesson": "Present tense",
    "questions": [],
    "level": "A1"
  }
]

docu = {
    "type": "Vocabulary",
    "lesson": "The Family",
    "questions": [],
    "level": "A1"
}

#collection.insert_many(document)
#collection.insert_one(docu)

#collection.drop()

for doc in collection.find():
    print(doc)