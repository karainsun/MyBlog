import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { Form, Row, Col, Input, Button, Table, message, Popconfirm } from 'antd';
import { setHeight } from 'utils'
import {
  bannerList,
  bannerUpdate,
  bannerCreate,
  BannerParams,
  bannerDelete
} from 'request'
import ModalForm from 'components/modalForm';
import FileUpload from 'components/fileUpload';

const scrollHeight = setHeight(265)
const { TextArea } = Input;

interface Columns {
  title: string;
  dataIndex: string;
  width: number;
  fixed?: string;
  render?: (text: any, record: any, index: any) => void;
}

interface DataType extends BannerParams {
  id: number;
  key: string;
}

const columns: Columns[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    fixed: 'left'
  },
  {
    title: '顺序',
    dataIndex: 'order',
    width: 50,
  },
  {
    title: 'Banner',
    dataIndex: 'banner',
    width: 100,
    render: banner => (
      <div className="w-16 h-10 overflow-hidden">
        <img className="w-full h-full" src={banner} alt="" />
      </div>
    ),
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 250,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    width: 250,
  },
  {
    title: '日期',
    dataIndex: 'created_at',
    width: 150,
    render: (text: any, record: any, index: any) => {
      return dayjs(text).format('YYYY-MM-DD HH:mm')
    }
  }
];

const Collect: FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [defaultImg, setDefaultImg] = useState<string>('')
  const [banners, setBanners] = useState<DataType[]>([])
  const [insert, setInsert] = useState<number>(0)
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [formVal, setFormVal] = useState<BannerParams>({
    title: '',
    desc: '',
    banner: '',
    order: 1
  })
  const [subKey, setSubKey] = useState<number>(0) // 新建或修改 新建：0，修改：1

  useEffect(() => {
    setTableLoading(true)
    bannerList().then(({ data }) => {
      if (data.length > 0) {
        const bannerList = data.map((cate: any) => {
          return Object.assign({}, { key: cate.id }, cate)
        })
        setBanners(bannerList)
      } else {
        setBanners([])
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setTableLoading(false)
    })
    return () => {
      setInsert(0)
    }
  }, [insert])

  const selectChange = (selectedKeys: any) => {
    setSelectedRowKeys(selectedKeys);
  };

  const modalShow = (num: number) => {
    setIsVisible(true);
    setSubKey(typeof num === 'object' ? 0 : 1)
  };

  const modalConfirm = () => {
    setIsVisible(false);
  };

  const modalCancel = () => {
    setIsVisible(false);
    setDefaultImg('')
  };

  // 新建banner提交
  const modalFinish = async (values: any) => {
    try {
      const updateParams = values
      if (subKey === 1) {
        updateParams.id = selectedRowKeys[0]
      }
      const res: any = subKey === 0 ? await bannerCreate(values) : await bannerUpdate(updateParams)

      if ((res.status as string) === 'success') {
        modalConfirm()
        message.success(res.msg)
        setInsert(insert + 1)
        setSelectedRowKeys([])
      } else {
        message.warning(res.msg)
      }
    } catch (error) {
      console.log(error);
      message.error('操作失败！')
    }
  };
  // 更新banner
  const bannerUpdateFn = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('请选择且只能选择一条数据')
    } else {
      const item = banners.filter(item => item.id === selectedRowKeys[0])
      setFormVal({
        title: item[0].title,
        desc: item[0].desc,
        banner: item[0].banner,
        order: item[0].order
      })
      setDefaultImg(item[0].banner)
      modalShow(1)
    }
  }

  const rowSelection = {
    onChange: selectChange,
    selectedRowKeys
  }
  // 批量删除 banner
  const bannersDelete = async () => {
    if (selectedRowKeys.length < 1) {
      message.warning('至少选一条删除')
    } else {
      try {
        const { msg, status }: any = await bannerDelete({ ids: selectedRowKeys })
        if (status === 'success') {
          message.success(msg)
          setSelectedRowKeys([]);
          setInsert(insert + 1)
        } else {
          message.warning(msg)
        }
      } catch (error) {
        console.log(error);
        message.error('删除失败！')
      }
    }
  }

  const getFiles = (val: any) => {
    formVal.banner = val[0].url
    setFormVal({ ...formVal })
  }

  return (
    <div className="componentList">
      <Row>
          <Col span={2}>
            <Form.Item><Button onClick={modalShow}>新建</Button></Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={bannersDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item><Button onClick={bannerUpdateFn} type="primary" ghost>编辑</Button></Form.Item>
          </Col>
        </Row>
      <Table
        size="middle"
        columns={columns}
        dataSource={banners}
        pagination={false}
        rowSelection={rowSelection}
        scroll={{ y: scrollHeight }}
        loading={tableLoading}
      />
      <ModalForm
        visible={isVisible}
        onCreate={modalFinish}
        onCancel={modalCancel}
        title="编辑Banner"
        val={formVal}
        bodyStyle={{ height: '310px' }}
      >
        <Form.Item
          label="Banner"
          name="banner"
          rules={[{ required: true, message: '请上传Banner！' }]}
        >
          <FileUpload style={{ width: '160px', height: '80px' }} sendFile={getFiles} initSrc={defaultImg} />
        </Form.Item>
        <Form.Item
          label="顺序"
          name="order"
          rules={[{ required: true, message: '请输入顺序！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="desc"
          rules={[{ required: true, message: '请输入描述！' }]}
        >
          <TextArea />
        </Form.Item>
      </ModalForm>
    </div>
  )
}

export default Collect;
