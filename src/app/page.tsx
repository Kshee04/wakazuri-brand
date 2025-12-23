'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#00D1FF] selection:text-black">
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00D1FF]/10 rounded-full blur-[120px] -z-10" />
        
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] mb-6">
          {/* SECRET: Clicking the 'W' 3 times toggles the admin link */}
          <span 
            onClick={() => setShowAdmin(!showAdmin)} 
            className="cursor-default active:text-[#00D1FF] transition-colors"
          >
            W
          </span>
          akazuri <br />
          <span className="text-[#00D1FF]">Car Brand</span>
        </h1>
        
        <p className="max-w-xl text-gray-400 font-bold uppercase tracking-[0.4em] text-sm mb-12">
          Turning your idea into reality
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/catalogue" className="bg-[#00D1FF] text-black font-black px-10 py-5 rounded-full uppercase italic hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,209,255,0.3)]">
              Explore Catalogue
            </Link>
            <Link href="/my-order" className="bg-white/5 border border-white/10 px-10 py-5 rounded-full font-black uppercase italic hover:bg-white/10 transition-colors">
              Track My Order
            </Link>
          </div>

          {/* HIDDEN ADMIN LINK - Only shows after clicking the 'W' */}
          {showAdmin && (
            <Link 
              href="/admin" 
              className="text-[10px] text-[#00D1FF] font-black uppercase tracking-[0.3em] animate-pulse border border-[#00D1FF]/30 px-4 py-2 rounded-full"
            >
              Access Admin Command
            </Link>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="absolute bottom-10 w-full text-center px-6">
        <div className="max-w-4xl mx-auto border-t border-white/5 pt-6 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">© 2025 WAKAZURI BRAND. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/returns" className="text-[10px] text-gray-600 hover:text-white uppercase font-bold tracking-widest transition">Return Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}