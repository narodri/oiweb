"use client";

import { useState } from "react";
import Link from "next/link";

// 変換マッピングテーブル
const ZENKAKU_TO_HANKAKU_MAP: { [key: string]: string } = {
  // 数字
  '０': '0', '１': '1', '２': '2', '３': '3', '４': '4', '５': '5', '６': '6', '７': '7', '８': '8', '９': '9',
  // 英大文字
  'Ａ': 'A', 'Ｂ': 'B', 'Ｃ': 'C', 'Ｄ': 'D', 'Ｅ': 'E', 'Ｆ': 'F', 'Ｇ': 'G', 'Ｈ': 'H', 'Ｉ': 'I', 'Ｊ': 'J',
  'Ｋ': 'K', 'Ｌ': 'L', 'Ｍ': 'M', 'Ｎ': 'N', 'Ｏ': 'O', 'Ｐ': 'P', 'Ｑ': 'Q', 'Ｒ': 'R', 'Ｓ': 'S', 'Ｔ': 'T',
  'Ｕ': 'U', 'Ｖ': 'V', 'Ｗ': 'W', 'Ｘ': 'X', 'Ｙ': 'Y', 'Ｚ': 'Z',
  // 英小文字
  'ａ': 'a', 'ｂ': 'b', 'ｃ': 'c', 'ｄ': 'd', 'ｅ': 'e', 'ｆ': 'f', 'ｇ': 'g', 'ｈ': 'h', 'ｉ': 'i', 'ｊ': 'j',
  'ｋ': 'k', 'ｌ': 'l', 'ｍ': 'm', 'ｎ': 'n', 'ｏ': 'o', 'ｐ': 'p', 'ｑ': 'q', 'ｒ': 'r', 'ｓ': 's', 'ｔ': 't',
  'ｕ': 'u', 'ｖ': 'v', 'ｗ': 'w', 'ｘ': 'x', 'ｙ': 'y', 'ｚ': 'z',
  // 記号
  '　': ' ', '！': '!', '＂': '"', '＃': '#', '＄': '$', '％': '%', '＆': '&', '＇': "'", '（': '(', '）': ')',
  '＊': '*', '＋': '+', '，': ',', '－': '-', '．': '.', '／': '/', '：': ':', '；': ';', '＜': '<', '＝': '=',
  '＞': '>', '？': '?', '＠': '@', '［': '[', '＼': '\\', '］': ']', '＾': '^', '＿': '_', '｀': '`', '｛': '{',
  '｜': '|', '｝': '}', '～': '~', '〜': '~',
  // カタカナ（濁点・半濁点なし）
  'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
  'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
  'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
  'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
  'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
  'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
  'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
  'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
  'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
  'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
  // カタカナ（濁点）
  'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
  'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
  'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
  'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
  'ヴ': 'ｳﾞ',
  // カタカナ（半濁点）
  'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
  // カタカナ（小文字）
  'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ',
  'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ', 'ヮ': 'ﾜ',
  // 長音記号
  'ー': 'ｰ',
};

// 半角→全角マップ（逆マッピング）
const HANKAKU_TO_ZENKAKU_MAP: { [key: string]: string } = {};
Object.entries(ZENKAKU_TO_HANKAKU_MAP).forEach(([zenkaku, hankaku]) => {
  HANKAKU_TO_ZENKAKU_MAP[hankaku] = zenkaku;
});

