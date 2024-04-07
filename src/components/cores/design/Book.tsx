import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { GoStarFill } from 'react-icons/go';
import { GoStar } from 'react-icons/go';

interface TypeBookProps {
  title: string;
  author: string;
  publisher: string;
}

export default function Book({ title, author, publisher }: TypeBookProps) {
  return (
    <div className="flex bg-white p-5 my-3 rounded-lg justify-between items-center w-full">
      <div className="flex">
        <div className="mr-3">
          <img src="https://image.yes24.com/momo/TopCate249/MidCate003/24823257.jpg" alt="" width={50} height={50} />
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
