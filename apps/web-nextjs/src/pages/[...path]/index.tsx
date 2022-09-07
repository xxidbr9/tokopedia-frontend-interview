import Meta from '@/components/meta';
import { createApolloClient } from '@/utils/hooks/useApollo';
import { GetServerSideProps } from 'next';
import React from 'react';
import { animeSchema } from 'weboo-graphql-schema';
import { AnimeDetailModel } from 'weboo-models';


type DetailPageProps = {
  data: AnimeDetailModel['Media']
}

const DetailPage = (props: DetailPageProps) => {
  const title = props.data.title.english || props.data.title.romaji || props.data.title.native || props.data.title.userPreferred
  return (
    <React.Fragment>
      <Meta title={title} description={props.data.description} />
      <pre>
        {JSON.stringify(props.data, null, 2)}
      </pre>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<DetailPageProps> = async (ctx) => {
  const client = createApolloClient({});

  const path = ctx.params.path as string[];
  if (path.length === 1) {
    return {
      notFound: true
    }
  }
  
  const id = path[path.length - 1];
  const { data, error } = await client.query<AnimeDetailModel, { id: any }>({
    query: animeSchema.ANIME_DETAIL_SCHEMA,
    variables: {
      id,
    }
  });

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: data.Media,
    }
  }
}

export default DetailPage;