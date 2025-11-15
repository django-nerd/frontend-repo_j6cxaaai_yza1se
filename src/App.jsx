import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Heart,
  ShoppingCart,
  Sun,
  Moon,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Truck,
  Star,
  MessageSquare,
  Instagram,
  Facebook,
  MonitorPlay,
  Users,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

// Utility: format Rupiah
const formatIDR = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

// Mock images (Unsplash placeholders)
const images = [
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop'
]

const books = [
  {
    id: 'b1',
    title: 'Sebelum Aku Tiada',
    author: 'Asma Nadia',
    price: 89000,
    tagline: 'Surat-Surat dari Gaza — Kisah Haru yang Menggugah Jiwa',
    features: ['100% Royalti untuk Palestina', 'Kisah nyata dari anak-anak Gaza', 'Dibaca oleh lebih dari 50.000 orang'],
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'b2',
    title: 'Melawan Kemustahilan',
    author: 'Dewa Eka Prayoga',
    price: 75000,
    tagline: 'Menguji Keimanan, Menjemput Keajaiban',
    features: ['Best Seller Edisi Revisi', 'Kisah nyata perjuangan hidup', 'Highly Recommended oleh para motivator'],
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'b3',
    title: 'Titik Balik',
    author: 'Arafat',
    price: 69000,
    tagline: 'Ada 365 Hari dalam Setahun, Manakah yang Akan Jadi Titik Balik Dirimu?',
    features: ['Buku harian reflektif', 'Cocok untuk pencari makna dan transformasi diri', 'Desain cover estetik, cocok untuk koleksi'],
    img: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
  },
]

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])
  return { dark, setDark }
}

function Header({ cartCount, onToggleDark, isDark }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="text-pink-600" />
          <span className="text-gray-900 dark:text-white">Buku Inspirasi & Perjuangan</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onToggleDark} className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10" aria-label="Toggle theme">
            {isDark ? <Sun className="text-yellow-400" /> : <Moon />}
          </button>
          <div className="relative">
            <button className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
              <ShoppingCart />
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-pink-600 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function Hero({ onClickCTA }) {
  const [index, setIndex] = useState(0)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (parallaxRef.current) parallaxRef.current.style.transform = `translateY(${y * 0.2}px)`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            alt="Parallax buku"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>
      <div ref={parallaxRef} className="relative max-w-7xl mx-auto px-4 pt-28 pb-24 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fadeIn">
          “Baca Buku Ini, Ubah Hidupmu.”
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-white/90 mb-8 animate-fadeIn [animation-delay:200ms]">
          Temukan kekuatan dalam kata-kata. Tiga kisah nyata yang akan mengubah cara Anda melihat tantangan, harapan, dan kehidupan.
        </p>
        <button onClick={onClickCTA} className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg">
          <span role="img" aria-label="baca">📖</span> LIHAT SEMUA BUKU <ArrowRight />
        </button>
      </div>
    </section>
  )
}

function Problems() {
  const items = [
    'Terjebak dalam rutinitas tanpa arah?',
    'Merasa tidak punya kekuatan untuk berubah?',
    'Butuh inspirasi dari kisah nyata yang kuat?',
    'Ingin menemukan makna di balik penderitaan?'
  ]
  return (
    <section className="bg-gray-50 dark:bg-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          “Apakah Kamu Pernah Merasa...”
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t, i) => (
            <div key={i} className="p-5 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-black/5 dark:border-white/10 flex items-start gap-3">
              <AlertCircle className="text-pink-600 mt-1" />
              <p className="text-gray-700 dark:text-gray-200">{t}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-700 dark:text-gray-300 mt-8">
          Jika ya, kamu tidak sendiri. Dan jawabannya ada di halaman-halaman buku ini.
        </p>
      </div>
    </section>
  )
}

