import React, { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getWeather, WeatherParams } from 'request'
import style from './style.module.less'
import 'assets/fonts/font-icon/iconfont.css'
import { Skeleton, Select, message } from 'antd';
import { weatherIcons } from 'utils/weatherIcons'
import { topCity } from 'utils/topCity'

interface WeatherProps { }

interface LocationData {
  latitude: number;
  longitude: number;
}

const { Option } = Select

const Weather: FC<WeatherProps> = () => {
  const [location, setLocation] = useState<LocationData>({ latitude: 121.445, longitude: 31.213 })
  const [weatherInfo, setWeatherInfo] = useState<any>(null)
  const [isshow, setIsshow] = useState<boolean>(false)
  const [weatherImg, setWeatherImg] = useState<string>()
  const [cityName, setCityName] = useState<string>('上海')

  useEffect(() => {
    const requests = async () => {
      const weatherParams: WeatherParams = {
        location: location.latitude + ',' + location.longitude,
        key: '1bc4bbd3e4e84851a1a9eb5daaf1a2da'
      }
      try {
        const { now, code }: any = await getWeather(weatherParams)
        if (code === '200') {
          setWeatherInfo(now)
          setWeatherImg(weatherIcons[now.icon])
        } else {
          message.warning('没有这地儿的天气信息~')
        }
        setTimeout(() => {
          setIsshow(true)
        }, 1000)
      } catch (error) {
        console.log(error);
      }
    }
    requests()
  }, [location])

  const cityHandleSelect = (value: any) => {
    setIsshow(false)
    const arr = value.split('-')
    const location = arr[0].split(',')
    setLocation({ latitude: location[0], longitude: location[1] })
    setCityName(arr[1])
  }

  return !isshow ? <div style={{ height: '120px' }}><Skeleton active paragraph={{ rows: 2 }} /></div> : (
    <div className={`${style.weatherBox} relative weatherBox`}>
      <div className="flex items-end">
        <span className="absolute top-0 right-0 text-xs">{dayjs(weatherInfo?.obsTime).format('YYYY-MM-DD HH:mm')}</span>
        <div className="absolute top-4 right-0">
          <Select defaultValue={cityName} style={{width: '100px'}} onChange={cityHandleSelect}>
            {
              topCity.map(({ name, location }: any) => {
                return (
                  <Option value={`${location}-${name}`} key={location}>{name}</Option>
                )
              })
            }
          </Select>
        </div>
        <div className="w-16">
          <img className="w-16" src={weatherImg} alt="" />
        </div>
        <div className="ml-4">
          <span className={`${style.temp} text-4xl`}>{weatherInfo?.temp}</span>
          <span className="ml-4">{weatherInfo?.text}</span>
        </div>
      </div>
      <ul className="grid grid-cols-5 mt-4">
        <li className="flex justify-center items-center">
          <div className="iconfont icon-weather1"></div>
          <div className="ml-2">
            <h2>{weatherInfo?.windScale}级</h2>
            <p className="text-xs text-gray-400">{weatherInfo?.windDir}</p>
          </div>
        </li>
        <li className="flex justify-center items-center">
          <div className="iconfont icon-weather3"></div>
          <div className="ml-2">
            <h2>{weatherInfo?.humidity}%</h2>
            <p className="text-xs text-gray-400">相对湿度</p>
          </div>
        </li>
        <li className="flex justify-center items-center">
          <div className="iconfont icon-weather4"></div>
          <div className="ml-2">
            <h2>{weatherInfo?.pressure}hPa</h2>
            <p className="text-xs text-gray-400">大气压</p>
          </div>
        </li>
        <li className="flex justify-center items-center">
          <div className="iconfont icon-weather5"></div>
          <div className="ml-2">
            <h2>{weatherInfo?.precip}mm</h2>
            <p className="text-xs text-gray-400">降水量</p>
          </div>
        </li>
        <li className="flex justify-center items-center">
          <div className="iconfont icon-weather6"></div>
          <div className="ml-2">
            <h2>{weatherInfo?.vis}KM</h2>
            <p className="text-xs text-gray-400">能见度</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Weather
