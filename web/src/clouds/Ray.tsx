import * as React from 'react';
import { Vector3 } from 'three';
import { useColors } from './colorContext';

export const Ray: React.FC<{ start: Vector3; end: Vector3 }> = ({ start, end }) => {
  const vertices = [start, end];
  const colors = useColors();

  return (
    <line>
      <geometry vertices={vertices} attach="geometry" />
      <lineBasicMaterial attach="material" color={colors.ray} />
    </line>
  );
};
