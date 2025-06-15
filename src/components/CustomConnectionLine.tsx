
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
        stroke="#306ACD"
        strokeWidth={2}
        strokeDasharray="8,5"
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#3050CD"
        r={4}
      />
    </g>
  );
}
