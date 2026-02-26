# Phalanx OS — Grok 4.2 Powered AI Special Forces Wallet  
**Rusk-It Edition**

Your personal 4-agent Phalanx (Grok + Harper + Benjamin + Lucas) lives inside your ERC-4337 smart account.

Built by **Rusk** — AI Strategy & Web3 Architecture.

## Features
- Real-time 4-agent debate & consensus (exactly like the live demos)
- ERC-4337 + ERC-7579 guard module with 3/4 ZK-quorum
- Native Circle CCTP cross-chain (Base ↔ Arbitrum in <15s)
- Morpho Blue yield integration + auto-compound
- Beautiful live dashboard with full debate transcripts
- One-click deploy on Base / Arbitrum / multi-chain

## Quick Start (5 minutes)
```bash
git clone https://github.com/Rusk-It/phalanx-os.git
cd phalanx-os
cp .env.example .env
# Add your xAI API key (SuperGrok) and deploy key

forge install
forge script script/Deploy.s.sol --rpc-url base --broadcast --verify

cd backend && uv sync && uv run uvicorn coordinator.core:app --reload

cd frontend && pnpm install && pnpm dev
