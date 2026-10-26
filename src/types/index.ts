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
export type CycleLifeCriteria = 'Failure' | '80% capacity retention' | 'End of graph' | ''

export interface AnodeData {
  family: string
  type: string
  material: AnodeMaterial
  amCompositionPct: string
  coating: string
  electrolyteFamilyInorganic: string
  electrolyteInorganicSubcategory: string
  electrolyteInorganicMaterial: string
  electrolyteInorganicWtPct: string
  electrolyteFamilyOrganic: string
  electrolyteOrganicSubcategory: string
  electrolyteOrganicMaterial: string
  electrolyteOrganicWtPct: string
  binder: string
  binderWtPct: string
  ionicSaltFamily: string
  ionicSaltMaterial: string
  ionicSaltWtPct: string
  additiveFamily: string
  additiveMaterial: string
  additiveWtPct: string
  compositionComments: string
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

// ── Measurement sub-types ─────────────────────────────────────────────────────

export interface RateTestEntry {
  id: string
  chargeVoltageCutoff: string
  dischargeVoltageCutoff: string
  chargingCurrentDensity: string
  dischargingCurrentDensity: string
  numCyclesAtDischargingCurrentDensity: string
  dischargeCapacity: string
  capacityRetentionPct: string
}

export interface MeasurementData {
  // Conditions
  temperatureC: string
  mechanicalConditionMpa: string
  conditionsComments: string

  // Cycle Life — Constant Discharge Current Density
  clcChargeVoltageCutoff: string
  clcDischargeVoltageCutoff: string
  clcChargingCurrentDensity: string
  clcConstantCurrentDensity: string
  clcArealCapacity: string
  clcCycleLife: string
  clcCycleLifeCriteria: CycleLifeCriteria
  clcTotalDischargeArealCapacity: string
  clcComments: string

  // Cycle Life — Variable Current Density
  clvChargeVoltageCutoff: string
  clvDischargeVoltageCutoff: string
  clvCycleLife: string
  clvCycleLifeCriteria: CycleLifeCriteria
  clvTotalArealCapacity: string
  clvComments: string

  // Rate Tests (up to 8)
  rateTests: RateTestEntry[]
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