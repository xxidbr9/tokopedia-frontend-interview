import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { AnimeMediaListItem } from "weboo-models";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

type CollectionType = {
  id: string;
  title: string;
  image: string;
  createdAt: number;
  updatedAt: number;
  media: AnimeMediaListItem[];
}

type RdxCollectionState = {
  data: {
    [key: string]: CollectionType,
  },
  error?: string,
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
        state.error = "Collection name already exist";
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
    },

    deleteCollection(state: RdxCollectionState, action: PayloadAction<string>) {
      delete state.data[action.payload];
    },

    updateCollection(state: RdxCollectionState, action: PayloadAction<CollectionType>) {
      const animeCollectionNameExist = Object.values(state.data).some((collection) => collection.title === action.payload.title);
      if (animeCollectionNameExist) {
        state.error = "Collection name already exist";
        return;
      }

      state.data[action.payload.id] = action.payload;
    },

    addToCollection(state: RdxCollectionState, action: PayloadAction<{ collectionId: string, media: AnimeMediaListItem }>) {
      const animeCollectionExist = state.data[action.payload.collectionId].media.some((anime) => anime.id === action.payload.media.id);
      if (animeCollectionExist) {
        state.error = "Anime already exist in collection"
        return state;
      }

      const { collectionId, media } = action.payload;
      state.data[collectionId].media.push(media);
      state.data[collectionId].image = media.coverImage.medium;
      state.data[collectionId].updatedAt = Date.now();

    },

    removeFromCollection(state: RdxCollectionState, action: PayloadAction<{ collectionId: string, mediaId: number }>) {
      const { collectionId, mediaId } = action.payload;
      state.data[collectionId].media = state.data[collectionId].media.filter(media => media.id !== mediaId);
      state.data[collectionId].image = state.data[collectionId].media[0].coverImage.medium;
      state.data[collectionId].updatedAt = Date.now();
    },

    clearError(state: RdxCollectionState) {
      state.error = undefined;
    }
  },
});

export const rdxCollectionAction = collectionSlice.actions;
const rawCollectionReducer = collectionSlice.reducer;

const collectionPersistConfig = {
  storage,
  key: 'collection',
  whitelist: ['collection'],
};

export const collectionReducer = persistReducer(collectionPersistConfig, rawCollectionReducer);


