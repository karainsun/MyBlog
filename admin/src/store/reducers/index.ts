import initState from 'store/state';
import actionTypes from 'store/actionTypes';
import { produce } from 'immer'

interface Action {
  type: string;
  collapsed: boolean;
  userInfo: any; 
}

const storeData = produce((draft = initState, action: Action) => {  
  switch (action.type) {
    case actionTypes.SET_COLLAPSED:
      draft.collapsed = action.collapsed;
      break;
    case actionTypes.USER_INFO:
      for (const key in action.userInfo) {
        draft.userInfo[key] = action.userInfo[key];
      } 
      break; 
    default:
      break;
  }
  return draft;
});

export default storeData;
