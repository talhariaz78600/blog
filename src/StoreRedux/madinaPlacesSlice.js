// reducers/madinaplaceReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const madinaplaceslice = createSlice({
  name: "madinaplace",
  initialState: {
    madinaplaces: [],
  },
  reducers: {

    Addmadinaplace: (state, action) => {
      state.madinaplaces = action.payload;
    },
    AddNewmadinaplace: (state, action) => {
      state.madinaplaces = [action.payload, ...state.madinaplaces];
    },
    updatemadinaplaces: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.madinaplaces.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.madinaplaces[index] = data;
      }
    },
    deletemadinaplace: (state, action) => {
      let id = action.payload;
      const updatedmadinaplaces = state.madinaplaces.filter(function (madinaplace) {
        return madinaplace._id !== id;
      });
      state.madinaplaces = updatedmadinaplaces;
    },

  },
});

export const selectmadinaplaces = (state) => state.madinaplace.madinaplaces;

export const { Addmadinaplace, updatemadinaplaces, deletemadinaplace, AddNewmadinaplace } = madinaplaceslice.actions; // actions
export default madinaplaceslice.reducer;
