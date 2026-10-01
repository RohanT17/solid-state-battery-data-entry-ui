import { useState } from 'react'
import type { Paper, Battery } from '@/types'
import { buildCsvRows, exportCsv, copyRawCsv } from '@/utils/csv'
import { Button } from '@/components/UI'

interface Props {
  papers: Paper[]
  batteries: Battery[]
}

export function CsvPreview({ papers, batteries }: Props) {
  const [copied, setCopied] = useState(false)
  const rows = buildCsvRows(papers, batteries)

  const handleCopy = () => {
    copyRawCsv(papers, batteries)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (rows.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          color: 'var(--text-3)',
        }}
      >
        <p style={{ fontSize: '1.1rem', marginBottom: '.5rem' }}>No data yet</p>
        <p style={{ fontSize: '.85rem' }}>Add at least one paper and one battery first.</p>
      </div>
    )
  }

  const columns = Object.keys(rows[0])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <p style={{ fontSize: '.85rem', color: 'var(--text-3)' }}>
          {rows.length} {rows.length === 1 ? 'row' : 'rows'} · {columns.length} columns
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy raw CSV'}
          </Button>
          <Button variant="primary" size="sm" onClick={() => exportCsv(papers, batteries)}>
            Download CSV
          </Button>
        </div>
      </div>

      <div
        style={{
          overflowX: 'auto',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '.78rem',
            fontFamily: 'var(--font-mono)',
            minWidth: '900px',
          }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    padding: '6px 10px',
                    background: 'var(--surface-2)',
                    color: 'var(--text-2)',
                    fontWeight: 600,
                    textAlign: 'left',
                    borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    top: 0,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)' }}>
                {columns.map((col) => (
                  <td
                    key={col}
                    style={{
                      padding: '5px 10px',
                      borderBottom: '1px solid var(--border)',
                      color: row[col] ? 'var(--text)' : 'var(--text-3)',
                      whiteSpace: 'nowrap',
                      maxWidth: '220px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={row[col]}
                  >
                    {row[col] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>
        Empty cells export as blank. Hover a truncated cell to see its full value.
      </p>
    </div>
  )
}
