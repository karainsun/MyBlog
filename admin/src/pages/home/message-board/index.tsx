import React, { FC, useState, useEffect } from "react";
import { Skeleton } from 'antd';
import CommonCard from "components/commonCard";
import './style.less'

interface MessageProps { }

const coments = [
  {
    id: 1,
    name: 'Kay',
    time: '2021-07-14',
    content: 'This is first message',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  {
    id: 2,
    name: 'Sun',
    time: '2021-07-14',
    content: 'This is second message',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  }
]

const MessageBoard: FC<MessageProps> = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <CommonCard title="最新留言">
      <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }}>
        <div className="message-list" style={{ height: '100px' }}>
          {
            coments.map((item) => {
              return (
                <div className="message-item flex items-center pb-2" key={item.id}>
                  <div className="rounded-full h-12 w-12 overflow-hidden">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="flex-1 ml-2 pt-2">
                    <div>
                      <i>{item.name}</i>
                      <span className="mr-2 float-right" style={{ fontSize: '12px' }}>{item.time}</span>
                    </div>
                    <div className="text-gray-600">{item.content}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Skeleton>
    </CommonCard>
  )
}

export default MessageBoard