import type { MeasurementData } from '@/types'
import { Field, FormGrid } from '@/components/UI'

interface Props {
  data: MeasurementData
  onChange: (patch: Partial<MeasurementData>) => void
}

export function Conditions({ data, onChange }: Props) {
  const set =
    (key: keyof MeasurementData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <FormGrid cols={2}>
        <Field label="Temperature" unit="°C">
          <input
            type="number"
            value={data.temperatureC}
            onChange={set('temperatureC')}
            placeholder="e.g. 25"
          />
        </Field>

        <Field label="Mechanical Condition" unit="MPa">
          <input
            type="number"
            min={0}
            step="any"
            value={data.mechanicalConditionMpa}
            onChange={set('mechanicalConditionMpa')}
            placeholder="e.g. 10"
          />
        </Field>
      </FormGrid>

      <Field label="Comments" optional>
        <textarea
          value={data.conditionsComments}
          onChange={set('conditionsComments')}
          placeholder="Any notes about test conditions…"
          style={{ minHeight: '72px' }}
        />
      </Field>
    </div>
  )
}