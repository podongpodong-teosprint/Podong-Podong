import { TypePodoShcema } from 'apis/podo';
import { forwardRef } from 'react';

interface TypeModalProps {
  state: TypePodoShcema;
  handleCancel: () => void;
}

const MainPagePodoInfoModal = forwardRef(function ({ state, handleCancel }: TypeModalProps, ref) {
  return (
    <div>
      <dialog ref={ref as React.RefObject<HTMLDialogElement>} id="my_modal_1" className="modal p-3 h-auto">
        <div className="modal-box bg-gray w-[300px] ">
          <div className="w-full flex-col flex items-center">
            <img className="w-[100px] aspect-auto" src={state.link}></img>
            <p>
              <span className="font-bold">제목:</span> {state.title}
            </p>
            <p>
              <span className="font-bold">저자:</span> {state.author}
            </p>
            <p>
              <span className="font-bold">상태:</span> {state.status === 'reading' ? '읽는' : state.status} 중
            </p>
            <p>
              <span className="font-bold">설명:</span> {state.description ?? '설명이 없습니다.'}
            </p>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              <button onClick={() => handleCancel()} className="bg-green px-3 py-1 rounded-full hover:bg-green-hover">
                닫기
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
});

export default MainPagePodoInfoModal;
