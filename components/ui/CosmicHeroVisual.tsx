"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export const CosmicHeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"neural" | "agents" | "telemetry">("neural");
  const [tokenCount, setTokenCount] = useState(14280);

  // Simulated live token counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenCount((prev) => prev + Math.floor(Math.random() * 8) + 3);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[580px] mx-auto select-none">
      {/* Background ambient lighting aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-[380px] h-[380px] rounded-full bg-blue-600/15 blur-[100px]"
        />
      </div>

      {/* Main Glassmorphic Technology Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl bg-slate-950/85 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] backdrop-blur-2xl p-5 sm:p-6 overflow-hidden"
      >
        {/* Top subtle cyan laser border highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Dashboard Window Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              VYOM_AI // NEURAL_ORCHESTRATOR
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>STREAM: 14.8k req/s</span>
          </div>
        </div>

        {/* Interactive Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
          <button
            onClick={() => setActiveTab("neural")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "neural"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Neural Graph</span>
          </button>
          <button
            onClick={() => setActiveTab("agents")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "agents"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Agent Swarm</span>
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "telemetry"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry</span>
          </button>
        </div>

        {/* Dynamic Display Canvas based on Tab */}
        <div className="relative h-60 sm:h-64 rounded-2xl bg-slate-900/60 border border-slate-800/90 p-4 overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <AnimatePresence mode="wait">
            {activeTab === "neural" && (
              <motion.div
                key="neural"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="relative h-full flex flex-col justify-between"
              >
                {/* SVG Animated Neural Network Mesh */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                  {/* Synaptic connection paths */}
                  <line x1="60" y1="100" x2="160" y2="45" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
                  <line x1="60" y1="100" x2="160" y2="100" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="2" />
                  <line x1="60" y1="100" x2="160" y2="155" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />

                  <line x1="160" y1="45" x2="260" y2="70" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="1.5" />
                  <line x1="160" y1="100" x2="260" y2="70" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
                  <line x1="160" y1="100" x2="260" y2="130" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="2" />
                  <line x1="160" y1="155" x2="260" y2="130" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />

                  <line x1="260" y1="70" x2="340" y2="100" stroke="rgba(0, 240, 255, 0.7)" strokeWidth="2" />
                  <line x1="260" y1="130" x2="340" y2="100" stroke="rgba(0, 240, 255, 0.7)" strokeWidth="2" />

                  {/* Pulsing signal packet moving along connection */}
                  <motion.circle
                    r="3.5"
                    fill="#00f0ff"
                    animate={{
                      cx: [60, 160, 260, 340],
                      cy: [100, 100, 130, 100],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    filter="drop-shadow(0 0 6px #00f0ff)"
                  />

                  {/* Secondary signal packet */}
                  <motion.circle
                    r="3"
                    fill="#38bdf8"
                    animate={{
                      cx: [60, 160, 260, 340],
                      cy: [100, 45, 70, 100],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.7,
                    }}
                    filter="drop-shadow(0 0 5px #38bdf8)"
                  />

                  {/* Input Node */}
                  <circle cx="60" cy="100" r="10" fill="#0c1e36" stroke="#0284c7" strokeWidth="2" />
                  <circle cx="60" cy="100" r="4" fill="#38bdf8" />

                  {/* Hidden Layer Nodes */}
                  <circle cx="160" cy="45" r="9" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
                  <circle cx="160" cy="45" r="3" fill="#38bdf8" />

                  <circle cx="160" cy="100" r="12" fill="#042f2e" stroke="#00f0ff" strokeWidth="2.5" />
                  <circle cx="160" cy="100" r="5" fill="#00f0ff" />

                  <circle cx="160" cy="155" r="9" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
                  <circle cx="160" cy="155" r="3" fill="#38bdf8" />

                  {/* Latent Nodes */}
                  <circle cx="260" cy="70" r="10" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
                  <circle cx="260" cy="70" r="4" fill="#38bdf8" />

                  <circle cx="260" cy="130" r="11" fill="#042f2e" stroke="#00f0ff" strokeWidth="2" />
                  <circle cx="260" cy="130" r="4" fill="#00f0ff" />

                  {/* Output Node (Glowing Core) */}
                  <circle cx="340" cy="100" r="14" fill="#083344" stroke="#00f0ff" strokeWidth="3" />
                  <circle cx="340" cy="100" r="6" fill="#00f0ff" />
                </svg>

                {/* Top status overlay */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">INPUT: MULTIMODAL_EMBEDDING</span>
                  <span className="text-cyan-400 font-bold">1,536 DIMS // ZERO DRIFT</span>
                </div>

                {/* Bottom status overlay */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-800/80 bg-slate-950/80 px-3 py-1.5 rounded-lg">
                  <span className="text-slate-300">CONFIDENCE SCORE:</span>
                  <span className="text-cyan-300 font-bold">99.84% (STRICT GUARDRAILS)</span>
                </div>
              </motion.div>
            )}

            {activeTab === "agents" && (
              <motion.div
                key="agents"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="relative h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">COGNITIVE SWARM ORCHESTRATION</span>
                    <span className="text-cyan-400 font-bold">3 ACTIVE AGENTS</span>
                  </div>

                  <div className="space-y-2 mt-2">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-bold text-white">Agent Alpha (RAG Ingestion)</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">Hybrid Pinecone Query OK</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-sky-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                        <span className="text-xs font-bold text-white">Agent Beta (Reasoning Core)</span>
                      </div>
                      <span className="text-[10px] font-mono text-sky-300">Tree-of-Thought (Depth 4)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-xs font-bold text-white">Agent Gamma (Validator)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300">Schema Passed • 0 Hallucination</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1">
                  <span>SWARM PROTOCOL: ASYNC EVENT BUS</span>
                  <span className="text-cyan-400">LATENCY: 1.1ms</span>
                </div>
              </motion.div>
            )}

            {activeTab === "telemetry" && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="relative h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">REAL-TIME INFERENCE LATENCY</span>
                    <span className="text-cyan-400 font-bold">&lt; 12ms P99</span>
                  </div>

                  {/* Simulated Waveform Frequency Spectrum */}
                  <div className="flex items-end justify-between h-24 gap-1 pt-4">
                    {[45, 60, 30, 80, 95, 65, 40, 75, 88, 55, 90, 70, 85, 95, 60, 80, 50, 70, 90, 100, 65, 75].map(
                      (height, idx) => (
                        <motion.div
                          key={idx}
                          animate={{
                            height: [`${height}%`, `${Math.max(20, (height + 25) % 100)}%`, `${height}%`],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.05,
                          }}
                          className="flex-1 rounded-t bg-gradient-to-t from-cyan-600 via-sky-400 to-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center font-mono">
                  <div className="p-1.5 rounded-lg bg-slate-950/80">
                    <span className="text-[9px] text-slate-400 block">THROUGHPUT</span>
                    <span className="text-xs font-bold text-cyan-300">14.8k req/s</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-950/80">
                    <span className="text-[9px] text-slate-400 block">ERROR RATE</span>
                    <span className="text-xs font-bold text-emerald-400">0.0001%</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-950/80">
                    <span className="text-[9px] text-slate-400 block">UPTIME SLA</span>
                    <span className="text-xs font-bold text-cyan-300">99.999%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Token Processing Ticker */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-400">STREAMING TOKENS:</span>
            <span className="text-cyan-300 font-bold">{tokenCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE AIR-GAP READY</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Badge 1: Top Right */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-5 -right-3 sm:-right-5 z-20 p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl shadow-cyan-500/10 flex items-center gap-3"
      >
        <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">10x Deployment Velocity</span>
          <span className="text-[10px] font-mono text-cyan-300/80 block">Zero-Downtime Microservices</span>
        </div>
      </motion.div>

      {/* Floating Badge 2: Bottom Left */}
      <motion.div
        animate={{
          y: [6, -6, 6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -bottom-5 -left-3 sm:-left-5 z-20 p-3 rounded-2xl bg-slate-900/90 border border-blue-500/30 backdrop-blur-xl shadow-xl shadow-blue-500/10 flex items-center gap-3"
      >
        <div className="p-2 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">99.8% Prediction Precision</span>
          <span className="text-[10px] font-mono text-blue-300/80 block">Automated Model Verification</span>
        </div>
      </motion.div>
    </div>
  );
};
