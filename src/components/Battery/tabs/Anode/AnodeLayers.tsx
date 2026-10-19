import type { AnodeData } from '@/types'
import { Field, FormGrid } from '@/components/UI'

interface Props {
  data: AnodeData
  onChange: (patch: Partial<AnodeData>) => void
}

export function AnodeLayers({ data, onChange }: Props) {
  const set =
    (key: keyof AnodeData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <FormGrid cols={2}>
      <Field label="Thickness" unit="µm">
        <input type="number" min={0} value={data.thicknessUm} onChange={set('thicknessUm')} placeholder="e.g. 150" />
      </Field>

      <Field label="Active material loading" unit="mg/cm²">
        <input type="number" min={0} step="0.1" value={data.loadingMgCm2} onChange={set('loadingMgCm2')} placeholder="e.g. 10.5" />
      </Field>

      <Field label="Porosity" unit="%" optional>
        <input type="number" min={0} max={100} value={data.porosityPct} onChange={set('porosityPct')} placeholder="e.g. 35" />
      </Field>

      <Field label="Binder / additive composition" optional style={{ gridColumn: 'span 2' }}>
        <input
          type="text"
          value={data.binderComposition}
          onChange={set('binderComposition')}
          placeholder="e.g. 94% graphite, 2% SBR, 4% CMC"
        />
      </Field>
    </FormGrid>
  )
}
