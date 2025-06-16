"use client"

import { motion } from "framer-motion"

export function CreativeHero() {
  return (
    <motion.div
      className="w-96 h-96 relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Animated background rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-pulse animation-delay-2000"></div>

      {/* Avatar container with glassmorphic effect */}
      <div className="relative w-80 h-80 rounded-full bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 p-6 shadow-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur opacity-75"></div>

        {/* Apple-style Avatar */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 flex items-center justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/my-avatar-0zxAXW7IyHYZM4TamVo5GKNxtEqBwj.png"
            alt="Shine Kyaw Kyaw Aung Avatar"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Floating particles */}
        <div className="absolute top-6 right-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce animation-delay-2000"></div>
        <div className="absolute top-16 left-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-zinc-300 font-medium">Available</span>
      </div>
    </motion.div>
  )
}
