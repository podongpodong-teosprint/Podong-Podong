import { IoIosAddCircle } from 'react-icons/io';
import { GoStarFill } from 'react-icons/go';
import { GoStar } from 'react-icons/go';

type TypeBookProps = {
  title: string;
  author: string;
  publisher: string;
  img: string;
};

export default function Book({ title, author, publisher, img }: TypeBookProps) {
  return (
    <div className="flex bg-gray p-5 rounded-lg justify-between items-center w-full">
      <div className="flex">
        <div className="mr-3">
          <img src={img} alt="책 표지" width={50} height={50} />
        </div>
        <div>
          <p>
            제목: <span>{title}</span>
          </p>
          <p>
            저자: <span>{author}</span>
          </p>
          <p>
            출판사: <span>{publisher}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <button>
          <IoIosAddCircle size={24} />
        </button>
        <button>
          <GoStar size={24} />
        </button>
      </div>
    </div>
  );
}
