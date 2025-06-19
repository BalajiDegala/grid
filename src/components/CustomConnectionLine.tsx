import React from 'react';
import { ConnectionLineComponentProps, getStraightPath } from '@xyflow/react';

export default function CustomConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#00d4ff"
        strokeWidth={2}
        strokeDasharray="8,5"
        d={edgePath}
        style={{
          filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.5))',
        }}
      />
      <rect
        x={toX - 4}
        y={toY - 4}
        width={8}
        height={8}
        fill="#00d4ff"
        stroke="#0099cc"
        strokeWidth={1}
        style={{
          filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.6))',
        }}
      />
    </g>
  );
}