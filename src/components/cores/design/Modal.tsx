import { useRef } from 'react';

type TypeModalProps = {
  number: number;
  date: string;
  content: string;
};

export default function Modal({ number, date, content }: TypeModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div>
      <button className="bg-purple px-3 py-1 rounded-full hover:bg-purple-hover" onClick={openModal}>
        {'포도알 만드는 모달'}
      </button>
      <dialog ref={modalRef} id="my_modal_1" className="modal p-3">
        <div className="modal-box bg-gray w-full h-1/2">
          <h3 className="text-sub-title">{number}번째 포도알</h3>
          <textarea className="rounded-md w-full h-1/3 p-2" placeholder="200자 내로 적어주세요." />
          <div className="text-right text-small">{content.length}/200</div>
          <div className="flex flex-col ">
            <label htmlFor="date">{date}</label>
            <input type="date" id="date" className="p-2 rounded-md" />
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              <button className="bg-green px-3 py-1 rounded-full hover:bg-green-hover">취소</button>
              <button className="bg-purple px-3 py-1 rounded-full hover:bg-purple-hover">저장</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
