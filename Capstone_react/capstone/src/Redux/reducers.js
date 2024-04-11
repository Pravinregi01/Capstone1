// reducers.js
const initialState = {
  data: [], // Store all data
  label: null, 
  filterByCrop: null, 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        data: action.payload, // Update all data
      };
    case 'SET_FILTER_BY_YEAR':
      return {
        ...state,
        label: action.payload, // Update selected year
      };
    case 'SET_FILTER_BY_CROP':
      return {
        ...state,
        filterByCrop: action.payload, // Update selected crop
      };
    case 'CLEAR_REDUX_STATE':
      return {
        ...initialState, // Reset state to initial empty state
      };
    default:
      return state;
  }
};

export default rootReducer;
