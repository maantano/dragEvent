import DNDMatchExample from '@/components/dnd/DNDMatchExample';
import DomExample from '@/components/drag/DomExample';
import DragBouceExample from '@/components/drag/DragBouceExample';
import DragExample from '@/components/drag/DragExample';
import { useState } from 'react';

export default function HomePage() {
  const [main, setMain] = useState<boolean>(false);
  return (
    <div>
      <DomExample />
      <DragExample />
      <DragBouceExample />
    </div>
  );
}
