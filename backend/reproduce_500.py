
import asyncio
import traceback
from mcp_agent import MCPLangGraphAgent
from dotenv import load_dotenv
import os

load_dotenv()

async def reproduce():
    print("Testing Agent connection...")
    try:
        agent = MCPLangGraphAgent("servers_config.json")
        await agent.initialize()
        print("Agent initialized.")
        
        query = "i have back pains and a maximum of 200 dollars"
        print(f"Running query: {query}")
        
        # Mimic util.search_products behavior
        # But calling agent.chat directly first
        response = await agent.chat(query, thread_id="debug_session")
        print(f"Response: {response}")
        
        await agent.cleanup()
        
    except Exception:
        print("CAUGHT EXCEPTION:")
        traceback.print_exc()

async def test_database():
    print("\nTesting Database Import...")
    try:
        from database import get_search_history
        print("Database module imported.")
        hist = get_search_history("")
        print(f"History for empty user: {hist}")
    except Exception:
        print("DATABASE ERROR:")
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(reproduce())
    asyncio.run(test_database())
