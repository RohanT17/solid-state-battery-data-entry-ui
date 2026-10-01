import type { AssemblyData, CellFormat } from '@/types'
import { Field, FormGrid } from '@/components/UI'

const FORMATS: CellFormat[] = ['Coin cell', 'Pouch', 'Cylindrical', 'Prismatic']

interface Props {
  data: AssemblyData
  onChange: (patch: Partial<AssemblyData>) => void
}

export function AssemblyTab({ data, onChange }: Props) {
  const set =
    (key: keyof AssemblyData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <FormGrid cols={2}>
      <Field label="Cell format">
        <select value={data.cellFormat} onChange={set('cellFormat')}>
          {FORMATS.map((f) => <option key={f}>{f}</option>)}
        </select>
      </Field>

      <Field label="Electrolyte">
        <input
          type="text"
          value={data.electrolyte}
          onChange={set('electrolyte')}
          placeholder="e.g. 1M LiPF6 in EC/DMC 1:1"
        />
      </Field>

      <Field label="Electrolyte volume" unit="µL" optional>
        <input type="number" min={0} value={data.electrolyteVolumeUl} onChange={set('electrolyteVolumeUl')} placeholder="" />
      </Field>

      <Field label="Stack pressure" unit="MPa" optional>
        <input type="number" min={0} step="0.1" value={data.stackPressureMpa} onChange={set('stackPressureMpa')} placeholder="" />
      </Field>
    </FormGrid>
  )
}
