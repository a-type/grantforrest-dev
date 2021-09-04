import { debounce } from '@util/debounce';
import { quantize } from '@util/math';
import { useEffect } from 'react';
import { config, useSpring } from 'react-spring';

import { useGridSize } from './useGridSize';

export function useScrollSnap() {
  const gridSize = useGridSize();

  const [y, spring] = useSpring(() => ({
    y: typeof window === 'undefined' ? 0 : window.scrollY,
    config: config.stiff,
    onChange: (props: any) => {
      if (typeof window === 'undefined') {
        return;
      }
      window.scroll(0, props.value.y);
    },
  }));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    function quantizeScroll() {
      console.log('quantize');
      spring.start({
        y: quantize(window.scrollY, gridSize, false),
        from: { y: window.scrollY },
      });
    }
    console.log('effect');
    const debounced = debounce(quantizeScroll, 300);
    const onScroll = () => {
      spring.stop();
      debounced();
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [spring, gridSize]);
}
