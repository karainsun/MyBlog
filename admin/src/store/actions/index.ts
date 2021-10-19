import { UserInfo } from 'store/state'

// export const setCollapsed = (collapsed: any): object => {
//   return (dispatch: (arg: { type: string; collapsed: any }) => void) => {
//     (() => {
//       dispatch({
//         type: 'SET_COLLAPSED',
//         collapsed
//       });
//     })();
//   };
// };
export const setCollapsed = (collapsed: boolean) =>({
  type: 'SET_COLLAPSED',
  collapsed
})

export const setUserInfo = (info: UserInfo) => ({
  type: 'USER_INFO',
  userInfo: info
})
