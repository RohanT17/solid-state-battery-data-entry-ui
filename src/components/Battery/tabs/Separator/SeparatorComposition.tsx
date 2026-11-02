import type { SeparatorData } from '@/types'
import { Field } from '@/components/UI'

// ── Option maps ───────────────────────────────────────────────────────────────

const ELECTROLYTE_FAMILIES = ['Li', 'Na']

const ELECTROLYTE_INORGANIC_SUBCATEGORIES: Record<string, string[]> = {
  'Li': ['LISICON Type', 'Argyrodite', 'NASICON Type', 'Nitride', 'Hydride', 'Perovskite', 'Garnet', 'Sulfide', 'Anti-Perovskite', 'Halide', 'LiPON', 'None'],
  'Na': ['Inorganic Crystalline', 'Sulfide', 'None'],
}

const ELECTROLYTE_INORGANIC_MATERIALS: Record<string, Record<string, string[]>> = {
  'Li': {
    'LISICON Type':   ['LiSiPO', 'Li3PS4', 'LiSiPS', 'LiGePS', 'Li14Zn(GeO4)4', 'Other'],
    'Argyrodite':     ['Li6PS5Br', 'Li6PS5Cl', 'Li2PS6', 'Li6PS5I', 'Li6PO5Cl', 'Other'],
    'NASICON Type':   ['LATP (Including Doped)', 'LTP (Including Doped)', 'LiGeP (Including Doped)', 'LHFP (Including Doped)', 'LZP (Including Doped)', 'LAGP', 'Other'],
    'Nitride':        ['Li3N', 'Li2PN4', 'LiSi2N3', 'LiPN2', 'Other'],
    'Hydride':        ['Li2NH', 'Li3(NH2)2I', 'LiBH4', 'LiAlH4', 'Other'],
    'Perovskite':     ['LiLaTiO2', 'LiSr2Ti2NbO9', 'LLTAO', 'LiNdTiO', 'Li3xLa2/3-xTiO3', 'Other'],
    'Garnet':         ['LLZO (Including Doped) - Tetragonal', 'LLZO (Including Doped) - Cubic', 'Li5La3Ta2O12', 'Li5La3Nb2O12', 'Li6BaLa2Ta2O12', 'Other'],
    'Sulfide':        ['X:Li2S-Y:PS5', 'LGPS', 'Li4GeS4', 'Other'],
    'Anti-Perovskite':['Li3OCl', 'Li3O(ClBr)', 'Li3OBr', 'LiBaClO', 'LiMgClO', 'LiCaClO', 'Other'],
    'Halide':         ['LiF–YF3', 'LiF–ScF3', 'Li3YCl6', 'Li2.5Y0.5Zr0.5Cl6', 'Li3ErCl6', 'Li3YbCl6', 'Li3YBr6', 'Li3ScCl6', 'Li3ScBr6', 'Li3ErI6', 'Li3ScI6', 'Li3YI6', 'Li3LaI6', 'LiYCl3', 'LiICl3', 'Li3InCl6', 'Other'],
    'LiPON':          ['Li3PO4 (Including Doped)', 'Li3PO4-2Li2O', 'Other'],
    'None':           ['None'],
  },
  'Na': {
    'Inorganic Crystalline': ['Na-β″-Al2O3 (Including Additives)', 'Na-β\'-Al2O3 (Including Additives)', 'NBA - Other', 'NZSP (NASICON - Including Doped)', 'NYZC', 'NBH', 'Other'],
    'Sulfide':               ['Na3PS4 - cubic', 'Na3SbS4', 'Na3PS4', 'Na11Sn2PS12', 'NPSO', 'Other'],
    'None':                  ['None'],
  },
}

const ELECTROLYTE_ORGANIC_SUBCATEGORIES: Record<string, string[]> = {
  'Li': ['Single Polymer', 'Polymer Blend', 'Organic Electrolytes', 'None'],
  'Na': ['Single Polymer', 'Polymer Blend', 'Organic Electrolyte', 'None'],
}

