import type { SeparatorData, SeparatorMaterial } from '@/types'
import { Field, FormGrid } from '@/components/UI'

const MATERIALS: SeparatorMaterial[] = [
  'Celgard 2325 (PP/PE/PP)',
  'Celgard 2400 (PP)',
  'Glass fiber',
  'Ceramic-coated',
  'Solid electrolyte',
  'Other',
]

interface Props {
  data: SeparatorData
  onChange: (patch: Partial<SeparatorData>) => void
}

export function SeparatorTab({ data, onChange }: Props) {
  const set =
    (key: keyof SeparatorData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <FormGrid cols={2}>
      <Field label="Material" style={{ gridColumn: 'span 2' }}>
        <select value={data.material} onChange={set('material')}>
          {MATERIALS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </Field>

      <Field label="Thickness" unit="µm">
        <input type="number" min={0} value={data.thicknessUm} onChange={set('thicknessUm')} placeholder="e.g. 25" />
      </Field>

      <Field label="Porosity" unit="%" optional>
        <input type="number" min={0} max={100} value={data.porosityPct} onChange={set('porosityPct')} placeholder="e.g. 41" />
      </Field>
    </FormGrid>
  )
}
