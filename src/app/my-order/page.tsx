'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MyOrder() {
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function checkOrder(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await supabase
      .from('branding_orders')
      .select('*')
      .eq('phone_number', phone)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (data) setOrder(data)
    else alert("No order found with that number.")
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
        <h1 className="text-3xl font-black italic uppercase text-[#00D1FF] text-center">Track My Order</h1>
        
        {!order ? (
          <form onSubmit={checkOrder} className="space-y-4">
            <input 
              type="tel" 
              placeholder="Enter Phone Number (e.g. 0712...)" 
              className="w-full bg-black border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-[#00D1FF]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button className="w-full bg-[#00D1FF] text-black font-black py-4 rounded-2xl uppercase italic tracking-tighter">
              {loading ? 'Searching...' : 'Find My Design'}
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="border-b border-white/10 pb-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Current Status</p>
              <h2 className="text-2xl font-black text-[#24CA52] uppercase italic">{order.status}</h2>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Your Brief</p>
              <p className="text-gray-300 italic">"{order.description}"</p>
            </div>

            {order.final_design_url ? (
              <a 
                href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/deliveries/${order.final_design_url}`}
                download
                className="block w-full text-center bg-[#24CA52] text-white font-black py-6 rounded-2xl text-xl shadow-[0_0_20px_rgba(36,202,82,0.3)]"
              >
                📥 DOWNLOAD FINAL FILES
              </a>
            ) : (
              <div className="bg-white/5 p-6 rounded-2xl text-center border border-dashed border-white/20">
                <p className="text-sm text-gray-400">Your design is still being crafted. Check back soon!</p>
              </div>
            )}
            
            <button onClick={() => setOrder(null)} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest block mx-auto pt-4">Search another number</button>
          </div>
        )}
      </div>
    </main>
  )
}