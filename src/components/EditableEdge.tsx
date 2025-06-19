
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

  // Create curved path for the connection line using bezier
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
      {/* Curved connection line */}
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          ...style,
          strokeWidth: 2,
          stroke: '#2563eb',
        }} 
      />

      {/* Connection point - only visible on hover */}
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
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '2px solid #2563eb',
              cursor: 'pointer',
              opacity: 0,
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.borderColor = '#1d4ed8';
              e.currentTarget.style.transform = 'scale(1.3)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0';
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.2)';
            }}
            onClick={onEdgeClick}
            title={`${displayLabel} connection - Click to delete`}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
