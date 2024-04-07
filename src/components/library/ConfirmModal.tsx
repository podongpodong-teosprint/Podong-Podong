import { useMainRegisterMutation } from 'apis/user';
import { useNavigate } from 'react-router-dom';

type refProps = {
  modalRef: React.RefObject<HTMLDialogElement>;
  param: string;
};
export default function ConfirmModal({ modalRef, param }: refProps) {
  const navigate = useNavigate();
  // <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
  const { mutate: registerPodo } = useMainRegisterMutation();

  const handleRegisterPodo = (podoId: string) => {
    registerPodo(podoId, {
      onError: () => console.log('error'),
      onSuccess: () => {
        registerPodo(podoId);
        navigate('/main');
      },
    });
  };
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close(); // 모달을 닫는다
    }
  };

  return (
    <div>
      <dialog
        ref={modalRef}
        id="my_modal_1"
        className=" w-[200px] h-[200px] p-3 bg-white modal rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="modal-action">
          <form method="dialog" className="flex flex-col gap-3">
            <button
              className="px-4 py-2 rounded-full bg-green hover:bg-green-hover"
              onClick={() => navigate(`/library/${param}`)}
            >
              상세 포도 조회
            </button>
            <button
              className="px-4 py-2 rounded-full bg-purple hover:bg-purple-hover"
              // onClick={() => mutate(param)}
              onClick={() => handleRegisterPodo(param)}
            >
              메인 포도 등록
            </button>
            <button onClick={closeModal}>x</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
