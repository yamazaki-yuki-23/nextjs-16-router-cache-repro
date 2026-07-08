import { Suspense } from 'react'
import { TagFilter } from './TagFilter'
import { ArticleList } from './ArticleList'

/**
 * searchParams から選択中のタグを配列で取り出す。
 * - ?tag=react         → ['react']
 * - ?tag=react&tag=css → ['react', 'css']（App Router は同一キーの重複を配列で渡す）
 */
function toTagArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>
}) {
  const { tag } = await searchParams
  const selectedTags = toTagArray(tag)

  return (
    <main>
      <h1>記事一覧</h1>
      <TagFilter selectedTags={selectedTags} />
      {/* key を渡さず、選択タグの変化を Suspense の再サスペンドに委ねる */}
      <Suspense fallback={<p>読み込み中...</p>}>
        <ArticleList selectedTags={selectedTags} />
      </Suspense>
    </main>
  )
}
