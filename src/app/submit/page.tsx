'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SubmitIdea() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [phone, setPhone] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      const file = formData.get('logo') as File
      const description = formData.get('description') as string
      const phone_number = formData.get('phone_number') as string
      setPhone(phone_number)

      if (!file || file.size === 0) {
        alert("Please select a PDF file first!")
        setLoading(false)
        return
      }

      // 1. Upload the PDF to Storage
      const fileName = `${Date.now()}-${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // 2. Save the details to the branding_orders table
      const { error: dbError } = await supabase
        .from('branding_orders')
        .insert([{ 
          description, 
          file_url: fileName,
          phone_number 
        }])

      if (dbError) throw dbError

      // SUCCESS!
      setSuccess(true)
      
    } catch (error: any) {
      console.error(error)
      alert('Error: ' + (error.message || 'Check your database columns'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-4xl font-black text-[#00D1FF] italic tracking-tighter">TELL US YOUR IDEA</h1>
        
        {success ? (
          /* SUCCESS MESSAGE BOX */
          <div className="bg-[#24CA52]/10 border-2 border-[#24CA52] p-10 rounded-[2.5rem] text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="text-6xl">✅</div>
            <h2 className="text-3xl font-black uppercase">Order Received!</h2>
            <p className="text-gray-400">We will contact you on <span className="text-white font-bold">{phone}</span> shortly to start the design.</p>
            <button 
              onClick={() => setSuccess(false)}
              className="mt-4 text-[#00D1FF] font-bold uppercase text-xs tracking-widest hover:underline"
            >
              Submit another idea
            </button>
          </div>
        ) : (
          /* THE FORM */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2 font-bold uppercase text-xs tracking-widest text-[10px]">Step 1: The Design Idea</label>
              <textarea 
                name="description" 
                required 
                placeholder="e.g. Black t-shirt with a white logo on the chest..." 
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-lg h-32 outline-none focus:border-[#00D1FF] transition-all" 
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-bold uppercase text-xs tracking-widest text-[10px]">Step 2: Upload Logo (PDF)</label>
              <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                <input 
                  name="logo" 
                  type="file" 
                  accept="application/pdf" 
                  required 
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00D1FF] file:text-black hover:file:bg-white transition" 
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-bold uppercase text-xs tracking-widest text-[10px]">Step 3: M-Pesa Phone Number</label>
              <input 
                name="phone_number" 
                type="tel" 
                required 
                placeholder="0712345678" 
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-lg outline-none focus:border-[#00D1FF] transition-all" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#00D1FF] text-black font-black py-6 rounded-2xl text-xl shadow-[0_0_30px_rgba(0,209,255,0.3)] disabled:opacity-50 transition active:scale-95 uppercase italic"
            >
              {loading ? 'SENDING TO CLOUD...' : '🚀 SEND TO DESIGNER'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}