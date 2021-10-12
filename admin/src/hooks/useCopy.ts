import { message } from 'antd';

const useCopy = (e: string) => {
  let input: any;

  input = document.createElement('input');
  document.body.appendChild(input);
  input.style = {
    width: '100px',
    height: '20px',
    position: 'absolute',
    left: '-100px',
    bottom: '-20px'
  } 
  input.readOnly = true;
  input.value = e;
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input)
  message.success('已复制至粘贴板')
};

export default useCopy;
