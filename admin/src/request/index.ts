import ajax from './config'; 

export interface WeatherParams {
  location: string;
  key: string;
}

export interface CityParams {
  number: number;
  range: string;
  key: string;
}

// 获取天气信息
export const getWeather = (params: WeatherParams) =>
  ajax({
    method: 'GET',
    url: 'https://devapi.qweather.com/v7/weather/now',
    params
  });

export const getTopCity = (params: CityParams) => ajax({
  method: 'GET',
  url: 'https://geoapi.qweather.com/v2/city/top',
  params
});
