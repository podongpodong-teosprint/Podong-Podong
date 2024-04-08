import { IoIosAddCircle } from 'react-icons/io';

import { GoStar } from 'react-icons/go';
import { usePodoUploadMutation } from 'apis/podo';
import { TypeBookSchema } from 'apis/book';
import { TypePodoShcema } from 'apis/podo';

export default function Book({
  title,
  authors,
  publisher,
  thumbnail,
  closeModal,
}: TypeBookSchema & { closeModal: () => void }) {
  // const navigate = useNavigate();

  const { mutate: uploadPodo } = usePodoUploadMutation();

  //FIXME: post 요청은 성공, 그러나 제대로 반영되지 않음...
  const handleUploadPodo = ({ title }: Omit<TypePodoShcema, 'podoId'>) => {
    uploadPodo(
      { title },
      {
        onError: () => console.log('error'),
        onSuccess: () => {
          uploadPodo({ title });
          alert('등록되었습니다.');
          closeModal();
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-between w-full p-5 my-3 bg-white rounded-lg">
      <div className="flex">
        <div className="mr-3">
          <img src={thumbnail} alt={title} width={50} />
        </div>
        <div>
          <p>
            제목: <span>{title}</span>
          </p>
          <p>
            저자: <span>{authors.join(', ')}</span>
          </p>
          <p>
            출판사: <span>{publisher}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <button>
          <IoIosAddCircle size={24} onClick={() => handleUploadPodo({ title })} />
        </button>
        <button>
          <GoStar size={24} />
        </button>
      </div>
    </div>
  );
}