function ProductCard({ book, onAdd, onToggleWish, wished }) {
  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm">
      <button
        onClick={() => onToggleWish(book.id)}
        className={`absolute z-10 top-3 right-3 p-2 rounded-full backdrop-blur bg-white/80 dark:bg-neutral-900/60 hover:scale-110 transition ${wished ? 'text-pink-600' : 'text-gray-600 dark:text-gray-300'}`}
        aria-label="Wishlist"
      >
        <Heart fill={wished ? 'currentColor' : 'transparent'} />
      </button>
      <div className="overflow-hidden">
        <img src={book.img} alt={book.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{book.title} — <span className="text-gray-600 dark:text-gray-300 text-base">{book.author}</span></h3>
        <p className="text-pink-600 mt-1 text-sm">{book.tagline}</p>
        <ul className="mt-4 space-y-1 text-sm">
          {book.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <CheckCircle2 className="text-emerald-500" size={16} /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-bold text-gray-900 dark:text-white">{formatIDR(book.price)}</div>
          <button onClick={() => onAdd(book)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-200">
            <span>Tambah ke Keranjang</span> <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

function CompareModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl max-w-4xl w-full mx-4 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Perbandingan Buku</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 dark:text-gray-300">
              <tr>
                <th className="py-2 pr-4">Buku</th>
                <th className="py-2 pr-4">Tagline</th>
                <th className="py-2 pr-4">Fitur</th>
                <th className="py-2 pr-4">Harga</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-100">
              {books.map((b) => (
                <tr key={b.id} className="border-t border-black/5 dark:border-white/10">
                  <td className="py-3 pr-4 font-semibold">{b.title}</td>
                  <td className="py-3 pr-4">{b.tagline}</td>
                  <td className="py-3 pr-4">{b.features.join(' • ')}</td>
                  <td className="py-3 pr-4">{formatIDR(b.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700">Tutup</button>
        </div>
      </div>
    </div>
  )
}

function ProductsSection({ onAddToCart, onToggleWish, wishlist }) {
  const [openCompare, setOpenCompare] = useState(false)
  return (
    <section id="buku" className="py-16 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Produk Utama</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {books.map((b) => (
            <ProductCard key={b.id} book={b} onAdd={onAddToCart} onToggleWish={onToggleWish} wished={wishlist.includes(b.id)} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => setOpenCompare(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10">
            Bandingkan Buku <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <CompareModal open={openCompare} onClose={() => setOpenCompare(false)} />
    </section>
  )
}

function ProgressFreeShipping({ count }) {
  const target = 2
  const progress = Math.min(100, Math.round((count / target) * 100))
  const done = count >= target
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-40 w-[90%] max-w-xl">
      <div className="rounded-full bg-white/90 dark:bg-neutral-900/80 backdrop-blur border border-black/10 dark:border-white/10 shadow-lg px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-800 dark:text-gray-100">
            {done ? 'Anda telah memenuhi syarat gratis ongkir!' : 'Tambah ' + (target - count) + ' buku lagi untuk Gratis Ongkir!'}
          </span>
          <span className="font-semibold text-pink-600">{progress}%</span>
        </div>
        <div className="mt-2 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-pink-600 to-purple-600`} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

function SocialProof() {
  const testimonials = [
    {
      text: '“Buku ‘Sebelum Aku Tiada’ membuat saya menangis… tapi juga memberi kekuatan baru.”',
      name: 'Rina, Mahasiswi UI',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop'
    },
    {
      text: '“Saya baca ‘Melawan Kemustahilan’ 3 kali. Setiap kali ada halangan, saya buka lagi.”',
      name: 'Andi, Pengusaha Muda',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
    },
    {
      text: '“‘Titik Balik’ jadi teman saya tiap pagi. Saya tulis refleksi setiap hari.”',
      name: 'Siti, Guru SD',
      avatar: 'https://images.unsplash.com/photo-1541214113241-7f4bfaad0a43?q=80&w=200&auto=format&fit=crop'
    },
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="bg-pink-50 dark:bg-pink-900/20 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Dibaca dan Dicintai oleh Ribuan Pembaca</h2>
        <div className="relative max-w-3xl mx-auto">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-black/5 dark:border-white/10 shadow">
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-gray-800 dark:text-gray-100">{t.text}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">— {t.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <Stat icon={<BookOpen />} label="Buku Terjual" value="150.000+" />
          <Stat icon={<Star />} label="Rating" value="4.9/5" />
          <Stat icon={<Truck />} label="Pengiriman" value="Seluruh Indonesia" />
          <Stat icon={<MessageSquare />} label="Customer Service" value="24 Jam" />
        </div>
      </div>
    </section>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="p-5 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-black/5 dark:border-white/10 text-center">
      <div className="mx-auto w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-600 flex items-center justify-center mb-2">
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-gray-600 dark:text-gray-300 text-sm">{label}</div>
    </div>
  )
}

function CTAUrgency({ onClick }) {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-extrabold">Jangan Tunda Lagi — Transformasi Dimulai Hari Ini!</h3>
        <p className="mt-3 text-white/90 max-w-2xl mx-auto">Setiap buku yang kamu beli tidak hanya mengubah hidupmu, tapi juga membantu sesama. Stok terbatas! Beberapa edisi sudah hampir habis.</p>
        <button onClick={onClick} className="mt-6 inline-flex items-center gap-2 bg-white text-pink-600 font-bold px-6 py-3 rounded-lg animate-pulse hover:scale-[1.02] transition">
          🛒 BELI SEKARANG — GRATIS ONGKIR UNTUK PEMBELIAN 2+ BUKU!
        </button>
      </div>
    </section>
  )
}

function TestimonialsTabs() {
  const [tab, setTab] = useState('video')
  const reviews = useMemo(() => ([
    { id: 1, name: 'Nadia', rating: 5, date: '2025-01-10', text: 'Luar biasa menyentuh. Setiap halaman memberi harapan.' },
    { id: 2, name: 'Rizky', rating: 4, date: '2025-02-02', text: 'Sangat memotivasi, terutama kisah-kisah nyata yang jujur.' },
    { id: 3, name: 'Ayu', rating: 5, date: '2025-03-15', text: 'Buku “Titik Balik” membantu saya konsisten refleksi harian.' },
  ]), [])
  const [sort, setSort] = useState('new')

  const sorted = [...reviews].sort((a, b) => {
    if (sort === 'new') return new Date(b.date) - new Date(a.date)
    if (sort === 'top') return b.rating - a.rating
    return a.text.length < b.text.length ? 1 : -1
  })

  return (
    <section className="bg-white dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setTab('video')} className={`px-4 py-2 rounded-lg ${tab === 'video' ? 'bg-pink-600 text-white' : 'bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-100'}`}>
            Video Testimoni
          </button>
          <button onClick={() => setTab('text')} className={`px-4 py-2 rounded-lg ${tab === 'text' ? 'bg-pink-600 text-white' : 'bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-100'}`}>
            Ulasan Teks
          </button>
        </div>
        {tab === 'video' ? (
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow">
            <iframe
              title="Video Testimoni"
              src="https://www.youtube.com/embed/1-1nJ3e23-8?rel=0"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-700 dark:text-gray-300">Sort by:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10">
                <option value="new">Terbaru</option>
                <option value="top">Rating Tertinggi</option>
                <option value="helpful">Paling Membantu</option>
              </select>
            </div>
            <div className="space-y-4">
              {sorted.map((r) => (
                <div key={r.id} className="p-5 bg-white dark:bg-neutral-800 rounded-xl border border-black/5 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900 dark:text-white">{r.name}</div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} fill={i < r.rating ? 'currentColor' : 'transparent'} className={i < r.rating ? '' : 'text-gray-400'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 mt-2">{r.text}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{new Date(r.date).toLocaleDateString('id-ID')}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Apakah buku ini tersedia dalam versi digital?', a: 'Belum, saat ini hanya versi fisik. Namun kami sedang mengembangkan versi ebook.' },
    { q: 'Bagaimana proses pengiriman?', a: 'Pengiriman via JNE/J&T Express, estimasi 2-5 hari kerja. Tracking nomor dikirim via email.' },
    { q: 'Apakah bisa retur?', a: 'Retur diterima jika buku rusak atau salah kirim. Hubungi CS dalam 3x24 jam setelah terima.' },
    { q: 'Apakah ada diskon untuk pembelian grosir?', a: 'Ya! Untuk pembelian 10+ buku, dapatkan diskon 15%. Hubungi WA kami.' },
  ]
  const [open, setOpen] = useState(null)
  return (
    <section className="bg-gray-50 dark:bg-neutral-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Pertanyaan Umum</h3>
        <div className="space-y-3">
          {items.map((it, idx) => {
            const active = open === idx
            return (
              <div key={idx} className="bg-white dark:bg-neutral-800 rounded-xl border border-black/5 dark:border-white/10">
                <button onClick={() => setOpen(active ? null : idx)} className="w-full flex items-center justify-between text-left px-5 py-4">
                  <span className="font-medium text-gray-900 dark:text-white">{it.q}</span>
                  {active ? <ChevronUp /> : <ChevronDown />}
                </button>
                <div className={`grid transition-all duration-300 ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden px-5 pb-4 text-gray-700 dark:text-gray-200">{it.a}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-semibold mb-3">Tentang Kami</h4>
          <p className="text-sm text-gray-400">Visi misi, sejarah, dan nilai-nilai perusahaan.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Layanan Pelanggan</h4>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Kebijakan Privasi</li>
            <li>Syarat & Ketentuan</li>
            <li>Retur & Pengembalian</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Ikuti Kami</h4>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="p-2 rounded-md hover:bg-white/10"><Instagram /></a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-md hover:bg-white/10"><Facebook /></a>
            <a href="#" aria-label="TikTok" className="p-2 rounded-md hover:bg-white/10"><Users /></a>
            <a href="#" aria-label="WhatsApp" className="p-2 rounded-md hover:bg-white/10"><MessageSquare /></a>
          </div>
          <a href="#" className="inline-block mt-3 text-sm text-pink-400 hover:text-pink-300">Gabung komunitas pembaca →</a>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Newsletter</h4>
          <form onSubmit={(e) => { e.preventDefault(); alert('Terima kasih sudah berlangganan!') }} className="space-y-2">
            <input type="email" required placeholder="Masukkan email" className="w-full px-4 py-2 rounded-lg bg-white text-neutral-900" />
            <button className="w-full px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold">📩 Berlangganan</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-400">© 2025 Buku Inspirasi & Perjuangan. All Rights Reserved.</div>
    </footer>
  )
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Halo! Ada yang bisa kami bantu?' }])
  const [input, setInput] = useState('')
  const send = () => {
    if (!input.trim()) return
    setMessages((m) => [...m, { from: 'user', text: input.trim() }, { from: 'bot', text: 'Terima kasih! CS akan segera merespon.' }])
    setInput('')
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-black/10 dark:border-white/10 overflow-hidden">
          <div className="px-4 py-3 bg-pink-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2"><MessageSquare /> Live Chat</div>
            <button onClick={() => setOpen(false)} className="text-white/90">✕</button>
          </div>
          <div className="max-h-64 overflow-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${m.from === 'bot' ? 'bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-100' : 'bg-pink-600 text-white ml-auto'}`}>{m.text}</div>
            ))}
          </div>
          <div className="p-3 flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key==='Enter' && send()} className="flex-1 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10" placeholder="Tulis pesan…" />
            <button onClick={send} className="px-3 py-2 rounded-lg bg-pink-600 text-white">Kirim</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} className="w-14 h-14 rounded-full bg-pink-600 text-white shadow-xl flex items-center justify-center hover:scale-105 transition">
        <MessageSquare />
      </button>
    </div>
  )
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-lg flex items-center justify-center">
      ↑
    </button>
  )
}

export default function App() {
  const { dark, setDark } = useDarkMode()
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  const addToCart = (book) => setCart((c) => [...c, book])
  const toggleWish = (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))

  const cartCount = cart.length

  const scrollToProducts = () => {
    const el = document.getElementById('buku')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // simple fade-in on scroll for hero texts
    const els = document.querySelectorAll('.animate-fadeIn')
    els.forEach((el, idx) => {
      el.style.opacity = 0
      el.style.transform = 'translateY(10px)'
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.transition = 'opacity 700ms ease, transform 700ms ease'
            e.target.style.opacity = 1
            e.target.style.transform = 'translateY(0)'
            io.disconnect()
          }
        })
      }, { threshold: 0.2 })
      io.observe(el)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Header cartCount={cartCount} onToggleDark={() => setDark(!dark)} isDark={dark} />
      <Hero onClickCTA={scrollToProducts} />
      <Problems />
      <ProductsSection onAddToCart={addToCart} onToggleWish={toggleWish} wishlist={wishlist} />
      {cartCount > 0 && <ProgressFreeShipping count={cartCount} />}
      <SocialProof />
      <CTAUrgency onClick={scrollToProducts} />
      <TestimonialsTabs />
      <FAQ />
      <Footer />
      <ChatWidget />
      <ScrollTopButton />
    </div>
  )
}
