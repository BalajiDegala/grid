
import React from 'react';
import { ConnectionLineComponentProps, getBezierPath } from '@xyflow/react';

export default function CustomConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition,
  toPosition,
}: ConnectionLineComponentProps) {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#32e6e2"
        strokeWidth={3}
        strokeDasharray="10,5"
        d={edgePath}
        style={{
          filter: 'drop-shadow(0 0 6px #32e6e2)',
          animation: 'dash 1s linear infinite',
        }}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#32e6e2"
        r={4}
        stroke="#184656"
        strokeWidth={2}
        style={{
          filter: 'drop-shadow(0 0 4px #32e6e2)',
        }}
      />
    </g>
  );
}
