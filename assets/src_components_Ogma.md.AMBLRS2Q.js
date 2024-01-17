import{_ as e,o as a,c as s,R as t}from"./chunks/framework.6gCNz0yi.js";const E=JSON.parse('{"title":"Ogma","description":"","frontmatter":{},"headers":[],"relativePath":"src/components/Ogma.md","filePath":"src/components/Ogma.md"}'),i={name:"src/components/Ogma.md"},r=t(`<h1 id="ogma" tabindex="-1">Ogma <a class="header-anchor" href="#ogma" aria-label="Permalink to &quot;Ogma&quot;">​</a></h1><p>Main Ogma component, it automatically creates an Ogma instance and provides it to its children. If you want to pass it your own instance, or if you want to type nodes and edges data types, see <a href="/ogma-vue/src/hooks/">useOgma</a>.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><h3 id="width" tabindex="-1">width <a class="header-anchor" href="#width" aria-label="Permalink to &quot;width&quot;">​</a></h3><ul><li>type: <code>number | undeifined</code></li><li>default: <code>undefined</code></li></ul><p>Width of Ogma canvas. If not set, width of the container will be used.</p><h3 id="height" tabindex="-1">height <a class="header-anchor" href="#height" aria-label="Permalink to &quot;height&quot;">​</a></h3><ul><li>type: <code>number | undefined</code></li><li>default: <code>undefined</code></li></ul><p>Height of Ogma canvas. If not set, height of the container will be used.</p><h3 id="graph" tabindex="-1">graph <a class="header-anchor" href="#graph" aria-label="Permalink to &quot;graph&quot;">​</a></h3><ul><li>type: <a href="https://doc.linkurious.com/ogma/latest/api.html#RawGraph" target="_blank" rel="noreferrer">RawGraph</a><code> | undefined</code></li><li>default: <code>() =&gt; ({ nodes: [], edges: [] })</code></li></ul><p>Graph to render. If not set, an empty graph will be rendered.</p><h3 id="options" tabindex="-1">options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;options&quot;">​</a></h3><ul><li>type: <a href="https://doc.linkurious.com/ogma/latest/api.html#Options" target="_blank" rel="noreferrer">OgmaOptions</a> <code>| undefined</code></li><li>default: <code>undefined</code></li></ul><p>Options to pass to Ogma instance. If not set, default options will be used.</p><h3 id="layoutonmounted" tabindex="-1">layoutOnMounted <a class="header-anchor" href="#layoutonmounted" aria-label="Permalink to &quot;layoutOnMounted&quot;">​</a></h3><ul><li>type: <code>boolean</code></li><li>default: <code>true</code></li></ul><p>Whether to layout the graph when the component is mounted.</p><h3 id="events" tabindex="-1">events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;events&quot;">​</a></h3><ul><li>type: <code>string[] | &quot;all&quot;</code></li><li>default: <code>&quot;all&quot;</code></li></ul><p>Events to listen to. If set to <code>&quot;all&quot;</code>, all events will be listened to. See <a href="#events">events</a> for a list of available events.</p><h2 id="events-1" tabindex="-1">Events <a class="header-anchor" href="#events-1" aria-label="Permalink to &quot;Events&quot;">​</a></h2><h3 id="addedges" tabindex="-1">addEdges <a class="header-anchor" href="#addedges" aria-label="Permalink to &quot;addEdges&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-addEdges" target="_blank" rel="noreferrer">AddEdgesEvent</a></li></ul><p>Triggered when edges are added to the graph.</p><h3 id="addgraph" tabindex="-1">addGraph <a class="header-anchor" href="#addgraph" aria-label="Permalink to &quot;addGraph&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-addGraph" target="_blank" rel="noreferrer">AddGraphEvent</a></li></ul><p>Triggered when a graph is added to the graph.</p><h3 id="addnodes" tabindex="-1">addNodes <a class="header-anchor" href="#addnodes" aria-label="Permalink to &quot;addNodes&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-addNodes" target="_blank" rel="noreferrer">AddNodesEvent</a></li></ul><p>Triggered when nodes are added to the graph.</p><h3 id="beforeremoveedges" tabindex="-1">beforeRemoveEdges <a class="header-anchor" href="#beforeremoveedges" aria-label="Permalink to &quot;beforeRemoveEdges&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-beforeRemoveEdges" target="_blank" rel="noreferrer">BeforeRemoveEdgesEvent</a></li></ul><p>Triggered before edges are removed from the graph.</p><h3 id="beforeremovenodes" tabindex="-1">beforeRemoveNodes <a class="header-anchor" href="#beforeremovenodes" aria-label="Permalink to &quot;beforeRemoveNodes&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-beforeRemoveNodes" target="_blank" rel="noreferrer">BeforeRemoveNodesEvent</a></li></ul><p>Triggered before nodes are removed from the graph.</p><h3 id="cleargraph" tabindex="-1">clearGraph <a class="header-anchor" href="#cleargraph" aria-label="Permalink to &quot;clearGraph&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-clearGraph" target="_blank" rel="noreferrer">ClearGraphEvent</a></li></ul><p>Triggered when the graph is cleared.</p><h3 id="click" tabindex="-1">click <a class="header-anchor" href="#click" aria-label="Permalink to &quot;click&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-click" target="_blank" rel="noreferrer">ClickEvent</a></li></ul><p>Triggered when the user clicks on the graph.</p><h3 id="connectnodes" tabindex="-1">connectNodes <a class="header-anchor" href="#connectnodes" aria-label="Permalink to &quot;connectNodes&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-connectNodes" target="_blank" rel="noreferrer">ConnectNodesEvent</a></li></ul><p>Triggered when nodes are connected.</p><h3 id="destroy" tabindex="-1">destroy <a class="header-anchor" href="#destroy" aria-label="Permalink to &quot;destroy&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-destroy" target="_blank" rel="noreferrer">DestroyEvent</a></li></ul><p>Triggered when the Ogma instance is destroyed.</p><h3 id="doubleclick" tabindex="-1">doubleclick <a class="header-anchor" href="#doubleclick" aria-label="Permalink to &quot;doubleclick&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-doubleclick" target="_blank" rel="noreferrer">DoubleclickEvent</a></li></ul><p>Triggered when the user double clicks on the graph.</p><h3 id="dragend" tabindex="-1">dragEnd <a class="header-anchor" href="#dragend" aria-label="Permalink to &quot;dragEnd&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-dragEnd" target="_blank" rel="noreferrer">DragEndEvent</a></li></ul><p>Triggered when the user stops dragging the graph.</p><h3 id="dragprogress" tabindex="-1">dragProgress <a class="header-anchor" href="#dragprogress" aria-label="Permalink to &quot;dragProgress&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-dragProgress" target="_blank" rel="noreferrer">DragProgressEvent</a></li></ul><p>Triggered when the user drags the graph.</p><h3 id="dragstart" tabindex="-1">dragStart <a class="header-anchor" href="#dragstart" aria-label="Permalink to &quot;dragStart&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-dragStart" target="_blank" rel="noreferrer">DragStartEvent</a></li></ul><p>Triggered when the user starts dragging the graph.</p><h3 id="drop" tabindex="-1">drop <a class="header-anchor" href="#drop" aria-label="Permalink to &quot;drop&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-drop" target="_blank" rel="noreferrer">DropEvent</a></li></ul><p>Triggered when the user drops something on the graph.</p><h3 id="edgesselected" tabindex="-1">edgesSelected <a class="header-anchor" href="#edgesselected" aria-label="Permalink to &quot;edgesSelected&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-edgesSelected" target="_blank" rel="noreferrer">EdgesSelectedEvent</a></li></ul><p>Triggered when edges are selected.</p><h3 id="geodisabled" tabindex="-1">geoDisabled <a class="header-anchor" href="#geodisabled" aria-label="Permalink to &quot;geoDisabled&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-geoDisabled" target="_blank" rel="noreferrer">GeoDisabledEvent</a></li></ul><p>Triggered when the geo mode is disabled.</p><h3 id="geoenabled" tabindex="-1">geoEnabled <a class="header-anchor" href="#geoenabled" aria-label="Permalink to &quot;geoEnabled&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-geoEnabled" target="_blank" rel="noreferrer">GeoEnabledEvent</a></li></ul><p>Triggered when the geo mode is enabled.</p><h3 id="geoloaded" tabindex="-1">geoLoaded <a class="header-anchor" href="#geoloaded" aria-label="Permalink to &quot;geoLoaded&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-geoLoaded" target="_blank" rel="noreferrer">GeoLoadedEvent</a></li></ul><p>Triggered when the geo mode is loaded.</p><h3 id="gestureend" tabindex="-1">gestureEnd <a class="header-anchor" href="#gestureend" aria-label="Permalink to &quot;gestureEnd&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureEnd" target="_blank" rel="noreferrer">GestureEndEvent</a></li></ul><p>Triggered when the user stops a gesture.</p><h3 id="gestureprogress" tabindex="-1">gestureProgress <a class="header-anchor" href="#gestureprogress" aria-label="Permalink to &quot;gestureProgress&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureProgress" target="_blank" rel="noreferrer">GestureProgressEvent</a></li></ul><p>Triggered when the user performs a gesture.</p><h3 id="gesturestart" tabindex="-1">gestureStart <a class="header-anchor" href="#gesturestart" aria-label="Permalink to &quot;gestureStart&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureStart" target="_blank" rel="noreferrer">GestureStartEvent</a></li></ul><p>Triggered when the user starts a gesture.</p><h3 id="keydown" tabindex="-1">keydown <a class="header-anchor" href="#keydown" aria-label="Permalink to &quot;keydown&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-keydown" target="_blank" rel="noreferrer">KeydownEvent</a></li></ul><p>Triggered when the user presses a key.</p><h3 id="keyup" tabindex="-1">keyup <a class="header-anchor" href="#keyup" aria-label="Permalink to &quot;keyup&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-keyup" target="_blank" rel="noreferrer">KeyupEvent</a></li></ul><p>Triggered when the user releases a key.</p><h3 id="layoutcomputed" tabindex="-1">layoutComputed <a class="header-anchor" href="#layoutcomputed" aria-label="Permalink to &quot;layoutComputed&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutComputed" target="_blank" rel="noreferrer">LayoutComputedEvent</a></li></ul><p>Triggered when the layout is computed.</p><h3 id="layoutend" tabindex="-1">layoutEnd <a class="header-anchor" href="#layoutend" aria-label="Permalink to &quot;layoutEnd&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutEnd" target="_blank" rel="noreferrer">LayoutEndEvent</a></li></ul><p>Triggered when the layout ends.</p><h3 id="layoutstart" tabindex="-1">layoutStart <a class="header-anchor" href="#layoutstart" aria-label="Permalink to &quot;layoutStart&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutStart" target="_blank" rel="noreferrer">LayoutStartEvent</a></li></ul><p>Triggered when the layout starts.</p><h3 id="mousedown" tabindex="-1">mousedown <a class="header-anchor" href="#mousedown" aria-label="Permalink to &quot;mousedown&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-mousedown" target="_blank" rel="noreferrer">MousedownEvent</a></li></ul><p>Triggered when the user presses the mouse button.</p><h3 id="mousemove" tabindex="-1">mousemove <a class="header-anchor" href="#mousemove" aria-label="Permalink to &quot;mousemove&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-mousemove" target="_blank" rel="noreferrer">MousemoveEvent</a></li></ul><p>Triggered when the user moves the mouse.</p><h3 id="mouseout" tabindex="-1">mouseout <a class="header-anchor" href="#mouseout" aria-label="Permalink to &quot;mouseout&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseout" target="_blank" rel="noreferrer">MouseoutEvent</a></li></ul><p>Triggered when the user moves the mouse out of the graph.</p><h3 id="mouseover" tabindex="-1">mouseover <a class="header-anchor" href="#mouseover" aria-label="Permalink to &quot;mouseover&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseover" target="_blank" rel="noreferrer">MouseoverEvent</a></li></ul><p>Triggered when the user moves the mouse over the graph.</p><h3 id="mouseup" tabindex="-1">mouseup <a class="header-anchor" href="#mouseup" aria-label="Permalink to &quot;mouseup&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseup" target="_blank" rel="noreferrer">MouseupEvent</a></li></ul><p>Triggered when the user releases the mouse button.</p><h3 id="mousewheel" tabindex="-1">mousewheel <a class="header-anchor" href="#mousewheel" aria-label="Permalink to &quot;mousewheel&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-mousewheel" target="_blank" rel="noreferrer">MousewheelEvent</a></li></ul><p>Triggered when the user scrolls the mouse wheel.</p><h3 id="nodesdragend" tabindex="-1">nodesDragEnd <a class="header-anchor" href="#nodesdragend" aria-label="Permalink to &quot;nodesDragEnd&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragEnd" target="_blank" rel="noreferrer">NodesDragEndEvent</a></li></ul><p>Triggered when the user stops dragging nodes.</p><h3 id="nodesdragprogress" tabindex="-1">nodesDragProgress <a class="header-anchor" href="#nodesdragprogress" aria-label="Permalink to &quot;nodesDragProgress&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragProgress" target="_blank" rel="noreferrer">NodesDragProgressEvent</a></li></ul><p>Triggered when the user drags nodes.</p><h3 id="nodesdragstart" tabindex="-1">nodesDragStart <a class="header-anchor" href="#nodesdragstart" aria-label="Permalink to &quot;nodesDragStart&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragStart" target="_blank" rel="noreferrer">NodesDragStartEvent</a></li></ul><p>Triggered when the user starts dragging nodes.</p><h3 id="nodesselected" tabindex="-1">nodesSelected <a class="header-anchor" href="#nodesselected" aria-label="Permalink to &quot;nodesSelected&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesSelected" target="_blank" rel="noreferrer">NodesSelectedEvent</a></li></ul><p>Triggered when nodes are selected.</p><h3 id="nodesunselected" tabindex="-1">nodesUnselected <a class="header-anchor" href="#nodesunselected" aria-label="Permalink to &quot;nodesUnselected&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesUnselected" target="_blank" rel="noreferrer">NodesUnselectedEvent</a></li></ul><p>Triggered when nodes are unselected.</p><h3 id="removeedges" tabindex="-1">removeEdges <a class="header-anchor" href="#removeedges" aria-label="Permalink to &quot;removeEdges&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-removeEdges" target="_blank" rel="noreferrer">RemoveEdgesEvent</a></li></ul><p>Triggered when edges are removed from the graph.</p><h3 id="removenodes" tabindex="-1">removeNodes <a class="header-anchor" href="#removenodes" aria-label="Permalink to &quot;removeNodes&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-removeNodes" target="_blank" rel="noreferrer">RemoveNodesEvent</a></li></ul><p>Triggered when nodes are removed from the graph.</p><h3 id="rendererstatechange" tabindex="-1">rendererStateChange <a class="header-anchor" href="#rendererstatechange" aria-label="Permalink to &quot;rendererStateChange&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-rendererStateChange" target="_blank" rel="noreferrer">RendererStateChangeEvent</a></li></ul><p>Triggered when the renderer state changes.</p><h3 id="resize" tabindex="-1">resize <a class="header-anchor" href="#resize" aria-label="Permalink to &quot;resize&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-resize" target="_blank" rel="noreferrer">ResizeEvent</a></li></ul><p>Triggered when the graph is resized.</p><h3 id="rotate" tabindex="-1">rotate <a class="header-anchor" href="#rotate" aria-label="Permalink to &quot;rotate&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-rotate" target="_blank" rel="noreferrer">RotateEvent</a></li></ul><p>Triggered when the graph is rotated.</p><h3 id="tooltiphide" tabindex="-1">tooltipHide <a class="header-anchor" href="#tooltiphide" aria-label="Permalink to &quot;tooltipHide&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-tooltipHide" target="_blank" rel="noreferrer">TooltipHideEvent</a></li></ul><p>Triggered when the tooltip is hidden.</p><h3 id="tooltipshow" tabindex="-1">tooltipShow <a class="header-anchor" href="#tooltipshow" aria-label="Permalink to &quot;tooltipShow&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-tooltipShow" target="_blank" rel="noreferrer">TooltipShowEvent</a></li></ul><p>Triggered when the tooltip is shown.</p><h3 id="transformationdestroyed" tabindex="-1">transformationDestroyed <a class="header-anchor" href="#transformationdestroyed" aria-label="Permalink to &quot;transformationDestroyed&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationDestroyed" target="_blank" rel="noreferrer">TransformationDestroyedEvent</a></li></ul><p>Triggered when a transformation is destroyed.</p><h3 id="transformationdisabled" tabindex="-1">transformationDisabled <a class="header-anchor" href="#transformationdisabled" aria-label="Permalink to &quot;transformationDisabled&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationDisabled" target="_blank" rel="noreferrer">TransformationDisabledEvent</a></li></ul><p>Triggered when a transformation is disabled.</p><h3 id="transformationenabled" tabindex="-1">transformationEnabled <a class="header-anchor" href="#transformationenabled" aria-label="Permalink to &quot;transformationEnabled&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationEnabled" target="_blank" rel="noreferrer">TransformationEnabledEvent</a></li></ul><p>Triggered when a transformation is enabled.</p><h3 id="transformationrefresh" tabindex="-1">transformationRefresh <a class="header-anchor" href="#transformationrefresh" aria-label="Permalink to &quot;transformationRefresh&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationRefresh" target="_blank" rel="noreferrer">TransformationRefreshEvent</a></li></ul><p>Triggered when a transformation is refreshed.</p><h3 id="transformationsetindex" tabindex="-1">transformationSetIndex <a class="header-anchor" href="#transformationsetindex" aria-label="Permalink to &quot;transformationSetIndex&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationSetIndex" target="_blank" rel="noreferrer">TransformationSetIndexEvent</a></li></ul><p>Triggered when a transformation index is set.</p><h3 id="updateedgedata" tabindex="-1">updateEdgeData <a class="header-anchor" href="#updateedgedata" aria-label="Permalink to &quot;updateEdgeData&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-updateEdgeData" target="_blank" rel="noreferrer">UpdateEdgeDataEvent</a></li></ul><p>Triggered when edge data is updated.</p><h3 id="updatenodedata" tabindex="-1">updateNodeData <a class="header-anchor" href="#updatenodedata" aria-label="Permalink to &quot;updateNodeData&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-updateNodeData" target="_blank" rel="noreferrer">UpdateNodeDataEvent</a></li></ul><p>Triggered when node data is updated.</p><h3 id="viewchanged" tabindex="-1">viewChanged <a class="header-anchor" href="#viewchanged" aria-label="Permalink to &quot;viewChanged&quot;">​</a></h3><ul><li>payload: <a href="https://doc.linkurious.com/ogma/latest/api.html#Event:-viewChanged" target="_blank" rel="noreferrer">ViewChangedEvent</a></li></ul><p>Triggered when the view changes.</p><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><h3 id="default" tabindex="-1">default <a class="header-anchor" href="#default" aria-label="Permalink to &quot;default&quot;">​</a></h3><ul><li>type: <code>VNode[]</code></li></ul><p>Put your Ogma components here. They will be provided with the Ogma instance.</p><h2 id="provide" tabindex="-1">Provide <a class="header-anchor" href="#provide" aria-label="Permalink to &quot;Provide&quot;">​</a></h2><h3 id="ogma-1" tabindex="-1">ogma <a class="header-anchor" href="#ogma-1" aria-label="Permalink to &quot;ogma&quot;">​</a></h3><ul><li>type: <a href="https://doc.linkurious.com/ogma/latest/api.html#Ogma" target="_blank" rel="noreferrer">Ogma</a></li></ul><p>The Ogma instance created by the component (or passed to if using useOgma).</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">Ogma</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :graph</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;graph&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;options&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> @addNodes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;onAddNodes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">NodeFilter</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nodeFilterOptions&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;true&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">NodeRule</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :attributes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nodeAttributes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">Ogma</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> axios </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;axios&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Ogma,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  NodeFilter,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  NodeRule,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  OgmaProps,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  NodeFilterProps,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  NodeRuleProps,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@linkurious/ogma-vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> graph</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">OgmaProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;graph&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]&gt;({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  nodes: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  edges: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nodeAttributes</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NodeRuleProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;attributes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]&gt;({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#33dd66&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nodeFilterOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NodeFilterProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;options&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]&gt;({</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  nodeFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;person&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onMounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  axios.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/some/api&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(({ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    graph.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> data;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onAddNodes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">nodes</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> NodeList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;new nodes: &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, nodes.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div>`,188),l=[r];function n(o,h,d,p,k,u){return a(),s("div",null,l)}const c=e(i,[["render",n]]);export{E as __pageData,c as default};