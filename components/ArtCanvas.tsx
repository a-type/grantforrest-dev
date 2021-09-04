import { useGridSize } from '@hooks/useGridSize';
import { useWindowSize } from '@hooks/useWindowSize';
import { quantize } from '@util/math';
import { Art } from 'art/Art';
import { createContext, HTMLAttributes, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

const ArtCanvasContext = createContext<{
  load: (imgSrc: string) => Promise<void>;
}>({ load: () => Promise.resolve() });

export function useArt() {
  return useContext(ArtCanvasContext);
}

export interface ArtCanvasProps extends HTMLAttributes<HTMLCanvasElement> {}

export function ArtCanvas({ children, ...props }: ArtCanvasProps) {
  const ref = useRef(null);

  const canvasSize = useWindowSize();
  const gridSize = useGridSize();
  const roundedSize = useMemo(
    () => ({
      width: quantize(canvasSize.width, gridSize, true),
      height: quantize(canvasSize.height, gridSize, true),
    }),
    [canvasSize],
  );

  const artRef = useRef<Art>(new Art());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    window.art = artRef.current;
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    artRef.current.draw(ref.current);
  }, [artRef, roundedSize]);

  const load = useCallback(async (imgSrc: string) => {
    if (!ref.current) return;
    await artRef.current?.load(imgSrc);
    artRef.current?.draw(ref.current);
  }, []);

  return (
    <ArtCanvasContext.Provider value={{ load }}>
      <canvas
        ref={ref}
        width={roundedSize.width}
        height={roundedSize.height}
        style={{
          width: roundedSize.width,
          height: roundedSize.height,
          position: 'fixed',
        }}
        {...props}
      />
      {children}
    </ArtCanvasContext.Provider>
  );
}
