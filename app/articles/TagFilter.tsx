'use client'

import { useRouter } from 'next/navigation'
import { ALL_TAGS } from '@/lib/data'

/**
 * タグのチェックボックス。チェックの ON/OFF で
 * ?tag=react&tag=nextjs のような複数値のクエリを組み立てて遷移する。
 */
export function TagFilter({ selectedTags }: { selectedTags: string[] }) {
  const router = useRouter()

  function toggle(tag: string) {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    const params = new URLSearchParams()
    for (const t of next) params.append('tag', t)

    const query = params.toString()
    router.push(query ? `/articles?${query}` : '/articles')
  }

  return (
    <fieldset style={{ border: '1px solid #ccc', borderRadius: 8, padding: '0.75rem 1rem' }}>
      <legend>タグで絞り込み</legend>
      {ALL_TAGS.map((tag) => (
        <label key={tag} style={{ marginRight: '1rem', whiteSpace: 'nowrap' }}>
          <input
            type="checkbox"
            checked={selectedTags.includes(tag)}
            onChange={() => toggle(tag)}
          />{' '}
          {tag}
        </label>
      ))}
    </fieldset>
  )
}
