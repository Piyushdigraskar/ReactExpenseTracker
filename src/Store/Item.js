import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null
};

const itemSlice = createSlice({
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
    addItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    addItemSuccess(state, action) {
      state.items.push(action.payload);
      state.loading = false;
    },
    addItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    editItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    editItemSuccess(state, action) {
      const { idd, updatedItem } = action.payload;
      const index = state.items.findIndex(item => item.idd === idd);
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
      state.loading = false;
    },
    editItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteItemStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteItemSuccess(state, action) {
      const idd = action.payload;
      state.items = state.items.filter(item => item.idd !== idd);
      state.loading = false;
    },
    deleteItemFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const itemActions = itemSlice.actions;

export const fetchItems = () => async dispatch => {
  dispatch(itemActions.fetchItemsStart());
  try {
    const response = await axios.get(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense.json`);
    if (response.status === 200) {
      const fetchedItems = Object.entries(response.data || {}).map(([key, value]) => ({
        ...value,
        idd: key
      }));
      dispatch(itemActions.fetchItemsSuccess(fetchedItems));
    } else {
      throw new Error('Items cannot be obtained from firebase');
    }
  } catch (error) {
    dispatch(itemActions.fetchItemsFailure(error.message));
  }
};

export const addItem = item => async dispatch => {
  dispatch(itemActions.addItemStart());
  try {
    const response = await axios.post(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense.json`, item);
    if (response.status === 200) {
      const newItem = { ...item, idd: response.data.name };
      dispatch(itemActions.addItemSuccess(newItem));
    } else {
      throw new Error('Item not added to firebase');
    }
  } catch (error) {
    dispatch(itemActions.addItemFailure(error.message));
  }
};

export const editItem = (idd, updatedItem) => async dispatch => {
  dispatch(itemActions.editItemStart());
  try {
    const response = await axios.put(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense/${idd}.json`, updatedItem);
    if (response.status === 200) {
      dispatch(itemActions.editItemSuccess({ idd, updatedItem }));
    } else {
      throw new Error('Item not edited successfully');
    }
  } catch (error) {
    dispatch(itemActions.editItemFailure(error.message));
  }
};

export const deleteItem = idd => async dispatch => {
  dispatch(itemActions.deleteItemStart());
  try {
    const response = await axios.delete(`https://expense-tracker--react-default-rtdb.firebaseio.com/expense/${idd}.json`);
    if (response.status === 200) {
      dispatch(itemActions.deleteItemSuccess(idd));
    } else {
      throw new Error('Item not deleted successfully');
    }
  } catch (error) {
    dispatch(itemActions.deleteItemFailure(error.message));
  }
};

export default itemSlice.reducer;
