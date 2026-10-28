import type { CathodeData } from '@/types'
import { Field } from '@/components/UI'

// ── Placeholder option maps ───────────────────────────────────────────────────

const AM_FAMILIES = ['Family A', 'Family B']

const AM_TYPES_BY_FAMILY: Record<string, string[]> = {
  'Family A': ['Type A1', 'Type A2', 'Type A3'],
  'Family B': ['Type B1', 'Type B2'],
}

const AM_MATERIALS_BY_TYPE: Record<string, string[]> = {
  'Type A1': ['Material A1a', 'Material A1b'],
  'Type A2': ['Material A2a', 'Material A2b'],
  'Type A3': ['Material A3a', 'Material A3b'],
  'Type B1': ['Material B1a', 'Material B1b'],
  'Type B2': ['Material B2a', 'Material B2b'],
}

const COATINGS = ['Coating 1', 'Coating 2', 'Coating 3']

const ELECTROLYTE_FAMILIES = ['Electrolyte Family 1', 'Electrolyte Family 2']

const ELECTROLYTE_INORGANIC_SUBCATEGORIES: Record<string, string[]> = {
  'Electrolyte Family 1': ['Inorganic Sub 1A', 'Inorganic Sub 1B'],
  'Electrolyte Family 2': ['Inorganic Sub 2A', 'Inorganic Sub 2B'],
}
const ELECTROLYTE_INORGANIC_MATERIALS: Record<string, string[]> = {
  'Inorganic Sub 1A': ['Inorganic Mat 1A-i', 'Inorganic Mat 1A-ii'],
  'Inorganic Sub 1B': ['Inorganic Mat 1B-i', 'Inorganic Mat 1B-ii'],
  'Inorganic Sub 2A': ['Inorganic Mat 2A-i', 'Inorganic Mat 2A-ii'],
  'Inorganic Sub 2B': ['Inorganic Mat 2B-i', 'Inorganic Mat 2B-ii'],
}

const ELECTROLYTE_ORGANIC_SUBCATEGORIES: Record<string, string[]> = {
  'Electrolyte Family 1': ['Organic Sub 1A', 'Organic Sub 1B'],
  'Electrolyte Family 2': ['Organic Sub 2A', 'Organic Sub 2B'],
}
const ELECTROLYTE_ORGANIC_MATERIALS: Record<string, string[]> = {
  'Organic Sub 1A': ['Organic Mat 1A-i', 'Organic Mat 1A-ii'],
  'Organic Sub 1B': ['Organic Mat 1B-i', 'Organic Mat 1B-ii'],
  'Organic Sub 2A': ['Organic Mat 2A-i', 'Organic Mat 2A-ii'],
  'Organic Sub 2B': ['Organic Mat 2B-i', 'Organic Mat 2B-ii'],
}

const BINDERS = ['Binder 1', 'Binder 2', 'Binder 3']

const IONIC_SALT_FAMILIES = ['Salt Family 1', 'Salt Family 2']
const IONIC_SALT_MATERIALS: Record<string, string[]> = {
  'Salt Family 1': ['Salt 1A', 'Salt 1B'],
  'Salt Family 2': ['Salt 2A', 'Salt 2B'],
}

const ADDITIVE_FAMILIES = ['Additive Family 1', 'Additive Family 2']

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

const wtPctInput = (value: string, onChange: (v: string) => void) => (
  <Field label="Weight" unit="%">
    <input
      type="number"
      min={0}
      max={100}
      step="any"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="e.g. 80"
    />
  </Field>
)

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
  data: CathodeData
  onChange: (patch: Partial<CathodeData>) => void
}

