
import os
import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

class AsyncAnalyticsClient:
    """
    Async client for logging analytics events to MongoDB.
    Uses 'motor' for non-blocking I/O with FastAPI.
    """
    def __init__(self):
        self.client = None
        self.db = None
        self.collection = None
        self.enabled = False

    async def initialize(self):
        """Initialize connection to MongoDB."""
        uri = os.getenv("MONGODB_URI")
        if not uri:
            print("⚠️ Analytics disabled: MONGODB_URI not found in .env")
            return

        try:
            self.client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=5000)
            # Verify connection
            await self.client.admin.command('ping')
            
            db_name = os.getenv("MONGODB_DB_NAME", "Travado")
            self.db = self.client[db_name]
            self.collection = self.db["user_events"]
            self.enabled = True
            print(f"✅ Analytics initialized. Connected to MongoDB: {db_name}")
        except Exception as e:
            print(f"⚠️ Analytics initialization failed: {e}")
            self.enabled = False

    async def log_event(self, event_type: str, user_id: str, data: dict = None):
        """
        Log an event to the database asynchronously.
        
        Args:
            event_type: e.g., "search", "checkout_initiated", "view_product"
            user_id: Unique identifier for the user
            data: Arbitrary JSON-serializable dictionary with event details
        """
        if not self.enabled or not self.collection:
            return

        event_doc = {
            "event_type": event_type,
            "user_id": user_id,
            "timestamp": datetime.datetime.now(datetime.timezone.utc),
            "data": data or {}
        }

        try:
            await self.collection.insert_one(event_doc)
            # print(f"📊 Logged event: {event_type} for {user_id}") # Optional logging
        except Exception as e:
            print(f"❌ Failed to log event: {e}")

    async def get_user_insights(self, user_id: str) -> dict:
        """
        Aggregate user events to derive insights (e.g., top searched categories).
        Returns a dictionary of insights.
        """
        if not self.enabled:
            return {}

        # Example: Simple aggregation of search queries
        # In a real system, you'd use a more complex aggregation pipeline
        try:
            cursor = self.collection.find(
                {"user_id": user_id, "event_type": "search"}
            ).sort("timestamp", -1).limit(5)
            
            recent_searches = []
            async for doc in cursor:
                query = doc.get("data", {}).get("query")
                if query:
                    recent_searches.append(query)
            
            return {
                "recent_searches": recent_searches
            }
        except Exception as e:
            print(f"❌ Failed to get insights: {e}")
            return {}

    async def cleanup(self):
        if self.client:
            self.client.close()
