// p.122 動的ルーティング
// [id].tsxの[]で囲んでいる部分がパスパラメータを表す

/*
    getStaticPathsは、getStaticProps実行前に呼ばれる関数で、
    生成したいページのパスパラメータの組み合わせ(paths)とフォールバック(fallback)を返す
    pathsは要素の1つ1つがページに対応し、fallbackはページが存在しない場合の処理となる
*/

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from 'next/head'
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

// 引数の型の定義
type PostProps = {
    id: string
}

// ページコンポーネントの定義
const Post: NextPage<PostProps> = (props) => {
    const {id} = props // 引数受け取り
    const router = useRouter() // useRouterフックを変数に格納

    // フォールバックページ向けの表示を返す
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    // propsで渡されたidが存在する場合の表示
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"></link>
            </Head>
            <main> <p>このページは静的サイト生成(SSG)によってビルド時に生成されたページです。
                </p>
                <p>{`/posts/${id}に対応するページです`}</p>
            </main>
        </div>
    )
}

// getStaticPathsは生成したいページのパスパラメータの組み合わせを返す
// このファイルはpages/posts/[id].tsxなので、パスパラメータとしてidの値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
    // それぞれのパスパラメータをまとめたものをpathsとして定義
    const paths = [
        {
            params: {
                id: '1',
            },
        },
        {
            params: {
                id: '2',
            },
        },
        {
            params: {
                id: '3',
            },
        },
    ]

    // 存在するページならpaths
    // fallbackをfalseにすると、pathsで定義されたページ以外は404ページを表示する
    return {paths, fallback: false}
}

// パラメータの型を定義
interface PostParams extends ParsedUrlQuery {
    id: string
}

// getStaticPaths実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (context) => {
    return {
        props: {
            // paramにgetStaticPathsで指定した値がそれぞれ入っている
            id: context.params!['id'],
        },
    }
}

// ページコンポーネントをエクスポート
export default Post