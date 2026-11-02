import { useState } from 'react'
import type { CathodeData } from '@/types'
import { CathodeLayer }      from './CathodeLayer'
import { CathodeComposition } from './CathodeComposition'

interface Props {
  data: CathodeData
  onChange: (patch: Partial<CathodeData>) => void
  onNextMainTab: () => void
  onPrevMainTab: () => void
  prevMainTabLabel?: string
  startAtEnd: boolean
}

type CathodeSubTab = 'composition' | 'layer'

const SUB_TABS: { key: CathodeSubTab; label: string }[] = [
  { key: 'composition', label: 'Composition' },
  { key: 'layer',       label: 'Layer Properties' },
]

export function CathodeTab({ data, onChange, onNextMainTab, onPrevMainTab, prevMainTabLabel, startAtEnd }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<CathodeSubTab>(startAtEnd ? 'layer' : 'composition')

  const handleNext = () => {
    if (activeSubTab === 'composition') {
      setActiveSubTab('layer')
    } else {
      onNextMainTab()
    }
  }

  const handleBack = () => {
    setActiveSubTab('composition')
  }

  const prevLabel = activeSubTab === 'composition' ? prevMainTabLabel : 'Composition'
  const handlePrev = activeSubTab === 'composition' ? onPrevMainTab : handleBack

  const nextLabel = activeSubTab === 'composition' ? 'Next: Layer Properties →' : 'Next: Assembly →'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <nav
        aria-label="Cathode subsections"
        style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border)' }}
      >
        {SUB_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveSubTab(key)}
            aria-selected={activeSubTab === key}
            style={{
              padding: '6px 12px',
              border: 0,
              borderBottom: activeSubTab === key
                ? '2px solid var(--accent)'
                : '2px solid transparent',
              background: 'transparent',
              color: activeSubTab === key ? 'var(--text)' : 'var(--text-3)',
              cursor: 'pointer',
              fontSize: '.85rem',
              fontWeight: activeSubTab === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div>
        {activeSubTab === 'composition'
          ? <CathodeComposition data={data} onChange={onChange} />
          : <CathodeLayer       data={data} onChange={onChange} />
        }
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        {prevLabel && (
          <button
            type="button"
            onClick={handlePrev}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-2)',
              fontSize: '.875rem',
              cursor: 'pointer',
            }}
          >
            ← Prev: {prevLabel}
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          style={{
            marginLeft: 'auto',
            padding: '6px 14px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-2)',
            fontSize: '.875rem',
            cursor: 'pointer',
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}