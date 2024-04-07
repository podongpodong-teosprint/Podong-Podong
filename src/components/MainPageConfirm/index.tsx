import { forwardRef } from 'react';

export type TypeConfirmState = {
  memoryId: string;
};

interface TypeModalProps {
  state: TypeConfirmState;
  handleConfirm: (memoryId: string) => void;
  handleCancel: () => void;
}

const MainPageConfirm = forwardRef(function ({ state, handleConfirm, handleCancel }: TypeModalProps, ref) {
  return (
    <div>
      <dialog ref={ref as React.RefObject<HTMLDialogElement>} id="my_modal_1" className="modal p-3 h-auto">
        <div className="modal-box bg-gray w-[300px] ">
          <p>삭제 하시겠습니까?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              <button
                onClick={() => {
                  handleCancel();
                }}
                className="bg-green px-3 py-1 rounded-full hover:bg-green-hover"
              >
                취소
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleConfirm(state.memoryId);
                }}
                className="bg-purple px-3 py-1 rounded-full hover:bg-purple-hover"
              >
                삭제
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
});

export default MainPageConfirm;
