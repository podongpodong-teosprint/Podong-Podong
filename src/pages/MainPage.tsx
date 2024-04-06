import { useMemoryQuery } from 'apis/memory';
import Podo from 'components/podo';

export default function MainPage() {
  const { data: memories } = useMemoryQuery('1');

  return (
    <div>
      <Podo memories={memories ?? []}></Podo>
    </div>
  );
}
