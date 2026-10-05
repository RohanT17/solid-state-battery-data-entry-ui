# Solid State Battery Data Entry
A UI for users to enter data into a database storing solid state battery information based on this paper: https://doi.org/10.1016/j.joule.2026.102595.

---

## What it does

You enter data in three steps, mirroring the natural flow of reading a paper:

1. **Papers**: journal, lead author, DOI, publication date, ingested-by, and flags for which tests are reported
2. **Batteries**: one or more cells per paper, each with five tabbed sections: Anode, Cathode, Separator, Assembly, Measurement
3. **CSV preview**: review the flattened table, then download or copy the raw CSV

Each battery becomes one row. Paper metadata repeats across all rows that belong to it.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build
npm run preview
```

**Requirements:** Node 18+. No other tooling needed.

---

## Project structure

<details>
<summary>Show file tree</summary>

```
solid-state-battery-data-entry-ui/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
│
└── src/
    ├── main.tsx                  # React root, mounts App
    ├── App.tsx                   # Screen router (Papers / Batteries / CSV)
    │
    ├── types/
    │   └── index.ts              # All TypeScript types (Paper, Battery, sub-sections)
    │
    ├── hooks/
    │   └── useAppState.ts        # Single useState hook — all app state lives here
    │
    ├── utils/
    │   ├── factories.ts          # emptyPaper(), emptyBattery(), duplicateBattery(), uid()
    │   └── csv.ts                # buildCsvRows(), exportCsv(), copyRawCsv()
    │
    ├── styles/
    │   └── global.css            # CSS custom properties (tokens), resets, base form styles
    │
    └── components/
        ├── UI.tsx                # Button, Field, FormGrid, Badge, Collapsible, StatusDot
        │
        ├── Paper/
        │   ├── PaperForm.tsx     # Editable fields for one paper
        │   └── PaperCard.tsx     # Collapsible wrapper around PaperForm
        │
        ├── Battery/
        │   ├── BatteryCard.tsx   # Collapsible card with vertical tab rail + status dots
        │   └── tabs/
        │       ├── AnodeTab.tsx
        │       ├── CathodeTab.tsx        # conditional NMC ratio field
        │       ├── SeparatorTab.tsx
        │       ├── AssemblyTab.tsx
        │       └── MeasurementTab.tsx
        │
        └── CSV/
            └── CsvPreview.tsx    # Scrollable table, copy-to-clipboard, download button
```

</details>

---

## CSV schema

<details>
<summary>Show all columns</summary>

Every row is one battery. Columns in output order:

| Column | Source |
|---|---|
| `journal` | Paper |
| `pub_date` | Paper |
| `lead_author` | Paper |
| `ingested_by` | Paper |
| `doi` | Paper |
| `cycle_life_reported` | Paper |
| `rate_test_reported` | Paper |
| `eis_reported` | Paper |
| `other_tests` | Paper |
| `anode_material` | Anode tab |
| `anode_thick_um` | Anode tab |
| `anode_loading_mg_cm2` | Anode tab |
| `anode_porosity_pct` | Anode tab |
| `anode_binder` | Anode tab |
| `cathode_material` | Cathode tab |
| `cathode_thick_um` | Cathode tab |
| `cathode_nmc_ratio` | Cathode tab (only populated for NMC) |
| `cathode_loading_mg_cm2` | Cathode tab |
| `separator_material` | Separator tab |
| `separator_thick_um` | Separator tab |
| `separator_porosity_pct` | Separator tab |
| `cell_format` | Assembly tab |
| `electrolyte` | Assembly tab |
| `electrolyte_vol_ul` | Assembly tab |
| `stack_pressure_mpa` | Assembly tab |
| `capacity_mah` | Measurement tab |
| `c_rate_charge` | Measurement tab |
| `c_rate_discharge` | Measurement tab |
| `voltage_window_v` | Measurement tab |
| `temperature_c` | Measurement tab |
| `cycles_80pct` | Measurement tab |
| `ice_pct` | Measurement tab (initial Coulombic efficiency) |

Optional fields export as empty strings. The schema is fixed — all columns always appear in the header, regardless of whether any row has data for them, so the output is safe to concatenate across sessions.

</details>

---

## UI patterns

**Collapsible cards**: both papers and batteries collapse to a single header row once saved. Click the header or the chevron to expand. The header always shows enough context (journal name, anode/cathode materials) to identify the entry without opening it.

**Vertical tabs**: battery data is split across five tabs in the left rail. A status dot (filled = has data, empty = untouched) on each tab gives a completion overview at a glance. A "Next section →" button steps through tabs in order.

**Conditional fields**: selecting NMC as cathode material reveals a Ni:Mn:Co ratio field inline, directly below the dropdown. No extra tab or modal.

**Duplicate battery**: each battery card has a Duplicate button that copies all fields into a new entry under the same paper. Useful when two cells from the same paper differ only in one variable.

---

## State model

All state is managed in `useAppState.ts` as a single object:

```ts
{
  screen: 'papers' | 'batteries' | 'csv'
  papers: Paper[]
  batteries: Battery[]       // each Battery has a paperId foreign key
  activePaperId: string | null
}
```

There is no persistence yet. Refreshing the page clears all data.

---

## Tech stack

| | |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Bundler | Vite 5 |
| CSV serialization | PapaParse |
| Styling | CSS custom properties |
| State | React `useState` (no external store) |