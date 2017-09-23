// tool
//tool 1 	
//得到一个element	
//         书写顺序  从左向右  tag_name_attr_(style||txt)    
function enode(str){
		str = str.replace(/cl=/,  "class=");
		str = str.replace(/sty=/, "style=");
		var arr = str.split(" "), tag = document.createElement(arr[0]);
        if(arr[0] == "script"){ tag.type = "text/javascript"; }			
		if(arr.length == 1){ return tag; }
		// element && attr
		else{
			arr.splice(0,1);
			// merge_css  class && style && txt 
			a_attrs(tag, merge_css(arr));
			return tag;
		}	
}
// TOOL 	
//合并 element 属性 css 	   				    	 	  
//得到 Array 
function merge_css(arr){								  
	if(arr.length >= 2){
		var arr1 = merge_pieces(arr,  "txt");
		var arr2 = merge_pieces(arr1, "class");
		var arr3 = merge_pieces(arr2, "style"); 
		return arr3;        
	}
	return arr;	
}	
//tool 66 
//得到index 	 item中 OWN piece [第一次出现] 	
/*
             g_i(arr, 2, "class=");  
		     g_i(arr, 2, "=");
*/	   					


// 合并 单个 element 属性值 
// merge_pieces(arr, "class");//合并 class属性 值 碎片			 		  
// merge_pieces(arr, "style");//合并 style属性 值 碎片		 		  
// merge_pieces(arr, "txt");  //合并 txt 值 碎片		 		  
function merge_pieces(arr, piece_name_s){	
	var index_start, 
		index_end, 
		index_stop;
	index_start = g_i(arr, 0, piece_name_s+"=");
	index_stop  = g_i(arr, index_start+1, "=");
	if(index_stop == -1){index_end = arr.length - 1}
	else{ index_end = index_stop - 1; }
	// index_start == index_end 不会合并
	merge_item(arr, index_start, index_end, index_start, " ");								    
	return arr;
}

//tool 68 	
//合并 && 删除 Array item  
function merge_item(arr, index_start, index_end, index_result, merge_split_s){
	var array = [];
	for(var i=index_start; i<=index_end; i++){ array.push(arr[i]); }
	arr[index_start] = array.join(merge_split_s);
	arr.splice(index_start +1, index_end - index_start);      
}
	
// 添加 多个
// 第二参数 数组 ["属性 = 属性值", "属性 = 属性值"]
function a_attrs(element, arr){
			var tag = element;
			for(var i=0,len=arr.length;i<len;i++){	
				var k = arr[i].split("=")[0];
				var v = arr[i].split("=")[1];
				switch(k){
					case "poster":tag.setAttribute("poster", v);break;
					case "controls":tag.setAttribute("controls", "controls");break;
					case "width":
					case "w":     tag.setAttribute("width", v);break;
					case "height":
					case "h":     tag.setAttribute("height", v);break;
					case "id":    tag.id = v;break;
					case "cl":
					case "class": tag.className = v;break;
					case "txt":   a_txt(tag, v);break;
					case "style":
					case "sty":   tag.style.cssText = true_css(v.split(";"));break;
					case "drag":  tag.setAttribute("draggable",true);break;
					case "rel":   tag.setAttribute("rel", v);break;
					case "cols":  tag.setAttribute("cols", v);break;				
					case "rows":  tag.setAttribute("rows", v);break;
					case "alt":   tag.alt = v;break;
					case "src":   tag.setAttribute("src", v);break;
					case "name":
					case "n":     tag.setAttribute("name", v);break;
					case "value":
					case "v":     tag.setAttribute("value", v);break;
					case "type":
					case "ty":
					case "t":     tag.setAttribute("type", v);break;
					case "checked":tag.setAttribute("checked", "checked");break;
					case "charset":
					case "char":  tag.setAttribute("charset",v);break;
					case "f":
					case "for":   tag.htmlFor = v;break;
					case "target":
					case "tar":   tag.setAttribute("target", v);break;
					case "href":
					case "hr":     tag.href = v;break;
					case "title":     
					case "tit":   tag.setAttribute("title", v);break;
					case "index":
					case "i":     tag.setAttribute("index", v);break;
					case "hidden":tag.setAttribute("hidden", "hidden");break;					
					case "disabled":tag.setAttribute("disabled", "disabled");break;	
					case "onmousemove":
					case "mousemove":tag.setAttribute("onmousemove", v);break;
					case "onmouseup":
					case "mouseup":tag.setAttribute("onmouseup", v);break;
					case "onclick":
					case "click": tag.setAttribute("onclick", v);break;
					case "onfocus":
					case "focus": tag.setAttribute("onfocus", v);break;
					case "onblur":
					case "blur": tag.setAttribute("onblur", v);break;
				}
			}
			return tag;		
}
//得到标准 css code String (参数 Array) 
function true_css(arr){
	for(var i=0,len=arr.length;i<len;i++){
		var k = arr[i].split(":")[0], v = arr[i].split(":")[1];
		switch(k){
				case "visi":arr[i] = "visibility:"+v;break;
				case "p":   arr[i] = "padding:"+v+"px";break;
				case "posi":
				case "po":  arr[i] = "position:"+v;break;
				case "m":   arr[i] = "margin:"+v+"px";break;
				case "t":   arr[i] = "top:"+v+"px";break;
				case "r":   arr[i] = "right:"+v+"px";break;
				case "b":   arr[i] = "bottom:"+v+"px";break;
				case "l":   arr[i] = "left:"+v+"px";break;
				case "m-t": arr[i] = "margin-top:"+v+"px";break;
				case "m-r": arr[i] = "margin-right:"+v+"px";break;
				case "m-b": arr[i] = "margin-bottom:"+v+"px";break;
				case "m-l": arr[i] = "margin-left:"+v+"px";break;
				case "w":   arr[i] = "width:"+v+"px"; break;
				case "h":   arr[i] = "height:"+v+"px";break;
				case "bgc": arr[i] = "background-color:"+v;break;
				case "bg":  arr[i] = "background:"+v;break;
				case "f":   arr[i] = "font:"+v;break;
				case "bor": arr[i] = "border:"+v;break;
				case "c":   arr[i] = "color:"+v;break;
		}
	}
	return arr.join(";");
}

//tool 2 
//得到一个element 节点 拥有 三级节点
function node(){
	var arg = arguments, len = leng(arg), inner;
	var container = enode(arg[0]);
	var cdf = dfnode();
	for(var i=1;i<len;i++){
	    if(is_array(arg[i])){
            inner = parseArray(arg[i]);
            cdf.appendChild(inner)
	    }
        if(is_string(arg[i])){
    	    inner = enode(arg[i]);
    	    cdf.appendChild(inner)
        }
    }
    container.appendChild(cdf);
    return container;
}
function parseArray(arr){
	var wrap = arr[0];
	var inner = arr[1];
	var cdf = dfnode();
	wrap = enode(wrap);

	for(var i=0,len=inner.length;i<len;i++){
		   if(is_string(inner[i])){ inner1 = enode(inner[i]); }
	       if(is_array(inner[i])){  inner1 = parseArray(inner[i]) }
	       cdf.appendChild(inner1); 
    }
    wrap.appendChild(cdf);
    return wrap;    
}
//tool 65 
//得到 第一个匹配 Number (整数 正数)                g_num("001px")  //1 
function g_num(str){ return parseInt(str.match(/\d+/)[0]); }

//得到 父级节点 //英文名 小写
function big1(node){  return node.parentNode; }
function big1n(node){ return tag(big1(node)); }
//得到Array   all parentNode  NOT own----<body>
function all_big1(node){
	 var big = big1(node), result = [];
	 while(tag(big)!="body"){
		 result.push(big);
		 big = big1(big);
	 }
	 return result;
}

//得到下一个节点//element
function next(node){  return node.nextSibling; }
function nexte(node){ return node.nextElementSibling; }

//得到上一个节点//element
function prev(node){  return node.previousSibling; }
function preve(node){ return node.previousElementSibling; }

//得到 lv1 first//element
function first(node){  return node.firstChild; }
function firste(node){ return node.firstElementChild; }

//得到 lv1 last //element
function last(node){  return node.lastChild; } 
function laste(node){ return node.lastElementChild; }

//得到 <body> //<head>
function bodyn(){ return document.body; } 
function headn(){ return tag("head")[0]; }

function lower(str){ return str.toLowerCase(); }
function upper(str){ return str.toUpperCase(); }
//得到nodeType 
function nT(param){ return param.nodeType; }
function nt(param){ return param.nodeType; }

//得到length   [ Array String paramect list arguments ] ==>继承？？
function leng(param){
	if(param.length>=0){ return param.length; }
	if(is_object(param)){
		var count = 0; 
		for(var key in param){
			if(param.hasOwnProperty(key)){
				count++;
			}		 
		  }
		return count;
	}	
}

//数据类型 系列
                   //得到constructor
