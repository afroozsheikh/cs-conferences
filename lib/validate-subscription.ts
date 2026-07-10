import { TOPICS } from '../data/conferences'

export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string }

export function validateSubscription(email: unknown, topics: unknown): ValidationResult {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Invalid email address.' }
  }
  if (!Array.isArray(topics) || topics.length === 0) {
    return { valid: false, error: 'Select at least one topic.' }
  }
  const invalid = topics.filter((t) => !(TOPICS as string[]).includes(t))
  if (invalid.length > 0) {
    return { valid: false, error: `Unknown topics: ${invalid.join(', ')}` }
  }
  return { valid: true }
}
