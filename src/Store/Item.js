import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null
};

const itemSlicer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    fetchItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    editItem(state, action) {
      const index = state.items.findIndex(item => item.idd === action.payload.idd);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem(state, action) {
      state.items = state.items.filter(item => item.idd !== action.payload);
    }
  }
});

export const itemActions = itemSlicer.actions;
const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure} = itemActions;

export const fetchItems = () => async dispatch => {
  dispatch(fetchItemsStart());
  try {
    const response = await axios.get(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense.json`);
    if (response.status === 200) {
      const fetchedItems = Object.entries(response.data || {}).map(([key, value]) => ({
        ...value,
        idd: key
      }));
      dispatch(fetchItemsSuccess(fetchedItems));
    } else {
      throw new Error('Items cannot be obtained from firebase');
    }
  } catch (error) {
    dispatch(fetchItemsFailure(error.message));
  }
};

export const addItem = item => async dispatch => {
  try {
    const response = await axios.post(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense.json`, item);
    if (response.status === 200) {
      const newItem = { ...item, idd: response.data.name };
      dispatch(addItem(newItem));
    } else {
      throw new Error('Item not added to firebase');
    }
  } catch (error) {
    console.error('Response error on adding', error);
  }
};

export const editItem = (idd, updatedItem) => async dispatch => {
  try {
    const response = await axios.put(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense/${idd}.json`, updatedItem);
    if (response.status === 200) {
      dispatch(editItem({ ...updatedItem, idd }));
    } else {
      throw new Error('Items not Edited successfully');
    }
  } catch (error) {
    console.error("Response not Ok",error);
  }
};

export const deleteItem = idd => async dispatch => {
  try {
    const response = await axios.delete(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense/${idd}.json`);
    if (response.status === 200) {
      dispatch(deleteItem(idd));
    } else {
      throw new Error('Item could not be deleted');
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

export default itemSlicer.reducer;
