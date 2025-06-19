import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface WebsiteNodeProps {
  data: {
    label: string;
    url: string;
    debugId?: string;
  };
}

export default function WebsiteNode({ data }: WebsiteNodeProps) {
  const handleClick = () => {
    window.open(data.url, '_blank');
  };

  return (
    <div className="website-node" onClick={handleClick}>
      <div className="node-corner top-left"></div>
      <div className="node-corner top-right"></div>
      <div className="node-corner bottom-left"></div>
      <div className="node-corner bottom-right"></div>
      
      <Handle 
        type="target" 
        position={Position.Top} 
        className="neon-handle"
        style={{ background: '#ff6b35', border: '2px solid #cc5429' }}
      />
      
      <div className="node-content" data-debug-id={data.debugId || undefined}>
        <div className="node-label">{data.label}</div>
        <div className="node-subtitle">Click to visit</div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="neon-handle"
        style={{ background: '#ff6b35', border: '2px solid #cc5429' }}
      />
    </div>
  );
}