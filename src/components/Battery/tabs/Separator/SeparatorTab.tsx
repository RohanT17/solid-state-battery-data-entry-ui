import { useState } from 'react'
import type { SeparatorData } from '@/types'
import { SeparatorLayers } from './SeparatorLayers'
import { SeparatorComposition } from './SeparatorComposition'

interface Props {
  data: SeparatorData
  onChange: (patch: Partial<SeparatorData>) => void
}

type SeparatorSubTab = 'composition' | 'layers'

export function SeparatorTab({ data, onChange }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<SeparatorSubTab>('composition')
  const tabContent = {
    composition: <SeparatorComposition data={data} onChange={onChange} />,
    layers: <SeparatorLayers data={data} onChange={onChange} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <nav aria-label="Separator subsections" style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border)' }}>
        {([
          ['composition', 'Composition'],
          ['layers', 'Layer Properties']
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
