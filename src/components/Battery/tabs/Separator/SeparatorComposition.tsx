import type { SeparatorData } from '@/types'
import { Field } from '@/components/UI'

// ── Placeholder option maps ───────────────────────────────────────────────────

const ELECTROLYTE_FAMILIES = ['Inorganic', 'Organic']

const INORGANIC_SUBCATEGORIES = ['Inorganic Sub 1', 'Inorganic Sub 2']
const INORGANIC_MATERIALS_BY_SUBCATEGORY: Record<string, string[]> = {
  'Inorganic Sub 1': ['Inorganic Mat 1A', 'Inorganic Mat 1B'],
  'Inorganic Sub 2': ['Inorganic Mat 2A', 'Inorganic Mat 2B'],
}

const ORGANIC_SUBCATEGORIES = ['Organic Sub 1', 'Organic Sub 2']
const ORGANIC_MATERIALS_BY_SUBCATEGORY: Record<string, string[]> = {
  'Organic Sub 1': ['Organic Mat 1A', 'Organic Mat 1B'],
  'Organic Sub 2': ['Organic Mat 2A', 'Organic Mat 2B'],
}

const BINDERS = ['Binder 1', 'Binder 2', 'Binder 3']

const IONIC_SALT_FAMILIES = ['Salt Family 1', 'Salt Family 2']
const IONIC_SALT_MATERIALS: Record<string, string[]> = {
  'Salt Family 1': ['Salt 1A', 'Salt 1B'],
  'Salt Family 2': ['Salt 2A', 'Salt 2B'],
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const sectionHeader = (title: string) => (
  <p style={{
    fontSize: '.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    color: 'var(--text-3)',
    paddingBottom: '6px',
    borderBottom: '1px solid var(--border)',
    marginBottom: '2px',
  }}>
    {title}
  </p>
)

function isPctInvalid(value: string): boolean {
  if (value === '') return false
  const n = Number(value)
  return !Number.isFinite(n) || n < 0 || n > 100
}

function PctInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const invalid = isPctInvalid(value)
  return (
    <Field label="Composition" unit="%">
      <input
        type="number"
        min={0}
        max={100}
        step="any"
        value={value}
        aria-invalid={invalid}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. 20"
        style={invalid
          ? { color: 'var(--danger, #d33)', borderColor: 'var(--danger, #d33)' }
          : undefined}
      />
    </Field>
  )
}

function DependentSelect({
  label,
  value,
  options,
  disabled,
  disabledHint,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  disabled: boolean
  disabledHint: string
  onChange: (v: string) => void
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        style={disabled ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
        title={disabled ? disabledHint : undefined}
      >
        <option value="">{disabled ? disabledHint : `Select ${label.toLowerCase()}`}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Field>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  data: SeparatorData
  onChange: (patch: Partial<SeparatorData>) => void
}

export function SeparatorComposition({ data, onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── Electrolyte ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('Electrolyte')}

        <Field label="Family">
          <select
            value={data.electrolyteFamily}
            onChange={(e) => onChange({
              electrolyteFamily: e.target.value,
              electrolyteInorganicSubcategory: '',
              electrolyteInorganicMaterial: '',
              electrolyteInorganicCompositionPct: '',
              electrolyteOrganicSubcategory: '',
              electrolyteOrganicMaterial: '',
              electrolyteOrganicCompositionPct: '',
            })}
          >
            <option value="">Select a family</option>
            {ELECTROLYTE_FAMILIES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </Field>

        {data.electrolyteFamily === 'Inorganic' && (
          <>
            <DependentSelect
              label="Inorganic subcategory"
              value={data.electrolyteInorganicSubcategory}
              options={INORGANIC_SUBCATEGORIES}
              disabled={false}
              disabledHint=""
              onChange={(v) => onChange({ electrolyteInorganicSubcategory: v, electrolyteInorganicMaterial: '' })}
            />

            <DependentSelect
              label="Inorganic material"
              value={data.electrolyteInorganicMaterial}
              options={INORGANIC_MATERIALS_BY_SUBCATEGORY[data.electrolyteInorganicSubcategory] ?? []}
              disabled={!data.electrolyteInorganicSubcategory}
              disabledHint="Select an inorganic subcategory first"
              onChange={(v) => onChange({ electrolyteInorganicMaterial: v })}
            />

            <PctInput
              value={data.electrolyteInorganicCompositionPct}
              onChange={(v) => onChange({ electrolyteInorganicCompositionPct: v })}
            />
          </>
        )}

        {data.electrolyteFamily === 'Organic' && (
          <>
            <DependentSelect
              label="Organic subcategory"
              value={data.electrolyteOrganicSubcategory}
              options={ORGANIC_SUBCATEGORIES}
              disabled={false}
              disabledHint=""
              onChange={(v) => onChange({ electrolyteOrganicSubcategory: v, electrolyteOrganicMaterial: '' })}
            />

            <DependentSelect
              label="Organic material"
              value={data.electrolyteOrganicMaterial}
              options={ORGANIC_MATERIALS_BY_SUBCATEGORY[data.electrolyteOrganicSubcategory] ?? []}
              disabled={!data.electrolyteOrganicSubcategory}
              disabledHint="Select an organic subcategory first"
              onChange={(v) => onChange({ electrolyteOrganicMaterial: v })}
            />

            <PctInput
              value={data.electrolyteOrganicCompositionPct}
              onChange={(v) => onChange({ electrolyteOrganicCompositionPct: v })}
            />
          </>
        )}
      </div>

      {/* ── Binder ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('Binder')}

        <Field label="Binder">
          <select
            value={data.binder}
            onChange={(e) => onChange({ binder: e.target.value })}
          >
            <option value="">Select a binder</option>
            {BINDERS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>

        <PctInput value={data.binderCompositionPct} onChange={(v) => onChange({ binderCompositionPct: v })} />
      </div>

      {/* ── Ionic Salt ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('Ionic Salt')}

        <Field label="Family">
          <select
            value={data.ionicSaltFamily}
            onChange={(e) => onChange({ ionicSaltFamily: e.target.value, ionicSaltMaterial: '' })}
          >
            <option value="">Select a family</option>
            {IONIC_SALT_FAMILIES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </Field>

        <DependentSelect
          label="Additive material"
          value={data.ionicSaltMaterial}
          options={IONIC_SALT_MATERIALS[data.ionicSaltFamily] ?? []}
          disabled={!data.ionicSaltFamily}
          disabledHint="Select a family first"
          onChange={(v) => onChange({ ionicSaltMaterial: v })}
        />

        <PctInput value={data.ionicSaltCompositionPct} onChange={(v) => onChange({ ionicSaltCompositionPct: v })} />
      </div>

      {/* ── Comments ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('Comments')}

        <Field label="Comments" optional>
          <textarea
            value={data.compositionComments}
            onChange={(e) => onChange({ compositionComments: e.target.value })}
            placeholder="Any notes about this separator composition…"
            style={{ minHeight: '80px' }}
          />
        </Field>
      </div>

    </div>
  )
}