function cons(param){ return param.constructor; } 
function is_string(param){  return cons(param)==String; }
function is_array(param){   return cons(param)==Array; }	
function is_number(param){  return cons(param)==Number; }

function is_object(param){  return cons(param)==Object; }
function is_function(param){return cons(param)==Function; }

function is_regexp(param){     return cons(param)==RegExp; }
function is_boolean(param){ return cons(param)==Boolean; }
function is_date(param){    return cons(param)==Date; }
function is_map(param){     return cons(param)==Map; }
function is_set(param){     return cons(param)==Set; }

//存在 error   Map Set
function is_list(param){	
	return (param.length>=0) ? !(is_string(param)||is_array(param)||is_function(param)) : false;
}	

//Node 系列
function is_null(param){  return param===null; }

function is_undefined(param){ return param===undefined; }
 
function is_enode(param){ return nT(param)==1; }

function is_tnode(param){ return nT(param)==3; }

function is_cnode(param){ return nT(param)==8; }
//空白 enode//非空白 enode 
function is_empty(param){ return first(param)===null; }
//创建  tnode//enode//cnode
function is_ctnode(str){ return str.slice(0,4)=="txt="; }
function is_cenode(str){ return (!is_ct(str)&&!is_cc(str)) }
function is_ccnode(str){ return str.slice(0,2)=="//";  }
function is_cdf(str){    return str=="df";  }

//tool 34 
//得到 lv1.length//lv1e.length  
function lv1len(param){  return leng(lv1(param)); }
function lv1elen(param){ return leng(lv1e(param)); }

// string
//tool 1  
	

//得到index 第一开头次出现
function i(str, piece){ return str.indexOf(piece); }

//得到index 第一次结尾出现 
function lasti(str, piece){ return str.lastIndexOf(piece); }

//得到boolean  是否 piece开始
function is_start(str, piece){ return i(str, piece)==0; }

//得到boolean  是否 结尾
function is_end(str, piece){
	return (i(str, piece) + leng(piece)) == leng(str); 
}

//得到boolean  是否 存在 piece 
function own(str, piece){ return i(str, piece)!=-1; }

//得到一个string    [参数 enode ]
function string1(param){ 
  if(is_enode(param)){ return param.outerHTML; }
}
//得到一个string   [参数 Array  Object]
function string2(param){
  if(is_object(param)){ 
    var str = "";
    for(var key in param){
      if(param.hasOwnProperty(key)){
        str = str + key+": "+param[key]+", ";
      }   
    }
    str = str.slice(0,-2);
    return "{"+str+"}";
  }
  if(is_array(param)){
      var str = "";
      for(var i=0,len=leng(param);i<len;i++){
      str = str +param[i]+", ";
    }
    str = str.slice(0,-2);
    return "["+str+"]";
  }
}

//to NOT-驼峰
function tuoFengTo(tuofeng){
		var reg  = /([A-Z][a-z]+)/g;
		return tuofeng.replace(reg, function(item){
			      return "-"+lower(item.slice(0,1))+item.slice(1);
	    });		 	        
} 

//to 驼峰
function toTuoFeng(str){
		 var reg = /(-\D)/g;
		 return str.replace(reg, function(item){
			      return upper(item.slice(1));
		 });
}

//得到String 替换 结果  第三参数 可以function 可以String  
function rep(str, reg, true_s){ return str.replace(reg, true_s); }
//tool 26 
//删除两端空格  rmv_0str0("  str  ");
function rmv_0str0(str){ return str.replace(/(^\s+|\s+$)/g, ""); }

//tool 27
//删除两端空格 
function trim(str){ return rmv_0str0(str); }

//tool 28 
//删除  item两端空格 Array
function rmv_0item0(arr){
	for(var i=0,len=arr.length;i<len;i++){
		 arr[i] = rmv_0str0(arr[i]);
	}
	return arr;
}
//t("用户名："+name+"\n已经被使用！");
// "\n" 换行效果

//得到String   删除 换行符号
function rmv_L(str){ return str.slice(count_lineChar(str)); }
//得到Number  String之中 换行符号 个数 
function count_L(str){
		var count = 0;
		for(var i=0,len=leng(str);i<len;i++){
		    if(str.charCodeAt(i)==10){ count++; }	 
		}
		return count;
}

//是否 存在 换行符号 
function own_L(str){ return count_L(str)!=0; }

//
//得到String      L();//1个  L(2);//2个  换行符号
function L(){
	 var lineChar = String.fromCharCode(10),
		 str = "",
		 arg = arguments, 
		 len = arg.length;
	 if(len==0){ return lineChar; }
	 for(var i=0;i<arg[0];i++){
		 str = str + lineChar;
	 }
	 return str;
}
//得到String      KG();//1个  KG(2);//2个 空格
function KG(){
	var arg = arguments, len = leng(arg);
	if(len==0){return " ";}
	var str = "";
	for(var i=0;i<arg[0];i++){
		str = str + " ";
	}
	return str;
}
		
// array
//判断Array 是否 二维数组
function ownarr2(arr){  
	var bool = false; 
	for(var i=0,len=leng(arr);i<len;i++){ 
	    if(is_array(arr[i])){ bool = true; break; } 
	}  
	return bool; 
}

//得到index   param is list 或 Array
function i_isarr(arr){ 
	var index = -1; 
	for(var i=0,len=leng(arr);i<len;i++){ 
	    if(is_array(arr[i])){ index = i; break; }
	}
	return index; 
}

//tool  
//得到Array  [Get many item]  [二参 index 三参 length]
/*
         var arr = [0,1,2,3,4,5,6,7];	 
         l(
		    substr(arr, 2, 4),
            substr(arr, 2)
		 );

*/
function subarr(){
	    var arg = arguments, len = leng(arg),        
		    start = arg[1], stop, array = [];
	    switch(len){
			case 2: stop = leng(arg[0]);break; 
			case 3: stop = start + arg[2];break;
		}			
		for(var i=start; i<stop; i++){
		    array.push(arg[0][i]);
		}
		return array;
}

//打印  item==""  [param is Array]
function item_0(arr){
	if(arr[0]==""){ l("first item is \"\"  [index=0]"); return; }  
	l("first item is not \"\" [index=0]");
}	     
//tool 36                   
//得到Array    param is list或array
function array(list, index_start){
		var arg = arguments, arr = [],
            start = (leng(arg)==1) ? 0 : arg[1]; 		
		for(var i=start,len=leng(list);i<len;i++){
		    arr.push(list[i]);			
		}
		return arr;
}

//tool 37
//Array 删除重复item
Array.prototype.unique = function(){
    var result = [];
    this.forEach(function(item){
        if(result.indexOf(item)==-1){
           result.push(item);
        }
    });
   return result;
}

//tool 38 
function rmv_repeat(arr){
	var result = [];
	for(var i=0; i<arr.length; i++){
		var item = arr[i];
		if(result.indexOf(item) == -1){ result.push(item); }
	}
	return result;
}

//tool 41 
//多个数组 merge remove repeat
function unite(arr1, arr2, arr3){
	var arg = arguments,
	    len1= arg.length;
	for(var i=1; i<len1; i++){
		var arr = arg[i];
		for(var j = 0,len2=arr.length; j <len2; j++){
		    var n = 0;
			for(var k = 0,len3=arr1.length; k <len3; k++){
				if(arr[j] == arr1[k]){
					n++;
				}
			}
			if(n == 0){ arr1.push(arr[j]); }
		}
	}
	arr1.sort((a, b) =>a - b);
	return arr1;
}
//tool 43 
//从小到大 
//得到Array   [item is number]
function sb(arr){   
	return arr.sort((a,b)=>a-b);
}

//tool 
//从大到小 
//得到Array   [every item is number]
function bs(arr){
  return arr.sort((a,b)=>b-a);
}	
//tool 1 
//得到一个enode   
/*                         第一参数  con-element 
                           第二参数  String [CSS selector]
			$1("#box");   
			$1(con, ".class-1");  
*/
function $1(){
	var arg = arguments, len = leng(arg);
	return (document.querySelector) ?
	       ((len==1) ? by$1(document, arg[0]) : by$1(arg[0], arg[1])) : null;		  
}
//tool inner 
function by$1(box, selector){ return box.querySelector(selector); }


//tool 2  
//得到一个list{ element } 
/*                         第一参数 is con-element 
                           第二参数 is String [CSS selector]
			$all(".class_val");  
			$all(con, ".class_val"); 
*/
function $all(){
	var arg = arguments, len = leng(arg);
	return (document.querySelectorAll) ?
	       ((len==1) ? by$all(document, arg[0]) : by$all(arg[0], arg[1])) : null;	
}

//tool inner 
function by$all(box, selector){return box.querySelectorAll(selector);}

//得到一个element   id("ok");  id("id=ok");  id("#ok");
function id(str){  
	return byid((own(str, "#")) ? str.slice(1) : (own(str, "id=")) ? str.slice(3) : str);
}
//tool 10 
function byid(str){ return document.getElementById(str); }

