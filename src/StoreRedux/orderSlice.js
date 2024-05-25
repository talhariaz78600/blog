import { createSlice } from "@reduxjs/toolkit";
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {

    Addorder: (state, action) => {
      state.orders = action.payload;
    },
    AddNeworder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
    },
    updateorders: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.orders.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.orders[index] = data;
      }
    },
    deleteorder: (state, action) => {
      let id = action.payload;
      const updatedorders = state.orders.filter(function (book) {
        return book._id !== id;
      });
      state.orders = updatedorders;
    },

  },
});

export const selectorders = (state) => state.order.orders;

export const { Addorder, updateorders, deleteorder, AddNeworder } = orderSlice.actions; // actions
export default orderSlice.reducer;
