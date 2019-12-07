import * as React from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Vector3, PerspectiveCamera } from 'three';
import { useMove, useDrag } from 'react-use-gesture';
import { a, useSpring } from '@react-spring/three';

export type CameraProps = {
  position: number[];
  movementFactor?: number;
};

export const Camera: React.FC<CameraProps> = ({ position, movementFactor = 0.002 }) => {
  const camera = React.useRef<PerspectiveCamera>();
  const { size, setDefaultCamera } = useThree();
  React.useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);
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

  const [{ currentPosition }, setCameraPosition] = useSpring(() => ({
    currentPosition: position,
  }));

  const doCameraDrift = (source: 'move' | 'drag') => ({ xy: [x, y] }: { xy: [number, number] }) => {
    if ((source === 'drag' && !userHasTouched) || (source === 'move' && userHasTouched)) return;

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
    //camera.current.lookAt(new Vector3(0, 0, 0));
  };

  const bindMove = useMove(doCameraDrift('move'), { domTarget: window });
  const bindDrag = useDrag(doCameraDrift('drag'), { domTarget: window });

  React.useEffect(() => {
    bindMove();
    bindDrag();
  }, [bindDrag, bindMove]);

  return (
    <>
      <a.perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        fov={70}
        position={currentPosition}
      />
    </>
  );
};
