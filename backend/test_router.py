import asyncio
import os
from dotenv import load_dotenv
from mcp_agent import MCPLangGraphAgent

# Load environment variables
load_dotenv()

async def main():
    print("Initializing Agent with Router...")
    agent = MCPLangGraphAgent()
    await agent.initialize()

    # Test Cases - Reordered to test pure generation first
    queries = [
        "Give me some creative gift ideas for my dad who loves hiking (Use Gemini)", 
        "Compare the technical specifications of Python vs Rust in a table (Use OpenAI)",
        # "Find me red running shoes under $100",  # Skipping tool call for now to isolate Router
    ]

    print("\n--- Testing Router Logic ---\n")
    for q in queries:
        print(f"Query: {q}")
        try:
            result = await agent.chat(q, thread_id=f"test_{hash(q)}")
            print(f"Result (First 100 chars): {result[:100]}...\n")
        except Exception as e:
            print(f"Query failed: {e}")
        print("-" * 30)

    await agent.cleanup()

if __name__ == "__main__":
    asyncio.run(main())
