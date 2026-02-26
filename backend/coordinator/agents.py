# backend/coordinator/agents.py
# Phalanx Coordinator — Rusk-It Edition
# Grok 4.2 Beta (agents) — Grok + Harper + Benjamin + Lucas
# Built for Rusk | AI Strategy & Web3 Architecture

import asyncio
import httpx
from pydantic import BaseModel
from typing import List

XAI_API_KEY = "your-xai-api-key-here"  # Replace with your SuperGrok / xAI key
XAI_URL = "https://api.x.ai/v1/chat/completions"

class AgentResponse(BaseModel):
    agent: str
    content: str
    confidence: float = 0.92

async def call_grok_agent(agent_name: str, system_prompt: str, user_intent: str) -> AgentResponse:
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            XAI_URL,
            headers={"Authorization": f"Bearer {XAI_API_KEY}"},
            json={
                "model": "grok-4-20-beta-agents",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_intent}
                ],
                "temperature": 0.3
            },
            timeout=30.0
        )
        resp.raise_for_status()
        data = resp.json()
        return AgentResponse(
            agent=agent_name,
            content=data["choices"][0]["message"]["content"]
        )

async def run_phalanx(user_intent: str, wallet: str = None):
    tasks = [
        call_grok_agent(
            "Grok",
            "You are Grok - the captain. Lead the team and synthesize the final decision.",
            user_intent
        ),
        call_grok_agent(
            "Harper",
            "You are Harper - research & real-time data expert. Pull from DefiLlama, on-chain sources, latest yields.",
            user_intent
        ),
        call_grok_agent(
            "Benjamin",
            "You are Benjamin - risk, math, Monte-Carlo simulation expert. Calculate feasibility and risks.",
            user_intent
        ),
        call_grok_agent(
            "Lucas",
            "You are Lucas - creative naming, narrative, visionary strategy expert.",
            user_intent
        )
    ]
    results: List[AgentResponse] = await asyncio.gather(*tasks)
    
    # Captain synthesizes final consensus
    final_prompt = f"Synthesize these 4 agent outputs into a single consensus action for: {user_intent}\n\n" + "\n".join([f"{r.agent}: {r.content}" for r in results])
    final = await call_grok_agent("Grok", "Synthesize into executable consensus.", final_prompt)
    
    return {
        "consensus": final.content,
        "agent_outputs": [r.dict() for r in results]
    }
