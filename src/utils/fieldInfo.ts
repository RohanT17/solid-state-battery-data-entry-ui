// Tooltip text shown by the "i" icon next to each field label.
// Keys are lower-cased field labels; labels shared across tabs get wording that fits every context.
const FIELD_INFO: Record<string, string> = {
  // ── Paper ──
  'journal name': 'Full name of the journal in which the paper was published.',
  'publication date': 'Date the paper was published (online or in print).',
  'lead author name': 'Name of the first / corresponding author of the paper.',
  'ingested by': 'Name of the person entering this paper’s data into the database.',
  'doi': 'Digital Object Identifier of the paper, e.g. 10.1000/xyz123.',
  'other tests': 'Any other tests reported in the paper that are not covered by the options above.',

  // ── Shared composition fields ──
  'family': 'Broad chemical category of the component in this section.',
  'type': 'Specific type within the selected family.',
  'material': 'Specific material used for this component. Choose "Other" if it is not listed.',
  'inorganic subcategory': 'Sub-class of the inorganic electrolyte (e.g. sulfide, oxide, halide).',
  'inorganic material': 'Specific inorganic electrolyte material used.',
  'organic subcategory': 'Sub-class of the organic / polymer electrolyte.',
  'organic material': 'Specific organic / polymer electrolyte material used.',
  'binder': 'Polymer binder used to hold the layer together. Choose "None" if no binder is used.',
  'weight': 'Weight percent of this component in the layer composition.',
  'composition': 'Weight percent of this component in the layer composition.',
  'am composition': 'Weight percent of the active material in the layer.',
  'cam composition': 'Weight percent of the cathode active material (CAM) in the cathode layer.',
  'coating': 'Surface coating applied to the active material, if any.',

  // ── Layer properties ──
  'active material preparation with binder/se': 'How the active material was mixed or prepared with the binder / solid electrolyte.',
  'heat treatment temp': 'Temperature of any heat treatment applied during preparation.',
  'anode thickness': 'Thickness of the anode layer.',
  'cathode thickness': 'Thickness of the cathode layer.',
  'separator thickness': 'Thickness of the separator layer.',
  'interlayer type': 'Type of interlayer placed between this layer and the adjacent layer, if any.',
  'coating preparation method': 'Method used to apply the coating or interlayer (e.g. sputtering, spin coating).',
  'interlayer thickness': 'Thickness of the interlayer.',
  'areal active material loading': 'Mass of active material per unit electrode area.',
  'cathode active material mass': 'Mass of cathode active material per unit electrode area.',
  'layer area': 'Geometric area of the layer.',
  'initial theoretical areal capacity': 'Theoretical areal capacity of the layer before cycling, based on active material loading.',
  'anode preparation and layer properties comments': 'Any extra notes about anode preparation or layer properties.',
  'cathode preparation and layer properties comments': 'Any extra notes about cathode preparation or layer properties.',

  // ── Separator ──
  'preparation method': 'Method used to fabricate the separator (e.g. cold pressing, tape casting).',
  'press pressure': 'Pressure applied when pressing the separator.',
  'polish treatment': 'Polishing treatment applied to the separator surface, if any.',
  'finest polish grit': 'Grit size of the finest polishing step.',
  'sintering temp': 'Temperature at which the separator was sintered.',
  'sintering time': 'Duration of the sintering step.',
  'separator area': 'Geometric area of the separator.',
  'conductivity at 25°c': 'Ionic conductivity of the separator measured at 25 °C.',
  'surface roughness': 'Reported surface roughness of the separator.',
  'density': 'Density of the separator.',

  // ── Assembly ──
  'type of cell casing': 'Cell format / casing used for testing (e.g. coin cell, pouch cell, pressure cell).',
  'applied pressure during assembly': 'Pressure applied to the stack while assembling the cell.',

  // ── Measurement ──
  'temperature': 'Temperature at which the cell was tested. Exports as "NR" if left blank.',
  'mechanical condition': 'Stack / external pressure applied during testing. Exports as "NR" if left blank.',
  'charge voltage cut-off': 'Upper voltage limit at which charging stops.',
  'discharge voltage cut-off': 'Lower voltage limit at which discharging stops.',
  'charging current density': 'Current density applied during charging.',
  'discharging current density': 'Current density applied during discharging.',
  'current density (constant)': 'Constant current density used for cycling.',
  'areal capacity': 'Areal capacity per cycle during cycling.',
  'cycle life': 'Number of cycles completed before the cycle-life criterion was reached.',
  'cycle life criteria': 'Criterion used to define end of life (e.g. capacity falls to 80% of initial).',
  'total discharge areal capacity passed': 'Cumulative discharge areal capacity passed over all cycles.',
  'total areal capacity passed': 'Cumulative areal capacity passed over all cycles.',
  'no. cycles at discharging current density': 'Number of cycles run at this discharging current density.',
  'discharge capacity': 'Discharge capacity measured at this rate.',
  'capacity retention': 'Discharge capacity at this rate relative to the reference capacity, as a percentage.',

  // ── Comments ──
  'comments': 'Any extra notes about this section that do not fit the other fields.',
}

export function getFieldInfo(label: string): string | undefined {
  return FIELD_INFO[label.trim().toLowerCase()]
}
