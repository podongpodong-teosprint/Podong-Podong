import { twMerge } from 'tailwind-merge';
import { TypeGrape, TypeGrapeShape } from '../components/podo/types';
import { grapes, styleByType } from '../components/podo/consts';
// import { TypeMemorySchema } from 'apis/memory';
import ConfirmModal from '../components/library/ConfirmModal';

export default function LibraryPage() {
  const podoList: PodoList[] = [
    {
      title: '포도책1',
    },
    {
      title: '포도책2',
    },
  ];

  return (
    <>
      <div className="">
        <h2>포동포동의 서재</h2>
        <ul className="flex space-x-5">
          <li>전체</li>
          <li>읽은 책</li>
          <li>읽고 있는 책</li>
          <li>읽고 싶은 책</li>
        </ul>
      </div>
      <div className="grid grid-cols-3 place-items-center">
        <Podo />
        <Podo />
        <Podo />
        <Podo />
        <EmptyPodo />
      </div>
    </>
  );
}
// TODO: 서재용 포도로 나중에 따로 컴포넌트 빼야
export function Podo() {
  const handlePodoClick = () => {
    alert('circle clicked');
  };

  const createGrape = (shape: TypeGrapeShape, type: TypeGrape) => {
    const baseClassName = 'cursor-pointer transition-all ';
    const style = styleByType[type];
    return { ...shape, ...style, className: twMerge(baseClassName) };
  };

  return (
    <div className="flex flex-col">
      <svg
        onClick={handlePodoClick}
        width="100"
        height="200"
        viewBox="0 0 303 426"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.7541 49.3339L102.221 85.5874C106.247 87.972 111.332 85.0364 111.279 80.3579L111.116 8.13284C111.065 3.54417 106.091 0.709459 102.117 3.00394L39.8122 38.9755C35.838 41.27 35.8059 46.995 39.7541 49.3339Z"
          fill="#14AE5C"
        />
        {grapes.map((grape, i) => {
          return <circle id={`${i}`} key={i} {...createGrape(grape, 0)} fill="purple" />;
        })}
      </svg>
      <div>제목</div>
      <ConfirmModal />
    </div>
  );
}

// 비어있는 포도
export function EmptyPodo() {
  const handlePodoClick = () => {
    alert('circle clicked');
  };

  const createGrape = (shape: TypeGrapeShape, type: TypeGrape) => {
    const baseClassName = 'cursor-pointer transition-all ';
    const style = styleByType[type];
    return { ...shape, ...style, className: twMerge(baseClassName) };
  };

  return (
    <div className="flex flex-col">
      <svg
        onClick={handlePodoClick}
        width="100"
        height="200"
        viewBox="0 0 303 426"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.7541 49.3339L102.221 85.5874C106.247 87.972 111.332 85.0364 111.279 80.3579L111.116 8.13284C111.065 3.54417 106.091 0.709459 102.117 3.00394L39.8122 38.9755C35.838 41.27 35.8059 46.995 39.7541 49.3339Z"
          fill="#14AE5C"
        />
        {grapes.map((grape, i) => {
          return <circle id={`${i}`} key={i} {...createGrape(grape, 0)} fill="red" />;
        })}
      </svg>
      <div>제목</div>
      <ConfirmModal />
    </div>
  );
}

type PodoList = {
  title: string;
};
