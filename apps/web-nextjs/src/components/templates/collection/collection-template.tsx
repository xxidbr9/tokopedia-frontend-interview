import { rdxCollectionAction, rdxCollectionSelector } from "@/redux-state/features/collection"
import { rdxScreenSelector } from "@/redux-state/features/screen"
import { createSlugLink } from "@/utils/helpers"
import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import YouTube from "react-youtube"
import { Modal, Container, Typography, Grid, AnimeCard, Button, CloseSmallIcon, Input, EditIcon } from "ui"
import { Trailer, AnimeMediaListItem, CollectionType } from "weboo-models"
import { LinkAs, getTitle, ModalContent, ModalHeader, ModalWrapper, CustomSheet } from "../home/home-template"
import NextImage from 'next/image';
import Title from "ui/components/atoms/typography/typography-title"
import colors from "ui/theme/colors"
import Sheet, { SheetRef } from 'react-modal-sheet';
import styled from "@emotion/styled"
import { Empty } from "@/components/empty"


const youtubeOpts = {
  height: '480',
  width: '720',
  playerVars: {
    autoplay: 1,
  }
}

type CollectionTemplateProps = {

}



const CollectionTemplate = (props: CollectionTemplateProps) => {

  const [isModalYoutubeOpen, setIsModalYoutubeOpen] = React.useState(false)
  const [selectedYoutubeVideo, setSelectedYoutubeVideo] = React.useState('')

  const dispatch = useDispatch()

  const isMobile = useSelector(rdxScreenSelector.IsMobile)
  const collections = useSelector(rdxCollectionSelector.getAllCollection)

  const handleTrailerClick = (trailer: Trailer) => {
    setSelectedYoutubeVideo(trailer.id)
    setIsModalYoutubeOpen(true)
  }

  const handleTrailerModalClose = () => {
    setSelectedYoutubeVideo("")
    setIsModalYoutubeOpen(false)
  }



  // collection start here 
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = React.useState(false)
  const [selectedAnime, setSelectedAnime] = React.useState<AnimeMediaListItem | null>(null)
  const [selectedCollection, setSelectedCollection] = React.useState<{ id?: string, name?: string } | null>({})

  const handleDeleteClick = (anime: AnimeMediaListItem, collectionInfo: { id?: string, name?: string }) => {
    setIsModalConfirmDeleteOpen(true);
    setSelectedAnime(anime);
    setSelectedCollection(collectionInfo);
  }

  const handleModalDeleteConfirmClose = () => {
    setIsModalConfirmDeleteOpen(false);
  }

  const handleModalDeleteConfirm = () => {
    if (selectedAnime && selectedCollection) {
      dispatch(rdxCollectionAction.removeFromCollection({ collectionId: selectedCollection.id, mediaId: selectedAnime.id }))
      setIsModalConfirmDeleteOpen(false);
    }
  }

  // handle edit collection
  const [isModalEditCollectionOpen, setIsModalEditCollectionOpen] = React.useState(false)
  const [selectedCollectionEdit, setSelectedCollectionEdit] = React.useState<CollectionType | null>(null)

  const handleCollectionEditClick = (collection: CollectionType) => {
    setIsModalEditCollectionOpen(true);
    setSelectedCollectionEdit(collection);
  }

  const handleModalEditCollectionClose = () => {
    setIsModalEditCollectionOpen(false);
    setSelectedCollectionEdit(null);
  }

  const handleSaveCollectionChange = (name: string) => {
    if (selectedCollectionEdit) {
      dispatch(rdxCollectionAction.updateCollection({ ...selectedCollectionEdit, title: name }))
      setIsModalEditCollectionOpen(false);
      setSelectedCollectionEdit(null);
    }
  }


  // confirm delete collection in edit collection modal
  const [isModalConfirmDeleteCollectionOpen, setIsModalConfirmDeleteCollectionOpen] = React.useState(false)

  const handleDeleteCollectionClick = () => {
    setIsModalEditCollectionOpen(false)
    setIsModalConfirmDeleteCollectionOpen(true);
  }

  const handleModalDeleteCollectionConfirmClose = () => {
    setIsModalConfirmDeleteCollectionOpen(false);
    setIsModalEditCollectionOpen(true)
  }

  const handleModalDeleteCollectionConfirm = () => {
    if (selectedCollectionEdit) {
      dispatch(rdxCollectionAction.deleteCollection(selectedCollectionEdit.id))
      setIsModalConfirmDeleteCollectionOpen(false);
    }
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


  const styleSection = { ...(isMobile ? { padding: "32px 0" } : { padding: "52px 0 0" }) }
  const selectedDeleteAnimeTitle = selectedAnime?.title?.userPreferred || selectedAnime?.title?.english || selectedAnime?.title?.romaji || selectedAnime?.title?.native || ""

  return (
    <React.Fragment>
      <Modal isOpen={isModalYoutubeOpen} onRequestClose={handleTrailerModalClose}>
        <YouTube videoId={selectedYoutubeVideo} opts={youtubeOpts} />
      </Modal>

      {/* Split this after */}
      {!isMobile && (
        <React.Fragment>
          <Modal isOpen={isModalConfirmDeleteOpen} onRequestClose={handleModalDeleteConfirmClose}>
            <DeleteConfirmModal
              data={{ animeTitle: selectedDeleteAnimeTitle, collectionName: selectedCollection?.name }}
              onClose={handleModalDeleteConfirmClose}
              onConfirm={handleModalDeleteConfirm}
            />
          </Modal>
          <Modal isOpen={isModalEditCollectionOpen} onRequestClose={handleModalEditCollectionClose}>
            <EditModal
              onDeleteClick={handleDeleteCollectionClick}
              collectionName={selectedCollectionEdit?.title}
              onClose={handleModalEditCollectionClose}
              onConfirm={handleSaveCollectionChange}
            />
          </Modal>
          <Modal isOpen={isModalConfirmDeleteCollectionOpen} onRequestClose={handleModalDeleteCollectionConfirmClose}>
            <DeleteCollectionConfirmModal
              collectionName={selectedCollectionEdit?.title}
              onClose={handleModalDeleteCollectionConfirmClose}
              onConfirm={handleModalDeleteCollectionConfirm}
            />
          </Modal>

        </React.Fragment>
      )}

      {isMobile && (
        <React.Fragment>
          <SheetDeleteConfirm
            data={{ animeTitle: selectedDeleteAnimeTitle, collectionName: selectedCollection?.name }}
            onClose={handleModalDeleteConfirmClose}
            onConfirm={handleModalDeleteConfirm}
            isOpen={isModalConfirmDeleteOpen}
          />

          <SheetEditCollection
            collectionName={selectedCollectionEdit?.title}
            onClose={handleModalEditCollectionClose}
            onConfirm={handleSaveCollectionChange}
            onDeleteClick={handleDeleteCollectionClick}
            isOpen={isModalEditCollectionOpen}
          />

          <SheetDeleteCollectionConfirm
            collectionName={selectedCollectionEdit?.title}
            onClose={handleModalDeleteCollectionConfirmClose}
            onConfirm={handleModalDeleteCollectionConfirm}
            isOpen={isModalConfirmDeleteCollectionOpen}
          />

        </React.Fragment>
      )}
      {/* Split after that */}
      {/* Collection is empty */}
      {!collections.length && (
        <Empty text="Belum ada anime dikoleksi !!!" />
      )}

      {collections.map((collection, index) => (
        <section key={collection.id} style={{ ...styleSection, ...(!!index && { padding: "20px 0" }) }}>
          <Container isMobile={isMobile}>
            <CollectionHeaderStyled isMobile={isMobile}>
              <Typography.Title as='h4' weight='bold'>
                {collection.title}
              </Typography.Title>
              {isMobile ? (
                <Button
                  variant="link"
                  onClick={() => handleCollectionEditClick(collection)}
                  style={{ color: colors.primary }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  isIcon
                  isOpacity
                  onClick={() => handleCollectionEditClick(collection)}
                >
                  <EditIcon />
                </Button>
              )}
            </CollectionHeaderStyled>
            <Grid style={{ ...(index > collections.length - 1 && { paddingBottom: "4rem" }) }} columns={isMobile ? 4 : 12}>
              {collection.media.map((anime, index: number) => (
                <Grid.Item span={2} key={anime.id}>
                  <AnimeCard
                    linkAs={LinkAs}
                    href={createSlugLink(getTitle(anime.title), anime.id)}
                    isMobile={isMobile}
                    imageAs={NextImage}
                    layout="responsive"
                    width={204}
                    height={280}
                    isLast={((index + 1) % 6) === 0}
                    data={anime}
                    onBookmarkClick={(deletedAnime) => handleDeleteClick(deletedAnime, { id: collection.id, name: collection.title })}
                    onTrailerClick={handleTrailerClick}
                    isDelete
                  />
                </Grid.Item>
              ))}
            </Grid>

          </Container>
        </section>
      ))}

    </React.Fragment >
  );
}

export default CollectionTemplate


type DeleteConfirmModalProps = {
  onConfirm: () => void
  onClose: () => void
  data: {
    animeTitle: string
    collectionName: string
  }
  isLastItem?: boolean
}

const DeleteConfirmModal = (props: DeleteConfirmModalProps) => {
  const { data } = props
  return (
    <ModalWrapper>
      <ModalHeader>
        <button aria-label="Close button" onClick={props.onClose}>
          <CloseSmallIcon />
        </button>
        <Title as='h6' style={{ textAlign: "center", margin: 0, }}>
          Hapus dari koleksi?
        </Title>
        <div style={{ width: 24, height: 24 }} />
      </ModalHeader>
      <ModalContent style={{ rowGap: "40px" }}>
        <Typography.Text >
          Apakah kamu yakin ingin menghapus <span style={{ color: colors.primary }}>{data.animeTitle}</span> dari koleksi <span style={{ color: colors.primary }}>{data.collectionName}</span> ?
        </Typography.Text>
        <Button variant="danger" onClick={props.onConfirm}>
          Hapus
        </Button>
      </ModalContent>
    </ModalWrapper>
  )
}




const CollectionHeaderStyled = styled.div<{ isMobile?: boolean }>`
  display: flex;
  justify-content: ${props => props.isMobile ? "space-between" : "flex-start"};
  align-items: center;
  column-gap: 24px;
  `;


type EditModalProps = {
  onConfirm: (collectionName: string) => void
  onClose: () => void
  onDeleteClick: () => void
  collectionName: string
  isLastItem?: boolean
}

const EditModal = (props: EditModalProps) => {
  const [name, setName] = React.useState(props.collectionName)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  return (
    <ModalWrapper>
      <ModalHeader>
        <button aria-label="Close button" onClick={props.onClose}>
          <CloseSmallIcon />
        </button>
        <Title as='h6' style={{ textAlign: "center", margin: 0, }}>
          Edit koleksi?
        </Title>
        <div style={{ width: 24, height: 24 }} />
      </ModalHeader>
      <ModalContent style={{ rowGap: "40px" }}>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="Nama koleksi"
        />
        <ButtonGroup>
          <Button onClick={props.onDeleteClick} variant="link" style={{ color: colors.textSecondary }}>
            Hapus
          </Button>
          <Button disabled={!name} variant="primary" onClick={() => props.onConfirm(name)}>
            Simpan
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalWrapper>
  )
}

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  column-gap: 24px;
  `;


type DeleteCollectionConfirmModalProps = {
  onConfirm: () => void
  onClose: () => void
  collectionName: string
}

const DeleteCollectionConfirmModal = (props: DeleteCollectionConfirmModalProps) => {
  return (
    <ModalWrapper>
      <ModalHeader>
        <button aria-label="Close button" onClick={props.onClose}>
          <CloseSmallIcon />
        </button>
        <Title as='h6' style={{ textAlign: "center", margin: 0, }}>
          Hapus dari koleksi?
        </Title>
        <div style={{ width: 24, height: 24 }} />
      </ModalHeader>
      <ModalContent style={{ rowGap: "40px" }}>
        <Typography.Text >
          Apakah kamu yakin ingin menghapus <span style={{ color: colors.primary }}>{props.collectionName}</span> ?
        </Typography.Text>
        <Button variant="danger" onClick={props.onConfirm}>
          Hapus
        </Button>
      </ModalContent>
    </ModalWrapper>
  )
}

const SheetDeleteConfirm = (props: DeleteConfirmModalProps & { isOpen: boolean }) => {
  const { data } = props;
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
              Hapus dari koleksi?
            </Typography.Title>
            <div style={{ width: 24, height: 24 }} />
          </ModalHeader>
        </Sheet.Header>
        <Sheet.Content disableDrag style={{ paddingBottom: ref.current?.y, padding: "0 16px 24px" }}>
          <ModalContent style={{ rowGap: "40px" }}>
            <Typography.Text >
              Apakah kamu yakin ingin menghapus <span style={{ color: colors.primary }}>{data.animeTitle}</span> dari koleksi <span style={{ color: colors.primary }}>{data.collectionName}</span> ?
            </Typography.Text>
            <Button variant="danger" onClick={props.onConfirm}>
              Hapus
            </Button>
          </ModalContent>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  )
}

const SheetEditCollection = (props: EditModalProps & { isOpen: boolean }) => {
  const [name, setName] = React.useState(props.collectionName)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
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
              Edit koleksi?
            </Typography.Title>
            <div style={{ width: 24, height: 24 }} />
          </ModalHeader>
        </Sheet.Header>
        <Sheet.Content disableDrag style={{ paddingBottom: ref.current?.y, padding: "0 16px 24px" }}>
          <ModalContent style={{ rowGap: "40px" }}>
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder="Nama koleksi"
            />
            <ButtonGroup>
              <Button onClick={props.onDeleteClick} variant="link" style={{ color: colors.textSecondary }}>
                Hapus
              </Button>
              <Button disabled={!name} variant="primary" onClick={() => props.onConfirm(name)}>
                Simpan
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  )
}


const SheetDeleteCollectionConfirm = (props: DeleteCollectionConfirmModalProps & { isOpen: boolean }) => {
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
              Hapus dari koleksi?
            </Typography.Title>
            <div style={{ width: 24, height: 24 }} />
          </ModalHeader>
        </Sheet.Header>
        <Sheet.Content disableDrag style={{ paddingBottom: ref.current?.y, padding: "0 16px 24px" }}>
          <ModalContent style={{ rowGap: "40px" }}>
            <Typography.Text >
              Apakah kamu yakin ingin menghapus <span style={{ color: colors.primary }}>{props.collectionName}</span> ?
            </Typography.Text>
            <Button variant="danger" onClick={props.onConfirm}>
              Hapus
            </Button>
          </ModalContent>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  )
}
