
import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TimeNode from './TimeNode';
import WebsiteNode from './WebsiteNode';

const nodeTypes = {
  timeNode: TimeNode,
  websiteNode: WebsiteNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'timeNode',
    position: { x: 250, y: 100 },
    data: { label: 'Current Day', type: 'day' },
  },
  {
    id: '2',
    type: 'timeNode',
    position: { x: 450, y: 100 },
    data: { label: 'Current Date', type: 'date' },
  },
  {
    id: '3',
    type: 'timeNode',
    position: { x: 250, y: 250 },
    data: { label: 'Local Time', type: 'time' },
  },
  {
    id: '4',
    type: 'timeNode',
    position: { x: 450, y: 250 },
    data: { label: 'LA Time', type: 'laTime' },
  },
  {
    id: '5',
    type: 'websiteNode',
    position: { x: 100, y: 400 },
    data: { label: 'Google', url: 'https://google.com' },
  },
  {
    id: '6',
    type: 'websiteNode',
    position: { x: 300, y: 400 },
    data: { label: 'GitHub', url: 'https://github.com' },
  },
  {
    id: '7',
    type: 'websiteNode',
    position: { x: 500, y: 400 },
    data: { label: 'YouTube', url: 'https://youtube.com' },
  },
  {
    id: '8',
    type: 'websiteNode',
    position: { x: 700, y: 400 },
    data: { label: 'Twitter', url: 'https://twitter.com' },
  },
  {
    id: '9',
    type: 'websiteNode',
    position: { x: 200, y: 550 },
    data: { label: 'Netflix', url: 'https://netflix.com' },
  },
  {
    id: '10',
    type: 'websiteNode',
    position: { x: 500, y: 550 },
    data: { label: 'Spotify', url: 'https://spotify.com' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight', style: { stroke: '#00ffff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e1-3', source: '1', target: '3', type: 'straight', style: { stroke: '#00ffff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e2-4', source: '2', target: '4', type: 'straight', style: { stroke: '#00ffff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e3-4', source: '3', target: '4', type: 'straight', style: { stroke: '#00ffff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e1-5', source: '1', target: '5', type: 'straight', style: { stroke: '#ff00ff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e2-6', source: '2', target: '6', type: 'straight', style: { stroke: '#ff00ff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e3-7', source: '3', target: '7', type: 'straight', style: { stroke: '#ff00ff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e4-8', source: '4', target: '8', type: 'straight', style: { stroke: '#ff00ff', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e5-9', source: '5', target: '9', type: 'straight', style: { stroke: '#00ff00', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e6-10', source: '6', target: '10', type: 'straight', style: { stroke: '#00ff00', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e7-9', source: '7', target: '9', type: 'straight', style: { stroke: '#00ff00', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e8-10', source: '8', target: '10', type: 'straight', style: { stroke: '#00ff00', strokeWidth: 2, strokeDasharray: '5,5' } },
];

export default function NodeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-screen bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="neon-flow"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="#00ffff"
        />
        <Controls 
          className="neon-controls"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap 
          className="neon-minimap"
          nodeColor="#00ffff"
          maskColor="rgba(0, 0, 0, 0.8)"
        />
      </ReactFlow>
    </div>
  );
}
