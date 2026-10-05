import type { Paper } from '@/types'
import { Collapsible, Badge, Button } from '@/components/UI'
import { PaperForm } from './PaperForm'

interface PaperCardProps {
  paper: Paper
  batteryCount: number
  onChange: (patch: Partial<Paper>) => void
  onRemove: () => void
  onGoToBatteries: () => void
}

export function PaperCard({
  paper,
  batteryCount,
  onChange,
  onRemove,
  onGoToBatteries,
}: PaperCardProps) {
  const subtitle = [paper.leadAuthor, paper.publicationDate]
    .filter(Boolean)
    .join(' · ')

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: '.9rem',
            color: 'var(--text)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {paper.journal || <span style={{ color: 'var(--text-3)' }}>Untitled paper</span>}
        </div>
        {subtitle && (
          <div style={{ fontSize: '.78rem', color: 'var(--text-3)', marginTop: '1px' }}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
        <Badge variant={batteryCount > 0 ? 'success' : 'neutral'}>
          {batteryCount} {batteryCount === 1 ? 'battery' : 'batteries'}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onGoToBatteries()
          }}
        >
          Edit batteries
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          style={{ color: 'var(--danger)' }}
        >
          Remove
        </Button>
      </div>
    </div>
  )

  return (
    <Collapsible header={header} defaultOpen={!paper.journal}>
      <PaperForm
        paper={paper}
        onChange={onChange}
        onSave={onGoToBatteries}
      />
    </Collapsible>
  )
}
