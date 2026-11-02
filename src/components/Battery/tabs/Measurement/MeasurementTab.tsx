import { useState } from 'react'
import type { MeasurementData } from '@/types'
import { Conditions }        from './Conditions'
import { CycleLifeConstant } from './CycleLifeConstant'
import { CycleLifeVariable } from './CycleLifeVariable'
import { RateTests }         from './RateTests'

type MeasSubTab = 'conditions' | 'clc' | 'clv' | 'rate'

const SUB_TABS: { key: MeasSubTab; label: string }[] = [
  { key: 'conditions', label: 'Conditions' },
  { key: 'clc',        label: 'Cycle Life (Constant)' },
  { key: 'clv',        label: 'Cycle Life (Variable)' },
  { key: 'rate',       label: 'Rate Tests' },
]

interface Props {
  data: MeasurementData
  onChange: (patch: Partial<MeasurementData>) => void
  onNextMainTab: () => void  // called from Rate Tests — signals "done with battery"
  onPrevMainTab: () => void
  prevMainTabLabel?: string
  startAtEnd: boolean
}

export function MeasurementTab({ data, onChange, onNextMainTab, onPrevMainTab, prevMainTabLabel, startAtEnd }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<MeasSubTab>(startAtEnd ? 'rate' : 'conditions')

  const currentIndex = SUB_TABS.findIndex((t) => t.key === activeSubTab)
  const isLast = currentIndex === SUB_TABS.length - 1

  const handleNext = () => {
    if (!isLast) {
      setActiveSubTab(SUB_TABS[currentIndex + 1].key)
    } else {
      onNextMainTab()
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) setActiveSubTab(SUB_TABS[currentIndex - 1].key)
  }

  const prevLabel = currentIndex > 0 ? SUB_TABS[currentIndex - 1].label : prevMainTabLabel
  const handlePrev = currentIndex > 0 ? handleBack : onPrevMainTab

  const nextLabel = isLast
    ? 'Done: Add another battery or preview CSV by clicking one of the buttons below'
    : `Next: ${SUB_TABS[currentIndex + 1].label} →`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <nav
        aria-label="Measurement subsections"
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--border)',
          overflowX: 'auto',
        }}
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
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div>
        {activeSubTab === 'conditions' && <Conditions        data={data} onChange={onChange} />}
        {activeSubTab === 'clc'        && <CycleLifeConstant data={data} onChange={onChange} />}
        {activeSubTab === 'clv'        && <CycleLifeVariable data={data} onChange={onChange} />}
        {activeSubTab === 'rate'       && <RateTests         data={data} onChange={onChange} />}
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
            background: isLast ? 'var(--accent)' : 'transparent',
            color: isLast ? '#fff' : 'var(--text-2)',
            fontSize: '.875rem',
            cursor: 'pointer',
            fontWeight: isLast ? 600 : 400,
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}