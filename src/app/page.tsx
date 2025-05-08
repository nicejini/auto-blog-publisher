import Link from 'next/link'
import { database } from '@/services/database'

export default async function Home() {
  const posts = await database.getAllPosts()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          최신 블로그 포스트
        </h2>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          AI가 생성한 최신 콘텐츠를 확인하세요
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">아직 게시된 포스트가 없습니다.</p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </p>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
                <Link
                  href={`/posts/${post.id}`}
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                >
                  자세히 보기 →
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
} 