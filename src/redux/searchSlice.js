// redux/searchSlice.js - Redux state for the product search/filter feature
import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // Current search string entered by the user
  },
  reducers: {
    // Action: update the search query
    setSearchQuery(state, action) {
      state.query = action.payload
    },
    // Action: clear the search
    clearSearch(state) {
      state.query = ''
    },
  },
})

export const { setSearchQuery, clearSearch } = searchSlice.actions

// Selector
export const selectSearchQuery = state => state.search.query

export default searchSlice.reducer
