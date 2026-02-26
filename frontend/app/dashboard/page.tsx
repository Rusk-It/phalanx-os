// frontend/app/dashboard/page.tsx
// Phalanx OS Dashboard — Rusk-It Edition
// Simple client-side dashboard showing 4-agent status

'use client';

import { useState, useEffect } from 'react';

interface AgentStatus {
  name: string;
  status: 'Online' | 'Offline' | 'Thinking';
  confidence: number;
}

export default function DashboardPage() {
  const [agents, setAgents] = useState<AgentStatus[]>([
    { name: 'Grok', status: 'Online', confidence: 98 },
    { name: 'Harper', status: 'Online', confidence: 95 },
    { name: 'Benjamin', status: 'Online', confidence: 97 },
    { name: 'Lucas', status: 'Online', confidence: 92 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-500';
      case 'Offline': return 'bg-red-500';
      case 'Thinking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-2">Phalanx OS • Rusk-It</h1>
        <p className="text-emerald-400 text-xl">4 Agents Online • Autonomous DeFi Special Forces</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800 hover:border-emerald-500 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">{agent.name}</h2>
              <div className={`w-4 h-4 rounded-full ${getStatusColor(agent.status)}`}></div>
            </div>
            <p className="text-zinc-400 mb-2">Status: <span className="font-medium text-white">{agent.status}</span></p>
            <p className="text-zinc-400">
              Confidence: <span className="font-bold text-emerald-400">{agent.confidence}%</span>
            </p>
          </div>
        ))}
      </div>

      <section className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-2xl font-bold mb-4">Latest Consensus Action</h3>
        <p className="text-zinc-300">
          {/* Placeholder — in real version, fetch from backend /phalanx/execute */}
          No active execution yet. Connect wallet and send intent to activate Phalanx.
        </p>
      </section>
    </div>
  );
}