//tool 9  
//  第一参数 con--element 第二参数 "span" 
/*
				tag("span");   
				tag(con, "span");  
				tag(element); 
*/
function tag(){
	  var arg = arguments, len = leng(arg);	  
	  return (len==2) ? bytag(arg[0], arg[1]) : (is_enode(arg[0])) ? lower(arg[0].nodeName) : bytag(document, arg[0])
} 
//tool inner 
//  第一参数 con--element 第二参数 "div"  
function bytag(box, tag_name_s){ 
    return box.getElementsByTagName(tag_name_s);
}

function name(con, name_v){
	var arg = arguments, len = leng(arg);
	return (len==1) ? byname(document, arg[0]) : byname(arg[0], arg[1]);
}

//tool 17 
//得到 一个集合           ======> 没有讨论 兼容 
function byname(box, name_s){ return box.getElementsByName(name_s); }

	//tool 18
//得到 一个集合   
function class_(con, class_v){
	var arg = arguments, len = leng(arg);
	return (len==1) ? byclass(document, arg[0]) : byclass(arg[0], arg[1]);
}
//tool inner 
function byclass(box, class_v){
		if(box.getElementsByClassName){
		   return array(box.getElementsByClassName(class_v));
		}
		// ie6 ie7 ie8 
		var arr = class_v.split(" "), 
		    result = [],
		    list = box.getElementsByTagName('*'),
			count = 0;
		for(var i=0,len1=leng(list);i<len1;i++){      
		    var str = list[i].className;
			for(var j=0,len2=leng(arr);j<len2;j++){
		        if(own(str, arr[j])){ count++; }
			}
			if(leng(arr)==count){ result.push(list[i]); } 
		}
        return result;				  	
}

// class 
//tool 5  
//得到boolean    own_class(enode, "class-1");  
function own_class(enode, class_v){
	if(enode.classList){ return enode.classList.contains(class_v); }
	var arr = enode.className.replace(/\s+/," ").split(" "), bool = false;
	for(var i=0; i<arr.length; i++){
		if(arr[i]==class_v){ bool = true; break; }
	}
	return bool;
}
//tool 6 
//添加一个class值 
/*
           a_class(enode, "class-1");   //可以多个 没讨论

*/
function a_class(enode, class_v){   // ie10 支持 classList.add()
	if(enode.classList){ enode.classList.add(class_v);return; }
	if(enode.className==""){ enode.className = class_v;return; }
	var index = -1;	
	var arr = enode.className.replace(/\s+/," ").split(" ");
	for(var i=0; i<arr.length; i++){
		if(arr[i]==class_v){ index = i; }
	}
	if(index==-1){
	   arr.push(class_v);
	   enode.className = arr.join(" ");
	}	
}
//得到className值 
//tool 7 
function g_class(enode){ return enode.className; }

//删除一个class值       // 可以多个 没讨论
//tool 8
function rmv_class(enode, class_v){ 
	if(enode.classList){ enode.classList.remove(class_v);return; }
	var index = -1;
	var arr = enode.className.replace(/\s+/," ").split(" ");
	for(var i=0; i<arr.length; i++){
		if(arr[i]==class_v){ index = i; }
	}
	if(index!=-1){
		arr.splice(index, 1);
		enode.className = arr.join(" ");
	}
}


//tool 3 
//得到一个注释节点 
//  cnode("//=string123456");  cnode("abcd")
function cnode(txt_str){
	if(i(txt_str, "//=")==0){ txt_str = txt_str.split("=")[1]; }
	return document.createComment(" "+txt_str+" ");
} 

//tool 4 
//得到一个textNode 
//  tnode("txt=string1234");   tnode("asdfg")
function tnode(txt_str){
	if(i(txt_str, "txt=")==0){ txt_str = txt_str.split("=")[1]; }
    return document.createTextNode(txt_str); 
}

//tool 5 
//得到一个文档碎片节点 
function dfnode(){return document.createDocumentFragment();}

//tool 6-1 6 
//得到 一个容器 enode 仅仅lv1  
/*
    var obj = {
		con: "div id=con", 
		li: "div class=lv1 txt=test", 
		len: 3
	};
    l(list(obj));	
*/
function list(obj){
	    var con = enode(obj.con), 
	        li = obj.li,
	        len = obj.len, 
	        df = dfnode();
		for(var i=0;i<len;i++){
			df.appendChild(enode(li));
		}  
		con.appendChild(df);
		return con;
}

//tool 6-2 7 
//得到 一个 <link>  link("href=s.css"); link(0);
function link(param){
	return (is_number(param)) ? tag("link")[param] : 
           enode("link type=text/css rel=stylesheet href="+param.split("=")[1]);
}
//tool 6-3 8 
//得到一个 video element 
/* 
l(
  video("controls=true id=video-tag src=http://www.baidu.ogg poster=mymovie.jpg w=300 h=200 txt=not available video element")
);
*/		
function video(str){ return enode("video "+str); }

//tool 6-4 9 	
//得到一个标签 
// //tool 6-5 10  
function ul(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("ul") : 
           (arg[0]=='') ?  enode("ul") : 
           (is_string(arg[0])) ? enode("ul "+arg[0]) : 
           (arg[0]>0) ? tag("ul")[arg[0]] : tag("ul")[leng(tag("ul")) + arg[0]];
}
//tool 6-6 11 
function li(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("li") : 
           (arg[0]=='') ?  enode("li") : 
           (is_string(arg[0])) ? enode("li "+arg[0]) : 
           (arg[0]>0) ? tag("li")[arg[0]] : tag("li")[leng(tag("li")) + arg[0]];
}
//
function input(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("input") : 
           (arg[0]=='') ?  enode("input") : 
           (is_string(arg[0])) ? enode("input "+arg[0]) : 
           (arg[0]>0) ? tag("input")[arg[0]] : tag("input")[leng(tag("input")) + arg[0]];
}
//tool 6-10 15 
function label(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("label") : 
           (arg[0]=='') ?  enode("label") : 
           (is_string(arg[0])) ? enode("label "+arg[0]) : 
           (arg[0]>0) ? tag("label")[arg[0]] : tag("label")[leng(tag("label")) + arg[0]];
}
//tool 6-8 13
function div(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("div") : 
           (arg[0]=='') ?  enode("div") : 
           (is_string(arg[0])) ? enode("div "+arg[0]) : 
           (arg[0]>0) ? tag("div")[arg[0]] : tag("div")[leng(tag("div")) + arg[0]];
}
//tool 6-8 13 
function span(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("span") : 
           (arg[0]=='') ?  enode("span") : 
           (is_string(arg[0])) ? enode("span "+arg[0]) : 
           (arg[0]>0) ? tag("span")[arg[0]] : tag("span")[leng(tag("span")) + arg[0]];
}
//tool 6-7 12 
function a(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("a") : 
           (arg[0]=='') ?  enode("a") : 
           (is_string(arg[0])) ? enode("a "+arg[0]) : 
           (arg[0]>0) ? tag("a")[arg[0]] : tag("a")[leng(tag("a")) + arg[0]];
}
//
function p(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("p") : 
           (arg[0]=='') ?  enode("p") : 
           (i(arg[0], "txt=")===0) ? enode("p "+arg[0]) :     // p("txt=abcds")
           (i(arg[0], "txt=")!==0) ? enode("p txt="+arg[0]) : // p("abcd")
           (is_string(arg[0])) ? enode("p "+arg[0]) :         // p("txt=abcdefg") 
           (arg[0]>=0) ? tag("p")[arg[0]] : tag("p")[leng(tag("p")) + arg[0]];
}
//tool 72 
function img(){
    var arg = arguments, len = leng(arg);
    return (len==0) ? tag("img") : 
           (arg[0]=='') ?  enode("img") : 
           (is_string(arg[0])) ? enode("img "+arg[0]) :// p("txt=abcdefg") 
           (arg[0]>0) ? tag("img")[arg[0]] : tag("img")[leng(tag("img")) + arg[0]];
}
//tool 20  
//得到 copy 节点 
function copy(tag){return tag.cloneNode(true);}

//tool 21  
//得到 copy0 节点 
function copy0(tag){return tag.cloneNode();}

//tool 22 
//得到一个集合  第一代子代节点
function lv1(param){
   if(param.nodeType == 1){  return array(param.childNodes); }
   else if(param == "body"){ return array(bodyn().childNodes); }  
   else if(param == "head"){ return array(headn().childNodes); }
}

//tool 23 
//得到一个集合  第一代子代element
function lv1e(param){
   if(param.nodeType == 1){ return children(param);}
   else if(param == "body"){return children(bodyn());}
   else if(param == "head"){return children(headn());}
}

//tool 24  
//得到一个集合   
function children(element){
	if(element.children){return array(element.children);}
	var list = element.childNodes, result = [];
	for(var i=0,len=list.length;i<len;i++){
		if(is_enode(list[i])){ result.push(list[i]); }
	}
	return result;
}

