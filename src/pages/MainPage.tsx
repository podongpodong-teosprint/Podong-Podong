import { TypeMemorySchema, useMemoryDeleteMutation, useMemoryQuery, useMemoryUploadMutation } from 'apis/memory';
import { useMainPodoQuery, useMainRegisterMutation } from 'apis/user';
import Accordion from 'components/MainPageAccordion';
import MainPageConfirm, { TypeConfirmState } from 'components/MainPageConfirm';
import MainPageModal from 'components/MainPageModal';
import { TypeModalState } from 'components/MainPageModal/types';
import Progressbar from 'components/Progressbar';
import Dropdown from 'components/cores/design/Dropdown';
import Loading from 'components/cores/design/Loading';
import Podo from 'components/podo';
import { useToday } from 'hooks/useToday';
import { PiStampBold } from 'react-icons/pi';
import { IoMdWarning } from 'react-icons/io';
import { useCallback, useMemo, useRef, useState } from 'react';
import MainPagePodoInfoModal from 'components/MainPagePodoInfoModal';

type TypeSort = 'latest' | 'density';
type TypeCmpFunc = (a: TypeMemorySchema, b: TypeMemorySchema) => number;

const emptyPodo = Array.from({ length: 16 }, (_, i) => ({ density: (i % 4) + 1 }));

