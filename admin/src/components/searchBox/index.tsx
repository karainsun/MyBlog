import React, { FC, useState, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import style from './index.module.less'
// import useClickOutside from 'hooks/useClickOutside'

interface SearchBoxProps { }

const SearchBox: FC<SearchBoxProps> = () => {
  const [show, setShow] = useState<boolean>(false)
  const inputEle = useRef<null | HTMLInputElement>(null)
  const boxEle = useRef<HTMLDivElement>(null) 

  // useEffect(() => {
  //   if (show && isClickOutside) {
  //     setShow(false)
  //   }
  // }, [isClickOutside, show])

  const inputShow = (): void => {
    setShow(true)
    inputEle.current && inputEle.current.focus()
  }

  const mouseLeave = (): void => {
    setTimeout(() => {
      setShow(false)
      inputEle.current && inputEle.current.blur()
    }, 1000)
  }

  return (<div ref={boxEle} onMouseLeave={mouseLeave} className={`${style.serachbox} flex items-center mr-8`} style={show ? searchActive : {}}>
    <input type="text" ref={inputEle} style={show ? iptActive : {}} />
    <SearchOutlined className="cursor-pointer" style={{ marginLeft: '-3px'}} onClick={inputShow} />
  </div>)
}

export default SearchBox

const iptActive = {
  width: '160px',
  transition: 'cubic-bezier(0.68, -0.55, 0.27, 1.55) all .3s'
}

const searchActive = {
  boxShadow: '0 0 0 2px #1890ff33',
  transition: 'all .1s'
}