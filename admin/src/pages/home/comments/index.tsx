import React, { FC, useState, useEffect } from 'react'
import { Skeleton } from 'antd';
import CommonCard from "components/commonCard";
import './style.less'

interface CommentsProps { }

interface CommentTypes {
  id: number;
  articleTitle: string;
  content: string;
  name: string;
}

const commentsList: CommentTypes[] = [
  {
    id: 1,
    articleTitle: 'react-router实现路由守卫功能，权限管理',
    content: 'this is article first comment',
    name: 'Kay'
  },
  {
    id: 2,
    articleTitle: 'react-router实现路由守卫功能，权限管理',
    content: 'this is article first comment',
    name: 'Kay'
  },
  {
    id: 3,
    articleTitle: 'react-router实现路由守卫功能，权限管理',
    content: 'this is article first comment',
    name: 'Kay'
  },
  {
    id: 4,
    articleTitle: 'react-router实现路由守卫功能，权限管理',
    content: 'this is article first comment',
    name: 'Kay'
  },
  {
    id: 5,
    articleTitle: 'react-router实现路由守卫功能，权限管理',
    content: 'this is article first comment',
    name: 'Kay'
  },
  {
    id: 6,
    articleTitle: 'react-router实现路由守卫功能，权限管理',
    content: 'this is article first comment',
    name: 'Kay'
  }
]

const Comments: FC<CommentsProps> = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <CommonCard title="最新评论">
      <Skeleton loading={loading} size="small" active paragraph={{ rows: 3 }}>
        <div className="comments-list h-48 overflow-y-scroll mt-2">
          {
            commentsList.map((item) => {
              return (
                <div className="comment-item p-2" key={item.id}>
                  <div className="comment-title text-gray-500">{item.articleTitle}</div>
                  <div className="flex">
                    <span>{item.name}：</span>
                    <i className="comment-txt block">{item.content}</i>
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