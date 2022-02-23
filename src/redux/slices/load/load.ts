import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  load: [],
  commonLoad: [],
  seenLoad: [],
};

const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    setLoad: (state, {payload}) => {
      state = {...state, load: payload};
      //asyncstorage save token
      return state;
    },

    setCommonLoad: (state, {payload}) => {
      state = {...state, commonLoad: payload};
      return state;
    },

    setSeenLoad: (state, {payload}) => {
      state = {...state, seenLoad: payload};
      return state;
    },

    update: (state, {payload}) => {
      state = {...state, ...payload};
      return state;
    },
  },
});

export const selectLoad = store => store.load.load;
export const selectCommonLoad = store => store.load.commonLoad;
export const selectSeenLoad = store => store.load.seenLoad;

export const {setLoad, update, setCommonLoad, setSeenLoad} = loadSlice.actions;
export default loadSlice.reducer;