//tool 25 
//得到 element 之前 注释节点
function g_cnode(element){
   var node =  element.previousSibling.previousSibling; 
   if(node!==null && node.nodeType == 8){ return node; }
}
//tool 28 
//删除 Array item 两端空格
function rmv_0item0(arr){
	for(var i=0,len=arr.length;i<len;i++){
		 arr[i] = rmv_0str0(arr[i]);
	}
	return arr;
}

//tool 29 
// 添加 style属性 css  a_style_attr(element, "w:100;h:100");
function a_style_attr(element, style_s){
	   element.style.cssText += true_css(style_s.split(";"));  
	   return element;
}

//tool 30 
//给 String 添加一个  分割字符  
function a_split(str, index, split_s){
	return str.substring(0, index) + split_s + str.substring(index);
}
//tool 32 
//得到  Number  (整个页面的 没有讨论 一个 element) 
function g_scrollTop(){ return document.body.scrollTop; }

//tool 33 
//得到一个 txt String  内部所有层级
function g_innerText(element){
	return (is_string(element.textContent)) ? element.textContent : element.innerText;
}
//tool 35 
//得到 txt String  <element>"txt"</element>  
function g_txt(node){
	switch(node.nodeType){
		case 1: return node.firstChild.nodeValue;break;
	    case 3: return node.nodeValue;break;
		case 8: return node.data || node.nodeValue;break;
	}
}

//tool 36 
//得到 String element 一个属性   g_attr(div, "align");
function g_attr(element, key_s){	
	return element.getAttribute(key_s)||
		   element.attributes[key_s].value||
		   element.getAttributeNode(key_s).value;    
}

//tool 37 
//得到 String element 所有属性   g_attrs(element);  
function g_attrs(element){
	var arr = [], key, val, i, len;
	for(i=0, len=element.attributes.length; i < len; i++){
		key = element.attributes[i].nodeName;
		val = element.attributes[i].nodeValue;
		arr.push(key + "=\"" + val + "\"");
	}
	return arr.join(" ");
}

//tool 39 
//得到 styleSheet  参数 (可以link element) (可以 index) <style>或<link>里css 
function styleSheet(param){
	if(typeof param == "number"){ return document.styleSheets[param];}
	else{ return param.sheet||param.styleSheet; }
}

//tool 40 
//得到一个 <link>或<style> 中 css集合 
function rules(sheet){ return sheet.cssRules || sheet.rules; }

//tool 41  修改  名字 
//得到 element style属性上 css 值
function g_style_attr(element, css_name_s){
    return element.style.getPropertyValue(css_name_s);
}

//tool 42 
// 一个网页 建立一个独有范围
function range(){ 
		var ran;
		if(typeof document.createRange == "function"){
			ran = document.createRange();
		}
		return ran;
}

//tool 43 
// <head>之中 结尾 添加 style element => a_style_css("body{background-color:red}");
function a_style_css(css_code_s){
	var tag = document.createElement("style");
	tag.type = "text/css";
	try{ tag.appendChild(document.createTextNode(css_code_s)); } 
	catch(ex){ tag.styleSheet.cssText = css_code_s; }
	document.getElementsByTagName("head")[0].appendChild(tag);
}

//tool 44 
// <body>之中 结尾 添加 script element => a_script_js("alert('等待')");
function a_script_js(js_code_s){
	var tag = document.createElement("script");
	tag.type = "text/javascript";
	try{ tag.appendChild(document.createTextNode(js_code_s)); } 
	catch(ex){ tag.text = js_code_s; }
	document.body.appendChild(tag);
}

//tool 45 
// <element> 之前 添加 注释节点  
function a_cnode(comment_s, element){	
	    element.parentNode.insertBefore(cnode(comment_s), element);
}

//tool 46 
//oldNode 之前 添加 newNode 
function a_prev(oldNode, newNode){
	oldNode.parentNode.insertBefore(newNode, oldNode);
}

//tool 47 
//oldNode 之后 添加 newNode 
function a_next(oldNode, newNode){
	if(typeof oldNode == "string"){ oldNode = id(oldNode.split("=")[1]); }
	var con = oldNode.parentNode, old_next = oldNode.nextSibling;
	if(old_next === null){con.appendChild(newNode);}
	else{con.insertBefore(newNode, old_next);}
}

//tool 48 
//container 里面首部 添加 newNode 返回 container 
function a_first(con, newNode){
	var first = con.firstChild;
	if(first === null){con.appendChild(newNode);}
	else{
		con.insertBefore(newNode, first);	
	}	
	return con;
}

//tool 49 
//container里面结尾添加new node ("id=text-1")(container[enode])(返回容器) 
function a_end(cont, node1, node2, node3){
	var container = (is_string(cont)) ? id(cont.split("=")[1]) : cont;
	var cdf = document.createDocumentFragment();
	for(var i=1,len=arguments.length;i<len;i++){
		cdf.appendChild(arguments[i]);
	}
	container.appendChild(cdf);
	return container;
}

//tool 50  
//添加txt  给空白element 
// a_txt(element, "txt");
function a_txt(element, txt_s){ a_end(element, tnode(txt_s)); }

//tool 51 
// element 添加一个属性  
// a_attr(div, "align=left"); 
function a_attr(element, key_val_s){
	var arr = key_val_s.split("=");
	element.setAttribute(arr[0], arr[1]);
}


// 得到 String_片段        
//             g_cut(str, 0, "{");
//             g_cut(str, "{", "}");
//             g_cut(str, "{", "end");
function g_cut(str, index_strat, index_end){
	 var start = (is_string(index_start)) ? str.indexOf(index_start) : index_start;	  
	 if(index_end == "end"){ return str.slice(start); }
	 return str.slice(start, str.indexOf(index_end) +1);           
}

//tool 52 
/*
    添加 css  到 一个<style>或<link>
	a_rule("sheet 0", "body{background:#ccc;}", 0);
	a_rule(styleSheet(0), "body{background:yellow;}", 1);
*/
function a_rule(sheet, css_s, index){      //运行大index css 
	sheet = (is_string(sheet)) ? styleSheet(parseInt(sheet.split(" ")[1])) : sheet;
	var i = css_s.indexOf("{"),
        selector_s = css_s.slice(0, i),
        midd_s = css_s.slice(i).slice(1,-1); 
	    rules_old  = sheet.cssRules||sheet.rules,
	    length_old = rules_old.length;  
	//第三参数 index  讨论 
	if(index <= length_old){
		if(sheet.insertRule){ 
			sheet.insertRule(css_s, index);
		}
		else if(sheet.addRule){
			sheet.addRule(selector_s, midd_s, index);
		}
	}
}

//tool 53 	
//合并 
//element之中所有textNode 合并成 一个textNode节点 
function merge_t(element){ element.normalize(); }

//tool 54 
//切割
//一个txt变为两个txt 返回第二个片段
//index_start = 5  index_end = end
//textNode.splitText(index);
function cut(tnode, index){ return tnode.splitText(index); }

//tool 55 
//替换 旧节点
function replace(newNode, oldNode){ oldNode.parentNode.replaceChild(newNode, oldNode); }

//tool 56 
//删除 旧节点 
function remove(oldNode){ oldNode.parentNode.removeChild(oldNode); }

//tool 57 
//设置 一个新值//仅仅在console.log下测试 is ok
function set_scrollTop(num){ 
	if(!num){ num = 0 }
	document.body.scrollTop = num; 
}

//tool 58 
//设置 一个新值//仅仅在console.log下测试 is ok
function set_scrollLeft(num){
	if(!num){ num = 0 }
    document.body.scrollLeft = num; 
}
//tool 59 
//删除一个属性
// rmv_attr(div, "align");		
function rmv_attr(element, key_s){ element.removeAttribute(key_s); }
//tool 60 
//删除一个选择器 与 css 
function rmv_rule(sheet, index){
	var rules_old  = sheet.cssRules||sheet.rules;
	var length_old = rules_old.length;
	//第四参数 index  取值范围 讨论 
	if(index <= length_old-1){
		if(sheet.deleteRule){
		   sheet.deleteRule(index);
		}
		else{
		   sheet.removeRule(index);
		}
	}
}

//tool 61 
//删除 element.style上的 css
// rmv_style_attr(id("box2"), "width")// test is ok  
function rmv_style_attr(element, css_name_s){
    element.style.removeProperty(css_name_s);
}

