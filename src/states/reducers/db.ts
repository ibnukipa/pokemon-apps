import {createSlice} from '@reduxjs/toolkit';
import {forIn, isEmpty} from 'lodash';

// TODO move to local database instead
const initialDbState = {
  pokemons: {},
  pokemonSpecies: {},
  evolutionChains: {},
  pokemonTypes: {},
};

export const dbSlice = createSlice({
  name: '_db',
  initialState: initialDbState,
  reducers: {
    insertModel: (state: any, action) => {
      const {model, id, data} = action.payload;
      if (model && id && !isEmpty(data)) {
        const currentData = state[model][id];
        if (currentData) {
          state[model][id] = {
            ...currentData,
            ...data,
          };
        } else {
          state[model][id] = data;
        }
      }
    },
    deleteModel: (state: any, action) => {
      const {model, id} = action.payload;
      if (model && id) {
        delete state[model][id];
      }
    },
    insertCollection: (state: any, action) => {
      const {model, data} = action.payload;
      if (model && !isEmpty(data)) {
        forIn(data, (value, id) => {
          const currentData = state[model][id];
          if (currentData) {
            state[model][id] = {
              ...currentData,
              ...value,
            };
          } else {
            state[model][id] = value;
          }
        });
      }
    },
    clearCollection: (state: any, action) => {
      const {model} = action.payload;
      if (model) {
        state[model] = {};
      }
    },
  },
});

export const {insertModel, deleteModel, insertCollection, clearCollection} =
  dbSlice.actions;

export const getByIdSelector = (
  state: any,
  {model, id}: {model: string; id: string | number},
) => state.db[model]?.[id] || {};

export const getCollectionSelector = (state: any, {model}: {model: string}) => {
  return state.db[model] || [];
};

export default dbSlice.reducer;
