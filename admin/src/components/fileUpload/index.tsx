import React, { FC, useState, useEffect } from "react";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { fileUpload } from 'request'

interface UploadProps {
  initSrc: string;
  sendFile: (val: any) => void;
  style: { [key: string]: string };
}

const FileUpload: FC<UploadProps> = ({ sendFile, initSrc, style }) => {
  const [fileList, setFileList] = useState<Array<any>>([initSrc])
  const [uploading, setUploading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>(initSrc)

  const uploadStyle = {
    border: '1px dashed #d9d9d9',
    backgroundColor: '#fafafa',
    borderRadius: '2px',
    color: '#999',
    ...style
  }

  const iconStyle = { fontSize: '36px', marginTop: '30px' }

  const uploadBtn = (
    <div>
      {uploading ? <LoadingOutlined style={iconStyle} /> : <PlusOutlined style={iconStyle} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  useEffect(() => {
    setImageUrl(initSrc)
    return () => {
      setImageUrl('')
    }
  }, [initSrc])

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });

    setUploading(true);

    fileUpload(formData).then((res) => {
      if (res.status && res.status as unknown as string === "success") {
        const { name, url }: any = res.data
        setFileList([{ name, url }])
        sendFile([{ name, url }])
        setImageUrl(url)
        message.success('上传成功!');
      }
    }).catch(error => {
      console.log(error);
      message.error('上传失败!');
    }).finally(() => {
      setUploading(false);
    })
  };

  const props = {
    beforeUpload: (file: any) => {
      setImageUrl('')
      setFileList([file])
      return false;
    },
    onChange: () => {
      handleUpload()
    },
    fileList
  };

  return (
    <div className="relative">
      <Upload {...props} maxCount={1} showUploadList={false}>
        <div className="overflow-hidden text-center" style={uploadStyle}>
          {imageUrl ? <img src={imageUrl} alt="avatar" className="w-full h-full object-cover" /> : uploadBtn}
        </div>
      </Upload>
    </div>
  )
}

export default FileUpload
