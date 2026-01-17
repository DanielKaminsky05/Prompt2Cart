from fastapi import FastAPI, Query
from dto.search import SearchRequest
from enums.sort import SortBy

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI running with uv!"}

@app.get("/search")
def search(
    req: SearchRequest,
    limit: int = Query(default=10, ge=1, le=100),
    sort_order: str = Query(default=SortBy.RELEVANCE)
):
    return {
            "message": req.query,
            "limit": limit,
            "sort_order": sort_order
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8080, reload=True)