const ELECTROLYTE_ORGANIC_MATERIALS: Record<string, Record<string, string[]>> = {
  'Li': {
    'Single Polymer':      ['PEO-Based', 'Mxene-Based', 'PEGDA-Based', 'PAN-Based', '1,3 Dioxolane-Based', 'PBA-Based', 'PVDF-Based', 'PEG-Based', 'PTFE-Based', 'Other'],
    'Polymer Blend':       ['PEO-Based', 'Mxene-Based', 'PEGDA or PEGDMA - Based', 'PAN-Based', '1,3 Dioxolane-Based', 'PBA-Based', 'PVDF-Based', 'PEG-Based', 'PTFE-Based', 'Succinonitrile', 'Other'],
    'Organic Electrolytes':['Succinonitrile', 'Other'],
    'None':                ['None'],
  },
  'Na': {
    'Single Polymer':     ['PEO-Based', 'Mxene-Based', 'PEGDA-Based', 'PAN-Based', '1,3 Dioxolane-Based', 'PBA-Based', 'PVDF-Based', 'PEG-Based', 'PTFE-Based', 'Other'],
    'Polymer Blend':      ['PEO-Based', 'Mxene-Based', 'PEGDA-Based', 'PAN-Based', '1,3 Dioxolane-Based', 'PBA-Based', 'PVDF-Based', 'PEG-Based', 'PTFE-Based', 'Other'],
    'Organic Electrolyte':['Succinonitrile', 'Other'],
    'None':               ['None'],
  },
}

const BINDERS = ['PEO-Based', 'MEEP-Based', 'PO-Based', 'PSi-Based', 'PPG-Based', 'PVA-Based', 'PVDF-Based', 'PVP-Based', 'PTMC-Based', 'PAN-Based', 'Mxene-Based', 'PBA-Based', '1,3 Dioxolane-Based', 'PTFO-Based', 'SBR-Based', 'Cellulose-Based', 'PTFE-Based', 'PPC-Based', 'PVB-Based', 'PEGDA or PEGDMA-Based', 'None', 'Other']

const IONIC_SALT_FAMILIES = ['Li', 'Na', 'None']

const IONIC_SALT_MATERIALS: Record<string, string[]> = {
  'Li':   ['LiTFSi', 'LiPF6', 'LiCl04', 'LiBF6', 'LiCF3SO3', 'LiF', 'LiFSI', 'Other'],
  'Na':   ['NaPF6', 'NaClO4', 'NaTFSi', 'NaFSi', 'NaFNFSI', 'NaBr', 'NaPCPI', 'NaTCP', 'NaTIM', 'NaCF3SO3', 'NaCl', 'Other'],
  'None': ['None'],
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

        {/* Inorganic chain — always shown once family selected */}
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
          options={ELECTROLYTE_INORGANIC_MATERIALS[data.electrolyteFamily]?.[data.electrolyteInorganicSubcategory] ?? []}
          disabled={!data.electrolyteInorganicSubcategory}
          disabledHint="Select an inorganic subcategory first"
          onChange={(v) => onChange({ electrolyteInorganicMaterial: v })}
        />

        <PctInput
          value={data.electrolyteInorganicCompositionPct}
          onChange={(v) => onChange({ electrolyteInorganicCompositionPct: v })}
        />

        {/* Organic chain — always shown once family selected */}
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
          options={ELECTROLYTE_ORGANIC_MATERIALS[data.electrolyteFamily]?.[data.electrolyteOrganicSubcategory] ?? []}
          disabled={!data.electrolyteOrganicSubcategory}
          disabledHint="Select an organic subcategory first"
          onChange={(v) => onChange({ electrolyteOrganicMaterial: v })}
        />

        <PctInput
          value={data.electrolyteOrganicCompositionPct}
          onChange={(v) => onChange({ electrolyteOrganicCompositionPct: v })}
        />
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
          label="Material"
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