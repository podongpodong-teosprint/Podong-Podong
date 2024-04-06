import React, { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Modal from 'components/cores/design/Modal';
import Accordion from 'components/cores/design/Accordion';
import Book from 'components/cores/design/Book';
import Button from 'components/cores/design/Button';

function ComponentTest() {
  return (
    <div className="flex justify-center bg-gray h-screen w-screen">
      <div className="bg-white h-screen p-2" style={{ width: '375px' }}>
        <div className="text-title pt-3 px-3">포동포동</div>
        <div className="text-sub-title px-3">포도송이를 채워보세요!</div>
        <br />
        <br />
        <div className="flex items-center border-2 border-dashed border-gray rounded-full px-3 py-1 w-full">
          <FaSearch className="mr-2 " />
          <input type="text" placeholder="책 제목을 입력하세요" className="flex-1 outline-none" />
        </div>
        <Book />
        <Button text={'시작하기'} />
        <br />
        <Modal />
        <Accordion />
        <Accordion />
      </div>
    </div>
  );
}

export default ComponentTest;
