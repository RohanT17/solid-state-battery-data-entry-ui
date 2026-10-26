import type { MeasurementData, CycleLifeCriteria } from '@/types'
import { Field, FormGrid } from '@/components/UI'

const CRITERIA: CycleLifeCriteria[] = ['Failure', '80% capacity retention', 'End of graph']

interface Props {
  data: MeasurementData
  onChange: (patch: Partial<MeasurementData>) => void
}

export function CycleLifeConstant({ data, onChange }: Props) {
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
            value={data.clcChargeVoltageCutoff}
            onChange={set('clcChargeVoltageCutoff')}
            placeholder="e.g. 4.2"
          />
        </Field>

        <Field label="Discharge Voltage Cut-off" unit="V">
          <input
            type="number"
            step="any"
            value={data.clcDischargeVoltageCutoff}
            onChange={set('clcDischargeVoltageCutoff')}
            placeholder="e.g. 2.5"
          />
        </Field>

        <Field label="Charging Current Density" unit="mA/cm²">
          <input
            type="number"
            min={0}
            step="any"
            value={data.clcChargingCurrentDensity}
            onChange={set('clcChargingCurrentDensity')}
            placeholder="e.g. 0.1"
          />
        </Field>

        <Field label="Current Density (Constant)" unit="mA/cm²">
          <input
            type="number"
            min={0}
            step="any"
            value={data.clcConstantCurrentDensity}
            onChange={set('clcConstantCurrentDensity')}
            placeholder="e.g. 0.5"
          />
        </Field>

        <Field label="Areal Capacity" unit="mAh/cm²">
          <input
            type="number"
            min={0}
            step="any"
            value={data.clcArealCapacity}
            onChange={set('clcArealCapacity')}
            placeholder="e.g. 1.0"
          />
        </Field>

        <Field label="Cycle Life">
          <input
            type="number"
            min={0}
            value={data.clcCycleLife}
            onChange={set('clcCycleLife')}
            placeholder="e.g. 500"
          />
        </Field>

        <Field label="Cycle Life Criteria">
          <select
            value={data.clcCycleLifeCriteria}
            onChange={(e) => onChange({ clcCycleLifeCriteria: e.target.value as CycleLifeCriteria })}
          >
            <option value="">Select criteria</option>
            {CRITERIA.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Total Discharge Areal Capacity Passed" unit="mAh/cm²">
          <input
            type="number"
            min={0}
            step="any"
            value={data.clcTotalDischargeArealCapacity}
            onChange={set('clcTotalDischargeArealCapacity')}
            placeholder="e.g. 500"
          />
        </Field>
      </FormGrid>

      <Field label="Comments" optional>
        <textarea
          value={data.clcComments}
          onChange={set('clcComments')}
          placeholder="Any notes…"
          style={{ minHeight: '72px' }}
        />
      </Field>
    </div>
  )
}