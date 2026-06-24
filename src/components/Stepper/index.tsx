import React from 'react'
import { Check, Xmark } from '@gravity-ui/icons'

type StepStatus = 'completed' | 'current' | 'pending' | 'failed'

export interface Step {
  label: string
  status: StepStatus
}

const StepIndicator = ({ step, index }: { step: Step; index: number }) => {
  if (step.status === 'completed') {
    return (
      <div className="size-7 rounded-full bg-success flex items-center justify-center shrink-0">
        <Check width={14} height={14} className="text-white" />
      </div>
    )
  }
  if (step.status === 'current') {
    return (
      <div className="size-7 rounded-full bg-(--accent) flex items-center justify-center text-sm font-bold text-white shrink-0">
        {index + 1}
      </div>
    )
  }
  if (step.status === 'failed') {
    return (
      <div className="size-7 rounded-full bg-[#E50815] flex items-center justify-center shrink-0">
        <Xmark width={14} height={14} className="text-white" />
      </div>
    )
  }
  return (
    <div className="size-7 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-bold text-muted shrink-0">
      {index + 1}
    </div>
  )
}

const Stepper = ({ steps }: { steps: Step[] }) => (
  <div className="flex items-center gap-4">
    {steps.map((step, index) => (
      <React.Fragment key={step.label}>
        <div className="flex items-center gap-2.5">
          <StepIndicator step={step} index={index} />
          <span
            className={`text-sm ${step.status === 'current' ? 'font-bold' : step.status === 'pending' ? 'font-medium text-muted' : 'font-medium'}`}
          >
            {step.label}
          </span>
        </div>
        {index < steps.length - 1 && <div className="w-6 h-px bg-border" />}
      </React.Fragment>
    ))}
  </div>
)

export default Stepper
