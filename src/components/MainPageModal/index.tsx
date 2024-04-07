import Rating from 'components/cores/design/Rating';
import { forwardRef } from 'react';
import { TypeModalState } from './types';

interface TypeModalProps {
  state: TypeModalState;
  handleChange: (type: 'content' | 'density') => (value: string | number) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const MainPageModal = forwardRef(function ({ state, handleChange, handleSave, handleCancel }: TypeModalProps, ref) {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (state.content.length < 200) {
      handleChange('content')(e.target.value);
    }
  };

  const handleRatingChange = (rating: number) => {
    handleChange('density')(rating);
  };

  return (
    <div>
      <dialog ref={ref as React.RefObject<HTMLDialogElement>} id="my_modal_1" className="modal p-3 h-auto">
        <div className="modal-box bg-gray w-[300px] ">
          <h3 className="text-sub-title">{state.number}번째 포도알</h3>
          <textarea
            onChange={handleContentChange}
            value={state.content}
            className="rounded-md w-full h-40 p-2 resize-none px-4 py-2"
            placeholder="200자 내로 적어주세요."
          />
          <div className="text-right text-small">{state.content.length}/200</div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date">날짜</label>
            <input
              readOnly
              className="select-none px-4 pointer-events-none py-2 rounded "
              type="date"
              value={state.date}
            />
          </div>
          <div className="my-4"></div>
          <div className="flex flex-col gap-1">
            <label>농도</label>
            <Rating value={state.density} max={4} onChange={handleRatingChange}></Rating>
          </div>
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
                  handleSave();
                }}
                className="bg-purple px-3 py-1 rounded-full hover:bg-purple-hover"
              >
                저장
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
});

export default MainPageModal;
