import type { AnodeData } from '@/types'
import { Field, FormGrid } from '@/components/UI'

const ACTIVE_MATERIAL_PREPARATIONS = [
  'Preparation Method 1',
  'Preparation Method 2',
  'Preparation Method 3',
]

const INTERLAYER_TYPES = [
  'Interlayer Type 1',
  'Interlayer Type 2',
  'Interlayer Type 3',
]

const COATING_PREPARATION_METHODS = [
  'Coating Method 1',
  'Coating Method 2',
  'Coating Method 3',
]

interface Props {
  data: AnodeData
  onChange: (patch: Partial<AnodeData>) => void
}

export function AnodeLayer({ data, onChange }: Props) {
  const set =
    (key: keyof AnodeData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ [key]: e.target.value })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <FormGrid cols={2}>

        <Field label="Active Material Preparation with Binder/SE" style={{ gridColumn: 'span 2' }}>
          <select value={data.activeMaterialPreparation} onChange={set('activeMaterialPreparation')}>
            <option value="">Select a preparation method</option>
            {ACTIVE_MATERIAL_PREPARATIONS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>

        <Field label="Heat Treatment Temp" unit="°C">
          <input
            type="number"
            step="any"
            value={data.heatTreatmentTempC}
            onChange={set('heatTreatmentTempC')}
            placeholder="e.g. 120"
          />
        </Field>

        <Field label="Anode Thickness" unit="µm">
          <input
            type="number"
            min={0}
            step="any"
            value={data.anodeThicknessUm}
            onChange={set('anodeThicknessUm')}
            placeholder="e.g. 150"
          />
        </Field>

        <Field label="Interlayer Type">
          <select value={data.interlayerType} onChange={set('interlayerType')}>
            <option value="">Select an interlayer type</option>
            {INTERLAYER_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Coating Preparation Method">
          <select value={data.coatingPreparationMethod} onChange={set('coatingPreparationMethod')}>
            <option value="">Select a coating preparation method</option>
            {COATING_PREPARATION_METHODS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>

        <Field label="Interlayer Thickness" unit="µm">
          <input
            type="number"
            min={0}
            step="any"
            value={data.interlayerThicknessUm}
            onChange={set('interlayerThicknessUm')}
            placeholder="e.g. 10"
          />
        </Field>

        <Field label="Areal Active Material Loading" unit="mg/cm²">
          <input
            type="number"
            min={0}
            step="any"
            value={data.arealLoadingMgCm2}
            onChange={set('arealLoadingMgCm2')}
            placeholder="e.g. 10.5"
          />
        </Field>

        <Field label="Layer Area" unit="cm²">
          <input
            type="number"
            min={0}
            step="any"
            value={data.layerAreaCm2}
            onChange={set('layerAreaCm2')}
            placeholder="e.g. 1.27"
          />
        </Field>

        <Field label="Initial Theoretical Areal Capacity" unit="mAh/cm²" style={{ gridColumn: 'span 2' }}>
          <input
            type="number"
            min={0}
            step="any"
            value={data.initialTheoreticalArealCapacity}
            onChange={set('initialTheoreticalArealCapacity')}
            placeholder="e.g. 3.8"
          />
        </Field>

      </FormGrid>

      <Field label="Anode Preparation and Layer Properties Comments" optional>
        <textarea
          value={data.layerComments}
          onChange={set('layerComments')}
          placeholder="Any notes about anode preparation or layer properties…"
          style={{ minHeight: '80px' }}
        />
      </Field>
    </div>
  )
}