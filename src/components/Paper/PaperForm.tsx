import React, { useState, useEffect } from 'react'
import type { Paper } from '@/types'
import { Field, FormGrid, Button, Divider } from '@/components/UI'

interface PaperFormProps {
  paper: Paper
  onChange: (patch: Partial<Paper>) => void
  onSave: () => void
  onCancel?: () => void
}

type YesNo = 'Yes' | 'No' | ''

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 2014 }, (_, i) => CURRENT_YEAR - i)

function MonthYearPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  // Local state for each half — avoids wiping on partial selection
  const [month, setMonth] = useState(() => value ? value.split('-')[0] : '')
  const [year, setYear]   = useState(() => value ? value.split('-')[1] : '')

  // Sync back up if parent resets the value (e.g. new paper)
  useEffect(() => {
    if (!value) { setMonth(''); setYear('') }
  }, [value])

  const handleMonth = (m: string) => {
    setMonth(m)
    if (m && year) onChange(`${m}-${year}`)
    else onChange('')
  }

  const handleYear = (y: string) => {
    setYear(y)
    if (month && y) onChange(`${month}-${y}`)
    else onChange('')
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <select value={month} onChange={(e) => handleMonth(e.target.value)} style={{ flex: 1 }}>
        <option value="">Month</option>
        {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <select value={year} onChange={(e) => handleYear(e.target.value)} style={{ flex: 1 }}>
        <option value="">Year</option>
        {YEARS.map((y) => <option key={y} value={String(y).slice(2)}>{y}</option>)}
      </select>
    </div>
  )
}

function RadioYesNo({
  label,
  value,
  onChange,
}: {
  label: string
  value: YesNo
  onChange: (v: YesNo) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '.78rem', fontWeight: 500, color: 'var(--text-2)' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: '1.25rem', paddingTop: '4px' }}>
        {(['Yes', 'No'] as const).map((opt) => (
          <label
            key={opt}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '.875rem',
              color: 'var(--text)',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              style={{ width: 'auto', accentColor: 'var(--accent)' }}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}

export function PaperForm({ paper, onChange, onSave, onCancel }: PaperFormProps) {
  const set =
    (field: keyof Paper) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ [field]: e.target.value })

  return (
    <div style={{ padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <FormGrid cols={2}>

        <Field label="Journal Name">
          <input
            type="text"
            value={paper.journal}
            onChange={set('journal')}
            placeholder="e.g. Nature Energy"
          />
        </Field>

        <Field label="Publication Date">
          <MonthYearPicker
            value={paper.publicationDate}
            onChange={(v) => onChange({ publicationDate: v })}
          />
        </Field>

        <Field label="Lead Author Name">
          <input
            type="text"
            value={paper.leadAuthor}
            onChange={set('leadAuthor')}
            placeholder="e.g. Zhang, L."
          />
        </Field>

        <Field label="Ingested By">
          <input
            type="text"
            value={paper.ingestedBy}
            onChange={set('ingestedBy')}
            placeholder="Your name"
          />
        </Field>

        <Field label="DOI" style={{ gridColumn: 'span 2' }}>
          <input
            type="text"
            value={paper.doi}
            onChange={set('doi')}
            placeholder="10.____/___"
          />
        </Field>

        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <RadioYesNo
            label="Cycle Life Reported?"
            value={paper.cycleLifeReported}
            onChange={(v) => onChange({ cycleLifeReported: v })}
          />
          <RadioYesNo
            label="Rate Test Reported?"
            value={paper.rateTestReported}
            onChange={(v) => onChange({ rateTestReported: v })}
          />
          <RadioYesNo
            label="EIS Reported?"
            value={paper.eisReported}
            onChange={(v) => onChange({ eisReported: v })}
          />
        </div>

        <Field label="Other Tests" optional style={{ gridColumn: 'span 2' }}>
          <input
            type="text"
            value={paper.otherTests}
            onChange={set('otherTests')}
            placeholder="e.g. GITT, XRD, SEM post-cycling"
          />
        </Field>

      </FormGrid>

      <Divider />

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" onClick={onSave}>
          Save &amp; add batteries →
        </Button>
      </div>
    </div>
  )
}