import type { SeparatorData, SeparatorPolishTreatment } from '@/types'
import { Field, FormGrid } from '@/components/UI'

const PREPARATION_METHODS = [
  'Tape casting',
  'Dry pressing',
  'Cold isostatic pressing',
  'Hot pressing',
  'Sintering',
  'Spin coating',
  'Slurry casting',
  'Sol-gel',
  'Other',
]

const POLISH_TREATMENTS: SeparatorPolishTreatment[] = ['Wet', 'Dry', 'Mixed (Wet + Dry)', 'None']

interface Props {
  data: SeparatorData
  onChange: (patch: Partial<SeparatorData>) => void
}

export function SeparatorLayer({ data, onChange }: Props) {
  const set =
    (key: keyof SeparatorData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ [key]: e.target.value } as Partial<SeparatorData>)

  const gritApplicable = data.polishTreatment !== '' && data.polishTreatment !== 'None'

  return (
    <FormGrid cols={2}>
      <Field label="Preparation method" optional>
        <select value={data.preparationMethod} onChange={set('preparationMethod')}>
          <option value="">Select a preparation method</option>
          {PREPARATION_METHODS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </Field>

      <Field label="Heat treatment temp" unit="°C" optional>
        <input type="number" value={data.heatTreatmentTempC} onChange={set('heatTreatmentTempC')} placeholder="e.g. 300" />
      </Field>

      <Field label="Press pressure" unit="MPa" optional>
        <input type="number" min={0} step="0.1" value={data.pressPressureMpa} onChange={set('pressPressureMpa')} placeholder="e.g. 150" />
      </Field>

      <Field label="Separator thickness" unit="µm">
        <input type="number" min={0} value={data.thicknessUm} onChange={set('thicknessUm')} placeholder="e.g. 25" />
      </Field>

      <Field label="Polish treatment" optional>
        <select
          value={data.polishTreatment}
          onChange={(e) => onChange({
            polishTreatment: e.target.value as SeparatorPolishTreatment,
            finestPolishGritUm: '',
          })}
        >
          <option value="">Not reported</option>
          {POLISH_TREATMENTS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>

      <Field label="Finest polish grit" unit="µm" optional>
        <input
          type="number"
          min={0}
          value={data.finestPolishGritUm}
          onChange={set('finestPolishGritUm')}
          disabled={!gritApplicable}
          style={!gritApplicable ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
          title={!gritApplicable ? 'Select a polish treatment that uses grit first' : undefined}
          placeholder="e.g. 1"
        />
      </Field>

      <Field label="Sintering temp" unit="°C" optional>
        <input type="number" value={data.sinteringTempC} onChange={set('sinteringTempC')} placeholder="e.g. 900" />
      </Field>

      <Field label="Sintering time" unit="hrs" optional>
        <input type="number" min={0} step="0.1" value={data.sinteringTimeHrs} onChange={set('sinteringTimeHrs')} placeholder="e.g. 4" />
      </Field>

      <Field label="Separator area" unit="cm²" optional>
        <input type="number" min={0} step="0.01" value={data.areaCm2} onChange={set('areaCm2')} placeholder="e.g. 1.33" />
      </Field>

      <Field label="Conductivity at 25°C" unit="S/cm" optional>
        <input type="text" value={data.conductivity25C} onChange={set('conductivity25C')} placeholder="e.g. 1.2e-4" />
      </Field>

      <Field label="Surface roughness" optional>
        <input type="number" step="any" value={data.surfaceRoughness} onChange={set('surfaceRoughness')} placeholder="e.g. 0.5" />
      </Field>

      <Field label="Density" unit="g/cm³" optional>
        <input type="number" min={0} step="0.01" value={data.densityGCm3} onChange={set('densityGCm3')} placeholder="e.g. 2.1" />
      </Field>

      <Field label="Comments" optional style={{ gridColumn: 'span 2' }}>
        <textarea
          value={data.layerComments}
          onChange={set('layerComments')}
          placeholder="Any notes about this separator's layer properties…"
          style={{ minHeight: '80px' }}
        />
      </Field>
    </FormGrid>
  )
}
