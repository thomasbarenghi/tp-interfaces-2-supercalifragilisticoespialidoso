export const formatPrice = (n: number) =>
  '$' + n.toLocaleString('es-AR', { maximumFractionDigits: 0 })

export const formatDate = (iso: string) => {
  const d = new Date(iso)
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} · ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
}

export const formatCreatedAt = (iso: string) => {
  const d = new Date(iso)
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]
  return `${d.getUTCDate()} de ${months[d.getUTCMonth()]}, ${d.getUTCFullYear()}`
}
