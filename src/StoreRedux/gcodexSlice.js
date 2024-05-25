import { createSlice } from "@reduxjs/toolkit";
export const gcodexSlice = createSlice({
  name: "gcodex",
  initialState: {
    gcodexs: [],
  },
  reducers: {

    Addgcodex: (state, action) => {
      state.gcodexs = action.payload;
    },
    AddNewgcodex: (state, action) => {
      state.gcodexs = [action.payload, ...state.gcodexs];
    },
    updategcodexs: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.gcodexs.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.gcodexs[index] = data;
      }
    },
    deletegcodex: (state, action) => {
      let id = action.payload;
      const updatedgcodexs = state.gcodexs.filter(function (gcodex) {
        return gcodex._id !== id;
      });
      state.gcodexs = updatedgcodexs;
    },

  },
});

export const selectgcodexs = (state) => state.gcodex.gcodexs;

export const { Addgcodex, updategcodexs, deletegcodex, AddNewgcodex } = gcodexSlice.actions; // actions
export default gcodexSlice.reducer;
