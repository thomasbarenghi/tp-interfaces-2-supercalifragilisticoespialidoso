export type TrackingStepStatus = 'completed' | 'current' | 'pending'

export interface TrackingStep {
  id: string
  title: string
  description: string
  status: TrackingStepStatus
  date: string | null
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  category: string
  unitPrice: number
  quantity: number
  subtotal: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string
  cartId: string
  status: string
  paymentStatus: string
  fulfillmentStatus: string
  currency: string
  createdAt: string
  estimatedDelivery: { from: string; to: string; label: string }
  customer: { email: string; phone: string }
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    province: string
    postalCode: string
    country: string
  }
  payment: { method: string; provider: string; installments: number; last4: string }
  shipping: { carrier: string; trackingCode: string; trackingUrl: string; currentStatus: string }
  tracking: { currentStep: number; steps: TrackingStep[] }
  items: OrderItem[]
  summary: { subtotal: number; shipping: number; discount: number; total: number }
}
