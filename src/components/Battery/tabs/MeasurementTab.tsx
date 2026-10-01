import type { MeasurementData } from '@/types'
import { Field, FormGrid } from '@/components/UI'

interface Props {
  data: MeasurementData
  onChange: (patch: Partial<MeasurementData>) => void
}

export function MeasurementTab({ data, onChange }: Props) {
  const set =
    (key: keyof MeasurementData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <FormGrid cols={2}>
      <Field label="Nominal capacity" unit="mAh">
        <input type="number" min={0} step="0.01" value={data.capacityMah} onChange={set('capacityMah')} placeholder="e.g. 3.2" />
      </Field>

      <Field label="Voltage window" unit="V">
        <input type="text" value={data.voltageWindow} onChange={set('voltageWindow')} placeholder="e.g. 2.5–4.2" />
      </Field>

      <Field label="C-rate (charge)">
        <input type="text" value={data.cRateCharge} onChange={set('cRateCharge')} placeholder="e.g. C/10" />
      </Field>

      <Field label="C-rate (discharge)" optional>
        <input type="text" value={data.cRateDischarge} onChange={set('cRateDischarge')} placeholder="e.g. C/5" />
      </Field>

      <Field label="Temperature" unit="°C" optional>
        <input type="number" value={data.temperatureC} onChange={set('temperatureC')} placeholder="e.g. 25" />
      </Field>

      <Field label="Cycles to 80% SOH" optional>
        <input type="number" min={0} value={data.cycles80pct} onChange={set('cycles80pct')} placeholder="" />
      </Field>

      <Field label="Initial Coulombic efficiency" unit="%" optional>
        <input type="number" min={0} max={100} step="0.1" value={data.icePct} onChange={set('icePct')} placeholder="" />
      </Field>
    </FormGrid>
  )
}
