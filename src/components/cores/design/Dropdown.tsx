import { useState } from 'react';

type TypeDropdownDir = 'left' | 'right' | 'end';

export default function Dropdown({
  dir = 'end',
  items,
  onClick,
}: {
  dir?: TypeDropdownDir;
  items: string[];
  onClick: (val: string) => void;
}) {
  const [value, setValue] = useState(items[0] ?? '');

  const handleClick = (item: string) => {
    setValue(item);
    onClick(item);
  };

  return (
    <details className={`dropdown-${dir} dropdown`}>
      <summary className="m-1 btn px-4 py-2 min-h-fit h-fit">{value}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {items.map((item) => (
          <li onClick={() => handleClick(item)}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}
