// ── Paper ─────────────────────────────────────────────────────────────────────

export interface Paper {
  id: string
  journal: string
  publicationDate: string   // stored as "Mon-YY", e.g. "Mar-24"
  leadAuthor: string
  ingestedBy: string
  doi: string
  cycleLifeReported: 'Yes' | 'No' | ''
  rateTestReported: 'Yes' | 'No' | ''
  eisReported: 'Yes' | 'No' | ''
  otherTests: string
}

export type PaperDraft = Omit<Paper, 'id'>

// ── Battery sub-sections ──────────────────────────────────────────────────────

export type AnodeMaterial = 'Graphite' | 'Li-metal' | 'Si/Graphite' | 'LTO' | 'Other'
export type CathodeMaterial = 'LFP' | 'NMC' | 'NCA' | 'LCO' | 'Other'
export type SeparatorMaterial =
  | 'Celgard 2325 (PP/PE/PP)'
  | 'Celgard 2400 (PP)'
  | 'Glass fiber'
  | 'Ceramic-coated'
  | 'Solid electrolyte'
  | 'Other'
export type CellFormat = 'Coin cell' | 'Pouch' | 'Cylindrical' | 'Prismatic'

export interface AnodeData {
  material: AnodeMaterial
  thicknessUm: string
  loadingMgCm2: string
  porosityPct: string
  binderComposition: string
}

export interface CathodeData {
  material: CathodeMaterial
  thicknessUm: string
  nmcRatio: string
  loadingMgCm2: string
}

export interface SeparatorData {
  material: SeparatorMaterial
  thicknessUm: string
  porosityPct: string
}

export interface AssemblyData {
  cellFormat: CellFormat
  electrolyte: string
  electrolyteVolumeUl: string
  stackPressureMpa: string
}

export interface MeasurementData {
  capacityMah: string
  cRateCharge: string
  cRateDischarge: string
  voltageWindow: string
  temperatureC: string
  cycles80pct: string
  icePct: string
}

// ── Battery ───────────────────────────────────────────────────────────────────

export interface Battery {
  id: string
  paperId: string
  anode: AnodeData
  cathode: CathodeData
  separator: SeparatorData
  assembly: AssemblyData
  measurement: MeasurementData
}

export type BatterySection = 'anode' | 'cathode' | 'separator' | 'assembly' | 'measurement'

// ── App state ─────────────────────────────────────────────────────────────────

export type AppScreen = 'papers' | 'batteries' | 'csv'

export interface AppState {
  screen: AppScreen
  papers: Paper[]
  batteries: Battery[]
  activePaperId: string | null
}