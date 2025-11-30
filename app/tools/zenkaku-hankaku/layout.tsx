import { Metadata } from "next";

export const metadata: Metadata = {
  title: "全角半角変換ツール",
  description:
    "カタカナ、英数字、記号の全角・半角を瞬時に相互変換。銀行名入力や各種申請フォームで発生する文字種エラーの解決に最適な無料オンラインツールです。",
  keywords: [
    "全角半角変換",
    "全角変換",
    "半角変換",
    "カタカナ変換",
    "文字変換ツール",
    "全角カタカナ",
    "半角カタカナ",
    "オンラインツール",
    "無料ツール",
  ],
  openGraph: {
    title: "全角半角変換ツール | My Tools",
    description:
      "カタカナ、英数字、記号の全角・半角を瞬時に相互変換。銀行名入力や各種申請フォームで発生する文字種エラーの解決に最適な無料オンラインツールです。",
    url: "https://oiweb.pages.dev/tools/zenkaku-hankaku",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "全角半角変換ツール | My Tools",
    description:
      "カタカナ、英数字、記号の全角・半角を瞬時に相互変換。銀行名入力や各種申請フォームで発生する文字種エラーの解決に最適。",
  },
  alternates: {
    canonical: "https://oiweb.pages.dev/tools/zenkaku-hankaku",
  },
};

export default function ZenkakuHankakuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
