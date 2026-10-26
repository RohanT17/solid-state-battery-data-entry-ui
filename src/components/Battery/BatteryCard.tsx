import { useState } from 'react'
import type { Battery, BatterySection } from '@/types'
import { Collapsible, Badge, Button, StatusDot, Divider } from '@/components/UI'
import { AnodeTab }       from './tabs/Anode/AnodeTab'
import { CathodeTab }     from './tabs/CathodeTab'
import { SeparatorTab }   from './tabs/SeparatorTab'
import { AssemblyTab }    from './tabs/AssemblyTab'
import { MeasurementTab } from './tabs/Measurement/MeasurementTab'
import '../../styles/button.css'

function isFilled(battery: Battery, section: BatterySection): boolean {
  switch (section) {
    case 'anode':       return !!battery.anode.family
    case 'cathode':     return !!battery.cathode.material && !!battery.cathode.thicknessUm
    case 'separator':   return !!battery.separator.material && !!battery.separator.thicknessUm
    case 'assembly':    return !!battery.assembly.cellFormat && !!battery.assembly.electrolyte
    case 'measurement': return !!battery.measurement.temperatureC
    default:            return false
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
  onDone: () => void  // called when user finishes the last measurement subtab
}

export function BatteryCard({ battery, index, onChange, onRemove, onDuplicate, onDone }: Props) {
  const [activeTab, setActiveTab] = useState<BatterySection>('anode')

  const filledCount = TABS.filter((t) => isFilled(battery, t.key)).length
  const allFilled = filledCount === TABS.length

  const summary = `${battery.anode.family || '—'} / ${battery.cathode.material || '—'}`

  const advanceMainTab = () => {
    const idx = TABS.findIndex((t) => t.key === activeTab)
    if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1].key)
  }

  const header = (
    <div className="battery-card-header">
      <div className="battery-card-header-content">
        <div className="battery-card-title">
          Battery #{index + 1}
          <span className="battery-card-status">
            <Badge variant={allFilled ? 'success' : filledCount > 0 ? 'warning' : 'neutral'}>
              {allFilled ? 'Complete' : filledCount > 0 ? `${filledCount}/5 sections` : 'Empty'}
            </Badge>
          </span>
        </div>
        <div className="battery-card-summary">{summary}</div>
      </div>
      <div className="battery-card-actions">
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDuplicate() }}>
          Duplicate
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="battery-card-remove"
        >
          Remove
        </Button>
      </div>
    </div>
  )

  return (
    <Collapsible header={header} defaultOpen={index === 0}>
      <div className="battery-card-body">
        {/* Vertical tab rail */}
        <nav className="battery-card-tab-rail" aria-label="Battery sections">
          {TABS.map((t) => {
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`battery-card-tab${active ? ' battery-card-tab--active' : ''}`}
              >
                <StatusDot filled={isFilled(battery, t.key)} />
                {t.label}
              </button>
            )
          })}
        </nav>

                {/* Tab content — anode and measurement own their Next button internally */}
        <div className="battery-card-content">
          {activeTab === 'anode' && (
            <AnodeTab
              data={battery.anode}
              onChange={(p) => onChange('anode', p as Record<string, string>)}
              onNextMainTab={advanceMainTab}
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
              onNextMainTab={onDone}
            />
          )}

          {activeTab !== 'measurement' && (
            <>
              <Divider className="battery-card-divider" />
              <div className="battery-card-next-action">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={advanceMainTab}
                >
                  Next section →
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Collapsible>
  )
}