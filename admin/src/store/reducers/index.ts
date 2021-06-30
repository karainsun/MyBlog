import initState from 'store/state';
import actionTypes from 'store/actionTypes';

interface Action {
  type: string;
  collapsed: boolean;
}

const storeData = (state = initState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_COLLAPSED:
      return {
        ...state,
        collapsed: action.collapsed
      };
    default:
      return {
        ...state
      };
  }
};

export default storeData;
