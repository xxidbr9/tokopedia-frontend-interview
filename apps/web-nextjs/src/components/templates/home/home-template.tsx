import { rdxScreenSelector } from "@/redux-state/features/screen"
import { ROUTE_CONSTANTS } from "@/utils/constants"
import { createSlugLink } from "@/utils/helpers"
import { useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useAmp } from "next/amp"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import YouTube from "react-youtube"
import { Typography, Modal, Container, Grid, AnimeCard, Pagination, useTheme, Button, PlayIcon, PlusIcon } from "ui"
import helpers from "ui/helpers"
import colors from "ui/theme/colors"
import { animeSchema } from "weboo-graphql-schema"
import { AnimeHomeModel, Trailer, AnimeTrendModel, AnimeMediaListItem } from "weboo-models"
import NextImage from 'next/image';
import React from "react"

// TODO: move this to template
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
  const isMobile = useSelector(rdxScreenSelector.IsMobile)


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
    router.push(`${ROUTE_CONSTANTS.SEARCH}/?page=${page}`)
  }

  if (error) {
    return <div>Oops Error</div>
  }

  if (loading) {
    // center div
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      Loading...
    </div>
  }

  return (
    <React.Fragment>
      <Modal isOpen={isModalYoutubeOpen} onRequestClose={handleTrailerModalClose}>
        <YouTube videoId={selectedYoutubeVideo} opts={youtubeOpts} />
      </Modal>

      <Banner isMobile={isMobile} data={data?.trend.mediaTrends[0] as AnimeTrendModel} onBookmarkClick={handleBookmarkClick} />

      <section>
        <Container isMobile={isMobile}>
          <Title as='h4' weight='bold'>
            Semua anime
          </Title>
          <Grid style={{ paddingBottom: "4rem" }} columns={isMobile ? 4 : 12}>
            {data?.list.media.map((anime, index: number) => (
              <Grid.Item span={2} key={anime.id}>
                <AnimeCard
                  linkAs={LinkAs}
                  href={createSlugLink(getTitle(anime.title), anime.id)}
                  isMobile={isMobile}
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
            isMobile={isMobile}
            defaultPage={1}
            onChange={handlePageChange}
            position={isMobile ? "center" : "right"}
            total={data?.list.pageInfo.total}
            pageSize={36}
          />
        </Container>
      </section>

    </React.Fragment >
  );
}



const getTitle = (rawTitle: AnimeMediaListItem['title']) => {
  return rawTitle?.english || rawTitle?.romaji || rawTitle?.native || ''
}

const LinkAs = ({ href, children, ...props }) => <Link href={href} passHref><a {...props}>{children}</a></Link>


// TODO : split this component
type BannerProps = {
  data: AnimeTrendModel
  onBookmarkClick: () => void
  isMobile?: boolean
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


  const isAmp = useAmp();

  const link = createSlugLink(title, data.media.id)
  const bannerImage = props.isMobile ? data.media.coverImage?.extraLarge : data.media.bannerImage
  return (
    <BannerWrapperStyled>
      <BannerOverlayStyled />
      <BannerContainerStyled>
        <React.Fragment>
          <Title as='h5' weight='bold' style={{ ...(props.isMobile ? { padding: "0 20px" } : {}) }}>
            Mungkin kamu akan suka
          </Title>
          <BannerInfoStyled style={{ ...(props.isMobile ? { padding: "0 20px" } : {}) }}>
            <Title as='h1' weight='bold'>
              {title}
            </Title>
            <Grid columns={props.isMobile ? 4 : 12}>
              <Grid.Item span={props.isMobile ? 4 : 5}>
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
              <Button aria-label='bookmark-button' data-testid="bookmark-btn" isIcon isOpacity onClick={handleBookmarkClick}>
                <PlusIcon />
              </Button>
            </ButtonGroup>
          </BannerInfoStyled>
        </React.Fragment>


      </BannerContainerStyled>
      {isAmp ? (
        <amp-img
          src={bannerImage}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={title} />
      ) : (
        <NextImage
          src={bannerImage}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={title}
        />
      )}

    </BannerWrapperStyled>
  )
};

export default HomeTemplate