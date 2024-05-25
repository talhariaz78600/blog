// reducers/miqatReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const miqatslice = createSlice({
  name: "miqat",
  initialState: {
    miqats: [],
  },
  reducers: {

    Addmiqat: (state, action) => {
      state.miqats = action.payload;
    },
    AddNewmiqat: (state, action) => {
      state.miqats = [action.payload, ...state.miqats];
    },
    updatemiqats: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.miqats.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.miqats[index] = data;
      }
    },
    deletemiqat: (state, action) => {
      let id = action.payload;
      const updatedmiqats = state.miqats.filter(function (miqat) {
        return miqat._id !== id;
      });
      state.miqats = updatedmiqats;
    },

  },
});

export const selectmiqats = (state) => state.miqat.miqats;

export const { Addmiqat, updatemiqats, deletemiqat, AddNewmiqat } = miqatslice.actions; // actions
export default miqatslice.reducer;
