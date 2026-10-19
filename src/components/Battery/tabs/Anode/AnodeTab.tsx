import { useState } from 'react'
import type { AnodeData } from '@/types'
import { AnodeLayers } from './AnodeLayers'
import { AnodeComposition } from './AnodeComposition'

interface Props {
  data: AnodeData
  onChange: (patch: Partial<AnodeData>) => void
}

type AnodeSubTab = 'composition' | 'layers'

export function AnodeTab({ data, onChange }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<AnodeSubTab>('layers')
  const tabContent = {
    composition: <AnodeComposition data={data} onChange={onChange} />,
    layers: <AnodeLayers data={data} onChange={onChange} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <nav aria-label="Anode subsections" style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border)' }}>
        {([
          ['composition', 'Composition'],
          ['layers', 'Layers']
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveSubTab(key)}
            aria-selected={activeSubTab === key}
            style={{
              padding: '6px 12px',
              border: 0,
              borderBottom: activeSubTab === key ? '2px solid var(--accent)' : '2px solid transparent',
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

      <div>{tabContent[activeSubTab]}</div>
    </div>
  )
}
