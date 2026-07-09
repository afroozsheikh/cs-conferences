import { conferences } from '../data/conferences'

export function checkSlugCollisions(): void {
  const seen = new Map<string, string>()
  for (const c of conferences) {
    if (seen.has(c.slug)) {
      throw new Error(
        `Slug collision: "${c.slug}" is used by both "${seen.get(c.slug)}" and "${c.title}". ` +
        `Fix the slug in data/conferences.ts.`
      )
    }
    seen.set(c.slug, c.title)
  }
}