//tool 62 
//得到 计算_css 值 String  com_css(id('box2'), "width"); (有单位)
function com_css(element, css_name_s){
   // ie6 ie7 ie8  
   if(element.currentStyle){		   
	   if(/float/.test(css_name_s)){	    
		   return element.currentStyle["float"]||element.currentStyle["cssFloat"]||element.currentStyle["styleFloat"];
	   }		   
	   else{
		   var tuofeng_s = toTuoFeng(css_name_s);					   
		   return element.currentStyle[tuofeng_s];
	   }	 	
   }
   // ie9 ie10 火狐+谷歌 支持   
   else{	    
	    if(/float/.test(css_name_s)){					  						   						   	
		  if(navigator.userAgent.indexOf("Firefox")>0){return getComputedStyle(element, false)["cssFloat"];}
		  else{return getComputedStyle(element, false)["float"];}	   												   
		}
		else{ 
			return getComputedStyle(element, false)[css_name_s];
		}
   }	
}
//tool 66 
// 得到一个 Number 	 
// g_i(arr, 2, "class=");	// Array  忽略	第二次 own			
// g_i(arr, 2, "=");	    // Array  忽略	第二次 own
// g_i(str, "class=");      // String 忽略	第二次 own					
function g_i(arr, indexSTART, own_s){
    switch(arguments.length){
		case 3: 
			var index = -1;
			for(var i=indexSTART,len=leng(arr); i<len; i++){
			    if(own(arr[i], own_s)){ index = i; break; }
			}
			return index;break;
		case 2: 
		    return arguments[0].indexOf(arguments[1]);break;
	}	
}
//====================== 二期工程 

//tool 69
//至少存在一个<style>或<link>
function one_style(){
	if(document.styleSheets.length == 0){ 
		var style = enode("style t=text/css"),
			old   = tag("title")[0].nextSibling, // error 得不到 title  
			head  = headn();
		if(old === null){
			head.appendChild(style);
		}
		head.insertBefore(style, old);	
	}
}
/**  不封装  测试 && 调试 使用  **/
//tool 2 
// 添加 替换 
// element中唯一own txtNode    
function change_txt(element, txt_s){ element.firstChild.nodeValue = txt_s; }

//tool 3 
//添加  一个 <style>*{margin:0;padding:0;}</style>
//位置  <head>中结尾位置
function reset00(){ a_style_css("*{margin:0;padding:0;}"); }

//tool 4 
//占据一个区域  
function test(){
    var con = enode("div id=test-space");
    con.style.cssText = "border:1px solid green;width:300px;height:300px";
	a_end(document.body, con);
}

//tool 5 
// 添加目标 div (测试 使用)
// test_div("id=test-1", "style=w:100;h:100;c:green"); 
function test_div(id_class_s, style_s, txt_s){
	var con = id("test-space");
	var div = enode("div "+id_class_s);	
	var arr = style_s.split("=")[1].split(";");
	div.style.cssText = "background-color:#ccc;"+ true_css(arr);
	a_end(div, tnode(txt_s ? txt_s.split("=")[1] : "test"));
	a_end(con, div);	
}

//tool 6 
// 位置 <body>之中 开始位置  
// 添加 div  
// a_div("class=test id=ok txt=ok");
function a_div(param){
	var div = enode("div "+param);
    document.body.insertBefore(div, document.body.firstChild);
}

//tool 7
// 位置 <body>中 结尾位置  ( 仅仅click事件 )   
// 添加 
// 一个控制按钮 <input type='button' value='click' onclick='fn()'/> 
// a_inp("v=get item", "f=fn()"); 
function a_inp(value_s, onclick_s){
		var inp = enode("input");
		inp.type = "button";
		inp.setAttribute("value", value_s.split("=")[1]);
		inp.setAttribute("onclick", onclick_s.split("=")[1]);
        a_end(bodyn(), enode("br"), inp, enode("br"));
}

//tool 9 
//位置 <head>中结尾位置 
//添加 
//一个 node ---> h_end(link("hr=s.css"));
function h_end(element){ a_end(headn(), element); }

//tool 10 
//位置 <body>中开始位置
//添加 一个 node ---> 
// b_first("span id=ok"); 
// b_first(element);
function b_first(param){
	var tag_new = (is_enode(param)) ? param : enode(param);
	document.body.insertBefore(tag_new, document.body.firstChild);
}

//tool 11 
//位置 <body>中结尾位置 
//添加 一个 node ---> 
//  b_end("span id=ok"); 
//  b_end(element);
function b_end(param){
	var tag_new = (is_enode(param)) ? param : enode(param);
	a_end(bodyn(), tag_new);
}

//tool 12 
// 添加 style属性  id_style("test", "po:absolute");
function id_style(id_value_s, style_css_s){
	    var tag = id(id_value_s);
	   	var arr = style_css_s.split(";");
	    tag.style.cssText += true_css(arr);
}

//tool 13 
// 添加 css  id_rule("test-1", "width:10px"); (从上往下)顺序
function id_rule(id_s, css_rule_s){
	var sheet = styleSheet(0);
	var rules_old  = sheet.cssRules||sheet.rules;
	var arr = css_rule_s.split(";");
	insertRule(sheet, "#"+id_s, true_css(arr), rules_old.length);
}

//tool 14 
// 阅读 打印 一个<style>或<link>中 css (从上往下) 
// l_rules(0); [参数 Number]
function l_rules(index){
	var sheet = styleSheet(index);
	var rules = sheet.cssRules||sheet.rules;
	for(var i=0,len=rules.length;i<len;i++){
		console.log(rules[i].cssText);
	}
	l();
}
// l_rules(0); [参数 Number]
function l_rules_ori(index){
    var sheet = styleSheet(index);
	var rules = sheet.cssRules||sheet.rules;
	for(var i=0,len=rules.length;i<len;i++){
		console.log(rules[i]);
	}
	l();
}

//tool 18 
//打印 一( list 或 Array )
// l_list(tag("ul"))
function l_list(list){
	  var len = list.length;
	  console.log("list.length is: ( "+len+" )");
      for(var i=0;i<len;i++){
		  console.log("list["+i+"]");
		  console.log(list[i]);
	  }
} 
//tool 19 
// 打印 一个 节点类型  Number 
// l_nt(id('box2'))
function l_nt(node){ l(node.nodeType); }

//tool 20 
// 打印(整个网页重画)  参数 String 
function w(str){ document.write(str); }

//tool 21 
// 打印 一个 String 
// element.firstChild textNode
// textNode  
// 注释节点 String  
function l_txt(node){
	switch(node.nodeType){
		case 1: if(node.firstChild.nodeType == 3){console.log(node.firstChild.nodeValue);}break;
		case 3: console.log(node.nodeValue);break;
		case 8: console.log(node.data||node.nodeValue);break;
    }
}
//tool 23 
//打印 style属性 所有 css  
// l_style_attrs(id("box2"))  
function l_style_attrs(element){
    var style_o = element.style,
	    key,
		val;
	for(var i=0,len=style_o.length;i<len;i++){
	    key = style_o[i];
	    val = style_o.getPropertyValue(key);
	    console.log(key+" : "+val);
	}
}

//tool 24 
//  打印 一个 element 属性 offset 5 个  ( 仅仅阅读 )
/*	l_offset(id('box2'), "l");
	l_offset(id('box2'), ["l", "t"]);
	l_offset(id('box2'), ["l", "t", "w", "h", "p"]);
    l_offset(id('box2'));
*/	
function l_offset(element, param){//第二参数(可以 String)(可以 Array)
   var options = (arguments.length == 1) ? ["l", "t", "w", "h", "p"] :
                 (is_string(param)) ? [param] : param; 
   for(var i=0,len=options.length;i<len;i++){
		switch(options[i]){
		  case "t": l("top "+element.offsetTop);break;
		  case "l": l("left "+element.offsetLeft);break;
		  case "w": l("width "+element.offsetWidth);break;
		  case "h": l("height "+element.offsetHeight);break;
		  case "p": l("parent -->");l(element.offsetParent);break;
		}
   } 
   l();
}

//tool 25 
// 显示数据   
//  show_msg("信息");  show_msg(id('box2'), "信息");
 
function show_msg(box_element, txt_s){ 
 switch(arguments.length){
  case 1:
    var tag = enode("div");
    tag.style.cssText = "margin-top:5px;width:120px;height:120px;background:#ccc";
    tag.innerHTML = arguments[0] +"<br>";
    b_end(tag);
	break;
  case 2:
    box_element.innerHTML = txt_s +"<br>";
	break;
 }
}

//tool 26 
// 添加 list to <body>中第一个节点 之后 
/*
		body(
		  p("try dragging the image over the square."),
		  div("id=drag-e drag=true txt=ok sty=w:80;h:80;bg:green"),
		  div("id=area sty=w:100;h:100;bg:green;float:right"),
		  div("id=box sty=w:100;h:100;bg:#ccc")
		);
*/
function body(){
  var con = bodyn(), cdf = dfnode(), len = arguments.length;
  for(var i=0;i<len;i++){
	  cdf.appendChild(node1(arguments[i]));
  }		  
  a_next(con.firstChild, cdf);			
}

//tool 27 
// 添加 替换  <title>txt</title> 中 txt_str  a_title_txt("test-body") 
function a_title_txt(txt_str){ document.title = txt_str; }
//tool 30 
//得到 <style> 与 <link> 总个数
function howmanysheet(){  return document.styleSheets.length; }		
//tool 34 
//添加 event  ( 非 ie is OK )
function id_event(id_s, type_s, fn){
	var node = (typeof id_s == "string")?id(id_s):id_s;
	node.addEventListener(type_s, fn, false);
}

