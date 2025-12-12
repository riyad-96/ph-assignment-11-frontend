import { useEffect, useRef, useState } from 'react';

type UseMeasureScreenWidthPropsType = {
  delay?: number;
};

type ScreenSizeType = {
  screenWidth: number;
  screenHeight: number;
};

export default function useWindowSize(
  options: UseMeasureScreenWidthPropsType = {},
) {
  const { delay = 50 } = options;

  if (typeof delay !== 'number')
    throw new Error(
      "Only number is accepted 'useWindowSize' hook configuration: delay",
    );

  const [screenSize, setScreenSize] = useState<ScreenSizeType>({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  });

  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    function updateScreenSize() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(
        () => {
          setScreenSize({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
          });
        },
        Math.max(0, Number(delay)),
      );
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenSize);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [delay]);

  return screenSize;
}
