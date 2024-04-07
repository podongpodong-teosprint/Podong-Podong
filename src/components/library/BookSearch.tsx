import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Book from 'components/cores/design/Book';

// type TypeModalProps = {
//   number: number;
//   date: string;
//   content: string;
// };

export default function BookSearch() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const [bookList, setBookList] = useState([
    {
      title: '1모순',
      author: '양귀자',
      publisher: '어저구 출판사',
    },
    {
      title: '2소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
    {
      title: '3소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
    {
      title: '4소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
    {
      title: '5소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
    {
      title: '6소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
    {
      title: '7소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
    {
      title: '8소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
    {
      title: '9소년이 온다',
      author: '한강',
      publisher: '어떤출판사',
    },
  ]);

  return (
    <div>
      <button className="px-3 py-1 rounded-full bg-purple hover:bg-purple-hover" onClick={openModal}>
        {'책 검색'}
      </button>
      <dialog ref={modalRef} id="my_modal_1" className="p-3 modal">
        <div className="w-full modal-box bg-gray">
          <div className="flex items-center border-2 border-dashed border-gray bg-white rounded-full px-3 py-1 w-full">
            <FaSearch className="mr-2 " />
            <input type="text" placeholder="책 제목을 입력하세요" className="flex-1 outline-none" />
          </div>
          <div>
            <div>
              {bookList.length ? (
                <div className="my-3 overflow-y-auto h-80">
                  {bookList.map((book) => (
                    <Book title={book.title} author={book.author} publisher={book.publisher} />
                  ))}
                </div>
              ) : (
                <p className="text-center my-3 text-[20px]">책이 없습니다.</p>
              )}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              <button className="px-3 py-1 rounded-full bg-purple hover:bg-purple-hover">닫기</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
