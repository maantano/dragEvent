/* eslint-disable @next/next/no-img-element */
import { inrange } from '@/utils';
import registDragEvent from '@/utils/registDragEvent2';
import { useState } from 'react';
import useCarouselSize from './useCarouselSize';

const imageList = [
  'https://i.pinimg.com/564x/bd/7d/c9/bd7dc9ccdd756208ea0fa01adb17e752.jpg',
  'https://i.pinimg.com/236x/c1/d8/63/c1d86316b51ac6c1301ffe3b041e30b9.jpg',
  'https://i.pinimg.com/564x/5f/ef/f6/5feff6e99ea0fc9e7f3f0d0c97e4ba1c.jpg',
  'https://i.pinimg.com/564x/69/72/cc/6972cc0ea4229638a36f7e34abb1114e.jpg',
  'https://i.pinimg.com/564x/8e/9b/de/8e9bdead0c58e466695e89b879c99b7f.jpg',
];

export default function CarouselExample() {
  const [hide, setHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const { ref, width, height } = useCarouselSize();

  return (
    <>
      <div className="p-4">
        <div className="mb-2 whitespace-nowrap">
          <h1 className="text-3xl font-bold">Carousel</h1>
          <span>slide width darg</span>
          <span className="ml-4">current index {currentIndex}</span>
          <span className="ml-4">transX {transX}</span>

          <div className="flex items-center gap-1">
            <label htmlFor="hide">hide overflow</label>
            <input id="hide" type="checkbox" checked={hide} onChange={() => setHide(!hide)} />
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="w-full max-w-sm"
        style={{
          height,
          overflow: hide ? 'hidden' : 'visible',
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${-currentIndex * width + transX}px)`,
            transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
          }}
          {...registDragEvent({
            onDragChange: (deltaX) => {
              setTransX(inrange(deltaX, -width, width));
            },
            onDragEnd: (deltaX) => {
              const maxIndex = imageList.length - 1;
              if (deltaX < -100) setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
              if (deltaX > 100) setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));
              setTransX(0);
            },
          })}
        >
          {imageList.map((url, i) => (
            <div key={i} className="flex-shrink-0">
              <img className="h-full" draggable={false} src={url} alt="img" width={width} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