//tool 35 
//添加 click event  ==>  click("id=test-1", fn); click(element, fn);
function click(node, fn){
	node = (node.nodeType != 1) ? id(node.split("=")[1]) : node; 
	node.addEventListener("click", fn, false);
}

//tool 36 
// g_body_lv1("element0"); 得到<body>第一代子代 中 element 
// g_body_lv1("e0");
// g_body_lv1(0);          得到<body>第一代子代 中 Node
function g_body_lv1(index){
	if(is_string(index)){	
		var i = g_num(index);
		return lv1e(document.body)[i];
	}
	return document.body.childNodes[index];
}

//tool 37 
// 位置 <body> lv1 ---> old_index 之后
//添加一个节点 
function b_next(old_index, node_new){      // "element0" 
		var old = (is_string(old_index)) ? lv1e(bodyn())[g_num(old_index)] 
		          : lv1(bodyn())[old_index]; 
		a_next(old, node_new);
}

//tool 38 
/*  var obj = {key1: 1, key2: 2, key3: function(){alert("3")}, key4: 4};
	l(g_len(obj));
	// 4 
*/
// 得到 一个 {Object} length
      //   l(keys_len({key1: 12, key2: 23, key3: 45}))

function keys_len(obj){
	var count = 0;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
		   count++;	
	    }
	}
	return count;
}
//tool 
//得到 <title>
function title(){ return tag("title")[0]; }

//得到 <meta charset='utf-8'>	  
// l(meta("utf-8"));
// l(meta("charset=utf-8"));
function meta(str){ 
	str = (str.indexOf("=") == -1) ? ("charset="+str) : str;
    return enode("meta "+str);
 }
//tool 
//添加 <meta charset='utf-8'>
function a_meta(){ 
	headn().insertBefore(meta("utf-8"), title());
}
//tool 
//得到 所有 拥有 href属性 <a> 
function hrefa(){ return document.links; }		
//tool 
//tool   仅仅 throw new Error() 函数 才 运行 打印 js line 
// a_log_error(log_error);
function a_log_error(fn){ window.onerror = fn; }
//tool 
// 会打印 js line  { throw new Error() }
function throw_error(must_bool, show_msg_s){
	   if(!must_bool){
		   throw new Error(show_msg_s);
	   }
}
//tool 
// 会打印 js line  { throw new Error() }
function custom_error(must_bool, msg_s){
		function CustomError(message_s){       
			this.name = "CustomError";
			this.message = message_s;
		}     
		CustomError.prototype = new Error();

		if(!must_bool){
		   throw new CustomError(msg_s);
		}
}
//tool 
//得到 throw new Error()函数的信息
function log_error(msg_s, url, line){
	var i = msg_s.indexOf(":");
	console.log("own error file is ["+url+"]");
	console.log("error type is ["+msg_s.slice(0,i)+"]");         
	console.log("throw new Error(String)---running line Number is ["+line+"]");
	console.log("error msg  is ["+msg_s.slice(i+2)+"]"); 
	return false;
}
//tool 
// 打印一个 typeof && 参数  
function l_typeof(param){
	l("typeof param is: "+(typeof param));
	l("param is:        ")
	l(param);
	l();
}

//tool 
//打印一个或多个 typeof && 参数 
function l_t(){
	var arg = arguments, len = arg.length;	
	for(var i=0;i<len;i++){
	    l_typeof(arg[i]);
    }
}  	

//tool 
function for_loop(list, fn){
	for(var i=0,len=list.length;i<len;i++){
		fn(list[i]);
	}
}
// 打印 
// 【Not Use】
//tool 
//【多参】   	
function dir(){ 
      var arg = arguments, len = leng(arg);
	  for(var i=0;i<len;i++){
		  console.dir(arg[i]);  
	  }
      l();
}
//【多参】
function t(){ 
      var arg = arguments, len = leng(arg);
	  for(var i=0;i<len;i++){
		  alert(arg[i]);  
	  }
      l();
}

//【无参 单参 两参 三参 更多】
//tool 1          
function l(){
   var arg = arguments, len = arg.length;
   switch(len){
	   case 0: console.log("");break;
	   default:
          for(var i=0;i<len;i++){
		      console.log(arg[i]);
	      } 	   
   }  
}
//tool 2
//list  
function l_list(){
	var arg = arguments, len = leng(arg);
    if(len==1){		
		l_one_list(arg[0])
		return;
	}	
	for(var i=0;i<len;i++){
		var list = arg[i];
		l("第 "+(i+1)+" 个list is: ");
		l("start -->");
		l_one_list(list); 		    
	}
}
//tool 4
//length   [Array list String Object]
function ll(param){ l("param.length is --->"); l(leng(param)) }
//tool 5 
//构造函数 && 参数	
function l_c(){
	var arg = arguments, len = leng(arg);
    for(var i=0;i<len;i++){
		cons(arg[i]);
	}
} 

//【无参】
function l_sheets(){ 
		l("styleSheets.length is: ");
		l("----> "+document.styleSheets.length);
		l()
}

//tool 
//打印 浏览器 标准模式//混合模式  
function l_strict(){
	 if(document.compatMode=="CSS1Compat"){ 
	       l("浏览器 使用 strict     //标准模式");
     }
	 else{ l("浏览器 使用 not strict //混合模式"); }
}
function l_model(){ l_strict(); }

//【单参】

//打印 enode 所有 attrs 
function l_attrs(enode){
	l("enode all attrs");
	l("------------------")
	l(g_attrs(enode));
}
function l_lv1c(param){  l_list(lv1c(param)); }
//tool 21 
//打印 [one String]   参数 tnode//cnode  
function l_txt(node){
	if(is_tnode(node)){l(node.nodeValue);}
	if(is_cnode(node)){l(node.data||node.nodeValue);}
}

//打印 CSS     [one String]
//tool 
//打印 style属性 上 的  all  
function l_style_attrs(enode){
    var style_o = enode.style,
	    key,
		val,
		len = leng(style_o);
	for(var i=0;i<len;i++){
	    key = style_o[i];
	    val = style_o.getPropertyValue(key);
	    l(key+" : "+val);
	}
}
//一个enode.style.width 
/*  
        l_style_attr(enode, "width");
*/
function l_style_attr(enode, k_s){
	l(k_s);
	l(g_style_attr(enode, k_s));
}

function l_attr(enode, k_s){
	l("enode.attr");
	l("-----------")
	l(k_s+" = \""+g_attr(enode, k_s)+"\"");
}
//一个list{ enode } 
function l_all(tag_name_s){
	l_list(tag(tag_name_s));
}
//tool 14 
//一个<style>或<link>中 css (从上往下)   
function l_rules(index){
	var sheet = styleSheet(index);
	var rules = sheet.cssRules||sheet.rules;
	for(var i=0,len=rules.length;i<len;i++){
		l(rules[i].cssText);
	}
	l();
}
//
function l_rules_ori(index){
    var sheet = styleSheet(index);
	var rules = sheet.cssRules||sheet.rules;
	for(var i=0,len=rules.length;i<len;i++){
		l(rules[i]);
	}
	l();
}
	
//tool 打印 一个 
function l_tag(enode){
    l("enode is: ");
    l("  ---> "+tag(enode));
}

// 存在 几个换行符号 
function l_code10(str){
    l("Own "+count_lineChar(str)+"个 L() 换行符号");
}

//打印Array    [item is Object] 
function l_arr(arr){
	 var len = leng(arr);
	 l("length is: "+len);
	 for(var i=0;i<len;i++){
		 l("index = "+i);
		 var obj = arr[i];																					
         l(obj);
         l() 	 	 
	 }			 
}

//打印Object          
function l_obj(obj){
	l("Object is: --->");
	for(var key in obj){
	   if(obj.hasOwnProperty(key)){
	     l(key+" : "+obj[key]);
	   }  
	}
}
 
//打印  String 开端几个空格
function l_0str(str){
  var count = count_0str(str);
  if(count==0){
  	l("str.start is NOT KongGe");
  	return;
  }
  l("str.start is "+count+" KongGe");
}

//得到Number   String 开端几个空格
function count_0str(str){
  if(str.charAt(0)!=" "){ return 0; }    
  return leng(str.match(/(^\s+)/)[0]);
}
  

//【两参】
//Array  [str.split()]
function l_split(str, piece){
	  l(str.split(piece));
}

