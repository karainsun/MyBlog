import React, { FC } from 'react';
import { emojiArr } from 'utils';

interface EmojiProps {
  emojiCheck: (url: string) => void
}

const emojiList = emojiArr();

const EmojiBox: FC<EmojiProps> = ({emojiCheck}) => {
  const emojiAdd = (url: string) => {
    emojiCheck(url)
  }

  return (
    <div className="emoji flex w-48 h-32 bg-gray-50 overflow-y-scroll flex-wrap border-gray-300">
      {emojiList.map((item) => {
        return <img className="w-6 h-6 m-1" src={item.img} key={item.id} onClick={() => emojiAdd(item.img)} />;
      })}
    </div>
  );
};

export default EmojiBox;
