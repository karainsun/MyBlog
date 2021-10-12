/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from 'react';
import { Modal, Form } from 'antd';

interface CollectionCreateFormProps {
  title: string;
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  val: any;
  children: any;
  bodyStyle?: any;
}

const ModalForm: React.FC<CollectionCreateFormProps> = ({
  title,
  visible,
  onCreate,
  onCancel,
  val,
  children,
  bodyStyle
}) => {
  const [form] = Form.useForm(); 
  //TODO: 记录usseState更新后视图不变的问题
  // antd有些组件就是这样的，defuatValue不允许被修改, 一旦初始化，就不会变了
  useEffect(() => {  
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) { 
        form.setFieldsValue({ [key]: val[key] })
      }
    }
  }, [val])

  return (
    <Modal
      getContainer={false}
      visible={visible}
      title={title}
      bodyStyle={bodyStyle}
      okText="确认"
      cancelText="取消"
      onCancel={() => {
        form.resetFields();
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info: any) => {
            console.log('提交失败:', info);
          });
      }}
    > 
      <Form
        form={form}
        name="createForm"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }} 
        className="h-40"
      >
        {children}
      </Form>
    </Modal>
  );
};

export default memo(ModalForm)