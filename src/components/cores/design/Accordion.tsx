import { useState } from 'react';

type TypeAccordionProps = {
  text: string;
  number: number;
  date: string;
};

export default function Accordion({ text, number, date }: TypeAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="my-4">
      <details className={`collapse bg-base-200 ${isOpen ? 'open' : ''} ${text.length < 20 ? '' : 'collapse-arrow'}`}>
        <summary
          className={`collapse-title text-xl font-medium cursor-pointer ${text.length < 20 ? '' : 'collapse-arrow'}`}
          onClick={toggleCollapse}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 p-2 mr-3 text-center rounded-full bg-purple">{number}</div>
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
