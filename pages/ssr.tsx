import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

// 引数の型を指定
type SSRProps = {
    message: string
}

// ページコンポーネントの定義
const SSR: NextPage<SSRProps> = (props) => {
    const {message} = props

    return (
        <div>
            <Head>
                <title>Creat New App</title>
                <link rel='icon' href='/favicon.cio'/>
            </Head>
            <main>
                <p>
                    このページはサーバーサイドレンダリング(SSR)によってアクセスするたびにサーバで描画されるページです。
                </p>
            </main>
        </div>
    )
}

// getServerSidePropsはページへのリクエストがあるたびに実行される
export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    // タイムスタンプを取得
    const timestamp = new Date().toLocaleString()

    const message = `${timestamp} にこのページのgetServerSidePropsが実行されました`
    console.log(message)

    return {
        props: {
            message,
        }
    }
}

export default SSR