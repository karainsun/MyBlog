import React, { FC, useEffect } from 'react';
import Edit from 'wangeditor'

interface EditorProps {
  value: string;
  valChange: (val: string) => void;
  uploadImage: (resultFiles: any, insertImgFn: any) => void;
}

let editor: any = null

const Editor: FC<EditorProps> = ({ value, valChange, uploadImage }) => {

  useEffect(() => {
    editor = new Edit("#box")

    editor.config.onchange = (newHtml: string) => {
      valChange(newHtml);
    }

    editor.config.customUploadImg = (resultFiles: any, insertImgFn: any) => {
      uploadImage(resultFiles, insertImgFn)
  }

    editor.config.uploadImgShowBase64 = true
    editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片

    // 需要展示的菜单
    editor.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'link',
      'code',
      'list',
      'todo',
      'justify',
      'quote',
      'table',
      'splitLine',
      'undo',
      'redo',
      'image'
    ]
    // 创建
    editor.create()
    return () => {
      // 组件销毁时销毁编辑器 注：class写法需要在componentWillUnmount中调用
      editor.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (editor) {
      editor.txt.html(value);
    }
  }, [value])

  return (
    <div>
      <div id="box"></div>
    </div>
  );
}

export default Editor
