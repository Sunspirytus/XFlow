import React from 'react'
import type { NsGraph } from '@sunspirytus/xflow'
import './index.less'

export const DndNode: NsGraph.INodeRender = props => {
  return <div className="xflow-dnd-node">{props.data.label}</div>
}
