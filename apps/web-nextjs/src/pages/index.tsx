import { useTheme } from 'ui/hooks'
import { AnimeCard, Brand, Button, Chip, Container, Grid, Input, Modal, Pagination, Typography } from 'ui/components'
import React from "react";
import { useAmp } from 'next/amp';
import { PlayIcon } from '../assets/svgs';
import NextImage from 'next/image';
import { useQuery } from '@apollo/client';
import { animeSchema } from 'weboo-graphql-schema';
import { withApollo } from '../utils/hooks/useApollo';
import Head from 'next/head';
import { AnimeHomeModel, AnimeTrendModel, Trailer } from 'weboo-models'
import YouTube from 'react-youtube';
import { useRouter } from 'next/router';
import ROUTES_CONSTANT from '../utils/constants/routes.constants';
import { GetStaticProps } from 'next'
import styled from '@emotion/styled';
import colors from 'ui/theme/colors';
import helpers from 'ui/helpers';
import { PlusIcon } from 'ui/icons';
import { createSlugLink } from '../utils/helpers';
import Link from 'next/link';

type HomePageProps = {
  randomTrendPage: number
}

function HomePage(props: HomePageProps) {
  const isAmp = useAmp()

  return (
    <React.Fragment>
      <Head>
        <title>WeBoo: pusat anime terkeren</title>
      </Head >

      <HomeTemplate randomTrendPage={props.randomTrendPage} page={1} />
    </React.Fragment>
  )
}

HomePage.getInitialProps = async () => {
  const randomTrendPage = Math.floor(Math.random() * 10) + 1 | 1
  return { randomTrendPage }
}

export const config = { amp: 'hybrid' }
export default withApollo(HomePage);

const youtubeOpts = {
  height: '480',
  width: '720',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  }
}


type HomeTemplateProps = {
  randomTrendPage: number
  page: number
}

const { Title, Text } = Typography
const HomeTemplate = (props: HomeTemplateProps) => {
  const isAmp = useAmp()
  const { page, randomTrendPage } = props
  const [isModalYoutubeOpen, setIsModalYoutubeOpen] = React.useState(false)
  const [selectedYoutubeVideo, setSelectedYoutubeVideo] = React.useState('')

  const router = useRouter();

  const { data, loading, error } = useQuery<AnimeHomeModel, { page: number, perPage: number, randomPage?: number }>(animeSchema.ANIME_HOMEPAGE_SCHEMA, {
    variables: {
      page,
      perPage: 36,
      randomPage: randomTrendPage
    }
  })

  const handleBookmarkClick = () => {
    console.log('bookmark')
  }

  const handleTrailerClick = (trailer: Trailer) => {
    setSelectedYoutubeVideo(trailer.id)
    setIsModalYoutubeOpen(true)
  }

  const handleTrailerModalClose = () => {
    setIsModalYoutubeOpen(false)
    setSelectedYoutubeVideo("")
  }

  const handlePageChange = (page: number) => {
    router.push(`${ROUTES_CONSTANT.HOME}/?page=${page}`)
  }

  if (error) {
    return <div>Oops Error</div>
  }

  if (loading) {
    return <div>Loading....</div>
  }

  return (
    <React.Fragment>
      <Modal isOpen={isModalYoutubeOpen} onRequestClose={handleTrailerModalClose}>
        <YouTube videoId={selectedYoutubeVideo} opts={youtubeOpts} />
      </Modal>
      <Banner data={data?.trend.mediaTrends[0] as AnimeTrendModel} onBookmarkClick={handleBookmarkClick} />

      <section>
        <Container>
          <Title as='h4' weight='bold'>
            Semua anime
          </Title>
          <Grid>
            {data?.list.media.map((anime, index: number) => (
              <Grid.Item span={2} key={anime.id}>
                <AnimeCard
                  imageAs={NextImage}
                  isAmp={isAmp}
                  layout="responsive"
                  width={204}
                  height={280}
                  isLast={((index + 1) % 6) === 0}
                  data={anime}
                  onBookmarkClick={handleBookmarkClick}
                  onTrailerClick={handleTrailerClick}
                />
              </Grid.Item>
            ))}
          </Grid>

          <Pagination
            defaultPage={1}
            onChange={handlePageChange}
            position="right"
            total={data?.list.pageInfo.total}
            pageSize={36}
          />
        </Container>
      </section>

    </React.Fragment >
  );
}




type BannerProps = {
  data: AnimeTrendModel
  onBookmarkClick: () => void
}

const BannerWrapperStyled = styled.div`
  width: 100%;
  height: 620px;
  overflow: hidden;
  position: relative;
`;

const BannerContainerStyled = styled(Container)`
  position: absolute;
  z-index: 999;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  width:100%;
  overflow:auto;
  padding:0;

  top:52px;
`;

const BannerOverlayStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, ${colors.surface} 93.23%), linear-gradient(180deg, ${colors.surface} 0%, rgba(17, 17, 17, 0) 36.98%);
  z-index: 99;
`


const BannerInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  align-items: center;
`;

const LinkButton = styled.a`
  text-decoration: none;
`;

const Banner: React.FC<BannerProps> = (props) => {
  const { data } = props
  const title = data.media.title?.english || data.media.title?.romaji || data.media.title?.native || ''
  const { theme } = useTheme()

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onBookmarkClick()
  }

  const link = createSlugLink(undefined, title, data.media.id)

  return (
    <BannerWrapperStyled>
      <BannerOverlayStyled />
      <BannerContainerStyled>
        <Title as='h5' weight='bold'>
          Mungkin kamu akan suka
        </Title>
        <BannerInfoStyled>
          <Title as='h1' weight='bold'>
            {title}
          </Title>
          <Grid>
            <Grid.Item span={5}>
              <Text size="sm" dangerouslySetInnerHTML={{ __html: helpers.cutString(data.media.description, 500) }} color={theme.colors.textSecondary} />
            </Grid.Item>
          </Grid>
          <ButtonGroup>
            <Link href={link} passHref>
              <LinkButton href={link}>
                <Button prefixIcon={<PlayIcon />}>
                  Tonton
                </Button>
              </LinkButton>
            </Link>
            <Button data-testid="bookmark-btn" isIcon isOpacity onClick={handleBookmarkClick}>
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </BannerInfoStyled>
      </BannerContainerStyled>
      <NextImage
        src={data.media.bannerImage}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={title}
      />
    </BannerWrapperStyled>
  )
};