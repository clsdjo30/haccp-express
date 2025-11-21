import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path, Rect } from 'react-native-svg';

export const QrCode = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x={3}
      y={3}
      width={8}
      height={8}
      rx={1}
      stroke={color}
      strokeWidth={2}
    />
    <Rect
      x={3}
      y={13}
      width={8}
      height={8}
      rx={1}
      stroke={color}
      strokeWidth={2}
    />
    <Rect
      x={13}
      y={3}
      width={8}
      height={8}
      rx={1}
      stroke={color}
      strokeWidth={2}
    />
    <Path d="M13 13h3v3h-3z" fill={color} />
    <Path d="M13 19h3v2h-3z" fill={color} />
    <Path d="M19 13h2v3h-2z" fill={color} />
    <Path d="M19 19h2v2h-2z" fill={color} />
  </Svg>
);
