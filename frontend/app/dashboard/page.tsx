// frontend/app/dashboard/page.tsx
// Updated with wallet connection

'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

interface AgentStatus {
  name: string;
  status: 'Online' | 'Offline' | 'Thinking';
  confidence: number;
}

export default function DashboardPage() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });

  const agents = [
    { name: 'Grok', status: 'Online' as const, confidence: 98 },
    { name: 'Harper', status: 'Online' as const, confidence: 95 },
    { name: 'Benjamin', status: 'Online' as const, confidence: 97 },
    { name: 'Lucas', status: 'Online' as const, confidence: 92 },
  ];

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
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">Phalanx OS • Rusk-It</h1>
          <p className="text-emerald-400 text-xl">4 Agents Online • Autonomous DeFi Special Forces</p>
        </div>
        <ConnectButton />
      </header>

      {isConnected && (
        <div className="mb-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-4">Connected Wallet</h2>
          <p>Address: <span className="font-mono text-emerald-400">{address?.slice(0, 6)}...{address?.slice(-4)}</span></p>
          <p>Chain: <span className="font-medium">{chain?.name || 'Unknown'}</span></p>
          <p>Balance: <span className="font-bold text-emerald-400">
            {balance ? `${(Number(balance.value) / 1e18).toFixed(4)} ${balance.symbol}` : 'Loading...'}
          </span></p>
        </div>
      )}

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
          Connect your wallet and send an intent to activate Phalanx agents.
        </p>
      </section>
    </div>
  );
}
