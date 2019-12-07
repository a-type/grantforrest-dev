import * as React from 'react';
import LightContext from './LightContext';
import { Vector3, Color, PCFSoftShadowMap } from 'three';
import { Canvas } from 'react-three-fiber';
import { Camera } from './Camera';
import { CloudMap } from './CloudMap';
import { Text } from './Text';
import { Sun } from './Sun';
import { NoSsr } from '@material-ui/core';
import { Ray } from './Ray';
import { ColorContextProvider, useColors } from './colorContext';

export type SceneProps = {};

const lightValues = {
  pointLightPosition: new Vector3(100, 100, 0),
  pointLightColor: new Color('#fff'),
  ambientLightColor: new Color('#aaa'),
};

const windVelocity = new Vector3(0.01, 0, 0);

const cameraPosition = [0, 10, 8];

const textPosition = new Vector3(0, 15, -10);

const rays = new Array(4).fill(null).map((_, idx) => {
  const z = idx % 2 === 0 ? 2 : -50;
  const y = 10 + idx;
  return [new Vector3(-100, y, z), new Vector3(100, y, z)];
});

const InnerScene: React.FC<SceneProps> = ({}) => {
  const colors = useColors();
  const lightContext = React.useContext(LightContext);

  return (
    <Canvas
      shadowMap={{ type: PCFSoftShadowMap }}
      style={{ backgroundColor: `#${colors.sky.getHexString()}` }}
    >
      <React.Suspense fallback={null}>
        <Camera position={cameraPosition} />
        <Sun />
        <ambientLight color={lightContext.ambientLightColor} />
        <CloudMap velocity={windVelocity} />
        <Text size={1} position={textPosition}>
          {['Grant', 'Forrest'].join('\n')}
        </Text>
        {rays.map(([start, end], idx) => (
          <Ray start={start} end={end} key={idx} />
        ))}
      </React.Suspense>
    </Canvas>
  );
};

export const Scene: React.FC<SceneProps> = ({}) => {
  return (
    <NoSsr>
      <ColorContextProvider>
        <LightContext.Provider value={lightValues}>
          <InnerScene />
        </LightContext.Provider>
      </ColorContextProvider>
    </NoSsr>
  );
};
