import type { MeasurementData, RateTestEntry } from '@/types'
import { Field, FormGrid } from '@/components/UI'
import { uid } from '@/utils/factories'

const MAX_RATE_TESTS = 8

interface Props {
  data: MeasurementData
  onChange: (patch: Partial<MeasurementData>) => void
}

function RateTestRow({
  entry,
  index,
  onUpdate,
  onRemove,
}: {
  entry: RateTestEntry
  index: number
  onUpdate: (patch: Partial<RateTestEntry>) => void
  onRemove: () => void
}) {
  const set =
    (key: keyof RateTestEntry) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onUpdate({ [key]: e.target.value })

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-2)' }}>
          Rate Test #{index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--danger)',
            fontSize: '.8rem',
            cursor: 'pointer',
            padding: '2px 6px',
          }}
        >
          Remove
        </button>
      </div>

      <FormGrid cols={2}>
        <Field label="Charge Voltage Cut-off" unit="V">
          <input type="number" step="any" value={entry.chargeVoltageCutoff} onChange={set('chargeVoltageCutoff')} placeholder="e.g. 4.2" />
        </Field>

        <Field label="Discharge Voltage Cut-off" unit="V">
          <input type="number" step="any" value={entry.dischargeVoltageCutoff} onChange={set('dischargeVoltageCutoff')} placeholder="e.g. 2.5" />
        </Field>

        <Field label="Charging Current Density" unit="mA/cm²">
          <input type="number" min={0} step="any" value={entry.chargingCurrentDensity} onChange={set('chargingCurrentDensity')} placeholder="e.g. 0.1" />
        </Field>

        <Field label="Discharging Current Density" unit="mA/cm²">
          <input type="number" min={0} step="any" value={entry.dischargingCurrentDensity} onChange={set('dischargingCurrentDensity')} placeholder="e.g. 0.5" />
        </Field>

        <Field label="No. Cycles at Discharging Current Density">
          <input type="number" min={0} value={entry.numCyclesAtDischargingCurrentDensity} onChange={set('numCyclesAtDischargingCurrentDensity')} placeholder="e.g. 10" />
        </Field>

        <Field label="Discharge Capacity" unit="mAh/cm²">
          <input type="number" min={0} step="any" value={entry.dischargeCapacity} onChange={set('dischargeCapacity')} placeholder="e.g. 1.0" />
        </Field>

        <Field label="Capacity Retention" unit="%" style={{ gridColumn: 'span 2' }}>
          <input type="number" min={0} max={100} step="any" value={entry.capacityRetentionPct} onChange={set('capacityRetentionPct')} placeholder="e.g. 95" />
        </Field>
      </FormGrid>
    </div>
  )
}

export function RateTests({ data, onChange }: Props) {
  const tests = data.rateTests

  const addTest = () => {
    if (tests.length >= MAX_RATE_TESTS) return
    onChange({ rateTests: [...tests, { id: uid(), chargeVoltageCutoff: '', dischargeVoltageCutoff: '', chargingCurrentDensity: '', dischargingCurrentDensity: '', numCyclesAtDischargingCurrentDensity: '', dischargeCapacity: '', capacityRetentionPct: '' }] })
  }

  const updateTest = (id: string, patch: Partial<RateTestEntry>) => {
    onChange({
      rateTests: tests.map((t) => t.id === id ? { ...t, ...patch } : t),
    })
  }

  const removeTest = (id: string) => {
    onChange({ rateTests: tests.filter((t) => t.id !== id) })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tests.length === 0 && (
        <p style={{ fontSize: '.85rem', color: 'var(--text-3)', textAlign: 'center', padding: '1rem 0' }}>
          No rate tests yet. Add up to {MAX_RATE_TESTS}.
        </p>
      )}

      {tests.map((entry, i) => (
        <RateTestRow
          key={entry.id}
          entry={entry}
          index={i}
          onUpdate={(patch) => updateTest(entry.id, patch)}
          onRemove={() => removeTest(entry.id)}
        />
      ))}

      {tests.length < MAX_RATE_TESTS && (
        <button
          type="button"
          onClick={addTest}
          style={{
            width: '100%',
            padding: '.65rem',
            border: '1px dashed var(--border-2)',
            borderRadius: 'var(--radius-lg)',
            background: 'transparent',
            color: 'var(--text-3)',
            fontSize: '.875rem',
            cursor: 'pointer',
          }}
        >
          + Add rate test {tests.length > 0 ? `(${tests.length}/${MAX_RATE_TESTS})` : ''}
        </button>
      )}
    </div>
  )
}