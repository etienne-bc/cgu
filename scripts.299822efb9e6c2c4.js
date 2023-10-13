!function(x,z){"object"==typeof exports&&typeof module<"u"?z(exports):"function"==typeof define&&define.amd?define(["exports"],z):z((x=typeof globalThis<"u"?globalThis:x||self).marked={})}(this,function(x){"use strict";function z(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}function P(g){x.defaults=g}x.defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};const v=/[&<>"']/,F=new RegExp(v.source,"g"),B=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,N=new RegExp(B.source,"g"),G={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Q=g=>G[g];function m(g,n){if(n){if(v.test(g))return g.replace(F,Q)}else if(B.test(g))return g.replace(N,Q);return g}const J=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,K=/(^|[^\[])\^/g;function f(g,n){g="string"==typeof g?g:g.source,n=n||"";const e={replace:(t,s)=>(s=(s="object"==typeof s&&"source"in s?s.source:s).replace(K,"$1"),g=g.replace(t,s),e),getRegex:()=>new RegExp(g,n)};return e}function O(g){try{g=encodeURI(g).replace(/%25/g,"%")}catch{return null}return g}const E={exec:()=>null};function C(g,n){const e=g.replace(/\|/g,(s,r,i)=>{let l=!1,o=r;for(;--o>=0&&"\\"===i[o];)l=!l;return l?"|":" |"}).split(/ \|/);let t=0;if(e[0].trim()||e.shift(),e.length>0&&!e[e.length-1].trim()&&e.pop(),n)if(e.length>n)e.splice(n);else for(;e.length<n;)e.push("");for(;t<e.length;t++)e[t]=e[t].trim().replace(/\\\|/g,"|");return e}function q(g,n,e){const t=g.length;if(0===t)return"";let s=0;for(;s<t;){const r=g.charAt(t-s-1);if(r!==n||e){if(r===n||!e)break;s++}else s++}return g.slice(0,t-s)}function j(g,n,e,t){const s=n.href,r=n.title?m(n.title):null,i=g[1].replace(/\\([\[\]])/g,"$1");if("!"!==g[0].charAt(0)){t.state.inLink=!0;const l={type:"link",raw:e,href:s,title:r,text:i,tokens:t.inlineTokens(i)};return t.state.inLink=!1,l}return{type:"image",raw:e,href:s,title:r,text:m(i)}}class R{options;rules;lexer;constructor(n){this.options=n||x.defaults}space(n){const e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){const e=this.rules.block.code.exec(n);if(e){const t=e[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:q(t,"\n")}}}fences(n){const e=this.rules.block.fences.exec(n);if(e){const t=e[0],s=function(r,i){const l=r.match(/^(\s+)(?:```)/);if(null===l)return i;const o=l[1];return i.split("\n").map(h=>{const c=h.match(/^\s+/);if(null===c)return h;const[k]=c;return k.length>=o.length?h.slice(o.length):h}).join("\n")}(t,e[3]||"");return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline._escapes,"$1"):e[2],text:s}}}heading(n){const e=this.rules.block.heading.exec(n);if(e){let t=e[2].trim();if(/#$/.test(t)){const s=q(t,"#");this.options.pedantic?t=s.trim():s&&!/ $/.test(s)||(t=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(n){const e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:e[0]}}blockquote(n){const e=this.rules.block.blockquote.exec(n);if(e){const t=e[0].replace(/^ *>[ \t]?/gm,""),s=this.lexer.state.top;this.lexer.state.top=!0;const r=this.lexer.blockTokens(t);return this.lexer.state.top=s,{type:"blockquote",raw:e[0],tokens:r,text:t}}}list(n){let e=this.rules.block.list.exec(n);if(e){let t=e[1].trim();const s=t.length>1,r={type:"list",raw:"",ordered:s,start:s?+t.slice(0,-1):"",loose:!1,items:[]};t=s?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=s?t:"[*+-]");const i=new RegExp(`^( {0,3}${t})((?:[\t ][^\\n]*)?(?:\\n|$))`);let l="",o="",h=!1;for(;n;){let c=!1;if(!(e=i.exec(n))||this.rules.block.hr.test(n))break;l=e[0],n=n.substring(l.length);let k=e[2].split("\n",1)[0].replace(/^\t+/,L=>" ".repeat(3*L.length)),u=n.split("\n",1)[0],b=0;this.options.pedantic?(b=2,o=k.trimStart()):(b=e[2].search(/[^ ]/),b=b>4?1:b,o=k.slice(b),b+=e[1].length);let I=!1;if(!k&&/^ *$/.test(u)&&(l+=u+"\n",n=n.substring(u.length+1),c=!0),!c){const L=new RegExp(`^ {0,${Math.min(3,b-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),U=new RegExp(`^ {0,${Math.min(3,b-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),H=new RegExp(`^ {0,${Math.min(3,b-1)}}(?:\`\`\`|~~~)`),X=new RegExp(`^ {0,${Math.min(3,b-1)}}#`);for(;n;){const D=n.split("\n",1)[0];if(u=D,this.options.pedantic&&(u=u.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),H.test(u)||X.test(u)||L.test(u)||U.test(n))break;if(u.search(/[^ ]/)>=b||!u.trim())o+="\n"+u.slice(b);else{if(I||k.search(/[^ ]/)>=4||H.test(k)||X.test(k)||U.test(k))break;o+="\n"+u}I||u.trim()||(I=!0),l+=D+"\n",n=n.substring(D.length+1),k=u.slice(b)}}r.loose||(h?r.loose=!0:/\n *\n *$/.test(l)&&(h=!0));let T,y=null;this.options.gfm&&(y=/^\[[ xX]\] /.exec(o),y&&(T="[ ] "!==y[0],o=o.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:l,task:!!y,checked:T,loose:!1,text:o,tokens:[]}),r.raw+=l}r.items[r.items.length-1].raw=l.trimEnd(),r.items[r.items.length-1].text=o.trimEnd(),r.raw=r.raw.trimEnd();for(let c=0;c<r.items.length;c++)if(this.lexer.state.top=!1,r.items[c].tokens=this.lexer.blockTokens(r.items[c].text,[]),!r.loose){const k=r.items[c].tokens.filter(b=>"space"===b.type),u=k.length>0&&k.some(b=>/\n.*\n/.test(b.raw));r.loose=u}if(r.loose)for(let c=0;c<r.items.length;c++)r.items[c].loose=!0;return r}}html(n){const e=this.rules.block.html.exec(n);if(e)return{type:"html",block:!0,raw:e[0],pre:"pre"===e[1]||"script"===e[1]||"style"===e[1],text:e[0]}}def(n){const e=this.rules.block.def.exec(n);if(e){const t=e[1].toLowerCase().replace(/\s+/g," "),s=e[2]?e[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline._escapes,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:s,title:r}}}table(n){const e=this.rules.block.table.exec(n);if(e){if(!/[:|]/.test(e[2]))return;const t={type:"table",raw:e[0],header:C(e[1]).map(s=>({text:s,tokens:[]})),align:e[2].replace(/^\||\| *$/g,"").split("|"),rows:e[3]&&e[3].trim()?e[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(t.header.length===t.align.length){let s,r,i,l,o=t.align.length;for(s=0;s<o;s++){const h=t.align[s];h&&(t.align[s]=/^ *-+: *$/.test(h)?"right":/^ *:-+: *$/.test(h)?"center":/^ *:-+ *$/.test(h)?"left":null)}for(o=t.rows.length,s=0;s<o;s++)t.rows[s]=C(t.rows[s],t.header.length).map(h=>({text:h,tokens:[]}));for(o=t.header.length,r=0;r<o;r++)t.header[r].tokens=this.lexer.inline(t.header[r].text);for(o=t.rows.length,r=0;r<o;r++)for(l=t.rows[r],i=0;i<l.length;i++)l[i].tokens=this.lexer.inline(l[i].text);return t}}}lheading(n){const e=this.rules.block.lheading.exec(n);if(e)return{type:"heading",raw:e[0],depth:"="===e[2].charAt(0)?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(n){const e=this.rules.block.paragraph.exec(n);if(e){const t="\n"===e[1].charAt(e[1].length-1)?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(n){const e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){const e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:m(e[1])}}tag(n){const e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&/^<a /i.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){const e=this.rules.inline.link.exec(n);if(e){const t=e[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;const i=q(t.slice(0,-1),"\\");if((t.length-i.length)%2==0)return}else{const i=function(l,o){if(-1===l.indexOf(o[1]))return-1;let h=0;for(let c=0;c<l.length;c++)if("\\"===l[c])c++;else if(l[c]===o[0])h++;else if(l[c]===o[1]&&(h--,h<0))return c;return-1}(e[2],"()");if(i>-1){const l=(0===e[0].indexOf("!")?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,l).trim(),e[3]=""}}let s=e[2],r="";if(this.options.pedantic){const i=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);i&&(s=i[1],r=i[3])}else r=e[3]?e[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(s=this.options.pedantic&&!/>$/.test(t)?s.slice(1):s.slice(1,-1)),j(e,{href:s&&s.replace(this.rules.inline._escapes,"$1"),title:r&&r.replace(this.rules.inline._escapes,"$1")},e[0],this.lexer)}}reflink(n,e){let t;if((t=this.rules.inline.reflink.exec(n))||(t=this.rules.inline.nolink.exec(n))){let s=(t[2]||t[1]).replace(/\s+/g," ");if(s=e[s.toLowerCase()],!s){const r=t[0].charAt(0);return{type:"text",raw:r,text:r}}return j(t,s,t[0],this.lexer)}}emStrong(n,e,t=""){let s=this.rules.inline.emStrong.lDelim.exec(n);if(s&&(!s[3]||!t.match(/[\p{L}\p{N}]/u))&&(!s[1]&&!s[2]||!t||this.rules.inline.punctuation.exec(t))){const r=[...s[0]].length-1;let i,l,o=r,h=0;const c="*"===s[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(c.lastIndex=0,e=e.slice(-1*n.length+s[0].length-1);null!=(s=c.exec(e));){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(l=[...i].length,s[3]||s[4]){o+=l;continue}if((s[5]||s[6])&&r%3&&!((r+l)%3)){h+=l;continue}if(o-=l,o>0)continue;l=Math.min(l,l+o+h);const k=[...n].slice(0,r+s.index+l+1).join("");if(Math.min(r,l)%2){const b=k.slice(1,-1);return{type:"em",raw:k,text:b,tokens:this.lexer.inlineTokens(b)}}const u=k.slice(2,-2);return{type:"strong",raw:k,text:u,tokens:this.lexer.inlineTokens(u)}}}}codespan(n){const e=this.rules.inline.code.exec(n);if(e){let t=e[2].replace(/\n/g," ");const s=/[^ ]/.test(t),r=/^ /.test(t)&&/ $/.test(t);return s&&r&&(t=t.substring(1,t.length-1)),t=m(t,!0),{type:"codespan",raw:e[0],text:t}}}br(n){const e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n){const e=this.rules.inline.del.exec(n);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(n){const e=this.rules.inline.autolink.exec(n);if(e){let t,s;return"@"===e[2]?(t=m(e[1]),s="mailto:"+t):(t=m(e[1]),s=t),{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}url(n){let e;if(e=this.rules.inline.url.exec(n)){let t,s;if("@"===e[2])t=m(e[0]),s="mailto:"+t;else{let r;do{r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])[0]}while(r!==e[0]);t=m(e[0]),s="www."===e[1]?"http://"+e[0]:e[0]}return{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(n){const e=this.rules.inline.text.exec(n);if(e){let t;return t=this.lexer.state.inRawBlock?e[0]:m(e[0]),{type:"text",raw:e[0],text:t}}}}const p={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:E,lheading:/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};p.def=f(p.def).replace("label",p._label).replace("title",p._title).getRegex(),p.bullet=/(?:[*+-]|\d{1,9}[.)])/,p.listItemStart=f(/^( *)(bull) */).replace("bull",p.bullet).getRegex(),p.list=f(p.list).replace(/bull/g,p.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+p.def.source+")").getRegex(),p._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",p._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,p.html=f(p.html,"i").replace("comment",p._comment).replace("tag",p._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),p.lheading=f(p.lheading).replace(/bull/g,p.bullet).getRegex(),p.paragraph=f(p._paragraph).replace("hr",p.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",p._tag).getRegex(),p.blockquote=f(p.blockquote).replace("paragraph",p.paragraph).getRegex(),p.normal={...p},p.gfm={...p.normal,table:"^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"},p.gfm.table=f(p.gfm.table).replace("hr",p.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",p._tag).getRegex(),p.gfm.paragraph=f(p._paragraph).replace("hr",p.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",p.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",p._tag).getRegex(),p.pedantic={...p.normal,html:f("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",p._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:E,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:f(p.normal._paragraph).replace("hr",p.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",p.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const a={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:E,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,rDelimAst:/^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:E,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^((?![*_])[\spunctuation])/,_punctuation:"\\p{P}$+<=>`^|~"};a.punctuation=f(a.punctuation,"u").replace(/punctuation/g,a._punctuation).getRegex(),a.blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,a.anyPunctuation=/\\[punct]/g,a._escapes=/\\([punct])/g,a._comment=f(p._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),a.emStrong.lDelim=f(a.emStrong.lDelim,"u").replace(/punct/g,a._punctuation).getRegex(),a.emStrong.rDelimAst=f(a.emStrong.rDelimAst,"gu").replace(/punct/g,a._punctuation).getRegex(),a.emStrong.rDelimUnd=f(a.emStrong.rDelimUnd,"gu").replace(/punct/g,a._punctuation).getRegex(),a.anyPunctuation=f(a.anyPunctuation,"gu").replace(/punct/g,a._punctuation).getRegex(),a._escapes=f(a._escapes,"gu").replace(/punct/g,a._punctuation).getRegex(),a._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,a._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,a.autolink=f(a.autolink).replace("scheme",a._scheme).replace("email",a._email).getRegex(),a._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,a.tag=f(a.tag).replace("comment",a._comment).replace("attribute",a._attribute).getRegex(),a._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,a._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,a._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,a.link=f(a.link).replace("label",a._label).replace("href",a._href).replace("title",a._title).getRegex(),a.reflink=f(a.reflink).replace("label",a._label).replace("ref",p._label).getRegex(),a.nolink=f(a.nolink).replace("ref",p._label).getRegex(),a.reflinkSearch=f(a.reflinkSearch,"g").replace("reflink",a.reflink).replace("nolink",a.nolink).getRegex(),a.normal={...a},a.pedantic={...a.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:f(/^!?\[(label)\]\((.*?)\)/).replace("label",a._label).getRegex(),reflink:f(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",a._label).getRegex()},a.gfm={...a.normal,escape:f(a.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},a.gfm.url=f(a.gfm.url,"i").replace("email",a.gfm._extended_email).getRegex(),a.breaks={...a.gfm,br:f(a.br).replace("{2,}","*").getRegex(),text:f(a.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};class w{tokens;options;state;tokenizer;inlineQueue;constructor(n){this.tokens=[],this.tokens.links=Object.create(null),this.options=n||x.defaults,this.options.tokenizer=this.options.tokenizer||new R,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const e={block:p.normal,inline:a.normal};this.options.pedantic?(e.block=p.pedantic,e.inline=a.pedantic):this.options.gfm&&(e.block=p.gfm,e.inline=this.options.breaks?a.breaks:a.gfm),this.tokenizer.rules=e}static get rules(){return{block:p,inline:a}}static lex(n,e){return new w(e).lex(n)}static lexInline(n,e){return new w(e).inlineTokens(n)}lex(n){let e;for(n=n.replace(/\r\n|\r/g,"\n"),this.blockTokens(n,this.tokens);e=this.inlineQueue.shift();)this.inlineTokens(e.src,e.tokens);return this.tokens}blockTokens(n,e=[]){let t,s,r,i;for(n=this.options.pedantic?n.replace(/\t/g,"    ").replace(/^ +$/gm,""):n.replace(/^( *)(\t+)/gm,(l,o,h)=>o+"    ".repeat(h.length));n;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>!!(t=l.call({lexer:this},n,e))&&(n=n.substring(t.raw.length),e.push(t),!0))))if(t=this.tokenizer.space(n))n=n.substring(t.raw.length),1===t.raw.length&&e.length>0?e[e.length-1].raw+="\n":e.push(t);else if(t=this.tokenizer.code(n))n=n.substring(t.raw.length),s=e[e.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?e.push(t):(s.raw+="\n"+t.raw,s.text+="\n"+t.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(t=this.tokenizer.fences(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.heading(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.hr(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.blockquote(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.list(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.html(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.def(n))n=n.substring(t.raw.length),s=e[e.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title}):(s.raw+="\n"+t.raw,s.text+="\n"+t.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(t=this.tokenizer.table(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.lheading(n))n=n.substring(t.raw.length),e.push(t);else{if(r=n,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const o=n.slice(1);let h;this.options.extensions.startBlock.forEach(c=>{h=c.call({lexer:this},o),"number"==typeof h&&h>=0&&(l=Math.min(l,h))}),l<1/0&&l>=0&&(r=n.substring(0,l+1))}if(this.state.top&&(t=this.tokenizer.paragraph(r)))s=e[e.length-1],i&&"paragraph"===s.type?(s.raw+="\n"+t.raw,s.text+="\n"+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):e.push(t),i=r.length!==n.length,n=n.substring(t.raw.length);else if(t=this.tokenizer.text(n))n=n.substring(t.raw.length),s=e[e.length-1],s&&"text"===s.type?(s.raw+="\n"+t.raw,s.text+="\n"+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):e.push(t);else if(n){const l="Infinite loop on byte: "+n.charCodeAt(0);if(this.options.silent){console.error(l);break}throw new Error(l)}}return this.state.top=!0,e}inline(n,e=[]){return this.inlineQueue.push({src:n,tokens:e}),e}inlineTokens(n,e=[]){let t,s,r,i,l,o,h=n;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;null!=(i=this.tokenizer.rules.inline.reflinkSearch.exec(h));)c.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(h=h.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+h.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(i=this.tokenizer.rules.inline.blockSkip.exec(h));)h=h.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+h.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(i=this.tokenizer.rules.inline.anyPunctuation.exec(h));)h=h.slice(0,i.index)+"++"+h.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;n;)if(l||(o=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>!!(t=c.call({lexer:this},n,e))&&(n=n.substring(t.raw.length),e.push(t),!0))))if(t=this.tokenizer.escape(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.tag(n))n=n.substring(t.raw.length),s=e[e.length-1],s&&"text"===t.type&&"text"===s.type?(s.raw+=t.raw,s.text+=t.text):e.push(t);else if(t=this.tokenizer.link(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.reflink(n,this.tokens.links))n=n.substring(t.raw.length),s=e[e.length-1],s&&"text"===t.type&&"text"===s.type?(s.raw+=t.raw,s.text+=t.text):e.push(t);else if(t=this.tokenizer.emStrong(n,h,o))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.codespan(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.br(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.del(n))n=n.substring(t.raw.length),e.push(t);else if(t=this.tokenizer.autolink(n))n=n.substring(t.raw.length),e.push(t);else if(this.state.inLink||!(t=this.tokenizer.url(n))){if(r=n,this.options.extensions&&this.options.extensions.startInline){let c=1/0;const k=n.slice(1);let u;this.options.extensions.startInline.forEach(b=>{u=b.call({lexer:this},k),"number"==typeof u&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(r=n.substring(0,c+1))}if(t=this.tokenizer.inlineText(r))n=n.substring(t.raw.length),"_"!==t.raw.slice(-1)&&(o=t.raw.slice(-1)),l=!0,s=e[e.length-1],s&&"text"===s.type?(s.raw+=t.raw,s.text+=t.text):e.push(t);else if(n){const c="Infinite loop on byte: "+n.charCodeAt(0);if(this.options.silent){console.error(c);break}throw new Error(c)}}else n=n.substring(t.raw.length),e.push(t);return e}}class S{options;constructor(n){this.options=n||x.defaults}code(n,e,t){const s=(e||"").match(/^\S*/)?.[0];return n=n.replace(/\n$/,"")+"\n",s?'<pre><code class="language-'+m(s)+'">'+(t?n:m(n,!0))+"</code></pre>\n":"<pre><code>"+(t?n:m(n,!0))+"</code></pre>\n"}blockquote(n){return`<blockquote>\n${n}</blockquote>\n`}html(n,e){return n}heading(n,e,t){return`<h${e}>${n}</h${e}>\n`}hr(){return"<hr>\n"}list(n,e,t){const s=e?"ol":"ul";return"<"+s+(e&&1!==t?' start="'+t+'"':"")+">\n"+n+"</"+s+">\n"}listitem(n,e,t){return`<li>${n}</li>\n`}checkbox(n){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(n){return`<p>${n}</p>\n`}table(n,e){return e&&(e=`<tbody>${e}</tbody>`),"<table>\n<thead>\n"+n+"</thead>\n"+e+"</table>\n"}tablerow(n){return`<tr>\n${n}</tr>\n`}tablecell(n,e){const t=e.header?"th":"td";return(e.align?`<${t} align="${e.align}">`:`<${t}>`)+n+`</${t}>\n`}strong(n){return`<strong>${n}</strong>`}em(n){return`<em>${n}</em>`}codespan(n){return`<code>${n}</code>`}br(){return"<br>"}del(n){return`<del>${n}</del>`}link(n,e,t){const s=O(n);if(null===s)return t;let r='<a href="'+(n=s)+'"';return e&&(r+=' title="'+e+'"'),r+=">"+t+"</a>",r}image(n,e,t){const s=O(n);if(null===s)return t;let r=`<img src="${n=s}" alt="${t}"`;return e&&(r+=` title="${e}"`),r+=">",r}text(n){return n}}class Z{strong(n){return n}em(n){return n}codespan(n){return n}del(n){return n}html(n){return n}text(n){return n}link(n,e,t){return""+t}image(n,e,t){return""+t}br(){return""}}class _{options;renderer;textRenderer;constructor(n){this.options=n||x.defaults,this.options.renderer=this.options.renderer||new S,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Z}static parse(n,e){return new _(e).parse(n)}static parseInline(n,e){return new _(e).parseInline(n)}parse(n,e=!0){let t="";for(let s=0;s<n.length;s++){const r=n[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const i=r,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(!1!==l||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(i.type)){t+=l||"";continue}}switch(r.type){case"space":continue;case"hr":t+=this.renderer.hr();continue;case"heading":{const i=r;t+=this.renderer.heading(this.parseInline(i.tokens),i.depth,this.parseInline(i.tokens,this.textRenderer).replace(J,(l,o)=>"colon"===(o=o.toLowerCase())?":":"#"===o.charAt(0)?"x"===o.charAt(1)?String.fromCharCode(parseInt(o.substring(2),16)):String.fromCharCode(+o.substring(1)):""));continue}case"code":t+=this.renderer.code(r.text,r.lang,!!r.escaped);continue;case"table":{const i=r;let l="",o="";for(let c=0;c<i.header.length;c++)o+=this.renderer.tablecell(this.parseInline(i.header[c].tokens),{header:!0,align:i.align[c]});l+=this.renderer.tablerow(o);let h="";for(let c=0;c<i.rows.length;c++){const k=i.rows[c];o="";for(let u=0;u<k.length;u++)o+=this.renderer.tablecell(this.parseInline(k[u].tokens),{header:!1,align:i.align[u]});h+=this.renderer.tablerow(o)}t+=this.renderer.table(l,h);continue}case"blockquote":{const l=this.parse(r.tokens);t+=this.renderer.blockquote(l);continue}case"list":{const i=r,l=i.ordered,o=i.start,h=i.loose;let c="";for(let k=0;k<i.items.length;k++){const u=i.items[k],b=u.checked,I=u.task;let T="";if(u.task){const y=this.renderer.checkbox(!!b);h?u.tokens.length>0&&"paragraph"===u.tokens[0].type?(u.tokens[0].text=y+" "+u.tokens[0].text,u.tokens[0].tokens&&u.tokens[0].tokens.length>0&&"text"===u.tokens[0].tokens[0].type&&(u.tokens[0].tokens[0].text=y+" "+u.tokens[0].tokens[0].text)):u.tokens.unshift({type:"text",text:y+" "}):T+=y+" "}T+=this.parse(u.tokens,h),c+=this.renderer.listitem(T,I,!!b)}t+=this.renderer.list(c,l,o);continue}case"html":t+=this.renderer.html(r.text,r.block);continue;case"paragraph":t+=this.renderer.paragraph(this.parseInline(r.tokens));continue;case"text":{let i=r,l=i.tokens?this.parseInline(i.tokens):i.text;for(;s+1<n.length&&"text"===n[s+1].type;)i=n[++s],l+="\n"+(i.tokens?this.parseInline(i.tokens):i.text);t+=e?this.renderer.paragraph(l):l;continue}default:{const i='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return t}parseInline(n,e){e=e||this.renderer;let t="";for(let s=0;s<n.length;s++){const r=n[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const i=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==i||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){t+=i||"";continue}}switch(r.type){case"escape":case"text":t+=e.text(r.text);break;case"html":t+=e.html(r.text);break;case"link":t+=e.link(r.href,r.title,this.parseInline(r.tokens,e));break;case"image":t+=e.image(r.href,r.title,r.text);break;case"strong":t+=e.strong(this.parseInline(r.tokens,e));break;case"em":t+=e.em(this.parseInline(r.tokens,e));break;case"codespan":t+=e.codespan(r.text);break;case"br":t+=e.br();break;case"del":t+=e.del(this.parseInline(r.tokens,e));break;default:{const i='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return t}}class A{options;constructor(n){this.options=n||x.defaults}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(n){return n}postprocess(n){return n}}class M{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.#e(w.lex,_.parse);parseInline=this.#e(w.lexInline,_.parseInline);Parser=_;parser=_.parse;Renderer=S;TextRenderer=Z;Lexer=w;lexer=w.lex;Tokenizer=R;Hooks=A;constructor(...n){this.use(...n)}walkTokens(n,e){let t=[];for(const s of n)switch(t=t.concat(e.call(this,s)),s.type){case"table":{const r=s;for(const i of r.header)t=t.concat(this.walkTokens(i.tokens,e));for(const i of r.rows)for(const l of i)t=t.concat(this.walkTokens(l.tokens,e));break}case"list":t=t.concat(this.walkTokens(s.items,e));break;default:{const r=s;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{t=t.concat(this.walkTokens(r[i],e))}):r.tokens&&(t=t.concat(this.walkTokens(r.tokens,e)))}}return t}use(...n){const e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(t=>{const s={...t};if(s.async=this.defaults.async||s.async||!1,t.extensions&&(t.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const i=e.renderers[r.name];e.renderers[r.name]=i?function(...l){let o=r.renderer.apply(this,l);return!1===o&&(o=i.apply(this,l)),o}:r.renderer}if("tokenizer"in r){if(!r.level||"block"!==r.level&&"inline"!==r.level)throw new Error("extension level must be 'block' or 'inline'");const i=e[r.level];i?i.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&("block"===r.level?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:"inline"===r.level&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),s.extensions=e),t.renderer){const r=this.defaults.renderer||new S(this.defaults);for(const i in t.renderer){const l=t.renderer[i],h=r[i];r[i]=(...c)=>{let k=l.apply(r,c);return!1===k&&(k=h.apply(r,c)),k||""}}s.renderer=r}if(t.tokenizer){const r=this.defaults.tokenizer||new R(this.defaults);for(const i in t.tokenizer){const l=t.tokenizer[i],h=r[i];r[i]=(...c)=>{let k=l.apply(r,c);return!1===k&&(k=h.apply(r,c)),k}}s.tokenizer=r}if(t.hooks){const r=this.defaults.hooks||new A;for(const i in t.hooks){const l=t.hooks[i],h=r[i];r[i]=A.passThroughHooks.has(i)?c=>{if(this.defaults.async)return Promise.resolve(l.call(r,c)).then(u=>h.call(r,u));const k=l.call(r,c);return h.call(r,k)}:(...c)=>{let k=l.apply(r,c);return!1===k&&(k=h.apply(r,c)),k}}s.hooks=r}if(t.walkTokens){const r=this.defaults.walkTokens,i=t.walkTokens;s.walkTokens=function(l){let o=[];return o.push(i.call(this,l)),r&&(o=o.concat(r.call(this,l))),o}}this.defaults={...this.defaults,...s}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}#e(n,e){return(t,s)=>{const r={...s},i={...this.defaults,...r};!0===this.defaults.async&&!1===r.async&&(i.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),i.async=!0);const l=this.#t(!!i.silent,!!i.async);if(null==t)return l(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i),i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(t):t).then(o=>n(o,i)).then(o=>i.walkTokens?Promise.all(this.walkTokens(o,i.walkTokens)).then(()=>o):o).then(o=>e(o,i)).then(o=>i.hooks?i.hooks.postprocess(o):o).catch(l);try{i.hooks&&(t=i.hooks.preprocess(t));const o=n(t,i);i.walkTokens&&this.walkTokens(o,i.walkTokens);let h=e(o,i);return i.hooks&&(h=i.hooks.postprocess(h)),h}catch(o){return l(o)}}}#t(n,e){return t=>{if(t.message+="\nPlease report this to https://github.com/markedjs/marked.",n){const s="<p>An error occurred:</p><pre>"+m(t.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(t);throw t}}}const $=new M;function d(g,n){return $.parse(g,n)}d.options=d.setOptions=function(g){return $.setOptions(g),P(d.defaults=$.defaults),d},d.getDefaults=z,d.defaults=x.defaults,d.use=function(...g){return $.use(...g),P(d.defaults=$.defaults),d},d.walkTokens=function(g,n){return $.walkTokens(g,n)},d.parseInline=$.parseInline,d.Parser=_,d.parser=_.parse,d.Renderer=S,d.TextRenderer=Z,d.Lexer=w,d.lexer=w.lex,d.Tokenizer=R,d.Hooks=A,d.parse=d;const V=d.options,W=d.setOptions,Y=d.use,ee=d.walkTokens,te=d.parseInline,ne=d,se=_.parse,re=w.lex;x.Hooks=A,x.Lexer=w,x.Marked=M,x.Parser=_,x.Renderer=S,x.TextRenderer=Z,x.Tokenizer=R,x.getDefaults=z,x.lexer=re,x.marked=d,x.options=V,x.parse=ne,x.parseInline=te,x.parser=se,x.setOptions=W,x.use=Y,x.walkTokens=ee});