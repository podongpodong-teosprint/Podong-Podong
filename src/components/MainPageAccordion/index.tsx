import { ComponentProps, useState } from 'react';
import { MdMode, MdDelete } from 'react-icons/md';

interface TypeAccordionProps extends ComponentProps<'summary'> {
  text: string;
  number: number;
  date: string;
  handleUpdate: (number: number) => void;
  handleDelete: (number: number) => void;
}

export default function Accordion({ text, number, date, handleUpdate, handleDelete, ...props }: TypeAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <details className={`collapse bg-base-200 ${isOpen ? 'open' : ''} `}>
        <summary
          {...props}
          className={`collapse-title min-h-fit py-2 px-4 text-xl font-medium cursor-pointer `}
          onClick={handleClick}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
              <div className="mr-3 bg-purple p-2 rounded-full w-10 text-center h-10">{number}</div>
              <div>
                <div>{date}</div>
                <div className="rounded-full">{text.slice(0, 20)}</div>
              </div>
            </div>
            <div className="flex gap-2 ">
              <button
                onClick={() => {
                  handleUpdate(number);
                }}
                className="btn btn-ghost p-2 h-fit min-h-fit"
              >
                <MdMode size="20" />
              </button>
              <button
                onClick={() => {
                  handleDelete(number);
                }}
                className="btn btn-ghost p-2 h-auto  min-h-fit"
              >
                <MdDelete size="20" />
              </button>
            </div>
          </div>
        </summary>
        <div className="collapse-content">
          <p className="w-full break-words">{text}</p>
        </div>
      </details>
    </div>
  );
}