//打印index  [str.lastIndexOf()]
//    l_lasti("asbfdsbhh", "sb")
function l_lasti(str, piece){ 
	var index = lasti(str, piece); 
	if(index==-1){ 
		l("NOT own piece"); 
		l();
		return; 
	} 
	l("param first  is --->  "+str)
	l("param second is --->  "+piece)
	l("first lastIndexOf() is:  --->  "+index);
	l(); 
} 	
//打印index  [str.indexOf()]
//    l_i("asbfdsbhh", "sb")
function l_i(str, piece){
	var index = i(str, piece); 
	if(index==-1){
		l("NOT own piece");
		l();
		return;
	} 
    l("param first  is --->  "+str)
	l("param second is --->  "+piece)
	l("first indexOf() is:  ---> "+index);
	l(); 
}
//【单参 或 两参】
//tool 24 	
function l_offset(enode, str_or_array){
   var arg = arguments, len = leng(arg), arr;
   switch(len){
	    case 1: arr = ["l", "t", "w", "h", "p"];break;
        case 2: arr = (is_string(arg[1])) ? [arg[1]] : arg[1];break;			   
   }
   for(var i=0,le=leng(arr);i<le;i++){
		switch(arr[i]){
		  case "t": l("top "+enode.offsetTop);break;
		  case "l": l("left "+enode.offsetLeft);break;
		  case "w": l("width "+enode.offsetWidth);break;
		  case "h": l("height "+enode.offsetHeight);break;
		  case "p": l("parent -->");l(enode.offsetParent);break;
		}
   } 
   l();
}
//tool inner 
//tool 18 
//打印 一( list 或 Array )
function l_one_list(list){   
	  var len = leng(list);
	  l("list.length is:  "+len);
      for(var i=0;i<len;i++){
		  l("list["+i+"]");
		  l(list[i]);
	  }
	  l();
} 

//  不打印  //document //window //JSON //XML //range //属性节点等等
function log_one_t(param){		
		l("param is: -->");
		if(is_null(param)){     l("null       not get one [Node]"); }
		if(is_undefined(param)){l("undefined  not get [value]");}
		if(is_enode(param)){    l("enode [ori js]");}
		if(is_tnode(param)){    l("tnode [ori js]");}
		if(is_cnode(param)){    l("cnode [ori js]");}
		if(is_list(param)){     l("list{enode} [ori js]");}			
		if(is_string(param)){   l("String"); }
		if(is_number(param)){   l("Number"); }
		if(is_array(param)){    l("Array"); }
		if(is_date(param)){     l("Date"); }
		if(is_object(param)){   l("{Object}"); }
		if(is_function(param)){ l("Function"); }
		if(is_boolean(param)){  l("Boolean"); }
		if(is_reg(param)){      l("RegExp"); }
		if(is_map(param)){      l("Map"); }
		if(is_set(param)){      l("Set"); }			
		l(param);							 
}
//打印 一个 或 多个 
function print(){
	var arg = arguments, len = leng(arg);
	for(var i=0; i<len; i++){
		console.log(arg[i]);
	}console.log("")
}



//tool 打印一个String
function l_str(str){l("param is string");l(str);}

//tool 打印一个 str.length 
function l_len(str){
	l("参数 str.length is:");
	l(str.length);
}

//tool 打印一个element.nodeName 
function l_nodeName(enode){
    l("参数 element.nodeName is: ");
    l(element.nodeName.toLowerCase());
}

//tool 打印一个 textNode.nodeValue 
function l_nodeValue(tnode){
	l("参数 textNode.nodeValue is: ");
	l(textNode.nodeValue);
}

//打印一个  index && str.length 
function l_i_len(str, index){
	l("第"+(index+1)+"个参数 str.length is: ");
	l("         "+str+"  "+str.length);
}

//打印一个  index && textNode.nodeValue
function l_i_val(textNode, index){
		l("第 "+(index+1)+" 个 param textNode.nodeValue is: ");
		l(textNode.nodeValue);        					 	       	  
}

//打印一个  index && element.nodeName
function l_i_name(element, index){
	l("第 "+(index+1)+" 个 param element.nodeName is: ");
	l(element.nodeName.toLowerCase());       					 	       	  
}


//打印 多个 && index 
function for_loop(list, fn){
	for(var i=0,len=list.length;i<len;i++){
		fn(list[i], i);
	}
	l("");
}

//打印 多个 && index  没有最后item 
function for_loop_rmv(list, fn){
	for(var i=0,len=list.length-1;i<len;i++){
		fn(list[i], i);
	}	
	l("");
}

//打印 一个Array  仅仅 [item is Object] 
function l_arr(arr){
	 var len = arr.length;
	 for(var i=0;i<len;i++){
		 l("arr["+i+"]");
		 l(arr[i]);
	 }			 
}

//打印 一个 Object 
function l_obj(obj){
	for(var key in obj){
	   if(obj.hasOwnProperty(key)){
	   	  l(key+" : "+obj[key]);
	   	}	 
	}
}
function lv1t(param){
	var arr = lv1(param), result = [];
    for(var i=0,len=leng(arr);i<len;i++){
    	if(is_tnode(arr[i])){
    		result.push(arr[i])
    	}
    }
	return result;
}
function l_lv1t(param){
	var arr = lv1t(param);
    l("param is --->");
	l(param);
	l("lv1t is --->");
	l_list(arr)
}
// l_lv1(id('box22'))  l_lv1e(id('box22'))
function l_lv1(param){
	var arr = lv1(param);
	l("param is --->");
	l(param);
	l("lv1 is --->");
	l_list(arr)
}
function l_lv1e(param){
	var arr = lv1e(param);
    l("param is --->");
	l(param);
	l("lv1e is --->");
	l_list(arr);
}
//tool 5 
// add 目标 div (Test Use)
/*
     test_div("id=test-1 style=w:100;h:100;c:green"); 
     test_div("id=test-1 style=w:100;h:100;c:green txt=jj"); 
 
*/
function test_div(param){
	var con = id("test-space");
	if(is_null(con)){
		con = enode("div id=test-space sty=border:1px solid green;width:300px;height:500px");
		a_end(bodyn(), con);
	}
	param = (own(param, "txt=")) ? param : (param + "txt=test");
	var div = enode("div "+param);	
	div.style.cssText += "background-color:#ccc;";
	a_end(con, div);	
}
//tool 10 
//<body>中开始 add 
/*
		b_first("span id=ok");  
		b_first("txt=String");
		b_first("//=strrrr");  
		b_first(enode("div cla=cl-10"));
		b_first(tnode("txt=string-12345"));
		b_first(cnode("//=注释部分"));
*/
function b_first(one_node){
	bodyn().insertBefore(node1(one_node), first(bodyn()));
}
function node1(param){
	return (is_enode(param)||is_tnode(param)||is_cnode(param)) ? param :
	(i(param, "txt=")==0) ? tnode(param.split("=")[1]) : 
	(i(param, "//=")==0)  ? cnode(param.split("=")[1]) : enode(param)
}
//tool 36 
/*
		   g_body("enode0"); 
		   g_body("e0"); 
		   g_body(0);          
*/
 function g_body(index){
	return (is_string(index)) ? lv1e("body")[g_num(index)] : lv1("body")[index];
}

//【两参】
//tool 2 
//修改  enode中 第一个tnode    
function rep_txt(enode, txt_s){ first(enode).nodeValue = txt_s; }

//tool 7  
//<body>中 结尾 add <input type='button' value='click' onclick='fn()'> ( 仅仅click ) 
// a_inp("get item", "fn()"); 
function a_inp(value_s, onclick_s){
	var inp = cenode("input");
	inp.type = "button";
	inp.setAttribute("value", value_s);
	inp.setAttribute("onclick", onclick_s);		
    a_end(bodyn(), br(), inp, br());
}

function br(){ return enode("br"); }

//tool 12 
//add style属性css  id_style("test", "po:absolute");
function id_style(id_s, css_s){
	    var tag = id(id_s), arr = css_s.split(";");
	    tag.style.cssText += true_css(arr);
}

//tool 13 
//add rule css  
/*
			id_rule("test-1 width:10px");     (从上往下)顺序		
			id_rule("#test-1{width:10px}");   (从上往下)顺序
			id_rule(2, "#test-1{width:10px}");(从上往下)顺序
			id_rule(2, "test-1 width:10px");  (从上往下)顺序
			
*/
function id_rule(index, rule_s){
    var arg = arguments, sheet, rules_old, selector, arr;
	if(leng(arg)==2){ 
		index  = arg[0]; 
		rule_s = arg[1]; 
	}
	else{ 
		index  = 0; 
		rule_s = arg[0]; 
	}
	sheet     = styleSheet(index);
    rules_old = sheet.cssRules||sheet.rules;
	if(own(rule_s, "{")){
		selector = rule_s.slice(0, i(rule_s, "{"));
		arr      = rule_s.match(/(\{.+\})/g)[0].slice(1,-1).split(";");		
	}
    else{	
		selector = "#"+rule_s.slice(0, i(rule_s, " "));
		arr      = rule_s.slice(0, i(rule_s, " ")+1).split(";");
	}
	a_rule(sheet, selector+"{"+true_css(arr)+"}", rules_old.length);
}


