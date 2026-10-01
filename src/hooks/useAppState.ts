import { useState, useCallback } from 'react'
import type { AppState, AppScreen, Paper, BatterySection } from '@/types'
import { emptyPaper, emptyBattery, duplicateBattery } from '@/utils/factories'

const initialState: AppState = {
  screen: 'papers',
  papers: [],
  batteries: [],
  activePaperId: null,
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState)

  // ── Navigation ──────────────────────────────────────────────────────────────
  const setScreen = useCallback((screen: AppScreen) => {
    setState((s) => ({ ...s, screen }))
  }, [])

  // ── Papers ──────────────────────────────────────────────────────────────────
  const addPaper = useCallback(() => {
    const paper = emptyPaper()
    setState((s) => ({
      ...s,
      papers: [...s.papers, paper],
      activePaperId: paper.id,
    }))
    return paper.id
  }, [])

  const updatePaper = useCallback((id: string, patch: Partial<Paper>) => {
    setState((s) => ({
      ...s,
      papers: s.papers.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const removePaper = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      papers: s.papers.filter((p) => p.id !== id),
      batteries: s.batteries.filter((b) => b.paperId !== id),
      activePaperId: s.activePaperId === id ? null : s.activePaperId,
    }))
  }, [])

  const setActivePaper = useCallback((id: string | null) => {
    setState((s) => ({ ...s, activePaperId: id }))
  }, [])

  // ── Batteries ───────────────────────────────────────────────────────────────
  const addBattery = useCallback((paperId: string) => {
    const battery = emptyBattery(paperId)
    setState((s) => ({ ...s, batteries: [...s.batteries, battery] }))
    return battery.id
  }, [])

  const updateBattery = useCallback(
    (id: string, section: BatterySection, patch: Record<string, string>) => {
      setState((s) => ({
        ...s,
        batteries: s.batteries.map((b) =>
          b.id === id ? { ...b, [section]: { ...b[section], ...patch } } : b,
        ),
      }))
    },
    [],
  )

  const removeBattery = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      batteries: s.batteries.filter((b) => b.id !== id),
    }))
  }, [])

  const dupeBattery = useCallback((id: string) => {
    setState((s) => {
      const src = s.batteries.find((b) => b.id === id)
      if (!src) return s
      return { ...s, batteries: [...s.batteries, duplicateBattery(src)] }
    })
  }, [])

  return {
    state,
    setScreen,
    addPaper,
    updatePaper,
    removePaper,
    setActivePaper,
    addBattery,
    updateBattery,
    removeBattery,
    dupeBattery,
  }
}
