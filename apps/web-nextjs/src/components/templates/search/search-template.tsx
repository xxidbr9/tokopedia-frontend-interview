import { rdxScreenSelector } from '@/redux-state/features/screen'
import { ROUTE_CONSTANTS } from '@/utils/constants'
import { createSlugLink } from '@/utils/helpers'
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Grid, AnimeCard, Pagination, Typography, Modal } from 'ui'
import { animeSchema } from 'weboo-graphql-schema'
import { AnimeHomeModel, AnimeMediaListItem, Trailer } from 'weboo-models'
import { LinkAs, getTitle, CollectionModal, SheetNewCollection, NewCollectionModal, SheetCollection } from '../home/home-template'
import NextImage from 'next/image';
import { useAmp } from 'next/amp'
import { rdxCollectionAction, rdxCollectionSelector } from '@/redux-state/features/collection'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import YouTube from 'react-youtube'


// TODO: move this to template
const youtubeOpts = {
  height: '480',
  width: '720',
  playerVars: {
    autoplay: 1,
  }
}


type SearchTemplate = {
  page?: number
}

const SearchTemplate = ({ page, ...props }: SearchTemplate) => {
  const isAmp = useAmp()
  const [isModalYoutubeOpen, setIsModalYoutubeOpen] = React.useState(false)
  const [selectedYoutubeVideo, setSelectedYoutubeVideo] = React.useState('')

  const dispatch = useDispatch()

  const isMobile = useSelector(rdxScreenSelector.IsMobile)
  const { data, loading, error, fetchMore } = useQuery<AnimeHomeModel, { page: number, perPage: number, randomPage?: number }>(animeSchema.ANIME_LIST_SCHEMA, {
    variables: {
      page,
      perPage: 36,
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
    // router.push(`${ROUTE_CONSTANTS.SEARCH}/?page=${page}`)
    fetchMore({
      variables: {
        page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    })
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

      <section style={{ ...(isMobile ? { padding: "32px 0" } : { padding: "52px 0" }) }}>
        <Container isMobile={isMobile}>
          <Typography.Title as='h4' weight='bold'>
            Semua anime
          </Typography.Title>
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
            defaultPage={page}
            onChange={handlePageChange}
            position={isMobile ? "center" : "right"}
            total={data?.list.pageInfo.total}
            pageSize={36}
            prefixHref={`${ROUTE_CONSTANTS.SEARCH}/?`}
          />
        </Container>
      </section>

    </React.Fragment >
  );
}

export default SearchTemplate