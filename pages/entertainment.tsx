import Content from "../components/Content/Content";
import Head from "next/head";
import { Data } from "../types";
import { GetStaticProps } from "next";

const Entertainment = ({ data }: { data: Data }) => {
  return (
    <main className="main">
      <Head>
        <title>Top Entertainment Headlines UK</title>
        <meta
          name="description"
          content="The latest entertainment headlines from the UK"
        />
      </Head>
      <h1 className="pageTitle">Entertainment News</h1>
      <hr className="line" />
      <Content {...data} />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let data = {};
  try {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?country=gb&category=entertainment&pageSize=17",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
        },
      }
    );

    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: data,
    },
    //Refreshes the fetch every 12 hours to rebuild page with new stories
    revalidate: 60 * 60 * 12,
  };
};

export default Entertainment;
