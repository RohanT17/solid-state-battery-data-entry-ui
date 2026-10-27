import type {
  Paper,
  Battery,
  AnodeData,
  CathodeData,
  SeparatorData,
  AssemblyData,
  MeasurementData,
  RateTestEntry,
} from '@/types'

export const uid = () => Math.random().toString(36).slice(2, 9)

export const emptyRateTest = (): RateTestEntry => ({
  id: uid(),
  chargeVoltageCutoff: '',
  dischargeVoltageCutoff: '',
  chargingCurrentDensity: '',
  dischargingCurrentDensity: '',
  numCyclesAtDischargingCurrentDensity: '',
  dischargeCapacity: '',
  capacityRetentionPct: '',
})

export const emptyAnode = (): AnodeData => ({
  // Composition — Active Material
  family: '',
  type: '',
  material: '',
  amCompositionPct: '',

  // Composition — Coating
  coating: '',

  // Composition — Electrolyte
  electrolyteFamily: '',
  electrolyteInorganicSubcategory: '',
  electrolyteInorganicMaterial: '',
  electrolyteInorganicWtPct: '',
  electrolyteOrganicSubcategory: '',
  electrolyteOrganicMaterial: '',
  electrolyteOrganicWtPct: '',

  // Composition — Binder
  binder: '',
  binderWtPct: '',

  // Composition — Ionic Salt
  ionicSaltFamily: '',
  ionicSaltMaterial: '',
  ionicSaltWtPct: '',

  // Composition — Additive
  additiveFamily: '',
  additiveMaterial: '',
  additiveWtPct: '',

  // Composition — Comments
  compositionComments: '',

  // Layer Properties
  activeMaterialPreparation: '',
  heatTreatmentTempC: '',
  anodeThicknessUm: '',
  interlayerType: '',
  coatingPreparationMethod: '',
  interlayerThicknessUm: '',
  arealLoadingMgCm2: '',
  layerAreaCm2: '',
  initialTheoreticalArealCapacity: '',
  layerComments: '',
})

export const emptyCathode = (): CathodeData => ({
  material: 'LFP',
  thicknessUm: '',
  nmcRatio: '',
  loadingMgCm2: '',
})

export const emptySeparator = (): SeparatorData => ({
  preparationMethod: '',
  heatTreatmentTempC: '',
  pressPressureMpa: '',
  thicknessUm: '',
  polishTreatment: '',
  finestPolishGritUm: '',
  sinteringTempC: '',
  sinteringTimeHrs: '',
  areaCm2: '',
  conductivity25C: '',
  surfaceRoughness: '',
  densityGCm3: '',
  layerComments: '',
  electrolyteFamily: '',
  electrolyteInorganicSubcategory: '',
  electrolyteInorganicMaterial: '',
  electrolyteInorganicCompositionPct: '',
  electrolyteOrganicSubcategory: '',
  electrolyteOrganicMaterial: '',
  electrolyteOrganicCompositionPct: '',
  binder: '',
  binderCompositionPct: '',
  ionicSaltFamily: '',
  ionicSaltMaterial: '',
  ionicSaltCompositionPct: '',
  compositionComments: '',
})

export const emptyAssembly = (): AssemblyData => ({
  cellCasingType: '',
  heatTreatmentTempC: '',
  appliedPressureMpa: '',
  comments: '',
})

export const emptyMeasurement = (): MeasurementData => ({
  temperatureC: '',
  mechanicalConditionMpa: '',
  conditionsComments: '',
  clcChargeVoltageCutoff: '',
  clcDischargeVoltageCutoff: '',
  clcChargingCurrentDensity: '',
  clcConstantCurrentDensity: '',
  clcArealCapacity: '',
  clcCycleLife: '',
  clcCycleLifeCriteria: '',
  clcTotalDischargeArealCapacity: '',
  clcComments: '',
  clvChargeVoltageCutoff: '',
  clvDischargeVoltageCutoff: '',
  clvCycleLife: '',
  clvCycleLifeCriteria: '',
  clvTotalArealCapacity: '',
  clvComments: '',
  rateTests: [],
})

export const emptyPaper = (): Paper => ({
  id: uid(),
  journal: '',
  publicationDate: '',
  leadAuthor: '',
  ingestedBy: '',
  doi: '',
  cycleLifeReported: '',
  rateTestReported: '',
  eisReported: '',
  otherTests: '',
})

export const emptyBattery = (paperId: string): Battery => ({
  id: uid(),
  paperId,
  anode: emptyAnode(),
  cathode: emptyCathode(),
  separator: emptySeparator(),
  assembly: emptyAssembly(),
  measurement: emptyMeasurement(),
})

export const duplicateBattery = (b: Battery): Battery => ({
  ...b,
  id: uid(),
  anode: { ...b.anode },
  cathode: { ...b.cathode },
  separator: { ...b.separator },
  assembly: { ...b.assembly },
  measurement: {
    ...b.measurement,
    rateTests: b.measurement.rateTests.map((r) => ({ ...r, id: uid() })),
  },
})