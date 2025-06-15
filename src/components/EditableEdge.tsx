
import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  Edge,
  EdgeProps,
  Position,
} from '@xyflow/react';

export type EditableEdgeData = {
  controlPoints?: { x: number; y: number }[];
};

export default function EditableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps<EditableEdgeData>) {
  const { setEdges } = useReactFlow();

  const onEdgeClick = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [id, setEdges]);

  // If we have control points, use them to create a custom path
  let edgePath: string;
  let labelX: number;
  let labelY: number;

  if (data?.controlPoints && data.controlPoints.length > 0) {
    // Create a custom path with control points
    const points = [
      { x: sourceX, y: sourceY },
      ...data.controlPoints,
      { x: targetX, y: targetY },
    ];
    
    // Create SVG path string
    edgePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      if (i === points.length - 1) {
        edgePath += ` L ${points[i].x} ${points[i].y}`;
      } else {
        // Use quadratic bezier curves between points
        const cp = points[i];
        const next = points[i + 1];
        edgePath += ` Q ${cp.x} ${cp.y} ${(cp.x + next.x) / 2} ${(cp.y + next.y) / 2}`;
      }
    }
    
    // Calculate label position (middle of the path)
    const midIndex = Math.floor(points.length / 2);
    labelX = points[midIndex].x;
    labelY = points[midIndex].y;
  } else {
    // Use default bezier path
    [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  }

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          strokeWidth: 3,
          stroke: '#32e6e2',
          filter: 'drop-shadow(0 0 6px #32e6e2)',
          ...style,
        }} 
      />
      
      {/* Render control points as draggable handles */}
      {data?.controlPoints?.map((point, index) => (
        <circle
          key={`control-${index}`}
          cx={point.x}
          cy={point.y}
          r={6}
          fill="#32e6e2"
          stroke="#184656"
          strokeWidth={2}
          className="editable-edge-control-point"
          style={{
            cursor: 'grab',
            filter: 'drop-shadow(0 0 4px #32e6e2)',
          }}
        />
      ))}
      
      <EdgeLabelRenderer>
        <div
          className="editable-edge-label nodrag nopan"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <button 
            className="editable-edge-button"
            onClick={onEdgeClick}
            style={{
              background: '#32e6e2',
              border: '2px solid #184656',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              color: '#000',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 0 8px #32e6e2',
            }}
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
