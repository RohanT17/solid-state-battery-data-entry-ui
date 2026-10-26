import type { MeasurementData, CycleLifeCriteria } from '@/types'
import { Field, FormGrid } from '@/components/UI'

const CRITERIA: CycleLifeCriteria[] = ['Failure', '80% capacity retention', 'End of graph']

interface Props {
  data: MeasurementData
  onChange: (patch: Partial<MeasurementData>) => void
}

export function CycleLifeVariable({ data, onChange }: Props) {
  const set =
    (key: keyof MeasurementData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <FormGrid cols={2}>
        <Field label="Charge Voltage Cut-off" unit="V">
          <input
            type="number"
            step="any"
            value={data.clvChargeVoltageCutoff}
            onChange={set('clvChargeVoltageCutoff')}
            placeholder="e.g. 4.2"
          />
        </Field>

        <Field label="Discharge Voltage Cut-off" unit="V">
          <input
            type="number"
            step="any"
            value={data.clvDischargeVoltageCutoff}
            onChange={set('clvDischargeVoltageCutoff')}
            placeholder="e.g. 2.5"
          />
        </Field>

        <Field label="Cycle Life">
          <input
            type="number"
            min={0}
            value={data.clvCycleLife}
            onChange={set('clvCycleLife')}
            placeholder="e.g. 300"
          />
        </Field>

        <Field label="Cycle Life Criteria">
          <select
            value={data.clvCycleLifeCriteria}
            onChange={(e) => onChange({ clvCycleLifeCriteria: e.target.value as CycleLifeCriteria })}
          >
            <option value="">Select criteria</option>
            {CRITERIA.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Total Areal Capacity Passed" unit="mAh/cm²" style={{ gridColumn: 'span 2' }}>
          <input
            type="number"
            min={0}
            step="any"
            value={data.clvTotalArealCapacity}
            onChange={set('clvTotalArealCapacity')}
            placeholder="e.g. 300"
          />
        </Field>
      </FormGrid>

      <Field label="Comments" optional>
        <textarea
          value={data.clvComments}
          onChange={set('clvComments')}
          placeholder="Any notes…"
          style={{ minHeight: '72px' }}
        />
      </Field>
    </div>
  )
}