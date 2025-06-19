
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
        stroke="#000000"
        strokeWidth={2}
        strokeDasharray="8,5"
        d={edgePath}
        style={{
          opacity: 0.6,
        }}
      />
      <rect
        x={toX - 4}
        y={toY - 4}
        width={8}
        height={8}
        fill="#000000"
        stroke="#333333"
        strokeWidth={1}
        rx={4}
        style={{
          opacity: 0.8,
        }}
      />
    </g>
  );
}
