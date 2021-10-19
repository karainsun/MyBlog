import { useHistory } from 'react-router';

const useRoutePush = (path: string) => {
  const history = useHistory()

  return history.push(path);
};
export default useRoutePush;
