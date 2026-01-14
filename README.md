# XFlow: Professional graph editing application-level solution

<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

[![](https://img.shields.io/travis/antvis/xflow.svg)](https://travis-ci.org/antvis/xflow) ![](https://img.shields.io/badge/language-javascript-red.svg) ![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/xflow.svg)](https://www.npmjs.com/package/@antv/xflow) [![npm downloads](http://img.shields.io/npm/dm/@antv/xflow.svg)](https://npmjs.org/package/@antv/xflow) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/xflow.svg)](http://isitmaintained.com/project/antvis/xflow 'Percentage of issues still open')

## What is XFlow?

XFlow is a graph editing application-level solution for users of the React technology stack based on the X6 graph editing engine under [AntV](https://antv.vision/). It aims to make the development of complex graph editing applications simple and efficient. XFlow originated from the data intelligence team of the Ant Experience Technology Department. It has been deeply polished and verified in the Ant Big Data Department and artificial intelligence middle-end business scenarios. It is trustworthy!

## ✨ Features

- 🌱 　 Extremely easy to customize: Supports developing node/wire styles using React components.
- 🚀 　 Out of the box: 1 quick start + 3 solutions built-in, built-in several React interactive components, such as minimap, snap line, right-click menu, etc.
- 💯 　 Available for production: It comes from the data intelligence team of the Ant Experience Technology Department, and is deeply polished and verified in the Ant Big Data Department and AI middle-end business scenarios.
- 🧲 　 Everything is extensible: Built-in unified extension mode, you can expand the graph interaction according to your own business needs, and all components are extensible.

## 🔨 Applications

### Simple example

<img src=https://gw.alipayobjects.com/mdn/rms_19b204/afts/img/A*S8LGR6I1SqsAAAAAAAAAAAAAARQnAQ />

### Flowchart Solutions

<img src=https://gw.alipayobjects.com/mdn/rms_19b204/afts/img/A*ixVAQrEoCTcAAAAAAAAAAAAAARQnAQ />

### DAG Solution

<img src=https://gw.alipayobjects.com/mdn/rms_19b204/afts/img/A*mFc0SLQOW44AAAAAAAAAAAAAARQnAQ />

### ER Diagram Solutions

<img src=https://gw.alipayobjects.com/mdn/rms_19b204/afts/img/A*kp-AQ7_GKi0AAAAAAAAAAAAAARQnAQ />

## Installation Instructions

### Using npm or yarn

```shell
#npm
$ npm install @antv/xflow --save

#yarn
$ yarn add @antv/xflow
```

### Using CDN

Using a script tag, you can use either of the following two CDN's to load XFlow library; these CDN's default to returning the latest version of XFlow

- https://unpkg.com/@antv/xflow/dist/index.umd.js
- https://cdn.jsdelivr.net/npm/@antv/xflow/dist/index.umd.js

```tsx | pure
<script src="https://unpkg.com/@antv/xflow/dist/index.umd.js"></script>
```

For production environments, we recommend using an explicit version number to avoid unpredictable damage caused by new version upgrades:

- https://unpkg.com/@antv/xflow@0.3.2-beta.1/dist/index.umd.js
- https://cdn.jsdelivr.net/npm/@antv/xflow@0.3.2-beta.1/dist/index.umd.js

## Getting Started Example

### Step1: Create a worksapce

First, we need to build an XFlow workspace, in which the XFlowCanvas canvas component, CanvasScaleToolbar toolbar, CanvasMiniMap minimap, CanvasSnapline alignment line and other interactive components are all content in the XFlow workspace. **It is important to emphasize that in XFlow, everything is a React component**

```tsx | pure
import { XFlow, XFlowCanvas } from '@sunspirytus/xflow'
import { CanvasScaleToolbar, CanvasMiniMap, CanvasSnapline } from '@sunspirytus/xflow-extension'
import { useGraphConfig } from './config-graph'

return (
  <XFlow
    className="xflow-uer-container"
    graphData={graphData}
    graphLayout={{
      layoutType: 'dagre',
      layoutOptions: {
        type: 'dagre',
        rankdir: 'TB',
        nodesep: 60,
        ranksep: 40,
      }
    }}
    onLoad={onLoad}
    isAutoCenter={true}
  >
    <XFlowCanvas config={useGraphConfig()}>
      <CanvasScaleToolbar />
      <CanvasMiniMap minimapOptions={{ width: 200, height: 120 }} />
      <CanvasSnapline color="#1890ff" />
    </XFlowCanvas>
  </XFlow>
)
```

### Step2 设置相关配置

Then, we need to set the canvas global configuration item `graphConfig`, which determines how the content on the canvas is rendered. For example, whether the canvas needs a grid, the zoom level of the canvas, whether the canvas supports scroll wheel zooming, etc., and what type of React nodes/connections need to be rendered on the canvas.

```tsx | pure
import { createGraphConfig } from '@sunspirytus/xflow'
import Node1 from './react-node/node1'
import Edge1 from './react-edge/edge1'

export const useGraphConfig = createGraphConfig(config => {
  /** Setting the canvas configuration item will override the XFlow default canvas configuration item */
  config.setX6Config({
    grid: true,
    scaling: { min: 0.2, max: 3 },
    mousewheel: { enabled: true, zoomAtMousePosition: true },
  })

  /** Set the React node that the canvas needs to render, and the React content on the connection */
  config.setNodeRender('NODE1', props => <Node1 {...props} />)
  config.setEdgeRender('EDGE1', props => <Edge1 {...props} />)
})
```

### Step3 画布渲染等逻辑操作

设置相关配置后, 我们就可以在 `onLoad` 方法里进行一些必要的业务逻辑操作，比如从服务端获取数据、执行布局算法、渲染画布内容、监听画布相关事件等。

```tsx | pure
/** Callback after XFlow initialization is complete*/
const onLoad: IAppLoad = async app => {
  /** Here we assume that the data has been fetched from the server */
  const nodes: NsGraph.INodeConfig[] = [
    { id: 'root1', width: 150, height: 40, renderKey: 'NODE1', info: { text: 'root1' } },
    { id: 'down1', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down1' } },
    { id: 'down2', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down2' } },
    { id: 'down3', width: 150, height: 40, renderKey: 'NODE2', info: { text: 'down3' } },
  ]
  const edges: NsGraph.IEdgeConfig[] = [
    {
      id: 'root1-down1',
      source: 'root1',
      target: 'down1',
      renderKey: 'EDGE1',
      info: { line: 'root1-down1' },
    },
    {
      id: 'root1-down2',
      source: 'root1',
      target: 'down2',
      renderKey: 'EDGE2',
      info: { line: 'root1-down2' },
    },
    {
      id: 'root1-down3',
      source: 'root1',
      target: 'down3',
      label: '1:N(纯文本)',
      info: { line: 'root1-down3' },
    },
  ]
  const graphData = { nodes, edges }
  setGraphData(graphData)

  /** Listen to canvas events */
  const graph = await app.getGraphInstance()
  graph.on('node:click', ({ e, x, y, node, view }) => {
    const nodeData: NsGraph.INodeConfig = node.getData()
    message.success(`${nodeData.id}节点被点击了`)
  })
  graph.on('edge:click', ({ e, x, y, edge, view }) => {
    edge.toFront()
    const edgeData: NsGraph.IEdgeConfig = edge.getData()
    message.success(`${edgeData.id}连线被点击了`)
  })
}
```

At this point, a simple graphics application has a prototype. But the charm of XFlow is much more than that! If your application also needs various interactive components, XFlow has built-in several interactive components for you, such as `CanvasScaleToolbar`, `CanvasMinimap minimap`, `CanvasSnapline snap line` used above.

In addition, the real power of XFlow lies in:

- The linkage mechanism between canvas components and interactive components.
- The extension mechanism provided by XFlow allows customization of interactive components required by any business. You can learn more about it in a later tutorial.

## Working with documentation

[XFlow usage documentation](https://xflow.antv.vision/docs/tutorial/intro/about)

## How to communicate

If you encounter problems during use, you can go through [issues](https://github.com/antvis/xflow/issues) to see if there are any similar bugs or suggestions. Welcome to [issues](https://github.com/antvis/xflow/issues/new) for communication, or you can use [DingTalk](https://m.dingtalk.com/) to scan the QR code below to join\* \*XFlow chat group\*\*.

It should be noted that when asking questions, please add the reproduction code of [CodeSandbox](https://codesandbox.io/s/pensive-sound-f4nhc), which is convenient for quickly locating and solving problems.

<a href="https://qr.dingtalk.com/action/joingroup?code=v1,k1,rOHuvgq5s0EHDktyyQJffDE3ZAmHnbB2e6iwn/w4BKs=&_dt_no_comment=1&origin=11" target="_blank" rel="noopener noreferrer">
  <img src="https://gw.alipayobjects.com/mdn/rms_19b204/afts/img/A*KuL6R7t0Xw0AAAAAAAAAAAAAARQnAQ" alt="X6/XFlow diagram visualization communication group 1" width="375" />
</a>

## How to Develop

We use [pnpm](https://pnpm.io/workspaces) to manage the project, the directory structure is as follows:

```
├── packages
│   ├── xflow-docs            # XFlow 使用文档, 包含 1个快速开始 + 3个解决方案
│   ├── xflow                 # 所有 XFlow 相关的引用都从 xflow 库导出
│   ├── xflow-core            # XFlow 对于 X6 画布的封装 graphProvider, 提供若干内置命令Command, 提供全局ModelService等
│   ├── xflow-extension       # XFlow 内置的若干交互组件, 包括小地图、对齐线、右键菜单等
│   └── xflow-hook            # XFlow 内置的 hook 机制, 允许自定义若干默认行为
```

1. Before starting you need to install the necessary global dependencies and initialization:

```shell
# Install pnpm globally
$ npm install pnpm -g

# Install project dependencies and initialize the build
$ pnpm install


```

2. start dev server

Create a new terminal to monitor the file changes of xflow-core, and execute the next command after waiting for the watch service to start successfully.

```shell
yarn run dev:core
```

Create a new terminal to monitor the file changes of xflow-extension, and execute the next command after waiting for the watch service to start successfully.

```shell
yarn run dev:ext
```

Create a new terminal to monitor the file changes of xflow, and execute the next command after waiting for the watch service to start successfully.

```shell
yarn run dev:main
```

3. Start the documentation website, debug the code according to the example

```shell
yarn run dev:docs
```

## How to contribute

If you encounter problems during use, you can go through [issues](https://github.com/antvis/xflow/issues) to see if there are any similar bugs or suggestions.

To submit code, please follow our [Contribution Guidelines](/CONTRIBUTING.en-US.md). We will collect contributors' Github avatars to the list of contributors below.

<a href="https://github.com/antvis/xflow/graphs/contributors">
  <img src="/CONTRIBUTORS.svg" alt="Contributors" width="740" />
</a>
