import * as React from 'react';
import Shader from './shaders/CloudShader';
import LightContext from './LightContext';
import { useColors } from './colorContext';
import { Color } from 'three';

export type CloudShaderMaterialProps = {
  attach?: string;
  baseColor?: Color;
  shadeColor1?: Color;
  shadeColor2?: Color;
};

export const CloudShaderMaterial: React.FC<CloudShaderMaterialProps> = ({
  baseColor,
  shadeColor1,
  shadeColor2,
  ...rest
}) => {
  const colors = useColors();

  const { pointLightPosition, pointLightColor, ambientLightColor } = React.useContext(LightContext);

  const shaderArgs = React.useMemo(
    () => ({
      fog: true,
      lights: true,
      dithering: true,
      uniforms: {
        ...Shader.uniforms,
        uDirLightPos: { value: pointLightPosition },
        uDirLightColor: { value: pointLightColor },
        ambientLightColor: { value: ambientLightColor },
        uBaseColor: { value: baseColor || colors.cloudWhite },
        uLineColor1: { value: shadeColor1 || colors.cloudShadow1 },
        uLineColor2: { value: shadeColor2 || colors.cloudShadow2 },
      },
      vertexShader: Shader.vertexShader,
      fragmentShader: Shader.fragmentShader,
    }),
    [
      pointLightColor,
      pointLightPosition,
      ambientLightColor,
      baseColor,
      shadeColor1,
      shadeColor2,
      colors.cloudWhite,
      colors.cloudShadow1,
      colors.cloudShadow2,
    ],
  );

  return <shaderMaterial args={[shaderArgs]} {...rest} />;
};