export function CathodeComposition({ data, onChange }: Props) {
  const amCompositionIsInvalid =
    data.amCompositionPct !== '' &&
    (!Number.isFinite(Number(data.amCompositionPct)) ||
      Number(data.amCompositionPct) < 0 ||
      Number(data.amCompositionPct) > 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── Active Material ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('Cathode Active Material')}

        <Field label="Family">
          <select
            value={data.amFamily}
            onChange={(e) => onChange({ amFamily: e.target.value, amType: '', amMaterial: '' })}
          >
            <option value="">Select a family</option>
            {AM_FAMILIES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </Field>

        <DependentSelect
          label="Type"
          value={data.amType}
          options={AM_TYPES_BY_FAMILY[data.amFamily] ?? []}
          disabled={!data.amFamily}
          disabledHint="Select a family first"
          onChange={(v) => onChange({ amType: v, amMaterial: '' })}
        />

        <DependentSelect
          label="Material"
          value={data.amMaterial}
          options={AM_MATERIALS_BY_TYPE[data.amType] ?? []}
          disabled={!data.amType}
          disabledHint="Select a type first"
          onChange={(v) => onChange({ amMaterial: v })}
        />

        <Field label="CAM composition" unit="%">
          <input
            type="number"
            min={0}
            max={100}
            step="any"
            value={data.amCompositionPct}
            aria-invalid={amCompositionIsInvalid}
            onChange={(e) => onChange({ amCompositionPct: e.target.value })}
            style={amCompositionIsInvalid
              ? { color: 'var(--danger, #d33)', borderColor: 'var(--danger, #d33)' }
              : undefined}
          />
        </Field>
      </div>

      {/* ── Coating ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('CAM Chemical Coating')}

        <Field label="Coating">
          <select
            value={data.coating}
            onChange={(e) => onChange({ coating: e.target.value })}
          >
            <option value="">Select a coating</option>
            {COATINGS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>

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
              electrolyteOrganicSubcategory: '',
              electrolyteOrganicMaterial: '',
            })}
          >
            <option value="">Select a family</option>
            {ELECTROLYTE_FAMILIES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </Field>

        <DependentSelect
          label="Inorganic subcategory"
          value={data.electrolyteInorganicSubcategory}
          options={ELECTROLYTE_INORGANIC_SUBCATEGORIES[data.electrolyteFamily] ?? []}
          disabled={!data.electrolyteFamily}
          disabledHint="Select a family first"
          onChange={(v) => onChange({ electrolyteInorganicSubcategory: v, electrolyteInorganicMaterial: '' })}
        />

        <DependentSelect
          label="Inorganic material"
          value={data.electrolyteInorganicMaterial}
          options={ELECTROLYTE_INORGANIC_MATERIALS[data.electrolyteInorganicSubcategory] ?? []}
          disabled={!data.electrolyteInorganicSubcategory}
          disabledHint="Select an inorganic subcategory first"
          onChange={(v) => onChange({ electrolyteInorganicMaterial: v })}
        />

        {wtPctInput(data.electrolyteInorganicWtPct, (v) => onChange({ electrolyteInorganicWtPct: v }))}

        <DependentSelect
          label="Organic subcategory"
          value={data.electrolyteOrganicSubcategory}
          options={ELECTROLYTE_ORGANIC_SUBCATEGORIES[data.electrolyteFamily] ?? []}
          disabled={!data.electrolyteFamily}
          disabledHint="Select a family first"
          onChange={(v) => onChange({ electrolyteOrganicSubcategory: v, electrolyteOrganicMaterial: '' })}
        />

        <DependentSelect
          label="Organic material"
          value={data.electrolyteOrganicMaterial}
          options={ELECTROLYTE_ORGANIC_MATERIALS[data.electrolyteOrganicSubcategory] ?? []}
          disabled={!data.electrolyteOrganicSubcategory}
          disabledHint="Select an organic subcategory first"
          onChange={(v) => onChange({ electrolyteOrganicMaterial: v })}
        />

        {wtPctInput(data.electrolyteOrganicWtPct, (v) => onChange({ electrolyteOrganicWtPct: v }))}
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

        {wtPctInput(data.binderWtPct, (v) => onChange({ binderWtPct: v }))}
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
          label="Material"
          value={data.ionicSaltMaterial}
          options={IONIC_SALT_MATERIALS[data.ionicSaltFamily] ?? []}
          disabled={!data.ionicSaltFamily}
          disabledHint="Select a family first"
          onChange={(v) => onChange({ ionicSaltMaterial: v })}
        />

        {wtPctInput(data.ionicSaltWtPct, (v) => onChange({ ionicSaltWtPct: v }))}
      </div>

      {/* ── Additive ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('Additive')}

        <Field label="Family">
          <select
            value={data.additiveFamily}
            onChange={(e) => onChange({ additiveFamily: e.target.value })}
          >
            <option value="">Select a family</option>
            {ADDITIVE_FAMILIES.map((f) => <option key={f}>{f}</option>)}
          </select>
        </Field>

        <Field label="Material">
          <input
            type="text"
            value={data.additiveMaterial}
            onChange={(e) => onChange({ additiveMaterial: e.target.value })}
            placeholder="e.g. additive name or formula"
          />
        </Field>

        {wtPctInput(data.additiveWtPct, (v) => onChange({ additiveWtPct: v }))}
      </div>

      {/* ── Comments ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectionHeader('Comments')}

        <Field label="Comments" optional>
          <textarea
            value={data.compositionComments}
            onChange={(e) => onChange({ compositionComments: e.target.value })}
            placeholder="Any notes about this cathode composition…"
            style={{ minHeight: '80px' }}
          />
        </Field>
      </div>

    </div>
  )
}