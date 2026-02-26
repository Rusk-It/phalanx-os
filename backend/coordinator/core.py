# backend/coordinator/core.py
# FastAPI entrypoint for Phalanx OS — Rusk-It Edition
# This is the main app file that Uvicorn runs: uvicorn coordinator.core:app --reload

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .agents import run_phalanx  # Import from the same folder (agents.py)

app = FastAPI(
    title="Phalanx OS API",
    description="Grok 4.2 Multi-Agent AI Special Forces Wallet Backend",
    version="0.1.0",
    docs_url="/docs",  # Swagger UI at /docs
)

class PhalanxRequest(BaseModel):
    intent: str
    wallet: str | None = None

@app.post("/phalanx/execute")
async def execute_phalanx(request: PhalanxRequest):
    """
    Main endpoint: Send an intent (e.g. "Optimize 10k USDC yield on Base")
    The 4 agents debate → return consensus action.
    """
    try:
        result = await run_phalanx(request.intent, request.wallet)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "agents": "online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("coordinator.core:app", host="0.0.0.0", port=8000, reload=True)
