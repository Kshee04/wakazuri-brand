'use client' // Added this to fix the error

export default function ReturnPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-12 flex flex-col items-center">
      <div className="max-w-2xl space-y-8">
        <h1 className="text-4xl font-black italic uppercase text-[#00D1FF]">Return & Refund Policy</h1>
        
        <div className="space-y-6 text-gray-400 leading-relaxed font-medium">
          <p>At <span className="text-white">Wakazuri Car Brand</span>, we strive for perfection. Because our design services are custom-made for your specific identity, we have a clear policy regarding refunds.</p>
          
          <section className="space-y-2 text-white">
            <h2 className="text-xl font-bold">1. No Refunds After Work Begins</h2>
            <p className="text-gray-400 text-sm">Once the design process has started and assets have been reviewed, we do not offer monetary refunds. Your payment secures the designer's time and creative output.</p>
          </section>

          <section className="space-y-2 text-white">
            <h2 className="text-xl font-bold">2. Unlimited Revisions</h2>
            <p className="text-gray-400 text-sm">We guarantee satisfaction. Depending on your chosen package, we offer revisions to ensure the final result matches your vision.</p>
          </section>

          <section className="space-y-2 text-white">
            <h2 className="text-xl font-bold">3. Delivery Timeline</h2>
            <p className="text-gray-400 text-sm">Standard delivery is 24-48 hours. Digital files are delivered via the "Track My Order" portal once final payment is confirmed.</p>
          </section>
        </div>

        {/* This button now works because of 'use client' */}
        <button 
          onClick={() => window.history.back()} 
          className="text-[#00D1FF] font-bold uppercase text-xs tracking-[0.3em] hover:underline pt-10"
        >
          ← Return to Previous Page
        </button>
      </div>
    </main>
  )
}