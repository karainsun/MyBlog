/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | {}>(); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation(position.coords);
        },
        function (e) {
          // @ts-ignore
          // let myCity = new BMap.LocalCity();
          // console.log(myCity)
          // myCity.get((res: any) => {
          //   console.log(res)
          // });
          setLocation({});
        }
      );
    }
  }, []);

  return location;
};
export default useLocation;
