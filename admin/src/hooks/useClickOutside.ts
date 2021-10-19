/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const useClickOutside = (elementRef: any | HTMLElement) => {
  const [isClickOutside, setIsClickOutside] = useState<boolean>(false);

  const handler = (e: MouseEvent) => {
    console.log(elementRef);
    if (elementRef) {
      // contains：是否包含某节点，e.target不一定每次都是HTMLElement类型的，所以要类型断言一下
      if (elementRef.contains(e.target as HTMLElement)) {
        setIsClickOutside(false);
      } else {
        setIsClickOutside(true);
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return isClickOutside;
};
export default useClickOutside;
