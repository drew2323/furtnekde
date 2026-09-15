export function safeLinkHref(value: string): string {
  if (value.includes('\\')) return '#'
  if (value.startsWith('#')) return value
  if (value.startsWith('/') && !value.startsWith('//')) return value

  try {
    const url = new URL(value)
    if (url.protocol === 'https:') return value
  } catch {
    // Invalid or relative values outside the allowed forms fall back safely.
  }

  return '#'
}

export function validateLinkHref(value: null | string | undefined): true | string {
  if (!value || safeLinkHref(value) === value) return true
  return 'Použijte interní cestu /…, kotvu #… nebo plnou HTTPS adresu.'
}
