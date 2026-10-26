import { useAppState } from '@/hooks/useAppState'
import { PaperCard } from '@/components/Paper/PaperCard'
import { BatteryCard } from '@/components/Battery/BatteryCard'
import { CsvPreview } from '@/components/CSV/CsvPreview'
import { Button } from '@/components/UI'
import type { AppScreen, BatterySection } from '@/types'
import './styles/app.css'

const SCREENS: { key: AppScreen; label: string }[] = [
  { key: 'papers',    label: '1 · Papers' },
  { key: 'batteries', label: '2 · Batteries' },
  { key: 'csv',       label: '3 · CSV preview' },
]

export default function App() {
  const {
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
  } = useAppState()

  const { screen, papers, batteries, activePaperId } = state

  const activePaperBatteries = batteries.filter((b) => b.paperId === activePaperId)

  const goToBatteries = (paperId: string) => {
    setActivePaper(paperId)
    setScreen('batteries')
  }

  return (
    <div className="app-shell">
      {/* ── Top bar ── */}
      <header className="app-header">
        <span className="app-title">
          Solid State Battery Data Entry
        </span>

        <nav className="screen-nav">
          {SCREENS.map((s) => (
            <button
              key={s.key}
              onClick={() => setScreen(s.key)}
              className="screen-nav-button"
              style={{
                border: '1px solid ' + (screen === s.key ? 'var(--accent)' : 'transparent'),
                background: screen === s.key ? 'var(--accent-light)' : 'transparent',
                color: screen === s.key ? 'var(--accent-text)' : 'var(--text-2)',
                fontWeight: screen === s.key ? 600 : 400,
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="header-spacer" />
        <span className="app-count">
          {papers.length} {papers.length === 1 ? 'paper' : 'papers'} · {batteries.length} {batteries.length === 1 ? 'battery' : 'batteries'}
        </span>
      </header>

      {/* ── Main content ── */}
      <main className="app-main">

        {/* ── Papers screen ── */}
        {screen === 'papers' && (
          <section>
            <div className="screen-heading">
              <div>
                <h1>Papers</h1>
                <p className="screen-description">
                  Each paper groups one or more batteries. Paper metadata repeats on every CSV row.
                </p>
              </div>
              <Button variant="primary" onClick={addPaper}>
                + Add paper
              </Button>
            </div>

            {papers.length === 0 && (
              <div className="empty-state">
                <p>No papers yet</p>
                <p>Click "Add paper" to start entering data.</p>
              </div>
            )}

            <div className="card-list">
              {papers.map((p) => (
                <PaperCard
                  key={p.id}
                  paper={p}
                  batteryCount={batteries.filter((b) => b.paperId === p.id).length}
                  onChange={(patch) => updatePaper(p.id, patch)}
                  onRemove={() => removePaper(p.id)}
                  onGoToBatteries={() => goToBatteries(p.id)}
                />
              ))}
            </div>

            {papers.length > 0 && (
              <div className="add-item-container">
                <button
                  onClick={addPaper}
                  className="add-item-button"
                >
                  + Add another paper
                </button>
              </div>
            )}
          </section>
        )}

        {/* ── Batteries screen ── */}
        {screen === 'batteries' && (
          <section>
            <div className="screen-heading screen-heading--top">
              <div>
                <h1>
                  Batteries
                  {activePaperId && papers.find((p) => p.id === activePaperId) && (
                    <span className="paper-label">
                      — {papers.find((p) => p.id === activePaperId)?.journal || 'Untitled paper'}
                    </span>
                  )}
                </h1>
                <p className="screen-description">
                  Each battery entry becomes one row in the CSV.
                </p>
              </div>
              <div className="battery-actions">
                {papers.length > 1 && (
                  <select
                    value={activePaperId ?? ''}
                    onChange={(e) => setActivePaper(e.target.value)}
                  >
                    {papers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.journal || 'Untitled'} {p.publicationDate?.slice(0, 4)}
                      </option>
                    ))}
                  </select>
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    if (!activePaperId && papers.length > 0) setActivePaper(papers[0].id)
                    addBattery(activePaperId ?? papers[0]?.id ?? '')
                  }}
                  disabled={papers.length === 0}
                >
                  + Add battery
                </Button>
              </div>
            </div>

            {papers.length === 0 && (
              <div className="no-paper-state">
                Add a paper first before entering batteries.{' '}
                <button
                  onClick={() => setScreen('papers')}
                >
                  Go to Papers →
                </button>
              </div>
            )}

            <div className="card-list">
              {activePaperBatteries.map((b, i) => (
                <BatteryCard
                  key={b.id}
                  battery={b}
                  index={i}
                  onChange={(section: BatterySection, patch) => updateBattery(b.id, section, patch)}
                  onRemove={() => removeBattery(b.id)}
                  onDuplicate={() => dupeBattery(b.id)}
                  onDone={() => {}}
                />
              ))}
            </div>

            {activePaperBatteries.length > 0 && (
              <div className="battery-footer">
                <button
                  onClick={() => addBattery(activePaperId ?? papers[0]?.id ?? '')}
                  className="add-item-button"
                >
                  + Add another battery
                </button>
                <Button variant="primary" onClick={() => setScreen('csv')}>
                  Preview CSV →
                </Button>
              </div>
            )}
          </section>
        )}

        {/* ── CSV preview screen ── */}
        {screen === 'csv' && (
          <section>
            <div className="csv-heading">
              <h1>CSV preview</h1>
              <p className="screen-description">
                Review before downloading. Each battery is one row; paper metadata repeats.
              </p>
            </div>
            <CsvPreview papers={papers} batteries={batteries} />
          </section>
        )}
      </main>
    </div>
  )
}
