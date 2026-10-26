import type { AssemblyData, CellCasingType } from '@/types'
import { Field, FormGrid } from '@/components/UI'

const CASING_TYPES: CellCasingType[] = ['Coin', 'Pouch', 'Split Cell', 'Other']

interface Props {
  data: AssemblyData
  onChange: (patch: Partial<AssemblyData>) => void
}

export function AssemblyTab({ data, onChange }: Props) {
  const set =
    (key: keyof AssemblyData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ [key]: e.target.value } as Partial<AssemblyData>)

  return (
    <FormGrid cols={2}>
      <Field label="Type of cell casing">
        <select value={data.cellCasingType} onChange={set('cellCasingType')}>
          <option value="">Select a casing type</option>
          {CASING_TYPES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>

      <Field label="Heat treatment temp" unit="°C" optional>
        <input type="number" value={data.heatTreatmentTempC} onChange={set('heatTreatmentTempC')} placeholder="e.g. 100" />
      </Field>

      <Field label="Applied pressure during assembly" unit="MPa" optional>
        <input type="number" min={0} step="0.1" value={data.appliedPressureMpa} onChange={set('appliedPressureMpa')} placeholder="e.g. 50" />
      </Field>

      <Field label="Comments" optional style={{ gridColumn: 'span 2' }}>
        <textarea
          value={data.comments}
          onChange={set('comments')}
          placeholder="Any notes about this cell's assembly…"
          style={{ minHeight: '80px' }}
        />
      </Field>
    </FormGrid>
  )
}
