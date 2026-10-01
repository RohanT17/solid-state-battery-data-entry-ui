import type { CathodeData, CathodeMaterial } from '@/types'
import { Field, FormGrid, ConditionalField } from '@/components/UI'

const MATERIALS: CathodeMaterial[] = ['LFP', 'NMC', 'NCA', 'LCO', 'Other']

interface Props {
  data: CathodeData
  onChange: (patch: Partial<CathodeData>) => void
}

export function CathodeTab({ data, onChange }: Props) {
  const set =
    (key: keyof CathodeData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <FormGrid cols={2}>
        <Field label="Material">
          <select value={data.material} onChange={set('material')}>
            {MATERIALS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>

        <Field label="Thickness" unit="µm">
          <input type="number" min={0} value={data.thicknessUm} onChange={set('thicknessUm')} placeholder="e.g. 80" />
        </Field>

        <Field label="Active material loading" unit="mg/cm²" optional>
          <input type="number" min={0} step="0.1" value={data.loadingMgCm2} onChange={set('loadingMgCm2')} placeholder="e.g. 12.0" />
        </Field>
      </FormGrid>

      <ConditionalField show={data.material === 'NMC'}>
        <Field label="NMC composition (Ni:Mn:Co ratio)">
          <input
            type="text"
            value={data.nmcRatio}
            onChange={set('nmcRatio')}
            placeholder="e.g. 8:1:1 for NMC811"
          />
        </Field>
      </ConditionalField>
    </div>
  )
}
