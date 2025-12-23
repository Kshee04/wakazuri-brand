'use client'
import Link from 'next/link'

const packages = [
  { name: 'Basic Logo', price: '1,500', features: ['1 Concept', 'PDF Format', '2 Revisions'] },
  { name: 'Full Branding', price: '5,000', features: ['3 Concepts', 'All Formats', 'Unlimited Revisions', 'Social Media Kit'] },
  { name: 'App Design', price: '15,000', features: ['UI/UX Design', 'Prototype', 'Developer Handoff'] },
]

export default function Pricing() {
  return (
    <main className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">
          Select Your <span className="text-[#00D1FF]">Package</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-[#00D1FF] transition-all group">
              <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase text-gray-400 group-hover:text-white">{pkg.name}</h2>
                <div className="text-4xl font-black">Ksh {pkg.price}</div>
                <ul className="text-sm text-gray-500 space-y-2 py-6">
                  {pkg.features.map(f => <li key={f}>+ {f}</li>)}
                </ul>
              </div>
              <Link href="/submit" className="bg-white text-black py-4 rounded-2xl font-black uppercase text-xs hover:bg-[#00D1FF] transition-colors">
                Start Design
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}