export default function ZenkakuHankakuConverter() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"toHankaku" | "toZenkaku">("toHankaku");
  const [showToast, setShowToast] = useState(false);
  const [options, setOptions] = useState({
    katakana: true,
    alphanumeric: true,
    symbols: true,
  });

  // カタカナ判定
  const isKatakana = (char: string): boolean => {
    const code = char.charCodeAt(0);
    return (code >= 0x30A0 && code <= 0x30FF) || // 全角カタカナ
           (code >= 0xFF65 && code <= 0xFF9F);   // 半角カタカナ
  };

  // 英数字判定
  const isAlphanumeric = (char: string): boolean => {
    const code = char.charCodeAt(0);
    return (code >= 0xFF10 && code <= 0xFF19) || // 全角数字
           (code >= 0xFF21 && code <= 0xFF3A) || // 全角英大文字
           (code >= 0xFF41 && code <= 0xFF5A) || // 全角英小文字
           (char >= '0' && char <= '9') ||        // 半角数字
           (char >= 'A' && char <= 'Z') ||        // 半角英大文字
           (char >= 'a' && char <= 'z');          // 半角英小文字
  };

  // 記号判定
  const isSymbol = (char: string): boolean => {
    const code = char.charCodeAt(0);
    return char === '　' || char === ' ' || 
           (code >= 0xFF01 && code <= 0xFF0F) ||
           (code >= 0xFF1A && code <= 0xFF20) ||
           (code >= 0xFF3B && code <= 0xFF40) ||
           (code >= 0xFF5B && code <= 0xFF5E) ||
           char === '〜' || char === '～' ||
           (char >= '!' && char <= '/') ||
           (char >= ':' && char <= '@') ||
           (char >= '[' && char <= '`') ||
           (char >= '{' && char <= '~');
  };

  // 全角→半角変換
  const toHankaku = (str: string): string => {
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      
      // オプションチェック
      if (!options.katakana && isKatakana(char)) {
        result += char;
        continue;
      }
      if (!options.alphanumeric && isAlphanumeric(char)) {
        result += char;
        continue;
      }
      if (!options.symbols && isSymbol(char)) {
        result += char;
        continue;
      }
      
      // マッピングテーブルで変換
      if (ZENKAKU_TO_HANKAKU_MAP[char]) {
        result += ZENKAKU_TO_HANKAKU_MAP[char];
      } else {
        result += char;
      }
    }
    
    return result;
  };

  // 半角→全角変換
  const toZenkaku = (str: string): string => {
    let result = '';
    let i = 0;
    
    while (i < str.length) {
      const char = str[i];
      const nextChar = str[i + 1];
      
      // オプションチェック（先にチェック）
      if (!options.katakana && isKatakana(char)) {
        result += char;
        i++;
        continue;
      }
      if (!options.alphanumeric && isAlphanumeric(char)) {
        result += char;
        i++;
        continue;
      }
      if (!options.symbols && isSymbol(char)) {
        result += char;
        i++;
        continue;
      }
      
      // 濁点・半濁点の処理（2文字セットで変換）
      if (nextChar === 'ﾞ' || nextChar === 'ﾟ') {
        const combo = char + nextChar;
        if (HANKAKU_TO_ZENKAKU_MAP[combo]) {
          result += HANKAKU_TO_ZENKAKU_MAP[combo];
          i += 2;
          continue;
        }
      }
      
      // 通常の1文字変換
      if (HANKAKU_TO_ZENKAKU_MAP[char]) {
        result += HANKAKU_TO_ZENKAKU_MAP[char];
      } else {
        result += char;
      }
      i++;
    }
    
    return result;
  };

  // 変換結果を取得
  const outputText = mode === "toHankaku" ? toHankaku(inputText) : toZenkaku(inputText);

  // コピー機能
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", sans-serif' }}>
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            全角半角変換ツール
          </h1>
          <p className="text-slate-600 leading-relaxed">
            カタカナ、英数字、記号の全角・半角を瞬時に変換します。銀行名入力や各種申請フォームで発生する文字種エラーの解決にご利用ください。
          </p>
        </header>

        {/* Converter Tool - Papago/DeepL Style Layout */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-8">
          {/* Toolbar */}
          <div className="bg-gray-50 border-b border-gray-300 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left: Mode Selection */}
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="toHankaku"
                    checked={mode === "toHankaku"}
                    onChange={(e) => setMode(e.target.value as "toHankaku")}
                    className="w-4 h-4 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-700">全角 → 半角</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="toZenkaku"
                    checked={mode === "toZenkaku"}
                    onChange={(e) => setMode(e.target.value as "toZenkaku")}
                    className="w-4 h-4 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-700">半角 → 全角</span>
                </label>
              </div>

              {/* Right: Conversion Options */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-slate-600">変換対象:</span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.katakana}
                    onChange={(e) => setOptions({...options, katakana: e.target.checked})}
                    className="w-3.5 h-3.5 text-indigo-900 border-gray-300 rounded focus:ring-indigo-900"
                  />
                  <span className="ml-1.5 text-xs text-slate-700">カタカナ</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.alphanumeric}
                    onChange={(e) => setOptions({...options, alphanumeric: e.target.checked})}
                    className="w-3.5 h-3.5 text-indigo-900 border-gray-300 rounded focus:ring-indigo-900"
                  />
                  <span className="ml-1.5 text-xs text-slate-700">英数字</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.symbols}
                    onChange={(e) => setOptions({...options, symbols: e.target.checked})}
                    className="w-3.5 h-3.5 text-indigo-900 border-gray-300 rounded focus:ring-indigo-900"
                  />
                  <span className="ml-1.5 text-xs text-slate-700">記号・スペース</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Area: 50-50 Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            {/* Left: Input Area */}
            <div className="flex flex-col h-full border-b md:border-b-0 md:border-r border-gray-300">
              {/* Header - Fixed Height */}
              <div className="h-14 flex items-center px-4 bg-slate-50 border-b border-gray-200">
                <span className="text-sm font-medium text-slate-700">入力</span>
              </div>
              
              {/* Content - Flexible */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="変換したいテキストを入力してください"
                className="flex-1 w-full p-4 border-0 focus:outline-none resize-none text-base text-slate-900 bg-white"
              />
              
              {/* Footer - Fixed Height */}
              <div className="h-12 flex items-center justify-end px-4 bg-white border-t border-gray-200">
                <span className="text-xs text-slate-400">{inputText.length} 文字</span>
              </div>
            </div>

            {/* Right: Output Area */}
            <div className="flex flex-col h-full">
              {/* Header - Fixed Height */}
              <div className="h-14 flex items-center justify-between px-4 bg-slate-50 border-b border-gray-200">
                <span className="text-sm font-medium text-slate-700">変換結果</span>
              </div>
              
              {/* Content - Flexible */}
              <div className="flex-1 w-full p-4 text-base text-slate-900 whitespace-pre-wrap break-words overflow-y-auto bg-white">
                {outputText || <span className="text-slate-400">変換結果がここに表示されます</span>}
              </div>
              
              {/* Footer - Fixed Height */}
              <div className="h-12 flex items-center justify-between px-4 bg-white border-t border-gray-200">
                <span className="text-xs text-slate-400">{outputText.length} 文字</span>
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="flex items-center gap-1.5 px-3 py-1 bg-indigo-900 text-white text-xs font-medium rounded hover:bg-indigo-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  title="コピー"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>コピー</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>コピーしました</span>
          </div>
        )}

        {/* Supported Character Types Section */}
        <section className="mt-12">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">対応文字種</h2>
            <ul className="space-y-2.5 text-base text-slate-700">
              <li className="flex items-start">
                <span className="mr-3 text-slate-400">•</span>
                <span>カタカナ（全角 ⇄ 半角）※濁点・半濁点対応</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-slate-400">•</span>
                <span>英字（全角 ⇄ 半角）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-slate-400">•</span>
                <span>数字（全角 ⇄ 半角）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-slate-400">•</span>
                <span>記号（全角 ⇄ 半角）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-slate-400">•</span>
                <span>スペース（全角 ⇄ 半角）</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SEO Content Section - De-emphasized */}
        <section className="mt-8">
          <div className="bg-slate-50 rounded-lg p-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              全角半角変換が必要な理由
            </h2>
            
            <div className="space-y-4 text-sm text-gray-500 leading-relaxed">
              <p>
                日本のビジネスシーンや官公庁の各種手続きにおいて、全角文字と半角文字の使い分けは非常に重要です。特に、インターネットバンキングでの銀行名入力、行政機関への電子申請、会社登記のオンライン申請などでは、指定された文字種以外を入力するとエラーが発生し、手続きが完了できないケースが頻繁に発生しております。
              </p>

              <p>
                例えば、銀行名の入力においては「三井住友銀行」と全角カタカナで入力すべきところを、キーボードの設定により「ﾐﾂｲｽﾐﾄﾓ銀行」と半角カタカナが混在してしまうことがございます。また、口座番号や電話番号などの数字入力では、半角数字を求められる場合と全角数字を求められる場合があり、システムによって要件が異なるため、入力ミスによるエラーが起こりやすくなっております。
              </p>

              <p>
                本ツールは、このような文字種の統一が必要な場面で、テキストを一括で全角または半角に変換することで、入力エラーを未然に防ぐことを目的としております。特に、大量のデータを処理する必要がある経理部門や人事部門の方々、各種申請業務を担当される方々にとって、業務効率の向上にお役立ていただけます。変換は即座に行われ、結果をワンクリックでコピーできますので、スムーズな作業進行が可能となります。
              </p>

              <p>
                また、プログラミングやデータベース管理において、文字コードの統一は極めて重要です。全角文字と半角文字が混在したデータは、検索機能の精度低下やソート処理の不具合を引き起こす原因となります。本ツールを活用することで、データの品質管理を適切に行い、システムの安定稼働に貢献できます。
              </p>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-900 hover:text-indigo-800 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
