import { useState } from 'react'
import type { SeparatorData } from '@/types'
import { SeparatorLayer } from './SeparatorLayer'
import { SeparatorComposition } from './SeparatorComposition'

interface Props {
  data: SeparatorData
  onChange: (patch: Partial<SeparatorData>) => void
  onNextMainTab: () => void
  onPrevMainTab: () => void
  prevMainTabLabel?: string
  startAtEnd: boolean
}

type SeparatorSubTab = 'composition' | 'layers'

const SUB_TABS: { key: SeparatorSubTab; label: string }[] = [
  { key: 'composition', label: 'Composition' },
  { key: 'layers',      label: 'Layer Properties' },
]

export function SeparatorTab({ data, onChange, onNextMainTab, onPrevMainTab, prevMainTabLabel, startAtEnd }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<SeparatorSubTab>(startAtEnd ? 'layers' : 'composition')

  const handleNext = () => {
    if (activeSubTab === 'composition') {
      setActiveSubTab('layers')
    } else {
      onNextMainTab()
    }
  }

  const handleBack = () => {
    setActiveSubTab('composition')
  }

  const prevLabel = activeSubTab === 'composition' ? prevMainTabLabel : 'Composition'
  const handlePrev = activeSubTab === 'composition' ? onPrevMainTab : handleBack

  const nextLabel = activeSubTab === 'composition' ? 'Next: Layer Properties →' : 'Next: Cathode →'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <nav
        aria-label="Separator subsections"
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
          ? <SeparatorComposition data={data} onChange={onChange} />
          : <SeparatorLayer data={data} onChange={onChange} />
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