
import React, { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';

interface TimeNodeProps {
  data: {
    label: string;
    type: 'day' | 'date' | 'time' | 'laTime';
    debugId?: string;
  };
  id: string;
}

export default function TimeNode({ data, id }: TimeNodeProps) {
  const [timeValue, setTimeValue] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      switch (data.type) {
        case 'day':
          setTimeValue(now.toLocaleDateString('en-US', { weekday: 'long' }));
          break;
        case 'date':
          setTimeValue(now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }));
          break;
        case 'time':
          setTimeValue(now.toLocaleTimeString('en-US', { 
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }));
          break;
        case 'laTime':
          setTimeValue(now.toLocaleTimeString('en-US', { 
            timeZone: 'America/Los_Angeles',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }));
          break;
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [data.type]);

  return (
    <div 
      className="time-node" 
      data-node-id={id} 
      data-id={id}
      data-debug-id={data.type === 'date' ? 'date-node' : data.debugId}
    >
      <div className="node-corner top-left"></div>
      <div className="node-corner top-right"></div>
      <div className="node-corner bottom-left"></div>
      <div className="node-corner bottom-right"></div>
      
      <Handle 
        type="target" 
        position={Position.Top} 
        className="neon-handle"
        style={{ background: '#ffffff', border: '2px solid #2563eb' }}
      />
      
      <div className="node-content" data-debug-id={data.debugId || undefined}>
        <div className="node-label">{data.label}</div>
        <div className="node-value">{timeValue}</div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="neon-handle"
        style={{ background: '#ffffff', border: '2px solid #2563eb' }}
      />
    </div>
  );
}
