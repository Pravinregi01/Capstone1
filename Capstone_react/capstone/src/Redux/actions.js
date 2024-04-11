// actions.js
export const fetchDataAction = (data) => ({
  type: 'FETCH_DATA',
  payload: data,
});

export const setFilterByYear = (year) => ({
  type: 'SET_FILTER_BY_YEAR',
  payload: year,
});

export const setFilterByCrop = (crop) => ({
  type: 'SET_FILTER_BY_CROP',
  payload: crop,
});

export const clearReduxState = () => ({
  type: 'CLEAR_REDUX_STATE',
});
