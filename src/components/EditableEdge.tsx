
import React, { useCallback } from 'react';
import {
  EdgeLabelRenderer,
  useReactFlow,
  EdgeProps,
  BaseEdge,
  getBezierPath,
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

  let labelX = (sourceX + targetX) / 2;
  let labelY = (sourceY + targetY) / 2;

  const controlPoints: ControlPoint[] | undefined = Array.isArray((data as any)?.controlPoints)
    ? (data as any).controlPoints
    : undefined;

  if (controlPoints && controlPoints.length > 0) {
    // For freeform edges, place label at the center control point if possible
    const midIndex = Math.floor(controlPoints.length / 2);
    labelX = controlPoints[midIndex]?.x || labelX;
    labelY = controlPoints[midIndex]?.y || labelY;
  }

  // Get the connection kind from data
  const connectionKind = (data as any)?.kind || 'connection';
  const displayLabel = connectionKind.charAt(0).toUpperCase() + connectionKind.slice(1);

  // Create the bezier path for the connection line
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Connection line */}
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

      {/* Control points for freeform edges */}
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

      {/* Node-like connection label */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
            zIndex: 18,
          }}
        >
          <div
            className="connection-label-node"
            style={{
              background: '#fff',
              borderRadius: '8px',
              border: '1.5px solid #CBD5E1',
              boxShadow: '0 1.5px 6px #0001',
              minWidth: '90px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              fontFamily: 'inherit',
              fontSize: '12px',
              fontWeight: '500',
              color: '#31518a',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f7fd';
              e.currentTarget.style.borderColor = '#306ACD';
              e.currentTarget.style.color = '#19398a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.color = '#31518a';
            }}
          >
            <span>{displayLabel}</span>
            <button
              onClick={onEdgeClick}
              style={{
                background: '#fff',
                border: '1px solid #dee3f1',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                color: '#4565d6',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px #0001',
                transition: 'all 0.2s ease',
                marginLeft: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e0e7ef';
                e.currentTarget.style.boxShadow = '0 2px 4px #306acd34';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.boxShadow = '0 1px 2px #0001';
              }}
              title="Delete connection"
            >
              ×
            </button>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
