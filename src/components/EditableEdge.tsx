import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  EdgeProps
} from '@xyflow/react';

// Type for control points, but no generics needed
type ControlPoint = { x: number; y: number };

export default function EditableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
  style = {},
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const onEdgeClick = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [id, setEdges]);

  let edgePath: string = '';
  let labelX = (sourceX + targetX) / 2;
  let labelY = (sourceY + targetY) / 2;

  // Make sure controlPoints is actually an array of points
  const controlPoints: ControlPoint[] | undefined = Array.isArray((data as any)?.controlPoints)
    ? (data as any).controlPoints
    : undefined;

  if (controlPoints && controlPoints.length > 0) {
    // Freeform: draw polyline through control points
    const points = [
      { x: sourceX, y: sourceY },
      ...controlPoints,
      { x: targetX, y: targetY },
    ];
    edgePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      edgePath += ` L ${points[i].x} ${points[i].y}`;
    }
    // Place label at the center control point if possible
    const midIndex = Math.floor(points.length / 2);
    labelX = points[midIndex].x;
    labelY = points[midIndex].y;
  } else {
    // STRAIGHT LINE: draw simple SVG line between source and target
    edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    labelX = (sourceX + targetX) / 2;
    labelY = (sourceY + targetY) / 2;
  }

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          strokeWidth: 2,
          stroke: '#4E6CF3',
          ...style,
        }}
      />
      {controlPoints?.map((point, idx) => (
        <circle
          key={idx}
          cx={point.x}
          cy={point.y}
          r={7}
          fill="#fff"
          stroke="#4E6CF3"
          strokeWidth={2}
          className="editable-edge-control-point"
          style={{
            cursor: 'grab',
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
              background: '#fff',
              border: '1.2px solid #dee3f1',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              color: '#4565d6',
              fontSize: '18px',
              fontWeight: 600,
              boxShadow: '0 1px 2px #0001',
            }}
            title="Delete edge"
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
