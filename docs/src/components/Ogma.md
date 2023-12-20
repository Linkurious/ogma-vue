# Ogma

Main Ogma component, it automatically creates an Ogma instance and provides it to its children.
If you want to pass it your own instance, or if you want to type nodes and edges data types, see [useOgma](./useOgma.md).

## Props

### width

- type: `number | undeifined`
- default: `undefined`

Width of Ogma canvas. If not set, width of the container will be used.

### height

- type: `number | undefined`
- default: `undefined`

Height of Ogma canvas. If not set, height of the container will be used.

### graph

- type: [RawGraph](https://doc.linkurious.com/ogma/latest/api.html#RawGraph)` | undefined`
- default: `() => ({ nodes: [], edges: [] })`

Graph to render. If not set, an empty graph will be rendered.

### options

- type: [OgmaOptions](https://doc.linkurious.com/ogma/latest/api.html#Options) `| undefined`
- default: `undefined`

Options to pass to Ogma instance. If not set, default options will be used.

### layoutOnMounted

- type: `boolean`
- default: `true`

Whether to layout the graph when the component is mounted.

### events

- type: `string[] | "all"`
- default: `"all"`

Events to listen to. If set to `"all"`, all events will be listened to.
See [events](#events) for a list of available events.

## Events

### addEdges

- payload: [AddEdgesEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-addEdges)

Triggered when edges are added to the graph.

### addGraph

- payload: [AddGraphEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-addGraph)

Triggered when a graph is added to the graph.

### addNodes

- payload: [AddNodesEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-addNodes)

Triggered when nodes are added to the graph.

### beforeRemoveEdges

- payload: [BeforeRemoveEdgesEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-beforeRemoveEdges)

Triggered before edges are removed from the graph.

### beforeRemoveNodes

- payload: [BeforeRemoveNodesEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-beforeRemoveNodes)

Triggered before nodes are removed from the graph.

### clearGraph

- payload: [ClearGraphEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-clearGraph)

Triggered when the graph is cleared.

### click

- payload: [ClickEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-click)

Triggered when the user clicks on the graph.

### connectNodes

- payload: [ConnectNodesEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-connectNodes)

Triggered when nodes are connected.

### destroy

- payload: [DestroyEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-destroy)

Triggered when the Ogma instance is destroyed.

### doubleclick

- payload: [DoubleclickEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-doubleclick)

Triggered when the user double clicks on the graph.

### dragEnd

- payload: [DragEndEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-dragEnd)

Triggered when the user stops dragging the graph.

### dragProgress

- payload: [DragProgressEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-dragProgress)

Triggered when the user drags the graph.

### dragStart

- payload: [DragStartEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-dragStart)

Triggered when the user starts dragging the graph.

### drop

- payload: [DropEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-drop)

Triggered when the user drops something on the graph.

### edgesSelected

- payload: [EdgesSelectedEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-edgesSelected)

Triggered when edges are selected.

### geoDisabled

- payload: [GeoDisabledEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-geoDisabled)

Triggered when the geo mode is disabled.

### geoEnabled

- payload: [GeoEnabledEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-geoEnabled)

Triggered when the geo mode is enabled.

### geoLoaded

- payload: [GeoLoadedEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-geoLoaded)

Triggered when the geo mode is loaded.

### gestureEnd

- payload: [GestureEndEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureEnd)

Triggered when the user stops a gesture.

### gestureProgress

- payload: [GestureProgressEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureProgress)

Triggered when the user performs a gesture.

### gestureStart

- payload: [GestureStartEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureStart)

Triggered when the user starts a gesture.

### keydown

- payload: [KeydownEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-keydown)

Triggered when the user presses a key.

### keyup

- payload: [KeyupEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-keyup)

Triggered when the user releases a key.

### layoutComputed

- payload: [LayoutComputedEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutComputed)

Triggered when the layout is computed.

### layoutEnd

- payload: [LayoutEndEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutEnd)

Triggered when the layout ends.

### layoutStart

- payload: [LayoutStartEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutStart)

Triggered when the layout starts.

### mousedown

- payload: [MousedownEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-mousedown)

Triggered when the user presses the mouse button.

### mousemove

- payload: [MousemoveEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-mousemove)

Triggered when the user moves the mouse.

### mouseout

- payload: [MouseoutEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseout)

Triggered when the user moves the mouse out of the graph.

### mouseover

- payload: [MouseoverEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseover)

Triggered when the user moves the mouse over the graph.

### mouseup

- payload: [MouseupEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseup)

Triggered when the user releases the mouse button.

### mousewheel

- payload: [MousewheelEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-mousewheel)

Triggered when the user scrolls the mouse wheel.

### nodesDragEnd

- payload: [NodesDragEndEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragEnd)

Triggered when the user stops dragging nodes.

### nodesDragProgress

- payload: [NodesDragProgressEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragProgress)

Triggered when the user drags nodes.

### nodesDragStart

- payload: [NodesDragStartEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragStart)

Triggered when the user starts dragging nodes.

### nodesSelected

- payload: [NodesSelectedEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesSelected)

Triggered when nodes are selected.

### nodesUnselected

- payload: [NodesUnselectedEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesUnselected)

Triggered when nodes are unselected.

### removeEdges

- payload: [RemoveEdgesEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-removeEdges)

Triggered when edges are removed from the graph.

### removeNodes

- payload: [RemoveNodesEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-removeNodes)

Triggered when nodes are removed from the graph.

### rendererStateChange

- payload: [RendererStateChangeEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-rendererStateChange)

Triggered when the renderer state changes.

### resize

- payload: [ResizeEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-resize)

Triggered when the graph is resized.

### rotate

- payload: [RotateEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-rotate)

Triggered when the graph is rotated.

### tooltipHide

- payload: [TooltipHideEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-tooltipHide)

Triggered when the tooltip is hidden.

### tooltipShow

- payload: [TooltipShowEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-tooltipShow)

Triggered when the tooltip is shown.

### transformationDestroyed

- payload: [TransformationDestroyedEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationDestroyed)

Triggered when a transformation is destroyed.

### transformationDisabled

- payload: [TransformationDisabledEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationDisabled)

Triggered when a transformation is disabled.

### transformationEnabled

- payload: [TransformationEnabledEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationEnabled)

Triggered when a transformation is enabled.

### transformationRefresh

- payload: [TransformationRefreshEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationRefresh)

Triggered when a transformation is refreshed.

### transformationSetIndex

- payload: [TransformationSetIndexEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationSetIndex)

Triggered when a transformation index is set.

### updateEdgeData

- payload: [UpdateEdgeDataEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-updateEdgeData)

Triggered when edge data is updated.

### updateNodeData

- payload: [UpdateNodeDataEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-updateNodeData)

Triggered when node data is updated.

### viewChanged

- payload: [ViewChangedEvent](https://doc.linkurious.com/ogma/latest/api.html#Event:-viewChanged)

Triggered when the view changes.

## Slots

### default

- type: `VNode[]`

Put your Ogma components here. They will be provided with the Ogma instance.

## Example

<!--@include: ../../examples/ogma.md-->
