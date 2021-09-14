import * as React from 'react';
import { Vector3 } from 'three';

import LightContext from './LightContext';

export type SunProps = {
  visualPosition?: Vector3;
};

export const Sun: React.FC<SunProps> = ({
  visualPosition = new Vector3(-40, 45, -100),
}) => {
  const targetRef = React.useRef();
  const { pointLightPosition, pointLightColor } =
    React.useContext(LightContext);

  return (
    <>
      <directionalLight
        position={pointLightPosition}
        color={pointLightColor}
        intensity={0.2}
        castShadow
        target={targetRef.current}
        onUpdate={(light) => {
          light.shadow.mapSize.width = 2048;
          light.shadow.mapSize.height = 2048;
          light.shadow.camera.left = -100;
          light.shadow.camera.right = 100;
          light.shadow.camera.top = 100;
          light.shadow.camera.bottom = -100;
          light.shadow.radius = 1;
          light.shadow.bias = 0.5;
          light.shadow.needsUpdate = true;
        }}
      />
      <mesh position={new Vector3(0, 0, 0)} ref={targetRef} />
      <mesh position={visualPosition}>
        <sphereBufferGeometry attach="geometry" args={[15, 32, 32]} />
        <meshBasicMaterial color="#fff" attach="material" />
      </mesh>
    </>
  );
};
