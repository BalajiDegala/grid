
import React, { useCallback } from 'react';
import {
  EdgeLabelRenderer,
  useReactFlow,
  EdgeProps,
  BaseEdge,
  getBezierPath,
} from '@xyflow/react';

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

  const labelX = (sourceX + targetX) / 2;
  const labelY = (sourceY + targetY) / 2;

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
      {/* Clean connection line */}
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          ...style,
          strokeWidth: 1.5,
          stroke: '#CBD5E1',
        }} 
      />

      {/* Minimal connection point - only visible on hover */}
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
            className="connection-point"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#fff',
              border: '2px solid #CBD5E1',
              cursor: 'pointer',
              opacity: 0,
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.borderColor = '#306ACD';
              e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0';
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={onEdgeClick}
            title={`${displayLabel} connection - Click to delete`}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
