import Papa from 'papaparse'
import type { Paper, Battery } from '@/types'

function flatten(paper: Paper, battery: Battery): Record<string, string> {
  return {
    // Paper
    journal: paper.journal,
    pub_date: paper.publicationDate,
    lead_author: paper.leadAuthor,
    ingested_by: paper.ingestedBy,
    doi: paper.doi,
    cycle_life_reported: paper.cycleLifeReported,
    rate_test_reported: paper.rateTestReported,
    eis_reported: paper.eisReported,
    other_tests: paper.otherTests,

    // Anode
    anode_material: battery.anode.material,
    anode_family: battery.anode.family,
    anode_type: battery.anode.type,
    anode_am_composition_pct: battery.anode.amCompositionPct,
    anode_thick_um: battery.anode.thicknessUm,
    anode_loading_mg_cm2: battery.anode.loadingMgCm2,
    anode_porosity_pct: battery.anode.porosityPct,
    anode_binder: battery.anode.binderComposition,

    // Cathode
    cathode_material: battery.cathode.material,
    cathode_thick_um: battery.cathode.thicknessUm,
    cathode_nmc_ratio: battery.cathode.nmcRatio,
    cathode_loading_mg_cm2: battery.cathode.loadingMgCm2,

    // Separator
    separator_material: battery.separator.material,
    separator_thick_um: battery.separator.thicknessUm,
    separator_porosity_pct: battery.separator.porosityPct,
    separator_electrolyte_family: battery.separator.electrolyteFamily,
    separator_electrolyte_inorganic_subcategory: battery.separator.electrolyteInorganicSubcategory,
    separator_electrolyte_inorganic_material: battery.separator.electrolyteInorganicMaterial,
    separator_electrolyte_inorganic_composition_pct: battery.separator.electrolyteInorganicCompositionPct,
    separator_electrolyte_organic_subcategory: battery.separator.electrolyteOrganicSubcategory,
    separator_electrolyte_organic_material: battery.separator.electrolyteOrganicMaterial,
    separator_electrolyte_organic_composition_pct: battery.separator.electrolyteOrganicCompositionPct,
    separator_binder: battery.separator.binder,
    separator_binder_composition_pct: battery.separator.binderCompositionPct,
    separator_ionic_salt_family: battery.separator.ionicSaltFamily,
    separator_ionic_salt_material: battery.separator.ionicSaltMaterial,
    separator_ionic_salt_composition_pct: battery.separator.ionicSaltCompositionPct,
    separator_composition_comments: battery.separator.compositionComments,

    // Assembly
    cell_format: battery.assembly.cellFormat,
    electrolyte: battery.assembly.electrolyte,
    electrolyte_vol_ul: battery.assembly.electrolyteVolumeUl,
    stack_pressure_mpa: battery.assembly.stackPressureMpa,

    // Measurement
    capacity_mah: battery.measurement.capacityMah,
    c_rate_charge: battery.measurement.cRateCharge,
    c_rate_discharge: battery.measurement.cRateDischarge,
    voltage_window_v: battery.measurement.voltageWindow,
    temperature_c: battery.measurement.temperatureC,
    cycles_80pct: battery.measurement.cycles80pct,
    ice_pct: battery.measurement.icePct,
  }
}

export function buildCsvRows(
  papers: Paper[],
  batteries: Battery[],
): Record<string, string>[] {
  const paperMap = new Map(papers.map((p) => [p.id, p]))
  return batteries
    .map((b) => {
      const paper = paperMap.get(b.paperId)
      if (!paper) return null
      return flatten(paper, b)
    })
    .filter(Boolean) as Record<string, string>[]
}

export function exportCsv(papers: Paper[], batteries: Battery[]): void {
  const rows = buildCsvRows(papers, batteries)
  if (rows.length === 0) return
  const csv = Papa.unparse(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `battery-db-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function copyRawCsv(papers: Paper[], batteries: Battery[]): void {
  const rows = buildCsvRows(papers, batteries)
  const csv = Papa.unparse(rows)
  navigator.clipboard.writeText(csv)
}