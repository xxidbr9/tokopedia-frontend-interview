import { rdxCollectionAction, rdxCollectionSelector } from '@/redux-state/features/collection'
import { rdxScreenSelector } from '@/redux-state/features/screen'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import YouTube from 'react-youtube'
import { Button, Chip, Container, Grid, Modal, PlayIcon, PlusIcon, Typography } from 'ui'
import { cutString } from 'ui/helpers/cutString'
import colors from 'ui/theme/colors'
import { AnimeMediaListItem, Media } from 'weboo-models'
import { CollectionModal, NewCollectionModal, SheetCollection, SheetNewCollection } from '../home/home-template'

type DetailTemplateProps = {
  data: Media
}

const DetailTemplate = (props: DetailTemplateProps) => {
  const title = props.data.title.romaji || props.data.title.english || props.data.title.native || props.data.title.userPreferred || ""

  return (
    <React.Fragment>
      <DetailHero data={props.data} />
      {/* Tabs */}

      {/* Episodes */}
      <AnimeEpisodes title={title} data={props.data.streamingEpisodes} />
    </React.Fragment>
  )
}

export default DetailTemplate

// TODO: move this to template
const youtubeOpts = {
  height: '480',
  width: '720',
  playerVars: {
    autoplay: 1,
  }
}

