import { useState } from 'react'
import type { Battery, BatterySection } from '@/types'
import { Collapsible, Badge, Button, StatusDot, Divider } from '@/components/UI'
import { AnodeTab } from './tabs/AnodeTab'
import { CathodeTab } from './tabs/CathodeTab'
import { SeparatorTab } from './tabs/SeparatorTab'
import { AssemblyTab } from './tabs/AssemblyTab'
import { MeasurementTab } from './tabs/MeasurementTab'

// Heuristic: section is "filled" if at least one required field is non-empty
function isFilled(battery: Battery, section: BatterySection): boolean {
  switch (section) {
    case 'anode':      return !!battery.anode.material && !!battery.anode.thicknessUm
    case 'cathode':    return !!battery.cathode.material && !!battery.cathode.thicknessUm
    case 'separator':  return !!battery.separator.material && !!battery.separator.thicknessUm
    case 'assembly':   return !!battery.assembly.cellFormat && !!battery.assembly.electrolyte
    case 'measurement': return !!battery.measurement.capacityMah && !!battery.measurement.voltageWindow
    default:           return false
  }
}

const TABS: { key: BatterySection; label: string }[] = [
  { key: 'anode',       label: 'Anode' },
  { key: 'cathode',     label: 'Cathode' },
  { key: 'separator',   label: 'Separator' },
  { key: 'assembly',    label: 'Assembly' },
  { key: 'measurement', label: 'Measurement' },
]

interface Props {
  battery: Battery
  index: number
  onChange: (section: BatterySection, patch: Record<string, string>) => void
  onRemove: () => void
  onDuplicate: () => void
}

export function BatteryCard({ battery, index, onChange, onRemove, onDuplicate }: Props) {
  const [activeTab, setActiveTab] = useState<BatterySection>('anode')

  const filledCount = TABS.filter((t) => isFilled(battery, t.key)).length
  const allFilled = filledCount === TABS.length

  const summary = `${battery.anode.material} / ${battery.cathode.material}`

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '.9rem' }}>
          Battery #{index + 1}
          <span style={{ marginLeft: '8px' }}>
          <Badge
            variant={allFilled ? 'success' : filledCount > 0 ? 'warning' : 'neutral'}
          >
            {allFilled ? 'Complete' : filledCount > 0 ? `${filledCount}/5 sections` : 'Empty'}
          </Badge>
          </span>
        </div>
        <div style={{ fontSize: '.78rem', color: 'var(--text-3)', marginTop: '1px' }}>
          {summary}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDuplicate() }}>
          Duplicate
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          style={{ color: 'var(--danger)' }}
        >
          Remove
        </Button>
      </div>
    </div>
  )

  return (
    <Collapsible header={header} defaultOpen={index === 0}>
      <div style={{ display: 'flex', minHeight: '280px' }}>
        {/* Vertical tab rail */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            padding: '12px 8px',
            borderRight: '1px solid var(--border)',
            minWidth: '130px',
            background: 'var(--surface-2)',
          }}
          aria-label="Battery sections"
        >
          {TABS.map((t) => {
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius)',
                  border: 'none',
                  background: active ? 'var(--accent-light)' : 'transparent',
                  color: active ? 'var(--accent-text)' : 'var(--text-2)',
                  fontWeight: active ? 600 : 400,
                  fontSize: '.83rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background .15s, color .15s',
                }}
              >
                <StatusDot filled={isFilled(battery, t.key)} />
                {t.label}
              </button>
            )
          })}
        </nav>

        {/* Tab content */}
        <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
          {activeTab === 'anode' && (
            <AnodeTab
              data={battery.anode}
              onChange={(p) => onChange('anode', p as Record<string, string>)}
            />
          )}
          {activeTab === 'cathode' && (
            <CathodeTab
              data={battery.cathode}
              onChange={(p) => onChange('cathode', p as Record<string, string>)}
            />
          )}
          {activeTab === 'separator' && (
            <SeparatorTab
              data={battery.separator}
              onChange={(p) => onChange('separator', p as Record<string, string>)}
            />
          )}
          {activeTab === 'assembly' && (
            <AssemblyTab
              data={battery.assembly}
              onChange={(p) => onChange('assembly', p as Record<string, string>)}
            />
          )}
          {activeTab === 'measurement' && (
            <MeasurementTab
              data={battery.measurement}
              onChange={(p) => onChange('measurement', p as Record<string, string>)}
            />
          )}

          <Divider style={{ margin: '1rem 0 .75rem' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeTab !== 'measurement' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const idx = TABS.findIndex((t) => t.key === activeTab)
                  if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1].key)
                }}
              >
                Next section →
              </Button>
            )}
          </div>
        </div>
      </div>
    </Collapsible>
  )
}
