import{_ as n,o as s,c as a,e as p}from"./app.cd3845f5.js";const t={},e={class:"language-vue ext-vue line-numbers-mode"},o=p(`<pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
...
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>StyleClass</span>
    <span class="token attr-name">:options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>classOptions<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">/&gt;</span></span>
...
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> StyleClass <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@linkurious/ogma-vue&quot;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;example&quot;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">classOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;super class&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">nodes</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ogma<span class="token punctuation">.</span><span class="token function">getNodeList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">edges</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ogma<span class="token punctuation">.</span><span class="token function">getEdges</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">nodeAttributes</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&quot;blue&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">edgeAttributes</span><span class="token operator">:</span><span class="token punctuation">{</span>
          <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&quot;blue&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div>`,2),l=[o];function c(r,u){return s(),a("div",e,l)}var k=n(t,[["render",c],["__file","style-class.html.vue"]]);export{k as default};
