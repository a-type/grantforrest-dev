import { createContext } from 'react';
import { Vector3, Color } from 'three';

export default createContext<{
  pointLightPosition: Vector3;
  pointLightColor: Color;
  ambientLightColor: Color;
}>({
  pointLightPosition: new Vector3(0, 100, -40),
  pointLightColor: new Color('#fff'),
  ambientLightColor: new Color('#aaa'),
});
