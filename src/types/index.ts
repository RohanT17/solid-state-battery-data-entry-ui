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
export type SeparatorPolishTreatment = '' | 'Wet' | 'Dry' | 'Mixed (Wet + Dry)' | 'None'
export type CellCasingType = '' | 'Coin' | 'Pouch' | 'Split Cell' | 'Other'
export type CycleLifeCriteria = 'Failure' | '80% capacity retention' | 'End of graph' | ''

export interface AnodeData {
  // Composition — Active Material
  family: string
  type: string
  material: AnodeMaterial
  amCompositionPct: string

  // Composition — Coating
  coating: string

  // Composition — Electrolyte (single family drives both subcategory chains)
  electrolyteFamily: string
  electrolyteInorganicSubcategory: string
  electrolyteInorganicMaterial: string
  electrolyteInorganicWtPct: string
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

  // Layer Properties
  activeMaterialPreparation: string
  heatTreatmentTempC: string
  anodeThicknessUm: string
  interlayerType: string
  coatingPreparationMethod: string
  interlayerThicknessUm: string
  arealLoadingMgCm2: string
  layerAreaCm2: string
  initialTheoreticalArealCapacity: string
  layerComments: string
}

export interface CathodeData {
  // Composition — Active Material
  amFamily: string
  amType: string
  amMaterial: string
  amCompositionPct: string

  // Composition — Coating
  coating: string

  // Composition — Electrolyte
  electrolyteFamily: string
  electrolyteInorganicSubcategory: string
  electrolyteInorganicMaterial: string
  electrolyteInorganicWtPct: string
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

  // Layer Properties
  activeMaterialPreparation: string
  heatTreatmentTempC: string
  thicknessUm: string
  interlayerType: string
  coatingPreparationMethod: string
  interlayerThicknessUm: string
  arealLoadingMgCm2: string
  layerAreaCm2: string
  initialTheoreticalArealCapacity: string
  layerComments: string
}

export interface SeparatorData {
  preparationMethod: string
  heatTreatmentTempC: string
  pressPressureMpa: string
  thicknessUm: string
  polishTreatment: SeparatorPolishTreatment
  finestPolishGritUm: string
  sinteringTempC: string
  sinteringTimeHrs: string
  areaCm2: string
  conductivity25C: string
  surfaceRoughness: string
  densityGCm3: string
  layerComments: string
  electrolyteFamily: string
  electrolyteInorganicSubcategory: string
  electrolyteInorganicMaterial: string
  electrolyteInorganicCompositionPct: string
  electrolyteOrganicSubcategory: string
  electrolyteOrganicMaterial: string
  electrolyteOrganicCompositionPct: string
  binder: string
  binderCompositionPct: string
  ionicSaltFamily: string
  ionicSaltMaterial: string
  ionicSaltCompositionPct: string
  compositionComments: string
}

export interface AssemblyData {
  cellCasingType: CellCasingType
  heatTreatmentTempC: string
  appliedPressureMpa: string
  comments: string
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
  comments: string
}

export interface MeasurementData {
  temperatureC: string
  mechanicalConditionMpa: string
  conditionsComments: string
  clcChargeVoltageCutoff: string
  clcDischargeVoltageCutoff: string
  clcChargingCurrentDensity: string
  clcConstantCurrentDensity: string
  clcArealCapacity: string
  clcCycleLife: string
  clcCycleLifeCriteria: CycleLifeCriteria
  clcTotalDischargeArealCapacity: string
  clcComments: string
  clvChargeVoltageCutoff: string
  clvDischargeVoltageCutoff: string
  clvCycleLife: string
  clvCycleLifeCriteria: CycleLifeCriteria
  clvTotalArealCapacity: string
  clvComments: string
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