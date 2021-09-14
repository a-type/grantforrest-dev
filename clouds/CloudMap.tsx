import * as React from 'react';
import { Vector3 } from 'three';

import { Cloud, CloudProps } from './Cloud';
import { Ground } from './Ground';

const planeSize = 500;
const fieldSize = 100;
const baseFieldSize = [fieldSize, fieldSize] as [number, number];
const cloudHeight = 0;
const cloudMinSize = 500;
const cloudSizeVariance = 200;

export type CloudFieldProps = Omit<
  CloudProps,
  'onExitBoundary' | 'id' | 'initialPosition' | 'boundarySize'
> & {
  numClouds?: number;
};

export const CloudMap: React.FC<CloudFieldProps> = ({
  numClouds = 6,
  ...cloudProps
}) => {
  const size = baseFieldSize;

  const [clouds, setClouds] = React.useState<{ [id: string]: CloudData }>({});

  React.useEffect(() => {
    const initClouds: { [id: string]: CloudData } = {};

    // one cloud always at 0
    const firstId = randomId();
    initClouds[firstId] = {
      id: firstId,
      initialPosition: new Vector3(0, cloudHeight, 0),
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
      {Object.keys(clouds).map((id) => (
        <Cloud
          id={id}
          key={id}
          boundarySize={size}
          initialPosition={clouds[id].initialPosition}
          size={clouds[id].size}
          {...cloudProps}
        />
      ))}
      <Ground planeSize={planeSize} />
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
    cloudHeight,
    Math.random() * boundarySize[1] - boundarySize[1] / 2,
  );

const randomSize = () => Math.random() * cloudSizeVariance + cloudMinSize;
