import { filterArticles } from '@/lib/data'

/**
 * 選択タグで記事を絞り込んで表示する Server Component。
 * 実際のデータ取得を模して意図的に 1.2 秒待つ。この遅延があるため、
 * 遷移のたびに Suspense の fallback（読み込み中...）が出るのが正しい挙動。
 */
export async function ArticleList({ selectedTags }: { selectedTags: string[] }) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  const articles = filterArticles(selectedTags)

  return (
    <>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        選択中: {selectedTags.length > 0 ? selectedTags.join(', ') : '(なし)'} ／{' '}
        {articles.length} 件
      </p>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title}{' '}
            <span style={{ color: '#999', fontSize: '0.8rem' }}>
              [{article.tags.join(', ')}]
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
