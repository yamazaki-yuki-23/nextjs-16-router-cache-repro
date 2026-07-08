export type Article = {
  id: number
  title: string
  tags: string[]
}

export const ALL_TAGS = ['react', 'nextjs', 'typescript', 'css'] as const

const ARTICLES: Article[] = [
  { id: 1, title: 'useEffect の依存配列を理解する', tags: ['react'] },
  { id: 2, title: 'App Router のキャッシュ入門', tags: ['nextjs'] },
  { id: 3, title: '型で表現する状態管理', tags: ['typescript'] },
  { id: 4, title: 'CSS Grid 実践レイアウト', tags: ['css'] },
  { id: 5, title: 'Server Components と型安全な fetch', tags: ['nextjs', 'typescript'] },
  { id: 6, title: 'React と CSS-in-JS の付き合い方', tags: ['react', 'css'] },
  { id: 7, title: 'Suspense で作るローディング体験', tags: ['react', 'nextjs'] },
  { id: 8, title: 'ジェネリクスで書く汎用フック', tags: ['react', 'typescript'] },
]

/**
 * 選択されたタグで記事を絞り込む。
 * tags が空なら全件返す。指定タグのいずれかを含む記事を返す（OR 条件）。
 * 呼び出し側で意図的に遅延を入れているため、この関数自体は同期処理。
 */
export function filterArticles(tags: string[]): Article[] {
  if (tags.length === 0) return ARTICLES
  return ARTICLES.filter((article) =>
    article.tags.some((tag) => tags.includes(tag))
  )
}
