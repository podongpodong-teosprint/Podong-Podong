import React, { useState } from 'react';

interface TypeAccordionProps {
  text: string;
  number: number;
  date: string;
}

export default function Accordion({ text, number, date }: TypeAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="mr-3 bg-purple p-2 rounded-full w-10 text-center h-10">{number}</div>
            <div>
              <div>{date}</div>
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