type DetailHeroProps = {
  // banner: string
  // coverImage: Media['coverImage']
  // title: string
  data: Media

}
const DetailHero = (props: DetailHeroProps) => {
  const { data } = props
  const isMobile = useSelector(rdxScreenSelector.IsMobile)
  const dispatch = useDispatch()

  const isHaveBanner = data.bannerImage !== null
  const banner = isHaveBanner ? data.bannerImage : data.coverImage.extraLarge || data.coverImage.large || data.coverImage.medium
  const coverImage = data.coverImage.extraLarge || data.coverImage.large || data.coverImage.medium
  const title = data.title.english || data.title.romaji || data.title.native || data.title.userPreferred || ""
  const router = useRouter();

  // toggle show more description
  const [showedMore, setShowedMore] = React.useState(false)
  const toggleShowedMore = () => {
    setShowedMore(!showedMore)
  }

  const description = showedMore ? data.description : cutString(data.description, 300);

  const [isModalYoutubeOpen, setIsModalYoutubeOpen] = React.useState(false)


  // collection start here 
  const [isModalCollectionOpen, setIsModalCollectionOpen] = React.useState(false)
  const [selectedAnime, setSelectedAnime] = React.useState<Media | null>(null)
  const [isModalNewCollectionOpen, setIsModalNewCollectionOpen] = React.useState(false)

  const handleCollectionClick = (anime: Media) => {
    setIsModalCollectionOpen(true);
    setSelectedAnime(anime);
  }

  const handleCollectionModalClose = () => {
    setIsModalCollectionOpen(false);
  }

  const handleNewCollectionInModalClicked = () => {
    setIsModalCollectionOpen(false);
    setIsModalNewCollectionOpen(true);
  }

  const handleCollectionModalAdded = (id: string) => {
    setIsModalCollectionOpen(false);
    setIsModalNewCollectionOpen(false);
    const d = dispatch(rdxCollectionAction.addToCollection({
      collectionId: id,
      media: selectedAnime
    }))
  }

  const handleBackToCollection = () => {
    setIsModalNewCollectionOpen(false);
    setIsModalCollectionOpen(true);
  }

  const handleCreateNewCollection = (collectionName: string) => {
    dispatch(rdxCollectionAction.createCollection({
      title: collectionName,
      media: [selectedAnime]
    }))
    setIsModalNewCollectionOpen(false);
  }

  const toastStyle = useMemo(() => ({
    background: colors.surface,
    ...(isMobile ? { bottom: "0px", margin: "0 20px", zIndex: 999 } : {})
  }), [isMobile])

  const errorAddToCollection = useSelector(rdxCollectionSelector.getErrorMessage)
  useEffect(() => {
    if (!!errorAddToCollection) {
      toast.error(errorAddToCollection, { style: toastStyle, onClose: () => dispatch(rdxCollectionAction.clearError()) })
    }
    () => {
      dispatch(rdxCollectionAction.clearError())
    }
  }, [errorAddToCollection, dispatch, toastStyle])

  const successAddToCollection = useSelector(rdxCollectionSelector.getSuccessMessage)
  useEffect(() => {
    if (!!successAddToCollection) {
      toast.success(successAddToCollection, { style: toastStyle, onClose: () => dispatch(rdxCollectionAction.clearSuccessMessage()) })
    }
    () => {
      dispatch(rdxCollectionAction.clearSuccessMessage())
    }
  }, [successAddToCollection, dispatch, toastStyle])
  // collection end here

  const handleWatchTrailerMobile = () => {
    // go to youtube
    const youtubePrefixUrl = "https://www.youtube.com/watch?v="
    window.open(youtubePrefixUrl + data.trailer.id, "_blank")
  }

  return (
    <React.Fragment>
      {!isMobile && (
        <React.Fragment>
          {/* Modal */}
          {!!data.trailer && (
            <Modal isOpen={isModalYoutubeOpen} onRequestClose={() => setIsModalYoutubeOpen(false)}>
              <YouTube videoId={data.trailer.id} opts={youtubeOpts} />
            </Modal>
          )}

          <Modal isOpen={isModalCollectionOpen} onRequestClose={handleCollectionModalClose}>
            <CollectionModal
              onCollectionClick={handleCollectionModalAdded}
              onNewCollectionClick={handleNewCollectionInModalClicked}
              onClose={handleCollectionModalClose}
            />
          </Modal>

          <Modal isOpen={isModalNewCollectionOpen} onRequestClose={handleBackToCollection}>
            <NewCollectionModal
              onBack={handleBackToCollection}
              onSave={handleCreateNewCollection}
            />
          </Modal>

          {/* Modal stop */}
          <BannerHeroStyled>
            <BannerWrapperStyled>
              <Image alt={`banner ${data.title}`} src={banner} layout="responsive" objectFit='cover' width={1116} height={420} />
            </BannerWrapperStyled>
            <BannerBackgroundStyled banner={banner} />
            <OverlayHeroStyled />
          </BannerHeroStyled>

          <section style={{ marginTop: "-180px", position: "relative", zIndex: "999", width: "100%" }}>
            <Container>
              <Grid columns={12} style={{ alignItems: "end" }}>
                <Grid.Item span={3} >
                  <Image alt={`cover ${data.title}`} style={{ borderRadius: "20px" }} objectFit="cover" src={coverImage} layout="responsive" width={318} height={436} />
                </Grid.Item>
                <Grid.Item span={6} style={{ display: "flex", flexDirection: "column", rowGap: "24px" }}>
                  <ButtonGroup>
                    {!!data.trailer && (
                      <Button prefixIcon={<PlayIcon />} onClick={() => setIsModalYoutubeOpen(true)}>
                        Tonton Trailer
                      </Button>
                    )}
                    <Button
                      aria-label='bookmark-button'
                      data-testid="bookmark-btn"
                      isIcon
                      isOpacity
                      onClick={() => handleCollectionClick(data)}>
                      <PlusIcon />
                    </Button>
                  </ButtonGroup>
                  <div style={{ display: "flex", flexDirection: "column", rowGap: "12px" }}>
                    <Typography.Title as='h1' style={{ margin: "0", color: colors.textPrimary, fontWeight: "bold" }}>{title}</Typography.Title>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                      {data.isAdult
                        && (
                          <React.Fragment>
                            <Typography.Text size="sm">
                              18+
                            </Typography.Text>
                            <div style={{ margin: "0 4px", color: colors.textSecondary }} >
                              ∙
                            </div>
                          </React.Fragment>
                        )}
                      <Typography.Text size="sm">
                        {data.seasonYear}
                      </Typography.Text>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", columnGap: 4 }}>
                      {data.genres.map((genre, index) => (
                        <Chip key={index}>
                          {genre}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </Grid.Item>
              </Grid>
            </Container>
            <Container style={{ marginTop: "24px" }}>
              <Grid columns={12} style={{ rowGap: "12px" }}>
                <Grid.Item span={9}>
                  <React.Fragment>
                    <Typography.Text style={{ color: colors.textSecondary }} dangerouslySetInnerHTML={{ __html: description }} />
                    <Button onClick={toggleShowedMore} style={{ marginTop: "12px" }} variant="link" >
                      {showedMore ? "Lebih sedikit" : "Selengkapnya"}
                    </Button>
                  </React.Fragment>
                </Grid.Item>
              </Grid>
            </Container>
          </section>

        </React.Fragment>
      )}

      {isMobile && (
        <React.Fragment>
          <SheetCollection
            isOpen={isModalCollectionOpen}
            onClose={handleCollectionModalClose}
            onCollectionClick={handleCollectionModalAdded}
            onNewCollectionClick={handleNewCollectionInModalClicked}
          />
          <SheetNewCollection
            isOpen={isModalNewCollectionOpen}
            onClose={handleBackToCollection}
            onSave={handleCreateNewCollection}
          />

          <HeroMobileStyled>
            <Image alt={`banner mobile ${title}`} src={coverImage} layout="responsive" objectFit='cover' width={420} height={520} />
            <OverlayMobileStyled />
          </HeroMobileStyled>
          <div style={{ padding: "0 20px" }}>
            <div style={{ display: "flex", flexDirection: "column", rowGap: "12px" }}>
              <Typography.Title as='h1' style={{ margin: "0", color: colors.textPrimary, fontWeight: "bold" }}>{title}</Typography.Title>
              <ButtonGroup>
                {!!data.trailer && (
                  <Button prefixIcon={<PlayIcon />} onClick={handleWatchTrailerMobile}>
                    Tonton Trailer
                  </Button>
                )}
                <Button
                  aria-label='bookmark-button'
                  data-testid="bookmark-btn"
                  isIcon
                  isOpacity
                  onClick={() => handleCollectionClick(data)}>
                  <PlusIcon />
                </Button>
              </ButtonGroup>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                {data.isAdult
                  && (
                    <React.Fragment>
                      <Typography.Text size="sm">
                        18+
                      </Typography.Text>
                      <div style={{ margin: "0 4px", color: colors.textSecondary }} >
                        ∙
                      </div>
                    </React.Fragment>
                  )}
                <Typography.Text size="sm">
                  {data.seasonYear}
                </Typography.Text>
              </div>
              <div style={{ display: "flex", flexDirection: "row", columnGap: 4 }}>
                {data.genres.map((genre, index) => (
                  <Chip key={index}>
                    {genre}
                  </Chip>
                ))}
              </div>
              <Grid columns={4}>
                <Grid.Item span={4}>
                  <Typography.Text style={{ color: colors.textSecondary }} dangerouslySetInnerHTML={{ __html: description }} />
                  <Button onClick={toggleShowedMore} style={{ marginTop: "12px" }} variant="link" >
                    {showedMore ? "Lebih sedikit" : "Selengkapnya"}
                  </Button>
                </Grid.Item>
              </Grid>


            </div>
          </div>
        </React.Fragment>
      )}

    </React.Fragment>
  )
};


const HeroMobileStyled = styled.div`
  width: 100%;
  height: 520px;
  position: relative;
`

const OverlayMobileStyled = styled.div`
  position: absolute;
  height: 520px;
  width: 100%;
  z-index: 99;
  top: 0;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, ${colors.surface} 93.23%), linear-gradient(180deg, ${colors.surface} 0%, rgba(17, 17, 17, 0) 36.98%);
`

const BannerMobileStyled = styled.div`

`;



const OverlayHeroStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 420px;
  z-index: 100;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, ${colors.surface} 93.23%), linear-gradient(180deg, ${colors.surface} 0%, rgba(17, 17, 17, 0) 36.98%);
`

const BannerHeroStyled = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
`;


const BannerWrapperStyled = styled.div`
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  position: relative;
  width: 1116px;
  height: 420px;
  position: absolute;
  z-index: 99;
`;

const BannerBackgroundStyled = styled.div<{ banner: string }>`
  background: url(${props => props.banner});
  background-size: cover;
  filter: blur(20px);
  width: 100%;
  height: 420px;
  position: absolute;
  z-index: 10;
  
`;


type AnimeEpisodesProps = {
  data: Media['streamingEpisodes'],
  title: string
}
const AnimeEpisodes = (props: AnimeEpisodesProps) => {
  const isMobile = useSelector(rdxScreenSelector.IsMobile);

  const reEpisodes = new RegExp(/Episode[\s\d\-]+/g);
  const episodes = props.data.map((episode, index) => {
    const title = episode.title;
    const episodeNumber = title.match(reEpisodes);
    const episodeTitle = title.replace(reEpisodes, "");
    const number = episodeNumber ? episodeNumber[0].replace(/[Episode\-\s]*/mg, "").trim() : "";

    return {
      ...episode,
      title: episodeTitle,
      episodeNumber: number,
      url: episode.url,
    }
  });


  return (
    <Container style={{ padding: isMobile ? "20px 24px" : "32px 0" }}>
      <Grid columns={isMobile ? 4 : 12} style={{ rowGap: "40px" }}>
        {episodes.map((item, index) => (
          <Grid.Item span={isMobile ? 4 : 3} key={index}>
            <EpisodeWrapper href={item.url} target={"_blank"}>
              <ImageWrapper>
                <Image alt={`${props.title}, ${item.title}`} src={item.thumbnail} layout="responsive" objectFit='cover' width={318} height={180} style={{ borderRadius: "12px" }} />
                <OverlayImageStyled >
                  <Typography.Text className='text'>{item.episodeNumber}</Typography.Text>
                  <div className='play-icon'>
                    <PlayIcon color={colors.primary} />
                  </div>
                </OverlayImageStyled>
              </ImageWrapper>
              <Typography.Text>
                {item.title}
              </Typography.Text>
            </EpisodeWrapper>
          </Grid.Item>
        ))}
      </Grid>
    </Container>
  )
}

const ButtonGroup = styled.div`
      display: flex;
      flex-direction: row;
      column-gap: 24px;
      align-items: center;
`;

const EpisodeWrapper = styled.a`
  text-decoration: none;
  width: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  color: ${colors.textPrimary};
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
`;

const OverlayImageStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  /* linear-gradient only bottom*/
  background: ${colors.surface + "40"};
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${colors.surface + "90"}; 
    & .text {
      opacity: .6;
    }
    & .play-icon {
      opacity: 1;
    }
  }
  & .text {
    opacity: 1;
    transition: all 0.3s ease-in-out;
    font-size: 40px !important;
    color: ${colors.textPrimary};
    font-weight: "bold";
    bottom: 16px;
    position: absolute;
    left: 12px;
  }
  & .play-icon{
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: ${colors.primary + "60"};
    }
    & svg {
      scale: 1.5;
      path{
        fill: ${colors.textPrimary};
      }
    }
  }
`
