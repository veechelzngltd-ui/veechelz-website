export interface Finish {
  name: string
  hex: string
}

// Sampled directly from the physical finish-card photo (not AI-generated),
// so these match the real stock rather than an approximation.
export const timberFinishes: Finish[] = [
  { name: 'Tiger Eye', hex: '#714B38' },
  { name: 'Black', hex: '#272B2A' },
  { name: 'Mahogany', hex: '#3E3432' },
  { name: 'Walnut', hex: '#463B38' },
  { name: 'Cherry', hex: '#7C413D' },
  { name: 'Orange', hex: '#A2563F' },
  { name: 'Oak', hex: '#E6AE70' },
  { name: 'Natural', hex: '#D2AD7E' },
  { name: 'White', hex: '#F1EFE9' },
]

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amount))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

interface FinishSwatchProps {
  finish: Finish
  size?: number
  selected?: boolean
  onSelect?: (finish: Finish) => void
}

export function FinishSwatch({ finish, size = 36, selected, onSelect }: FinishSwatchProps) {
  const isLight = finish.name === 'White' || finish.name === 'Natural' || finish.name === 'Oak'
  const grain = isLight ? shade(finish.hex, -18) : shade(finish.hex, 22)

  return (
    <button
      type="button"
      onClick={onSelect ? () => onSelect(finish) : undefined}
      tabIndex={onSelect ? 0 : -1}
      title={finish.name}
      aria-label={finish.name}
      aria-pressed={onSelect ? selected : undefined}
      className={`group relative rounded-md overflow-hidden border transition-[transform,border-color,box-shadow] duration-150 ease-out ${
        onSelect ? 'cursor-pointer hover:scale-105' : 'cursor-default'
      } ${
        selected
          ? 'border-[#B38F5B] ring-2 ring-[#B38F5B] ring-offset-2 ring-offset-white'
          : 'border-[#18181B]/10'
      }`}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <svg viewBox="0 0 36 36" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
        <rect width="36" height="36" fill={finish.hex} />
        <line x1="0" y1="7" x2="36" y2="5" stroke={grain} strokeWidth="1.4" opacity="0.5" />
        <line x1="0" y1="14" x2="36" y2="13" stroke={grain} strokeWidth="1" opacity="0.4" />
        <line x1="0" y1="21" x2="36" y2="23" stroke={grain} strokeWidth="1.6" opacity="0.45" />
        <line x1="0" y1="29" x2="36" y2="28" stroke={grain} strokeWidth="1" opacity="0.35" />
      </svg>
    </button>
  )
}

interface FinishSwatchRowProps {
  finishes?: Finish[]
  size?: number
  label?: string
  selected?: string
  onSelect?: (finish: Finish) => void
}

export function FinishSwatchRow({
  finishes = timberFinishes,
  size = 36,
  label = 'Available Finishes',
  selected,
  onSelect,
}: FinishSwatchRowProps) {
  return (
    <div className="mb-4">
      {label && (
        <p className="text-[10px] font-medium tracking-wider uppercase text-stone-500 mb-2">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {finishes.map((finish) => (
          <FinishSwatch
            key={finish.name}
            finish={finish}
            size={size}
            selected={onSelect ? selected === finish.name : undefined}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

interface SlatPreviewProps {
  finish: Finish
  className?: string
}

/**
 * Large venetian-slat illustration that re-colours when a finish is picked,
 * so selecting a swatch visibly changes the product image.
 */
export function SlatPreview({ finish, className = '' }: SlatPreviewProps) {
  const isLight = finish.name === 'White' || finish.name === 'Natural' || finish.name === 'Oak'
  const grain = isLight ? shade(finish.hex, -22) : shade(finish.hex, 26)
  const hi = shade(finish.hex, 30)
  const lo = shade(finish.hex, -40)
  const slats = Array.from({ length: 9 }, (_, i) => i)
  const woody = finish.name === 'Tiger Eye'

  return (
    <svg
      viewBox="0 0 200 150"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${finish.name} venetian slats`}
    >
      <rect width="200" height="150" fill="#EDE9E0" />
      {/* window light behind the slats */}
      <rect x="20" y="10" width="160" height="130" fill="#FBFAF6" />
      {/* headrail */}
      <rect x="16" y="8" width="168" height="8" rx="1.5" style={{ fill: lo, transition: 'fill 300ms ease' }} />
      {slats.map((i) => {
        const y = 20 + i * 13.2
        return (
          <g key={i}>
            <rect x="20" y={y + 2} width="160" height="11" fill="#000" opacity="0.12" />
            <rect
              x="20"
              y={y}
              width="160"
              height="10.5"
              rx="1"
              style={{ fill: finish.hex, transition: 'fill 300ms ease' }}
            />
            <rect x="20" y={y} width="160" height="2" style={{ fill: hi, transition: 'fill 300ms ease' }} opacity="0.55" />
            <rect x="20" y={y + 8.6} width="160" height="1.9" style={{ fill: lo, transition: 'fill 300ms ease' }} opacity="0.5" />
            <line x1="26" y1={y + 4} x2="120" y2={y + 3.6} style={{ stroke: grain, transition: 'stroke 300ms ease' }} strokeWidth="0.6" opacity={woody ? 0.7 : 0.35} />
            <line x1="60" y1={y + 6.4} x2="172" y2={y + 6.8} style={{ stroke: grain, transition: 'stroke 300ms ease' }} strokeWidth="0.5" opacity={woody ? 0.6 : 0.3} />
          </g>
        )
      })}
      {/* ladder cords */}
      <line x1="48" y1="16" x2="48" y2="138" stroke="#cfc8b8" strokeWidth="0.8" />
      <line x1="152" y1="16" x2="152" y2="138" stroke="#cfc8b8" strokeWidth="0.8" />
      {/* bottom rail */}
      <rect x="18" y="139" width="164" height="5" rx="1.5" style={{ fill: lo, transition: 'fill 300ms ease' }} />
    </svg>
  )
}
