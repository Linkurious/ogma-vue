import{_ as s,o as i,c as a,R as n}from"./chunks/framework.q9FnI7o_.js";const c=JSON.parse('{"title":"NodeGrouping","description":"","frontmatter":{},"headers":[],"relativePath":"src/components/transformations/NodeGrouping.md","filePath":"src/components/transformations/NodeGrouping.md"}'),e={name:"src/components/transformations/NodeGrouping.md"},t=n(`<h1 id="nodegrouping" tabindex="-1">NodeGrouping <a class="header-anchor" href="#nodegrouping" aria-label="Permalink to &quot;NodeGrouping&quot;">​</a></h1><p>Creates a transformation that groups nodes.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><h3 id="enabled" tabindex="-1">enabled <a class="header-anchor" href="#enabled" aria-label="Permalink to &quot;enabled&quot;">​</a></h3><ul><li><p>type: <code>boolean</code></p></li><li><p>default: <code>True</code></p><p>Whether the transformation is enabled or not.</p></li></ul><h3 id="duration" tabindex="-1">duration <a class="header-anchor" href="#duration" aria-label="Permalink to &quot;duration&quot;">​</a></h3><ul><li><p>type: <code>number</code></p></li><li><p>default: <code>0</code></p><p>Animation duration.</p></li></ul><h3 id="events" tabindex="-1">events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;events&quot;">​</a></h3><ul><li><p>type: <code>string | string[]</code></p></li><li><p>default: <code>&#39;all&#39;</code></p></li><li><p>values: <code>&#39;all&#39; | &#39;enabled&#39; | &#39;disabled&#39; | &#39;refreshed&#39; | &#39;indexChanged&#39; | &#39;destroyed&#39;</code></p><p>Which events to register on.</p></li></ul><h3 id="options" tabindex="-1">options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;options&quot;">​</a></h3><ul><li><p>type: <code>() =&gt; options: </code><a href="https://doc.linkurious.com/ogma/latest/api.html#NodeGroupingOptions" target="_blank" rel="noreferrer">NodeGroupingOptions</a></p></li><li><p>default: <code>() =&gt; ({ })</code></p><p>Options for the transformation. See <a href="https://doc.linkurious.com/ogma/latest/api.html#NodeGroupingOptions" target="_blank" rel="noreferrer">NodeGroupingOptions</a>.</p></li></ul><h2 id="events-1" tabindex="-1">Events <a class="header-anchor" href="#events-1" aria-label="Permalink to &quot;Events&quot;">​</a></h2><h3 id="enabled-1" tabindex="-1">enabled <a class="header-anchor" href="#enabled-1" aria-label="Permalink to &quot;enabled&quot;">​</a></h3><ul><li>payload: <code>transformation: NodeGrouping</code></li></ul><p>Emitted when the transformation is enabled.</p><h3 id="disabled" tabindex="-1">disabled <a class="header-anchor" href="#disabled" aria-label="Permalink to &quot;disabled&quot;">​</a></h3><ul><li>payload: <code>transformation: NodeGrouping</code></li></ul><p>Emitted when the transformation is disabled.</p><h3 id="refreshed" tabindex="-1">refreshed <a class="header-anchor" href="#refreshed" aria-label="Permalink to &quot;refreshed&quot;">​</a></h3><ul><li>payload: <code>transformation: NodeGrouping</code></li></ul><p>Emitted when the transformation is refreshed.</p><h3 id="indexchanged" tabindex="-1">indexChanged <a class="header-anchor" href="#indexchanged" aria-label="Permalink to &quot;indexChanged&quot;">​</a></h3><ul><li>payload: <code>transformation: NodeGrouping</code></li></ul><p>Emitted when the transformation index is changed. See <a href="https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html" target="_blank" rel="noreferrer">transformation pipeline</a>.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">NodeGrouping</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    :options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;grouping.options&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    :enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;grouping.enabled&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    :duration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;grouping.duration&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;onEnabled&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { NodeGrouping, NodeGroupingProps } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@linkurious/ogma-vue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> grouping</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NodeGroupingProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  enabled: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  options: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    selector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    groupIdFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> node.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onEnabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">transformation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Enabled: &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, transformation);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div>`,26),l=[t];function h(p,r,o,k,d,E){return i(),a("div",null,l)}const u=s(e,[["render",h]]);export{c as __pageData,u as default};
