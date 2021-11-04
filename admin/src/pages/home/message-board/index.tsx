import React, { FC, useState, useEffect } from "react";
import { Skeleton } from 'antd';
import CommonCard from "components/commonCard";
import './style.less'
import { messageNewest } from 'request'
import dayjs from 'dayjs'

interface CommentProps {
  id: number;
  nickname: string;
  created_at: string;
  content: string;
  avatar: string;
}

const MessageBoard: FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [coments, setComents] = useState<CommentProps[]>([])

  useEffect(() => {
    messageNewest({ limit: 2 }).then(({ data }) => {
      if(data) {
        setComents(data)
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <CommonCard title="最新留言">
      <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }}>
        <div className="message-list" style={{ height: '100px' }}>
          {
            coments.map((item) => {
              return (
                <div className="message-item flex items-center pt-2" key={item.id}>
                  <div className="rounded-full h-11 w-11 overflow-hidden">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="flex-1 ml-2 h-11">
                    <div>
                      <i>{item.nickname}</i>
                      <span className="mr-2 float-right" style={{ fontSize: '12px' }}>{dayjs(item.created_at).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                    <div className="text-gray-600 flex flex-wrap" dangerouslySetInnerHTML={{__html: item.content}}></div>
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
