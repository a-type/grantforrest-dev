import { a, useSpring } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
import * as React from 'react';
import { useDrag, useMove } from 'react-use-gesture';
import { Euler, PerspectiveCamera, Vector3 } from 'three';

export type CameraProps = {
  position: number[];
  movementFactor?: number;
};

export const Camera: React.FC<CameraProps> = ({ position }) => {
  const camera = React.useRef<PerspectiveCamera>();
  const { size, set } = useThree();
  React.useEffect(() => void set({ camera: camera.current }), [set, camera]);
  useFrame(() => {
    camera.current.updateMatrixWorld();
    camera.current.lookAt(new Vector3(0, 10, 0));
  });

  const [userHasTouched, setUserHasTouched] = React.useState(false);

  React.useEffect(() => {
    const updateTouched = () => {
      setUserHasTouched(true);
    };
    window.addEventListener('touchstart', updateTouched);
    return () => window.removeEventListener('touchstart', updateTouched);
  }, []);

  const [{ currentPosition, currentRotation }, setCameraPosition] = useSpring(
    () => ({
      currentPosition: position as [number, number, number],
      currentRotation: new Euler(0, 0, 0),
    }),
  );

  const doCameraDrift =
    (source: 'move' | 'drag') =>
    ({ xy: [x, y] }: { xy: [number, number] }) => {
      if (typeof window === 'undefined') return;
      if (
        (source === 'drag' && !userHasTouched) ||
        (source === 'move' && userHasTouched)
      )
        return;

      const allowedDragLimit = 5;
      const viewportHeight = document.body.clientHeight;
      const viewportWidth = document.body.clientWidth;

      const normalizedX = (x - viewportWidth / 2) / viewportWidth;
      const normalizedY = (y - viewportHeight / 2) / viewportHeight;

      setCameraPosition({
        currentPosition: [
          position[0] + normalizedX * allowedDragLimit,
          position[1] - normalizedY * normalizedY * allowedDragLimit,
          position[2],
        ],
      });
    };

  useMove(doCameraDrift('move'), { domTarget: window });
  useDrag(doCameraDrift('drag'), { domTarget: window });

  return (
    <a.perspectiveCamera
      ref={camera}
      aspect={size.width / size.height}
      fov={70}
      position={currentPosition}
      rotation={currentRotation}
    />
  );
};
