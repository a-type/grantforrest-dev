import * as React from 'react';
import { useThree, useFrame, extend } from 'react-three-fiber';
import { Vector3, PerspectiveCamera } from 'three';
import { useScroll } from 'react-use-gesture';
import { a } from '@react-spring/three';

export type CameraProps = {
  position: number[];
  movementFactor?: number;
};

export const Camera: React.FC<CameraProps> = ({ position, movementFactor = 25 }) => {
  const camera = React.useRef<PerspectiveCamera>();
  const { size, setDefaultCamera } = useThree();
  React.useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);
  useFrame(() => {
    // camera.current.updateMatrixWorld();
    camera.current.lookAt(new Vector3(0, camera.current.position.y, 0));
  });

  const bind = useScroll(
    ({ xy }) => {
      const scrollHeight = document.body.scrollHeight;
      camera.current.position.y = position[1] - (movementFactor * xy[1]) / scrollHeight;
      camera.current.position.z = position[2] + (movementFactor * 2 * xy[1]) / scrollHeight;
    },
    { domTarget: window },
  );
  React.useEffect(() => {
    bind();
  }, [bind]);

  return (
    <>
      <a.perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        fov={70}
        position={position}
        // onUpdate={(self: PerspectiveCamera) => {
        //   self.updateProjectionMatrix();
        //   self.lookAt(new Vector3(0, 2, 0));
        // }}
      />
    </>
  );
};
