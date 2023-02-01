import {GetStaticPaths, NextPage, GetStaticProps} from 'next'
import Head from 'next/head'
import { useRouter, userRouter } from 'next/router'

// 引数の型定義
type ISRProps = {
    message: string
}

// ページコンポーネント定義
const ISR: NextPage<ISRProps> = (props) => {
    const {message} = props

    const router = useRouter()

    if (router.isFallback) {
        // フォールバック用ページ
        return <div>Loading...</div>
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <main>
                <p>このページはISR(インクリメンタル静的再生成)によってビルド時に生成されたページです。</p>
                <p>{message}</p>
            </main>
        </div>
    )
}

// getStaticProps ... 戻り値としてpropsを返し、それをページコンポーネントに渡す
export const getStaticProps: GetStaticProps<ISRProps> = async (context) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp} にこのページのgetStaticPropsが実行されました`

    return {
        props: {
            message,
        },
        // ページの有効期間を秒単位で指定
        revalidate: 60,
    }
}

export default ISR