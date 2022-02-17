import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  load: [],
  commonLoad: [],
  buyContact: [],
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
    setBuyContact: (state, {payload}) => {
      state = {...state, buyContact: payload};
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
export const selectBuyContact = store => store.load.buyContact;

export const {setLoad, update, setCommonLoad, setBuyContact} =
  loadSlice.actions;
export default loadSlice.reducer;
