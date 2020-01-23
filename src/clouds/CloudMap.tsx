import * as React from 'react';
import { CloudProps, Cloud } from './Cloud';
import { Vector3 } from 'three';
import { CloudShaderMaterial } from './CloudShaderMaterial';
import { useColors } from './colorContext';
import useWindowSize from '../lib/useWindowSize';

const planeSize = 1000;
const baseFieldSize = [400, 25];

export type CloudFieldProps = Omit<
  CloudProps,
  'onExitBoundary' | 'id' | 'initialPosition' | 'boundarySize'
> & {
  numClouds?: number;
};

export const CloudMap: React.FC<CloudFieldProps> = ({ numClouds = 2, ...cloudProps }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const aspectRatio = windowWidth / windowHeight;
  const fieldWidth = baseFieldSize[0] * (aspectRatio / (16.0 / 9));
  const size: [number, number] = [fieldWidth, baseFieldSize[1]];

  const colors = useColors();
  const [clouds, setClouds] = React.useState<{ [id: string]: CloudData }>({});

  React.useEffect(() => {
    const initClouds: { [id: string]: CloudData } = {};

    // one cloud always at 0
    const firstId = randomId();
    initClouds[firstId] = {
      id: firstId,
      initialPosition: new Vector3(0, 0, -size[1] / 2),
      size: randomSize(),
    };

    for (let i = 0; i < numClouds - 1; i++) {
      const id = randomId();
      initClouds[id] = {
        id,
        initialPosition: randomPosition(size),
        size: randomSize(),
      };
    }
    setClouds(initClouds);
  }, [size[0], size[1]]);

  return (
    <>
      {Object.keys(clouds).map(id => (
        <Cloud
          id={id}
          key={id}
          boundarySize={size}
          initialPosition={clouds[id].initialPosition}
          size={clouds[id].size}
          {...cloudProps}
        />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[planeSize, planeSize]} attach="geometry" />
        <CloudShaderMaterial
          attach="material"
          baseColor={colors.ground}
          shadeColor1={colors.groundShadow}
        />
      </mesh>
    </>
  );
};

type CloudData = {
  id: string;
  initialPosition: Vector3;
  size: number;
};

const randomId = () => `${Math.random() * 10000000}`;

const randomPosition = (boundarySize: [number, number]) =>
  new Vector3(
    Math.random() * boundarySize[0] - boundarySize[0] / 2,
    0,
    Math.random() * (boundarySize[1] / 8) - boundarySize[1] / 2,
  );

const randomSize = () => Math.random() * 424 + 420;
