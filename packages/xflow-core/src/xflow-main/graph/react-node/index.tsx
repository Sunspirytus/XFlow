import React from 'react'
import {
  DatabaseOutlined,
  RedoOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  StopOutlined,
  EditOutlined,
  CloudDownloadOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import type { NsGraph } from '../../../interface'

const fontStyle = { fontSize: '16px', color: '#3057e3' }

/** 状态 类型 */
export enum StatusEnum {
  SUCCEEDED = 'SUCCEEDED',
  RUNNING = 'RUNNING',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  CREATING = 'CREATING',
  MANUAL_TERMINATE = 'MANUAL_TERMINATE',
  CACHED = 'CACHED',
  QUEUEING = 'QUEUEING',
  PULLING_IMAGE = 'PULLING_IMAGE',
  UNKNOWN = 'UNKNOWN',
}

export const AlgoIcon: React.FC<IProps> = props => {
  if (props.hide) {
    return null
  }
  switch (props.status) {
    case StatusEnum.RUNNING:
      return <RedoOutlined spin style={{ color: '#c1cdf7', fontSize: '16px' }} />
    case StatusEnum.FAILED:
      return <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
    case StatusEnum.SUCCEEDED:
      return <CheckCircleOutlined style={{ color: '#39ca74cc', fontSize: '16px' }} />
    case StatusEnum.PENDING:
      return <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '16px' }} />
    case StatusEnum.CREATING:
      return <EditOutlined style={{ color: '#faad14', fontSize: '16px' }} />
    case StatusEnum.MANUAL_TERMINATE:
      return <StopOutlined style={{ color: '#faad14', fontSize: '16px' }} />
    case StatusEnum.CACHED:
      return <CloudDownloadOutlined style={{ color: '#faad14', fontSize: '16px' }} />
    case StatusEnum.QUEUEING:
      return <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '16px' }} />
    case StatusEnum.PULLING_IMAGE:
      return <DownloadOutlined style={{ color: '#faad14', fontSize: '16px' }} />
    case StatusEnum.UNKNOWN:
      return <QuestionCircleOutlined style={{ color: '#d9d9d9', fontSize: '16px' }} />
    default:
      return null
  }
}

interface IProps {
  status: StatusEnum
  hide: boolean
}

export const XFlowDefaultNode: NsGraph.INodeRender = props => {
  const icon = React.isValidElement(props.data.icon) ? (
    props.data.icon
  ) : (
    <DatabaseOutlined style={fontStyle} />
  )
  return (
    <div className={`xflow-default-node ${props.isNodeTreePanel ? 'panel-node' : ''}`}>
      <span className="icon">{icon}</span>
      <span className="label">{props.data.label}</span>
      <span className="status">
        <AlgoIcon status={props.data && props.data.status} hide={props.isNodeTreePanel} />
      </span>
    </div>
  )
}

XFlowDefaultNode.displayName = 'XFlowDefaultNode'
