/*
  base2 - copyright 2007-2009, Dean Edwards
  http://code.google.com/p/base2/
  http://www.opensource.org/licenses/mit-license.php

  Contributors:
    Doeke Zanstra
*/
new function(_9){var rm=new base2.Package(this,{name:"rm",version:"0.1",imports:"Function2,dom,jsb",exports:"template,add,remove,moveup,movedown",parent:jsb});eval(this.imports);jsb.createStyleSheet({"[repeat=template],.jsb-template":{display:"none!"}});var _5=0,_0=1,_1=2;var _6=/(<\/?):/g,_7=/[\[\u02d1\u00b7\]]/,_4=Math.pow(2,32)-1,_8=/([\/(){}|*+-.,^$?\\])/g;function _2(b,a,c){return template.dispatchEvent(b,a,{element:c})};function _3(b){var a=DocumentEvent.createEvent(document,"Events");a.initEvent("BlocksModified",false,false);this.dispatchEvent(b.parentNode,a)};var element=behavior.extend({"repeat-min":0,"repeat-max":_4,"repeat-start":1,indexes:{},addRepetitionBlock:function(a,c){assertArity(arguments);if(!this.isTemplate(a))return null;var e=0;var d=a;while((d=d.previousSibling)){if(this.getRepetitionTemplate(d)==a){if(this.getRepetitionIndex(d)>=this.getRepetitionIndex(a)){this.setRepetitionIndex(a,this.getRepetitionIndex(d)+1)}e++}}if(e>=this.get(a,"repeat-max")){return null}var d=a.cloneNode(true);var g=_7.test(a.id)?"":a.id;if(g){var l;var i=g.replace(_8,"\\$1");var j=new RegExp("[\\[\\u02d1]"+i+"[\\u00b7\\]]","g");var k=this.getRepetitionIndex(a);var f=document.createElement("div");if(a.nodeName=="TR"){var h=document.createElement("table");h.appendChild(d);f.appendChild(h)}else{f.appendChild(d)}f.innerHTML=f.innerHTML.replace(_6,"$1html:").replace(j,k);d=f.getElementsByTagName(a.nodeName)[0];d.setAttribute("repeat-template",g);d.removeAttribute("id")}d.removeAttribute("repeat-start");d.removeAttribute("repeat-min");d.removeAttribute("repeat-max");d.setAttribute("repeat",String(this.getRepetitionIndex(a)));if(c==null){c=a;while(c.previousSibling&&!this.isBlock(c.previousSibling)){c=c.previousSibling}}else{c=c.nextSibling}d.style.display="";ClassList.remove(d,"jsb-template");ClassList.remove(d,"html5-template");forEach(this.querySelectorAll(d,"input[autofocus],textarea[autofocus],select[autofocus]"),function(b){b.removeAttribute("autofocus")});c.parentNode.insertBefore(d,c);this.setRepetitionIndex(a,this.getRepetitionIndex(a)+1);_2(a,"added",d);return d},moveRepetitionBlock:function(b,a){assertArity(arguments);if(!a||!this.isBlock(b))return;var c=b;var e=this.getRepetitionTemplate(b);if(a<0){while(a<0&&c.previousSibling&&!this.isTemplate(c)){c=c.previousSibling;if(this.isBlock(c)){a++}}}else{while(a>0&&c.nextSibling&&!this.isTemplate(c)){c=c.nextSibling;if(this.isBlock(c)){a--}}c=c.nextSibling}b.parentNode.insertBefore(b,c);if(e){_2(e,"moved",b)}},removeRepetitionBlock:function(b){assertArity(arguments);var a=this.getRepetitionTemplate(b);b.parentNode.removeChild(b);if(a){_2(a,"removed",b);var c=this.get(a,"repeat-min"),e=this.getRepetitionBlocks(a).length;while(e++<c){this.addRepetitionBlock(a,null)}}},isBlock:function(b){return this.getRepetitionType(b)==_1},isTemplate:function(b){return this.getRepetitionType(b)==_0},getRepetitionBlocks:function(b){var a={length:0};var c=b.parentNode.firstChild;while(c){if(this.getRepetitionTemplate(c)==b){a[a.length++]=c}c=c.nextSibling}return a},getRepetitionType:function(b){if(b&&b.nodeType==1){var a=this.get(b,"repeat");if(a=="template"){return _0}if(a!==""&&a!==null&&!isNaN(a)&&a>=0&&a<_4){return _1}}return _5},getRepetitionIndex:function(b){switch(this.getRepetitionType(b)){case _0:return this.indexes[b.uniqueID]||0;case _1:return Number(this.get(b,"repeat"));default:return 0}},setRepetitionIndex:function(b,a){switch(this.getRepetitionType(b)){case _0:this.indexes[b.uniqueID]=a;break;case _1:this.set(b,"repeat",a);break}return a},getRepetitionTemplate:function(b){if(this.isBlock(b)){if(this.hasAttribute(b,"repeat-template")){var a=document.getElementById(this.get(b,"repeat-template"))}else{a=b;while((a=a.nextSibling)&&!this.isTemplate(a)){continue}}if(a&&this.isTemplate(a)){return a}}return null}});var template=element.extend({onattach:function(b){b.style.display="none";var a=this.get(b,"repeat-min"),c=this.get(b,"repeat-start"),e=0;while(e++<c){this.addRepetitionBlock(b,null)}e=this.getRepetitionBlocks(b).length;while(e++<a){this.addRepetitionBlock(b,null)}},onadded:_3,onmoved:_3,onremoved:_3});var button=element.extend({getBlock:function(b){var a=b;while(a&&!this.isBlock(a)){a=a.parentNode}return a}});var add=button.extend({onattach:function(b){if(this.hasAttribute(b,"template")){var a=this.getHtmlTemplate(b)}else{var c=this.getBlock(b);if(c){a=this.getRepetitionTemplate(c)}}if(a){rm.template.attach(a)}b.disabled=!a},onclick:function(b,a){a.preventDefault();if(this.hasAttribute(b,"template")){var c=this.getHtmlTemplate(b);var e=null}else{e=this.getBlock(b);if(e){c=this.getRepetitionTemplate(e)}}if(c){this.addRepetitionBlock(c,e)}},getHtmlTemplate:function(b){var a=document.getElementById(this.get(b,"template"));if(this.isTemplate(a)){return a}return null}});var remove=button.extend({onattach:function(b){b.disabled=!this.getBlock(b)},onclick:function(b,a){a.preventDefault();var c=this.getBlock(b);if(c){this.removeRepetitionBlock(c)}}});var move=button.extend({onattach:function(a){var c=this;function e(){var b=c.getBlock(a);while(b&&(b=b[c.RELATIVE_NODE])&&!c.isBlock(b)){continue}a.disabled=!b};var d=this.getBlock(a);if(d){this.addEventListener(d.parentNode,"BlocksModified",e,false)}e()},onclick:function(b,a){a.preventDefault();var c=this.getBlock(b);if(c){this.moveRepetitionBlock(c,this.DIRECTION)}}});var moveup=move.extend({RELATIVE_NODE:"previousSibling",DIRECTION:-1});var movedown=move.extend({RELATIVE_NODE:"nextSibling",DIRECTION:1});eval(this.exports)};