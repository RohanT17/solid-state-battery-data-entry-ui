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
  material: 'Graphite',
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
  material: 'Celgard 2325 (PP/PE/PP)',
  thicknessUm: '',
  porosityPct: '',
})

export const emptyAssembly = (): AssemblyData => ({
  cellFormat: 'Coin cell',
  electrolyte: '',
  electrolyteVolumeUl: '',
  stackPressureMpa: '',
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
  doi: '',
  firstAuthor: '',
  title: '',
  notes: '',
  tags: [],
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
