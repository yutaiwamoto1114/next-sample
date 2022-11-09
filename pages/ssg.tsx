// 型のために導入
import { NextPage } from 'next'

// Next.jsの組み込みのインポート
import Head from 'next/head'

// ページコンポーネントのpropsの型を定義(ここでは空の型を定義している)
type SSGProps = {}

// SSG向けのページを実装
// NextPage型 := Next.jsのPages向けの型
// NextPage<props>でpropsが入るPageであることを明示できる
const SSG: NextPage<SSGProps> = () => {
    return (
        <div>
            {/* {Headコンポーネントで包むと、その要素は<head>タグに配置される} */}
            <Head>
                <title>Static Site Generation</title>
            </Head>
            <main>
                <p>
                    このページは静的サイト生成(SSG)によって、ビルド時に生成されたページです
                </p>
            </main>
        </div>
    )
}

// ページコンポーネントもexport defaultでエクスポートできる
export default SSG