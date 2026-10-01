import type { Paper } from '@/types'
import { Field, FormGrid, TagInput, Button, Divider } from '@/components/UI'

interface PaperFormProps {
  paper: Paper
  onChange: (patch: Partial<Paper>) => void
  onSave: () => void
  onCancel?: () => void
}

export function PaperForm({ paper, onChange, onSave, onCancel }: PaperFormProps) {
  const set = (field: keyof Paper) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ [field]: e.target.value })

  return (
    <div style={{ padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <FormGrid cols={2}>
        <Field label="Journal" style={{ gridColumn: 'span 2' }}>
          <input
            type="text"
            value={paper.journal}
            onChange={set('journal')}
            placeholder="e.g. Nature Energy"
          />
        </Field>

        <Field label="Title" style={{ gridColumn: 'span 2' }}>
          <input
            type="text"
            value={paper.title}
            onChange={set('title')}
            placeholder="Full paper title"
          />
        </Field>

        <Field label="First author">
          <input
            type="text"
            value={paper.firstAuthor}
            onChange={set('firstAuthor')}
            placeholder="e.g. Zhang, L."
          />
        </Field>

        <Field label="Publication date">
          <input
            type="date"
            value={paper.publicationDate}
            onChange={set('publicationDate')}
          />
        </Field>

        <Field label="DOI" style={{ gridColumn: 'span 2' }}>
          <input
            type="text"
            value={paper.doi}
            onChange={set('doi')}
            placeholder="e.g. 10.1038/s41560-024-0001"
          />
        </Field>

        <Field label="Tags" optional style={{ gridColumn: 'span 2' }}>
          <TagInput
            tags={paper.tags}
            onChange={(tags) => onChange({ tags })}
          />
        </Field>

        <Field label="Notes" optional style={{ gridColumn: 'span 2' }}>
          <textarea
            value={paper.notes}
            onChange={set('notes')}
            placeholder="Any notes about this paper…"
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
