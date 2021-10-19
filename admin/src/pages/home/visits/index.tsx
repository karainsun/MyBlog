import React, { FC, useMemo, useState, useEffect } from 'react';
import { Skeleton } from 'antd';
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";

interface EchartsProps { }

const firstOption: EChartsOption = {
  title: {
    text: '访问量'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['游客访问', '用户访问']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '游客访问',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '用户访问',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
}

const EchartsTpl: FC<EchartsProps> = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  const getOption = () => {
    return firstOption;
  };

  // 数据变化才调用options
  const actiongetOption = useMemo(() => getOption(), [])

  return (
    <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
      <ReactEcharts
        style={{ background: "#fff", height: "300px", width: "100%" }}
        option={actiongetOption}
        notMerge={true}
        lazyUpdate={true}
      />
    </Skeleton>
  )
}

export default EchartsTpl
