import { useRef } from 'react';

export default function ConfirmModal() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  // <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
  return (
    <div>
      <button onClick={openModal} className="px-3 py-1 rounded-full bg-purple hover:bg-purple-hover">
        {'포도알 만드는 모달'}
      </button>
      <dialog
        ref={modalRef}
        id="my_modal_1"
        className=" w-[200px] h-[200px] p-3 bg-white modal rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="modal-action">
          <form method="dialog" className="flex flex-col gap-3">
            <button className="px-4 py-2 rounded-full bg-green hover:bg-green-hover">상세 포도 조회</button>
            <button className="px-4 py-2 rounded-full bg-purple hover:bg-purple-hover">책 검색하기</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
