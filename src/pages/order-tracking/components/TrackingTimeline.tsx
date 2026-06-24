import { useState } from 'react'
import { Card } from '@heroui/react'
import { Check, Copy } from '@gravity-ui/icons'
import type { TrackingStep } from '../../../types/order.ts'
import { formatDate } from '../../../utils/format.ts'

const StepCircle = ({ step }: { step: TrackingStep }) => {
  if (step.status === 'completed') {
    return (
      <div className="size-7 rounded-full bg-success flex items-center justify-center shrink-0">
        <Check width={13} height={13} className="text-white" />
      </div>
    )
  }
  if (step.status === 'current') {
    return (
      <div className="size-7 rounded-full bg-(--accent) flex items-center justify-center shrink-0">
        <div className="size-2 rounded-full bg-white" />
      </div>
    )
  }
  return <div className="size-7 rounded-full bg-surface border-2 border-border shrink-0" />
}

const StepContent = ({ step, isLast }: { step: TrackingStep; isLast: boolean }) => (
  <div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
    {step.status === 'pending' ? (
      <>
        <p className="text-sm text-muted">{step.title}</p>
        <p className="text-sm text-muted/60 mt-0.5">{step.description}</p>
      </>
    ) : (
      <>
        <div className="flex justify-between items-baseline">
          <span
            className={`text-sm text-foreground ${step.status === 'current' ? 'font-bold' : 'font-medium'}`}
          >
            {step.title}
          </span>
          {step.date && <span className="text-xs text-muted">{formatDate(step.date)}</span>}
        </div>
        <p className="text-sm text-muted mt-0.5">{step.description}</p>
      </>
    )}
  </div>
)

interface Props {
  steps: TrackingStep[]
  trackingCode: string
  carrier: string
}

const TrackingTimeline = ({ steps, trackingCode, carrier }: Props) => {
  const [copied, setCopied] = useState(false)
  const lastStepIndex = steps.length - 1

  const handleCopy = () => {
    void navigator.clipboard.writeText(trackingCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-7">
      <h2 className="text-xl font-bold mb-5">Estado del envío</h2>
      {steps.map((step, index) => (
        <div key={step.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <StepCircle step={step} />
            {index < lastStepIndex && (
              <div
                className={`w-0.5 h-13 mx-auto ${step.status === 'completed' ? 'bg-success' : 'bg-border'}`}
              />
            )}
          </div>
          <StepContent step={step} isLast={index === lastStepIndex} />
        </div>
      ))}

      <div className="bg-(--accent)/5 rounded-xl px-5 py-3.5 flex items-center justify-between mt-7">
        <div>
          <p className="text-xs text-(--accent)/60 font-medium">Código de seguimiento</p>
          <p className="text-sm font-bold text-(--accent)">
            {trackingCode} · {carrier}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="bg-surface border border-(--accent)/20 text-(--accent) flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium"
        >
          <Copy width={13} height={13} />
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
    </Card>
  )
}

export default TrackingTimeline
