import Accordion from 'components/cores/design/Accordion';

export default function PodoDetailModal() {
  // 파라미터로 포도 ID 받아와서 useQuery로 포도의 책정보 포도알 가져오기
  const book: BookType = {
    title: '포도책1',
    author: '포도저자1',
    image: 'https://image.yes24.com/momo/TopCate249/MidCate003/24823257.jpg',
  };

  // tailwind.config.js 에서 미리 적용되있는 폰트 사용해도 적용이 안되고 커스텀도 안되는 문제가 있어요

  const podoInfo: PodoInfoType[] = [
    {
      memory: '포도알1',
      date: '2021-10-10 10:10',
    },
    {
      memory: '포도알2',
      date: '2021-10-10 10:10',
    },
    {
      memory: '포도알3',
      date: '2021-10-10 10:10',
    },
  ];
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="font-semibold ">{book.title}</div>
        <div className="w-[45%] text-lg">
          <img src={book.image} alt="book-image" />
        </div>
        <div>{book.author}</div>
      </div>
      <div>
        {podoInfo.map((info, index) => (
          <Accordion key={index} text={info.memory} number={index + 1} date={info.date} />
        ))}
      </div>
    </div>
  );
}

type BookType = {
  title: string;
  author: string;
  image: string;
};

type PodoInfoType = {
  memory: string;
  date: string;
};
