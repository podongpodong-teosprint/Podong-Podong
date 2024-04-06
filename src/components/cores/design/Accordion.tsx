import React, { useState } from 'react';

export default function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('유저 글이 20자 미만 이면');

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <details className={`collapse bg-base-200 ${isOpen ? 'open' : ''} ${text.length < 20 ? '' : 'collapse-arrow'}`}>
        <summary
          className={`collapse-title text-xl font-medium cursor-pointer ${text.length < 20 ? '' : 'collapse-arrow'}`}
          onClick={toggleCollapse}
        >
          <div className="flex items-center">
            <div className="mr-3 bg-purple p-2 rounded-full">번호</div>
            <div>
              <div>2024.04.06 (날짜)</div>
              <div className="rounded-full">{text.slice(0, 20)}</div>
            </div>
          </div>
        </summary>
        <div className="collapse-content">
          <p>{text}</p>
        </div>
      </details>
    </div>
  );
}
