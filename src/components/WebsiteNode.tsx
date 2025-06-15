
import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface WebsiteNodeProps {
  data: {
    label: string;
    url: string;
  };
}

export default function WebsiteNode({ data }: WebsiteNodeProps) {
  const handleClick = () => {
    window.open(data.url, '_blank');
  };

  return (
    <div className="website-node" onClick={handleClick}>
      <Handle type="target" position={Position.Top} className="neon-handle" />
      <div className="node-content">
        <div className="node-label">{data.label}</div>
        <div className="node-subtitle">Click to visit</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="neon-handle" />
    </div>
  );
}
