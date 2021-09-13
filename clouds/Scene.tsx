import { Canvas } from '@react-three/fiber';
import { Suspense, useContext } from 'react';
import { Color, PCFSoftShadowMap, Vector3 } from 'three';

import { Camera } from './Camera';
import { CloudMap } from './CloudMap';
import { ColorContextProvider, useColors } from './colorContext';
import LightContext from './LightContext';
import { Ray } from './Ray';
import { Sun } from './Sun';

export type SceneProps = {
  style?: any;
};

const lightValues = {
  pointLightPosition: new Vector3(100, 100, 0),
  pointLightColor: new Color('#fff'),
  ambientLightColor: new Color('#aaa'),
};

const windVelocity = new Vector3(0.006, 0, 0);

const cameraPosition = [32, 58, 18];

const rays = new Array(4).fill(null).map((_, idx) => {
  const z = idx % 2 === 0 ? 2 : -50;
  const y = 10 + idx;
  return [new Vector3(-100, y, z), new Vector3(100, y, z)];
});

const isSsr = typeof window === 'undefined';

const resolution = () =>
  !isSsr
    ? window.document.documentElement.clientHeight *
      window.document.documentElement.clientWidth
    : 0;
const initialResolution = resolution();
const defaultPixelRatio =
  initialResolution > 500000
    ? initialResolution > 1000000
      ? 0.5
      : 0.75
    : !isSsr
    ? window.devicePixelRatio
    : 0;

const InnerScene: React.FC<SceneProps> = ({ style }) => {
  const colors = useColors();
  const lightContext = useContext(LightContext);

  return (
    <Canvas
      shadows={{ type: PCFSoftShadowMap }}
      style={{ backgroundColor: `#${colors.sky.getHexString()}`, ...style }}
      dpr={defaultPixelRatio}
    >
      <Suspense fallback={null}>
        <Camera position={cameraPosition} />
        <Sun />
        <ambientLight color={lightContext.ambientLightColor} />
        <CloudMap velocity={windVelocity} />
        {rays.map(([start, end], idx) => (
          <Ray start={start} end={end} key={idx} />
        ))}
      </Suspense>
    </Canvas>
  );
};

export const Scene: React.FC<SceneProps> = (props) => {
  return (
    <ColorContextProvider>
      <LightContext.Provider value={lightValues}>
        <InnerScene {...props} />
      </LightContext.Provider>
    </ColorContextProvider>
  );
};

export default Scene;
