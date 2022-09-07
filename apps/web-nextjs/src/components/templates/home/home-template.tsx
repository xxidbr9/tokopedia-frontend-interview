import { rdxScreenSelector } from "@/redux-state/features/screen"
import { ROUTE_CONSTANTS } from "@/utils/constants"
import { createSlugLink } from "@/utils/helpers"
import { useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useAmp } from "next/amp"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import YouTube from "react-youtube"
import { Typography, Modal, Container, Grid, AnimeCard, Pagination, useTheme, Button, PlayIcon, PlusIcon, CloseSmallIcon, Input } from "ui"
import helpers from "ui/helpers"
import colors from "ui/theme/colors"
import { animeSchema } from "weboo-graphql-schema"
import { AnimeHomeModel, Trailer, AnimeTrendModel, AnimeMediaListItem } from "weboo-models"
import NextImage from 'next/image';
import React, { useEffect } from "react"
import { rdxCollectionAction, rdxCollectionSelector } from "@/redux-state/features/collection"
import { toast } from 'react-toastify'
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useRef } from "react"


// TODO: move this to template
const youtubeOpts = {
  height: '480',
  width: '720',
  playerVars: {
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



  const dispatch = useDispatch()

  const isMobile = useSelector(rdxScreenSelector.IsMobile)


  const router = useRouter();

  const { data, loading, error } = useQuery<AnimeHomeModel, { page: number, perPage: number, randomPage?: number }>(animeSchema.ANIME_HOMEPAGE_SCHEMA, {
    variables: {
      page,
      perPage: 36,
      randomPage: randomTrendPage
    }
  })



  const handleTrailerClick = (trailer: Trailer) => {
    setSelectedYoutubeVideo(trailer.id)
    setIsModalYoutubeOpen(true)
  }

  const handleTrailerModalClose = () => {
    setSelectedYoutubeVideo("")
    setIsModalYoutubeOpen(false)
  }

  const handlePageChange = (page: number) => {
    router.push(`${ROUTE_CONSTANTS.SEARCH}/?page=${page}`)
  }


  // collection start here 
  const [isModalCollectionOpen, setIsModalCollectionOpen] = React.useState(false)
  const [selectedAnime, setSelectedAnime] = React.useState<AnimeMediaListItem | null>(null)
  const [isModalNewCollectionOpen, setIsModalNewCollectionOpen] = React.useState(false)

  const handleCollectionClick = (anime: AnimeMediaListItem) => {
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

  const errorAddToCollection = useSelector(rdxCollectionSelector.getErrorMessage)
  useEffect(() => {
    if (!!errorAddToCollection) {
      toast.error(errorAddToCollection, { onClose: () => dispatch(rdxCollectionAction.clearError()) })
    }
    () => {
      dispatch(rdxCollectionAction.clearError())
    }
  }, [errorAddToCollection, dispatch])

  const successAddToCollection = useSelector(rdxCollectionSelector.getSuccessMessage)
  useEffect(() => {
    if (!!successAddToCollection) {
      toast.success(successAddToCollection, { onClose: () => dispatch(rdxCollectionAction.clearSuccessMessage()) })
    }
    () => {
      dispatch(rdxCollectionAction.clearSuccessMessage())
    }
  }, [successAddToCollection, dispatch])
  // collection end here


  if (error) {
    return <div>Oops Error</div>
  }

  if (loading) {
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

      {/* Split this after */}
      {!isMobile && (
        <React.Fragment>
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
        </React.Fragment>
      )}
      {/* Split after that */}


      <Banner isMobile={isMobile} data={data?.trend.mediaTrends[0] as AnimeTrendModel} onBookmarkClick={handleCollectionClick} />

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
                  onBookmarkClick={handleCollectionClick}
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



// bottom sheet
const CustomSheet = styled(Sheet)`
.react-modal-sheet-container{
  background-color: ${colors.surface} !important;
}
.react-modal-sheet-drag-indicator{
  background-color: ${colors.onSurface} !important;
}
`;

type SheetNewCollectionProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collectionName: string) => void;
}

const SheetNewCollection = (props: SheetNewCollectionProps) => {
  const [name, setName] = React.useState('')
  const containerStyle = { padding: "12px 16px", width: "auto" }
  const ref = useRef<SheetRef>()

  return (
    <CustomSheet
      isOpen={props.isOpen}
      snapPoints={[250, 0]}
      onClose={props.onClose}
      ref={ref}
    >
      <Sheet.Container>
        <Sheet.Header style={containerStyle}>
          <ModalHeader>
            <button aria-label="Close button" onClick={props.onClose}>
              <CloseSmallIcon />
            </button>
            <Typography.Title as="h6" style={{ textAlign: "center", margin: 0 }}>
              Buat koleksi baru
            </Typography.Title>
            <div style={{ width: 24, height: 24 }} />
          </ModalHeader>
        </Sheet.Header>
        <Sheet.Content disableDrag style={{ paddingBottom: ref.current?.y, padding: "0 16px 24px" }}>
          <ModalContent style={{ rowGap: "40px" }}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama koleksi"
            />
            <Button disabled={!name} onClick={() => props.onSave(name)}>
              Simpan
            </Button>
          </ModalContent>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  )
}

type SheetCollectionProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewCollectionClick: () => void
  onCollectionClick: (id: string) => void
}

const SheetCollection = (props: SheetCollectionProps) => {
  const collection = useSelector(rdxCollectionSelector.getListOFCollectionWithOutMedia)
  const handleNewClick = () => {
    props.onNewCollectionClick()
  }
  const containerStyle = { padding: "12px 16px", width: "auto" }
  const ref = useRef<SheetRef>()

  return (
    <CustomSheet
      isOpen={props.isOpen}
      snapPoints={[500, 0]}
      onClose={props.onClose}
      ref={ref}
    >
      <Sheet.Container>
        <Sheet.Header style={containerStyle}>
          <ModalHeader>
            <button aria-label="Close button" onClick={props.onClose}>
              <CloseSmallIcon />
            </button>
            <Typography.Title as="h6" style={{ textAlign: "center", margin: 0 }}>
              Tambah ke koleksi
            </Typography.Title>
            <div style={{ width: 24, height: 24 }} />
          </ModalHeader>
        </Sheet.Header>
        <Sheet.Content disableDrag style={{ paddingBottom: ref.current?.y, padding: "0 16px 24px" }}>
          <ModalContent>
            <CollectionListItem isNew onClick={handleNewClick} />
            {collection.map((item) => (
              <CollectionListItem
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                onClick={props.onCollectionClick}
              />
            ))}
          </ModalContent>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  );
}


type NewCollectionModalProps = { onBack: () => void, onSave: (name: string) => void }
const NewCollectionModal = (props: NewCollectionModalProps) => {
  const [name, setName] = React.useState('')

  return (
    <ModalWrapper>
      <ModalHeader>
        <button aria-label="Close button" onClick={props.onBack}>
          <CloseSmallIcon />
        </button>
        <Title as='h6' style={{ textAlign: "center", margin: 0, }}>
          Buat koleksi baru
        </Title>
        <div style={{ width: 24, height: 24 }} />
      </ModalHeader>
      <ModalContent style={{ rowGap: "40px" }}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama koleksi"
        />
        <Button disabled={!name} onClick={() => props.onSave(name)}>
          Simpan
        </Button>
      </ModalContent>
    </ModalWrapper>
  )
}



type CollectionModalProps = {
  onClose: () => void
  onNewCollectionClick: () => void
  onCollectionClick: (id: string) => void
}

const ModalWrapper = styled.div`
  width: 552px;
  padding: 12px 16px;
  background-color: ${colors.surface};
  border-radius: 20px;
`;
const ModalContent = styled.div`
  margin:20px 0 24px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;


type CollectionListItemProps = {
  id?: string,
  title?: string,
  image?: string,
  isNew?: boolean,
  onClick?: (id?: string) => void
}

const NewCollectionStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 12px;
  border: 1px solid ${colors.textPrimary};
`;

const CollectionListWrapperStyled = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  column-gap: 28px;
  padding: 4px;
  outline-color: ${colors.textPrimary};
  outline-width: 0.8px;
`;



const CollectionListItem = (props: CollectionListItemProps) => {

  const handleClick = () => {
    props.onClick(props.id)
  }

  if (props.isNew) {
    return (
      <CollectionListWrapperStyled onClick={handleClick} aria-label="Add New Collection">
        <NewCollectionStyled>
          <PlusIcon />
        </NewCollectionStyled>
        <Typography.Text style={{ color: colors.textPrimary }}>
          Buat koleksi baru
        </Typography.Text>
      </CollectionListWrapperStyled>
    )
  }


  return (
    <CollectionListWrapperStyled onClick={handleClick} aria-label="Collection">
      <NextImage
        src={props.image}
        width={72}
        height={72}
        layout="fixed"
        objectFit="cover"
        objectPosition="center"
        alt={props.title}
        style={{ borderRadius: "12px" }}
      />
      <Typography.Text style={{ color: colors.textPrimary }}>
        {props.title}
      </Typography.Text>
    </CollectionListWrapperStyled>
  )
}

const CollectionModal = (props: CollectionModalProps) => {

  const collection = useSelector(rdxCollectionSelector.getListOFCollectionWithOutMedia)
  const handleNewClick = () => {
    props.onNewCollectionClick()
  }

  return (
    <ModalWrapper>
      <ModalHeader>
        <button aria-label="Close button" onClick={props.onClose}>
          <CloseSmallIcon />
        </button>
        <Typography.Title as="h6" style={{ textAlign: "center", margin: 0, }}>
          Tambah ke koleksi
        </Typography.Title>
        <div style={{ width: 24, height: 24 }} />
      </ModalHeader>
      <ModalContent>
        <CollectionListItem isNew onClick={handleNewClick} />
        {collection.map((item) => (
          <CollectionListItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            onClick={props.onCollectionClick}
          />
        ))}
      </ModalContent>
    </ModalWrapper>
  )
}


const getTitle = (rawTitle: AnimeMediaListItem['title']) => {
  return rawTitle?.english || rawTitle?.romaji || rawTitle?.native || ''
}

const LinkAs = ({ href, children, ...props }) => <Link href={href} passHref><a {...props}>{children}</a></Link>


// TODO : split this component
type BannerProps = {
  data: AnimeTrendModel
  onBookmarkClick: (anime: AnimeMediaListItem) => void
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

  const handleCollectionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onBookmarkClick(data.media)
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
              <Button aria-label='bookmark-button' data-testid="bookmark-btn" isIcon isOpacity onClick={handleCollectionClick}>
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