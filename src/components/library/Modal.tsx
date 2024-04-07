import { useRef } from 'react';

// type TypeModalProps = {
//   number: number;
//   date: string;
//   content: string;
// };

export default function Modal() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div>
      <button className="px-3 py-1 rounded-full bg-purple hover:bg-purple-hover">{'포도알 만드는 모달'}</button>
      <dialog ref={modalRef} id="my_modal_1" className="p-3 modal">
        <div className="w-full modal-box bg-gray h-1/2">
          <h3 className="text-sub-title">번째 포도알</h3>
          <textarea className="w-full p-2 rounded-md h-1/3" placeholder="200자 내로 적어주세요." />
          <div className="text-right text-small">/200</div>
          <div className="flex flex-col ">
            <label htmlFor="date"></label>
            <input type="date" id="date" className="p-2 rounded-md" />
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              <button className="px-3 py-1 rounded-full bg-green hover:bg-green-hover">취소</button>
              <button className="px-3 py-1 rounded-full bg-purple hover:bg-purple-hover">저장</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
