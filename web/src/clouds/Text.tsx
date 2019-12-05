import * as React from 'react';
import { useLoader, useUpdate, useThree } from 'react-three-fiber';
import { FontLoader, Vector3, Mesh, Color } from 'three';
import { CloudShaderMaterial } from './CloudShaderMaterial';
import { useMediaQuery } from '@material-ui/core';
import { textColor, textShadowColor, textShadowColor2 } from './colors';

const color = new Color(textColor);
const shadowColor = new Color(textShadowColor);
const shadowColor2 = new Color(textShadowColor2);

export type TextProps = {
  children: string;
  size?: number;
  position?: Vector3;
};

export const Text: React.FC<TextProps> = ({ children, size = 1, position = new Vector3() }) => {
  const font = useLoader(FontLoader as any, '/fonts/Poiret One_Regular.json');
  const three = useThree();
  const config = React.useMemo(
    () => ({
      font,
      size: 24,
      height: 1,
      curveSegments: 32,
    }),
    [font],
  );
  const mesh = useUpdate(
    (self: Mesh) => {
      const size = new Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x = -size.x / 2;
      self.position.y = -size.y / 2;

      //self.lookAt(three.camera.position);
      //self.rotation.y = 0;
    },
    [children],
  );

  const isNarrow = useMediaQuery('(max-width: 800px)');

  return (
    <group
      scale={[0.1 * size * (isNarrow ? 0.5 : 1), 0.1 * size * (isNarrow ? 0.5 : 1), 0.1]}
      rotation={[0, 0, 0]}
      position={position}
    >
      <mesh ref={mesh} receiveShadow>
        <textGeometry attach="geometry" args={[children, config] as [string, any]} />
        <CloudShaderMaterial
          attach="material"
          baseColor={color}
          shadeColor1={shadowColor}
          shadeColor2={shadowColor2}
        />
      </mesh>
    </group>
  );
};
