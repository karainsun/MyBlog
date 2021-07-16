import React, { FC } from "react";
import './style.less'

interface CardProps {
  title: string;
}

const CommonCard: FC<CardProps> = ({ title, children }) => {
  return (
    <div className="common-card">
      <h2 className="title pb-2 text-sm border-b-1">{title}</h2>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

export default CommonCard