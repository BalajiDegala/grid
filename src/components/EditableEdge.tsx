import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  EdgeProps
} from '@xyflow/react';

// Type for control points, but no generics needed
type ControlPoint = { x: number; y: number };

function getAngle(x1: number, y1: number, x2: number, y2: number) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
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
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const onEdgeClick = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [id, setEdges]);

  let edgePath: string = '';
  let labelX = (sourceX + targetX) / 2;
  let labelY = (sourceY + targetY) / 2;

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
    // STRAIGHT LINE: as a pill-like rectangle with a delete button
    edgePath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    labelX = (sourceX + targetX) / 2;
    labelY = (sourceY + targetY) / 2;
  }

  // Rectangle node settings
  const rectDistance = getDistance(sourceX, sourceY, targetX, targetY);
  const rectMidX = labelX;
  const rectMidY = labelY;
  const rectAngle = getAngle(sourceX, sourceY, targetX, targetY);
  const rectHeight = 24;
  const rectWidth = Math.max(56, rectDistance - 14); // Minimum width, leave some margin

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

      {/* Rectangle pill for straight lines only (not for freeform edges) */}
      {!controlPoints?.length && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `
                translate(-50%, -50%)
                translate(${rectMidX}px, ${rectMidY}px)
                rotate(${rectAngle}deg)
              `,
              width: `${rectWidth}px`,
              height: `${rectHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'all',
              zIndex: 18,
            }}
          >
            <div
              style={{
                background: '#306ACD',
                border: '2px solid #BCD0FB',
                color: '#fff',
                borderRadius: '999px',
                boxShadow: '0 1.5px 11px #2e49882c',
                height: rectHeight,
                width: rectWidth,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'box-shadow 0.18s',
                position: 'relative',
              }}
            >
              {/* Centered delete button - you can also show type or label here */}
              <button
                className="editable-edge-button"
                onClick={onEdgeClick}
                style={{
                  background: '#fff',
                  border: '1.3px solid #dee3f1',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  color: '#4565d6',
                  fontSize: '18px',
                  fontWeight: 600,
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  boxShadow: '0 1px 3px #0001',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                }}
                title="Delete edge"
              >
                ×
              </button>
            </div>
          </div>
        </EdgeLabelRenderer>
      )}

      {/* Label pill for freeform: keep text button at relevant position for freeform */}
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
