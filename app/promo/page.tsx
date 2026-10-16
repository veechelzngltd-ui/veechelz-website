/*
 * Veechelz Window Blinds - Cinematic Ad (20-second automated sequence)
 * High-end direct response with kinetic typography and motorized shade simulation.
 */

'use client'

export default function PromoPage() {
  return (
    <div className="relative w-screen h-screen bg-[#18181B] text-[#F7F5F0] overflow-hidden flex items-center justify-center select-none" style={{ background: '#18181B', color: '#F7F5F0' }}>
      <style jsx global>{`
        @keyframes clipReveal {
          0% { transform: translateY(110%); opacity: 0; }
          100% { transform: translateY(0%); opacity: 1; }
        }
        @keyframes blindDrop {
          0% { height: 0%; }
          100% { height: 100%; }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.96); filter: blur(6px); }
          8% { opacity: 1; transform: scale(1); filter: blur(0px); }
          88% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.04); filter: blur(6px); }
        }
        @keyframes slideUpModal {
          0% { opacity: 0; transform: translateY(50px) scale(0.96); }
          12% { opacity: 1; transform: translateY(0) scale(1); }
          88% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(0.98); }
        }
        .animate-clip { animation: clipReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scene-1 { animation: fadeInOut 5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scene-2 { animation: fadeInOut 8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 5s; opacity: 0; }
        .scene-3 { animation: slideUpModal 5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 13s; opacity: 0; }
        .scene-4 { animation: fadeInOut 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 18s; opacity: 0; }
      `}</style>

      {/* Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[140px]" style={{ background: '#B38F5B' }} />
      </div>

      {/* Scene 1: Hook & Authority (0s - 5s) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center scene-1">
        <div className="w-16 h-1 rounded-full mb-6" style={{ background: '#B38F5B' }} />
        <div className="overflow-hidden mb-2">
          <h1 className="font-bold text-4xl md:text-6xl tracking-tight animate-clip" style={{ fontFamily: "'Cinzel', serif" }}>
            Precision Architecture.
          </h1>
        </div>
        <div className="overflow-hidden">
          <p className="text-xl md:text-2xl animate-clip" style={{ animationDelay: '0.15s', color: '#B38F5B', fontFamily: "'Cinzel', serif" }}>
            Not Just Window Coverings.
          </p>
        </div>
      </div>

      {/* Scene 2: Motorized Blind Demonstration (5s - 13s) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 scene-2">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#B38F5B]/20 text-[#B38F5B] font-semibold">Motorized Engineering</span>
            <h2 className="font-bold text-3xl md:text-4xl mt-4 mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              The Zero-Gap Blackout System
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Silent automated motors paired with laser-guided side channels. Complete light elimination, controlled via remote or smart home integration.
            </p>
          </div>
          {/* Simulated Window Frame dropping motorized shade */}
          <div className="relative h-72 w-full rounded-2xl border border-[#B38F5B]/30 bg-[#111113] overflow-hidden shadow-2xl p-4">
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#18181B] border-b border-[#B38F5B]/40 z-10 flex items-center justify-center">
              <div className="w-12 h-1 rounded bg-[#B38F5B]" />
            </div>
            {/* The actual blind dropping */}
            <div className="w-full bg-[#1c1c1f] border-b-2 border-[#B38F5B] shadow-lg rounded-b-sm" style={{ animation: 'blindDrop 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.5s', height: '0%' }} />
            {/* Caption pinned to the bottom, out of flex flow so the blind can never push it off-frame */}
            <div className="absolute bottom-2 left-0 right-0 text-xs uppercase tracking-widest text-center text-zinc-500 font-mono z-10">
              Veechelz Motorized Roller v2
            </div>
          </div>
        </div>
      </div>

      {/* Scene 3: High-Value Direct Response Offer (13s - 18s) */}
      <div className="absolute inset-0 flex items-center justify-center p-6 scene-3">
        <div className="w-full max-w-lg p-8 rounded-3xl border border-[#B38F5B]/40 shadow-2xl relative overflow-hidden" style={{ background: '#F7F5F0', color: '#18181B' }}>
          <div className="absolute top-0 right-0 bg-[#B38F5B] text-[#18181B] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
            Limited Slot Allocation
          </div>
          <h2 className="font-bold text-2xl md:text-3xl mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
            Claim Your Free On-Site Survey
          </h2>
          <p className="text-xs text-zinc-600 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            Our master fitters visit your property with full material samples, taking accurate millimeter laser measurements at zero cost.
          </p>
          <div className="space-y-3 pointer-events-none">
            <div className="h-11 rounded-xl bg-zinc-200/80 border border-zinc-300 flex items-center px-4 text-xs font-medium text-zinc-500">Enter your project location or phone number</div>
            <div className="w-full py-3.5 rounded-xl text-center font-bold uppercase tracking-wider text-xs shadow-lg" style={{ background: '#18181B', color: '#F7F5F0' }}>
              Secure Your Free Survey Slot
            </div>
          </div>
        </div>
      </div>

      {/* Scene 4: Outro & Definitive Guarantee (18s - 20s) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center scene-4">
        <h3 className="font-bold text-3xl md:text-5xl leading-tight tracking-tight max-w-3xl mb-3" style={{ fontFamily: "'Cinzel', serif", color: '#F7F5F0' }}>
          Custom-Fabricated to the Millimeter.
        </h3>
        <p className="text-lg md:text-xl font-semibold tracking-wide" style={{ color: '#B38F5B', fontFamily: "'Inter', sans-serif" }}>
          Backed by our Unconditional 5-Year Performance Guarantee.
        </p>
      </div>
    </div>
  )
}