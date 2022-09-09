import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { AnimeMediaListItem, CollectionType, Media } from "weboo-models";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'



type RdxCollectionState = {
  data: {
    [key: string]: CollectionType,
  },
  error?: string,
  successMessage?: string,
}

const initialState: RdxCollectionState = {
  data: {},
}
const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollection(state: RdxCollectionState, action: PayloadAction<CollectionType>) {
      state.data[action.payload.id] = action.payload;
    },

    createCollection(state: RdxCollectionState, action: PayloadAction<Omit<CollectionType, "id">>) {
      const animeCollectionNameExist = Object.values(state.data).some((collection) => collection.title === action.payload.title);
      if (animeCollectionNameExist) {
        state.error = `Koleksi dengan name ${action.payload.title} sudah ada !!!`;
        return;
      }

      const id = nanoid();
      const date = Date.now()
      state.data[id] = {
        ...action.payload,
        id,
        image: action.payload.media[0].coverImage.medium,
        createdAt: date,
        updatedAt: date,
      }
      const media = action.payload.media[0];
      const title = media.title.english || media.title.romaji || media.title.native;
      state.successMessage = `${title} berhasil ditambahkan ke ${action.payload.title}`;
    },

    deleteCollection(state: RdxCollectionState, action: PayloadAction<string>) {
      delete state.data[action.payload];
      state.successMessage = "Koleksi dihapus";
    },

    updateCollection(state: RdxCollectionState, action: PayloadAction<CollectionType>) {
      const animeCollectionNameExist = Object.values(state.data).some((collection) => collection.title === action.payload.title);
      if (animeCollectionNameExist) {
        state.error = "Koleksi dengan nama tersebut sudah ada";
        return;
      }

      state.data[action.payload.id] = action.payload;
      state.successMessage = "Koleksi anime berhasil diupdate";
    },

    addToCollection(state: RdxCollectionState, action: PayloadAction<{ collectionId: string, media: AnimeMediaListItem | Media }>) {
      const { collectionId, media } = action.payload;
      const title = media.title.english || media.title.romaji || media.title.native

      const animeCollectionExist = state.data[action.payload.collectionId].media.some((anime) => anime.id === action.payload.media.id);
      if (animeCollectionExist) {
        state.error = `${title} sudah ada di ${state.data[collectionId].title}`;
        return state;
      }

      state.data[collectionId].media.unshift(media);
      state.data[collectionId].image = media.coverImage.medium;
      state.data[collectionId].updatedAt = Date.now();
      state.successMessage = `${title} berhasil ditambahkan ke ${state.data[collectionId].title}`;
    },

    removeFromCollection(state: RdxCollectionState, action: PayloadAction<{ collectionId: string, mediaId: number }>) {
      const { collectionId, mediaId } = action.payload;
      state.data[collectionId].media = state.data[collectionId].media.filter(media => media.id !== mediaId);

      if (state.data[collectionId].media.length === 0) {
        delete state.data[collectionId];
        state.successMessage = "Kolesi anime berhasil dihapus";
        return;
      }

      state.data[collectionId].image = state.data[collectionId].media[0].coverImage.medium;
      state.successMessage = "Anime berhasil dihapus dari koleksi";
    },

    clearError(state: RdxCollectionState) {
      state.error = undefined;
    },

    clearSuccessMessage(state: RdxCollectionState) {
      state.successMessage = undefined;
    }
  },
});

export const rdxCollectionAction = collectionSlice.actions;
const rawCollectionReducer = collectionSlice.reducer;

const collectionPersistConfig = {
  storage,
  key: 'collection',
};

export const collectionReducer = persistReducer(collectionPersistConfig, rawCollectionReducer);


