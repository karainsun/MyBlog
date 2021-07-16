import React, { FC, useState, useEffect } from "react";
import { Skeleton } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import CommonCard from "components/commonCard";
import './style.less'

interface ArticleProps { } 

interface ArticleTypes {
  id: number;
  like: string;
  star: string;
  comments: string;
  title: string;
  img: string;
}

const articles: ArticleTypes[] = [
  {
    id: 1,
    like: '10',
    star: '20',
    comments: '30',
    title: 'This is first message',
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  },
  {
    id: 2,
    like: '10',
    star: '20',
    comments: '30',
    title: 'This is second message',
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  },
  {
    id: 3,
    like: '10',
    star: '20',
    comments: '30',
    title: 'This is third message',
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  }
]

const TopArticles: FC<ArticleProps> = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <CommonCard title="热门推荐">
      <div className="article-list grid grid-cols-3 gap-4 pt-4 pb-4">
        {
          articles.map((article) => {
            return (
              <Skeleton loading={loading} active paragraph={{ rows: 3 }} key={article.id}>
                <div className="article-item h-44 relative overflow-hidden cursor-pointer">
                  <img className="absolute h-full w-full" src={article.img} alt="" />
                  <div className="article-content p-2 absolute w-full h-16 bottom-0">
                    <i className="article-title block">{article.title}</i>
                    <div className="article-option pt-2 flex">
                      <span style={{ marginTop: '-1px' }}><StarOutlined /></span>
                      <span className="ml-1 mr-3">{article.star}</span>
                      <span style={{ marginTop: '-1px' }} className="ml-3 mr-1"><LikeOutlined /></span>
                      <span className="mr-3">{article.like}</span>
                      <span style={{ marginTop: '-1px' }} className="ml-3 mr-1"><MessageOutlined /></span>
                      <span>{article.comments}</span>
                    </div>
                  </div>
                </div>
              </Skeleton>
            )
          })
        }
      </div>
    </CommonCard>
  )
}

export default TopArticles