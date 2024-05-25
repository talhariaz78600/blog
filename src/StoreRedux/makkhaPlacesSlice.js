// reducers/makkkhaplaceReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const makkkhaplaceslice = createSlice({
  name: "makkkhaplace",
  initialState: {
    makkkhaplaces: [],
  },
  reducers: {

    Addmakkkhaplace: (state, action) => {
      state.makkkhaplaces = action.payload;
    },
    AddNewmakkkhaplace: (state, action) => {
      state.makkkhaplaces = [action.payload, ...state.makkkhaplaces];
    },
    updatemakkkhaplaces: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.makkkhaplaces.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.makkkhaplaces[index] = data;
      }
    },
    deletemakkkhaplace: (state, action) => {
      let id = action.payload;
      const updatedmakkkhaplaces = state.makkkhaplaces.filter(function (makkkhaplace) {
        return makkkhaplace._id !== id;
      });
      state.makkkhaplaces = updatedmakkkhaplaces;
    },

  },
});

export const selectmakkkhaplaces = (state) => state.makkkhaplace.makkkhaplaces;

export const { Addmakkkhaplace, updatemakkkhaplaces, deletemakkkhaplace, AddNewmakkkhaplace } = makkkhaplaceslice.actions; // actions
export default makkkhaplaceslice.reducer;
