import * as React from 'react';
import { CloudProps, Cloud } from './Cloud';
import { Vector3, Color } from 'three';
import { CloudShaderMaterial } from './CloudShaderMaterial';
import { groundColor1, groundShadowColor } from './colors';

const planeSize = 1000;

const groundColor = new Color(groundColor1);
const shadowColor = new Color(groundShadowColor);

export type CloudFieldProps = Omit<
  CloudProps,
  'onExitBoundary' | 'id' | 'initialPosition' | 'boundarySize'
> & {
  size?: number;
  numClouds?: number;
};

export const CloudMap: React.FC<CloudFieldProps> = ({
  size = 120,
  numClouds = 6,
  ...cloudProps
}) => {
  const [clouds, setClouds] = React.useState<{ [id: string]: CloudData }>({});

  React.useEffect(() => {
    const initClouds: { [id: string]: CloudData } = {};

    // one cloud always at 0
    const firstId = randomId();
    initClouds[firstId] = {
      id: firstId,
      initialPosition: new Vector3(0, 0, 0),
      size: randomSize(),
    };

    for (let i = 0; i < numClouds; i++) {
      const id = randomId();
      initClouds[id] = {
        id,
        initialPosition: randomPosition(size),
        size: randomSize(),
      };
    }
    setClouds(initClouds);
  }, [size]);

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
          baseColor={groundColor}
          shadeColor1={shadowColor}
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

const randomPosition = (boundarySize: number) =>
  new Vector3(
    Math.random() * boundarySize - boundarySize / 2,
    0,
    Math.random() * boundarySize - boundarySize / 2,
  );

const randomSize = () => Math.random() * 424 + 380;
