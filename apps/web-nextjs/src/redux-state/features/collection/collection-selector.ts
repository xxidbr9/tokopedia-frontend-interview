import { RootState } from "@/redux-state";
import { createSelector } from "@reduxjs/toolkit";

export const collectionState = (state: RootState) => state.collectionReducer;

export const getCollectionById = createSelector([collectionState], (collection) => (collectionId: string) => {
  return collection.data[collectionId];
});

export const getAllCollection = createSelector([collectionState], (collection) => {
  return Object.values(collection.data).sort((a, b) => b.updatedAt - a.updatedAt);
});

export const isAnimeInCollection = createSelector([getAllCollection], (collection) => (animeId: number) => {
  return collection.some((collection) => collection.media.some((media) => media.id === animeId));
});

// for find the collection that contains the anime
export const getCollectionByAnimeId = createSelector([getAllCollection], (collection) => (animeId: number) => {
  return collection.find((collection) => collection.media.some((anime) => anime.id === animeId));
});

export const getListOFCollectionWithOutMedia = createSelector([getAllCollection], (collection) => {
  return collection.map(({ id, title, image }) => ({ id, title, image }));
});


export const getErrorMessage = createSelector([collectionState], (collection) => collection.error);
export const getSuccessMessage = createSelector([collectionState], (collection) => collection.successMessage);