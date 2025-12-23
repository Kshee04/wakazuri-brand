'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const { data } = await supabase
      .from('branding_orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setOrders(data)
    setLoading(false)
  }

  // MANUALLY MARK AS PAID (For Demo)
  async function markAsPaid(orderId: string) {
    const { error } = await supabase
      .from('branding_orders')
      .update({ status: 'PAID' })
      .eq('id', orderId)

    if (error) alert("Error: " + error.message)
    else {
      alert("✅ Status updated to PAID")
      fetchOrders()
    }
  }

  // UPLOAD FINAL DESIGN
  async function handleDelivery(orderId: string, file: File) {
    const fileName = `${Date.now()}-final-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('deliveries')
      .upload(fileName, file)

    if (uploadError) return alert("Upload Error: " + uploadError.message)

    const { error: dbError } = await supabase
      .from('branding_orders')
      .update({ status: 'Delivered', final_design_url: fileName })
      .eq('id', orderId)

    if (dbError) alert("Database Error: " + dbError.message)
    else {
      alert("🚀 Design Delivered!")
      fetchOrders()
    }
  }

  // TRIGGER REAL STK PUSH
  async function sendPaymentPrompt(phoneNumber: string) {
    const formattedPhone = phoneNumber.startsWith('0') 
      ? '254' + phoneNumber.slice(1) 
      : phoneNumber;

    const confirmTrigger = window.confirm(`Trigger M-Pesa STK Push for ${formattedPhone}?`);
    
    if (confirmTrigger) {
      try {
        const res = await fetch('/api/stk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: formattedPhone, amount: 1 }) 
        });
        const data = await res.json();
        if (data.ResponseCode === "0") alert("🚀 STK PUSH SENT!");
        else alert("❌ Error: " + data.errorMessage);
      } catch (error) {
        alert("❌ System Error: Check your terminal.");
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-[#00D1FF]">Admin Command</h1>
          <button onClick={fetchOrders} className="text-xs bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition uppercase font-bold tracking-widest">REFRESH FEED</button>
        </header>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase italic ${
                    order.status === 'Delivered' ? 'bg-[#24CA52] text-white' : 
                    order.status === 'PAID' ? 'bg-[#24CA52] text-white shadow-[0_0_10px_#24CA52]' : 
                    'bg-[#00D1FF] text-black'
                  }`}>
                    {order.status}
                  </span>
                  <h2 className="text-2xl font-bold uppercase italic tracking-tight">{order.description}</h2>
                  <p className="text-[#00D1FF] font-mono font-bold tracking-[0.2em]">{order.phone_number}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <a href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/logos/${order.file_url}`} target="_blank" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition uppercase">View Assets</a>
                  <button onClick={() => sendPaymentPrompt(order.phone_number)} className="bg-[#00D1FF] text-black px-4 py-2 rounded-lg text-xs font-bold transition uppercase">Send Prompt</button>
                  <button onClick={() => markAsPaid(order.id)} className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-xs font-bold transition uppercase">Confirm Paid</button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Deliver Final Work</p>
                <input 
                  type="file" 
                  onChange={(e) => e.target.files?.[0] && handleDelivery(order.id, e.target.files[0])}
                  className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-white/10 file:text-white hover:file:bg-white/20 transition cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}