export default function MainPage() {
  const INITIAL_MODAL_STATE = {
    memoryId: '0',
    memory: '',
    density: 0,
    date: useToday(),
  };
  const { data: mainPodo, refetch: mainPodoRefetch } = useMainPodoQuery();
  const [sortType, setSortType] = useState<TypeSort>('latest');
  const [confirmState, setConfirmState] = useState<TypeConfirmState>();
  const [modalState, setModalState] = useState<TypeModalState>(INITIAL_MODAL_STATE);
  const {
    data: memories,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useMemoryQuery(mainPodo?.podoId ?? '0', !!mainPodo);

  const { mutate: uploadMemory } = useMemoryUploadMutation();
  const { mutate: deleteMemory } = useMemoryDeleteMutation();
  const { mutate: registerMainPodo } = useMainRegisterMutation();

  const cmpFuncByType = useCallback((type: TypeSort): TypeCmpFunc => {
    return function (a: TypeMemorySchema, b: TypeMemorySchema) {
      if (type === 'latest') {
        return Number(a.memoryId) < Number(b.memoryId) ? 1 : -1;
      } else if (type === 'density') {
        return a.density < b.density ? 1 : -1;
      } else {
        return 0;
      }
    };
  }, []);

  const memoizedMemories = useMemo(() => {
    return !isSuccess ? [] : Object.values(memories);
  }, [isSuccess, memories]);

  const sortedMemories = useMemo(() => {
    return memoizedMemories.sort(cmpFuncByType(sortType));
  }, [cmpFuncByType, memoizedMemories, sortType]);

  const modalRef = useRef<{ showModal: () => void; close: () => void }>(null);
  const confirmRef = useRef<{ showModal: () => void; close: () => void }>(null);
  const podoinfoRef = useRef<{ showModal: () => void; close: () => void }>(null);

  const openPodoInfoModal = () => {
    if (podoinfoRef && podoinfoRef.current) {
      podoinfoRef.current.showModal();
    }
  };

  const handleCancelPodoInfoModal = () => {
    if (podoinfoRef && podoinfoRef.current) {
      podoinfoRef.current.close();
    }
  };

  const closeModal = () => {
    if (modalRef && modalRef.current) {
      setModalState(INITIAL_MODAL_STATE);
      modalRef.current.close();
    }
  };

  const handleModalChange = (type: 'memory' | 'density') => (value: string | number) => {
    setModalState((prev) => ({ ...prev, [type]: value }));
  };
  const handleSave = () => {
    uploadMemory(
      { ...modalState, bookId: '1' },
      {
        onSuccess: () => {
          refetch();
          closeModal();
        },
      }
    );
  };

  const closeConfirm = () => {
    if (confirmRef && confirmRef.current) {
      confirmRef.current.close();
    }
  };

  const handleConfirm = (memoryId: string) => {
    deleteMemory(
      { memoryId, bookId: '1' },
      {
        onSuccess: () => {
          refetch();
          closeConfirm();
        },
      }
    );
  };

  const handleDelete = (memoryId: string) => {
    confirmRef.current?.showModal();
    setConfirmState((prev) => ({ ...prev, memoryId }));
  };

  const openModal = (memoryId: string) => {
    const foundMemory = memoizedMemories.find((memory) => memory.memoryId === memoryId);
    const memory = foundMemory
      ? { memoryId: memoryId, memory: foundMemory?.memory, density: foundMemory?.density, date: foundMemory?.date }
      : { ...INITIAL_MODAL_STATE, memoryId: memoryId };
    setModalState(memory);
    if (modalRef && modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="flex flex-col relative">
      {/* 참잘했어요 */}
      {mainPodo &&
        (mainPodo.status === 'completed' ? (
          <img className="absolute right-2 top-2 w-[78px] h-[75px]" src={'/ic_you_did_good_job.png'}></img>
        ) : (
          <div className=" w-14 h-14 absolute flex flex-col items-center justify-center bg-purple rounded-full p-2 right-5 top-5">
            <PiStampBold size={20} />
            <div>완료</div>
          </div>
        ))}

      <button className="p-4 bg-purple" onClick={() => registerMainPodo('1')}>
        1번 메인포도로 등록하기
      </button>
      <button onClick={() => mainPodoRefetch()}>메인포도 가져오기</button>

      <div className="flex w-full flex-col items-center relative border-2 border-dashed border-purple rounded">
        {mainPodo && (
          <h1
            onClick={() => openPodoInfoModal()}
            className="cursor-pointer hover:bg-gray rounded px-2 py-1 font-bold text-2xl self-start ml-2 mt-2"
          >
            제목 : {mainPodo?.title}
          </h1>
        )}
        {mainPodo && <Podo memories={memories ?? []} onClick={(memoryId) => openModal(memoryId)} />}
        {!mainPodo && (
          <>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-purple/90 w-[200px] h-[200px] rounded-full flex justify-center items-center hover:scale-95 active:scale-90 transition-all cursor-pointer">
              새로운 포도를 등록하세요!
            </div>
            <Podo memories={emptyPodo} onClick={() => {}} />
          </>
        )}
      </div>

      <div className="flex flex-col mt-1 gap-2">
        <p className="w-full text-right">
          16알 중 <span className="text-purple-hover font-bold text-xl">{memoizedMemories.length}</span>알 모으는중!
        </p>
        <Progressbar value={memoizedMemories.length} maxValue={16} label={false}></Progressbar>
      </div>

      <div className="w-full h-[1px] bg-gray mt-3 mb-2"></div>
      <div className="w-full flex justify-between items-center pl-1 mb-1">
        <p>글귀 목록</p>
        <Dropdown
          onClick={(item) => setSortType(item.value as TypeSort)}
          items={[
            { label: '최신순', value: 'latest' },
            { label: '농도순', value: 'density' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        {isLoading && <Loading />}
        {isError && <div>Error..</div>}
        {sortedMemories.length === 0 && (
          <div className="w-full flex gap-1 items-center justify-center h-full p-4 bg-purple rounded">
            <IoMdWarning />
            <p>아직 등록된 글귀가 없습니다!</p>
          </div>
        )}
        {isSuccess &&
          sortedMemories.map((memory) => (
            <Accordion
              key={`memory-${memory.memoryId}`}
              date={memory.date}
              number={Number(memory.memoryId)}
              text={memory.memory}
              handleUpdate={() => openModal(memory.memoryId)}
              handleDelete={() => handleDelete(memory.memoryId)}
            />
          ))}
      </div>
      <MainPageModal
        ref={modalRef}
        state={modalState}
        handleChange={handleModalChange}
        handleSave={handleSave}
        handleCancel={closeModal}
      />
      {confirmState && (
        <MainPageConfirm ref={confirmRef} state={confirmState} handleConfirm={handleConfirm} handleCancel={() => {}} />
      )}
      {mainPodo && (
        <MainPagePodoInfoModal ref={podoinfoRef} state={mainPodo} handleCancel={handleCancelPodoInfoModal} />
      )}
    </div>
  );
}
