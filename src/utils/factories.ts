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
  family: '',
  type: '',
  material: '',
  amCompositionPct: '',
  coating: '',
  electrolyteFamilyInorganic: '',
  electrolyteInorganicSubcategory: '',
  electrolyteInorganicMaterial: '',
  electrolyteInorganicWtPct: '',
  electrolyteFamilyOrganic: '',
  electrolyteOrganicSubcategory: '',
  electrolyteOrganicMaterial: '',
  electrolyteOrganicWtPct: '',
  binder: '',
  binderWtPct: '',
  ionicSaltFamily: '',
  ionicSaltMaterial: '',
  ionicSaltWtPct: '',
  additiveFamily: '',
  additiveMaterial: '',
  additiveWtPct: '',
  compositionComments: '',
  thicknessUm: '',
  loadingMgCm2: '',
  porosityPct: '',
  binderComposition: '',
})

export const emptyCathode = (): CathodeData => ({
  material: 'LFP',
  thicknessUm: '',
  nmcRatio: '',
  loadingMgCm2: '',
})

export const emptySeparator = (): SeparatorData => ({
  // Layer Properties
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

  // Electrolyte
  electrolyteFamily: '',
  electrolyteInorganicSubcategory: '',
  electrolyteInorganicMaterial: '',
  electrolyteInorganicCompositionPct: '',
  electrolyteOrganicSubcategory: '',
  electrolyteOrganicMaterial: '',
  electrolyteOrganicCompositionPct: '',

  // Binder
  binder: '',
  binderCompositionPct: '',

  // Ionic Salt
  ionicSaltFamily: '',
  ionicSaltMaterial: '',
  ionicSaltCompositionPct: '',

  // Comments
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