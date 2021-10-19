import React, { FC, useState, useEffect } from "react";
import { Skeleton } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import CommonCard from "components/commonCard";
import './style.less'
import { articleNewest } from 'request'

interface ArticleTypes {
  id: number;
  like: string;
  star: string;
  comments: string;
  title: string;
  image: Array<any>;
}

const TopArticles: FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [posts, setPosts] = useState<ArticleTypes[]>([])

  useEffect(() => {
    articleNewest({ limit: 3 }).then(({ data }) => {
      if(data) {
        setPosts(data)
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <CommonCard title="热门推荐">
      <div className="article-list grid grid-cols-3 gap-4 pt-4 pb-4">
        {
          posts.map((article) => {
            return (
              <Skeleton loading={loading} active paragraph={{ rows: 3 }} key={article.id}>
                <div className="article-item h-44 relative overflow-hidden cursor-pointer">
                  <img className="absolute h-full w-full" src={article.image[0].url} alt="" />
                  <div className="article-content p-2 absolute w-full h-16 bottom-0">
                    <i className="article-title block truncate w-full">{article.title}</i>
                    <div className="article-option pt-2 flex">
                      <span style={{ marginTop: '-1px' }}><StarOutlined /></span>
                      <span className="ml-1 mr-3">1</span>
                      <span style={{ marginTop: '-1px' }} className="ml-3 mr-1"><LikeOutlined /></span>
                      <span className="mr-3">1</span>
                      <span style={{ marginTop: '-1px' }} className="ml-3 mr-1"><MessageOutlined /></span>
                      <span>1</span>
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
