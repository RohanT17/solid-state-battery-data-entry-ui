import { useState } from 'react'
import type { AnodeData } from '@/types'
import { AnodeLayers } from './AnodeLayers'
import { AnodeComposition } from './AnodeComposition'

interface Props {
  data: AnodeData
  onChange: (patch: Partial<AnodeData>) => void
  onNextMainTab: () => void
}

type AnodeSubTab = 'composition' | 'layers'

const SUB_TABS: { key: AnodeSubTab; label: string }[] = [
  { key: 'composition', label: 'Composition' },
  { key: 'layers',      label: 'Layers' },
]

export function AnodeTab({ data, onChange, onNextMainTab }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<AnodeSubTab>('composition')

  const handleNext = () => {
    if (activeSubTab === 'composition') {
      setActiveSubTab('layers')
    } else {
      onNextMainTab()
    }
  }

  const nextLabel = activeSubTab === 'composition' ? 'Next: Layers →' : 'Next: Cathode →'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <nav
        aria-label="Anode subsections"
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
          ? <AnodeComposition data={data} onChange={onChange} />
          : <AnodeLayers data={data} onChange={onChange} />
        }
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleNext}
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
          {nextLabel}
        </button>
      </div>
    </div>
  )
}