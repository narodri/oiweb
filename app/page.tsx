import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", sans-serif' }}>
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            オンラインツール集
          </h1>
          <p className="text-slate-600">
            ビジネスで役立つ実用的なWebツールを無料でご利用いただけます
          </p>
        </header>

        {/* Tool Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 全角半角変換ツール */}
          <Link href="/tools/zenkaku-hankaku">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-slate-400 transition-colors cursor-pointer h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                全角半角変換
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                カタカナ、英数字、記号の全角・半角を相互変換。銀行名入力や申請フォーム入力時のエラー対策に。
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-900">
                ツールを開く →
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-slate-500 text-center">
            © 2025 オンラインツール集. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
