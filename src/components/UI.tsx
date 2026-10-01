import React from 'react'

// ── Button ────────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--accent)',
    color: '#fff',
    border: '1px solid var(--accent)',
  },
  secondary: {
    background: 'var(--surface)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-2)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'transparent',
    color: 'var(--danger)',
    border: '1px solid var(--danger)',
  },
}

export function Button({
  variant = 'secondary',
  size = 'md',
  children,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: size === 'sm' ? '.25rem .6rem' : '.4rem .85rem',
        fontSize: size === 'sm' ? '.8rem' : '.875rem',
        fontWeight: 500,
        borderRadius: 'var(--radius)',
        lineHeight: 1.4,
        transition: 'opacity .15s, background .15s',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'ghost') (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-2)'
        if (variant === 'secondary') (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-2)'
      }}
      onMouseLeave={(e) => {
        if (variant === 'ghost') (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
        if (variant === 'secondary') (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)'
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

// ── Field ─────────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string
  unit?: string
  optional?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Field({ label, unit, optional, children, style }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }}>
      <label
        style={{
          fontSize: '.78rem',
          fontWeight: 500,
          color: 'var(--text-2)',
          display: 'flex',
          gap: '5px',
          alignItems: 'baseline',
        }}
      >
        {label}
        {unit && <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>{unit}</span>}
        {optional && (
          <span style={{ color: 'var(--text-3)', fontWeight: 400, fontSize: '.72rem' }}>
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

// ── FormGrid ──────────────────────────────────────────────────────────────────

export function FormGrid({
  cols = 2,
  children,
  style,
}: {
  cols?: number
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '10px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────

type BadgeVariant = 'accent' | 'success' | 'warning' | 'neutral'

const badgeColors: Record<BadgeVariant, { bg: string; text: string }> = {
  accent:  { bg: 'var(--accent-light)',   text: 'var(--accent-text)' },
  success: { bg: 'var(--success-light)',  text: 'var(--success)' },
  warning: { bg: 'var(--warning-light)',  text: 'var(--warning)' },
  neutral: { bg: 'var(--surface-2)',      text: 'var(--text-2)' },
}

export function Badge({ children, variant = 'neutral' }: { children: React.ReactNode; variant?: BadgeVariant }) {
  const { bg, text } = badgeColors[variant]
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '20px',
        fontSize: '.72rem',
        fontWeight: 600,
        background: bg,
        color: text,
        letterSpacing: '.01em',
      }}
    >
      {children}
    </span>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────

export function Card({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────

export function Divider({ style }: { style?: React.CSSProperties }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid var(--border)',
        ...style,
      }}
    />
  )
}

// ── Conditional field wrapper ─────────────────────────────────────────────────

export function ConditionalField({
  show,
  children,
}: {
  show: boolean
  children: React.ReactNode
}) {
  if (!show) return null
  return (
    <div
      style={{
        borderLeft: '2px solid var(--accent)',
        paddingLeft: '12px',
        padding: '10px 12px',
        background: 'var(--accent-light)',
        borderRadius: '0 var(--radius) var(--radius) 0',
        marginTop: '10px',
      }}
    >
      {children}
    </div>
  )
}

// ── Tag input + chips ─────────────────────────────────────────────────────────

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
}

export function TagInput({ tags, onChange }: TagInputProps) {
  const [draft, setDraft] = React.useState('')

  const commit = () => {
    const val = draft.trim()
    if (val && !tags.includes(val)) onChange([...tags, val])
    setDraft('')
  }

  return (
    <div>
      <input
        type="text"
        value={draft}
        placeholder="Type and press Enter"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            commit()
          }
          if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
            onChange(tags.slice(0, -1))
          }
        }}
        onBlur={commit}
      />
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '6px' }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                fontSize: '.78rem',
                color: 'var(--text-2)',
              }}
            >
              {t}
              <button
                onClick={() => onChange(tags.filter((x) => x !== t))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-3)',
                  fontSize: '1rem',
                  lineHeight: 1,
                  padding: 0,
                  cursor: 'pointer',
                }}
                aria-label={`Remove tag ${t}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Collapsible ───────────────────────────────────────────────────────────────

interface CollapsibleProps {
  header: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}

export function Collapsible({ header, defaultOpen = false, children }: CollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <Card style={{ overflow: 'hidden' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '.9rem 1.1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '12px',
        }}
        aria-expanded={open}
      >
        <div style={{ flex: 1, minWidth: 0 }}>{header}</div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform .2s',
            color: 'var(--text-3)',
          }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {children}
        </div>
      )}
    </Card>
  )
}

// ── Status dot ────────────────────────────────────────────────────────────────

export function StatusDot({ filled }: { filled: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: filled ? 'var(--success)' : 'var(--border-2)',
        flexShrink: 0,
      }}
    />
  )
}
