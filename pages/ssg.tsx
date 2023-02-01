// 型のために導入
import { GetStaticProps, NextPage, NextPageContext } from 'next'

// Next.jsの組み込みのインポート
import Head from 'next/head'

// ページコンポーネントのpropsの型を定義
type SSGProps = {
    message: string
}

// SSGのページコンポーネント「SSG」を実装
// NextPage型 := Next.jsにおけるページコンポーネントの型
// NextPage<props>でpropsが入るPageであることを明示できる
const SSG: NextPage<SSGProps> = (props) => {
    const { message } = props
    
    return (
        <div>
            {/* {Headコンポーネントで包むと、その要素は<head>タグに配置される} */}
            <Head>
                <title>Static Site Generation</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <p>
                    このページは静的サイト生成(SSG)によって、ビルド時に生成されたページです
                </p>
                <p>
                    {message}
                </p>
            </main>
        </div>
    )
}

// getStaticProps ... 戻り値としてpropsを返し、それをページコンポーネントに渡す
// getStaticPropsという関数を定義してエクスポートすると、その関数はビルド時に実行される
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp} にgetStaticPropsが実行されました`
    console.log(message)

    return {
        // ここで返したpropsをもとにページコンポーネントを描画する
        props: {
            message,
        },
    }
}

// ページコンポーネントもexport defaultでエクスポートできる
export default SSG