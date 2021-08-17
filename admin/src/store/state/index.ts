export interface StoreState {
  collapsed: boolean;
  userInfo: UserInfo; 
}

export interface UserInfo {
  id: number;
  username: string | null;
  email: string | null;
  status: number;
  avatar: string | null;
  sign: string | null;
  is_admin: boolean;
  introduction: string | null;
}

const initState: StoreState = {
  collapsed: false, // 菜单收起
  userInfo: {
    id: 0,
    username: null,
    email: null,
    status: 1,
    avatar: null,
    sign: null,
    is_admin: false,
    introduction: null
  } 
}; 
export default initState;
