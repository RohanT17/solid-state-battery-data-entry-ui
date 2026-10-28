import Papa from 'papaparse'
import type { Paper, Battery } from '@/types'

function flatten(paper: Paper, battery: Battery): Record<string, string> {
  const { anode, cathode, separator, assembly, measurement } = battery

  return {
    // ── Paper ────────────────────────────────────────────────────────────────
    journal:              paper.journal,
    pub_date:             paper.publicationDate,
    lead_author:          paper.leadAuthor,
    ingested_by:          paper.ingestedBy,
    doi:                  paper.doi,
    cycle_life_reported:  paper.cycleLifeReported,
    rate_test_reported:   paper.rateTestReported,
    eis_reported:         paper.eisReported,
    other_tests:          paper.otherTests,

    // ── Anode — Composition ───────────────────────────────────────────────────
    anode_am_family:                          anode.family,
    anode_am_type:                            anode.type,
    anode_am_material:                        anode.material,
    anode_am_composition_pct:                 anode.amCompositionPct,
    anode_coating:                            anode.coating,
    anode_electrolyte_family:                 anode.electrolyteFamily,
    anode_electrolyte_inorganic_subcategory:  anode.electrolyteInorganicSubcategory,
    anode_electrolyte_inorganic_material:     anode.electrolyteInorganicMaterial,
    anode_electrolyte_inorganic_wt_pct:       anode.electrolyteInorganicWtPct,
    anode_electrolyte_organic_subcategory:    anode.electrolyteOrganicSubcategory,
    anode_electrolyte_organic_material:       anode.electrolyteOrganicMaterial,
    anode_electrolyte_organic_wt_pct:         anode.electrolyteOrganicWtPct,
    anode_binder:                             anode.binder,
    anode_binder_wt_pct:                      anode.binderWtPct,
    anode_ionic_salt_family:                  anode.ionicSaltFamily,
    anode_ionic_salt_material:                anode.ionicSaltMaterial,
    anode_ionic_salt_wt_pct:                  anode.ionicSaltWtPct,
    anode_additive_family:                    anode.additiveFamily,
    anode_additive_material:                  anode.additiveMaterial,
    anode_additive_wt_pct:                    anode.additiveWtPct,
    anode_composition_comments:               anode.compositionComments,

    // ── Anode — Layer Properties ──────────────────────────────────────────────
    anode_active_material_preparation:        anode.activeMaterialPreparation,
    anode_heat_treatment_temp_c:              anode.heatTreatmentTempC,
    anode_thickness_um:                       anode.anodeThicknessUm,
    anode_interlayer_type:                    anode.interlayerType,
    anode_coating_preparation_method:         anode.coatingPreparationMethod,
    anode_interlayer_thickness_um:            anode.interlayerThicknessUm,
    anode_areal_loading_mg_cm2:               anode.arealLoadingMgCm2,
    anode_layer_area_cm2:                     anode.layerAreaCm2,
    anode_initial_theoretical_areal_capacity: anode.initialTheoreticalArealCapacity,
    anode_layer_comments:                     anode.layerComments,

    // ── Cathode — Composition ─────────────────────────────────────────────────
    cathode_am_family:                          cathode.amFamily,
    cathode_am_type:                            cathode.amType,
    cathode_am_material:                        cathode.amMaterial,
    cathode_am_composition_pct:                 cathode.amCompositionPct,
    cathode_coating:                            cathode.coating,
    cathode_electrolyte_family:                 cathode.electrolyteFamily,
    cathode_electrolyte_inorganic_subcategory:  cathode.electrolyteInorganicSubcategory,
    cathode_electrolyte_inorganic_material:     cathode.electrolyteInorganicMaterial,
    cathode_electrolyte_inorganic_wt_pct:       cathode.electrolyteInorganicWtPct,
    cathode_electrolyte_organic_subcategory:    cathode.electrolyteOrganicSubcategory,
    cathode_electrolyte_organic_material:       cathode.electrolyteOrganicMaterial,
    cathode_electrolyte_organic_wt_pct:         cathode.electrolyteOrganicWtPct,
    cathode_binder:                             cathode.binder,
    cathode_binder_wt_pct:                      cathode.binderWtPct,
    cathode_ionic_salt_family:                  cathode.ionicSaltFamily,
    cathode_ionic_salt_material:                cathode.ionicSaltMaterial,
    cathode_ionic_salt_wt_pct:                  cathode.ionicSaltWtPct,
    cathode_additive_family:                    cathode.additiveFamily,
    cathode_additive_material:                  cathode.additiveMaterial,
    cathode_additive_wt_pct:                    cathode.additiveWtPct,
    cathode_composition_comments:               cathode.compositionComments,

    // ── Cathode — Layer Properties ────────────────────────────────────────────
    cathode_active_material_preparation:        cathode.activeMaterialPreparation,
    cathode_heat_treatment_temp_c:              cathode.heatTreatmentTempC,
    cathode_thickness_um:                       cathode.thicknessUm,
    cathode_interlayer_type:                    cathode.interlayerType,
    cathode_coating_preparation_method:         cathode.coatingPreparationMethod,
    cathode_interlayer_thickness_um:            cathode.interlayerThicknessUm,
    cathode_areal_loading_mg_cm2:               cathode.arealLoadingMgCm2,
    cathode_layer_area_cm2:                     cathode.layerAreaCm2,
    cathode_initial_theoretical_areal_capacity: cathode.initialTheoreticalArealCapacity,
    cathode_layer_comments:                     cathode.layerComments,

    // ── Separator — Layer Properties ──────────────────────────────────────────
    separator_preparation_method:               separator.preparationMethod,
    separator_heat_treatment_temp_c:            separator.heatTreatmentTempC,
    separator_press_pressure_mpa:               separator.pressPressureMpa,
    separator_thickness_um:                     separator.thicknessUm,
    separator_polish_treatment:                 separator.polishTreatment,
    separator_finest_polish_grit_um:            separator.finestPolishGritUm,
    separator_sintering_temp_c:                 separator.sinteringTempC,
    separator_sintering_time_hrs:               separator.sinteringTimeHrs,
    separator_area_cm2:                         separator.areaCm2,
    separator_conductivity_25c:                 separator.conductivity25C,
    separator_surface_roughness:                separator.surfaceRoughness,
    separator_density_g_cm3:                    separator.densityGCm3,
    separator_layer_comments:                   separator.layerComments,

    // ── Separator — Composition ───────────────────────────────────────────────
    separator_electrolyte_family:                        separator.electrolyteFamily,
    separator_electrolyte_inorganic_subcategory:         separator.electrolyteInorganicSubcategory,
    separator_electrolyte_inorganic_material:            separator.electrolyteInorganicMaterial,
    separator_electrolyte_inorganic_composition_pct:     separator.electrolyteInorganicCompositionPct,
    separator_electrolyte_organic_subcategory:           separator.electrolyteOrganicSubcategory,
    separator_electrolyte_organic_material:              separator.electrolyteOrganicMaterial,
    separator_electrolyte_organic_composition_pct:       separator.electrolyteOrganicCompositionPct,
    separator_binder:                                    separator.binder,
    separator_binder_composition_pct:                    separator.binderCompositionPct,
    separator_ionic_salt_family:                         separator.ionicSaltFamily,
    separator_ionic_salt_material:                       separator.ionicSaltMaterial,
    separator_ionic_salt_composition_pct:                separator.ionicSaltCompositionPct,
    separator_composition_comments:                      separator.compositionComments,

    // ── Assembly ──────────────────────────────────────────────────────────────
    cell_casing_type:               assembly.cellCasingType,
    assembly_heat_treatment_temp_c: assembly.heatTreatmentTempC,
    assembly_applied_pressure_mpa:  assembly.appliedPressureMpa,
    assembly_comments:              assembly.comments,

    // ── Measurement — Conditions ──────────────────────────────────────────────
    measurement_temperature_c:          measurement.temperatureC,
    measurement_mechanical_condition_mpa: measurement.mechanicalConditionMpa,
    measurement_conditions_comments:    measurement.conditionsComments,

    // ── Measurement — Cycle Life Constant ─────────────────────────────────────
    clc_charge_voltage_cutoff:            measurement.clcChargeVoltageCutoff,
    clc_discharge_voltage_cutoff:         measurement.clcDischargeVoltageCutoff,
    clc_charging_current_density:         measurement.clcChargingCurrentDensity,
    clc_constant_current_density:         measurement.clcConstantCurrentDensity,
    clc_areal_capacity:                   measurement.clcArealCapacity,
    clc_cycle_life:                       measurement.clcCycleLife,
    clc_cycle_life_criteria:              measurement.clcCycleLifeCriteria,
    clc_total_discharge_areal_capacity:   measurement.clcTotalDischargeArealCapacity,
    clc_comments:                         measurement.clcComments,

    // ── Measurement — Cycle Life Variable ─────────────────────────────────────
    clv_charge_voltage_cutoff:    measurement.clvChargeVoltageCutoff,
    clv_discharge_voltage_cutoff: measurement.clvDischargeVoltageCutoff,
    clv_cycle_life:               measurement.clvCycleLife,
    clv_cycle_life_criteria:      measurement.clvCycleLifeCriteria,
    clv_total_areal_capacity:     measurement.clvTotalArealCapacity,
    clv_comments:                 measurement.clvComments,

    // ── Measurement — Rate Tests (flattened, up to 8) ─────────────────────────
    ...Object.fromEntries(
      Array.from({ length: 8 }, (_, i) => {
        const t = measurement.rateTests[i]
        const n = i + 1
        return [
          [`rate_test_${n}_charge_voltage_cutoff`,                t?.chargeVoltageCutoff                        ?? ''],
          [`rate_test_${n}_discharge_voltage_cutoff`,             t?.dischargeVoltageCutoff                     ?? ''],
          [`rate_test_${n}_charging_current_density`,             t?.chargingCurrentDensity                     ?? ''],
          [`rate_test_${n}_discharging_current_density`,          t?.dischargingCurrentDensity                  ?? ''],
          [`rate_test_${n}_num_cycles_at_discharging_current`,    t?.numCyclesAtDischargingCurrentDensity       ?? ''],
          [`rate_test_${n}_discharge_capacity`,                   t?.dischargeCapacity                          ?? ''],
          [`rate_test_${n}_capacity_retention_pct`,               t?.capacityRetentionPct                       ?? ''],
          [`rate_test_${n}_comments`,                          t?.comments                             ?? ''],
        ]
      }).flat()
    ),
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