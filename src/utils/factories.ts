import type {
  Paper,
  Battery,
  AnodeData,
  CathodeData,
  SeparatorData,
  AssemblyData,
  MeasurementData,
} from '@/types'

export const uid = () => Math.random().toString(36).slice(2, 9)

export const emptyAnode = (): AnodeData => ({
  // Active Material
  family: '',
  type: '',
  material: '',
  amCompositionPct: '',

  // Coating
  coating: '',

  // Electrolyte
  electrolyteFamilyInorganic: '',
  electrolyteInorganicSubcategory: '',
  electrolyteInorganicMaterial: '',
  electrolyteInorganicWtPct: '',
  electrolyteFamilyOrganic: '',
  electrolyteOrganicSubcategory: '',
  electrolyteOrganicMaterial: '',
  electrolyteOrganicWtPct: '',

  // Binder
  binder: '',
  binderWtPct: '',

  // Ionic Salt
  ionicSaltFamily: '',
  ionicSaltMaterial: '',
  ionicSaltWtPct: '',

  // Additive
  additiveFamily: '',
  additiveMaterial: '',
  additiveWtPct: '',

  // Comments
  compositionComments: '',

  // Layers
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
  capacityMah: '',
  cRateCharge: '',
  cRateDischarge: '',
  voltageWindow: '',
  temperatureC: '',
  cycles80pct: '',
  icePct: '',
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
  measurement: { ...b.measurement },
})