import React, { useCallback } from 'react';
import {
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

  return (
    <>
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

      {/* Node-like rectangular connection for straight lines */}
      {!controlPoints?.length && (
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
              className="connection-node"
              style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1.5px solid #CBD5E1',
                boxShadow: '0 1.5px 6px #0001',
                minWidth: '120px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                fontFamily: 'inherit',
                fontSize: '13px',
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
              <span>Connection</span>
              <button
                onClick={onEdgeClick}
                style={{
                  background: '#fff',
                  border: '1px solid #dee3f1',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  color: '#4565d6',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 2px #0001',
                  transition: 'all 0.2s ease',
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
      )}

      {/* Label for freeform edges - keep simple delete button */}
      {controlPoints?.length > 0 && (
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
      )}
    </>
  );
}
