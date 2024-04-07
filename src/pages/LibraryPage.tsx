import { useState, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TypeGrape, TypeGrapeShape } from '../components/podo/types';
import { grapes, styleByType } from '../components/podo/consts';
// import { TypeMemorySchema } from 'apis/memory';
import ConfirmModal from '../components/library/ConfirmModal';
import { FaSearch } from 'react-icons/fa';
import Book from 'components/cores/design/Book';
import { searchBook } from 'apis/kakao';

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
        <h2 className="text-title">포동포동의 서재</h2>
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
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [apiBooks, setApiBooks] = useState([]);
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key === 'Enter') {
        const result = await searchBook(searchTitle);
        setApiBooks(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = () => {
    setApiBooks([]);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handlePodoClick = () => {
    openModal();
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
          return <circle id={`${i}`} key={i} {...createGrape(grape, 0)} fill="white" />;
        })}
      </svg>
      <div>제목</div>
      <ConfirmModal />
      <dialog ref={modalRef} id="my_modal_1" className="p-3 modal">
        <div className="w-full modal-box bg-gray">
          <div className="flex items-center border-2 border-dashed border-gray bg-white rounded-full px-3 py-1 w-full">
            <FaSearch className="mr-2 " />
            <input
              type="text"
              placeholder="책 제목을 입력하세요"
              className="flex-1 outline-none"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyUp={handleSearch}
            />
          </div>
          <div>
            <div>
              {apiBooks.length ? (
                <div className="my-3 overflow-y-auto h-80">
                  {apiBooks.map((book) => (
                    <Book
                      title={book.title}
                      authors={book.authors}
                      publisher={book.publisher}
                      thumbnail={book.thumbnail}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center my-3 text-[20px]">책이 없습니다.</p>
              )}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              <button
                className="px-3 py-1 rounded-full bg-purple hover:bg-purple-hover"
                onClick={() => setSearchTitle('')}
              >
                닫기
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

type PodoList = {
  title: string;
};
