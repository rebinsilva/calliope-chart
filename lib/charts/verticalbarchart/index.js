'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _d=require('d3');var d3=_interopRequireWildcard(_d);var _chart=require('../../chart');var _chart2=_interopRequireDefault(_chart);var _color=require('../../visualization/color');var _color2=_interopRequireDefault(_color);var _unsupportedchart=require('../../visualization/unsupportedchart');var _unsupportedchart2=_interopRequireDefault(_unsupportedchart);var _format=require('../../visualization/format');var _format2=_interopRequireDefault(_format);var _size=require('../../visualization/size');var _size2=_interopRequireDefault(_size);var _tooltip=require('../../visualization/tooltip');var _tooltip2=_interopRequireDefault(_tooltip);var _removeOverlapX=require('../../visualization/removeOverlapX');var _removeOverlapX2=_interopRequireDefault(_removeOverlapX);var _style=require('../../visualization/style');var _style2=_interopRequireDefault(_style);var _updateChartCenter=require('../../visualization/updateChartCenter');var _updateChartCenter2=_interopRequireDefault(_updateChartCenter);var _metaphor4=require('../../metaphor/metaphor7.png');var _metaphor5=_interopRequireDefault(_metaphor4);var _metaphor6=require('../../metaphor/metaphor8.png');var _metaphor7=_interopRequireDefault(_metaphor6);var _metaphor8=require('../../metaphor/metaphor2.png');var _metaphor9=_interopRequireDefault(_metaphor8);var _metaphor10=require('../../metaphor/metaphor6.png');var _metaphor11=_interopRequireDefault(_metaphor10);var _metaphor12=require('../../metaphor/metaphor4.png');var _metaphor13=_interopRequireDefault(_metaphor12);var _metaphor14=require('../../metaphor/metaphor9.png');var _metaphor15=_interopRequireDefault(_metaphor14);var _metaphor16=require('../../metaphor/metaphor3.png');var _metaphor17=_interopRequireDefault(_metaphor16);var _metaphor18=require('../../metaphor/metaphor1.png');var _metaphor19=_interopRequireDefault(_metaphor18);var _metaphor20=require('../../metaphor/metaphor5.png');var _metaphor21=_interopRequireDefault(_metaphor20);var _metaphor22=require('../../metaphor/metaphor17.png');var _metaphor23=_interopRequireDefault(_metaphor22);var _metaphor24=require('../../metaphor/metaphor18.png');var _metaphor25=_interopRequireDefault(_metaphor24);var _pictogram=require('../../visualization/pictogram');var _pictogram2=_interopRequireDefault(_pictogram);var _v=require('uuid/v4');var _v2=_interopRequireDefault(_v);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}//trend, down
//trend, up
//trend, series
//trend, many
//value
//distribution
//categorization
//difference
//proportion
//outlier
//extreme
var NUMFONT="Arial-Regular";var TEXTFONT="Arial-Bold";var VerticalBarChart=function(_Chart){_inherits(VerticalBarChart,_Chart);function VerticalBarChart(){_classCallCheck(this,VerticalBarChart);var _this2=_possibleConstructorReturn(this,(VerticalBarChart.__proto__||Object.getPrototypeOf(VerticalBarChart)).call(this));_this2._y='';return _this2;}_createClass(VerticalBarChart,[{key:'animateDistribution',value:function animateDistribution(){/* -------------------------------- basic vis ------------------------------- */var svg=this.displayDistribution();if(!svg)return;/* -------------------------------- init data ------------------------------- */var ticks=10;var duration=this.duration();var chartSize={width:this.width(),height:this.height()};var height=chartSize.height;if(this.size()==="large")(0,_updateChartCenter2.default)(svg,this.width(),this.height()-3);/* ------------------------------ start animate ----------------------------- *//* ----------------------- animation frame arrangement ---------------------- */var animation={labelFadeIn:{duration:2,index:0},barGrow:{duration:8,index:1}};var everyTick=duration/ticks;/* --------------------------- step 0 labelFadeIn --------------------------- */var labels=svg.selectAll(".xAxis,.yAxis");labels.attr("opacity",0);labels.transition().duration(everyTick*animation.labelFadeIn.duration).attr("opacity",1);/* ----------------------------- step 1 barGrow ----------------------------- */var bars=svg.selectAll(".barSeries").selectAll(".bars");bars.attr("height",0).attr("y",height);var y=this._y;setTimeout(function(){bars.transition().duration(everyTick*animation.barGrow.duration).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("y",function(d){return y(d[1]);});},everyTick*countTicksBeforeIndex(animation,animation.barGrow.index));}},{key:'animateCategorization',value:function animateCategorization(){/* -------------------------------- basic vis ------------------------------- */var svg=this.displayCategorization();if(!svg)return;/* -------------------------------- init data ------------------------------- */var ticks=10;var duration=this.duration();// let chartSize = {
//     width: this.width(),
//     height: this.height()
// };
// let height = chartSize.height;
/* ------------------------------ start animate ----------------------------- *//* ----------------------- animation frame arrangement ---------------------- */var animation={majorGrow:{duration:10,index:0}// labelFadeIn: {
//     duration: 2,
//     index: 0
// },
// barGrow: {
//     duration: 8,
//     index: 1
// }
};var everyTick=duration/ticks;/* ---------------------------- step 0 majorGrow ---------------------------- */var bars=svg.selectAll(".barSeries").selectAll(".bars");// bars.attr("height", 0)
//     .attr("y", height)
bars.attr("opacity",0);// let y = this._y;
bars.transition().duration(everyTick*animation.majorGrow.duration/bars.size()).ease(d3.easeLinear).delay(function(d,i){return i*everyTick*animation.majorGrow.duration/bars.size();}).attr("opacity",1);// .attr("height", d => y(d[0]) - y(d[1]) > 0 ? y(d[0]) - y(d[1]) : 0)
// .attr("y", d => y(d[1]))
var xAxis=svg.selectAll(".xAxis");xAxis.selectAll("text").attr("opacity",0).transition().delay(function(_,i){return everyTick*animation.majorGrow.duration/xAxis.selectAll("text").size()*i;}).duration(everyTick*animation.majorGrow.duration/xAxis.selectAll("text").size()).attr("opacity",1);// /* --------------------------- step 0 labelFadeIn --------------------------- */
// let labels = svg.selectAll(".xAxis").selectAll(".tick");
// let labelsY = svg.selectAll(".yAxis").selectAll(".tick");
// labels.attr("opacity", 0);
// labelsY.attr("opacity", 0);
// labels.transition()
//     .duration(everyTick * animation.labelFadeIn.duration)
//     .attr("opacity", 1);
// labelsY.transition()
//     .duration(everyTick * animation.labelFadeIn.duration)
//     .attr("opacity", 1);
// /* ----------------------------- step 1 barGrow ----------------------------- */
// let bars = svg.selectAll(".barSeries").selectAll(".bars");
// bars.attr("height", 0)
//     .attr("y", height)
// let y = this._y;
// setTimeout(() => {
//     bars.transition()
//         .duration(everyTick * (animation.barGrow.duration ))
//         .attr("height", d => y(d[0]) - y(d[1]) > 0 ? y(d[0]) - y(d[1]) : 0)
//         .attr("y", d => y(d[1]))
// }, everyTick * countTicksBeforeIndex(animation, animation.barGrow.index))
}},{key:'animateValue',value:function animateValue(){var factdata=this.factdata();var measure=this.measure();var subspace=this.subspace();// set the dimensions and margins of the graph
var chartSize={width:this.width(),height:this.height()};var _getSizeBySize=getSizeBySize(chartSize,this.size()),tickStrokeWidth=_getSizeBySize.tickStrokeWidth,tickFontSize=_getSizeBySize.tickFontSize,margin=_getSizeBySize.margin,hightLightFontSize=_getSizeBySize.hightLightFontSize,width=chartSize.width,height=chartSize.height;var svg=d3.select(this.container()).append("svg").attr("class","svg").attr("width",chartSize.width).attr("height",chartSize.height).append("g").attr("display","block").attr("class","chartG");if(this.measure().length>1){return;}var barValue=void 0;if(subspace.length===0){barValue=d3.sum(factdata,function(d){return d[measure[0].aggregate==='count'?"COUNT":measure[0].field];});}else{barValue=factdata[0][measure[0].aggregate==='count'?"COUNT":measure[0].field];}/***(1) append xAxis**/var xField=subspace.length===0?"":subspace[0].value;var starX=margin.left+this.width()/4,endX=this.width()-margin.right,xAxisPos=height;//inital 
var xDomain=[xField];initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(2) check rotation before update **/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.8),xAxis=svg.select(".xAxis");checkAndRotate(xAxis,x);checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//add style
xAxis.selectAll('.tick text').attr('dy','0.7em').attr('font-family',TEXTFONT).attr('font-size',hightLightFontSize);// .attr('fill', Color.HIGHLIGHT);
/***(3) update y**/var startY=height,endY=0;//inital
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top*2;//y根据 x轴文字的高度动态缩减
/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
// append the rectangles for the bar chart       
var valueHeight=margin.top;var initBarHeght=startY-endY-valueHeight;var barHeght=initBarHeght;if(measure.length){if(measure[0].max!==undefined&&measure[0].min!==undefined&&measure[0].max>measure[0].min){if(barValue>=measure[0].min&&barValue<=measure[0].max){var scaleRatio=(barValue-measure[0].min)/(measure[0].max-measure[0].min);barHeght=(startY-endY-valueHeight)*scaleRatio;}}}svg.append("rect").lower().attr("class","bar").attr("fill",_color2.default.DEFAULT).attr("x",(width-x.bandwidth()*2)/2+this.width()/8).attr("y",height-barHeght).attr("height",barHeght).attr("width",x.bandwidth()*2);//tool tip
var toolTipX=width/2,toolTipY=height-initBarHeght,toolTipValue=(0,_format2.default)(barValue);svg.append("text").attr("class","tooltip").attr("x",toolTipX+this.width()/8).attr("y",toolTipY-valueHeight).attr('font-size',hightLightFontSize).attr('font-weight','bolder').attr('font-family',TEXTFONT).attr('fill',_color2.default.HIGHLIGHT).attr('text-anchor','middle').text(toolTipValue);svg.append("text").attr("class","measureTooltip").attr("x",toolTipX-this.width()/3)// .attr("y", toolTipY - valueHeight * 2)
.attr("y",toolTipY-valueHeight*2+this.height()/2).attr('font-size',hightLightFontSize*2).attr('font-family',"impact").attr('fill',_color2.default.DEFAULT).attr('text-anchor','middle').text(measure[0].field);if(subspace.length===0){svg.selectAll('.tick').selectAll("line").attr("opacity",0);}if(this.style()===_style2.default.COMICS){var metaphorWidth=width*0.24,metaphorHeight=1.18*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor13.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.20;metaphorHeight=1.18*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE||this.size()===_size2.default.SMALL){metaphorWidth=width*0.25;metaphorHeight=1.18*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",width*0.9-metaphorWidth).attr("y",height-metaphorHeight*1);}//finally update chart horizental cental
(0,_updateChartCenter2.default)(svg,this.width(),this.height());/* -------------------------------- basic vis ------------------------------- */// let svg = this.displayValue();
if(!svg)return;/* -------------------------------- init data ------------------------------- */var ticks=10;var duration=this.duration();/* ------------------------------ start animate ----------------------------- *//* ----------------------- animation frame arrangement ---------------------- */var animation={labelFadeIn:{duration:this.subspace().length===0?0:2,index:0},axisFadeIn:{duration:1,index:1},barGrow:{duration:8,index:2},textGrow:{duration:8,index:2}};var everyTick=duration/ticks;/* --------------------------- step 0 labelFadeIn --------------------------- */var labels=svg.selectAll(".xAxis").selectAll(".tick");labels.attr("opacity",0);svg.selectAll(".xAxis").selectAll("path").attr("opacity",0).transition().duration(everyTick*animation.axisFadeIn.duration).delay(everyTick*countTicksBeforeIndex(animation,animation.axisFadeIn.index)).attr("opacity",1);/* ----------------------------- step 1 barGrow ----------------------------- */var bar=svg.select(".bar");var originY=bar.attr("y"),originHeight=bar.attr("height");bar.attr("height",0).attr("y",+originY+ +originHeight);setTimeout(function(){bar.transition().duration(everyTick*animation.barGrow.duration).attr("height",originHeight).attr("y",originY);labels.transition().duration(everyTick*animation.labelFadeIn.duration).attr("opacity",1);},everyTick*countTicksBeforeIndex(animation,animation.barGrow.index));/* ----------------------------- step 1 textGrow ---------------------------- */var tooltip=svg.selectAll(".tooltip");var measureTooltip=svg.selectAll(".measureTooltip");tooltip.attr("opacity",0);measureTooltip.attr("opacity",0);measureTooltip.transition().duration(everyTick*animation.textGrow.duration*0.2).attr("opacity",1);setTimeout(function(){// tooltip.attr("opacity", 1);
// text grow;
tooltip.transition().attr("opacity",1).duration(everyTick*animation.textGrow.duration*0.8).delay(everyTick*animation.textGrow.duration*0.2).textTween(function(d){var final=d3.select(this).node().innerHTML.replace(/,/g,'');var i=d3.interpolate(0,final);var format=d3.format(",d");return function(t){var num=parseInt(i(t));return format(num);};});},everyTick*countTicksBeforeIndex(animation,animation.textGrow.index));}},{key:'animateProportion',value:function animateProportion(){/* -------------------------------- basic vis ------------------------------- */var svg=this.displayProportion();if(!svg)return;/* -------------------------------- init data ------------------------------- */var ticks=10;var duration=this.duration();var chartSize={width:this.width(),height:this.height()};var height=chartSize.height;var measure=this.measure();/* ------------------------------ start animate ----------------------------- *//* ----------------------- animation frame arrangement ---------------------- */var animation={labelFadeIn:{duration:2,index:0},barGrow:{duration:8,index:1},textGrow:{duration:8,index:1}};var everyTick=duration/ticks;/* --------------------------- step 0 labelFadeIn --------------------------- */var labels=svg.selectAll(".xAxis").selectAll(".tick");labels.attr("opacity",0);labels.transition().duration(everyTick*animation.labelFadeIn.duration).attr("opacity",1);/* ----------------------------- step 1 barGrow ----------------------------- */var bars=svg.selectAll(".barSeries").selectAll(".bars");bars.attr("height",0).attr("y",height);var y=this._y;setTimeout(function(){bars.transition().duration(everyTick*animation.barGrow.duration).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("y",function(d){return y(d[1]);});},everyTick*countTicksBeforeIndex(animation,animation.barGrow.index));/* ----------------------------- step 1 textGrow ---------------------------- */var values=svg.selectAll(".values").selectAll("text");values.attr("y",y(0)).text("0%");setTimeout(function(){values.transition().duration(everyTick*animation.textGrow.duration).attr("y",function(d){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]);}).textTween(function(d){var final=d3.select(this).property("_value");var i=d3.interpolate(0,+final);var numberFormat=d3.format(".0f");return function(t){var percent=numberFormat(i(t));return percent+"%";};});},everyTick*countTicksBeforeIndex(animation,animation.textGrow.index));}},{key:'animateOutlier',value:function animateOutlier(){if(this.size()!=='large')return this.animateExtreme();var focus=this.focus();var factdata=this.factdata();var measure=this.measure(),measuredField=measure[0].aggregate==='count'?"COUNT":measure[0].field;var breakdown=this.breakdown();var hasSeries=false;if(breakdown[1]&&breakdown[1].field)hasSeries=true;// set the dimensions and margins of the graph
var chartSize={width:this.width(),height:this.height()};var _getSizeBySize2=getSizeBySize(chartSize,this.size()),tickFontSize=_getSizeBySize2.tickFontSize,tickStrokeWidth=_getSizeBySize2.tickStrokeWidth,annotationSize=_getSizeBySize2.annotationSize,margin=_getSizeBySize2.margin,strokeWidth=_getSizeBySize2.strokeWidth,width=chartSize.width,height=chartSize.height;var svg=d3.select(this.container()).append("svg").attr("width",chartSize.width).attr("height",chartSize.height).append("g").attr("display","block").attr("class","chartG");if(this.style()===_style2.default.COMICS)width=this.size()===_size2.default.LARGE&&hasSeries?width:0.85*width;if(this.measure().length>1){// svg.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("fill", "none");
return;}var data=factdata;if(breakdown[0].type==='temporal'){data=data.sort(sortByDateAscending(breakdown));}var sumValue=0;data.forEach(function(d){sumValue+=d[measuredField];});var avgValue=sumValue/data.length;var seriesData=void 0;var calculateData=void 0;var maxYValue=getMaxYValue(factdata,measure);if(hasSeries){calculateData=d3.nest().key(function(d){return d[breakdown[0].field];}).entries(data);var categories=Array.from(new Set(data.map(function(d){return d[breakdown[1].field];})));categories=categories.slice(0,10);var objList=new Array(calculateData.length);var _loop=function _loop(i){var obj={};calculateData[i].values.map(function(d,i){obj.x=d[breakdown[0].field];obj[d[breakdown[1].field]]=d[measure[0].aggregate==='count'?"COUNT":measure[0].field];return obj;});objList[i]=obj;};for(var i=0;i<calculateData.length;i++){_loop(i);}// complete the missed data = 0
for(var k=0;k<calculateData.length;k++){for(var i=0;i<categories.length;i++){if(!objList[k].hasOwnProperty(categories[i])){objList[k][categories[i]]=0;}}}seriesData=d3.stack().keys(categories)(objList);}else{data.map(function(data){data.maxValue=maxYValue-data[measuredField];return data;});seriesData=d3.stack().keys([measuredField])(data);}seriesData=seriesData.slice(0,10);//console.log("seriesData",seriesData)
// append legend before chart
var measuredWidth=0;if(hasSeries){var rightLegendsW=margin.right,//inital
measuredHeight=0;var seriesName=d3.map(seriesData,function(d){return d.key;}).keys();svg.append("foreignObject").attr("x",width-margin.right).attr("y",height/2).attr("width",rightLegendsW).attr("height",height).attr("class","foreignObject").append("xhtml:div").attr("class","legends").style("display","flex").style("flex-direction","column").style("flex-wrap","wrap")// .style("align-content", "space-around")
// .style("height", height + "px")
.style("height","100%").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class","legend").style("line-height",1).style("margin-right",5*chartSize.width/640+"px").each(function(d,i){var legend=d3.select(this).append("svg");legend.append("rect").attr("fill",function(d){return _color2.default.CATEGORICAL[seriesName.indexOf(d)];}).attr("width",10*tickFontSize/12).attr('height',10*tickFontSize/12).attr("rx",1.5*chartSize.width/640).attr("ry",1.5*chartSize.width/640);legend.append("text").attr("fill",_color2.default.TEXT).attr("x",12*tickFontSize/12).text(d).attr("font-size",tickFontSize*0.8).attr("font-family","RobotoMono-Regular").attr("alignment-baseline","hanging");legend.attr("width",legend.node().getBBox().width);legend.attr("height",legend.node().getBBox().height);var selfWidth=legend.node().getAttribute("width"),selfHeight=legend.node().getAttribute("height");if(Number(selfWidth)>Number(measuredWidth)){measuredWidth=Number(selfWidth);}measuredHeight+=Number(selfHeight);});//update legend center
measuredWidth=measuredWidth+margin.right;var yPos=(chartSize.height-measuredHeight)/2;if(margin.right<measuredWidth){svg.select(".foreignObject").node().setAttribute("x",this.width()-measuredWidth-margin.right/2);}svg.select(".foreignObject").node().setAttribute("y",yPos);svg.select(".foreignObject").node().setAttribute("width",Number(measuredWidth));svg.select(".foreignObject").node().setAttribute("height",height);}/***(1) append yAxis  to measure the leftTick width **/var maxY=void 0;if(hasSeries){maxY=d3.max(seriesData[seriesData.length-1],function(d){return d[1];});}else{maxY=d3.max(data,function(d){return d[measuredField];});}var startY=height,endY=0;//inital
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);/***(2) append xAxis**/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;// console.log("measuredYFieldsWidth", measuredYFieldsWidth)
var starX=measuredYFieldsWidth,endX=width-measuredWidth-margin.right,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(3) check rotation before update y**/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");var unsupportedchartPrams={svg:svg,chartSize:chartSize,annotationSize:annotationSize,size:this.size()};var isShowSuggestion=this.showSuggestion();var result=checkXAxis(xAxis,x,breakdown[0].type,unsupportedchartPrams,isShowSuggestion);if(result==="unsupportedChart")return svg;checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//update y 
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top;//y根据 x轴文字的高度动态缩减
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);//更新endY
var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
this._y=y;// append the rectangles for the bar chart
if(hasSeries){svg.selectAll(".barSeries").data(seriesData).enter().append("g").attr("class","barSeries").attr("fill",function(d,i){return _color2.default.CATEGORICAL[i];}).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(calculateData[i].key);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}else{svg.append("g").lower().datum(seriesData[0]).attr("class","barSeries").attr("fill",_color2.default.DEFAULT).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}/*  regression line for bar *///     let ret = getLeastSquares(factdata.map(d => x((d[breakdown[0].field]))),
//     factdata.map(d => y(d[measuredField])));
// let x1 = 0 + margin.left + 35,
//     x2 = width - margin.right -15;
// //regression in range, can not out of content
// let x_ymin = (height - ret.b) / ret.m,
//     x_ymax = (0 - ret.b) / ret.m;
// if (x_ymin > x_ymax) {
//     const i = x_ymin;
//     x_ymin = x_ymax;
//     x_ymax = i;
// }
// x1 = x1 < x_ymin ? x_ymin : x1;
// x2 = x2 > x_ymax ? x_ymax : x2;
// if (ret.m === 0) x1 = 0;
// let y1 = ret.m * x1 + ret.b,
//     y2 = ret.m * x2 + ret.b;
// if (ret.m === -Infinity) {
//     x1 = x2;
//     y1 = 0;
//     y2 = height;
// }
var yAxisWidth=svg.selectAll(".yAxis").node().getBBox().width;var x1=0+margin.left+yAxisWidth,x2=width-margin.right;var y1=y(avgValue),y2=y1;svg.append("g").attr("class","trendlineLayer").selectAll(".trendline").data([seriesData[0]]).enter().append("line").attr("class",function(d){return"trendline "+d.key;}).attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y2).attr("stroke",_color2.default.DASHLINE).attr("stroke-width",strokeWidth).attr("stroke-dasharray",strokeWidth*2+', '+strokeWidth);var bars=svg.selectAll(".barSeries").selectAll(".bars");var barsFocus=bars.filter(function(d,i){return d.data[focus[0].field]===focus[0].value;});// let barHeight = barsFocus.node().getAttribute('height')
var barWidth=barsFocus.node().getAttribute('width');// let barX = barsFocus.node().getAttribute('x')
var arrowLayer=svg.append('g').attr("class",'arrowLayer');var focusValueArray=factdata.filter(function(d){return d[focus[0].field]===focus[0].value;});var focusData=focusValueArray[0];var toolTipX=x(focus[0].value)+x.bandwidth()/2,//箭头中心所在x的位置
toolTipY=y(focusData[measure[0].aggregate==="count"?"COUNT":measure[0].field])-30*chartSize.height/640;//箭头中心所在y的位置
// let arrowTriangle = 
arrowLayer.append("path").attr("class","triangle").attr("transform","translate("+toolTipX+","+toolTipY+")rotate(180)").attr("d",d3.symbol().type(d3.symbolTriangle).size(barWidth*30)).attr("fill",_color2.default.ANNOTATION);// let arrowRect = 
arrowLayer.append('rect').attr("class","arrowRect").attr("width",barWidth).attr("height",35).attr("fill",_color2.default.ANNOTATION).attr("x",toolTipX-barWidth/2).attr("y",toolTipY-35);if(this.style()===_style2.default.COMICS){var metaphorWidth=width*0.22,metaphorHeight=1.12*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor15.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.18;metaphorHeight=1.12*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE||this.size()===_size2.default.SMALL){metaphorWidth=width*0.20;metaphorHeight=1.12*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",endX+metaphorWidth*0.05).attr("y",height-metaphorHeight*0.96);//center居中
svg.attr("transform","translate("+((this.width()-svg.node().getBBox().width)/2-svg.node().getBBox().x)+","+((this.height()-svg.node().getBBox().height)/2-svg.node().getBBox().y)+")");}//finally update chart horizental cental
(0,_updateChartCenter2.default)(svg,this.width(),this.height());/*** animation ***/// this.animateExtreme();
// let svg = this.displayOutlier();
if(!svg)return;var duration=this.duration();var trendline=svg.selectAll(".trendline");var originEndX2=trendline.node().getAttribute("x2");var originEndY2=trendline.node().getAttribute("y2");var originEndX1=trendline.node().getAttribute("x1");var originEndY1=trendline.node().getAttribute("y1");trendline.attr("x2",originEndX1).attr("y2",originEndY1);bars=svg.selectAll(".barSeries").selectAll(".bars");// let y = this._y;
bars.attr("opacity",0).transition().duration(duration/4).attr("fill",_color2.default.DEFAULT).attr("opacity",1);svg.selectAll(".yAxis").attr("opacity",0).transition().duration(duration/4).attr("opacity",1);svg.selectAll(".xAxis").attr("opacity",0).transition().duration(duration/4).attr("opacity",1);// bars.transition()
//     .duration(duration / 4)
//     .attr("y", d => y(d[1]))
//     .attr("height", d => y(d[0]) - y(d[1]) > 0 ? y(d[0]) - y(d[1]) : 0)
// let focus = this.focus();
var barsOthers=bars.filter(function(d,i){return d.data[focus[0].field]!==focus[0].value;});// draw avg line
trendline.attr("x2",originEndX1).attr("y2",originEndY1).transition().delay(duration/4).duration(duration/4).attr("x2",originEndX2).attr("y2",originEndY2);var fontSize=xAxis.select("text").attr("font-size");var avgFontSize=fontSize*1.5;svg.append("g").append("text").attr("x",originEndX2).attr("y",originEndY2-avgFontSize*0.5).attr("text-anchor","end")// .attr()
.text("average").attr("fill",_color2.default.DASHLINE).attr("font-size",avgFontSize).attr("opacity",0).transition().delay(duration/4).duration(duration/4).attr("opacity",1);setTimeout(function(){barsOthers.attr("opacity",1).transition().duration(duration/4).attr("opacity",0.2);},duration/4*2);var labels=svg.selectAll(".xAxis").selectAll(".tick");// labels.attr("opacity", 0);
svg.select('.arrowLayer').attr("opacity",0);setTimeout(function(){labels.transition().duration(duration/4).attr("opacity",1);svg.select('.arrowLayer').transition().duration(duration/4).attr("opacity",1);labels.filter(function(d){return d===focus[0].value;}).selectAll("text").transition().duration(duration/4).attr("fill",_color2.default.ANNOTATION);},duration/4*3);}},{key:'animateExtreme',value:function animateExtreme(){/* -------------------------------- basic vis ------------------------------- */var svg=this.displayExtreme();if(!svg)return;/* -------------------------------- init data ------------------------------- */var ticks=10;var duration=this.duration();var focus=this.focus();/* ------------------------------ start animate ----------------------------- *//* ----------------------- animation frame arrangement ---------------------- */var animation={axisFadeIn:{duration:1,index:0},barGrow:{duration:2,index:1},fillColor:{duration:4,index:2},tickHighlight:{duration:3,index:2},valueFadeIn:{duration:3,index:3}};var everyTick=duration/ticks;svg.selectAll(".xAxis").selectAll("path").attr("opacity",0).transition().duration(everyTick*animation.axisFadeIn.duration).attr("opacity",1);/* ----------------------------- step 0 barGrow ----------------------------- */var bars=svg.selectAll(".barSeries").selectAll(".bars");var y=this._y;bars.attr("height",0).attr("y",y(0)).attr("fill",_color2.default.DEFAULT);bars.transition().duration(everyTick*animation.barGrow.duration).delay(everyTick*countTicksBeforeIndex(animation,animation.barGrow.index)).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;});/* -------------------------- step 1 fillColor -------------------------- */var barsFocus=bars.filter(function(d,i){return d.data[focus[0].field]===focus[0].value;});setTimeout(function(){barsFocus.transition().duration(everyTick*animation.fillColor.duration).attr("fill",_color2.default.HIGHLIGHT);},everyTick*countTicksBeforeIndex(animation,animation.fillColor.index));/* -------------------------- step 2 othersFadeOut -------------------------- */// let barsOthers = bars.filter(function (d, i) {
//     return d.data[focus[0].field] !== focus[0].value
// })
// setTimeout(() => {
//     barsOthers.attr("opacity", 1)
//         .transition()
//         .duration(everyTick * (animation.othersFadeOut.duration))
//         .attr("opacity", 0.2)
// }, everyTick * countTicksBeforeIndex(animation, animation.othersFadeOut.index));
/* --------------------------- step 3 valueFadeIn --------------------------- */var tooltip=svg.selectAll(".tooltip");tooltip.attr("opacity",0);setTimeout(function(){tooltip.transition().duration(everyTick*animation.valueFadeIn.duration).attr("opacity",1);},everyTick*countTicksBeforeIndex(animation,animation.valueFadeIn.index));/* -------------------------- step 3 tickHighlight -------------------------- */var labels=svg.selectAll(".xAxis").selectAll(".tick");labels.filter(function(d){return d===focus[0].value;}).selectAll("text").attr("fill",_color2.default.ANNOTATION);labels.attr("opacity",0);setTimeout(function(){labels.transition().duration(everyTick*animation.tickHighlight.duration).attr("opacity",1);},everyTick*(countTicksBeforeIndex(animation,animation.tickHighlight.index)+1));}},{key:'animateDifference',value:function animateDifference(){/* -------------------------------- basic vis ------------------------------- */var svg=this.displayDifference();if(!svg)return;/* -------------------------------- init data ------------------------------- */var ticks=10;var duration=this.duration();var chartSize={width:this.width(),height:this.height()};var height=chartSize.height;/* ------------------------------ start animate ----------------------------- *//* ----------------------- animation frame arrangement ---------------------- */var animation={labelFadeIn:{duration:1,index:0},barGrow:{duration:3,index:1},drawHLines:{duration:3,index:2},drawArrow:{duration:0,index:3},drawVLines:{duration:3,index:3},valueFadeIn:{duration:3,index:3}};var everyTick=duration/ticks;/* ----------------------------- step 0 barGrow ----------------------------- */var bars=svg.selectAll(".barSeries").selectAll(".bars");bars.attr("height",0).attr("y",height);var y=this._y;bars.transition().duration(everyTick*animation.barGrow.duration).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("y",function(d){return y(d[1]);});/* --------------------------- step 0 labelFadeIn --------------------------- */// let labels = svg.selectAll(".xAxis").selectAll(".tick");
var labels=svg.selectAll(".xAxis,.yAxis");labels.attr("opacity",0);labels.transition().duration(everyTick*animation.labelFadeIn.duration).attr("opacity",1);/* --------------------------- step 1 valueFadeIn --------------------------- */var diffValue=svg.selectAll(".differenceValue");diffValue.selectAll("text").nodes()[1].remove();diffValue.attr("opacity",0);setTimeout(function(){diffValue.transition().duration(everyTick*animation.valueFadeIn.duration).attr("opacity",1);},everyTick*countTicksBeforeIndex(animation,animation.valueFadeIn.index));/* ---------------------------- step 2 drawHLines --------------------------- */var referenceLs=svg.selectAll(".referenceLs").selectAll("line");referenceLs.each(function(){var originX=d3.select(this).attr("x2");d3.select(this).attr("x1",originX);});var _getSizeBySize3=getSizeBySize(chartSize,this.size()),margin=_getSizeBySize3.margin;var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;setTimeout(function(){referenceLs.transition().duration(everyTick*animation.drawHLines.duration)// .attr("x1", 0)
.attr("x1",measuredYFieldsWidth);},everyTick*countTicksBeforeIndex(animation,animation.drawHLines.index));/* ---------------------------- step 3 drawArrow ---------------------------- */// let uuid = uuidv4();
var trendSVG=svg.selectAll(".trendSVG");trendSVG.remove();// trendSVG.attr("id", "trendSVGClip")
//     .attr("clip-path", "url(#clip_trend_"+uuid+")");
// let defsX = trendSVG.node().getBBox().x,
//     defsY = trendSVG.node().getBBox().y,
//     defsHeight = trendSVG.node().getBBox().height,
//     defsWidth = trendSVG.node().getBBox().width;
// trendSVG.append("defs")
//     .attr("class", "trend_defs")
//     .append("clipPath")
//     .attr("id", "clip_trend_"+uuid)
//     .append("rect")
//     .attr("x", defsX)
//     .attr("y", defsY)
//     .attr("width", 0)
//     .attr("height", defsHeight);
// setTimeout(() => {
//     trendSVG.select("#clip_trend_"+uuid+" rect")
//         .attr("width", 0)
//         .transition()
//         .duration(everyTick * (animation.drawArrow.duration))
//         .attr("width", defsWidth)
// }, everyTick * countTicksBeforeIndex(animation, animation.drawArrow.index))
/* ---------------------------- step 3 drawVLines --------------------------- */var vLine=svg.selectAll(".hightlightL");vLine.attr("opacity",0);setTimeout(function(){vLine.transition().duration(everyTick*animation.drawVLines.duration).attr("opacity",1);},everyTick*countTicksBeforeIndex(animation,animation.drawVLines.index));}},{key:'animateTrend',value:function animateTrend(){var _this3=this;/* -------------------------------- basic vis ------------------------------- */// let svg = this.displayTrend();
var factdata=this.factdata();var measure=this.measure(),measuredField=measure[0].aggregate==='count'?"COUNT":measure[0].field;var breakdown=this.breakdown();var hasSeries=false;if(breakdown[1]&&breakdown[1].field)hasSeries=true;// set the dimensions and margins of the graph
var chartSize={width:this.width(),height:this.height()};var _getSizeBySize4=getSizeBySize(chartSize,this.size(),hasSeries),tickFontSize=_getSizeBySize4.tickFontSize,tickStrokeWidth=_getSizeBySize4.tickStrokeWidth,annotationSize=_getSizeBySize4.annotationSize,margin=_getSizeBySize4.margin,strokeWidth=_getSizeBySize4.strokeWidth;var width=chartSize.width,height=chartSize.height;var svg=d3.select(this.container()).append("svg").attr("class","svg").attr("display","block").attr("width",width).attr("height",height).append("g").attr("display","block").attr("class","chartG");if(this.measure().length>1){return;}var data=factdata;if(breakdown[0].type==='temporal'){data=data.sort(sortByDateAscending(breakdown));}var seriesData=void 0;var calculateData=void 0;var maxYValue=getMaxYValue(factdata,measure);if(hasSeries){calculateData=d3.nest().key(function(d){return d[breakdown[0].field];}).entries(data);var categories=Array.from(new Set(data.map(function(d){return d[breakdown[1].field];})));categories=categories.slice(0,10);var objList=new Array(calculateData.length);var _loop2=function _loop2(i){var obj={};calculateData[i].values.map(function(d,i){obj.x=d[breakdown[0].field];obj[d[breakdown[1].field]]=d[measuredField];return obj;});objList[i]=obj;};for(var i=0;i<calculateData.length;i++){_loop2(i);}// complete the missed data = 0
for(var k=0;k<calculateData.length;k++){for(var i=0;i<categories.length;i++){if(!objList[k].hasOwnProperty(categories[i])){objList[k][categories[i]]=0;}}}seriesData=d3.stack().keys(categories)(objList);}else{data.map(function(data){data.maxValue=maxYValue-data[measuredField];return data;});seriesData=d3.stack().keys([measuredField])(data);}seriesData=seriesData.slice(0,10);if(this.style()===_style2.default.COMICS){if(hasSeries){width=this.size()===_size2.default.LARGE&&hasSeries?width:0.85*width;}else if(seriesData[0].length>7)width*=0.85;else if(this.size()===_size2.default.WIDE){height*=0.85;}else if(this.size()!==_size2.default.LARGE){height*=0.9;}}var contentG=svg.append("g");// append legend before chart 
var measuredWidth=0;if(hasSeries){var rightLegendsW=margin.right,//inital
measuredHeight=0;var seriesName=d3.map(seriesData,function(d){return d.key;}).keys();svg.append("foreignObject").attr("x",chartSize.width-margin.right).attr("y",height/2).attr("width",rightLegendsW).attr("height",height).attr("class","foreignObject").append("xhtml:div").attr("class","legends").style("display","flex").style("flex-direction","column")// .style("flex-wrap", "wrap")
// .style("align-content", "space-around")
// .style("height", height + "px")
.style("height","100%").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class","legend").style("line-height",1).style("margin-right",5*chartSize.width/640+"px").each(function(d,i){var legend=d3.select(this).append("svg");legend.append("rect").attr("fill",function(d){return _color2.default.CATEGORICAL[seriesName.indexOf(d)];}).attr("width",10*tickFontSize/12).attr('height',10*tickFontSize/12).attr("rx",1.5*chartSize.width/640).attr("ry",1.5*chartSize.width/640);legend.append("text").attr("fill",_color2.default.TEXT).attr("x",12*tickFontSize/12).text(d).attr("font-size",tickFontSize*0.8).attr("font-family",NUMFONT).attr("alignment-baseline","hanging");legend.attr("width",legend.node().getBBox().width);legend.attr("height",legend.node().getBBox().height);var selfWidth=legend.node().getAttribute("width"),selfHeight=legend.node().getAttribute("height");if(Number(selfWidth)>Number(measuredWidth)){measuredWidth=Number(selfWidth);}measuredHeight+=Number(selfHeight);});//update legend center
measuredWidth=measuredWidth+margin.right;var yPos=(chartSize.height-measuredHeight)/2;if(margin.right<measuredWidth){svg.select(".foreignObject").node().setAttribute("x",this.width()-measuredWidth-margin.right/2);}svg.select(".foreignObject").node().setAttribute("y",yPos);svg.select(".foreignObject").node().setAttribute("width",Number(measuredWidth));svg.select(".foreignObject").node().setAttribute("height",height);}/***(1) append yAxis  to measure the leftTick width **/var maxY=void 0;if(hasSeries){maxY=d3.max(seriesData[seriesData.length-1],function(d){return d[1];});}else{maxY=d3.max(data,function(d){return d[measuredField];});}var startY=height,endY=0;//inital
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);/***(2) append xAxis**/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;// console.log("measuredYFieldsWidth", measuredYFieldsWidth)
var starX=measuredYFieldsWidth,endX=width-measuredWidth-margin.right,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(3) check rotation before update y**/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");var unsupportedchartPrams={svg:svg,chartSize:chartSize,annotationSize:annotationSize,size:this.size()};var isShowSuggestion=this.showSuggestion();var result=checkXAxis(xAxis,x,breakdown[0].type,unsupportedchartPrams,isShowSuggestion);if(result==="unsupportedChart")return svg;checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//update y 
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top;//y根据 x轴文字的高度动态缩减
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);//更新endY
var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
this._y=y;// append the rectangles for the bar chart
if(hasSeries){contentG.selectAll(".barSeries").data(seriesData).enter().append("g").attr("class","barSeries").attr("fill",function(d,i){return _color2.default.CATEGORICAL[i];}).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(calculateData[i].key);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}else{contentG// .selectAll(".barSeries")
//     .data()
//     .enter()
.append("g").datum(seriesData[0]).attr("class","barSeries").attr("transform",'translate(0,0)').attr("fill",_color2.default.DEFAULT)//(d, i) => (i === seriesData.length - 1) ? Color.BACKGROUND : )
.attr("opacity",0.5).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}//trend line
if(hasSeries){// for (let i = 0; i < seriesData.length; i++) {
//     let trendLineG = d3.line()
//         .x(function (d) { return x(d.data.x) + x.bandwidth() / 2; })
//         .y(function (d) { return y(d[1]) });
//     contentG.append("g").attr("class", "trendLine").append("path")
//         .attr("d", trendLineG(seriesData[i]))
//         .attr("fill", "none")
//         .attr('stroke-width', d => {
//             if (this.size() === 'small') return 1;
//             if (this.size() === 'middle') return 2;
//             if (this.size() === 'wide') return 3;
//             if (this.size() === 'large') return 4;
//         })
//         .attr('stroke-dasharray', '5,5')
//         .attr("stroke", Color.HIGHLIGHT);
// }
}else{var getTanDeg=function getTanDeg(tan){var result=Math.atan(tan)/(Math.PI/180);result=Math.round(result);return result;};var offsetY=this.size()==='large'?5:2;//离x轴的距离
var trendLineG=d3.line().x(function(d){return x(d[breakdown[0].field])+x.bandwidth()/2;}).y(function(d){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field])-offsetY;});var trendline=contentG.append("g").attr("class","trendLine");// console.log(data)
// let firstY = seriesData[0][1],
//     lastY = seriesData[seriesData.slice(-1)[0]][1];
var _data=[data[0],data.slice(-1)[0]];trendline.append("path").attr("d",trendLineG(_data)).attr("fill","none").attr('stroke-width',function(d){if(_this3.size()==='small')return 2;if(_this3.size()==='middle')return 3;if(_this3.size()==='wide')return 4;if(_this3.size()==='large')return 5;}).attr('stroke-dasharray','5,5').attr("stroke",_color2.default.HIGHLIGHT);var finalPosition=trendline.select("path").attr("d").split("L").slice(-1)[0];var secondPosition=trendline.select("path").attr("d").split("L").slice(-2)[0];secondPosition=secondPosition.substring(1);var f_x=finalPosition.split(",")[0],f_y=height-finalPosition.split(",")[1],s_x=secondPosition.split(",")[0],s_y=height-secondPosition.split(",")[1];var slope=(f_y-s_y)/(f_x-s_x);var deg=void 0;if(getTanDeg(slope)<0){deg=Math.abs(getTanDeg(slope))+90;}else{deg=-getTanDeg(slope)+90;}trendline.append("path").attr("class","triangle").attr("transform","translate("+finalPosition+")rotate("+deg+")").attr("d",d3.symbol().type(d3.symbolTriangle).size(0.16*height)).attr("fill",_color2.default.HIGHLIGHT);}if(this.style()===_style2.default.COMICS){if(hasSeries){var metaphorWidth=width*0.22,metaphorHeight=1.25*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor9.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.18;metaphorHeight=1.25*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE){metaphorWidth=width*0.2;metaphorHeight=1.25*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",endX+metaphorWidth*0.05).attr("y",height-metaphorHeight*0.96);}else{var filterPoints=seriesData[0];if(filterPoints.length>7){//too much point
//draw dash line
var x0=x(filterPoints[0].data[breakdown[0].field])+x.bandwidth()/2,x1=x(filterPoints.slice(-1)[0].data[breakdown[0].field])+x.bandwidth()/2,y0=y(filterPoints[0].data[measuredField]),y1=y(filterPoints.slice(-1)[0].data[measuredField]),x2=x1+width*0.1,y2=(x2-x1)*(y1-y0)/(x1-x0)+y1;var line_m=svg.append('line').attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y2).attr("stroke",_color2.default.DASHLINE).attr("stroke-width",strokeWidth).attr("stroke-dasharray",strokeWidth*2+', '+strokeWidth);svg.node().prepend(line_m.node());var _metaphorWidth=width*0.22,_metaphorHeight=1.24*_metaphorWidth;var _metaphor=svg.append("image").attr('xlink:href',_metaphor11.default);if(this.size()===_size2.default.WIDE){_metaphorWidth=width*0.18;_metaphorHeight=1.24*_metaphorWidth;}else if(this.size()===_size2.default.MIDDLE||this.size()===_size2.default.SMALL){_metaphorWidth=width*0.2;_metaphorHeight=1.24*_metaphorWidth;}_metaphor.attr("width",_metaphorWidth).attr("height",_metaphorHeight).attr("x",x2-_metaphorWidth*0.06).attr("y",y2-_metaphorHeight*0.06);}else{var metaphorWidth7=(endX-starX)/(filterPoints.length-1)*0.6,metaphorWidth8=metaphorWidth7/1.14;var metaphorHeight7=metaphorWidth7*0.95;var metaphorHeight8=metaphorWidth8*1.2;var _offsetY=this.size()==='large'?5:2;//离x轴的距离
for(var _i=1;_i<filterPoints.length;_i++){var middleX=(x(filterPoints[_i].data[breakdown[0].field])+x(filterPoints[_i-1].data[breakdown[0].field]))/2+x.bandwidth()/2;var middleY=(y(filterPoints[_i].data[measuredField])+y(filterPoints[_i-1].data[measuredField]))/2-_offsetY;if(filterPoints[_i].data[measuredField]-filterPoints[_i-1].data[measuredField]>0){//up
svg.append("image").attr('xlink:href',_metaphor7.default).attr("width",metaphorWidth8).attr("height",metaphorHeight8).attr("x",middleX-metaphorWidth8*0.7).attr("y",middleY-metaphorHeight8*0.96);}else{//down
svg.append("image").attr('xlink:href',_metaphor5.default).attr("width",metaphorWidth7).attr("height",metaphorHeight7).attr("x",middleX-metaphorWidth7*0.5).attr("y",middleY-metaphorHeight7*1);}}}//center居中
svg.attr("transform","translate("+((this.width()-svg.node().getBBox().width)/2-svg.node().getBBox().x)+","+((this.height()-svg.node().getBBox().height)/2-svg.node().getBBox().y)+")");}}//finally update chart horizental cental
(0,_updateChartCenter2.default)(svg,this.width(),this.height());if(!svg)return;/* -------------------------------- init data ------------------------------- */var ticks=10;var duration=this.duration();// let chartSize = {
//     width: this.width(),
//     height: this.height()
// };
// let height = chartSize.height;
// let breakdown = this.breakdown();
// let hasSeries = false;
// if (breakdown[1] && breakdown[1].field) hasSeries = true;
/* ------------------------------ start animate ----------------------------- *//* ----------------------- animation frame arrangement ---------------------- */var animation={axisFadeIn:{duration:1,index:0},majorGrow:{duration:6,index:1},trendGrow:{duration:3,index:2}};var everyTick=duration/ticks;svg.selectAll(".xAxis").selectAll("text").attr("dy","1em");svg.selectAll(".xAxis").selectAll("path").attr("opacity",0).transition().duration(everyTick*animation.axisFadeIn.duration).attr("opacity",1);svg.selectAll(".yAxis").attr("opacity",0).transition().duration(everyTick*animation.axisFadeIn.duration).attr("opacity",1);/* --------------------------- step 0 majorGrow --------------------------- */if(!hasSeries){var bars=svg.selectAll(".barSeries").selectAll(".bars");bars.attr("height",0).attr("y",height);var _xAxis=svg.selectAll(".xAxis");_xAxis.selectAll(".tick").attr("opacity",0);setTimeout(function(){var y=_this3._y;bars.transition().duration(everyTick*animation.majorGrow.duration/bars.size()).ease(d3.easeLinear).delay(function(d,i){return i*everyTick*animation.majorGrow.duration/bars.size();}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("y",function(d){return y(d[1]);});_xAxis.selectAll(".tick").attr("opacity",0).transition().delay(function(_,i){return everyTick*animation.majorGrow.duration/_xAxis.selectAll("text").size()*i;}).duration(everyTick*animation.majorGrow.duration/_xAxis.selectAll("text").size()).attr("opacity",1);},everyTick*countTicksBeforeIndex(animation,animation.majorGrow.index));var trendSVG=svg.selectAll(".trendLine");var uuid=(0,_v2.default)();trendSVG.attr("id","trendSVGClip").attr("clip-path","url(#clip_trend_"+uuid+")");var defsX=trendSVG.node().getBBox().x,defsY=trendSVG.node().getBBox().y,defsHeight=trendSVG.node().getBBox().height,defsWidth=trendSVG.node().getBBox().width;trendSVG.append("defs").attr("class","trend_defs").append("clipPath").attr("id","clip_trend_"+uuid).append("rect").attr("x",defsX).attr("y",defsY).attr("width",0).attr("height",defsHeight);setTimeout(function(){trendSVG.select("#clip_trend_"+uuid+" rect").attr("width",0).transition().duration(everyTick*animation.trendGrow.duration).ease(d3.easeLinear).attr("width",defsWidth);},everyTick*countTicksBeforeIndex(animation,animation.trendGrow.index));}else{var _bars=svg.selectAll(".barSeries");var _y=this._y;_bars.selectAll(".bars").attr("height",0).attr("y",function(d){return _y(d[0]);});_bars.transition().each(function(d,i){var indexOfSeries=i;var seriesCount=_bars.size();var barCount=d3.select(this).selectAll(".bars").size();var timeUnit=everyTick*animation.majorGrow.duration/seriesCount/barCount;d3.select(this).selectAll(".bars").transition().duration(timeUnit).delay(function(d,i){return seriesCount*i*timeUnit+indexOfSeries*timeUnit;}).ease(d3.easeLinear).attr("height",function(d){return _y(d[0])-_y(d[1])>0?_y(d[0])-_y(d[1]):0;}).attr("y",function(d){return _y(d[1]);});});var _xAxis2=svg.selectAll(".xAxis");_xAxis2.selectAll("text").attr("opacity",0).transition().delay(function(_,i){return everyTick*animation.majorGrow.duration/_xAxis2.selectAll("text").size()*i;}).duration(everyTick*animation.majorGrow.duration/_xAxis2.selectAll("text").size()).ease(d3.easeLinear).attr("opacity",1);}}},{key:'displayDifference',value:function displayDifference(){var _this4=this;var chartSize={width:this.width(),height:this.height()};var _getSizeBySize5=getSizeBySize(chartSize,this.size()),tickFontSize=_getSizeBySize5.tickFontSize,tickStrokeWidth=_getSizeBySize5.tickStrokeWidth,margin=_getSizeBySize5.margin,hightLightFontSize=_getSizeBySize5.hightLightFontSize,arrowWidth=_getSizeBySize5.arrowWidth,width=chartSize.width-margin.left-margin.right,height=chartSize.height;var svg=d3.select(this.container()).append("svg").attr("width",this.width()).attr("height",this.height()).append("g").attr("display","block").attr("class","chartG");// if(this.style() === Style.COMICS) width = this.size() === Size.LARGE ? width :0.85* width;
//difference类型会在filteredData里生成两条数据
if(this.focus().length<2||this.measure().length>1){svg.append("rect").attr("width",this.width()).attr("height",this.height()).attr("fill","none");return svg;}var focus=this.focus();var filteredData=[];//sorted by focus
var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop4=function _loop4(){var fs=_step.value;_this4.factdata().filter(function(x){return x[fs.field]===fs.value;})[0]&&filteredData.push(_this4.factdata().filter(function(x){return x[fs.field]===fs.value;})[0]);};for(var _iterator=focus[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop4();}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}var measure=this.measure();var breakdown=this.breakdown();var measuredField=measure[0].aggregate==="count"?"COUNT":measure[0].field;//console.log('11', maxYValue)
var maxYValue=getMaxYValue(filteredData,measure);filteredData.map(function(data){data.maxValue=maxYValue-data[measuredField];return data;});//console.log('showDifference in child')
var data=filteredData;var seriesData=d3.stack().keys([measuredField,"maxValue"])(data);//console.log("series...", seriesData)
//(1)append valueText first to measure the width
var valueText=Math.abs(Number(seriesData[0][1][1])-Number(seriesData[0][0][1]));var meauredTextWidth=0;var differenceValueG=svg.append("g").attr("class","differenceValue").attr("transform",'translate('+width+','+height/2+')');differenceValueG.append("text").attr('font-size',hightLightFontSize).attr('font-family',TEXTFONT).attr("font-weight",'bold').attr('fill',_color2.default.HIGHLIGHT).attr('text-anchor','middle').attr('dominant-baseline','hanging').text(valueText<0?'-'+(0,_format2.default)(-valueText):(0,_format2.default)(valueText));differenceValueG.append("text").attr("dy","-1.25em").attr('font-size',hightLightFontSize).attr('font-family',TEXTFONT).attr("font-weight",'bold').attr('fill',_color2.default.HIGHLIGHT).attr('text-anchor','middle').attr('dominant-baseline','hanging').text("Difference");var _selfWidth=svg.select(".differenceValue").node().getBBox().width;//_selfHeight = svg.select(".difference-value-box").node().getBBox().height;
meauredTextWidth=_selfWidth+margin.right/2;/***(2) append yAxis  to measure the leftTick width **/var maxY=d3.max(data,function(d){return d[measuredField];});var startY=height,endY=0;//inital
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);/***(3) append xAxis**/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;var starX=measuredYFieldsWidth,endX=this.width()-meauredTextWidth,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(4) check rotation before update y**/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");checkAndRotate(xAxis,x);checkMaxAxisHeight(x,this.height(),tickFontSize,svg);var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top;//y根据 x轴文字的高度动态缩减
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);//更新endY
//update textValue
var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);//update differenceValue group
differenceValueG.node().setAttribute("transform",'translate('+(width-margin.right/2)+' '+y(maxY/2)+')');// /***(5) update chart**/
// xAxisPos = measuredAxisHeight;
// // console.log("向上方移动图表", xAxisPos)
// svg.node().setAttribute("transform", `translate(0,-${xAxisPos})`); //向上方移动图表 
this._y=y;// append the rectangles for the bar chart
svg.insert("g",".xAxis").datum(seriesData[0]).attr("class","barSeries").attr("fill",_color2.default.DEFAULT).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1]);}).attr("width",x.bandwidth());svg.append("g").attr("class","referenceLs").selectAll("referenceL").data(data).join("line").attr('class','referenceL').attr('x1',measuredYFieldsWidth).attr('y1',function(d){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]);}).attr('x2',function(d){return x(d[breakdown[0].field])+x.bandwidth()/2;}).attr('y2',function(d){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]);}).attr('stroke',_color2.default.DASHLINE).attr('stroke-width',tickStrokeWidth).attr('stroke-dasharray','5,5');svg.append("line").attr('class','hightlightL').attr('x1',measuredYFieldsWidth).attr('y1',y(data[0][measure[0].aggregate==="count"?"COUNT":measure[0].field])).attr('x2',measuredYFieldsWidth).attr('y2',y(data[1][measure[0].aggregate==="count"?"COUNT":measure[0].field])).attr('stroke',_color2.default.HIGHLIGHT).attr('opacity',1).attr('stroke-width',arrowWidth);// draw trend line
var barW1=x(data[0][breakdown[0].field])+x.bandwidth()/2;var barW2=x(data[1][breakdown[0].field])+x.bandwidth()/2;var barH1=y(data[0][measure[0].aggregate==="count"?"COUNT":measure[0].field]);var barH2=y(data[1][measure[0].aggregate==="count"?"COUNT":measure[0].field]);var h1=barH1+height/20<height?barH1+height/20:height-height/50;var h2=barH2+height/20<height?barH2+height/20:height-height/50;var trendLine=d3.line().x(function(d){return d.x;}).y(function(d){return d.y;}).curve(d3.curveMonotoneY);var trendData=[{x:barW1,y:h1},{x:(barW1+barW2)/2,y:(h1+h2)/2+Math.abs(h1-h2)/4},{x:barW2,y:h2}];function getTanDeg(tan){var result=Math.atan(tan)/(Math.PI/180);result=Math.round(result);return result;}var slope=(height-h2-(height-((h1+h2)/2+Math.abs(h1-h2)/4)))/(barW2-barW1)*2;var deg=void 0;if(getTanDeg(slope)<0){deg=Math.abs(getTanDeg(slope))+90;}else{deg=-getTanDeg(slope)+90;}var trendSVG=svg.append("g").attr("class","trendSVG");trendSVG.append('path').attr("stroke","black").attr("stroke-width",arrowWidth).attr('fill','none').attr('d',trendLine(trendData));trendSVG.append("path").attr("transform","translate("+barW2+","+h2+")rotate("+deg+")").attr("d",d3.symbol().type(d3.symbolTriangle).size(0.4*arrowWidth/5*height)).attr("fill",'black');if(this.style()===_style2.default.COMICS){var metaphorWidth=width*0.26,metaphorHeight=1.33*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor19.default).attr("y",height-metaphorHeight);var textHeight=differenceValueG.node().getBBox().height;if(this.size()!==_size2.default.LARGE){metaphorHeight=startY-endY-textHeight;metaphorWidth=metaphorHeight/1.33;metaphor.attr("y",endY+textHeight);differenceValueG.node().setAttribute("transform",'translate('+(width-margin.right/2)+' '+(endY+textHeight/2)+')');}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight)// .attr("x", x(data[1][breakdown[0].field])+ x.bandwidth() / 2 + ((this.size() === Size.MIDDLE || this.size() === Size.SMALL)? metaphorWidth*0.2 : metaphorWidth*0.8))
.attr("x",width*0.98-metaphorWidth*0.75);}if(this.style()===_style2.default.PICTOGRAPH){var _ret3=function(){//将名称存成数组  breakdown values
var pictype=[];if(breakdown[0].type==="temporal"||breakdown[0].type==="numerical")return{v:void 0};breakdown[0].values.forEach(function(ele,i){xDomain.forEach(function(ele1){if(ele.attribute===ele1)pictype.push(ele.pictype);});});/*------------------通过名称找寻icon----------------------------*/svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id",function(d){return'picvdiff'+d;}).append("path").attr("d",function(d){return _pictogram2.default[d];});/*-----------------缩放icon---------------------------*/var scale=[];var typesizex1=[];var typesizey1=[];var typex1=[];var typey1=[];var _loop3=function _loop3(i){typesizex1.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().width);typesizey1.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().height);typex1.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().x);typey1.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().y);svg.select('#picvdiff'+pictype[i]).attr("transform",function(){scale.push(x.bandwidth()/typesizex1[i]);return'scale('+scale[i]+')';});};for(var i=0;i<pictype.length;i++){_loop3(i);}var typesizex=[];var typesizey=[];var typex=[];var typey=[];for(var i=0;i<pictype.length;i++){typesizex.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().width);typesizey.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().height);typex.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().x);typey.push(svg.select('#picvdiff'+pictype[i]).node().getBBox().y);}//添加icon
svg.append("g").datum(seriesData[0]).attr("class","iconSeries").selectAll("use").data(function(d){return d;}).enter().append("use").attr("xlink:href",function(d,i){return'#picvdiff'+pictype[i];}).attr("id",function(d,i){return'icon'+pictype[i];}).attr("x",function(d,i){return x(d.data[breakdown[0].field])-Math.abs(typex[i]*scale[i]);}).attr("y",function(d,i){return y(d[1])-Math.abs(typey[i]*scale[i])-typesizey[i]*scale[i];})//.attr("fill",Color.DEFAULT)
.attr("fill","#96A7CE");var cardWidth=_this4.width();var cardHeight=_this4.height();var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}svg.select(".trendSVG").remove();var trendSVG1=svg.append("g").attr("class","trendSVG1");trendSVG1.append('path').style("stroke","black").style("stroke-width",arrowWidth).attr('fill','none').attr('d',trendLine(trendData));trendSVG1.append("path").attr("transform","translate("+barW2+","+h2+")rotate("+deg+")").attr("d",d3.symbol().type(d3.symbolTriangle).size(0.4*arrowWidth/5*height)).style("fill",'black');}();if((typeof _ret3==='undefined'?'undefined':_typeof(_ret3))==="object")return _ret3.v;}//finally update chart horizental cental
if(this.style()!==_style2.default.PICTOGRAPH)(0,_updateChartCenter2.default)(svg,this.width(),this.height());return svg;}},{key:'displayProportion',value:function displayProportion(){var _this5=this;var chartSize={width:this.width(),height:this.height()};var _getSizeBySize6=getSizeBySize(chartSize,this.size()),tickFontSize=_getSizeBySize6.tickFontSize,tickStrokeWidth=_getSizeBySize6.tickStrokeWidth,margin=_getSizeBySize6.margin,annotationSize=_getSizeBySize6.annotationSize,width=this.width(),height=this.height();var svg=d3.select(this.container()).append("svg").attr("width",width).attr("height",height).append("g").attr("display","block").attr("class","chartG");if(this.style()===_style2.default.COMICS)width=0.85*width;if(this.focus().length!==1||this.measure().length>1){return;}var focus=this.focus();var measure=this.measure(),measuredField=measure[0].aggregate==="count"?"COUNT":measure[0].field;var breakdown=this.breakdown();var maxYValue=d3.sum(this.factdata(),function(d){return d[measuredField];});// getMaxYValue(this.factdata(), measure, true);
var data=this.factdata().map(function(data){data.maxValue=maxYValue-data[measuredField];return data;});var seriesData=d3.stack().keys([measuredField,"maxValue"])(data);var contentG=svg.append("g");/***(2) append yAxis  to measure the leftTick width **/var maxY=d3.sum(data,function(d){return d[measuredField];});//d3.max(data, d => d[measuredField]);
var startY=height,endY=0;//inital
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);/***(1) append xAxis**/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;var starX=measuredYFieldsWidth/2,endX=width-margin.right,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(2) check rotation before update y**/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");var unsupportedchartPrams={svg:svg,chartSize:chartSize,annotationSize:annotationSize,size:this.size()};var isShowSuggestion=this.showSuggestion();var result=checkXAxis(xAxis,x,breakdown[0].type,unsupportedchartPrams,isShowSuggestion);if(result==="unsupportedChart")return svg;checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//proportion style
svg.select(".xAxis .domain").remove();svg.selectAll(".xAxis line").remove();xAxis.selectAll('.tick text').attr('fill',function(d){if(d===focus[0].value)return _color2.default.HIGHLIGHT;return"black";});var upValueH=30;var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top+upValueH;//y根据 x轴文字的高度动态缩减
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);//更新endY
/***(3) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
svg.select(".yAxis").remove();var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);this._y=y;// append the rectangles for the bar chart
contentG.insert("g",".xAxis").datum(seriesData[1]).attr("class","barSeriesBG").selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("fill",_color2.default.BACKGROUND).attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(0)-y(d[1]);}).attr("width",x.bandwidth());contentG.insert("g",".xAxis").datum(seriesData[0]).attr("class","barSeries").selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("fill",function(d,i){//通过d[0]===0来判断是第一层数据
if(d.data[focus[0].field]===focus[0].value){return _color2.default.HIGHLIGHT;}return _color2.default.DEFAULT;}).attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1]);}).attr("width",x.bandwidth());//bar value
//console.log("filteredData", data)
var totalValue=d3.sum(data,function(d){return d[measure[0].aggregate==="count"?"COUNT":measure[0].field];});contentG.append("g").attr("class","values").selectAll("text").data(data).enter().append("text").attr("font-size",annotationSize).attr('font-family',function(d){if(d[breakdown[0].field]===focus[0].value){// console.log("bold")
return TEXTFONT;}return NUMFONT;}).attr("fill",function(d){if(d[breakdown[0].field]===focus[0].value){return _color2.default.HIGHLIGHT;}return"black";}).attr("text-anchor",'middle').attr("x",function(d){return x(d[breakdown[0].field]);}).attr("y",function(d){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]);}).attr("dx",x.bandwidth()/2).attr("dy","-1em").text(function(d){return(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]/totalValue*100).toFixed(0)+"%";}).property("_value",function(d){return(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]/totalValue*100).toFixed(0);});if(this.style()===_style2.default.COMICS){var metaphorWidth=width*0.24,metaphorHeight=1.31*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor21.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.18;metaphorHeight=1.31*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE){metaphorWidth=width*0.22;metaphorHeight=1.31*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",width*0.92).attr("y",height-metaphorHeight*0.96);//center居中
svg.attr("transform","translate("+((this.width()-svg.node().getBBox().width)/2-svg.node().getBBox().x)+","+((this.height()-svg.node().getBBox().height)/2-svg.node().getBBox().y)+")");}if(this.style()===_style2.default.PICTOGRAPH){var _ret6=function(){//将名称存成数组  breakdown values
var pictypename=[];var pictype=[];if(breakdown[0].type==="temporal"||breakdown[0].type==="numerical")return{v:void 0};seriesData[0].forEach(function(ele,i){pictypename.push(ele.data[breakdown[0].field]);});pictypename.forEach(function(ele1){breakdown[0].values.forEach(function(ele,i){if(ele.attribute===ele1){pictype.push(ele.pictype);}});});/*------------------通过名称找寻icon----------------------------*/svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id",function(d){return'picvpro'+d;}).append("path").attr("d",function(d){return _pictogram2.default[d];});/*-----------------缩放icon---------------------------*/var scale=[];var typesizex1=[];var typesizey1=[];var typex1=[];var typey1=[];var _loop5=function _loop5(i){typesizex1.push(svg.select('#picvpro'+pictype[i]).node().getBBox().width);typesizey1.push(svg.select('#picvpro'+pictype[i]).node().getBBox().height);typex1.push(svg.select('#picvpro'+pictype[i]).node().getBBox().x);typey1.push(svg.select('#picvpro'+pictype[i]).node().getBBox().y);svg.select('#picvpro'+pictype[i]).attr("transform",function(){scale.push(x.bandwidth()/typesizex1[i]);return'scale('+scale[i]+')';});};for(var i=0;i<pictype.length;i++){_loop5(i);}var typesizex=[];var typesizey=[];var typex=[];var typey=[];for(var i=0;i<pictype.length;i++){typesizex.push(svg.select('#picvpro'+pictype[i]).node().getBBox().width);typesizey.push(svg.select('#picvpro'+pictype[i]).node().getBBox().height);typex.push(svg.select('#picvpro'+pictype[i]).node().getBBox().x);typey.push(svg.select('#picvpro'+pictype[i]).node().getBBox().y);}//添加icon
svg.append("g").selectAll("use").data(seriesData[0]).enter().append("use").attr("xlink:href",function(d,i){return'#picvpro'+pictype[i];}).attr("id",function(d,i){return'icon'+pictypename[i];}).attr("x",function(d,i){return x(d.data[breakdown[0].field])-Math.abs(typex[i]*scale[i]);}).attr("y",function(d,i){return y(d[1])-Math.abs(typey[i]*scale[i])-typesizey[i]*scale[i];}).attr("fill",function(d,i){//通过d[0]===0来判断是第一层数据
if(d.data[focus[0].field]===focus[0].value){return _color2.default.HIGHLIGHT;}return _color2.default.DEFAULT;});svg.select(".values").remove();contentG.append("g").attr("class","valuess").selectAll("text").data(data).enter().append("text").attr("font-size",annotationSize).attr('font-family',function(d){if(d[breakdown[0].field]===focus[0].value){// console.log("bold")
return'RobotoMono-SemiBold';}return"RobotoMono-Regular";}).attr("fill",function(d){if(d[breakdown[0].field]===focus[0].value){return _color2.default.HIGHLIGHT;}return"black";}).attr("text-anchor",'middle').attr("x",function(d){return x(d[breakdown[0].field]);}).attr("y",function(d,i){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field])-typesizey[i]*scale[i];}).attr("dx",x.bandwidth()/2).attr("dy","-1em").text(function(d){return(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]/totalValue*100).toFixed(0)+"%";}).property("_value",function(d){return(d[measure[0].aggregate==="count"?"COUNT":measure[0].field]/totalValue*100).toFixed(0);});var cardWidth=_this5.width();var cardHeight=_this5.height();var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}();if((typeof _ret6==='undefined'?'undefined':_typeof(_ret6))==="object")return _ret6.v;}//finally update chart horizental cental
if(this.style()!==_style2.default.PICTOGRAPH)(0,_updateChartCenter2.default)(svg,this.width(),this.height());return svg;}},{key:'displayCategorization',value:function displayCategorization(){var _this6=this;var factdata=this.factdata();var breakdown=this.breakdown();var chartSize={width:this.width(),height:this.height()};var _getSizeBySize7=getSizeBySize(chartSize,this.size()),tickFontSize=_getSizeBySize7.tickFontSize,tickStrokeWidth=_getSizeBySize7.tickStrokeWidth,margin=_getSizeBySize7.margin,annotationSize=_getSizeBySize7.annotationSize,height=chartSize.height,width=chartSize.width;var svg=d3.select(this.container()).append("svg").attr("width",this.width()).attr("height",this.height()).append("g").attr("display","block").attr("class","chartG");if(this.style()===_style2.default.COMICS)width=0.85*width;if(this.breakdown().length>1){return;}var data=factdata;var measureField="COUNT";//data
var calculateData=d3.nest().key(function(d){return d[breakdown[0].field];}).entries(data);data=calculateData.map(function(d,i){var countRows=d.values[0];countRows[measureField]=d.values[0].COUNT;//d.values.length
return countRows;});var contentG=svg.append("g");var maxYValue=d3.max(factdata,function(d){return d[measureField];});data.map(function(data){data.maxValue=maxYValue-data[measureField];return data;});var seriesData=d3.stack().keys([measureField,"maxValue"])(data);seriesData=seriesData.slice(0,10);/***(1) append yAxis  to measure the leftTick width **/var maxY=d3.max(data,function(d){return d[measureField];});maxY=getMaxY(maxY);var startY=height,endY=0;//inital
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);/***(2) append xAxis**/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;var starX=measuredYFieldsWidth,endX=width-margin.right,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(3) check rotation before update y**/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");var unsupportedchartPrams={svg:svg,chartSize:chartSize,annotationSize:annotationSize,size:this.size()};var isShowSuggestion=this.showSuggestion();var result=checkXAxis(xAxis,x,breakdown[0].type,unsupportedchartPrams,isShowSuggestion);if(result==="unsupportedChart")return svg;checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//update y 
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top;//y根据 x轴文字的高度动态缩减
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);//更新endY
var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
this._y=y;contentG.insert("g",".xAxis").datum(seriesData[0])// .append("g")
.attr("class","barSeries").attr("transform",'translate(0,0)').selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("fill",function(d,i){var color=_color2.default.CATEGORICAL[i%10];return color;}).attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());if(this.style()===_style2.default.COMICS){var metaphorWidth=width*0.24,metaphorHeight=1.38*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor17.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.18;metaphorHeight=1.38*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE){metaphorWidth=width*0.22;metaphorHeight=1.38*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",width*0.91).attr("y",height-metaphorHeight*0.96);//center居中
svg.attr("transform","translate("+((this.width()-svg.node().getBBox().width)/2-svg.node().getBBox().x)+","+((this.height()-svg.node().getBBox().height)/2-svg.node().getBBox().y)+")");}if(this.style()===_style2.default.PICTOGRAPH){var _ret8=function(){//将名称存成数组  breakdown values
var pictypename=[];var pictype=[];if(breakdown[0].type==="temporal"||breakdown[0].type==="numerical")return{v:void 0};seriesData[0].forEach(function(ele,i){pictypename.push(ele.data[breakdown[0].field]);});pictypename.forEach(function(ele1){breakdown[0].values.forEach(function(ele,i){if(ele.attribute===ele1){pictype.push(ele.pictype);}});});/*------------------通过名称找寻icon----------------------------*/svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id",function(d){return'picvcate'+d;}).append("path").attr("d",function(d){return _pictogram2.default[d];});/*-----------------缩放icon---------------------------*/var scale=[];var typesizex1=[];var typesizey1=[];var typex1=[];var typey1=[];var _loop6=function _loop6(i){typesizex1.push(svg.select('#picvcate'+pictype[i]).node().getBBox().width);typesizey1.push(svg.select('#picvcate'+pictype[i]).node().getBBox().height);typex1.push(svg.select('#picvcate'+pictype[i]).node().getBBox().x);typey1.push(svg.select('#picvcate'+pictype[i]).node().getBBox().y);svg.select('#picvcate'+pictype[i]).attr("transform",function(){scale.push(x.bandwidth()/typesizex1[i]);return'scale('+scale[i]+')';});};for(var i=0;i<pictype.length;i++){_loop6(i);}var typesizex=[];var typesizey=[];var typex=[];var typey=[];for(var i=0;i<pictype.length;i++){typesizex.push(svg.select('#picvcate'+pictype[i]).node().getBBox().width);typesizey.push(svg.select('#picvcate'+pictype[i]).node().getBBox().height);typex.push(svg.select('#picvcate'+pictype[i]).node().getBBox().x);typey.push(svg.select('#picvcate'+pictype[i]).node().getBBox().y);}//添加icon
svg.append("g").selectAll("use").data(seriesData[0]).enter().append("use").attr("xlink:href",function(d,i){return'#picvcate'+pictype[i];}).attr("id",function(d,i){return'icon'+pictypename[i];}).attr("x",function(d,i){return x(d.data[breakdown[0].field])-Math.abs(typex[i]*scale[i]);}).attr("y",function(d,i){return y(d[1])-Math.abs(typey[i]*scale[i])-typesizey[i]*scale[i];})//.attr("fill",Color.DEFAULT)
.attr("fill",function(d,i){var color=_color2.default.CATEGORICAL[i%10];return color;});var cardWidth=_this6.width();var cardHeight=_this6.height();var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}();if((typeof _ret8==='undefined'?'undefined':_typeof(_ret8))==="object")return _ret8.v;}//finally update chart horizental cental
if(this.style()!==_style2.default.PICTOGRAPH)(0,_updateChartCenter2.default)(svg,this.width(),this.height());return svg;}},{key:'displayExtreme',value:function displayExtreme(){return displayExtremeAndOutlier(this,"Extreme");}},{key:'displayOutlier',value:function displayOutlier(){return displayExtremeAndOutlier(this,"Outlier");}// displayOutlier() {
//     let factType = 'Outlier';
//     let factdata = this.factdata();
//     let measure = this.measure(),
//         measuredField = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
//     let breakdown = this.breakdown();
//     let focus = this.focus();
//     // set the dimensions and margins of the graph
//     let chartSize = {
//         width: this.width(),
//         height: this.height()
//     };
//     let { tickStrokeWidth, tickFontSize, margin, hightLightFontSize, strokeWidth } = getSizeBySize(chartSize, this.size()),
//         width = chartSize.width,
//         height = chartSize.height;
//     let svg = d3.select(this.container())
//         .append("svg")
//         .attr("class", "svg")
//         .attr("width", chartSize.width)
//         .attr("height", chartSize.height)
//         .append("g")
//         .attr("display", "block")
//         .attr("class", "chartG");
//     if (this.style() === Style.COMICS) width = 0.8 * width;
//     if (this.breakdown().length > 1 || this.measure().length > 1) {
//         return
//     }
//     // if breakdown is temporal, order factData
//     if (breakdown[0] && breakdown[0].type === 'temporal') {
//         factdata = factdata.sort(sortByDateAscending(breakdown))
//     }
//     let data = factdata;
//     let sumValue = 0
//     data.forEach((d) =>{
//         sumValue += d[measuredField]
//     })
//     let avgValue = sumValue / data.length;
//     let contentG = svg.append("g").attr('class', 'content');
//     let seriesData;
//     let maxYValue = getMaxYValue(factdata, measure);
//     data.map(data => {
//         data.maxValue = (maxYValue - data[measuredField]);
//         return data;
//     })
//     seriesData = d3.stack()
//         .keys([measuredField, "maxValue"])
//         (data);
//     seriesData = seriesData.slice(0, 10);
//     /***(1) append xAxis**/
//     let starX = margin.left,
//         endX = width - margin.right,
//         xAxisPos = height;//inital 
//     let xDomain = data.map(function (d) { return d[breakdown[0].field]; });
//     initXAxisStyle(starX, endX, xDomain, svg, xAxisPos, tickStrokeWidth, tickFontSize);
//     /***(2) check rotation before update **/
//     let x = d3.scaleBand()
//         .domain(xDomain)
//         .range([starX, endX])
//         .padding(0.5),
//         xAxis = svg.select(".xAxis");
//     let hasOneValue = true;
//     checkAndRotate(xAxis, x, hasOneValue);
//     checkMaxAxisHeight(x, this.height(), tickFontSize, svg);
//     //add style
//     xAxis.selectAll('.tick text')
//         .attr('dy', '0.7em')
//         .attr('font-family', d => {
//             if (d === focus[0].value) {
//                 return TEXTFONT;
//             }
//             return NUMFONT;
//         })
//         .attr('font-size', hightLightFontSize)
//         .attr("display", d => {
//             if (d === focus[0].value) {
//                 return "block";
//             }
//             return "none";
//         })
//         .attr('fill', d => {
//             if (d === focus[0].value)
//                 return Color.ANNOTATION
//         });
//     xAxis.selectAll('.tick line')
//         .attr("display", d => {
//             if (d === focus[0].value) {
//                 return "block";
//             }
//             return "none";
//         });
//     /***(3) update y**/
//     let startY = height,
//         endY = 0; //inital
//     let measuredAxisHeight = xAxis.node().getBBox().height + margin.bottom / 2;
//     endY = measuredAxisHeight + margin.top * 3;//y根据 x轴文字的高度动态缩减 //3倍中，有一部分是tooltip的高度
//     let maxY = d3.max(data, d => d[measuredField]);
//     /***(4) update chart**/
//     xAxisPos = measuredAxisHeight;
//     // console.log("向上方移动图表", xAxisPos)
//     svg.node().setAttribute("transform", `translate(0,-${xAxisPos})`); //向上方移动图表 
//     let y = d3.scaleLinear().nice()
//         .range([startY, endY])
//         .domain([0, maxY])
//         .clamp(true);
//     this._y = y;
//     // append the rectangles for the bar chart
//     contentG
//         .append("g")
//         .datum(seriesData[0])
//         .attr("class", "barSeries")
//         .selectAll("bars")
//         .data(d => d)
//         .enter()
//         .append("rect")
//         .attr("class", "bars")
//         // .attr("fill", (d, i) => {
//         //     if (d.data[focus[0].field] === focus[0].value) {
//         //         return Color.HIGHLIGHT;
//         //     }
//         //     return Color.DEFAULT;
//         // })
//         .attr("fill", Color.DEFAULT)
//         .attr("opacity", (d, i) => {
//             if (d.data[focus[0].field] === focus[0].value) {
//                 return 1;
//             }
//             return 0.2;
//         })
//         .attr("x", (d, i) => x(d.data[breakdown[0].field]))
//         .attr("y", d => y(d[1]))
//         .attr("height", d => y(d[0]) - y(d[1]) > 0 ? y(d[0]) - y(d[1]) : 0)
//         .attr("width", x.bandwidth());
//     //tool tip
//     // let focusValueArray = factdata.filter(d => {
//     //     return d[focus[0].field] === focus[0].value
//     // });
//     // let focusData = focusValueArray[0];
//     // let toolTipX = x(focus[0].value) + x.bandwidth() / 2,//箭头中心所在x的位置
//     //     toolTipY = y(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) - 40 * chartSize.height / 640, //箭头中心所在y的位置
//     //     toolTipValue = formatNumber(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]);
//     // generateToolTip(toolTipX, toolTipY, toolTipValue, contentG, chartSize, annotationSize * 1.5);
//     // svg.selectAll(".tooltip").attr("font-weight", 500)
//     // contentG.append("text")
//     //     .attr("x", toolTipX)
//     //     .attr("y", toolTipY)
//     //     .attr('font-size', hightLightFontSize)
//     //     .attr('font-family', NUMFONT)
//     //     .attr('fill', Color.HIGHLIGHT)
//     //     .attr('text-anchor', 'middle')
//     //     .text(toolTipValue);
//     /*  regression line for bar */
//     // let ret = getLeastSquares(factdata.map(d => x((d[breakdown[0].field]))),
//     //     factdata.map(d => y(d[measuredField])));
//     // let x1 = 0 + margin.left,
//     //     x2 = width - margin.right;
//     // //regression in range, can not out of content
//     // let x_ymin = (height - ret.b) / ret.m,
//     //     x_ymax = (0 - ret.b) / ret.m;
//     // if (x_ymin > x_ymax) {
//     //     const i = x_ymin;
//     //     x_ymin = x_ymax;
//     //     x_ymax = i;
//     // }
//     // x1 = x1 < x_ymin ? x_ymin : x1;
//     // x2 = x2 > x_ymax ? x_ymax : x2;
//     // if (ret.m === 0) x1 = 0;
//     // let y1 = ret.m * x1 + ret.b,
//     //     y2 = ret.m * x2 + ret.b;
//     // if (ret.m === -Infinity) {
//     //     x1 = x2;
//     //     y1 = 0;
//     //     y2 = height;
//     // }
//     let x1 = 0 + margin.left,
//         x2 = width - margin.right;
//     let y1 = y(avgValue),
//         y2 = y1
//     svg.append("g")
//         .attr("class", "trendlineLayer")
//         .selectAll(".trendline")
//         .data([seriesData[0]])
//         .enter()
//         .append("line")
//         .attr("class", d => "trendline " + d.key)
//         .attr("x1", x1)
//         .attr("x2", x2)
//         .attr("y1", y1)
//         .attr("y2", y2)
//         .attr("stroke", Color.DASHLINE)
//         .attr("stroke-width", strokeWidth)
//         .attr("stroke-dasharray", `${strokeWidth * 2}, ${strokeWidth}`);
//     let bars = svg.selectAll(".barSeries").selectAll(".bars");
//     let barsFocus = bars.filter(function (d, i) {
//         return d.data[focus[0].field] === focus[0].value
//     })
//     // let barHeight = barsFocus.node().getAttribute('height')
//     let barWidth = barsFocus.node().getAttribute('width')
//     // let barX = barsFocus.node().getAttribute('x')
//     let arrowLayer = svg.append('g').attr("class", 'arrowLayer')
//     let focusValueArray = factdata.filter(d => {
//         return d[focus[0].field] === focus[0].value
//     });
//     let focusData = focusValueArray[0];
//     let toolTipX = x(focus[0].value) + x.bandwidth() / 2,//箭头中心所在x的位置
//         toolTipY = y(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) - 30 * chartSize.height / 640; //箭头中心所在y的位置
//     // let arrowTriangle = 
//     arrowLayer.append("path")
//         .attr("class", "triangle")
//         .attr("transform", "translate(" + toolTipX + "," + (toolTipY) + ")rotate(180)")
//         .attr("d", d3.symbol().type(d3.symbolTriangle).size(barWidth * 30))
//         .attr("fill", Color.ANNOTATION);
//     // let arrowRect = 
//     arrowLayer
//         .append('rect')
//         .attr("class", "arrowRect")
//         .attr("width", barWidth)
//         .attr("height", 45)
//         .attr("fill", Color.ANNOTATION)
//         .attr("x", toolTipX - barWidth / 2)
//         .attr("y", toolTipY - 45)
//     if (this.style() === Style.COMICS) {
//         if (factType === "Outlier") {
//             let metaphorWidth = width * 0.24,
//                 metaphorHeight = 1.43 * metaphorWidth;
//             let metaphor = svg.append("image")
//                 .attr('xlink:href', metaphor17);
//             if (this.size() === Size.WIDE) {
//                 metaphorWidth = width * 0.20;
//                 metaphorHeight = 1.43 * metaphorWidth;
//             } else if (this.size() === Size.MIDDLE) {
//                 metaphorWidth = width * 0.22;
//                 metaphorHeight = 1.43 * metaphorWidth;
//             }
//             metaphor.attr("width", metaphorWidth)
//                 .attr("height", metaphorHeight)
//                 .attr("x", width * 0.92)
//                 .attr("y", height - metaphorHeight * 0.96);
//         } else if (factType === "Extreme") {
//             let metaphorWidth = width * 0.24,
//                 metaphorHeight = 1.34 * metaphorWidth;
//             let metaphor = svg.append("image")
//                 .attr('xlink:href', metaphor18);
//             if (this.size() === Size.WIDE) {
//                 metaphorWidth = width * 0.20;
//                 metaphorHeight = 1.34 * metaphorWidth;
//             } else if (this.size() === Size.MIDDLE) {
//                 metaphorWidth = width * 0.22;
//                 metaphorHeight = 1.34 * metaphorWidth;
//             }
//             metaphor.attr("width", metaphorWidth)
//                 .attr("height", metaphorHeight)
//                 .attr("x", width * 0.92)
//                 .attr("y", height - metaphorHeight * 0.96);
//         }
//         //center居中
//         svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
//     }
//     //finally update chart horizental cental
//     updateChartCenter(svg, this.width(), this.height());
//     return svg;
// }
},{key:'displayValue',value:function displayValue(){var factdata=this.factdata();var measure=this.measure();var subspace=this.subspace();// set the dimensions and margins of the graph
var chartSize={width:this.width(),height:this.height()};var _getSizeBySize8=getSizeBySize(chartSize,this.size()),tickStrokeWidth=_getSizeBySize8.tickStrokeWidth,tickFontSize=_getSizeBySize8.tickFontSize,margin=_getSizeBySize8.margin,hightLightFontSize=_getSizeBySize8.hightLightFontSize,width=chartSize.width,height=chartSize.height;var svg=d3.select(this.container()).append("svg").attr("class","svg").attr("width",chartSize.width).attr("height",chartSize.height).append("g").attr("display","block").attr("class","chartG");if(this.measure().length>1){return;}var barValue=void 0;if(subspace.length===0){barValue=d3.sum(factdata,function(d){return d[measure[0].aggregate==='count'?"COUNT":measure[0].field];});}else{barValue=factdata[0][measure[0].aggregate==='count'?"COUNT":measure[0].field];}/***(1) append xAxis**/var xField=subspace.length===0?"":subspace[0].value;var starX=margin.left,endX=this.width()-margin.right,xAxisPos=height;//inital 
var xDomain=[xField];initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(2) check rotation before update **/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.8),xAxis=svg.select(".xAxis");checkAndRotate(xAxis,x);checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//add style
xAxis.selectAll('.tick text').attr('dy','0.7em').attr('font-family',TEXTFONT).attr('font-size',hightLightFontSize).attr('fill',_color2.default.HIGHLIGHT);/***(3) update y**/var startY=height,endY=0;//inital
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top*2;//y根据 x轴文字的高度动态缩减
/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
// append the rectangles for the bar chart       
var valueHeight=margin.top;var initBarHeght=startY-endY-valueHeight;var barHeght=initBarHeght;if(measure.length){if(measure[0].max!==undefined&&measure[0].min!==undefined&&measure[0].max>measure[0].min){if(barValue>=measure[0].min&&barValue<=measure[0].max){var scaleRatio=(barValue-measure[0].min)/(measure[0].max-measure[0].min);barHeght=(startY-endY-valueHeight)*scaleRatio;}}}svg.append("rect").lower().attr("class","bar").attr("fill",_color2.default.DEFAULT).attr("x",(width-x.bandwidth())/2).attr("y",height-barHeght).attr("height",barHeght).attr("width",x.bandwidth());//tool tip
var toolTipX=width/2,toolTipY=height-initBarHeght,toolTipValue=(0,_format2.default)(barValue);svg.append("text").attr("class","tooltip").attr("x",toolTipX).attr("y",toolTipY-valueHeight).attr('font-size',hightLightFontSize).attr('font-family',TEXTFONT).attr('fill',_color2.default.DEFAULT).attr('text-anchor','middle').text(toolTipValue);svg.append("text").attr("class","measureTooltip").attr("x",toolTipX).attr("y",toolTipY-valueHeight*2).attr('font-size',hightLightFontSize).attr('font-family',TEXTFONT).attr('fill',_color2.default.HIGHLIGHT).attr('text-anchor','middle').text(measure[0].field);if(subspace.length===0){svg.selectAll('.tick').selectAll("line").attr("opacity",0);}if(this.style()===_style2.default.COMICS){var metaphorWidth=width*0.24,metaphorHeight=1.18*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor13.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.20;metaphorHeight=1.18*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE||this.size()===_size2.default.SMALL){metaphorWidth=width*0.25;metaphorHeight=1.18*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",width*0.9-metaphorWidth).attr("y",height-metaphorHeight*1);}if(this.style()===_style2.default.PICTOGRAPH){var pictype=measure[0].pictype;/*------------------通过名称找寻icon----------------------------*/svg.append("defs").append("g").attr("id",'pictypevv'+pictype).append("path").attr("d",_pictogram2.default[pictype]);var typesizex1=svg.select('#pictypevv'+pictype).node().getBBox().width;// let typesizey1=svg.select(`#pictype${pictype}`).node().getBBox().height;  
var typex=svg.select('#pictypevv'+pictype).node().getBBox().x;var typey=svg.select('#pictypevv'+pictype).node().getBBox().y;var scale=x.bandwidth()/typesizex1;svg.append("defs").append("g").attr("id","pictypevv").append("path").attr("d",_pictogram2.default[pictype]).attr("transform",function(){return'scale('+scale+')';});//let typesizex=svg.select(`#pictype1`).node().getBBox().width;
var typesizey=svg.select('#pictypevv').node().getBBox().height;svg.append("g").append("use").attr("xlink:href","#pictypevv").attr("id","icontype").attr("x",(width-x.bandwidth())/2-Math.abs(typex*scale)).attr("y",height-barHeght-Math.abs(typey*scale)-typesizey).attr("fill","#96A7CE");svg.select(".tooltip").remove();svg.select(".measureTooltip").remove();svg.append("text").attr("class","tooltip1").attr("x",toolTipX).attr("y",toolTipY-typesizey-valueHeight).attr('font-size',hightLightFontSize).attr('font-family','RobotoMono-SemiBold').attr('fill',_color2.default.DEFAULT).attr('text-anchor','middle').text(toolTipValue);svg.append("text").attr("class","measureTooltip1").attr("x",toolTipX).attr("y",toolTipY-valueHeight*2-typesizey).attr('font-size',hightLightFontSize).attr('font-family','RobotoMono-SemiBold').attr('fill',_color2.default.HIGHLIGHT).attr('text-anchor','middle').text(measure[0].field);var cardWidth=this.width();var cardHeight=this.height();var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}//finally update chart horizental cental
if(this.style()!==_style2.default.PICTOGRAPH)(0,_updateChartCenter2.default)(svg,this.width(),this.height());return svg;}},{key:'displayDistribution',value:function displayDistribution(){var _this7=this;var factdata=this.factdata();var measure=this.measure(),measuredField=measure[0].aggregate==='count'?"COUNT":measure[0].field;var breakdown=this.breakdown();var hasSeries=false;if(breakdown[1]&&breakdown[1].field)hasSeries=true;// set the dimensions and margins of the graph
var chartSize={width:this.width(),height:this.height()};var _getSizeBySize9=getSizeBySize(chartSize,this.size()),tickFontSize=_getSizeBySize9.tickFontSize,tickStrokeWidth=_getSizeBySize9.tickStrokeWidth,annotationSize=_getSizeBySize9.annotationSize,margin=_getSizeBySize9.margin,width=chartSize.width,height=chartSize.height;var svg=d3.select(this.container()).append("svg").attr("width",chartSize.width).attr("height",chartSize.height).append("g").attr("display","block").attr("class","chartG");if(this.style()===_style2.default.COMICS)width=this.size()===_size2.default.LARGE&&hasSeries?width:0.85*width;if(this.measure().length>1){// svg.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("fill", "none");
return;}var data=factdata;if(breakdown[0].type==='temporal'){data=data.sort(sortByDateAscending(breakdown));}var seriesData=void 0;var calculateData=void 0;var maxYValue=getMaxYValue(factdata,measure);if(hasSeries){calculateData=d3.nest().key(function(d){return d[breakdown[0].field];}).entries(data);var categories=Array.from(new Set(data.map(function(d){return d[breakdown[1].field];})));categories=categories.slice(0,10);var objList=new Array(calculateData.length);var _loop7=function _loop7(i){var obj={};calculateData[i].values.map(function(d,i){obj.x=d[breakdown[0].field];obj[d[breakdown[1].field]]=d[measure[0].aggregate==='count'?"COUNT":measure[0].field];return obj;});objList[i]=obj;};for(var i=0;i<calculateData.length;i++){_loop7(i);}// complete the missed data = 0
for(var k=0;k<calculateData.length;k++){for(var i=0;i<categories.length;i++){if(!objList[k].hasOwnProperty(categories[i])){objList[k][categories[i]]=0;}}}seriesData=d3.stack().keys(categories)(objList);}else{data.map(function(data){data.maxValue=maxYValue-data[measuredField];return data;});seriesData=d3.stack().keys([measuredField])(data);}seriesData=seriesData.slice(0,10);//console.log("seriesData",seriesData)
// append legend before chart
var measuredWidth=0;if(hasSeries){var rightLegendsW=margin.right,//inital
measuredHeight=0;var seriesName=d3.map(seriesData,function(d){return d.key;}).keys();svg.append("foreignObject").attr("x",width-margin.right).attr("y",height/2).attr("width",rightLegendsW).attr("height",height).attr("class","foreignObject").append("xhtml:div").attr("class","legends").style("display","flex").style("flex-direction","column").style("flex-wrap","wrap")// .style("align-content", "space-around")
// .style("height", height + "px")
.style("height","100%").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class","legend").style("line-height",1).style("margin-right",5*chartSize.width/640+"px").each(function(d,i){var legend=d3.select(this).append("svg");legend.append("rect").attr("fill",function(d){return _color2.default.CATEGORICAL[seriesName.indexOf(d)];}).attr("width",10*tickFontSize/12).attr('height',10*tickFontSize/12).attr("rx",1.5*chartSize.width/640).attr("ry",1.5*chartSize.width/640);legend.append("text").attr("fill",_color2.default.TEXT).attr("x",12*tickFontSize/12).text(d).attr("font-size",tickFontSize*0.8).attr("font-family",NUMFONT).attr("alignment-baseline","hanging");legend.attr("width",legend.node().getBBox().width);legend.attr("height",legend.node().getBBox().height);var selfWidth=legend.node().getAttribute("width"),selfHeight=legend.node().getAttribute("height");if(Number(selfWidth)>Number(measuredWidth)){measuredWidth=Number(selfWidth);}measuredHeight+=Number(selfHeight);});//update legend center
measuredWidth=measuredWidth+margin.right;var yPos=(chartSize.height-measuredHeight)/2;if(margin.right<measuredWidth){svg.select(".foreignObject").node().setAttribute("x",this.width()-measuredWidth-margin.right/2);}svg.select(".foreignObject").node().setAttribute("y",yPos);svg.select(".foreignObject").node().setAttribute("width",Number(measuredWidth));svg.select(".foreignObject").node().setAttribute("height",height);}/***(1) append yAxis  to measure the leftTick width **/var maxY=void 0;if(hasSeries){maxY=d3.max(seriesData[seriesData.length-1],function(d){return d[1];});}else{maxY=d3.max(data,function(d){return d[measuredField];});}var startY=height,endY=0;//inital
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);/***(2) append xAxis**/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;// console.log("measuredYFieldsWidth", measuredYFieldsWidth)
var starX=measuredYFieldsWidth,endX=width-measuredWidth-margin.right,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(3) check rotation before update y**/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");var unsupportedchartPrams={svg:svg,chartSize:chartSize,annotationSize:annotationSize,size:this.size()};var isShowSuggestion=this.showSuggestion();var result=checkXAxis(xAxis,x,breakdown[0].type,unsupportedchartPrams,isShowSuggestion);if(result==="unsupportedChart")return svg;checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//update y 
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top;//y根据 x轴文字的高度动态缩减
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);//更新endY
var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
this._y=y;// append the rectangles for the bar chart
if(hasSeries){svg.selectAll(".barSeries").data(seriesData).enter().append("g").attr("class","barSeries").attr("fill",function(d,i){return _color2.default.CATEGORICAL[i];}).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(calculateData[i].key);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}else{svg.append("g").lower().datum(seriesData[0]).attr("class","barSeries").attr("fill",_color2.default.DEFAULT).attr("opacity",0.5).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}//add distrubution line
if(hasSeries){}else{var offsetY=this.size()==='large'?5:2;//离x轴的距离
var trendLineG=d3.line().x(function(d){return x(d[breakdown[0].field])+x.bandwidth()/2;}).y(function(d){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field])+offsetY;}).curve(d3.curveCardinal.tension(0.5));var trendline=svg.append("g").attr("class","trendLine");trendline.append("path").attr("d",trendLineG(data)).attr("fill","none").attr('stroke-width',function(d){if(_this7.size()==='small')return 2;if(_this7.size()==='middle')return 2;if(_this7.size()==='wide')return 2;if(_this7.size()==='large')return 2.5;})// .attr('stroke-dasharray', '5,5')
.attr("stroke",'rgb(87,165,224,0.8)');}if(this.style()===_style2.default.COMICS){var metaphorWidth=width*0.22,metaphorHeight=1.12*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor15.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.18;metaphorHeight=1.12*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE||this.size()===_size2.default.SMALL){metaphorWidth=width*0.20;metaphorHeight=1.12*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",endX+metaphorWidth*0.05).attr("y",height-metaphorHeight*0.96);//center居中
svg.attr("transform","translate("+((this.width()-svg.node().getBBox().width)/2-svg.node().getBBox().x)+","+((this.height()-svg.node().getBBox().height)/2-svg.node().getBBox().y)+")");}if(this.style()===_style2.default.PICTOGRAPH){var _ret11=function(){//将名称存成数组  breakdown values
var pictypename=[];var pictype=[];if(hasSeries||breakdown[0].type==="temporal"||breakdown[0].type==="numerical")return{v:void 0};seriesData[0].forEach(function(ele,i){pictypename.push(ele.data[breakdown[0].field]);});pictypename.forEach(function(ele1){breakdown[0].values.forEach(function(ele,i){if(ele.attribute===ele1){pictype.push(ele.pictype);}});});/*------------------通过名称找寻icon----------------------------*/svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id",function(d){return'picvdis'+d;}).append("path").attr("d",function(d){return _pictogram2.default[d];});/*-----------------缩放icon---------------------------*/var scale=[];var typesizex1=[];var typesizey1=[];var typex1=[];var typey1=[];var _loop8=function _loop8(_i2){typesizex1.push(svg.select('#picvdis'+pictype[_i2]).node().getBBox().width);typesizey1.push(svg.select('#picvdis'+pictype[_i2]).node().getBBox().height);typex1.push(svg.select('#picvdis'+pictype[_i2]).node().getBBox().x);typey1.push(svg.select('#picvdis'+pictype[_i2]).node().getBBox().y);svg.select('#picvdis'+pictype[_i2]).attr("transform",function(){scale.push(x.bandwidth()/typesizex1[_i2]);return'scale('+scale[_i2]+')';});};for(var _i2=0;_i2<pictype.length;_i2++){_loop8(_i2);}var typesizex=[];var typesizey=[];var typex=[];var typey=[];for(var _i3=0;_i3<pictype.length;_i3++){typesizex.push(svg.select('#picvdis'+pictype[_i3]).node().getBBox().width);typesizey.push(svg.select('#picvdis'+pictype[_i3]).node().getBBox().height);typex.push(svg.select('#picvdis'+pictype[_i3]).node().getBBox().x);typey.push(svg.select('#picvdis'+pictype[_i3]).node().getBBox().y);}//添加icon
svg.append("g").selectAll("use").data(seriesData[0]).enter().append("use").attr("xlink:href",function(d,i){return'#picvdis'+pictype[i];}).attr("id",function(d,i){return'icon'+pictypename[i];}).attr("x",function(d,i){return x(d.data[breakdown[0].field])-Math.abs(typex[i]*scale[i]);}).attr("y",function(d,i){return y(d[1])-Math.abs(typey[i]*scale[i])-typesizey[i]*scale[i];})//.attr("fill",Color.DEFAULT)
.attr("fill","#96A7CE");var cardWidth=_this7.width();var cardHeight=_this7.height();var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}();if((typeof _ret11==='undefined'?'undefined':_typeof(_ret11))==="object")return _ret11.v;}//finally update chart horizental cental
if(this.style()!==_style2.default.PICTOGRAPH)(0,_updateChartCenter2.default)(svg,this.width(),this.height());return svg;}},{key:'displayTrend',value:function displayTrend(){var _this8=this;var factdata=this.factdata();var measure=this.measure(),measuredField=measure[0].aggregate==='count'?"COUNT":measure[0].field;var breakdown=this.breakdown();var hasSeries=false;if(breakdown[1]&&breakdown[1].field)hasSeries=true;// set the dimensions and margins of the graph
var chartSize={width:this.width(),height:this.height()};var _getSizeBySize10=getSizeBySize(chartSize,this.size(),hasSeries),tickFontSize=_getSizeBySize10.tickFontSize,tickStrokeWidth=_getSizeBySize10.tickStrokeWidth,annotationSize=_getSizeBySize10.annotationSize,margin=_getSizeBySize10.margin,strokeWidth=_getSizeBySize10.strokeWidth;var width=chartSize.width,height=chartSize.height;var svg=d3.select(this.container()).append("svg").attr("class","svg").attr("display","block").attr("width",width).attr("height",height).append("g").attr("display","block").attr("class","chartG");if(this.measure().length>1){return;}var data=factdata;if(breakdown[0].type==='temporal'){data=data.sort(sortByDateAscending(breakdown));}var seriesData=void 0;var calculateData=void 0;var maxYValue=getMaxYValue(factdata,measure);if(hasSeries){calculateData=d3.nest().key(function(d){return d[breakdown[0].field];}).entries(data);var categories=Array.from(new Set(data.map(function(d){return d[breakdown[1].field];})));categories=categories.slice(0,10);var objList=new Array(calculateData.length);var _loop9=function _loop9(i){var obj={};calculateData[i].values.map(function(d,i){obj.x=d[breakdown[0].field];obj[d[breakdown[1].field]]=d[measuredField];return obj;});objList[i]=obj;};for(var i=0;i<calculateData.length;i++){_loop9(i);}// complete the missed data = 0
for(var k=0;k<calculateData.length;k++){for(var i=0;i<categories.length;i++){if(!objList[k].hasOwnProperty(categories[i])){objList[k][categories[i]]=0;}}}seriesData=d3.stack().keys(categories)(objList);}else{data.map(function(data){data.maxValue=maxYValue-data[measuredField];return data;});seriesData=d3.stack().keys([measuredField])(data);}seriesData=seriesData.slice(0,10);if(this.style()===_style2.default.COMICS){if(hasSeries){width=this.size()===_size2.default.LARGE&&hasSeries?width:0.85*width;}else if(seriesData[0].length>7)width*=0.85;else if(this.size()===_size2.default.WIDE){height*=0.85;}else if(this.size()!==_size2.default.LARGE){height*=0.9;}}var contentG=svg.append("g");// append legend before chart 
var measuredWidth=0;if(hasSeries){var rightLegendsW=margin.right,//inital
measuredHeight=0;var seriesName=d3.map(seriesData,function(d){return d.key;}).keys();svg.append("foreignObject").attr("x",chartSize.width-margin.right).attr("y",height/2).attr("width",rightLegendsW).attr("height",height).attr("class","foreignObject").append("xhtml:div").attr("class","legends").style("display","flex").style("flex-direction","column")// .style("flex-wrap", "wrap")
// .style("align-content", "space-around")
// .style("height", height + "px")
.style("height","100%").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class","legend").style("line-height",1).style("margin-right",5*chartSize.width/640+"px").each(function(d,i){var legend=d3.select(this).append("svg");legend.append("rect").attr("fill",function(d){return _color2.default.CATEGORICAL[seriesName.indexOf(d)];}).attr("width",10*tickFontSize/12).attr('height',10*tickFontSize/12).attr("rx",1.5*chartSize.width/640).attr("ry",1.5*chartSize.width/640);legend.append("text").attr("fill",_color2.default.TEXT).attr("x",12*tickFontSize/12).text(d).attr("font-size",tickFontSize*0.8).attr("font-family",NUMFONT).attr("alignment-baseline","hanging");legend.attr("width",legend.node().getBBox().width);legend.attr("height",legend.node().getBBox().height);var selfWidth=legend.node().getAttribute("width"),selfHeight=legend.node().getAttribute("height");if(Number(selfWidth)>Number(measuredWidth)){measuredWidth=Number(selfWidth);}measuredHeight+=Number(selfHeight);});//update legend center
measuredWidth=measuredWidth+margin.right;var yPos=(chartSize.height-measuredHeight)/2;if(margin.right<measuredWidth){svg.select(".foreignObject").node().setAttribute("x",this.width()-measuredWidth-margin.right/2);}svg.select(".foreignObject").node().setAttribute("y",yPos);svg.select(".foreignObject").node().setAttribute("width",Number(measuredWidth));svg.select(".foreignObject").node().setAttribute("height",height);}/***(1) append yAxis  to measure the leftTick width **/var maxY=void 0;if(hasSeries){maxY=d3.max(seriesData[seriesData.length-1],function(d){return d[1];});}else{maxY=d3.max(data,function(d){return d[measuredField];});}var startY=height,endY=0;//inital
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);/***(2) append xAxis**/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;// console.log("measuredYFieldsWidth", measuredYFieldsWidth)
var starX=measuredYFieldsWidth,endX=width-measuredWidth-margin.right,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(3) check rotation before update y**/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");var unsupportedchartPrams={svg:svg,chartSize:chartSize,annotationSize:annotationSize,size:this.size()};var isShowSuggestion=this.showSuggestion();var result=checkXAxis(xAxis,x,breakdown[0].type,unsupportedchartPrams,isShowSuggestion);if(result==="unsupportedChart")return svg;checkMaxAxisHeight(x,this.height(),tickFontSize,svg);//update y 
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top;//y根据 x轴文字的高度动态缩减
initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin);//更新endY
var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
this._y=y;// append the rectangles for the bar chart
if(hasSeries){contentG.selectAll(".barSeries").data(seriesData).enter().append("g").attr("class","barSeries").attr("fill",function(d,i){return _color2.default.CATEGORICAL[i];}).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(calculateData[i].key);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}else{contentG// .selectAll(".barSeries")
//     .data()
//     .enter()
.append("g").datum(seriesData[0]).attr("class","barSeries").attr("transform",'translate(0,0)').attr("fill",_color2.default.DEFAULT)//(d, i) => (i === seriesData.length - 1) ? Color.BACKGROUND : )
.attr("opacity",0.5).selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());}//trend line
if(hasSeries){// for (let i = 0; i < seriesData.length; i++) {
//     let trendLineG = d3.line()
//         .x(function (d) { return x(d.data.x) + x.bandwidth() / 2; })
//         .y(function (d) { return y(d[1]) });
//     contentG.append("g").attr("class", "trendLine").append("path")
//         .attr("d", trendLineG(seriesData[i]))
//         .attr("fill", "none")
//         .attr('stroke-width', d => {
//             if (this.size() === 'small') return 1;
//             if (this.size() === 'middle') return 2;
//             if (this.size() === 'wide') return 3;
//             if (this.size() === 'large') return 4;
//         })
//         .attr('stroke-dasharray', '5,5')
//         .attr("stroke", Color.HIGHLIGHT);
// }
}else{var getTanDeg=function getTanDeg(tan){var result=Math.atan(tan)/(Math.PI/180);result=Math.round(result);return result;};var offsetY=this.size()==='large'?5:2;//离x轴的距离
var trendLineG=d3.line().x(function(d){return x(d[breakdown[0].field])+x.bandwidth()/2;}).y(function(d){return y(d[measure[0].aggregate==="count"?"COUNT":measure[0].field])-offsetY;});var trendline=contentG.append("g").attr("class","trendLine");trendline.append("path").attr("d",trendLineG(data)).attr("fill","none").attr('stroke-width',function(d){if(_this8.size()==='small')return 2;if(_this8.size()==='middle')return 3;if(_this8.size()==='wide')return 4;if(_this8.size()==='large')return 5;}).attr('stroke-dasharray','5,5').attr("stroke",_color2.default.HIGHLIGHT);var finalPosition=trendline.select("path").attr("d").split("L").slice(-1)[0];var secondPosition=trendline.select("path").attr("d").split("L").slice(-2)[0];var f_x=finalPosition.split(",")[0],f_y=height-finalPosition.split(",")[1],s_x=secondPosition.split(",")[0],s_y=height-secondPosition.split(",")[1];var slope=(f_y-s_y)/(f_x-s_x);var deg=void 0;if(getTanDeg(slope)<0){deg=Math.abs(getTanDeg(slope))+90;}else{deg=-getTanDeg(slope)+90;}trendline.append("path").attr("class","triangle").attr("transform","translate("+finalPosition+")rotate("+deg+")").attr("d",d3.symbol().type(d3.symbolTriangle).size(0.16*height)).attr("fill",_color2.default.HIGHLIGHT);}if(this.style()===_style2.default.COMICS){if(hasSeries){var metaphorWidth=width*0.22,metaphorHeight=1.25*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor9.default);if(this.size()===_size2.default.WIDE){metaphorWidth=width*0.18;metaphorHeight=1.25*metaphorWidth;}else if(this.size()===_size2.default.MIDDLE){metaphorWidth=width*0.2;metaphorHeight=1.25*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",endX+metaphorWidth*0.05).attr("y",height-metaphorHeight*0.96);}else{var filterPoints=seriesData[0];if(filterPoints.length>7){//too much point
//draw dash line
var x0=x(filterPoints[0].data[breakdown[0].field])+x.bandwidth()/2,x1=x(filterPoints.slice(-1)[0].data[breakdown[0].field])+x.bandwidth()/2,y0=y(filterPoints[0].data[measuredField]),y1=y(filterPoints.slice(-1)[0].data[measuredField]),x2=x1+width*0.1,y2=(x2-x1)*(y1-y0)/(x1-x0)+y1;var line_m=svg.append('line').attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y2).attr("stroke",_color2.default.DASHLINE).attr("stroke-width",strokeWidth).attr("stroke-dasharray",strokeWidth*2+', '+strokeWidth);svg.node().prepend(line_m.node());var _metaphorWidth2=width*0.22,_metaphorHeight2=1.24*_metaphorWidth2;var _metaphor2=svg.append("image").attr('xlink:href',_metaphor11.default);if(this.size()===_size2.default.WIDE){_metaphorWidth2=width*0.18;_metaphorHeight2=1.24*_metaphorWidth2;}else if(this.size()===_size2.default.MIDDLE||this.size()===_size2.default.SMALL){_metaphorWidth2=width*0.2;_metaphorHeight2=1.24*_metaphorWidth2;}_metaphor2.attr("width",_metaphorWidth2).attr("height",_metaphorHeight2).attr("x",x2-_metaphorWidth2*0.06).attr("y",y2-_metaphorHeight2*0.06);}else{var metaphorWidth7=(endX-starX)/(filterPoints.length-1)*0.6,metaphorWidth8=metaphorWidth7/1.14;var metaphorHeight7=metaphorWidth7*0.95;var metaphorHeight8=metaphorWidth8*1.2;var _offsetY2=this.size()==='large'?5:2;//离x轴的距离
for(var _i4=1;_i4<filterPoints.length;_i4++){var middleX=(x(filterPoints[_i4].data[breakdown[0].field])+x(filterPoints[_i4-1].data[breakdown[0].field]))/2+x.bandwidth()/2;var middleY=(y(filterPoints[_i4].data[measuredField])+y(filterPoints[_i4-1].data[measuredField]))/2-_offsetY2;if(filterPoints[_i4].data[measuredField]-filterPoints[_i4-1].data[measuredField]>0){//up
svg.append("image").attr('xlink:href',_metaphor7.default).attr("width",metaphorWidth8).attr("height",metaphorHeight8).attr("x",middleX-metaphorWidth8*0.7).attr("y",middleY-metaphorHeight8*0.96);}else{//down
svg.append("image").attr('xlink:href',_metaphor5.default).attr("width",metaphorWidth7).attr("height",metaphorHeight7).attr("x",middleX-metaphorWidth7*0.5).attr("y",middleY-metaphorHeight7*1);}}}//center居中
svg.attr("transform","translate("+((this.width()-svg.node().getBBox().width)/2-svg.node().getBBox().x)+","+((this.height()-svg.node().getBBox().height)/2-svg.node().getBBox().y)+")");}}if(this.style()===_style2.default.PICTOGRAPH&&!hasSeries){var pictype=measure[0].pictype;/*------------------通过名称找寻icon----------------------------*/svg.append("defs").append("g").attr("id",'pictypevt'+pictype).append("path").attr("d",_pictogram2.default[pictype]);var typesizex1=svg.select('#pictypevt'+pictype).node().getBBox().width;// let typesizey1=svg.select(`#pictype${pictype}`).node().getBBox().height;  
var typex=svg.select('#pictypevt'+pictype).node().getBBox().x;var typey=svg.select('#pictypevt'+pictype).node().getBBox().y;var scale=x.bandwidth()/typesizex1;svg.append("defs").append("g").attr("id","pictypevt").append("path").attr("d",_pictogram2.default[pictype]).attr("transform",function(){return'scale('+scale+')';});//let typesizex=svg.select(`#pictype1`).node().getBBox().width;
var typesizey=svg.select('#pictypevt').node().getBBox().height;svg.append("g").datum(seriesData[0]).attr("class","iconSeries").selectAll("use").data(function(d){return d;}).enter().append("use").attr("xlink:href","#pictypevt").attr("id",function(d,i){return'icontype'+i;}).attr("x",function(d,i){return x(d.data[breakdown[0].field])-Math.abs(typex*scale);}).attr("y",function(d){return y(d[1])-Math.abs(typey*scale)-typesizey;}).attr("fill","#96A7CE");//.attr("fill-opacity", 0.8)
var cardWidth=this.width();var cardHeight=this.height();var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}//finally update chart horizental cental
if(this.style()!==_style2.default.PICTOGRAPH)(0,_updateChartCenter2.default)(svg,this.width(),this.height());return svg;}}]);return VerticalBarChart;}(_chart2.default);var displayExtremeAndOutlier=function displayExtremeAndOutlier(_this,factType){var factdata=_this.factdata();var measure=_this.measure(),measuredField=measure[0].aggregate==='count'?"COUNT":measure[0].field;var breakdown=_this.breakdown();var focus=_this.focus();// set the dimensions and margins of the graph
var chartSize={width:_this.width(),height:_this.height()};var _getSizeBySize11=getSizeBySize(chartSize,_this.size()),tickStrokeWidth=_getSizeBySize11.tickStrokeWidth,tickFontSize=_getSizeBySize11.tickFontSize,margin=_getSizeBySize11.margin,hightLightFontSize=_getSizeBySize11.hightLightFontSize,annotationSize=_getSizeBySize11.annotationSize,width=chartSize.width,height=chartSize.height;var svg=d3.select(_this.container()).append("svg").attr("class","svg").attr("width",chartSize.width).attr("height",chartSize.height).append("g").attr("display","block").attr("class","chartG");if(_this.style()===_style2.default.COMICS)width=0.8*width;if(_this.breakdown().length>1||_this.measure().length>1){return;}// if breakdown is temporal, order factData
if(breakdown[0]&&breakdown[0].type==='temporal'){factdata=factdata.sort(sortByDateAscending(breakdown));}var data=factdata;var contentG=svg.append("g");var seriesData=void 0;var maxYValue=getMaxYValue(factdata,measure);data.map(function(data){data.maxValue=maxYValue-data[measuredField];return data;});seriesData=d3.stack().keys([measuredField,"maxValue"])(data);seriesData=seriesData.slice(0,10);/***(1) append xAxis**/var starX=margin.left,endX=width-margin.right,xAxisPos=height;//inital 
var xDomain=data.map(function(d){return d[breakdown[0].field];});initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize);/***(2) check rotation before update **/var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5),xAxis=svg.select(".xAxis");var hasOneValue=true;checkAndRotate(xAxis,x,hasOneValue);checkMaxAxisHeight(x,_this.height(),tickFontSize,svg);//add style
xAxis.selectAll('.tick text').attr('dy','0.7em').attr('font-family',function(d){if(d===focus[0].value){return TEXTFONT;}return NUMFONT;}).attr('font-size',hightLightFontSize).attr("display",function(d){if(d===focus[0].value){return"block";}return"none";}).attr('fill',function(d){if(d===focus[0].value)return _color2.default.HIGHLIGHT;});xAxis.selectAll('.tick line').attr("display",function(d){if(d===focus[0].value){return"block";}return"none";});/***(3) update y**/var startY=height,endY=0;//inital
var measuredAxisHeight=xAxis.node().getBBox().height+margin.bottom/2;endY=measuredAxisHeight+margin.top*3;//y根据 x轴文字的高度动态缩减 //3倍中，有一部分是tooltip的高度
var maxY=d3.max(data,function(d){return d[measuredField];});/***(4) update chart**/xAxisPos=measuredAxisHeight;// console.log("向上方移动图表", xAxisPos)
svg.node().setAttribute("transform",'translate(0,-'+xAxisPos+')');//向上方移动图表 
var y=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);_this._y=y;// append the rectangles for the bar chart
contentG.append("g").datum(seriesData[0]).attr("class","barSeries").selectAll("bars").data(function(d){return d;}).enter().append("rect").attr("class","bars").attr("fill",function(d,i){if(d.data[focus[0].field]===focus[0].value){return _color2.default.HIGHLIGHT;}return _color2.default.DEFAULT;}).attr("x",function(d,i){return x(d.data[breakdown[0].field]);}).attr("y",function(d){return y(d[1]);}).attr("height",function(d){return y(d[0])-y(d[1])>0?y(d[0])-y(d[1]):0;}).attr("width",x.bandwidth());//tool tip
var focusValueArray=factdata.filter(function(d){return d[focus[0].field]===focus[0].value;});var focusData=focusValueArray[0];var toolTipX=x(focus[0].value)+x.bandwidth()/2,//箭头中心所在x的位置
toolTipY=y(focusData[measure[0].aggregate==="count"?"COUNT":measure[0].field])-40*chartSize.height/640,//箭头中心所在y的位置
toolTipValue=(0,_format2.default)(focusData[measure[0].aggregate==="count"?"COUNT":measure[0].field]);(0,_tooltip2.default)(toolTipX,toolTipY,toolTipValue,contentG,chartSize,annotationSize*1.5);svg.selectAll(".tooltip").attr("font-weight",500);// contentG.append("text")
//     .attr("x", toolTipX)
//     .attr("y", toolTipY)
//     .attr('font-size', hightLightFontSize)
//     .attr('font-family', NUMFONT)
//     .attr('fill', Color.HIGHLIGHT)
//     .attr('text-anchor', 'middle')
//     .text(toolTipValue);
if(_this.style()===_style2.default.COMICS){if(factType==="Outlier"){var metaphorWidth=width*0.24,metaphorHeight=1.43*metaphorWidth;var metaphor=svg.append("image").attr('xlink:href',_metaphor23.default);if(_this.size()===_size2.default.WIDE){metaphorWidth=width*0.20;metaphorHeight=1.43*metaphorWidth;}else if(_this.size()===_size2.default.MIDDLE){metaphorWidth=width*0.22;metaphorHeight=1.43*metaphorWidth;}metaphor.attr("width",metaphorWidth).attr("height",metaphorHeight).attr("x",width*0.92).attr("y",height-metaphorHeight*0.96);}else if(factType==="Extreme"){var _metaphorWidth3=width*0.24,_metaphorHeight3=1.34*_metaphorWidth3;var _metaphor3=svg.append("image").attr('xlink:href',_metaphor25.default);if(_this.size()===_size2.default.WIDE){_metaphorWidth3=width*0.20;_metaphorHeight3=1.34*_metaphorWidth3;}else if(_this.size()===_size2.default.MIDDLE){_metaphorWidth3=width*0.22;_metaphorHeight3=1.34*_metaphorWidth3;}_metaphor3.attr("width",_metaphorWidth3).attr("height",_metaphorHeight3).attr("x",width*0.92).attr("y",height-_metaphorHeight3*0.96);}//center居中
svg.attr("transform","translate("+((_this.width()-svg.node().getBBox().width)/2-svg.node().getBBox().x)+","+((_this.height()-svg.node().getBBox().height)/2-svg.node().getBBox().y)+")");}if(_this.style()===_style2.default.PICTOGRAPH){var pictype=measure[0].pictype;/*------------------通过名称找寻icon----------------------------*/if(factType==="Extreme"){svg.append("defs").append("g").attr("id",'pictypeve'+pictype).append("path").attr("d",_pictogram2.default[pictype]);var typesizex1=svg.select('#pictypeve'+pictype).node().getBBox().width;// let typesizey1=svg.select(`#pictype${pictype}`).node().getBBox().height;  
var typex=svg.select('#pictypeve'+pictype).node().getBBox().x;var typey=svg.select('#pictypeve'+pictype).node().getBBox().y;var scale=x.bandwidth()/typesizex1;svg.append("defs").append("g").attr("id","pictypeve").append("path").attr("d",_pictogram2.default[pictype]).attr("transform",function(){return'scale('+scale+')';});//let typesizex=svg.select(`#pictype1`).node().getBBox().width;
var typesizey=svg.select('#pictypeve').node().getBBox().height;svg.append("g").datum(seriesData[0]).attr("class","iconSeries").selectAll("use").data(function(d){return d;}).enter().append("use").attr("xlink:href","#pictypeve").attr("id","icontype").attr("x",x(focus[0].value)-Math.abs(typex*scale)).attr("y",y(focusData[measure[0].aggregate==="count"?"COUNT":measure[0].field])-Math.abs(typey*scale)-typesizey-2)//   .attr("fill","#96A7CE")
.attr("fill",_color2.default.HIGHLIGHT);toolTipY=y(focusData[measure[0].aggregate==="count"?"COUNT":measure[0].field])-30*chartSize.height/640-typesizey-2;svg.select('.tooltip').remove();(0,_tooltip2.default)(toolTipX,toolTipY,toolTipValue,contentG,chartSize,annotationSize*1.5);svg.selectAll(".tooltip").attr("font-weight",500);}if(factType==="Outlier"){svg.append("defs").append("g").attr("id",'pictypevo'+pictype).append("path").attr("d",_pictogram2.default[pictype]);var _typesizex=svg.select('#pictypevo'+pictype).node().getBBox().width;// let typesizey1=svg.select(`#pictype${pictype}`).node().getBBox().height;  
var _typex=svg.select('#pictypevo'+pictype).node().getBBox().x;var _typey=svg.select('#pictypevo'+pictype).node().getBBox().y;var _scale=x.bandwidth()/_typesizex;svg.append("defs").append("g").attr("id","pictypevo").append("path").attr("d",_pictogram2.default[pictype]).attr("transform",function(){return'scale('+_scale+')';});//let typesizex=svg.select(`#pictype1`).node().getBBox().width;
var _typesizey=svg.select('#pictypevo').node().getBBox().height;svg.append("g").datum(seriesData[0]).attr("class","iconSeries").selectAll("use").data(function(d){return d;}).enter().append("use").attr("xlink:href","#pictypevo").attr("id","icontype").attr("x",x(focus[0].value)-Math.abs(_typex*_scale)).attr("y",y(focusData[measure[0].aggregate==="count"?"COUNT":measure[0].field])-Math.abs(_typey*_scale)-_typesizey-2)//   .attr("fill","#96A7CE")
.attr("fill",_color2.default.HIGHLIGHT);toolTipY=y(focusData[measure[0].aggregate==="count"?"COUNT":measure[0].field])-30*chartSize.height/640-_typesizey-2;svg.select('.tooltip').remove();(0,_tooltip2.default)(toolTipX,toolTipY,toolTipValue,contentG,chartSize,annotationSize*1.5);svg.selectAll(".tooltip").attr("font-weight",500);}var cardWidth=_this.width();var cardHeight=_this.height();var a=svg.node().getBBox().width;var b=svg.node().getBBox().height;var c=svg.node().getBBox().x;var e=svg.node().getBBox().y;var transx=-c+cardWidth/2-a/2;var transy=-e+cardHeight/2-b/2;if((a>cardWidth||b>cardHeight)&&width/a<height/b){svg.attr("transform",'scale('+width/a+')  translate('+(cardWidth/(2*width/a)-(a/2+c))+','+(cardHeight/(2*width/a)-(b/2+e))+') ');}else if((a>cardWidth||b>cardHeight)&&height/b<=width/a){svg.attr("transform",'scale('+height/b+')  translate('+(cardWidth/(2*height/b)-(a/2+c))+','+(cardHeight/(2*height/b)-(b/2+e))+') ');}else{svg.attr("transform",'translate('+transx+' ,'+transy+') ');}}//finally update chart horizental cental
if(_this.style()!==_style2.default.PICTOGRAPH)(0,_updateChartCenter2.default)(svg,_this.width(),_this.height());return svg;};/******
 * 
 * 
 */var getMaxY=function getMaxY(maxYValue){if(maxYValue/1000000>=1){maxYValue=Math.ceil(maxYValue/1000000)*1000000;}else if(maxYValue/1000>=1){maxYValue=Math.ceil(maxYValue/1000)*1000;}else if(maxYValue/100>=1){// maxYValue = Math.ceil(maxYValue / 1000) * 1000;
}return maxYValue;};/***
 * 检查并且设置x轴label的高度不超过chart height的1/2
 */var checkMaxAxisHeight=function checkMaxAxisHeight(x,chartHeight,tickSize,svg){var xAxis=svg.select(".xAxis"),maxXAxisH=chartHeight/4;if(xAxis.node().getBBox().height>maxXAxisH){xAxis.selectAll('.tick text').call(function(g){changXFildStyle(g,x,maxXAxisH,tickSize,svg);});}};/** 
 * 对lable文字的在最大高度内显示,超出显示...
**/var changXFildStyle=function changXFildStyle(g,x,maxXAxisH,tickSize,svg){var gG=g._groups[0];for(var i=0;i<gG.length;++i){var selfWidth=gG[i].getBBox().width;if(selfWidth>maxXAxisH){var str=gG[i].innerHTML,displayStr='';for(var index=str.length-1;index>0;index--){var str1=str.substring(0,index);var str1Node=svg.append('g').append("text").attr("class",'virtumDom').attr('font-size',tickSize).attr('font-family','Arial-Bold').text(str1);if(str1Node.node().getBBox().width>maxXAxisH){//查找能放下的最小字符串长度
svg.select(".virtumDom").remove();continue;}svg.select(".virtumDom").remove();displayStr=str1;//console.log("最终可以显示的字符串是", str1)
break;}gG[i].innerHTML=displayStr+'...';}}};/***
 * 设置 xAxis样式并且更新位置
 */var initXAxisStyle=function initXAxisStyle(starX,endX,xDomain,svg,xAxisPos,tickStrokeWidth,tickFontSize){//console.log("initXAxisStyle", starX, endX)
var x=d3.scaleBand().domain(xDomain).range([starX,endX]).padding(0.5);// add the x Axis
//let xAxis = 
svg.append("g").attr("class",'xAxis').attr("transform",'translate(0,'+xAxisPos+')')//动态计算高度后平移会向上平移
.call(d3.axisBottom(x).tickSize(tickStrokeWidth*2).tickPadding(tickStrokeWidth*2)).call(function(g){//x Axis style
var xAxislineData=[[starX,0],[endX,0]];var newD=d3.line()(xAxislineData);//生成d
g.select('.domain').attr('d',newD).attr('stroke','black').attr("stroke-width",tickStrokeWidth);//tick style
g.selectAll('.tick line').attr('stroke','black').attr("stroke-width",tickStrokeWidth);g.selectAll('.tick text').attr('font-size',tickFontSize).attr('font-family',NUMFONT).attr('fill','black').attr('text-anchor','middle');});};/***
 * 设置 yAxis样式并且更新位置
 */var initYAixsStyle=function initYAixsStyle(startY,endY,maxY,svg,tickStrokeWidth,tickFontSize,margin){svg.selectAll(".yAxis").remove();var mockY=d3.scaleLinear().nice().range([startY,endY]).domain([0,maxY]).clamp(true);var ticks=6;//inital 为2的倍数
if(startY-endY<50){//50px 
ticks=4;//todo 动态计算
}svg.append("g").lower().attr('class','yAxis').call(d3.axisLeft(mockY).ticks(ticks).tickSize(tickStrokeWidth*2).tickPadding(tickStrokeWidth*2).tickFormat(function(d){if(d/1000000>=1){d=d/1000000+"M";}else if(d/1000>=1){d=d/1000+"K";}return d;})).call(function(g){var YAxislineData=[[0,startY],[0,endY],[-tickStrokeWidth*2,endY]];var newYD=d3.line()(YAxislineData);//生成d
g.select('.domain').attr("d",newYD).attr('stroke','black').attr("stroke-width",tickStrokeWidth);g.selectAll('.tick line').attr('stroke','black').attr("stroke-width",tickStrokeWidth);g.select('.tick line').remove();g.selectAll('.tick text').attr('font-size',tickFontSize).attr('font-family',NUMFONT).attr('fill','black').attr('text-anchor','end');});/*****the end*****/var measuredYFieldsWidth=svg.select(".yAxis").node().getBBox().width+margin.left;//平移y
svg.select(".yAxis").attr("transform",'translate('+measuredYFieldsWidth+',0)');};/***
 * 判断是否旋转,需要的话，处理
 * hasOneValue不需要旋转
 */var checkAndRotate=function checkAndRotate(xAxis,x){var hasOneValue=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var isRotate=false;xAxis.selectAll('.tick text').each(function(d,i){var text=d3.select(this).node();if(text.getBBox().width>x.step()){isRotate=true;}});if(!hasOneValue&&isRotate){xAxis.selectAll("text").attr("transform",'translate(-'+5+',0)rotate(-45)').attr("text-anchor","end");//旋转45度
}};/***
 * 判断是否旋转,缩略，还是显示unsupported chart
 */var checkXAxis=function checkXAxis(xAxis,x,xFiledType,unsupportedchartPrams,isShowSuggestion){//【1】检查是否有遮挡，如果遮挡则需要旋转45度
var isRotate=false;var svg=unsupportedchartPrams.svg,chartSize=unsupportedchartPrams.chartSize,annotationSize=unsupportedchartPrams.annotationSize,size=unsupportedchartPrams.size;xAxis.selectAll('.tick text').each(function(d,i){var text=d3.select(this).node();if(text.getBBox().width>x.step()){isRotate=true;}});var labelHeight=void 0;xAxis.select('.tick text').each(function(d,i){var text=d3.select(this).node();labelHeight=text.getBBox().height;});if(isRotate){xAxis.selectAll("text").attr("transform",'translate(-'+5+',0)rotate(-45)').attr("text-anchor","end");//旋转45度
var rotateAble=labelHeight<x.step()*1.5;// console.log("rotateAble", labelHeight, x.step() * 1.5)
// 【2】如果横的有遮挡并且是temporal数据类型，则摆回正的，缩略显示
if(!rotateAble){if(xFiledType==='temporal'){xAxis.selectAll(".xAxis text").attr("transform","").attr("text-anchor","middle");(0,_removeOverlapX2.default)(xAxis,x);}else{//【3】显示unsupportedChart 关闭
if(isShowSuggestion){svg.select(".chartG").remove();//清除画布
svg.select(".yAxis").remove();//清除画布 
svg.select(".xAxis").remove();//清除画布    
(0,_unsupportedchart2.default)(svg,chartSize,annotationSize,size);return"unsupportedChart";}}}}return"";};/*
*  y最大值向上取整 如y轴的最大数值为6，853，129； 要取到7，000，000
*/var getMaxYValue=function getMaxYValue(factdata,measure){var isProportion=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var maxYValue=d3.max(factdata,function(d){return d[measure[0].aggregate==='count'?"COUNT":measure[0].field];});if(isProportion){if(maxYValue/1000000>=1){maxYValue=Math.ceil(maxYValue/1000000)*1000000;}else if(maxYValue/1000>=1){maxYValue=Math.ceil(maxYValue/1000)*1000;}}return maxYValue;};/** 
 * tickFontSize 坐标轴刻度字号
 * annotationSize 标注字号
 * tickStrokeWidth 坐标轴刻度宽度
**/var getSizeBySize=function getSizeBySize(chartSize,size){var hasSeries=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var tickFontSize=void 0,tickStrokeWidth=void 0,annotationSize=void 0,hightLightFontSize=void 0,arrowWidth=void 0,strokeWidth=void 0;switch(size){case _size2.default.WIDE:tickFontSize=16;annotationSize=15;tickStrokeWidth=2;hightLightFontSize=26;arrowWidth=4;strokeWidth=3;break;case _size2.default.MIDDLE:tickFontSize=14;annotationSize=15;tickStrokeWidth=2;hightLightFontSize=20;arrowWidth=3;strokeWidth=3;break;case _size2.default.SMALL:tickFontSize=12;annotationSize=10;tickStrokeWidth=1.5;hightLightFontSize=16;arrowWidth=2;strokeWidth=2;break;case _size2.default.LARGE:default:tickFontSize=20;annotationSize=20;tickStrokeWidth=3;hightLightFontSize=40;arrowWidth=5;strokeWidth=3;break;}return{tickFontSize:tickFontSize,annotationSize:annotationSize,tickStrokeWidth:tickStrokeWidth,hightLightFontSize:hightLightFontSize,arrowWidth:arrowWidth,margin:{top:60*chartSize.height/640,left:50*chartSize.width/640,right:50*chartSize.width/640,bottom:60*chartSize.height/640//默认x轴的高度 
},strokeWidth:strokeWidth};};var countTicksBeforeIndex=function countTicksBeforeIndex(animation,index){var count=0;var visited=[];for(var key in animation){if(animation[key].index<index&&visited.indexOf(animation[key].index)===-1){count+=animation[key].duration;visited.push(animation[key].index);};}return count;};var sortByDateAscending=function sortByDateAscending(breakdown){// Dates will be cast to numbers automagically:
return function(a,b){return parseTime(a[breakdown[0].field])-parseTime(b[breakdown[0].field]);};};var parseTime=function parseTime(date){if(d3.timeParse("%Y-%m-%d")(date))return d3.timeParse("%Y-%m-%d")(date);else if(d3.timeParse("%Y/%m/%d")(date))return d3.timeParse("%Y/%m/%d")(date);else if(d3.timeParse("%Y-%m")(date))return d3.timeParse("%Y-%m")(date);else if(d3.timeParse("%Y/%m")(date))return d3.timeParse("%Y/%m")(date);else if(d3.timeParse("%Y")(date))return d3.timeParse("%Y")(date);else return date;};// const getLeastSquares = (X, Y) => {
//     let ret = {}
//     let sumX = 0
//     let sumY = 0
//     let sumXY = 0
//     let sumXSq = 0
//     let N = X.length
//     for (let i = 0; i < N; ++i) {
//         sumX += X[i]
//         sumY += Y[i]
//         sumXY += X[i] * Y[i]
//         sumXSq += X[i] * X[i]
//     }
//     ret.m = ((sumXY - sumX * sumY / N)) / (sumXSq - sumX * sumX / N)
//     ret.b = sumY / N - ret.m * sumX / N
//     return ret;
// }
exports.default=VerticalBarChart;