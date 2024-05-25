// reducers/toiletReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const toiletslice = createSlice({
  name: "toilet",
  initialState: {
    toilets: [],
  },
  reducers: {

    Addtoilet: (state, action) => {
      state.toilets = action.payload;
    },
    AddNewtoilet: (state, action) => {
      state.toilets = [action.payload, ...state.toilets];
    },
    updatetoilets: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.toilets.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.toilets[index] = data;
      }
    },
    deletetoilet: (state, action) => {
      let id = action.payload;
      const updatedtoilets = state.toilets.filter(function (toilet) {
        return toilet._id !== id;
      });
      state.toilets = updatedtoilets;
    },

  },
});

export const selecttoilets = (state) => state.toilet.toilets;

export const { Addtoilet, updatetoilets, deletetoilet, AddNewtoilet } = toiletslice.actions; // actions
export default toiletslice.reducer;
