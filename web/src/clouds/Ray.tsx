import * as React from 'react';
import { Vector3 } from 'three';
import { ReactThreeFiber } from 'react-three-fiber';

export const Ray: React.FC<{ start: Vector3; end: Vector3; color?: ReactThreeFiber.Color }> = ({
  start,
  end,
  color = 'white',
}) => {
  const vertices = [start, end];

  return (
    <line>
      <geometry vertices={vertices} attach="geometry" />
      <lineBasicMaterial attach="material" color={color} />
    </line>
  );
};
