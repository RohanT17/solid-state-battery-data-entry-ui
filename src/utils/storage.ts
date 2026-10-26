import type { AppState, AppScreen, Paper, Battery } from '@/types'
import {
  emptyPaper,
  emptyAnode,
  emptyCathode,
  emptySeparator,
  emptyAssembly,
  emptyMeasurement,
} from '@/utils/factories'

export const STORAGE_KEY = 'batteryDb:v1'

const VALID_SCREENS: AppScreen[] = ['papers', 'batteries', 'csv']

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

function sanitizePaper(raw: unknown): Paper | null {
  if (!isObject(raw) || typeof raw.id !== 'string' || raw.id.length === 0) return null
  return { ...emptyPaper(), ...raw, id: raw.id }
}

function mergeSection<T extends object>(defaults: T, raw: unknown): T {
  return isObject(raw) ? { ...defaults, ...raw } : defaults
}

function sanitizeBattery(raw: unknown): Battery | null {
  if (
    !isObject(raw) ||
    typeof raw.id !== 'string' ||
    raw.id.length === 0 ||
    typeof raw.paperId !== 'string' ||
    raw.paperId.length === 0
  ) {
    return null
  }
  return {
    id: raw.id,
    paperId: raw.paperId,
    anode: mergeSection(emptyAnode(), raw.anode),
    cathode: mergeSection(emptyCathode(), raw.cathode),
    separator: mergeSection(emptySeparator(), raw.separator),
    assembly: mergeSection(emptyAssembly(), raw.assembly),
    measurement: mergeSection(emptyMeasurement(), raw.measurement),
  }
}

export function loadState(fallback: AppState): AppState {
  let raw: string | null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return fallback
  }
  if (!raw) return fallback

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return fallback
  }
  if (!isObject(parsed) || !Array.isArray(parsed.papers) || !Array.isArray(parsed.batteries)) {
    return fallback
  }

  const papers = parsed.papers.map(sanitizePaper).filter((p): p is Paper => p !== null)
  const paperIds = new Set(papers.map((p) => p.id))

  const batteries = parsed.batteries
    .map(sanitizeBattery)
    .filter((b): b is Battery => b !== null && paperIds.has(b.paperId))

  const screen: AppScreen = VALID_SCREENS.includes(parsed.screen as AppScreen)
    ? (parsed.screen as AppScreen)
    : 'papers'

  const activePaperId =
    typeof parsed.activePaperId === 'string' && paperIds.has(parsed.activePaperId)
      ? parsed.activePaperId
      : null

  return { screen, papers, batteries, activePaperId }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // quota exceeded or private-mode write block must not crash the app
  }
}

export function clearSavedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
