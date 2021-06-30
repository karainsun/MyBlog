export const setCollapsed = (collapsed: any): object => {
  return (dispatch: (arg: { type: string; collapsed: any; }) => void) => {
    (() => {
      dispatch({
        type: "SET_COLLAPSED",
        collapsed,
      });
    })();
  };
};