//tool 37 
//<body> lv1 old_index之后 add   
/* 
			b_next("enode1", "label id=jj"); 
			b_next("enode1", enode);
*/
function b_next(old_index, one_node){
		var old = (is_string(old_index)) ? lv1e("body")[g_num(old_index)] : lv1("body")[old_index];
		a_next(old, node1(one_node));
}
//tool 6
//tool 9
//only two param
function each(tagNodeList, FN){
	for(var i=0; i<tagNodeList.length; i++){
		FN(tagNodeList[i], i);
	}
}
//tool 10
//can use four  param 
//can use three param 
function a_event(node, type, fn, bool_){
	var bool  = false, arg = arguments, len = arg.length;
    if(len == 4){ bool = arg[3]; }
	if(arg[0].addEventListener){arg[0].addEventListener(arg[1], arg[2], bool);} 
	else if(arg[0].attachEvent){arg[0].attachEvent("on"+arg[1], arg[2]);}
}
//tool 11 
//can use four  param 
//can use three param
function rmv_event(node, type, fn, bool_){
	var bool  = false, arg = arguments, len = arg.length;
	if(len == 4){ bool = arg[3]; }
	if(arg[0].removeEventListener){arg[0].removeEventListener(arg[1], arg[2], bool);} 
	else if(arg[0].detachEvent){arg[0].detachEvent("on"+arg[1], arg[2]);}
}
//tool 12 
//only one param
function preventDefault(event){
	if(event.preventDefault){event.preventDefault();}
	else{window.event.returnValue = false;}
}
function stopPropagation(event){
	if(event.stopPropagation){ event.stopPropagation() }
    else{ window.event.cancelBubble = true; }
}
//得到target
function g_target(event){
	if(event.target){return event.target;}
	else{return event.srcElement;}
}
//tool 13 
//not own param
function g_cookie() {
	var cookie = {};
	var all = document.cookie;
	if(all === '') {
		return cookie;
	}
	var list = all.split('; ');
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var p = item.indexOf('=');
		var name = item.substring(0, p);
		name = decodeURIComponent(name);
		var value = item.substring(p + 1);
		value = decodeURIComponent(value);
		cookie[name] = value;
	}
	return cookie;
}
//tool 14
//can use six   param
//can use two   param
//can use three param
//can use four  param
//can use five  param
function s_cookie (name, value, expires, path, domain, secure) {
	var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if(expires){
		cookie += '; expries=' + expires.toUTCString();
	}
	if(path){
		cookie += '; path=' + path;
	}
	if(domain){
		cookie += '; domain=' + domain;
	}
	if(secure){
		cookie += '; secure' + secure;
	}
	document.cookie = cookie;
}
//tool 15 
//three param
function rmv_cookie(name, path, domain) {
	document.cookie = name + '=' + '; path=' + path + '; domain=' + domain + '; max-age=0';
}
//tool 16
//not own param
function createXHR(){ 
		 var result;
		 if(window.XMLHttpRequest){result=new XMLHttpRequest();}//谷歌+火狐使用 	 
		 if(window.ActiveXObject){
			 //ie
			 var versions=['Microsoft.XMLHTTP','MSXML.XMLHTTP','Msxml2.XMLHTTP.7.0',
			               'Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0','Msxml2.XMLHTTP.4.0',
						   'MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP'
						  ];		  
			 for(var i=0;i<versions.length;i++){ 		 
				  result=new ActiveXObject(versions[i]);
				  //存在一个实例化对象 break停止
				  if(result){break;}
			}
		 }									   
		 if(result){return result;}
		 else{console.log("您的浏览器不支持创建XMLHttpRequest对象，创建失败");}	 			
	}
//tool 17
//three param
function get(url, options, callback){
		var xhr = createXHR();
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4) {
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
					   callback(xhr.responseText);
				}else{
					  console.error("Request was unsuccessful: " + xhr.status);
				}
			}
		};
		url = url + "?" + serialize(options);
		xhr.open("get", url, true);
		xhr.send(null);
}
//tool 18
// param obj  = {}; 
function serialize(data){
		if (!data) {return "";}
		var pairs = [];
		for (var name in data) {
			if (!data.hasOwnProperty(name)) {continue;}
			if (typeof data[name] === "function") {continue;}
			var value = data[name].toString();
			name  = encodeURIComponent(name);
			value = encodeURIComponent(value);
			pairs.push(name + '=' + value);
		}
		return pairs.join("&");
}
//tool 19
//three param
function post(url, options, callback){	
	var xhr = createXHR();
    //第二步绑定一个event	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
		   if((xhr.status>=200&&xhr.status<300)||xhr.status===304){
			   callback(xhr.responseText);												   }
		   else{
			   console.error('Request was unsuccessful: ' +xhr.status);
			   console.log("请求错误："+xhr.status+" "+xhr.statusText);
			   }
							  }
	 }//第二步 end 			    
	xhr.open('post', url, true);       //true 异步过程
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(serialize(options));	
 }
//tool 23 
//second param is 驼峰名字
//third  param is str_val
function s_dataset(node,string_tuofeng,string_value){
    var str4 = string_tuofeng;
    var reg1 = /[A-Z]/g; 
	if(reg1.test(str4)){//true至少有一个大写字母 驼峰名字
		var str4_1 = tuofengto(str4);
		var str4_2 = "data-"+str4_1;	
		node.setAttribute(str4_2, string_value);	
	}
	else{//false全部小写字母 
		var str5 = "data-"+str4;	
		node.setAttribute(str5, string_value);	
	} 
 }
//tool 24
//second param is 驼峰名字
function g_dataset(node, string_tuofeng){ 
		var str6 = string_tuofeng;
		var reg1 = /[A-Z]/g; 
		if(reg1.test(str6)){//true至少有一个大写字母 驼峰名字
			var str6_1 = tuofengto(str6);
			var str6_2 = "data-"+str6_1;	
			return node.getAttribute(str6_2);	
		}
		else{//全部小写字母
			var str3 = "data-"+str6;	
			return node.getAttribute(str3);	
		}		
}	
//tool 37 
//加载 慢
function onload(fn){
  a_event(window, "load", fn, false);
}
//tool 38 
//加载 更快
function domloaded(fn){
  a_event(document, "DOMContentLoaded", fn, false);
}    
//tool 44
function g_inner(enode){ return enode.innerHTML; }
//tool 45 
function show(tag){
	tag.style.visibility  = "visible";
}
//tool 46
function hide(tag){
	tag.style.visibility  = "hidden";   
}
//tool 47
//firefox 兼容 innerText
if (!('innerText' in document.body)) {
    HTMLElement.prototype.__defineGetter__('innerText', function () {
        return this.textContent;
    });
    HTMLElement.prototype.__defineSetter__('innerText', function (s) {
        return this.textContent = s;
    });
}
//create one ul-li 列表
function crt_ul_lis_obj(obj){
     var ultag = enode("ul id="+obj.ul.slice(1));
     var cdf = dfnode();
     var arr = obj.li;
     var len = leng(arr);
     for(let i=0;i<len;i++){
     	if(is_string(arr[i])){
     		var litag = enode("li");
     		a_txt(litag, arr[i]);
     		cdf.appendChild(litag);
     	}
     	else if(is_array(arr[i])){
     	  var inner = enode(arr[i][0]);
     	  var litag = enode("li");
     	  a_end(litag, inner);
     	  cdf.appendChild(litag);
     	}
     }
     a_end(ultag, cdf);
     b_end(ultag, br())
}
// create three ul-li 列表  obj1 obj2 obj3 
function crt_uls_lis_obj(){
        var arg = arguments, len = leng(arg);
        for(let i=0;i<len;i++){
        	crt_ul_lis_obj(arg[i]);
        }
}
          // l(nextAll(id('box1'), 2))   
          // l(nextAll(id('box1'), 2, 5))
          // l(nextAll(id('box1'), 2, -3))
function nextAll(){
	var arg = arguments, len1 = leng(arg), list = lv1e(arg[0]), len2 = leng(list);	
    if(len1==2){
    	if(arg[1]<0){ arg[1] = len2 + arg[1]; }
    	return clip_array(list, arg[1]);
    }
    if(len1==3){
    	if(arg[1]<0){ arg[1] = len2 + arg[1]; }
    	if(arg[2]<0){ arg[2] = len2 + arg[2]; }
    	if(arg[1]<0 && arg[2]<0){ 
    		  arg[1] = len2 + arg[1];
    		  arg[2] = len2 + arg[2];
    	}
    	return clip_array(list, arg[1], arg[2]);
    }    
}          
//截取 array 一部分
function clip_array(arr, start_index, last_index){
	    var arg = arguments, len1 = leng(arg), len2 = leng(arr),
	        array_new = [], index_start = arg[1],
	        index_last = (len1==3) ? arg[2] : (len2-1);
        for(let i=index_start;i<=index_last;i++){
        	   array_new.push(arr[i])
           }
           return array_new;
}

// ul_lis_not(ultag, [1,2,3,-1,-2]);
function ul_lis_not(ultag, arr){
         var list = lv1e(ultag),
         len1 = list.length,
         len2 = arr.length
         for(let i=0;i<len2;i++){
           if(arr[i]<0){
              arr[i] = len1 + arr[i];
           }
         }
         arr.sort((a, b) => b - a);//从大到小
         for(let j=0;j<len2;j++){
             list.splice(arr[j], 1);
         }
         return list;
}