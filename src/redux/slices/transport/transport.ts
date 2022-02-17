import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  transport: [],
  commonTransport: [],
  seenTransport: [],
};

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    setTransport: (state, {payload}) => {
      state = {...state, transport: payload};
      //asyncstorage save token
      return state;
    },

    setCommonTransport: (state, {payload}) => {
      state = {...state, commonTransport: payload};
      return state;
    },

    setSeenTransport: (state, {payload}) => {
      state = {...state, seenTransport: payload};
      return state;
    },

    update: (state, {payload}) => {
      state = {...state, ...payload};
      return state;
    },
  },
});

export const selectTransport = store => store.transport.transport;
export const selectCommonTransport = store => store.transport.commonTransport;
export const selectSeenTransport = store => store.transport.seenTransport;

export const {setTransport, update, setCommonTransport, setSeenTransport} =
  transportSlice.actions;
export default transportSlice.reducer;
