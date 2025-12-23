'use client'
import Link from 'next/link'

const products = [
  { id: 1, name: "Phone cooling fan", price: 1800, img: "https://via.placeholder.com/150", desc: "Does your phone overheat? Yes I have a..." },
  { id: 2, name: "2 in 1 mini fan", price: 399, img: "https://via.placeholder.com/150", desc: "Instead of using a physical fan..." },
  { id: 3, name: "Branded insurance pocket", price: 300, img: "https://via.placeholder.com/150", desc: "Do you have a company? We do branding..." },
  { id: 4, name: "Casio watch", price: 19999, img: "https://via.placeholder.com/150", desc: "Digital casio watches. Grab your best..." },
  { id: 5, name: "USB Personal Fan", price: 1500, img: "https://via.placeholder.com/150", desc: "Your daily personal fan. Portable and flexi..." },
  { id: 6, name: "Branded caps", price: 800, img: "https://via.placeholder.com/150", desc: "Branded caps just for you" },
  { id: 7, name: "Car key case", price: 1500, img: "https://via.placeholder.com/150", desc: "A case to place your car keys safe." },
  { id: 8, name: "Clear insurance pockets", price: 500, img: "https://via.placeholder.com/150", desc: "Simple, clear, and visible pockets" },
];

export default function Catalogue() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-black italic uppercase text-[#00D1FF] tracking-tighter">Wakazuri Catalogue</h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em] mt-2">Turning your idea into reality</p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded-[2rem] hover:border-[#00D1FF]/50 transition-all group">
            <div className="h-48 bg-black rounded-2xl mb-4 overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold uppercase italic">{item.name}</h3>
            <p className="text-gray-400 text-xs mt-1 mb-4 line-clamp-2">{item.desc}</p>
            <div className="flex justify-between items-center">
              <span className="text-[#24CA52] font-black text-lg italic">KES {item.price.toLocaleString()}</span>
              <Link 
                href={`/submit?item=${encodeURIComponent(item.name)}&price=${item.price}`}
                className="bg-[#00D1FF] text-black font-black px-4 py-2 rounded-xl text-xs uppercase italic"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}