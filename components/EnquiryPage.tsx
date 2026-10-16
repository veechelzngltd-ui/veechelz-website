'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, Instagram, MessageCircle, Send, CheckCircle2, MapPin } from 'lucide-react'

type Props = {
  kicker: string
  title: string
  intro: string
  tag: string
  messageLabel: string
  messagePlaceholder: string
  waText: string
  highlights: { title: string; text: string }[]
}

export default function EnquiryPage({ kicker, title, intro, tag, messageLabel, messagePlaceholder, waText, highlights }: Props) {
  const [f, setF] = useState({ name: '', email: '', phone: '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value })

  const submit = async () => {
    if (!f.name || !f.email || !f.phone) { setState('error'); return }
    setState('sending')
    try {
      const r = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, phone: f.phone, projectDetails: `[${tag}] ${f.message}` }),
      })
      setState(r.ok ? 'done' : 'error')
    } catch { setState('error') }
  }

  const input = 'w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-[#B38F5B] focus:outline-none focus:ring-2 focus:ring-[#B38F5B]/20 transition'

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <section className="relative overflow-hidden bg-[#18181B] text-white">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#B38F5B]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#B38F5B]/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 py-16 sm:py-20">
          <Link href="/" className="inline-flex items-center text-sm text-stone-400 hover:text-white transition-colors mb-8">
            <span className="mr-2">←</span> Back to Home
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B38F5B] mb-4">{kicker}</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium leading-tight mb-5">{title}</h1>
          <p className="max-w-2xl text-lg text-stone-300 leading-relaxed">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`https://wa.me/2349111117575?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-full bg-[#B38F5B] px-6 py-3 text-sm font-medium text-white hover:bg-[#a07f4f] transition-colors">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a href="tel:+2349111117575" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              <Phone className="h-4 w-4" /> 0911117575
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-14 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
              <h3 className="font-serif text-lg text-stone-900 mb-1">{h.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{h.text}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-stone-900 p-5 text-sm text-stone-300 space-y-3">
            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#B38F5B]" /> veechelzngltd@gmail.com</p>
            <p className="flex items-center gap-3"><Instagram className="h-4 w-4 text-[#B38F5B]" /> @veechelz_ng</p>
            <p className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-[#B38F5B] shrink-0" /> Suite B5 Begger Paint Plaza, Alexandria Crescent, Wuse 2, Abuja</p>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          {state === 'done' ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#B38F5B] mb-4" />
              <h2 className="font-serif text-2xl text-stone-900 mb-2">Thank you, we got it</h2>
              <p className="text-stone-600">The Veechelz team will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl text-stone-900 mb-1">Send us a message</h2>
              <p className="text-sm text-stone-500 mb-6">No email app needed. Fill this in and it comes straight to us.</p>
              <div className="space-y-4">
                <input className={input} placeholder="Your name" value={f.name} onChange={set('name')} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={input} type="email" placeholder="Email address" value={f.email} onChange={set('email')} />
                  <input className={input} type="tel" placeholder="Phone / WhatsApp" value={f.phone} onChange={set('phone')} />
                </div>
                <label className="block text-sm font-medium text-stone-700">{messageLabel}</label>
                <textarea className={input} rows={5} placeholder={messagePlaceholder} value={f.message} onChange={set('message')} />
                {state === 'error' && <p className="text-sm text-red-600">Please fill in your name, email and phone, then try again. If it keeps failing, message us on WhatsApp.</p>}
                <button type="button" onClick={submit} disabled={state === 'sending'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-60 transition-colors">
                  <Send className="h-4 w-4" /> {state === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
