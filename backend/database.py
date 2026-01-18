import os
from dotenv import load_dotenv
from pymongo import MongoClient
import datetime

load_dotenv()

_client = None
_db_name = "Travado" # Default db name, can be changed

def get_database():
    global _client
    if _client is None:
        uri = os.getenv("MONGODB_URI")
        if not uri:
            print("Error: MONGODB_URI not found in environment variables.")
            return None
        try:
            _client = MongoClient(uri, serverSelectionTimeoutMS=5000)
            # Trigger a connection to verify
            _client.admin.command('ping')
            print("Connected to MongoDB.")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            _client = None
    
    if _client:
        return _client[_db_name]
    return None

def add_search_history(user_id: str, query: str):
    """
    Adds a search query to the user's history.
    """
    if not user_id or not query:
        return

    db = get_database()
    if db is None:
        print("Database unavailable, skipping history save.")
        return

    try:
        collection = db["search_history"]
        doc = {
            "user_id": user_id,
            "query": query,
            "timestamp": datetime.datetime.now(datetime.timezone.utc)
        }
        collection.insert_one(doc)
        print(f"Saved search history for user {user_id}")
    except Exception as e:
        print(f"Error saving search history: {e}")

def get_search_history(user_id: str, limit: int = 5):
    """
    Retrieves the most recent search history for a user.
    """
    if not user_id:
        return []

    db = get_database()
    if db is None:
        return []

    try:
        collection = db["search_history"]
        cursor = collection.find(
            {"user_id": user_id}
        ).sort("timestamp", -1).limit(limit)
        
        return [doc["query"] for doc in cursor]
    except Exception as e:
        print(f"Error retrieving search history: {e}")
        return []
