
import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  EdgeProps
} from '@xyflow/react';

/**
 * Only supporting controlPoints for clean implementation;
 * If needed, extend here, but keep the interface simple.
 */
interface EditableEdgeData {
  controlPoints?: { x: number; y: number }[];
}

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
}: EdgeProps<EditableEdgeData>) {
  const { setEdges } = useReactFlow();

  const onEdgeClick = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [id, setEdges]);

  let edgePath: string;
  let labelX: number;
  let labelY: number;

  const controlPoints = (data && 'controlPoints' in data) ? data.controlPoints : undefined;

  if (controlPoints && controlPoints.length > 0) {
    const points = [
      { x: sourceX, y: sourceY },
      ...controlPoints,
      { x: targetX, y: targetY },
    ];
    edgePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      edgePath += ` L ${points[i].x} ${points[i].y}`;
    }
    // Optionally: label in the center control point
    const midIndex = Math.floor(points.length / 2);
    labelX = points[midIndex].x;
    labelY = points[midIndex].y;
  } else {
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
          strokeWidth: 2,
          stroke: '#306ACD',
          ...style,
        }}
      />
      {!!controlPoints && controlPoints.map((point, idx) => (
        <circle
          key={idx}
          cx={point.x}
          cy={point.y}
          r={7}
          fill="#fff"
          stroke="#306ACD"
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
              border: '1.5px solid #CBD5E1',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              color: '#306ACD',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0 1px 3px #0001',
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
