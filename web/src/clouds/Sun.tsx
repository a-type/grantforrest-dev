import * as React from 'react';
import {
  Vector3,
  DirectionalLightShadow,
  OrthographicCamera,
  Vector2,
} from 'three';
import LightContext from './LightContext';

export type SunProps = {};

const shadow = new DirectionalLightShadow(
  new OrthographicCamera(-50, 50, -50, 50, 0.5, 1000),
);
shadow.camera.left = -100;
shadow.camera.right = 100;
shadow.camera.top = 100;
shadow.camera.bottom = -100;
shadow.camera.far = 1000;
shadow.mapSize = new Vector2(1024, 1024);
shadow.radius = 2;
shadow.bias = 0.5;

export const Sun: React.FC<SunProps> = ({}) => {
  const targetRef = React.useRef();
  const { pointLightPosition, pointLightColor } = React.useContext(
    LightContext,
  );

  return (
    <>
      <directionalLight
        position={pointLightPosition}
        color={pointLightColor}
        intensity={0.2}
        castShadow
        target={targetRef.current}
        shadow={shadow}
      />
      <mesh position={new Vector3(0, 0, 0)} ref={targetRef} />
    </>
  );
};
