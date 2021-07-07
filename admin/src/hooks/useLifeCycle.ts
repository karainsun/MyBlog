import { useEffect, useRef } from 'react';

type Fn = () => void

//componentDidMount
function useMount(fn: Fn) {
  useEffect(() => {
    fn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

//componentDidUpdate
function useUpdate(fn: Fn) {
  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      fn();
    }
  });
}

//componentUnMount
function useUnMount(fn: Fn) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fn(), []);
}

export { useMount, useUpdate, useUnMount };
