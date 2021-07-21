import React, { FC, useState } from "react";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { fileUpload } from 'request'

interface UploadProps {
  sendFile: (val: any) => void
}

const FileUpload: FC<UploadProps> = ({ sendFile }) => {
  const [fileList, setFileList] = useState<Array<any>>([])
  const [uploading, setUploading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  const uploadStyle = {
    border: '1px dashed #d9d9d9',
    backgroundColor: '#fafafa',
    borderRadius: '2px',
    color: '#999'
  }

  const iconStyle = { fontSize: '36px', marginTop: '30px' }

  const uploadBtn = (
    <div>
      {uploading ? <LoadingOutlined style={iconStyle} /> : <PlusOutlined style={iconStyle} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    setUploading(true);

    fileUpload(formData).then(({ status, data }) => {
      if (status && status === 200) {
        const { name, url } = data;
        setFileList([{ name, url }])
        sendFile([{ name, url }])
        setImageUrl(url)
        message.success('upload successfully!');
      }
    }).catch(error => {
      console.log(error);
      message.error('upload failed.');
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
        <div className="w-48 h-32 overflow-hidden text-center" style={uploadStyle}>
          {imageUrl ? <img src={imageUrl} alt="avatar" className="w-full h-full object-cover" /> : uploadBtn}
        </div>
      </Upload>
    </div>
  )
}

export default FileUpload