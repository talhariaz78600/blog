import { createSlice } from "@reduxjs/toolkit";
export const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [],
  },
  reducers: {

    Addfood: (state, action) => {
      state.foods = action.payload;
    },
    AddNewfood: (state, action) => {
      state.foods = [action.payload, ...state.foods];
    },
    updatefoods: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.foods.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.foods[index] = data;
      }
    },
    deletefood: (state, action) => {
      let id = action.payload;
      const updatedfoods = state.foods.filter(function (book) {
        return book._id !== id;
      });
      state.foods = updatedfoods;
    },

  },
});

export const selectfoods = (state) => state.food.foods;

export const { Addfood, updatefoods, deletefood, AddNewfood } = foodSlice.actions; // actions
export default foodSlice.reducer;
