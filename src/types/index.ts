// ── Paper ─────────────────────────────────────────────────────────────────────

export interface Paper {
  id: string
  journal: string
  publicationDate: string
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

export type AnodeMaterial = '' | 'material 1' | 'material 2' | 'material 3' | 'material 4' | 'material 5'
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
  // Composition — Active Material
  family: string
  type: string
  material: AnodeMaterial
  amCompositionPct: string

  // Composition — Coating
  coating: string

  // Composition — Electrolyte
  electrolyteFamilyInorganic: string
  electrolyteInorganicSubcategory: string
  electrolyteInorganicMaterial: string
  electrolyteInorganicWtPct: string
  electrolyteFamilyOrganic: string
  electrolyteOrganicSubcategory: string
  electrolyteOrganicMaterial: string
  electrolyteOrganicWtPct: string

  // Composition — Binder
  binder: string
  binderWtPct: string

  // Composition — Ionic Salt
  ionicSaltFamily: string
  ionicSaltMaterial: string
  ionicSaltWtPct: string

  // Composition — Additive
  additiveFamily: string
  additiveMaterial: string
  additiveWtPct: string

  // Composition — Comments
  compositionComments: string

  // Layers
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
  // Layer Properties
  material: SeparatorMaterial
  thicknessUm: string
  porosityPct: string

  // Composition — Electrolyte
  electrolyteFamily: string
  electrolyteInorganicSubcategory: string
  electrolyteInorganicMaterial: string
  electrolyteInorganicCompositionPct: string
  electrolyteOrganicSubcategory: string
  electrolyteOrganicMaterial: string
  electrolyteOrganicCompositionPct: string

  // Composition — Binder
  binder: string
  binderCompositionPct: string

  // Composition — Ionic Salt
  ionicSaltFamily: string
  ionicSaltMaterial: string
  ionicSaltCompositionPct: string

  // Composition — Comments
  compositionComments: string
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