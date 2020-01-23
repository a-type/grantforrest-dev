import * as React from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Vector3, PerspectiveCamera, Quaternion } from 'three';
import { useMove, useDrag, useScroll } from 'react-use-gesture';
import { a, useSpring } from '@react-spring/three';

export type CameraProps = {
  position: number[];
  movementFactor?: number;
};

export const Camera: React.FC<CameraProps> = ({ position }) => {
  const camera = React.useRef<PerspectiveCamera>();
  const { size, setDefaultCamera } = useThree();
  React.useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);
  useFrame(() => {
    camera.current.updateMatrixWorld();
    //camera.current.lookAt(new Vector3(0, 10, 0));
  });

  const [userHasTouched, setUserHasTouched] = React.useState(false);

  React.useEffect(() => {
    const updateTouched = () => {
      setUserHasTouched(true);
    };
    window.addEventListener('touchstart', updateTouched);
    return () => window.removeEventListener('touchstart', updateTouched);
  }, []);

  const [{ currentPosition, currentRotation }, setCameraPosition] = useSpring(() => ({
    currentPosition: position,
    currentRotation: [0, 0, 0],
  }));

  const doCameraDrift = (source: 'move' | 'drag') => ({ xy: [x, y] }: { xy: [number, number] }) => {
    if (typeof window === 'undefined') return;
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

  const bindScroll = useScroll(
    state => {
      const clientHeight = window.document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const totalHeight = window.document.documentElement.scrollHeight;

      const firstMarker = clientHeight / 3;
      const secondMarker = clientHeight * 1.4;

      // first 100% screen height is the flip
      if (scrollPosition < firstMarker) {
        setCameraPosition({
          currentRotation: [(Math.PI / 2) * (scrollPosition / firstMarker), 0, 0],
          currentPosition: position,
        });
      } else if (scrollPosition < secondMarker) {
        setCameraPosition({
          currentRotation: [Math.PI / 2, 0, -Math.PI / 2],
          currentPosition: [position[0], 20, 0],
        });
      } else {
        setCameraPosition({
          currentRotation: [Math.PI * 1.5, 0, -Math.PI / 2],
          currentPosition: [((scrollPosition - secondMarker) / totalHeight) * 50 - 25, 20, 0],
        });
      }
    },
    { domTarget: window },
  );

  React.useEffect(() => {
    // bindMove();
    // bindDrag();
    bindScroll();
  }, [bindDrag, bindMove, bindScroll]);

  return (
    <>
      <a.perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        fov={70}
        position={currentPosition}
        rotation={currentRotation}
      />
    </>
  );
};
