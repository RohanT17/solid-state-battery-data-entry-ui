import { useAppState } from '@/hooks/useAppState'
import { PaperCard } from '@/components/Paper/PaperCard'
import { BatteryCard } from '@/components/Battery/BatteryCard'
import { CsvPreview } from '@/components/CSV/CsvPreview'
import { Button } from '@/components/UI'
import type { AppScreen, BatterySection } from '@/types'

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── Top bar ── */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          height: '52px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--text)', letterSpacing: '-.01em' }}>
          Solid State Battery Data Entry
        </span>

        <nav style={{ display: 'flex', gap: '4px' }}>
          {SCREENS.map((s) => (
            <button
              key={s.key}
              onClick={() => setScreen(s.key)}
              style={{
                padding: '5px 14px',
                borderRadius: 'var(--radius)',
                border: '1px solid ' + (screen === s.key ? 'var(--accent)' : 'transparent'),
                background: screen === s.key ? 'var(--accent-light)' : 'transparent',
                color: screen === s.key ? 'var(--accent-text)' : 'var(--text-2)',
                fontWeight: screen === s.key ? 600 : 400,
                fontSize: '.83rem',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>
          {papers.length} {papers.length === 1 ? 'paper' : 'papers'} · {batteries.length} {batteries.length === 1 ? 'battery' : 'batteries'}
        </span>
      </header>

      {/* ── Main content ── */}
      <main style={{ flex: 1, maxWidth: '860px', width: '100%', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── Papers screen ── */}
        {screen === 'papers' && (
          <section>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h1 style={{ marginBottom: '.25rem' }}>Papers</h1>
                <p style={{ fontSize: '.85rem', color: 'var(--text-3)' }}>
                  Each paper groups one or more batteries. Paper metadata repeats on every CSV row.
                </p>
              </div>
              <Button variant="primary" onClick={addPaper}>
                + Add paper
              </Button>
            </div>

            {papers.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  border: '1px dashed var(--border-2)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-3)',
                }}
              >
                <p style={{ marginBottom: '.5rem', fontSize: '1rem' }}>No papers yet</p>
                <p style={{ fontSize: '.85rem' }}>Click "Add paper" to start entering data.</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={addPaper}
                  style={{
                    width: '100%',
                    padding: '.75rem',
                    border: '1px dashed var(--border-2)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'transparent',
                    color: 'var(--text-3)',
                    fontSize: '.875rem',
                    cursor: 'pointer',
                    transition: 'background .15s, color .15s, border-color .15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-light)'
                    e.currentTarget.style.color = 'var(--accent-text)'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-3)'
                    e.currentTarget.style.borderColor = 'var(--border-2)'
                  }}
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
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: '1rem' }}>
              <div>
                <h1 style={{ marginBottom: '.25rem' }}>
                  Batteries
                  {activePaperId && papers.find((p) => p.id === activePaperId) && (
                    <span style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: '1rem', marginLeft: '10px' }}>
                      — {papers.find((p) => p.id === activePaperId)?.journal || 'Untitled paper'}
                    </span>
                  )}
                </h1>
                <p style={{ fontSize: '.85rem', color: 'var(--text-3)' }}>
                  Each battery entry becomes one row in the CSV.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                {papers.length > 1 && (
                  <select
                    value={activePaperId ?? ''}
                    onChange={(e) => setActivePaper(e.target.value)}
                    style={{ width: 'auto' }}
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
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-3)', fontSize: '.85rem' }}>
                Add a paper first before entering batteries.{' '}
                <button
                  onClick={() => setScreen('papers')}
                  style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Go to Papers →
                </button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activePaperBatteries.map((b, i) => (
                <BatteryCard
                  key={b.id}
                  battery={b}
                  index={i}
                  onChange={(section: BatterySection, patch) => updateBattery(b.id, section, patch)}
                  onRemove={() => removeBattery(b.id)}
                  onDuplicate={() => dupeBattery(b.id)}
                />
              ))}
            </div>

            {activePaperBatteries.length > 0 && (
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => addBattery(activePaperId ?? papers[0]?.id ?? '')}
                  style={{
                    flex: 1,
                    padding: '.75rem',
                    border: '1px dashed var(--border-2)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'transparent',
                    color: 'var(--text-3)',
                    fontSize: '.875rem',
                    cursor: 'pointer',
                    marginRight: '10px',
                    transition: 'background .15s, color .15s, border-color .15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-light)'
                    e.currentTarget.style.color = 'var(--accent-text)'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-3)'
                    e.currentTarget.style.borderColor = 'var(--border-2)'
                  }}
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
            <div style={{ marginBottom: '1.25rem' }}>
              <h1 style={{ marginBottom: '.25rem' }}>CSV preview</h1>
              <p style={{ fontSize: '.85rem', color: 'var(--text-3)' }}>
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
