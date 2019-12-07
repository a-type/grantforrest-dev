import * as React from 'react';
import LightContext from './LightContext';
import { Vector3, Color, PCFSoftShadowMap } from 'three';
import { sunColor, ambientLightColor, skyColor, rayColor } from './colors';
import { Canvas } from 'react-three-fiber';
import { Camera } from './Camera';
import { CloudMap } from './CloudMap';
import { Text } from './Text';
import { Sun } from './Sun';
import { NoSsr } from '@material-ui/core';
import { Ray } from './Ray';

export type SceneProps = {};

const lightContext = {
  pointLightPosition: new Vector3(100, 100, 0),
  pointLightColor: new Color(sunColor),
  ambientLightColor: new Color(ambientLightColor),
};

const windVelocity = new Vector3(0.01, 0, 0);

const cameraPosition = [0, 10, 8];

const textPosition = new Vector3(0, 15, -10);

const rays = new Array(4).fill(null).map((_, idx) => {
  const z = idx % 2 === 0 ? 2 : -50;
  const y = 10 + idx;
  return [new Vector3(-100, y, z), new Vector3(100, y, z)];
});

export const Scene: React.FC<SceneProps> = ({}) => {
  return (
    <NoSsr>
      <LightContext.Provider value={lightContext}>
        <Canvas shadowMap={{ type: PCFSoftShadowMap }} style={{ backgroundColor: skyColor }}>
          <React.Suspense fallback={null}>
            <Camera position={cameraPosition} />
            <Sun />
            <ambientLight color={lightContext.ambientLightColor} />
            <CloudMap velocity={windVelocity} />
            <Text size={1} position={textPosition}>
              {['Grant', 'Forrest'].join('\n')}
            </Text>
            {rays.map(([start, end], idx) => (
              <Ray start={start} end={end} key={idx} color={rayColor} />
            ))}
          </React.Suspense>
        </Canvas>
      </LightContext.Provider>
    </NoSsr>
  );
};
