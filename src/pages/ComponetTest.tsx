import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Modal from 'components/cores/design/Modal';
import Accordion from 'components/cores/design/Accordion';
import Book from 'components/cores/design/Book';
import Button from 'components/cores/design/Button';
import Toast from 'components/cores/design/Toast';

function ComponentTest() {

  const [toastMsg, setToastMsg] = useState('서비스 준비중입니다.');
  const [showToast, setShowToast] = useState(false);
  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  }
 
  return (
    <>
      <div className="text-title pt-3 px-3">포동포동</div>
      <div className="text-sub-title px-3">포도송이를 채워보세요!</div>
      <br />
      <br />
      <div className="flex items-center border-2 border-dashed border-gray rounded-full px-3 py-1">
        <FaSearch className="mr-2 " />
        <input type="text" placeholder="책 제목을 입력하세요" className="flex-1 outline-none" />
      </div>
      <Book
        title={'모순'}
        author={'양귀자'}
        publisher={'쓰다'}
        img={'https://image.yes24.com/momo/TopCate249/MidCate003/24823257.jpg'}
      />
      <Button text={'시작하기'} />
      <button onClick={handleToast} style={{background: '#06f'}}>토스트 발생 버튼</button>
      <br />
      {showToast && <Toast msg={toastMsg} />}
      <br />
      <Modal number={1} date={'2024.04.06'} content={'200자 내외 감상평'} />
      <Accordion text={'유저 글자가 20자 미만임'} number={1} date={'2024.04.06'} />
    </>
  );
}

export default ComponentTest;
