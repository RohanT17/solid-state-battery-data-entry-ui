import { useState } from 'react'
import type { Battery, BatterySection } from '@/types'
import { Collapsible, Badge, Button, StatusDot, Divider } from '@/components/UI'
import { AnodeTab }       from './tabs/Anode/AnodeTab'
import { CathodeTab }     from './tabs/Cathode/CathodeTab'
import { SeparatorTab }   from './tabs/Separator/SeparatorTab'
import { AssemblyTab }    from './tabs/AssemblyTab'
import { MeasurementTab } from './tabs/Measurement/MeasurementTab'
import '../../styles/button.css'

function isFilled(battery: Battery, section: BatterySection): boolean {
  const isFilledValue = (v: unknown): boolean => {
    if (Array.isArray(v)) return v.length > 0 && v.every((item) =>
      Object.entries(item)
        .filter(([key]) => key !== 'id')
        .every(([, val]) => isFilledValue(val))
    )
    if (typeof v === 'string') return v.trim() !== ''
    return true
  }

  const ignoreKeys = new Set(['compositionComments', 'conditionsComments', 'clcComments', 'clvComments', 'layerComments', 'comments'])

  const allFilled = (obj: Record<string, unknown>) =>
    Object.entries(obj)
      .filter(([key]) => !ignoreKeys.has(key))
      .every(([, val]) => isFilledValue(val))

  switch (section) {
    case 'anode':       return allFilled(battery.anode as unknown as Record<string, unknown>)
    case 'cathode':     return allFilled(battery.cathode as unknown as Record<string, unknown>)
    case 'separator':   return allFilled(battery.separator as unknown as Record<string, unknown>)
    case 'assembly':    return allFilled(battery.assembly as unknown as Record<string, unknown>)
    case 'measurement': return allFilled(battery.measurement as unknown as Record<string, unknown>)
    default:            return false
  }
}

// jumpBackLabel: the name shown on the "Prev" button when jumping back into this tab
const TABS: { key: BatterySection; label: string; jumpBackLabel: string }[] = [
  { key: 'anode',       label: 'Anode',       jumpBackLabel: 'Layer Properties' },
  { key: 'separator',   label: 'Separator',   jumpBackLabel: 'Layer Properties' },
  { key: 'cathode',     label: 'Cathode',     jumpBackLabel: 'Layer Properties' },
  { key: 'assembly',    label: 'Assembly',    jumpBackLabel: 'Assembly' },
  { key: 'measurement', label: 'Measurement', jumpBackLabel: 'Rate Tests' },
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
  // true when the tab was entered via "Prev", so it opens on its last sub-tab
  const [enterAtEnd, setEnterAtEnd] = useState(false)

  const filledCount = TABS.filter((t) => isFilled(battery, t.key)).length
  const allFilled = filledCount === TABS.length

  const summary = `${battery.anode.amFamily || '—'} / ${battery.cathode.amMaterial || '—'}`

  const activeIndex = TABS.findIndex((t) => t.key === activeTab)

  const prevMainTabLabel = activeIndex > 0 ? TABS[activeIndex - 1].jumpBackLabel : undefined

  const advanceMainTab = () => {
    if (activeIndex < TABS.length - 1) {
      setEnterAtEnd(false)
      setActiveTab(TABS[activeIndex + 1].key)
    }
  }

  const retreatMainTab = () => {
    if (activeIndex > 0) {
      setEnterAtEnd(true)
      setActiveTab(TABS[activeIndex - 1].key)
    }
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
                onClick={() => { setEnterAtEnd(false); setActiveTab(t.key) }}
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
              onPrevMainTab={retreatMainTab}
              prevMainTabLabel={prevMainTabLabel}
              startAtEnd={enterAtEnd}
            />
          )}
          {activeTab === 'cathode' && (
            <CathodeTab
              data={battery.cathode}
              onChange={(p) => onChange('cathode', p as Record<string, string>)}
              onNextMainTab={advanceMainTab}
              onPrevMainTab={retreatMainTab}
              prevMainTabLabel={prevMainTabLabel}
              startAtEnd={enterAtEnd}
            />
          )}
          {activeTab === 'separator' && (
            <SeparatorTab
              data={battery.separator}
              onChange={(p) => onChange('separator', p as Record<string, string>)}
              onNextMainTab={advanceMainTab}
              onPrevMainTab={retreatMainTab}
              prevMainTabLabel={prevMainTabLabel}
              startAtEnd={enterAtEnd}
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
              onPrevMainTab={retreatMainTab}
              prevMainTabLabel={prevMainTabLabel}
              startAtEnd={enterAtEnd}
            />
          )}

          {activeTab !== 'measurement' && (
            <>
              <Divider className="battery-card-divider" />
              <div className="battery-card-next-action">
                {activeIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={retreatMainTab}
                  >
                    ← Previous section
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={advanceMainTab}
                  style={{ marginLeft: 'auto' }}
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