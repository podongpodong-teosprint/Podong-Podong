import { useState } from 'react';

type TypeDropdownDir = 'left' | 'right' | 'end';
type TypeItem = {
  label: string;
  value: string;
};

export default function Dropdown({
  dir = 'end',
  items,
  onClick,
}: {
  dir?: TypeDropdownDir;
  items: TypeItem[];
  onClick: (val: TypeItem) => void;
}) {
  const DEFAULT_STATE = { label: '', value: '' };
  const [value, setValue] = useState<TypeItem>(items[0] ?? DEFAULT_STATE);

  const handleClick = (item: TypeItem) => {
    setValue(item);
    onClick(item);
  };

  return (
    <details className={`dropdown-${dir} dropdown`}>
      <summary className="m-1 btn px-4 py-2 min-h-fit h-fit">{value.label}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {items.map((item, i) => (
          <li key={`dropdown-item-${i}`} onClick={() => handleClick(item)}>
            <a>{item.label}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}
