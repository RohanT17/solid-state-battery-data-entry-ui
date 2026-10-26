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

    // Separator — Layer Properties
    separator_preparation_method: battery.separator.preparationMethod,
    separator_heat_treatment_temp_c: battery.separator.heatTreatmentTempC,
    separator_press_pressure_mpa: battery.separator.pressPressureMpa,
    separator_thick_um: battery.separator.thicknessUm,
    separator_polish_treatment: battery.separator.polishTreatment,
    separator_finest_polish_grit_um: battery.separator.finestPolishGritUm,
    separator_sintering_temp_c: battery.separator.sinteringTempC,
    separator_sintering_time_hrs: battery.separator.sinteringTimeHrs,
    separator_area_cm2: battery.separator.areaCm2,
    separator_conductivity_25c_s_cm: battery.separator.conductivity25C,
    separator_surface_roughness: battery.separator.surfaceRoughness,
    separator_density_g_cm3: battery.separator.densityGCm3,
    separator_layer_comments: battery.separator.layerComments,

    // Separator — Composition
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
    cell_casing_type: battery.assembly.cellCasingType,
    assembly_heat_treatment_temp_c: battery.assembly.heatTreatmentTempC,
    assembly_applied_pressure_mpa: battery.assembly.appliedPressureMpa,
    assembly_comments: battery.assembly.comments,

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