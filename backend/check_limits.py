
import os
import asyncio
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

async def check_cerebras():
    print("\n1. Checking CEREBRAS...")
    try:
        llm = ChatOpenAI(
            model="llama-3.3-70b",
            base_url="https://api.cerebras.ai/v1",
            api_key=os.getenv("CEREBRAS_API_KEY"),
            max_retries=0
        )
        await llm.ainvoke("hi")
        print("✅ Cerebras OK")
    except Exception as e:
        print(f"❌ Cerebras FAILED: {e}")

async def check_openai():
    print("\n2. Checking OPENAI...")
    try:
        llm = ChatOpenAI(
            model="gpt-4o-mini",
            api_key=os.getenv("OPENAI_API_KEY"),
            max_retries=0
        )
        await llm.ainvoke("hi")
        print("✅ OpenAI OK")
    except Exception as e:
        print(f"❌ OpenAI FAILED: {e}")

async def check_gemini():
    print("\n3. Checking GEMINI...")
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash-exp",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            max_retries=0
        )
        await llm.ainvoke("hi")
        print("✅ Gemini OK")
    except Exception as e:
        print(f"❌ Gemini FAILED: {e}")

async def main():
    await check_cerebras()
    await check_openai()
    await check_gemini()

if __name__ == "__main__":
    asyncio.run(main())
