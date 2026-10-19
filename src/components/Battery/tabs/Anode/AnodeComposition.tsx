import type { AnodeData } from '@/types'
import { Field } from '@/components/UI'

const FAMILIES = ['option 1', 'option 2']
const TYPES_BY_FAMILY: Record<string, string[]> = {
  'option 1': ['option 1.1', 'option 1.2', 'option 1.3', 'option 1.4', 'option 1.5'],
  'option 2': ['option 2.1', 'option 2.2', 'option 2.3', 'option 2.4'],
}
const MATERIALS = ['material 1', 'material 2', 'material 3', 'material 4', 'material 5']

interface Props {
  data: AnodeData
  onChange: (patch: Partial<AnodeData>) => void
}

export function AnodeComposition({ data, onChange }: Props) {
  const amCompositionIsInvalid =
    data.amCompositionPct !== '' &&
    (!Number.isFinite(Number(data.amCompositionPct)) ||
      Number(data.amCompositionPct) < 0 ||
      Number(data.amCompositionPct) > 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Field label="Family">
        <select
          value={data.family}
          onChange={(e) => onChange({ family: e.target.value, type: '', material: '' })}
        >
          <option value="">Select a family</option>
          {FAMILIES.map((family) => <option key={family}>{family}</option>)}
        </select>
      </Field>

      <Field label="Type">
        <select
          className="dependent-select"
          value={data.type}
          disabled={!data.family}
          onChange={(e) => onChange({ type: e.target.value, material: '' })}
        >
          <option value="">Select a type</option>
          {(TYPES_BY_FAMILY[data.family] ?? []).map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </Field>

      <Field label="Material">
        <select
          className="dependent-select"
          value={data.material}
          disabled={!data.type}
          onChange={(e) => onChange({ material: e.target.value as AnodeData['material'] })}
        >
          <option value="">Select a material</option>
          {MATERIALS.map((material) => <option key={material}>{material}</option>)}
        </select>
      </Field>

      <Field label="AM composition %" unit="%">
        <input
          type="number"
          min={0}
          max={100}
          step="any"
          value={data.amCompositionPct}
          aria-invalid={amCompositionIsInvalid}
          onChange={(e) => onChange({ amCompositionPct: e.target.value })}
          style={amCompositionIsInvalid ? { color: 'var(--danger, #d33)', borderColor: 'var(--danger, #d33)' } : undefined}
        />
      </Field>
    </div>
  )
}
