import React, { FC, useState, useEffect } from 'react'
import { Skeleton } from 'antd';
import CommonCard from "components/commonCard";
import './style.less'
import { newestComment } from 'request'

interface CommentTypes {
  id: number;
  article_title: string;
  article_link: string;
  content: string;
  nickname: string;
}

const Comments: FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [comments, setComments] = useState<CommentTypes[]>([])

  useEffect(() => {
    newestComment({ limit: 10 }).then(({ data }) => {
      if(data) {
        setComments(data)
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <CommonCard title="最新评论">
      <Skeleton loading={loading} size="small" active paragraph={{ rows: 3 }}>
        <div className="comments-list h-48 overflow-y-scroll mt-2">
          {
            comments.map((item) => {
              return (
                <div className="comment-item p-2" key={item.id}>
                  <div className="comment-title text-gray-500">
                    <a href={item.article_link} target="_bank">{item.article_title}</a>
                  </div>
                  <div className="comment-content flex">
                    <span>{item.nickname}：</span>
                    <i className="comment-txt block" dangerouslySetInnerHTML={{__html: item.content}}></i>
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

export default Comments
