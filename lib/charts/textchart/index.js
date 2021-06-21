'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _d=require('d3');var d3=_interopRequireWildcard(_d);var _chart=require('../../chart');var _chart2=_interopRequireDefault(_chart);var _color=require('../../visualization/color');var _color2=_interopRequireDefault(_color);var _format=require('../../visualization/format');var _format2=_interopRequireDefault(_format);var _size=require('../../visualization/size');var _size2=_interopRequireDefault(_size);var _style=require('../../visualization/style');var _style2=_interopRequireDefault(_style);var _pictogram=require('../../visualization/pictogram');var _pictogram2=_interopRequireDefault(_pictogram);var _metaphor=require('../../metaphor/metaphor4.png');var _metaphor2=_interopRequireDefault(_metaphor);var _metaphor3=require('../../metaphor/metaphor28.png');var _metaphor4=_interopRequireDefault(_metaphor3);var _metaphor5=require('../../metaphor/metaphor18.png');var _metaphor6=_interopRequireDefault(_metaphor5);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//value
// import metaphor27 from '../../metaphor/metaphor27.png';//difference up
//difference
//extreme
// import difference from './difference.png';
var TextChart=function(_Chart){_inherits(TextChart,_Chart);function TextChart(){_classCallCheck(this,TextChart);return _possibleConstructorReturn(this,(TextChart.__proto__||Object.getPrototypeOf(TextChart)).apply(this,arguments));}_createClass(TextChart,[{key:'animateValue',/*-------------------------------------------------------------------------- */value:function animateValue(){var svg=this.displayValue();if(!svg)return;/* ------------ init data ----------- */var duration=this.duration();/* ---------- step 1 textnameAppear ---------- */var valuefield=svg.select("#valuefield");valuefield.attr("opacity",0);valuefield.transition().duration(duration*0.3).attr("opacity",1);/* ---------- step 1 textGrow --------------- */var textvalue=svg.select("#valuetext");// let showedValue = textvalue.node().innerHTML.replace(/,/g, '');
textvalue.attr("opacity",0);// .text(0);
// text grow;
textvalue.transition().delay(duration*0.3).duration(duration*0.7).ease(d3.easeLinear).attr("opacity",1);// textvalue.transition()
//     .delay(duration * 0.3 + 10)
//     .duration(duration * 0.7)
//     .ease(d3.easeLinear)
//     .textTween(function (d) {
//         // let final = d3.select(this).text();
//         let final = showedValue;
//         const i = d3.interpolate(0, +final);
//         var numberFormat = d3.format(".0f");
//         return function (t) {
//             var percent = formatNumber(+numberFormat(i(t)));
//             return percent;
//         };
//     });
}},{key:'displayValue',value:function displayValue(){var measure=this.measure();var factdata=this.factdata();var cardWidth=this.width();var cardHeight=this.height();var margin=getMarginBySize(this.size(),"value"),width=cardWidth-margin.left-margin.right;// let  height = cardHeight - margin.top - margin.bottom;
//  let  arr=[]
//    d3.map(factData, d => {
//     arr.push( d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field])
//     return 0;
//  })
//vis
var svg=d3.select(this.container()).append("svg").attr("id","valuetextchartsvg").attr("width",cardWidth).attr("height",cardHeight).append("g").attr("id","valuetextchart");if(this.measure().length>1||this.breakdown().length>0){return svg;}//data processing
var textvalue=void 0;// if (subspace.length === 0) {
if(measure[0].aggregate==='max'||measure[0].aggregate==='min'||measure[0].aggregate==='none')textvalue=factdata[0][measure[0].aggregate==='count'?"COUNT":measure[0].field];else textvalue=factdata[0][measure[0].aggregate==='count'?"COUNT":measure[0].field];// textvalue = d3.sum(factdata, d => d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
// } else {
//    textvalue = factdata[0][measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
//textvalue = d3.map(factdata, d => d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
// }
var fontsize=getFontSize(this.size(),"value");if(textvalue%1!==0)textvalue=textvalue.toFixed(2);var subspaceField=this.subspace().length?this.subspace()[0].value:"";svg.append("text").attr("id","valuetext").attr("text-anchor","middle")// .attr("dominant-baseline","middle")
.text((0,_format2.default)(textvalue)).attr("x",cardWidth/2).attr("y",cardHeight/2+fontsize/2-5).attr("fill",_color2.default.HIGHLIGHT).attr('font-size',fontsize).attr('font-family','impact');svg.append("text").attr("id","valuefield").attr("text-anchor","middle")// .attr("dominant-baseline","middle")
.text(measure[0].field?measure[0].field:subspaceField).attr("x",cardWidth/2).attr("y",cardHeight/2-fontsize/3*2-2).attr("fill",_color2.default.DEFAULT).attr('font-size',fontsize).attr('font-family','impact');//使图表居中
//  let a=d3.select("#valuetextchart").node().getBoundingClientRect().width;
//  let b=d3.select("#valuetextchart").node().getBoundingClientRect().height;      
//  let c=d3.select("#valuetextchart").node().getBoundingClientRect().left;      
//  let d=d3.select("#valuetextchartsvg").node().getBoundingClientRect().left; 
//  let e=d3.select("#valuetextchart").node().getBoundingClientRect().top;      
//  let f=d3.select("#valuetextchartsvg").node().getBoundingClientRect().top; 
//  let transx=d-c+cardWidth/2-a/2;
//  let transy=f-e+cardHeight/2-b/2;
var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;// let a1=d3.select("#valuetextchart").node().getBBox().width;
// let b1=d3.select("#valuetextchart").node().getBBox().height;      
// let c1=d3.select("#valuetextchart").node().getBBox().x;      
// let e1=d3.select("#valuetextchart").node().getBBox().y;  
var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if(this.style()===_style2.default.COMICS){var metaphorHeight=this.size()===_size2.default.WIDE?svg.select("#valuetext").node().getBBox().height*0.8:d3.select("#valuetext").node().getBBox().height*0.9,metaphorWidth=metaphorHeight/1.18;var metaphor=svg.append("image").attr('xlink:href',_metaphor2.default);metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",svg.select("#valuetext").node().getBBox().width/2+cardWidth/2+metaphorWidth*0.1).attr("y",cardHeight/2-metaphorHeight*0.68);a=svg.node().getBBox().width;b=svg.node().getBBox().height;c=svg.node().getBBox().x;e=svg.node().getBBox().y;transx=-c+cardWidth/2-a/2;transy=-e+cardHeight/2-b/2;}if(this.style()===_style2.default.PICTOGRAPH){var pictype=measure[0].pictype;/*------------------通过名称找寻icon----------------------------*/svg.append("defs").append("g").attr("id",'pictypetv'+pictype).append("path").attr("d",_pictogram2.default[pictype]);var typesizex1=svg.select('#pictypetv'+pictype).node().getBBox().width;var typesizey1=svg.select('#pictypetv'+pictype).node().getBBox().height;// let typex=svg.select(`#pictype${pictype}`).node().getBBox().x;  
var typey=svg.select('#pictypetv'+pictype).node().getBBox().y;var typesizex2=svg.select('#valuetext').node().getBBox().width;var typesizey2=svg.select('#valuetext').node().getBBox().height;var scale=void 0;if(typesizex1>typesizey1)scale=typesizey2/3*2/typesizex1;else scale=typesizey2/3*2/typesizey1;svg.append("defs").append("g").attr("id","pictypetv").append("path").attr("d",_pictogram2.default[pictype]).attr("transform",function(){return'scale('+scale+')';});var typesizex=svg.select('#pictypetv').node().getBBox().width;var typesizey=svg.select('#pictypetv').node().getBBox().height;svg.select("#valuetext").attr("transform",'translate('+typesizex/2+',0)');svg.append("g").append("use").attr("xlink:href","#pictypetv").attr("id","icontype").attr("x",cardWidth/2-typesizex2/2-typesizex/2-fontsize/3).attr("y",cardHeight/2+fontsize/2-5-typesizey-Math.abs(typey*scale)).attr("fill","#96A7CE");a=svg.node().getBBox().width;b=svg.node().getBBox().height;c=svg.node().getBBox().x;e=svg.node().getBBox().y;transx=-c+cardWidth/2-a/2;transy=-e+cardHeight/2-b/2;}//center
if(a>cardWidth){//  d3.select("#valuetextchart").attr("transform", `scale(${width/a})  translate(${cardWidth/(2*width/a)-(a/2-d+c)},${cardHeight/(2*width/a)-(b/2-f+e)}) `)
svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}return svg;}/*---------------------------------------------------------------------------*/},{key:'animateDifference',value:function animateDifference(){var svg=this.displayDifference();if(!svg)return;/* ------------ init data ----------- */var duration=this.duration();/* ---------- step 1 textnameAppear ---------- */var arrowiit=svg.select("#valuefield");arrowiit.attr("opacity",0);arrowiit.transition().duration(duration*0.3).attr("opacity",1);/* ---------- step 1 textGrow --------------- */var textvalue=svg.select("#valuetext");// let showedValue = textvalue.node().innerHTML.replace(/,/g, '');
textvalue.attr("opacity",0);// .text(0);
textvalue.transition().delay(duration*0.3).duration(duration*0.7).ease(d3.easeLinear).attr("opacity",1);// // text grow;
// textvalue.transition()
//     .delay(duration * 0.3 + 10)
//     .duration(duration * 0.7)
//     .ease(d3.easeLinear)
//     .textTween(function (d) {
//         // let final = d3.select(this).text();
//         let final = showedValue;
//         const i = d3.interpolate(0, final);
//         var numberFormat = d3.format(".0f");
//         return function (t) {
//             var percent = formatNumber(+numberFormat(i(t)));
//             return percent;
//         };
//     });
}/*-------------------------------------------------------------------------- */},{key:'displayDifference',value:function displayDifference(){var _this2=this;var focus=this.focus();var measure=this.measure();var cardWidth=this.width();var cardHeight=this.height();var filteredData=[];//sorted by focus
var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop=function _loop(){var fs=_step.value;_this2.factdata().filter(function(x){return x[fs.field]===fs.value;})[0]&&filteredData.push(_this2.factdata().filter(function(x){return x[fs.field]===fs.value;})[0]);};for(var _iterator=focus[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop();}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}var margin=getMarginBySize(this.size(),"difference"),width=cardWidth-margin.left-margin.right,height=cardHeight-margin.top-margin.bottom;//data processing
var calculatedifference=void 0;var sarr=[];// let arrowtype;//判断数值上升下降
filteredData.map(function(item,index,arr){sarr.push(item[measure[0].aggregate==='count'?"COUNT":measure[0].field]);return 0;});if(sarr[0]>sarr[1]){// arrowtype = "up"
calculatedifference=sarr[0]-sarr[1];}else if(sarr[0]<sarr[1]){// arrowtype = "down"
calculatedifference=sarr[1]-sarr[0];}// else {
//     arrowtype = "steady"
// }
//vis
var svg=d3.select(this.container()).append("svg").attr("id","differencetextchartsvg").attr("width",width+margin.left+margin.right).attr("height",height+margin.top+margin.bottom).append("g").attr("id","differencetextchart");if(filteredData.length<2||this.measure().length>1){return svg;}//添加文字    
// let fontsize = getFontSize(this.size(), "extreme")
// let arrowx;
// let size1 = this.size();
var textvalue=calculatedifference;var fontsize=getFontSize(this.size(),"value");if(textvalue%1!==0)textvalue=textvalue.toFixed(2);// let subspaceField = this.subspace().length ? this.subspace()[0].value : "";
var diff=svg.append("g").attr("id","diff");diff.append("text").attr("id","valuetexttdiff").attr("text-anchor","middle")// .attr("dominant-baseline","middle")
.text((0,_format2.default)(textvalue)).attr("x",cardWidth/2).attr("y",cardHeight/2+fontsize/2-5).attr("fill",_color2.default.HIGHLIGHT).attr('font-size',fontsize).attr('font-family','impact');svg.append("text").attr("id","valuefieldtdiff").attr("text-anchor","middle").attr("x",cardWidth/2).attr("y",cardHeight/2-fontsize/3*2-2).attr('font-size',fontsize).attr('font-family','impact').attr("fill",_color2.default.DEFAULT).text(focus[0].value).append("tspan").attr("fill",_color2.default.DIVIDER).text(" vs ").append("tspan").attr("fill",_color2.default.DEFAULT).text(focus[1].value);//使图表居中
//  let a=d3.select("#valuetextchart").node().getBoundingClientRect().width;
//  let b=d3.select("#valuetextchart").node().getBoundingClientRect().height;      
//  let c=d3.select("#valuetextchart").node().getBoundingClientRect().left;      
//  let d=d3.select("#valuetextchartsvg").node().getBoundingClientRect().left; 
//  let e=d3.select("#valuetextchart").node().getBoundingClientRect().top;      
//  let f=d3.select("#valuetextchartsvg").node().getBoundingClientRect().top; 
//  let transx=d-c+cardWidth/2-a/2;
//  let transy=f-e+cardHeight/2-b/2;
var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;// let a1=d3.select("#valuetextchart").node().getBBox().width;
// let b1=d3.select("#valuetextchart").node().getBBox().height;      
// let c1=d3.select("#valuetextchart").node().getBBox().x;      
// let e1=d3.select("#valuetextchart").node().getBBox().y;  
var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if(this.style()===_style2.default.COMICS){var metaphorHeight=this.size()===_size2.default.WIDE?svg.select("#valuetexttdiff").node().getBBox().height*0.8:d3.select("#valuetexttdiff").node().getBBox().height*0.9,metaphorWidth=metaphorHeight/1.18;var metaphor=svg.append("image").attr('xlink:href',_metaphor4.default);metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",svg.select("#valuetexttdiff").node().getBBox().width/2+cardWidth/2+metaphorWidth*0.1).attr("y",cardHeight/2-metaphorHeight*0.6);a=svg.node().getBBox().width;b=svg.node().getBBox().height;c=svg.node().getBBox().x;e=svg.node().getBBox().y;transx=-c+cardWidth/2-a/2;transy=-e+cardHeight/2-b/2;}if(this.style()===_style2.default.PICTOGRAPH){var pictype=measure[0].pictype;/*------------------通过名称找寻icon----------------------------*/svg.append("defs").append("g").attr("id",'pictypetdiff'+pictype).append("path").attr("d",_pictogram2.default[pictype]);var typesizex1=svg.select('#pictypetdiff'+pictype).node().getBBox().width;var typesizey1=svg.select('#pictypetdiff'+pictype).node().getBBox().height;// let typex=svg.select(`#pictype${pictype}`).node().getBBox().x;  
var typey=svg.select('#pictypetdiff'+pictype).node().getBBox().y;var typesizex2=svg.select('#valuetexttdiff').node().getBBox().width;var typesizey2=svg.select('#valuetexttdiff').node().getBBox().height;var scale=void 0;if(typesizex1>typesizey1)scale=typesizey2/3*2/typesizex1;else scale=typesizey2/3*2/typesizey1;svg.append("defs").append("g").attr("id","pictypetdiff").append("path").attr("d",_pictogram2.default[pictype]).attr("transform",function(){return'scale('+scale+')';});var typesizex=svg.select('#pictypetdiff').node().getBBox().width;var typesizey=svg.select('#pictypetdiff').node().getBBox().height;svg.select("#valuetexttdiff").attr("transform",'translate('+typesizex/2+',0)');svg.append("g").append("use").attr("xlink:href","#pictypetdiff").attr("id","icontype").attr("x",cardWidth/2-typesizex2/2-typesizex/2-fontsize/3)//.attr("y",  cardHeight / 2+ fontsize / 2 - 5-typesizey2/4 -typesizey/2-Math.abs(typey*scale))
.attr("y",cardHeight/2+fontsize/2-5-typesizey-Math.abs(typey*scale)).attr("fill","#96A7CE");//     let typesizex1=svg.select(`#pictype${pictype}`).node().getBBox().width;
//     let typesizey1=svg.select(`#pictype${pictype}`).node().getBBox().height;  
//     let typex=svg.select(`#pictype${pictype}`).node().getBBox().x;  
//     let typey=svg.select(`#pictype${pictype}`).node().getBBox().y;  
//     let typesizex2;
//     let typesizey2;
//     let scale;
//     if(arrowtype==="steady"){ 
//         let orignx;
//         if (chartsize1=== Size.LARGE) {
//             orignx=cardHeight/3;
//         }
//         if (chartsize1 === Size.WIDE) {
//             orignx=cardHeight/2;
//         }
//         if (chartsize1=== Size.MIDDLE) {
//             orignx=cardHeight/2;
//         }
//         if (chartsize1=== Size.SMALL) {
//             orignx=cardHeight/2-10;
//         }
//         if(typesizex1>typesizey1) scale=orignx/typesizex1;
//         else scale=orignx/typesizey1;
//     }
//     else{
//          typesizex2=svg.select(`#differencetext`).node().getBBox().width;
//          typesizey2=svg.select(`#differencetext`).node().getBBox().height; 
//          scale=Math.sqrt((typesizey2)/(typesizey1));
//     }
//     svg.append("defs")
//      .append("g")
//      .attr("id","pictype1")
//      .append("path")
//      .attr("d",PictorialType[pictype])
//      .attr("transform",function(){
//        return `scale(${scale})`;
//    }) 
//    let typesizex=svg.select(`#pictype1`).node().getBBox().width;
//    let typesizey=svg.select(`#pictype1`).node().getBBox().height;  
//    svg.append("g").append("use")
//       .attr("xlink:href","#pictype1")
//       .attr("id","icontype")  
//       .attr("fill","#96A7CE")
//       .attr("x", function(){
//         // if (arrowtype === "down") return cardWidth / 4 * 3-typesizex2/2-typesizex-Math.abs(typex*scale)-cardWidth/20
//         // if (arrowtype === "up") return cardWidth / 3 * 2-typesizex2/2-typesizex-Math.abs(typex*scale)-cardWidth/20
//         if(arrowtype==="steady") {
//             let xx;
//             if (chartsize1 === Size.LARGE) {
//                xx= 30;
//             }
//             if (chartsize1=== Size.WIDE) {
//                 xx= 40;
//             }
//             if (chartsize1=== Size.MIDDLE) {
//                 xx=  40;
//             }
//             if (chartsize1=== Size.SMALL) {
//                 xx=  20;
//             }
//             return cardWidth/2-typesizex/2-Math.abs(typex*scale)-xx;
//         }
//         else {
//             if (size1 === "small") return cardWidth / 3 * 2 - 5 + typesizex2/2-Math.abs(typex*scale)
//             else return cardWidth / 2 + 15 + typesizex2/2-Math.abs(typex*scale)
//         }
//       }       
//     )
//       .attr("y",  function(){
//         if(arrowtype==="steady") {
//             let xx;
//             if (chartsize1=== Size.LARGE) {
//                xx= 50;
//             }
//             if (chartsize1 === Size.WIDE) {
//                 xx=  20;
//             }
//             if (chartsize1=== Size.MIDDLE) {
//                 xx=  20;
//             }
//             if (chartsize1 === Size.SMALL) {
//                 xx=  10;
//             }
//             return cardHeight/2-typesizey-Math.abs(typey*scale)-xx;
//         }
//         else return cardHeight /2-typesizey/2-Math.abs(typey*scale)
//         // else return cardHeight /2-(typesizey2/6+typesizey3/2)-typesizey/2-Math.abs(typey*scale)
//       }       
//     )
a=svg.node().getBBox().width;b=svg.node().getBBox().height;c=svg.node().getBBox().x;e=svg.node().getBBox().y;transx=-c+cardWidth/2-a/2;transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}//center
if(this.style()!==_style2.default.PICTOGRAPH){if(a>cardWidth){//  d3.select("#valuetextchart").attr("transform", `scale(${width/a})  translate(${cardWidth/(2*width/a)-(a/2-d+c)},${cardHeight/(2*width/a)-(b/2-f+e)}) `)
svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}return svg;}/*-----------------------------------------------------------------------*/},{key:'animateExtreme',value:function animateExtreme(){var svg=this.displayExtreme();if(!svg)return;/* ------------ init data ----------- */var duration=this.duration();/* ---------- step 1 textnameAppear ---------- */var arrowiit=svg.select("#extreme-Arrow");var arrowTopBar=arrowiit.select(".topBar");// arrowiit.attr("opacity", 0);
arrowTopBar.transition().duration(duration*0.2).attr("opacity",1);var arrowBody=arrowiit.select(".arrowBody");var arrowBodyY=arrowBody.node().getBBox().y;arrowBody.attr("transform",'translate(0, '+(this.height()-arrowBodyY)/3+')').attr("opacity",0).transition().duration(duration*0.2).delay(duration*0.2).attr("transform",'translate(0, 0)').attr("opacity",1);/* ---------- step 1 textGrow --------------- */var textvalue=svg.select("#extremetext");// let showedValue = textvalue.node().innerHTML.replace(/,/g, '');
textvalue.attr("opacity",0);// .text(0);
textvalue.transition().delay(duration*0.4).duration(duration*0.6).ease(d3.easeLinear).attr("opacity",1);// // text grow;
// textvalue.transition()
//     .delay(duration * 0.3 + 10)
//     .duration(duration * 0.7)
//     .ease(d3.easeLinear)
//     .textTween(function (d) {
//         // let final = d3.select(this).text();
//         let final = showedValue;
//         const i = d3.interpolate(0, final);
//         var numberFormat = d3.format(".0f");
//         return function (t) {
//             var percent = formatNumber(+numberFormat(i(t)));
//             return percent;
//         };
//     });
}/*-------------------------------------------------------------------------- */},{key:'displayExtreme',value:function displayExtreme(){var factData=this.factdata();var measure=this.measure();var cardWidth=this.width();var cardHeight=this.height();var margin=getMarginBySize(this.size(),"extreme"),width=cardWidth-margin.left-margin.right,height=cardHeight-margin.top-margin.bottom;//vis
var svg=d3.select(this.container()).append("svg").attr("id","extremetextchartsvg").attr("width",width+margin.left+margin.right).attr("height",height+margin.top+margin.bottom).append("g").attr("id","extremetextchart");if(this.measure().length>1||this.breakdown().length>1){return svg;}//data processing
var maxYValue=d3.max(factData,function(d){return d[measure[0].aggregate==='count'?"COUNT":measure[0].field];});// let minYValue=d3.min(factData,d=>{   
//return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
// })
var maxNumber=(0,_format2.default)(maxYValue);// let minNumber=formatNumber(minYValue);
var arrowtype="up";//添加文字    
var fontsize=getFontSize(this.size(),"extreme");var size1=this.size();svg.append("text").attr("id","extremetext").text(maxNumber).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("x",function(){if(size1==="small")return cardWidth/3*2-5;else return cardWidth/2+15;}).attr("y",cardHeight/2+'px').attr("fill",_color2.default.HIGHLIGHT).attr('font-size',fontsize).attr('font-family','impact');var typesizex=svg.select("#extremetext").node().getBBox().width;if(size1==="small"){drawArrow(arrowtype,cardWidth/3*2-5-typesizex/2-8,cardHeight/2+fontsize/2,fontsize,this.size(),"extreme",svg,cardWidth,cardHeight);}else{drawArrow(arrowtype,cardWidth/2+8-typesizex/2-fontsize/4,cardHeight/2+fontsize/2,fontsize,this.size(),"extreme",svg,cardWidth,cardHeight);}//使图表居中
// let a=d3.select("#extremetextchart").node().getBoundingClientRect().width;
// let b=d3.select("#extremetextchart").node().getBoundingClientRect().height;      
// let c=d3.select("#extremetextchart").node().getBoundingClientRect().left;      
// let d=d3.select("#extremetextchartsvg").node().getBoundingClientRect().left; 
// let e=d3.select("#extremetextchart").node().getBoundingClientRect().top;      
// let f=d3.select("#extremetextchartsvg").node().getBoundingClientRect().top; 
// let transx=d-c+cardWidth/2-a/2;
// let transy=f-e+cardHeight/2-b/2;
// d3.select("#extremetextchart").attr("transform",function(){
//  if(a>cardWidth) return `scale(${width/a})  translate(${cardWidth/(2*width/a)-(a/2-d+c)},${cardHeight/(2*width/a)-(b/2-f+e)}) `
//   else  return  `translate(${transx} ,${transy}) `
// })
// return svg;
var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if(this.style()===_style2.default.COMICS){var metaphorHeight=this.size()===_size2.default.WIDE?b*0.8:b*0.9,metaphorWidth=metaphorHeight/1.34;var metaphor=svg.append("image").attr('xlink:href',_metaphor6.default);metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",svg.select("#extremetext").node().getBBox().width/2+parseInt(svg.select("#extremetext").attr("x"))+metaphorWidth*0.05).attr("y",cardHeight/2-metaphorHeight*0.68);a=svg.node().getBBox().width;b=svg.node().getBBox().height;c=svg.node().getBBox().x;e=svg.node().getBBox().y;transx=-c+cardWidth/2-a/2;transy=-e+cardHeight/2-b/2;}if(this.style()===_style2.default.PICTOGRAPH){var pictype=measure[0].pictype;/*------------------通过名称找寻icon----------------------------*/svg.append("defs").append("g").attr("id",'pictypetex'+pictype).append("path").attr("d",_pictogram2.default[pictype]);var typesizex1=svg.select('#pictypetex'+pictype).node().getBBox().width;var typesizey1=svg.select('#pictypetex'+pictype).node().getBBox().height;// let typex=svg.select(`#pictype${pictype}`).node().getBBox().x;  
var typey=svg.select('#pictypetex'+pictype).node().getBBox().y;var typesizex2=svg.select('#extremetext').node().getBBox().width;var typesizey2=svg.select('#extremetext').node().getBBox().height;var scale=void 0;if(typesizex1>typesizey1)scale=typesizey2/3*2/typesizex1;else scale=typesizey2/3*2/typesizey1;svg.append("defs").append("g").attr("id","pictypetex").append("path").attr("d",_pictogram2.default[pictype]).attr("transform",function(){return'scale('+scale+')';});//  let typesizex=svg.select(`#pictype1`).node().getBBox().width;
var typesizey=svg.select('#pictypetex').node().getBBox().height;svg.append("g").append("use").attr("xlink:href","#pictypetex").attr("id","icontype").attr("x",function(){if(size1==="small")return cardWidth/3*2-5+typesizex2/2;else return cardWidth/2+15+typesizex2/2;}).attr("y",cardHeight/2-typesizey/2-Math.abs(typey*scale)-5).attr("fill","#96A7CE");a=svg.node().getBBox().width;b=svg.node().getBBox().height;c=svg.node().getBBox().x;e=svg.node().getBBox().y;transx=-c+cardWidth/2-a/2;transy=-e+cardHeight/2-b/2;}if(a>cardWidth){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}return svg;}}]);return TextChart;}(_chart2.default);// /--------------------------------------------draw arrow-----------------------------------------/
var drawArrow=function drawArrow(arrowtype,left,top,fontsize,chartSize,factType,svg,chartWidth,chartHeight){switch(factType){/*------------------------------ Extreme------------------------------------------------------ */case"extreme":var strokewidth=void 0;var linewidth=void 0;//箭头上面的横杠
if(chartSize===_size2.default.LARGE){strokewidth=30;linewidth=10;}if(chartSize===_size2.default.WIDE){strokewidth=25;linewidth=10;}if(chartSize===_size2.default.MIDDLE){strokewidth=16;linewidth=10;}if(chartSize===_size2.default.SMALL){strokewidth=10;linewidth=6;}if(arrowtype==="up"){var arrow=svg.append("g").attr("id","extreme-Arrow");var arrowBody=arrow.append("g").attr("class","arrowBody");arrowBody.append("line").attr("class","arrowBar").attr("x1",left-strokewidth).attr("y1",top).attr("x2",left-strokewidth).attr("y2",top-fontsize/3*2-1).attr("stroke",_color2.default.DEFAULT).attr("stroke-width",strokewidth);arrowBody.append('polygon').attr("class","arrowTriangle").attr("points",left-strokewidth-strokewidth/3*4+','+(top-fontsize/3*2)+' '+(left-strokewidth+strokewidth/3*4)+','+(top-fontsize/3*2)+' '+(left-strokewidth)+','+(top-fontsize/3*4)).attr("fill",_color2.default.DEFAULT).attr("stroke","none");arrow.append("line").attr("class","topBar").attr("x1",left-strokewidth-strokewidth/3*4).attr("y1",top-fontsize/3*4-linewidth).attr("x2",left-strokewidth+strokewidth/3*4).attr("y2",top-fontsize/3*4-linewidth).attr("stroke",_color2.default.DEFAULT).attr("stroke-width",linewidth);}else if(arrowtype==="both"){var lineHeight=(top-(top-fontsize/3*2-1))*0.95;var traingleHeight=(top-fontsize/3*2-(top-fontsize/3*4))*1;var _arrow=svg.append("g").attr("id","extreme-Arrow").attr("transform",'translate(0, '+-traingleHeight/3+')');strokewidth=strokewidth*0.8;_arrow.append('polygon').attr("points",left-strokewidth-strokewidth/3*4+','+(top-fontsize/3*2)+' '+(left-strokewidth+strokewidth/3*4)+','+(top-fontsize/3*2)+' '+(left-strokewidth)+','+(top-fontsize/3*2-traingleHeight)).attr("fill",_color2.default.DEFAULT).attr("stroke","none");_arrow.append('polygon').attr("points",left-strokewidth-strokewidth/3*4+','+(top-fontsize/3*2+lineHeight)+' '+(left-strokewidth+strokewidth/3*4)+','+(top-fontsize/3*2+lineHeight)+' '+(left-strokewidth)+','+(top-fontsize/3*2+lineHeight+traingleHeight)).attr("fill",_color2.default.DEFAULT).attr("stroke","none").attr("stroke-width",0);_arrow.append("line").attr("x1",left-strokewidth).attr("y1",top).attr("x2",left-strokewidth).attr("y2",top-fontsize/3*2-1).attr("stroke",_color2.default.DEFAULT).attr("stroke-width",chartSize==='large'?strokewidth/2:strokewidth/2);_arrow.append("line").attr("x1",left-strokewidth-strokewidth/3*4).attr("y1",top-fontsize/3*4-linewidth).attr("x2",left-strokewidth+strokewidth/3*4).attr("y2",top-fontsize/3*4-linewidth).attr("stroke",_color2.default.DEFAULT).attr("stroke-width",linewidth);_arrow.append("line").attr("x1",left-strokewidth-strokewidth/3*4).attr("y1",top-fontsize/3*4-linewidth+lineHeight+traingleHeight*2+linewidth*2).attr("x2",left-strokewidth+strokewidth/3*4).attr("y2",top-fontsize/3*4-linewidth+lineHeight+traingleHeight*2+linewidth*2).attr("stroke",_color2.default.DEFAULT).attr("stroke-width",linewidth);}break;/*---------------------------------Difference----ArrowTYPE：UP\DOWN\STEADY ------------------------------------------------ */case"difference":var strokewidth1=void 0;var margin1=getMarginBySize(chartSize,factType);//let chartsize=getCardSize(chartSize);
var uparrowheight=void 0;if(chartSize===_size2.default.LARGE){strokewidth1=30;uparrowheight=60;}if(chartSize===_size2.default.WIDE){strokewidth1=30;uparrowheight=50;}if(chartSize===_size2.default.MIDDLE){strokewidth1=22;uparrowheight=40;}if(chartSize===_size2.default.SMALL){strokewidth1=15;uparrowheight=30;}if(arrowtype==="down"){var _arrow2=svg.append("g").attr("id","difference-DownArrow").attr("class","difference-arrow");var typesizex1=svg.select("#differencetext").node().getBBox().width/2;var typesizey1=svg.select("#differencetext").node().getBBox().height/2;var arrowx4=left-typesizex1-5;var arrowx1=arrowx4-chartWidth/5*2;var arrowWidth=(arrowx4-arrowx1)/8;var arrowx2=arrowWidth*3+arrowx1;var arrowx3=arrowWidth*5+arrowx1;var arrowy4=chartHeight/2+typesizey1/4*3;var arrowy1=arrowy4-arrowWidth*4;var arrowy2=arrowy4-arrowWidth;var arrowy3=arrowy4-arrowWidth*3;var triangle=void 0;if(chartSize===_size2.default.LARGE)triangle=strokewidth1/2*4;if(chartSize===_size2.default.WIDE)triangle=strokewidth1/2*3;if(chartSize===_size2.default.MIDDLE)triangle=strokewidth1/2*3;if(chartSize===_size2.default.SMALL)triangle=strokewidth1/2*3;_arrow2.append("polyline").attr("points",function(){return arrowx1-10-triangle/Math.sqrt(2)+','+(arrowy1-10-triangle/Math.sqrt(2))+' '+(arrowx2-triangle/Math.sqrt(2))+','+(arrowy2-triangle/Math.sqrt(2))+' '+(arrowx3-triangle/Math.sqrt(2))+','+(arrowy3-triangle/Math.sqrt(2))+' '+(arrowx4+1-triangle/Math.sqrt(2))+','+(arrowy4+1-triangle/Math.sqrt(2));}).attr("fill","none").attr("stroke",_color2.default.DEFAULT).attr("stroke-width",strokewidth1);_arrow2.append('polygon').attr("points",function(){return arrowx4+','+arrowy4+' '+(arrowx4-2*triangle/Math.sqrt(2))+','+arrowy4+' '+arrowx4+','+(arrowy4-2*triangle/Math.sqrt(2));}).attr("fill",_color2.default.DEFAULT).attr("stroke","none");if(chartSize===_size2.default.LARGE||chartSize===_size2.default.WIDE)svg.select("#difference-DownArrow").attr("transform","translate(-10,0  )");}if(arrowtype==="steady"){var _arrow3=svg.append("g").attr("id","difference-SteadyArrow").attr("class","difference-arrow");var center=void 0;_arrow3.append("line").attr("x1",margin1.left).attr("y1",chartHeight/2).attr("x2",function(){if(chartSize===_size2.default.LARGE){center=margin1.left+(chartHeight/2-margin1.top)*1.8;}if(chartSize===_size2.default.WIDE){center=margin1.left+(chartHeight/2-margin1.top)*3.8;}if(chartSize===_size2.default.MIDDLE){center=margin1.left+(chartHeight/2-margin1.top)*2.5;}if(chartSize===_size2.default.SMALL){center=margin1.left+(chartHeight/2-margin1.top)*2.2;}return center+1;}).attr("y2",chartHeight/2).attr("stroke",_color2.default.DEFAULT).attr("stroke-width",function(){if(chartSize===_size2.default.LARGE){return 40;}if(chartSize===_size2.default.WIDE){return 30;}if(chartSize===_size2.default.MIDDLE){return 25;}if(chartSize===_size2.default.SMALL){return 20;}});_arrow3.append('polygon').attr("points",function(){if(chartSize===_size2.default.LARGE)return center+','+(chartHeight/4+50)+' '+(chartWidth-margin1.right)+','+chartHeight/2+' '+center+','+(chartHeight/4*3-50);else return center+','+chartHeight/4+' '+(chartWidth-margin1.right)+','+chartHeight/2+' '+center+','+chartHeight/4*3;}).attr("fill",_color2.default.DEFAULT).attr("stroke","none");}/********************************************************* *///  ⬆
if(arrowtype==="up"){var _arrow4=svg.append("g").attr("id","difference-UpArrow").attr("class","difference-arrow");var typesizexx=svg.select("#differencetext").node().getBBox().width;// console.log("drawArrow -> typesizexx", typesizexx)
var strokewidth2=void 0;if(chartSize===_size2.default.LARGE){strokewidth2=30;}if(chartSize===_size2.default.WIDE){strokewidth2=30;}if(chartSize===_size2.default.MIDDLE){strokewidth2=25;}if(chartSize===_size2.default.SMALL){strokewidth2=16;}var _arrowx=left-typesizexx/2-(uparrowheight+strokewidth2)*2/Math.sqrt(2);_arrow4.append("line").attr("x1",_arrowx).attr("y1",chartHeight/2-uparrowheight-1).attr("x2",_arrowx).attr("y2",chartHeight/2+uparrowheight+1).attr("stroke",_color2.default.DEFAULT).attr("stroke-width",strokewidth2);//箭头底部
_arrow4.append('polygon').attr("points",function(){return _arrowx-strokewidth2/2+','+(chartHeight/2+uparrowheight)+' '+(_arrowx+strokewidth2/2)+','+(chartHeight/2+uparrowheight)+' '+(_arrowx+strokewidth2/2)+','+(chartHeight/2+uparrowheight+strokewidth2);}).attr("fill",_color2.default.DEFAULT).attr("stroke","none");//箭头顶部                    
_arrow4.append('polygon').attr("points",function(){return _arrowx+','+(chartHeight/2-uparrowheight-strokewidth2*2)+' '+(_arrowx-strokewidth2*2)+','+(chartHeight/2-uparrowheight)+' '+(_arrowx+strokewidth2*2)+','+(chartHeight/2-uparrowheight);}).attr("fill",_color2.default.DEFAULT).attr("stroke","none");svg.select("#difference-UpArrow").attr("transform",function(){return'rotate('+45+', '+_arrowx+' '+chartHeight/2+')';});}break;default:break;}};/*--get fontSize-----------------------------------------------------------------*/var getFontSize=function getFontSize(chartSize,factType){var fontsize=void 0;switch(chartSize){case _size2.default.LARGE:if(factType==="difference")fontsize=150;if(factType==="extreme")fontsize=100;if(factType==="value")fontsize=200;break;case _size2.default.WIDE:if(factType==="difference")fontsize=140;if(factType==="extreme")fontsize=80;if(factType==="value")fontsize=100;break;case _size2.default.MIDDLE:if(factType==="difference")fontsize=100;if(factType==="extreme")fontsize=60;if(factType==="value")fontsize=80;break;case _size2.default.SMALL:if(factType==="difference")fontsize=70;if(factType==="extreme")fontsize=40;if(factType==="value")fontsize=50;break;default:fontsize=50;break;}return fontsize;};// TODO fit by chartSize
var getMarginBySize=function getMarginBySize(chartSize,factType){var margin=void 0;switch(factType){case"difference":if(chartSize===_size2.default.LARGE)margin={top:75,right:30,bottom:75,left:30};if(chartSize===_size2.default.WIDE)margin={top:10,right:40,bottom:10,left:40};if(chartSize===_size2.default.MIDDLE)margin={top:10,right:10,bottom:10,left:10};if(chartSize===_size2.default.SMALL)margin={top:8,right:10,bottom:8,left:10};break;case"extreme":if(chartSize===_size2.default.LARGE)margin={top:40,right:20,bottom:40,left:20};if(chartSize===_size2.default.WIDE)margin={top:65,right:20,bottom:30,left:20};if(chartSize===_size2.default.MIDDLE)margin={top:50,right:10,bottom:30,left:10};if(chartSize===_size2.default.SMALL)margin={top:20,right:2,bottom:10,left:2};break;case"value":if(chartSize===_size2.default.LARGE)margin={top:20,right:20,bottom:40,left:20};if(chartSize===_size2.default.WIDE)margin={top:30,right:10,bottom:10,left:10};if(chartSize===_size2.default.MIDDLE)margin={top:15,right:10,bottom:40,left:10};if(chartSize===_size2.default.SMALL)margin={top:10,right:5,bottom:40,left:5};break;default:margin={top:20,right:30,bottom:40,left:70};break;}return margin;};exports.default=TextChart;