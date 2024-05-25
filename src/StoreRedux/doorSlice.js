// reducers/doorReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const doorslice = createSlice({
  name: "door",
  initialState: {
    doors: [],
  },
  reducers: {

    Adddoor: (state, action) => {
      state.doors = action.payload;
    },
    AddNewdoor: (state, action) => {
      state.doors = [action.payload, ...state.doors];
    },
    updatedoors: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.doors.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.doors[index] = data;
      }
    },
    deletedoor: (state, action) => {
      let id = action.payload;
      const updateddoors = state.doors.filter(function (door) {
        return door._id !== id;
      });
      state.doors = updateddoors;
    },

  },
});

export const selectdoors = (state) => state.door.doors;

export const { Adddoor, updatedoors, deletedoor, AddNewdoor } = doorslice.actions; // actions
export default doorslice.reducer;
