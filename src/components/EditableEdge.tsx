import React, { useCallback } from 'react';
import {
  EdgeLabelRenderer,
  useReactFlow,
  EdgeProps,
  BaseEdge,
  getStraightPath,
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

  // Create straight path for the connection line
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {/* Straight connection line */}
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          ...style,
          strokeWidth: 2,
          stroke: '#00d4ff',
          filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.3))',
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
              borderRadius: '2px',
              background: '#1e1e1e',
              border: '2px solid #00d4ff',
              cursor: 'pointer',
              opacity: 0,
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.borderColor = '#0099cc';
              e.currentTarget.style.transform = 'scale(1.3)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0';
              e.currentTarget.style.borderColor = '#00d4ff';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 6px rgba(0, 212, 255, 0.4)';
            }}
            onClick={onEdgeClick}
            title={`${displayLabel} connection - Click to delete`}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}