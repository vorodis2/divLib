
/*

15  DCM  
385 DWindow
621 DColor
836 DComboBox
1115 DButton
1115 DGlow
1392 DCheckBox
1546 DPanel
1655 DImage
1767 DLabel
1888 DSlider

2139 DSliderBig
2270 DInput
2532 DTextArea
2719 DBitmapData
3129 DScrollBarH
3370 DScrollBarV
*/


import { DCont } from './DCont.js';



export function DCM () {	
	this.type="DCM";
	
	var self=this;

	this.wh=32;
	this._color="#008CBA";
	this._color1="#ffffff";
	this._colorText="#ffffff";
	this._colorText1="#999999";
	this._fontSize = 16;
	this._fontFamily = "Arial, Helvetica, sans-serif";
	this._otstup = 2;
	this._boolLine=true;

	this.borderRadius=0;
	
	this.mobile=false;

	this.dragNotEvent=false;

	this.array=[]
	this.add=function(comp){
		this.array.push(comp)
	}

	//this.textarea = document.createElement('input')	
	this.input = document.createElement('input')
  	this.input.type = 'text';
  	this.input.value="xz"
	this.input.style.position = 'fixed';
	this.input.style.top = '-50px';  	
  	document.body.appendChild(self.input);  		
  	this.activInp=undefined	
	this.ctrlCV=new CtrlCV();

	this.textarea = document.createElement('textarea');
	/*this.textarea.style.position = 'fixed';
	this.textarea.style.top = '650px'; */
	

	var style = document.createElement('style');
	style.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(style);

	var style1 = document.createElement('style');
	style1.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(style1);


	this.hexDec = function (h) {	
		var m=h.slice(1).match(/.{2}/g);		 
		m[0]=parseInt(m[0], 16);
		m[1]=parseInt(m[1], 16);
		m[2]=parseInt(m[2], 16);
		return m;
 	};

 	this.compToHexArray = function (a, num) {
 		if(num!=undefined)
 		for (var i = 0; i < a.length; i++) {
 			a[i]+=num;
 			if(a[i]<0)a[i]=0;
 			if(a[i]>255)a[i]=255;
 		}
	 	return '#' + this.compToHex(a[0]) + this.compToHex(a[1]) + this.compToHex(a[2]);
	}

	this.isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {

			let r = navigator.userAgent.match(/iPhone|iPad|iPod/i);
	        if(r==null ){
	            if(navigator.userAgent.match(/Mac OS/i)!=null){
	                if(window.matchMedia("(any-pointer:coarse)").matches==true){
	                    r="Mac Заебали менять апи";
	                }
	            }
	        }
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (self.isMobile.Android() || self.isMobile.BlackBerry() || self.isMobile.iOS() || self.isMobile.Opera() || self.isMobile.Windows());
		}
	};
	if(this.isMobile.any()!=null)this.mobile=true;
	this.newTest=11	
	/*if(this.mobile==false){		
		var result = window.matchMedia("(any-pointer:coarse)").matches;
		if(result==true){
			this.mobile=true;
		}
	}*/
	
	
	this.isIE=false;
	
	if (navigator.userAgent.indexOf('MSIE') !== -1 ||navigator.appVersion.indexOf('Trident/') > 0) {
		this.isIE=true;
	}


	if(this.mobile==false){
		document.body.addEventListener('mouseup', function() {
			setTimeout(function() {
				if(self.activInp){
					self.activInp=undefined					
					return;
				}
				self.input.focus();
			}, 1);		
		});
	}


	/*this.dCT= document.createElement('div');
	this.dCT.style.position = 'fixed';
	this.dCT.style.top = '0px';
	this.dCT.style.left = '0px';

	document.body.appendChild(this.dCT);
  	this.dCT.appendChild(self.textarea); */

	this.compToHex = function (c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};

	this.corectForBtn = function (_val) {
		var m=[];
		m[0] = Math.floor(_val / (256 * 256));
		m[1] = Math.floor(_val / 256) % 256;
		m[2] = _val % 256;
		return m;		
	};

	this.parseColor = function (color) {
        var cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);
        return {r: parseInt(cache[1], 16), g: parseInt(cache[2], 16), b: parseInt(cache[3], 16)};
    }

	this.colorPolit="null";
	this.bmp=new DBitmapData(2,2)
	this.getPolit=function(){
		if(this.colorPolit!="null")return this.colorPolit;
		this.canvas = document.createElement("canvas");
		this.c2d = this.canvas.getContext("2d");

	    this.hue = [
	        ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
	        ['#FFFAFA', '#FFFFFA', '#FFFFFA', '#FAFFFF', '#FAFFFF', '#FFFAFF', '#FFFAFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
	        ['#FFC2C2', '#FFFFC2', '#F9FFC2', '#C2FFFF', '#C2FFFF', '#FFC2FF', '#FFC2FF', '#FFF1F1', '#FFFFFF', '#D1D1D1', '#D1D1D1'],
	        ['#FF8A8A', '#FFFF8A', '#C1FF8A', '#8AFFFF', '#8AFFFF', '#F18AFF', '#FF8AFF', '#FFB9B9', '#FFFFFF', '#999999', '#999999'],
	        ['#FF5151', '#FFFF51', '#88FF51', '#51FFF8', '#51C8FF', '#B851FF', '#FF51FF', '#FF8080', '#FFFFFF', '#606060', '#606060'],
	        ['#FF1919', '#FFFF19', '#50FF19', '#19FFC0', '#1990FF', '#8019FF', '#FF19D0', '#FF4848', '#FFFFFF', '#282828', '#282828'],
	        ['#E10000', '#E1CA00', '#30E100', '#00E193', '#0069E1', '#5A00E1', '#E100A1', '#E12929', '#D2D2D2', '#0D0D0D', '#0D0D0D'],
	        ['#A80000', '#A89700', '#24A800', '#00A86E', '#004EA8', '#4300A8', '#A80078', '#A81E1E', '#9D9D9D', '#090909', '#090909'],
	        ['#700000', '#706500', '#187000', '#007049', '#003470', '#2D0070', '#700050', '#701414', '#686868', '#060606', '#060606'],
	        ['#380000', '#383200', '#0C3800', '#003824', '#001A38', '#160038', '#380028', '#380A0A', '#343434', '#030303', '#030303'],
	        ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000']
	    ];

	    this.wX = 11;
	    this.canvas.width = (this.hue[0].length-1) * this.wX;
	    this.canvas.height = (this.hue.length-1) * this.wX;

	    this._wColor;
	    this._wColor1;
	    var i, j, k;
	    this._hColor;
	    this._hColor1;
	    this._rr;
	    this._gg;
	    this._bb;
	    this.colorA;
	    this.colorB;
	    
	    for (i = 0; i < this.hue.length - 1; i++) {
	        for (j = 0; j < this.hue[i].length - 1; j++) {
	            this._wColor = this.parseColor(this.hue[i][j]);
	            this._wColor1 = this.parseColor(this.hue[i][j + 1]);

	            this._hColor = this.parseColor(this.hue[i + 1][j]);
	            this._hColor1 = this.parseColor(this.hue[i + 1][j + 1]);

	            for (k = 0; k < this.wX; k++) {
	                this._rr = this._wColor.r + Math.round((this._wColor1.r - this._wColor.r) * (k / (this.wX - 1)));
	                this._gg = this._wColor.g + Math.round((this._wColor1.g - this._wColor.g) * (k / (this.wX - 1)));
	                this._bb = this._wColor.b + Math.round((this._wColor1.b - this._wColor.b) * (k / (this.wX - 1)));
	                this.colorA = 'rgb(' + this._rr + ',' + this._gg + ',' + this._bb + ')';

	                this._rr = this._hColor.r + Math.round((this._hColor1.r - this._hColor.r) * (k / (this.wX - 1)));
	                this._gg = this._hColor.g + Math.round((this._hColor1.g - this._hColor.g) * (k / (this.wX - 1)));
	                this._bb = this._hColor.b + Math.round((this._hColor1.b - this._hColor.b) * (k / (this.wX - 1)));
	                this.colorB = 'rgb(' + this._rr + ',' + this._gg + ',' + this._bb + ')';

	                this.grd = this.c2d.createLinearGradient(0, this.wX * i, 0, this.wX * i + this.wX); //direction
	                this.grd.addColorStop(0, this.colorA);
	                this.grd.addColorStop(1, this.colorB);
	                this.c2d.fillStyle = this.grd;
	                this.c2d.fillRect(j * this.wX + k, this.wX * i, 1, this.wX);
	            }
	        }
	    }
	    this.bmp.width = Math.floor(this.canvas.width); 
        this.bmp.height = Math.floor(this.canvas.height);
	    this.bmp.setCanvas(this.canvas, this.c2d);
	    this.colorPolit=this.canvas.toDataURL()
	    return this.colorPolit;	
	}

	


	this.arrFun=[]
	this.removeFunMove=function(fun){
		for(let i=this.arrFun.length-1;i>=0;i--){
			if(this.arrFun[i]===fun){
				this.arrFun.splice(i,1)
				
			}
		}
	}
	this.addFunMove=function(fun){
		this.removeFunMove(fun);
		this.arrFun.push(fun);
	}

	this.globXY={x:0,y:0};

	this.mousemove=function(e){
		for (let i = 0; i < self.arrFun.length; i++) {
			self.arrFun[i](e);
		}
		if(self.mobile==false){
            self.globXY.x=e.clientX;
            self.globXY.y=e.clientY;
               
        }else{
        	if(e.touches&&e.touches[0]){
        		self.globXY.x=e.touches[0].clientX;
            	self.globXY.y=e.touches[0].clientY;
        	}
        	
            
        }
	}
	this.getFunMouseMove=function(){
		if(self.mobile==false){
			document.removeEventListener("mousemove", self.mousemove);		
		}else{
			document.removeEventListener("touchmove", self.mousemove);
		}
		return self.mousemove;
	}

	if(this.mobile==false){
		document.addEventListener("mousemove", self.mousemove);		
	}else{
		document.addEventListener("touchmove", self.mousemove);
	}

	global.dcmParam=this






	this.mouseup = function(e){
		document.body.style.pointerEvents='auto'		
		if(self.mobile==false){  				
			document.removeEventListener("mouseup", self.mouseup);
		}else{  				
			document.removeEventListener("touchend", self.mouseup);	
		} 	
	}

	this.mousedown=function(e){		
		if(e.target&&e.target.value!=undefined){
			return		
		}
		document.body.style.pointerEvents="none";		
		if(self.mobile==false){  				
			document.addEventListener("mouseup", self.mouseup);
		}else{  				
			document.addEventListener("mouseup", self.mouseup);  				
		}  
	}	

	

	this.addFunNotActivDiv=function(div){
		let dd=null;
		if(div!=undefined){
			if(div.addEventListener!=undefined){
				dd=div
			}else{
				if(div.div!=undefined && div.div.addEventListener!=undefined)dd=div.div
			}
		}
		
		if(dd==null){
			console.warn("тама некуда прикрепить событие ",div)
			return
		}
		if(this.mobile==false){  				
			dd.addEventListener("mousedown", this.mousedown);
		}else{  				
			dd.addEventListener("mousedown", this.mousedown);  				
		}		
	}

	this.remuveFunNotActivDiv=function(div){
		if(this.mobile==false){  				
			div.removeEventListener("mousedown", this.mousedown);
		}else{  				
			div.removeEventListener("mousedown", this.mousedown);  				
		}
	}

}

Object.defineProperties(DCM.prototype, {    
   
    color: {
        set: function (value) {
            this._color = value; 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].color!=undefined)this.array[i].color=this._color;
            }   
      
        },
        get: function () {
            return this._color;
        }
    },

    color1: {
        set: function (value) {
            this._color1 = value; 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].color1!=undefined)this.array[i].color1=this._color1;
            }
      
        },
        get: function () {
            return this._color1;
        }
    },

    colorText: {
        set: function (value) {
            this._colorText = value; 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].colorText!=undefined)this.array[i].colorText=this._colorText;
            }           
        },
        get: function () {
            return this._colorText;
        }
    },

    colorText1: {
        set: function (value) {
            this._colorText1 = value; 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].colorText1!=undefined)this.array[i].colorText1=this._colorText1;
            }           
        },
        get: function () {
            return this._colorText1;
        }
    },

    fontSize: {
        set: function (value) {
            this._fontSize = value; 
           
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].fontSize!=undefined)this.array[i].fontSize=this._fontSize;
            }           
        },
        get: function () {
            return this._fontSize;
        }
    },

    fontFamily: {
        set: function (value) {
            this._fontFamily = value; 

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].fontFamily!=undefined)this.array[i].fontFamily=this._fontFamily;
            }           
        },
        get: function () {
            return this._fontFamily;
        }
    },
})



export class DWindow extends DCont {
  	constructor(dCont, _x, _y, _text, _fun) {
  		super(); 
  		this.type="DWindow";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		
  		var self=this;
  		this.fun=_fun;	
  		this.x=_x||0;	
  		this.y=_y||0;
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
  		this._width=100;
  		this._height=100;
  		this._color=dcmParam._color;
  		this._color1=dcmParam._color1;
  		this._wh=dcmParam.wh;

  		this._borderRadius = dcmParam._fontSize;

 		this._minimize = false; // спрятать низ или открыть по ум открыто	
	    this._hasMinimizeButton = false; // кнопочка для спрятать
	    this._dragBool = true;	
	    this._activMouse = true; 
  		this._text="nullMMy";
  		this._title="nullMMy";
  		this.textPlus="";  		
  		this.panel=new DPanel(this,0,0)

  		this.button=new DButton(this,0,0," ");
  		this.button.fun_mousedown=function(){
  			if( self._dragBool != false){
  				self.startDrag();
  			}
  		}

  		this.buttonMin=new DButton(this,0,0," ",function(){  			
  			self.minimize=!self.minimize;
  			if(self.fun)self.fun()
  		});	

  		this.button.textAlign = "left";//"center"//  		
  		this.buttonMin.textAlign = "left";//"center"//  

  		this.content=new DCont(this);
  		this.content.y=this._wh;

		this.buttonMin.width=this._wh;
		this.buttonMin.visible=!this._hasMinimizeButton;
		this.buttonMin.alpha=0
		var c=dcmParam.compToHexArray(dcmParam.hexDec(this._color), -50);  		
  		this.button.color= c; 
  		this.button.object.style.textAlign = 'left';


  		this.fubDrag=undefined
  		var sp=undefined;	
  		this.scaleBig=1
  		this.mouseup = function(e){
  			sp=undefined;
  			if(dcmParam.mobile==false){  				
  				document.removeEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.removeEventListener("touchend", self.mouseup);
  		
  			}  
  			dcmParam.removeFunMove(self.mousemove);		
  		}

  		this.mousemove = function(e){  			
  			if(dcmParam.mobile==false){
	  			if(sp==undefined){
	  				sp={
	  					x:e.clientX,
	  					y:e.clientY,
	  					x1:self.x,
	  					y1:self.y
	  				};
	  			}
	  			var ss=sp.x1+(e.clientX-sp.x)/self.scaleDrag.s;  			
	  			self.x=ss;
	  			var ss=sp.y1+(e.clientY-sp.y)/self.scaleDrag.s; 			
	  			self.y=ss;
	  		}else{
	  			if(sp==undefined){
	  				sp={
	  					x:e.targetTouches[0].clientX,
	  					y:e.targetTouches[0].clientY,
	  					x1:self.x,
	  					y1:self.y
	  				};
	  			}
	  			var ss=sp.x1+(e.targetTouches[0].clientX-sp.x)/self.scaleDrag.s;  			
	  			self.x=ss;
	  			var ss=sp.y1+(e.targetTouches[0].clientY-sp.y)/self.scaleDrag.s;  			
	  			self.y=ss;	  			
	  		}
	  		
	  		if(self.fubDrag!=undefined)self.fubDrag();
  		}

  		this.startDrag = function(){
  			this.scaleDrag.s=this.scale
  			this.testScale(this,this.scaleDrag)
  			if(dcmParam.mobile==false){  				
  				document.addEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.addEventListener("touchend", self.mouseup);  				
  			}  
  			dcmParam.addFunMove(self.mousemove);				
  		}

  		this.testScale = function (c,o) { 		
  			if(c.scale)o.s*=c.scale;
  			if(c.parent){
  				self.testScale(c.parent,o)
  			}
    	}
  		this.scaleDrag={s:1}


  		this._width--;
  		this._height--;

  		dcmParam.add(this);
  		this.width=this._width+1;
  		this.height=this._height+1;
  		this.text=_text||"null";
  		this.hasMinimizeButton=true
  	}

  	set borderRadius(value) {
		if(this._borderRadius!=value){
			this._borderRadius = value;
			this.buttonMin.borderRadius = value;
			this.button.borderRadius = value;
			this.panel.borderRadius = value;
		}
	}	
	get borderRadius() {return  this._borderRadius;}

  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.panel.width = value;
			this.button.width = value;
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
			this.panel.height = this._height;
		}		
	}	
	get height() { return  this._height;}

	set color(value) {
		if(this._color!=value){
			this._color = value;
			var c=dcmParam.compToHexArray(dcmParam.hexDec(this._color), -50);  		
  			this.button.color= c; 	
		}
	}	
	get color() { 	return  this._color;}

	set text(value) {
		this._text = value;	
		this._title=value;	
		this.button.text=this.textPlus+" "+value;		
	}	
	get text() {return  this._text;}

	set title(value) {		
		this._title = value;
		this.text=value;			
	}	
	get title() { return  this._title;}	

	set minimize(value) {
		if(this._minimize!=value){
			this._minimize = value;
			if(this._hasMinimizeButton==true){
				if(this._minimize==true){
					this.textPlus="►  ";
				}else{
					this.textPlus="▼  ";
				}
				this.text=this._text;
			}			
			this.content.visible=!this._minimize;
			this.panel.visible=!this._minimize;			
		}
	}	
	get minimize() { return  this._minimize;}

	set hasMinimizeButton(value) {
		if(this._hasMinimizeButton!=value){
			this._hasMinimizeButton = value;			
			this.buttonMin.visible=this._hasMinimizeButton;
			if(value==true){
				if(this._minimize==true){
					this.textPlus="►  ";
				}else{
					this.textPlus="▼  ";
				}
				
			}else{
				this.textPlus="";
			}
			this.text=this._text;
		}
	}	
	get hasMinimizeButton() { return  this._hasMinimizeButton;}

	set dragBool(value) {
		if(this._dragBool!=value){
			this._dragBool = value;
			if(value){
				this.button.object.style.cursor="pointer";
			}else{
				this.button.object.style.cursor="auto";
			}			
		}
	}	
	get dragBool() { return  this._dragBool;}

	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;
		    this.button.activMouse = value;			  		        
		}		
	}
  	get activMouse() { return  this._activMouse;}
}





export class DColor extends DCont {
constructor(dCont,_x,_y, _color, _fun) {
  		super(); 
  		this.type="DColor";		
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		
  		var self=this;
  		this.x=_x||0;	
  		this.y=_y||0;
  		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
   		this._color=_color||"#ffffff";
   		this.fun=_fun;

   		this._text=undefined;
   		this._borderRadius=dcmParam.borderRadius
   		this.fun_mousemove=undefined;   		
  		this._width=100;
  		this._otstup=dcmParam._otstup;
  		this._height=dcmParam.wh;
  		this._openBool=false;
  		this._activMouse=true
		var boolOp=true

  		this.panel=new DPanel(this);
  		this.button=new DButton(this,this._otstup,this._otstup," ",function(){  			
  			if(boolOp==false)return;
  			if(self.openBool==false)self.openBool=true;  			
  		});

  		this.button.fun_mouseup=function(){
			
  		}

  		this.input=new DInput(this,this._otstup,this._otstup,this._color,function(){
  			self.color=this.value;
  			if(self.fun)self.fun();
  		});

  		this.image=new DImage(this,this._otstup,this._height, dcmParam.getPolit(),function(){  			
  			 
  		})	

  		this.label=undefined;
  		this.image.visible=false;
  		this.panel.width=this._width;
  		this.panel.height=this._height;
  		this.button.width=this.button.height=this._height-this._otstup*2;
  		this.input.width=this.input.height=this._height-this._otstup*2;
  		this.button.color=this._color;


  		this.getBigPar=function(o, p){
  			if(o.parent==undefined)return o;
  			p.x+=o.position._x;
  			p.y+=o.position._y;
			if(o.parent.scale!=1) return o.parent;  			
  			return this.getBigPar(o.parent, p);
  		}

  		var oldParent, nP;
  		var oo={x:0,y:0}
  		var oo1={x:0,y:0}
  		var oldScale
  		this.dragMenu=function(){
  			this.image.visible=this._openBool;
  			if(this._openBool==true){  				
				self.scaleDrag.s=1
  				self.testScale(self,self.scaleDrag)  				
  				oldScale=self.scale;
  				oo.x=this._otstup;
  				oo.y=this._height;
  				oo1.x=0
  				oo1.y=0

  				nP=this.getBigPar(this.image, oo1);
  				cOld=self._color;
  				this.panel.height=this._height+100+this._otstup;
  				nP.add(this.image);
  				this.image.x=oo1.x;
  				this.image.y=oo1.y;
  				document.addEventListener("mousedown", this.upBody)
  			}else{
  				this.panel.height=this._height;
  				this.add(this.image);
  				this.image.x=oo.x;
  				this.image.y=oo.y;
  				this.scale=1;
  			}
  		}

  		this.upBody=function(e){
  			document.removeEventListener("mousedown", self.upBody)
  			self.openBool=false;
  			boolOp=false

  			setTimeout(function() {
  				boolOp=true
  			}, 100);
  		}

  		this.image.image.addEventListener("mouseout", function(){
  			self.color=cOld;  			
  		})

  		var _x,_xx, a, c, cOld
		this.image.image.addEventListener("mousemove", function(e){					
			_x=Math.round((e.offsetX/self.image.width)*dcmParam.bmp.width)
			if(_x>dcmParam.bmp.width)_x=dcmParam.bmp.width;

			_y=Math.round((e.offsetY/self.image.height)*dcmParam.bmp.height)
			if(_y>dcmParam.bmp.height)_y=dcmParam.bmp.height;
			a= dcmParam.bmp.getPixel(_x, _y);
			c= dcmParam.compToHexArray(a);			
			self.color=c;
			if(self.fun_mousemove){
				self.fun_mousemove()
			}
		})



		this.image.image.addEventListener("mousedown", function(e){	
			cOld=c;
			self.color=c;
			self.openBool=false;
			if(self.fun)self.fun();
		})

		this.testScale = function (c,o) { 		
  			if(c.scale)o.s*=c.scale;
  			if(c.parent){
  				self.testScale(c.parent,o)
  			}
    	}
  		this.scaleDrag={s:1}
  		this._width--;
  		this.width=this._width+1;  		
  	}

  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;			
			this.button.x=this._width-this._otstup-this.button._width;
			this.panel.width=this._width;			
			this.image.width=this._width-this._otstup*2;
			var ww=this.button.x-this._otstup*2;
			if(this.label==undefined){
				this.input.width=this.button.x-this._otstup*2;
				this.input.x=this._otstup
			}else{
				this.input.width=(ww)/2
				this.input.x=this._otstup+(ww)/2;
			}
			
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height= value;				
		}		
	}	
	get height() { return  this._height;}


	set activMouse(value) {
		if(this._activMouse!=value){
			this._activMouse = value;
			this.input.activMouse=value
			this.button.activMouse=value
		}
	}	
	get activMouse() { return  this._activMouse;}



	set borderRadius(value) {
		if(this._borderRadius!=value){
			this._borderRadius = value;
			this.input.borderRadius = value;		
			this.panel.borderRadius = value;
			this.button.borderRadius = value;
		}
	}	
	get borderRadius() { return  this._borderRadius;}

	set color(value) {
		if(this._color!=value){
			this._color = value;
			this._value = value;
			this.input.text=this._color;
			this.button.color=this._color;
		}
	}	
	get color() { return  this._color;	}

	set value(v) {
		if(this._color!=v){			
			this.color=v;
		}
	}	
	get value() {return  this._color;}
	
	set text(value) {		
		if(this._text != value){			
			this._text = value;
			if(this.label==undefined){
				this.label= new DLabel(this,this._otstup,13,this._text)
			}
			this.label.text=this._text;
			this._width--;
			this.width=this._width+1;			
		}
		
	}	
	get text() { return  this._text;}

	set openBool(value) {
		if(this._openBool != value){
			this._openBool = value;
			this.dragMenu()
		}
		
	}	
	get openBool() { return  this._openBool;}	
}



export class DComboBox extends DCont {
  	constructor(dCont, _x, _y, _arr, _fun, _link) {
  		super(); 
  		this.type="DComboBox";
  		this.dcmParam=dcmParam; 
  		this.dcmParam.add(this)
  		var self=this
  		this.x=_x||0;	
  		this.y=_y||0;
   		this._array=_arr||["null"];
   		this._valueS=_arr||["null"];

   		this.fun=_fun;

   		this.fun_mouseover=undefined;
   		this.fun_mouseout=undefined;
   		this.fun_mousedown=undefined;
   		this.funDownFile=undefined;

   		this._borderRadius=dcmParam.borderRadius;
  		this._width=100;
  		this._height=dcmParam.wh;
  		this._color1=dcmParam._color1;
  		this._colorText1=dcmParam._colorText1;
  		this._fontSize=dcmParam._fontSize;

   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
   		this.object=document.createElement('select');   	
		if(dcmParam.isIE==false)this.object.style.position = 'fixed';
		this.object.style.top = '0px';
		this.object.style.left = '0px';
		this.object.style.background=this._color1;
		this.object.style.color=this._colorText1;
		this.object.style.fontSize= this._fontSize+'px';
		this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -20);//"none";
		this.object.style.display="inline-block";
		this.object.style.fontFamily= dcmParam._fontFamily;
		this.object.style.borderRadius=this._borderRadius+"px";

		this.div.appendChild(this.object);
		this.object.style.width=this._width+"px";
		this.object.style.height=this._height+"px";

		this.object.onchange=function(e){			
			self.index=self.object.value;
			if(self.fun)self.fun();
		}

		self.mousedown=function(){			
			dcmParam.activInp = self;
		}

		if(dcmParam.mobile==false){
			this.object.addEventListener("mousedown", self.mousedown)
		}else{
			this.object.addEventListener("touchstart", self.mousedown)
		}

		this.image=undefined;
		this.reDrag=function(){
			this.object.style.width=this._width+"px";
			this.object.style.height=this._height+"px";			
		}				
		this.array=this._array;	
		this.valueS=this._valueS;		
  	}

  	set valueS(value) {		
		this._valueS = value;				
	}	
	get valueS() { return  this._valueS;}

  	set array(value) {		
		this._array = value;
		this.object.options.length=this._array.length;
		for (var i = 0; i < this.object.options.length; i++) {
			this.object.options[i].text=this._array[i]
			this.object.options[i].value=i
		}
		this.index=0;		
		this.reDrag();		
	}	
	get array() { return  this._array;}

	set borderRadius(value) {
		if(this._borderRadius!=value){
			this._borderRadius = value;
			this.object.style.borderRadius=this._borderRadius+"px";	
			
		}
	}	
	get borderRadius() { return  this._borderRadius;}


  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.reDrag();
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
			this.reDrag()
		}		
	}	
	get height() { return  this._height;}


	set index(value) {
		this._index = value;
		if(this._valueS[value]!=undefined)this._value=this._valueS[value];			
		this.object.value=this._index;
	}	
	get index() { return  this._index;}

	set value(v) {		
		this._value = v;
		for (var i = 0; i < this._valueS.length; i++) {
			if(this._valueS[i]==v){
				this.index=i;
			}
		}		
	}	
	get value() { return  this._value;}

	set fontSize(value) {
		if(this._fontSize!=value){
			this._fontSize = value;
			this.object.style.fontSize = value+"px";
		}
	}	
	get fontSize() { return  this._fontSize; }

	set color1(value) {
		if(this._color1!=value){
			this._color1 = value;			
			this.object.style.background = this._color1;	
			this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -20);
		}
	}	
	get color1() { 	return  this._color1;}

	set colorText1(value) {
		if(this._colorText1!=value){				
			this._colorText1 = value;
			this.object.style.color=this._colorText1;
		}
	}	
	get colorText1() { 	return  this._colorText1;}

	set borderRadius(value) {
		if(this._borderRadius!=value){				
			this._borderRadius = value;
			this.object.style.borderRadius=this._borderRadius+"px";
			this.object.style.webkitBorderRadius =this._borderRadius+"px";
    		this.object.style.mozBorderRadius =this._borderRadius+"px";
		}
	}	
	get borderRadius() { return  this._borderRadius;}

	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				this.alpha=1;
				this.object.style.pointerEvents=null;	
		    }else{
		    	this.alpha=0.7;		    	
		    	this.object.style.pointerEvents="none";	
		    }		        
		}		
	}
  	get activMouse() { return  this._activMouse;}
}



//////////////////////////////////////

export class DButton extends DCont {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super(); 
        this.type="DButton";
        this.dcmParam=dcmParam; 
        this.dcmParam.add(this)
        var self=this
       
        this._text=_text||"null";
        this.fun=_fun;
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
        this.x=_x||0;   
        this.y=_y||0;

        this.fun_mouseover=undefined;
        this.fun_mouseout=undefined;
        this.fun_mousedown=undefined;
        this.fun_mouseup=undefined;
        this.funDownFile=undefined;
        this.funReDrag=undefined;
        this._activMouse=true
        this._textAlign = "center";

		this._glowColor="#000000";
		this.aC=[1,1,1]
		this._glowSah=0;
        

        this._width=100;
        this._height=dcmParam.wh;
        this._color=dcmParam._color;
        this._colorText=dcmParam._colorText;
        this._fontSize=dcmParam._fontSize;
        this._fontFamily=dcmParam._fontFamily;
        this._borderRadius=0;
        this._boolLine=dcmParam._boolLine;
        this._boolFond=true;

        this.alphaTeni=0.1;

        this.aSah=1;
        this.alphaAnimat=true;

        this.object={}
        this.object.style={}


		this.dCont=new DCont(this)
		this.dContC=new DCont(this.dCont)


        this.panel1=new DPanel(this.dCont, 0, 0)
        this.panel1.width=this._width+1;
        this.panel1.height=this._height+1;
        this.panel1.color1=this._color


        this.panel=new DPanel(this.dCont, 2, 2)
        this.panel.width=this._width-1;
        this.panel.height=this._height-1;
        this.panel.color1=this._color;
        this.panel.div.style.pointerEvents="none";
        this.panel.boolLine=false



       // this.panel1.alpha=0

        
        this.panel.div.style.borderRadius=this._borderRadius+"px";
        this.panel1.div.style.borderRadius=this._borderRadius+"px";

        this.label=new DLabel(this.dCont, 5, (this._height-this._fontSize)/2,_text);    
        this.label.div.style.pointerEvents="none";

        this.label.color=this._colorText;
        this.label.textAlign = this.textAlign;
        this.panel1.div.style.cursor="pointer";
        this.label.fontFamily= this._fontFamily;
 


        this.mouseup2=function(){
			
			self.file.value = null;
            self.file.click();                		
            if (self.funDownFile)self.funDownFile();
            document.removeEventListener("touchend", self.mouseup2);  	

        }



        this.eventOriginal=undefined
        this.mousedown=function(e){ 
        	self.eventOriginal=e
        	if(self._activMouse==false )return        	
            if (self.file != undefined) {            	
                self.file.value = null;
                self.file.click();
                if (self.funDownFile)self.funDownFile();

	            if(dcmParam.mobile==true){  				  				
	  				document.addEventListener("touchend", self.mouseup2);  				
	  			}
                return;
            }
            bb=false;
            self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -20)  
            self.panel1.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -40)
            document.body.style.pointerEvents="none";
            
            if(self.fun_mousedown)self.fun_mousedown()
         	if(dcmParam.mobile==false){	 			
  				document.addEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.addEventListener("touchend", self.mouseup);  				
  			} 
        }

        var bb=true
        this.mouseup=function(e){       	

        	bb=true
        	self.panel.color1=self._color;
            self.panel1.color1=self._color;
            document.body.style.pointerEvents=null;
        	if(dcmParam.mobile==false){	 			
  				document.removeEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.removeEventListener("touchend", self.mouseup);  				
  			}

  			if(self.fun)self.fun();
        }






        var timerId
        this.dragIcontime=function(){
            self.dCont.alpha=self.aSah;
            if(self.aSah>1){
                self.aSah=1;
                if(timerId!=undefined){
                    clearInterval(timerId);
                    timerId=undefined                   
                }
                return
            }

            if(timerId==undefined){
                timerId = setInterval(this.dragIcontime, 10)
            }else{
                self.aSah+=0.01;
            }            
        }


        this.dragIcon=function(){             
            if(this.alphaAnimat==true){
                if(this.aSah==1){                   
                    this.aSah=0.5;
                    this.dragIcontime();
                }
            }
        }



        this.mouseover=function(){  
        	if(self._activMouse==false )return         
            if(bb==true){            	
            	self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -20)  
            	self.panel1.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -20) 
            }
            

                        
            if(self.fun_mouseover)self.fun_mouseover();

        }    
        this.mouseout=function(){
        	if(self._activMouse==false )return   
        	if(bb==true){            	
            	self.panel.color1=self._color;
            	self.panel1.color1=self._color;  
            }     
            //self.panel1.alpha=0 
     		//this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);
       
            if(self.fun_mouseout)self.fun_mouseout();
        }       


        if(dcmParam.mobile==false){
            this.panel1.div.addEventListener("mousedown", self.mousedown)
            this.panel1.div.addEventListener("mouseover", self.mouseover)
            this.panel1.div.addEventListener("mouseout", self.mouseout)
        }else{
            this.panel1.div.addEventListener("touchstart", self.mousedown)
        }

        this.boolDrahVert=true
        var sp=5
        var ww,ww1
        this.image=undefined;
        this.reDrag=function(){
            this.panel.width=this._width-1;
            this.panel1.width=this._width+1;

            this.panel.height=this._height-1;
            this.panel1.height=this._height+1;
            
           
            sp=5
            var s
            if(this.image!=undefined){
                
                s=this._height/this.image.picHeight;
                if(this._width/this.image.picWidth<s)s=this._width/this.image.picWidth

                this.image.height=this.image.picHeight*s;
                this.image.width=this.image.picWidth*s;                 
                sp=this.image.width+5
                if(self.label.value.length>=1){
                	this.image.x= 0;          
                	this.image.y= 0;                 	
                }else{
                	this.image.x= (this._width-this.image.width)/2;          
                	this.image.y= (this._height-this.image.height)/2;
                }       
            }
            let b=true;

            if(this.image!=undefined){
            	if(this._height>self.label.fontSize*3){
            		if(self.label.value.length>=1){
            			b=false;
            		}            		
            	}
            }
            if(this.boolDrahVert==false)b=true;
           
            if(b){
            	this.label.width=this._width-sp;
            	self.label.y = (this._height-this._fontSize)/2
				self.label.x = sp;
            }else{

            	s=(this._height-self.label.fontSize*2)/this.image.picHeight;
                if(this._width/this.image.picWidth<s)s=this._width/this.image.picWidth

                this.image.height=this.image.picHeight*s;
                this.image.width=this.image.picWidth*s; 

                this.image.x= (this._width-this.image.width)/2;
                this.image.y= 0 ; 

                this.label.width=this._width;
                self.label.y = this._height-this._fontSize*1.5
				self.label.x = 0;
                	
            	
            }	
            
			this.dragCanvas();
			if(this.funReDrag!=undefined)this.funReDrag()
        }




        this.file;
        this.startFile = function (accept) {
            if (this.file == undefined) {
                this.file = document.createElement('input');
                this.file.type = 'file';
                this.file.multiple=true;
                if (accept) this.file.accept = accept;// "image/*";
                this.file.style.display = 'none';
                this.file.onchange = this.onchange;
            }
        };
        this.result;
        this.files;// files
        this.onchange = function (e) {
            if (e.target.files.length == 0) return;// нечего не выбрали
            self.files = e.target.files;            
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function (_e) {             
                self.result = _e.target.result;
                if (self.fun) self.fun(self.result);                           
            };
        };
        
        this.funLoadImag=undefined;
        this._link="null";
        this.loadImeg=function(s){
            this._link=s;
            if(this.image==undefined){
               // this.panel1.parent.remove(this.panel1);
                this.image=new DImage(this.dCont, 0,0,null,function(){
                    
                    self.reDrag();
                    if(self.funLoadImag!=undefined)self.funLoadImag()

                })
                this.image.div.style.pointerEvents="none";
                //this.add(this.panel1);/**/

            }
            this.image.link=this._link;
        }  
        if(_link!=undefined)this.loadImeg(_link)       
        this.borderRadius=dcmParam.borderRadius;




		this.rectPlus={x:0,y:0,w:0,h:0}
    	this.canvas = undefined// document.createElement('canvas');
		this.ctx = undefined// canvas.getContext('2d');
    	this.dragCanvas=function(){
  			if(this.canvas==undefined)return

  			this.canvas.width = (this.width+this.rectPlus.w)+this._glowSah*4;
        	this.canvas.height = (this.height+this.rectPlus.h)+this._glowSah*4;	
  			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  			if(this._glowSah==0)return
  			this.ctx.filter = 'blur('+this._glowSah+'px)';
  			this.ctx.fillStyle =this._glowColor; 

  	

			let rr=this._borderRadius
			roundRect(this.ctx, this._glowSah*2, this._glowSah*2, this.width, this.height,rr);
			this.ctx.fillStyle = this._glowColor;
      		this.ctx.fill(); 	
      		this.ctx.lineWidth = 0;

      		this.dContC.x=this.rectPlus.x;
      		this.dContC.y=this.rectPlus.y;

      					
  		}

  		function roundRect(_ctx,x, y, width, height, radius) {  			
		  	if (width < 2 * radius) radius = width / 2;
		  	if (height < 2 * radius) radius = height / 2;
		  	_ctx.beginPath();
		  	_ctx.moveTo(x + radius, y);
		  	_ctx.arcTo(x + width, y, x + width, y + height, radius);
		  	_ctx.arcTo(x + width, y + height, x, y + height, radius);
		  	_ctx.arcTo(x, y + height, x, y, radius);
		  	_ctx.arcTo(x, y, x + width, y, radius);
		  	_ctx.closePath();
		}


  		this.initCanvas=function(){
  			if(this.canvas!=undefined)return
  			this.canvas = document.createElement('canvas');
  			this.ctx = this.canvas.getContext('2d');
  			this.dContC.div.appendChild(this.canvas); 
  			//this.div.appendChild(this.canvas);  			
  		}


    	this.reDrag()
    }



    set x(value) {this.position.x = value;} get x() { return  this.position.x;}
    set y(value) {this.position.y = value;} get y() { return  this.position.y;}



	set glowColor(value) {
		if(this._glowColor!=value){
			this._glowColor = value;
			let o=dcmParam.parseColor(this._glowColor)
			this.aC[0]=	o.r;
			this.aC[1]=	o.g;
			this.aC[2]=	o.b;		
			this.dragCanvas();
			trace()


		}		
	}	
	get glowColor() { return  this._glowColor;}

	set glowSah(value) {
		if(this._glowSah!=value){
			this._glowSah = value;
			this.initCanvas();
			this.dragCanvas();
			this.canvas.style.top =-this._glowSah*2+'px';
			this.canvas.style.left = -this._glowSah*2+'px';	
			this.canvas.style.position = 'fixed';

		}		
	}	
	get glowSah() { return  this._glowSah;}




    set width(value) {
        if(this._width!=value){
            this._width = value;
            this.reDrag()
           
        }       
    }   
    get width() { return  this._width;}
    

    set textAlign(value) {
        if(this._textAlign!=value){
            this._textAlign = value;
            this.label.textAlign = value;
            this.reDrag();            
        }       
    }   
    get textAlign() { return  this._textAlign;}

   

    set height(value) {
        if(this._height!=value){
            this._height = value;
            this.reDrag();
            
        }       
    }   
    get height() { return  this._height;}



    set boolLine(value) {
        if(this._boolLine!=value){
            this._boolLine = value;
            this.panel.boolLine = value;
            this.panel1.boolLine = value;
            if(this._boolLine==true){
                //this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(self._color), -20);//"none";
            }else{
                //this.object.style.border= '0px solid'
            }
        }
    }   
    get boolLine() {        
        return  this._boolLine;
    }

    set boolFond(value) {
        if(this._boolFond!=value){
            this._boolFond = value;
            this.panel.visible=value;
            if(value==false)this.panel1.alpha = 0.01;
            else  this.panel1.alpha = 1;            
        }
    }   
    get boolFond() {        
        return  this._boolFond;
    }




    set fontSize(value) {
        if(this._fontSize!=value){
            this._fontSize = value;
            this.label.y= (this._height-this._fontSize)/2
            this.label.fontSize = value; 
            this.reDrag();
           // this.object.style.fontSize = value+"px";
        }
    }   
    get fontSize() {        
        return  this._fontSize;
    }

    set fontFamily(value) {
        if(this._fontFamily!=value){
            this._fontFamily= value;
            this.label.fontFamily= value;
            //this.object.style.fontFamily= this._fontFamily;

        }
    }   
    get fontFamily() {      
        return  this._fontFamily;
    }
    

    set color(value) {
        if(this._color!=value){
            this._color = value;
            this.panel.color1 =  value; 
            this.panel1.color1 =  value;          
            //this.object.style.background = this._color; 
            //this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);
        }
    }   
    get color() {       
        return  this._color;
    }

    set text(value) {
        if(this._text!=value){
            this._text = value;
            this.label.text =this._text
            this.reDrag();
        }
    }   
    get text() {        
        return  this._text;
    }

    set colorText(value) {
        if(this._colorText!=value){             
            this._colorText = value;
           
            this.label.colorText1 = value;
            //this.object.style.color=this._colorText;
        }
    }   
    get colorText() {       
        return  this._colorText;
    }

    set borderRadius(value) {
        if(this._borderRadius!=value){              
            this._borderRadius = value;
            
            this.panel.borderRadius=this._borderRadius;
            this.panel1.borderRadius=this._borderRadius;

			this.dragCanvas();
            
            //this.object.style.borderRadius=this._borderRadius+"px";
            //this.object.style.webkitBorderRadius =this._borderRadius+"px";
            //this.object.style.mozBorderRadius =this._borderRadius+"px";
        }
    }   
    get borderRadius() {        
        return  this._borderRadius;
    }

    set activMouse(value) {     
        if(this._activMouse!=value){
            this._activMouse = value;           
            if(value==true){
                this.alpha=1;
                this.panel1.div.style.cursor="pointer";
                //this.object.style.pointerEvents=null;   
            }else{
                this.alpha=0.7;             
                //this.object.style.pointerEvents="none"; 
                this.panel1.div.style.cursor="auto";
            }               
        }       
    }
    get activMouse() { return  this._activMouse;}

}

/**/



export class DGlow extends DCont {
  	constructor(dCont, _x, _y, _text, _fun) {
  		super(); 
  		this.type="DGlow";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);  
  		this.x=_x||0;	
  		this.y=_y||0;
  		
  		var self = this  		
  		this._borderRadius=0;
  		this._width = 100;
  		this._height =100; 
  		this._glowColor="#000000";
		this.aC=[1,1,1]
		this._glowSah=10;

  		this.canvas = document.createElement('canvas');
  		this.ctx = this.canvas.getContext('2d');
  		this.div.appendChild(this.canvas); 
  		this.canvas.style.top =-this._glowSah*2+'px';
		this.canvas.style.left = -this._glowSah*2+'px';	
		this.canvas.style.position = 'fixed';


  		this.reDrag=function(){
  			if(Math.round(this.width+this._glowSah*4)!=this.canvas.width)this.canvas.width = Math.round(this.width+this._glowSah*4)
  			if(Math.round(this.height+this._glowSah*4)!=this.canvas.height)this.canvas.height = Math.round(this.height+this._glowSah*4)	
        	
  			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  			
  			this.ctx.filter = 'blur('+this._glowSah+'px)';
  			this.ctx.fillStyle =this._glowColor;   	

			let rr=this._borderRadius
			roundRect(this.ctx, this._glowSah*2, this._glowSah*2, this.width, this.height,rr);
			this.ctx.fillStyle = this._glowColor;
      		this.ctx.fill(); 	
      		this.ctx.lineWidth = 0;

  		}


  		function roundRect(_ctx,x, y, width, height, radius) {  			
		  	if (width < 2 * radius) radius = width / 2;
		  	if (height < 2 * radius) radius = height / 2;
		  	_ctx.beginPath();
		  	_ctx.moveTo(x + radius, y);
		  	_ctx.arcTo(x + width, y, x + width, y + height, radius);
		  	_ctx.arcTo(x + width, y + height, x, y + height, radius);
		  	_ctx.arcTo(x, y + height, x, y, radius);
		  	_ctx.arcTo(x, y, x + width, y, radius);
		  	_ctx.closePath();
		}

  		this.reDrag()

  	}

  	set width(value) {
        if(this._width!=value){
            this._width = value;
            this.reDrag()
           
        }       
    }   
    get width() { return  this._width;}


    set height(value) {
        if(this._height!=value){
            this._height = value;
            this.reDrag();
            
        }       
    }   
    get height() { return  this._height;}

    set glowColor(value) {
		if(this._glowColor!=value){
			this._glowColor = value;
			let o=dcmParam.parseColor(this._glowColor)
			this.aC[0]=	o.r;
			this.aC[1]=	o.g;
			this.aC[2]=	o.b;		
			this.reDrag();
			

		}		
	}	
	get glowColor() { return  this._glowColor;}

	set glowSah(value) {
		if(this._glowSah!=value){
			this._glowSah = value;
			this.reDrag();			
			this.canvas.style.top =-this._glowSah*2+'px';
			this.canvas.style.left = -this._glowSah*2+'px';	
			this.canvas.style.position = 'fixed';
		}		
	}	
	get glowSah() { return  this._glowSah;}

	set borderRadius(value) {
        if(this._borderRadius!=value){              
            this._borderRadius = value;
			this.reDrag();
        }
    }   
    get borderRadius() {        
        return  this._borderRadius;
    }

}


export class DCheckBoxOld extends DCont {
  		constructor(dCont, _x, _y, _text, _fun) {
  		super(); 
  		this.type="DCheckBox";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		this.x=_x||0;	
  		this.y=_y||0;
  		var self=this
   		this._text=_text||"null";
   		this.fun=_fun;

   		this.fun_mouseover=undefined;
   		this.fun_mouseout=undefined;
   		this.fun_mousedown=undefined;

  		this._width=100;
  		this._height=dcmParam.wh;
  		this.wh=dcmParam.wh*0.6;
  		this._height=Math.round(dcmParam.wh*2/3+4);
  		this._color=dcmParam._color;
  		this._colorText=dcmParam._colorText;
  		this._fontSize=dcmParam._fontSize;
  		this._borderRadius = dcmParam._fontSize;
  		this._value=false;
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);   		

   		this.panel=new DPanel(this, 0, this._height-this.wh)
   		this.panel.width=this.panel.height=this.wh;

   		this.panel1=new DPanel(this, 2, this._height-this.wh+2)
   		this.panel1.width=this.panel1.height=this.wh-4;
   		this.panel1.color1=this._color


   		if(this._value==true){
   			this.panel1.alpha=1
   		}else{
   			this.panel1.alpha=0.2
   		}

		this.label=new DLabel(this, 0,0,this._text);
		this.label.x=this.wh+4;
		this.label.y=9;
		this.label.width=this.label.x+this._text.length*10;

		this.panel3=new DPanel(this, 0, this._height-this.wh)
   		this.panel3.height=this.wh; 
   		this.panel3.width = this.wh+5
   		this.panel3.alpha=0.0	
	
		this.label.div.style.cursor="pointer";
		this.panel3.div.style.cursor="pointer";

		this.div.onclick=function(){			
			self.value=!self._value;
			if(self.fun)self.fun()	
		}
  	}



  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
		}		
	}	
	get height() { return  this._height;}

	set borderRadius(value) {
		if(this._borderRadius!=value){				
			this._borderRadius = value;	
			this.panel3.borderRadius = value;
			this.panel1.borderRadius = value;
			this.panel.borderRadius = value;			
		}
	}	
	get borderRadius() { return  this._borderRadius;}

	set fontSize(value) {
		if(this._fontSize!=value){
			this._fontSize = value;
			this.label.fontSize = value;
		}
	}	
	get fontSize() { return  this._fontSize;}

	set value(v) {
		if(this._value!=v){
			this._value = v;			
			if(this._value==true){
	   			this.panel1.alpha=1
	   		}else{
	   			this.panel1.alpha=0.2
	   		}
		}
	}	
	get value() { return  this._value;}

	set text(v) {
		if(this._text!=v){
			this._text = v;			
			this.label.text = this._text;
			this.label.width=this._text.length*10;
		}
	}	
	get text() { return  this._text;}

	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				this.alpha=1;
				this.object.style.pointerEvents=null;	
		    }else{
		    	this.alpha=0.7;		    	
		    	this.object.style.pointerEvents="none";	
		    }		        
		}		
	}
  	get activMouse() { return  this._activMouse;}
}



export class DCheckBox extends DCont {
  	constructor(dCont, _x, _y, _text, _fun, _link0, _link1) {
  		super(); 
  		this.type="DCheckBox";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		this.x=_x||0;	
  		this.y=_y||0;
  		var self=this
   		this._text=_text||"null";
   		this.fun=_fun;
	    this._link0="null";
	    this._link1="null";

   		this.fun_mouseover=undefined;
   		this.fun_mouseout=undefined;
   		this.fun_mousedown=undefined;

  		this._width=100;
  		this._height=dcmParam.wh*0.75;
  		//this.wh=dcmParam.wh*0.5;
  		//this._height=Math.round(dcmParam.wh*2/3+4);
  		this._color=dcmParam._color;
  		this._colorText=dcmParam._colorText;
  		this._fontSize=dcmParam._fontSize;
  		this._borderRadius = dcmParam._fontSize;
  		this._boolLine= dcmParam._boolLine;
  		this._value=false;
		this.image0=undefined;
		this.image1=undefined;

   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);   	
   		var sp=5



   		/*this.panel=new DPanel(this, 0, this._height-this.wh)
   		this.panel1=new DPanel(this, 2, this._height-this.wh+2)

		this.label=new DLabel(this, 0, this._height-this.wh, this._text);
		this.panel3=new DPanel(this, 0, this._height-this.wh)*/

   		this.panel=new DPanel(this, 0, 0)

   		this.panel1=new DPanel(this, 2, 2)

		this.label=new DLabel(this, 0,0,this._text);
		this.label.y=3;

		this.panel3=new DPanel(this, 0, 0)
   		this.panel3.alpha=0.0	
	
		this.label.div.style.cursor="pointer";
		this.panel3.div.style.cursor="pointer";


   		this.reDrag=function(){
	   		this.panel.width=this.panel.height=this.height;

	   		this.panel1.width=this.panel1.height=this.height-4;
	   		this.panel1.color1=this._color

			this.label.x=this.height+2;
			this.label.y=this.height-this.fontSize;
			this.label.width=this.label.x+this._text.length*10;
	   		this.panel3.height=this.height; 
	   		this.panel3.width = this.width

			this.panel1.visible=true;

			if(this.image0)this.image0.visible=false	
			if(this.image1)this.image1.visible=false

			if(this._value==true){
	   			this.panel1.alpha=1	   			
	   			if(this._link1!='null'){
	   				this.panel1.visible=false;
	   				this.sizeImg(this.image1)
	   			}
	   		}else{
	   			this.panel1.alpha=0.2
	   			if(this._link0!='null'){
	   				this.panel1.visible=false;	   				
	   				this.sizeImg(this.image0)
	   			}
			}
		}

		this.div.onclick=function(){			
			self.value=!self._value;			
			self.reDrag();
			if(self.fun)self.fun()	
		}

		this.funLoadImag=undefined;


        this.sizeImg = function(img){
        	var s
        	var eee = this._height - 4//-10//this.wh - 4
			if(img!=undefined){
                s=eee/img.picWidth;
                if(eee/img.picHeight<s)s=eee/img.picHeight
				
				img.width=img.picWidth*s;  
                img.height=img.picHeight*s;
                
                img.visible=true

            	img.x = 2+( eee- img.width)/2;
            	img.y = 2+( eee- img.height)/2;
            }
        }
        this.reDrag()
        this.initLink=function(){
        	if(this.image0!=undefined)return

        	this.image0=new DImage(this, 2, 2, null, function(){self.reDrag()})	
        	this.image0.visible=false
        	this.image1=new DImage(this, 2, 2, null, function(){self.reDrag()})	
        	this.image1.visible=false

        	//this.image0.div.style.pointerEvents="none";	
        	//this.image1.div.style.pointerEvents="none";	
        	this.image0.div.style.cursor="pointer";
			this.image1.div.style.cursor="pointer";
        }

        if(_link0!=undefined)this.link0=_link0;
        if(_link1!=undefined)this.link1=_link1;
  	}

  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}


	set height(value) {
		if(this._height!=value){
			this._height = value;
			this.reDrag()
		}		
	}	
	get height() { return  this._height;}

	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.reDrag()
		}		
	}	
	get width() { return  this._width;}

	set boolLine(value) {
		if(this._boolLine!=value){				
			this._boolLine = value;
			this.panel.boolLine = value;
			this.panel1.boolLine = value;
			this.panel3.boolLine = value;
			this.reDrag()
		}
	}	
	get boolLine() { return  this._boolLine;}	

	set link0(value) {
		if(this._link0!=value){				
			this._link0 = value;
			this.initLink();
			if(this._link0!='null')this.image0.link=this._link0;		
			this.reDrag();
		}
	}	
	get link0() { return  this._link0;}	

	set link1(value) {
		if(this._link1!=value){				
			this._link1 = value;
			this.initLink();
			if(this._link1!='null')this.image1.link=this._link1;		
			this.reDrag();
		}
	}	
	get link1() { return  this._link1;}	


	set borderRadius(value) {
		
		if(this._borderRadius!=value){				
			this._borderRadius = value;	
			this.panel3.borderRadius = value;
			this.panel1.borderRadius = value;
			this.panel.borderRadius = value;			
		}
		
	}	
	get borderRadius() { return  this._borderRadius;}

	set fontSize(value) {
		if(this._fontSize!=value){
			this._fontSize = value;
			this.label.fontSize = value;
			this.reDrag()
		}
	}	
	get fontSize() { return  this._fontSize;}

	set value(v) {
		if(this._value!=v && this._activMouse != false){
			this._value = v;
	   		this.reDrag()
		}
	}	
	get value() { return  this._value;}

	set text(v) {
		if(this._text!=v){
			this._text = v;			
			this.label.text = this._text;
			this.label.width=this._text.length*10;
		}
	}	
	get text() { return  this._text;}

	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				this.alpha=1;
				this.label.div.style.cursor="null";
				this.panel3.div.style.cursor="null";
			    this.image0.div.style.cursor="null";
				this.image1.div.style.cursor="null";
		    }else{
		    	this.alpha=0.7;		    	
				this.label.div.style.cursor="auto";
				this.panel3.div.style.cursor="auto";
			    this.image0.div.style.cursor="auto";
				this.image1.div.style.cursor="auto";
		    }		        
		}		
	}
  	get activMouse() { return  this._activMouse;}
}





export class DPanel extends DCont {
  	constructor(dCont, _x, _y) {
  		super(); 
  		


  		this.type="DPanel";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		this.x=_x||0;	
  		this.y=_y||0;  
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
  		this._width=100;
  		this._height=100;
  		this._color1=dcmParam._color1;
		this._boolLine=dcmParam._boolLine;
		this._borderRadius=dcmParam.borderRadius;

		this._glowColor="#000000";
		this.aC=[1,1,1];
		
		this._glowSah=0;

		this.dContC=new DCont(this);
		this.dCont=new DCont(this);

		this.dCont.div.style.borderRadius = this._borderRadius+"px";	
  		this.dCont.div.style.background=this._color1;
  		if(this._boolLine==true){	  		
	  		this.dCont.div.style.border= '1px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -20); 
	  	}else{
	  		this.dCont.div.style.border= '0px solid'; 
	  	}	  	

  		this.dCont.div.style.width=(this._width-2)+"px";
  		this.dCont.div.style.height=(this._height-2)+"px";

  		this.content=new DCont(this);
  		this.content.y=this._wh;

		this.rectPlus={x:0,y:0,w:0,h:0}
  		this.canvas = undefined// document.createElement('canvas');
		this.ctx = undefined// canvas.getContext('2d');
    	this.dragCanvas=function(){
  			if(this.canvas==undefined)return

  			this.canvas.width = (this.width+this.rectPlus.w)+this._glowSah*4;
        	this.canvas.height = (this.height+this.rectPlus.h)+this._glowSah*4;	
  			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  			if(this._glowSah==0)return
  			this.ctx.filter = 'blur('+this._glowSah+'px)';
  			this.ctx.fillStyle =this._glowColor; 

  	

			let rr=this._borderRadius
			roundRect(this.ctx, this._glowSah*2, this._glowSah*2, this.width, this.height,rr);
			this.ctx.fillStyle = this._glowColor;
      		this.ctx.fill(); 	
      		this.ctx.lineWidth = 0;

      		this.dContC.x=this.rectPlus.x;
      		this.dContC.y=this.rectPlus.y;			
  		}

  		function roundRect(_ctx,x, y, width, height, radius) {  			
		  	if (width < 2 * radius) radius = width / 2;
		  	if (height < 2 * radius) radius = height / 2;
		  	_ctx.beginPath();
		  	_ctx.moveTo(x + radius, y);
		  	_ctx.arcTo(x + width, y, x + width, y + height, radius);
		  	_ctx.arcTo(x + width, y + height, x, y + height, radius);
		  	_ctx.arcTo(x, y + height, x, y, radius);
		  	_ctx.arcTo(x, y, x + width, y, radius);
		  	_ctx.closePath();
		}


  		this.initCanvas=function(){
  			if(this.canvas!=undefined)return
  			this.canvas = document.createElement('canvas');
  			this.ctx = this.canvas.getContext('2d');
  			this.dContC.div.appendChild(this.canvas); 
  			//this.div.appendChild(this.canvas);  			
  		}




  	}

  	


  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.dCont.div.style.width=(this._width-2)+"px";
			this.dragCanvas()
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
			this.dCont.div.style.height=(this._height-2)+"px";
			this.dragCanvas()
		}		
	}	
	get height() { return  this._height;}

	set borderRadius(value) {
		if(this._borderRadius!=value){				
			this._borderRadius = value;

			this.dCont.div.style.borderRadius = value+"px";		
			this.dragCanvas();	
		}
	}	
	get borderRadius() { 		
		return  this._borderRadius;
	}


	set boolLine(value) {
		if(this._boolLine!=value){			
			this._boolLine = value;	
			if(this._boolLine==true){	  		
	  		this.dCont.div.style.border= '1px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -20); 
		  	}else{
		  		this.dCont.div.style.border= '0px solid'; 
		  	}
			
		}
	}	
	get boolLine() { 		
		return  this._boolLine;
	}




	set color1(value) {
		if(this._color1!=value){			
			this._color1 = value;
			this.dCont.div.style.background = this._color1;
			var c=dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -20);  		
  			if(this._boolLine==true){	  		
		  		this.dCont.div.style.border= '1px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -20); 
		  	}else{
		  		this.dCont.div.style.border= '0px solid'; 
		  	}	
		}
	}	
	get color1() { 		
		return  this._color1;
	}

	set color(value) {
		this.color1 = value;
	}	
	get color() { 		
		return  this._color1;
	}


	set glowColor(value) {
		if(this._glowColor!=value){
			this._glowColor = value;
			let o=dcmParam.parseColor(this._glowColor)
			this.aC[0]=	o.r;
			this.aC[1]=	o.g;
			this.aC[2]=	o.b;		
			this.dragCanvas();
			


		}		
	}	
	get glowColor() { return  this._glowColor;}

	set glowSah(value) {
		if(this._glowSah!=value){
			this._glowSah = value;
			this.initCanvas();
			this.dragCanvas();
			this.canvas.style.top =-this._glowSah*2+'px';
			this.canvas.style.left = -this._glowSah*2+'px';	
			this.canvas.style.position = 'fixed';

		}		
	}	
	get glowSah() { return  this._glowSah;}




	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				//this.alpha=1;
				this.dCont.div.style.pointerEvents=null;	
		    }else{
		    	//this.alpha=0.7;		    	
		    	this.dCont.div.style.pointerEvents="none";	
		    }	
		    for (var i = 0; i < this.children.length; i++) {
				this.children[i].activMouse=value;
			}	        
		}

	}
  	get activMouse() { return  this._activMouse;}
}


export class DImage extends DCont {
  	constructor(dCont, _x, _y, _link, _fun) {
  		super();
  		this.type="DImage";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		var self=this;
  		this.x=_x||0;	
  		this.y=_y||0;
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
  		this._width=100;
  		this._height=100;
  		this.picWidth = 100; // реальные размеры картинки
		this.picHeight = 100; // реальные размеры картинки
		this.funError = null;
		this._link = null;
		this.fun=_fun;

		this._glowColor="#000000";
		this.aC=[1,1,1]
		this._glowSah=0;

		this._s=1;
		var dC=new DCont()
		this.add(dC)

		this.div2= document.createElement('div');
		if(dcmParam.isIE==false)this.div2.style.position = 'fixed';
		this.div2.style.top = '0px';
		this.div2.style.left = '0px';				
		this.div.appendChild(this.div2);


		this.image = new Image();
		this.div2.appendChild(this.image);
		
		this.canvas = undefined// document.createElement('canvas');
		this.ctx = undefined// canvas.getContext('2d');
		this.image.ondragstart = function() { return false; };
  		this.loadError=function() {        
	       if (self.funError) self.funError();
	    }
  		this.loadComplit = function (e) {
    		self.picWidth = this.naturalWidth;
       	 	self.picHeight = this.naturalHeight;       	 	
       	 	self._width++;
       	 	self._height++;       	 	
       	 	self.width=self._width-1;
        	self.height=self._height-1;
        	self.dragCanvas()
           	if (self.fun) self.fun();
  		}

  		this.load = function () {
  			self.image.onerror = self.loadError; 
        	self.image.crossOrigin = "";
  			this.image.onload = self.loadComplit;    
        	self.image.src = self._link;
        	self.image.crossOrigin = "";
  		} 



  		this.dragCanvas=function(){
  			if(this.canvas==undefined)return
  			this.canvas.width = this.image.width+this._glowSah*4;
        	this.canvas.height = this.image.height+this._glowSah*4;	
  			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  			if(this._glowSah==0)return
  			this.ctx.filter = 'blur('+this._glowSah+'px)'; 
  			this.ctx.drawImage(this.image, this._glowSah*2, this._glowSah*2, this.image.width, this.image.height);
  			
  			var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

  			var pixels = imageData.data;
	        var n=1
	        for (var i = 0; i < pixels.length; i += 4) {
	            pixels[i]     = this.aC[0]; 
	            pixels[i + 1] = this.aC[1];  
	            pixels[i + 2] = this.aC[2];  
	        }	        
	        this.ctx.putImageData(imageData, 0, 0);
  		}

  		this.initCanvas=function(){
  			if(this.canvas!=undefined)return
  			this.canvas = document.createElement('canvas');
  			this.ctx = this.canvas.getContext('2d');
  			
  			//this.div2.removeChild(this.image);

  			dC.div.appendChild(this.canvas);
  			//this.div2.appendChild(this.image);
  			

  			
  		}

  		if(_link)this.link=_link;
  	}
  	


  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.image.width=this._width//(100/this.picWidth);
			this.dragCanvas()
			//this.drag()

			//this.div.style.width=this._width+"px";
			/*this.image.style.width=this._width+"px";*/
		}		
	}	
	get width() { return  this._width;}




	
	set glowColor(value) {
		if(this._glowColor!=value){
			this._glowColor = value;
			let o=dcmParam.parseColor(this._glowColor)
			this.aC[0]=	o.r;
			this.aC[1]=	o.g;
			this.aC[2]=	o.b;		
			this.dragCanvas();
		}		
	}	
	get glowColor() { return  this._glowColor;}

	set glowSah(value) {
		if(this._glowSah!=value){
			this._glowSah = value;
			this.initCanvas();
			this.dragCanvas();
			this.canvas.style.top =-this._glowSah*2+'px';
			this.canvas.style.left = -this._glowSah*2+'px';	
			this.canvas.style.position = 'fixed';

		}		
	}	
	get glowSah() { return  this._glowSah;}

	

	set height(value) {
		if(this._height!=value){
			this._height = value;
			//this.drag()
			this.image.height=this._height;	
			this.dragCanvas()
			//this.div.style.height=this._height+"px";
		}		
	}	
	get height() { return  this._height;}

	set link(value) {
		if(this._link!=value){
			this._link = value;
			this.load();
		}
	}	
	get link() { 		
		return  this._link;
	}


}



export class DLabel extends DCont {
  	constructor(dCont, _x, _y, _text) {
  		super();
  		this.type="DLabel";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		var self=this;
  		this.x=_x||0;	
  		this.y=_y||0;
   		




  		this._width=100;
  		this._height=dcmParam._fontSize;
  		this._fontSize=dcmParam._fontSize;
  		this._fontFamily=dcmParam._fontFamily;
  		this._colorText1=dcmParam._colorText1;
  		this._color=dcmParam._colorText1;
  		this._textAlign="left";
  		this._bold=false;
  		this._text=_text||"";
  		this._value=this._text;

  		this._glowColor="#000000";
		this.aC=[1,1,1]
		this._glowSah=0;
  		

  		this.dCT=new DCont();
  		this.add(this.dCT);

  		this.dCT1=undefined//=new DCont();
  		//this.add(this.dCT);  		

  		this.dCT.div.textContent = this._text;
		//this.dCT.div.appendChild(this.image);
		this.dCT.div.style.width=this._width+"px";
		this.dCT.div.style.fontSize=this._fontSize+"px";
		this.dCT.div.style.color = this._colorText1;		
		this.dCT.div.style.fontFamily= this._fontFamily;
		this.dCT.div.style.textAlign= this._textAlign;

		//this.dCT.div.style.filter=	"blur(3px)";
		//this.dCT.div.style.filter=	"drop-shadow(10px 10px 2,2)"


		var rect={x:0,y:0,width:this._width,height:this._height}
		this.getRect=function(){
			rect.width=this.dCT.div.scrollWidth;
			rect.height=this.dCT.div.clientHeight;					
			return rect;
		}




	/*	var wMax=0
		this.getRectBig=function(){
			dcmParam.textarea

			
			
			//dcmParam.textarea.style.cssText = "font-weight: bold"; 
			dcmParam.textarea.style.contenteditable="true"
			if(dcmParam.textarea.style.fontWeight!=this.dCT.div.style.fontWeight)dcmParam.textarea.style.fontWeight=this.dCT.div.style.fontWeight
			if(dcmParam.textarea.style.width!=this.dCT.div.style.width)dcmParam.textarea.style.width=this.dCT.div.style.width
			if(dcmParam.textarea.style.fontSize!=this.dCT.div.style.fontSize)dcmParam.textarea.style.fontSize=this.dCT.div.style.fontSize
			if(dcmParam.textarea.style.fontFamily!=this.dCT.div.style.fontFamily)dcmParam.textarea.style.fontFamily=this.dCT.div.style.fontFamily
			if(dcmParam.textarea.style.textAlign!=this.dCT.div.style.fontSize)dcmParam.textarea.style.fontSize=this.dCT.div.style.textAlign
			if(dcmParam.textarea.value!=this.text)dcmParam.textarea.value=this.text;


			dcmParam.textarea.style.scrollbarWidth="auto"	
				

			var ss = getTextLineBreaks(dcmParam.textarea);
			trace(ss)
			
			return {x:0,y:0,width:wMax,height:dcmParam.textarea.clientHeight}
							
			
		}*/

		/***********************/

/*
		function getTextLineBreaks (_oTextarea) {
			var oTextarea = _oTextarea; // || document.getElementById('myTextarea');
			oTextarea.setAttribute('wrap', 'off');

			var strRawValue = oTextarea.value;
			oTextarea.value = '';
			var nEmptyWidth = oTextarea.scrollWidth;
			var nLastWrappingIndex = -1;

			trace(nEmptyWidth, oTextarea.value, oTextarea.style.width)

			function testBreak (strTest) {
				oTextarea.value = strTest;
				//console.log("@@",oTextarea.scrollWidth , nEmptyWidth, strTest)

				return oTextarea.scrollWidth > nEmptyWidth;
			}
			function getWidth (strTest) {
				oTextarea.value = strTest;
				return oTextarea.scrollWidth;
			}

			function findNextBreakLength (strSource, nLeft, nRight) {
				var nCurrent;
				if (typeof (nLeft) === 'undefined') {
					nLeft = 0;
					nRight = -1;
					nCurrent = 64;
				} else {
					if (nRight === -1) { nCurrent = nLeft * 2; } else if (nRight - nLeft <= 1) { return Math.max(2, nRight); } else { nCurrent = nLeft + (nRight - nLeft) / 2; }
				}
				var strTest = strSource.substr(0, nCurrent);
				var bLonger = testBreak(strTest);

				if (bLonger) { 
					nRight = nCurrent;
									 
				} else {
					
					if (nCurrent >= strSource.length) {
					//trace("@@@"+oTextarea.scrollWidth)
						return null; 
					}
					nLeft = nCurrent;


				}
				//trace(nLeft, nRight, bLonger)
				return findNextBreakLength(strSource, nLeft, nRight);
			}

			var i = 0,
				j;
			var strNewValue = '';


			while (i < strRawValue.length) {
				//trace(" ## ")
				var breakOffset = findNextBreakLength(strRawValue.substr(i));

				if(wMax<breakOffset)wMax=breakOffset;
				//trace(breakOffset+" #########   "+strRawValue.substr(i))
				if (breakOffset === null) {
					strNewValue += strRawValue.substr(i);					
					break;
				}
				nLastWrappingIndex = -1;
				var nLineLength = breakOffset - 1;
				for (j = nLineLength - 1; j >= 0; j--) {
					var curChar = strRawValue.charAt(i + j);
					if (curChar === ' ' || curChar === '-' || curChar === '+') {
						nLineLength = j + 1;
						break;
					}
				}
				trace("!!!!!!!!!!!",getWidth("ffff"))

				strNewValue += strRawValue.substr(i, nLineLength) + '\n';

				i += nLineLength;
			}
			//trace(i,j,strRawValue)
			oTextarea.value = strRawValue;
			oTextarea.setAttribute('wrap', '');
			return strNewValue;
		}*/
		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);

		this.testVisi(true);

		////////////////////////////


		this.initShadow=function(){
			if(this.dCT1!=undefined)return;

  			this.dCT1=new DCont();


  			this.dCT1.div.textContent = this._text;
			//this.dCT.div.appendChild(this.image);
			this.dCT1.div.style.width=this._width+"px";
			this.dCT1.div.style.fontSize=this._fontSize+"px";
			this.dCT1.div.style.color = this._colorText1;		
			this.dCT1.div.style.fontFamily= this._fontFamily;
			this.dCT1.div.style.textAlign= this._textAlign;
			this.dCT1.div.style.filter=	"blur("+this._glowSah+"px)";

			if(this._bold==true){	  			
	  			this.dCT1.div.style.fontWeight= "bold";
	  		}else{	  			
	  			this.dCT1.div.style.fontWeight= "normal";
	  		}

  			this.remove(this.dCT);
  			this.add(this.dCT1); 
  			this.add(this.dCT); 
		}

  	} 




    set glowColor(value) {  		
  		if(this._glowColor!=value){
  			this._glowColor=value
  			this.initShadow()
  			this.dCT1.div.style.color=this._glowColor;
  		}
  	}	get glowColor() { return  this._glowColor;}	

  	set glowSah(value) {  		
  		if(this._glowSah!=value){
  			this._glowSah=value;
  			this.initShadow()
  			this.dCT1.div.style.filter=	"blur("+this._glowSah+"px)";
  			
  		}
  	}	get glowSah() { return  this._glowSah;}	






    set textAlign(value) {  		
  		if(this._textAlign!=value){
  			this._textAlign=value
  			this.dCT.div.style.textAlign= this._textAlign;	
  			if(this.dCT1)this.dCT1.div.textAlign= this._textAlign;
  		}
  	}	get textAlign() { return  this._textAlign;}	

  	set fontFamily(value) {  		
  		if(this._fontFamily!=value){
  			this._fontFamily=value
  			this.dCT.div.style.fontFamily= this._fontFamily;
  			if(this.dCT1)this.dCT1.div.fontFamily= this._fontFamily;	
  		}
  	}	get fontFamily() { return  this._fontFamily;}

  	set bold(value) {
  		this._bold = value;
  		if(this._bold==true){
  			this.dCT.div.style.fontWeight= "bold";
  			if(this.dCT1)this.dCT1.div.style.fontWeight= "bold";
  		}else{
  			this.dCT.div.style.fontWeight= "normal";
  			if(this.dCT1)this.dCT1.div.style.fontWeight= "normal";
  		}
  	}	get bold() { return  this._bold;}

  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.dCT.div.style.width=this._width+"px";
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
					
		}		
	}	
	get height() { return this.dCT.div.clientHeight;}

	set fontSize(value) {
		if(this._fontSize!=value){
			this._fontSize = value;
			this.dCT.div.style.fontSize=this._fontSize+"px";
			if(this.dCT1)this.dCT1.div.fontSize=this._fontSize+"px";
		}
	}	
	get fontSize() { 		
		return  this._fontSize;
	}

	set colorText1(value) {
		if(this._colorText1!=value){				
			this._colorText1 = value;
			this._color = value;
			this.dCT.div.style.color=this._colorText1;			
		}
	}	
	get colorText1() { 		
		return  this._colorText1;
	}

	set color(value) {
		if(this._color!=value){				
			this._color = value;
			this._colorText1 = value;
			this.dCT.div.style.color=this._color;
		}
	}	
	get color() { 		
		return  this._color;
	}
	

	set text(value) {
		if(this._text!=value){			
			this._text = value;
			this._value = value;
			this.dCT.div.textContent = this._text;
			if(this.dCT1)this.dCT1.div.textContent=this._text;
		}
	}	
	get text() { 		
		return  this._text;
	}

	set value(value) {
		if(this._value!=value){			
			this._value = value;
			this.text=value;
		}
	}	
	get value() { 		
		return  this._text;
	}

	


}





export class DSlider extends DCont {
  	constructor(dCont, _x, _y, fun) {
  		super();
  		this.type="DSlider";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		var self=this;
  		this.x=_x||0;	
  		this.y=_y||0;
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
  		this._width=100;  		
  		this._height=20;

  		this.fun=fun
  		this.funChange=undefined;
  		this._borderRadius=0
  		this._color=dcmParam._color;//"#008CBA";

  		this._min=0;
  		this._max=100;
  		this._otstup=2
  		this._value = 0; // округление value
  		this._okrug = 100; // округление value
	

		this.mm=10000000000000000000000;
		
		this.pan=new DPanel(this,0,this._otstup)
		this.pan.width=this._width;
		this.pan.height=this._height-this._otstup*2;
		this.pan.color1=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1),-20)

		this.panel=new DPanel(this,0,0);
		this.panel.width=this.panel.height=this._height;
		this.panel.color1=this._color;
		this.panel.div.style.cursor="pointer";


		//this.panel.borderRadius = 50;
			
		//this.pan.borderRadius = 50;
		
  		this.borderRadius = dcmParam.borderRadius;


		var xx,xxx;
		this.naValue = function (n) {
			xx=((n*((this._height+self._width)/self._width)-this._height/2)/self._width)
			xxx=this._max-this._min;
			this.value=this._min+xxx*xx;
		}	




		var sp;
		this.mouseup = function(e){
			document.body.style.pointerEvents='auto'

  			sp=undefined;
  			if(dcmParam.mobile==false){
  				
  				document.removeEventListener("mouseup", self.mouseup);
  			}else{
  				
  				document.removeEventListener("touchend", self.mouseup);
  				
  			}
  			dcmParam.removeFunMove(self.mousemove);	


  			if(self.funChange) self.funChange() 			
  		}

		var ss,sss;
  		this.mousemove = function(e){  			
  			
  			if(dcmParam.mobile==false){
	  			if(sp==undefined){
	  				sp={
	  					x:e.clientX,	  					
	  					value:self.panel.x,
	  					b:false
	  				};
	  			}	  			
	  			ss=(e.clientX-sp.x)/self.scaleDrag.s 		
	  		}else{
	  			if(sp==undefined){
	  				sp={
	  					x:e.targetTouches[0].clientX,	  					
	  					value:self.panel.x,
	  				};
	  			}	  			
	  			ss=(e.targetTouches[0].clientX-sp.x)/self.scaleDrag.s   			  			
	  		}

	  		self.naValue(sp.value+ss+self._height/2)
	  		if(self.fun)self.fun();		  		
  		}



  		this.testScale = function (c,o) {  			
  			if(c.scale)o.s*=c.scale;
  			if(c.parent){
  				self.testScale(c.parent,o)
  			}
    	}


  		this.scaleDrag={s:1}

  		this.xyp={x:0,y:0}
  		this.getPosGlob = function (c2){
  			var rx=c2.x;
  			var scal=1
  			if(c2.scale)scal=c2.scale
  			
  			if(c2.parent){
  				rx+=this.getPosGlob(c2.parent)*scal
  			}
  			return rx
   		}


		this.mousedown = function (e) {	
				
			self.scaleDrag.s=1;			
			self.testScale(self, self.scaleDrag)

			if(e.target.xz!=undefined){	
				
				
				
				if(e.offsetX!=undefined)self.naValue(e.offsetX)
				else{
					if(e.targetTouches)if(e.targetTouches[0]){
						//var rr=self.getPosGlob(self.pan)
						
						self.xyp.x=0
						self.xyp.y=0
						self.funXYP(self.pan, self.xyp)	
						let coords = e.targetTouches[0].target.getBoundingClientRect();
						let rr=self.xyp.x
						let rr1=(e.targetTouches[0].clientX-coords.x)/self.scaleDrag.s
						
						self.naValue(rr1)
					}					
				}
				if(self.fun)self.fun();	
				
			}
			
			
			document.body.style.pointerEvents="none";


			if(dcmParam.mobile==false){	 				
  				document.addEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.addEventListener("touchend", self.mouseup);
  				
  			}
  			dcmParam.addFunMove(self.mousemove);	
		}


		if(dcmParam.mobile==false){			
			this.panel.div.addEventListener("mousedown", self.mousedown);
			this.pan.div.addEventListener("mousedown", self.mousedown);
			this.pan.div.xz=true;
		}else{
			this.panel.div.addEventListener("touchstart", self.mousedown);
			this.pan.div.addEventListener("touchstart", self.mousedown);
			this.pan.div.xz=true;
		}







		this._width++;
  		this.width=this._width-1;  		
  	} 

  	set x(v) {this.position.x = v;}	get x() { return  this.position.x;}
	set y(v) {this.position.y = v;}	get y() { return  this.position.y;}
	set width(v) {
		if(this._width!=v){
			this._width = v;
			this.pan.width=this._width;
			this.value=this._value			

		}		
	}	
	get width() { return  this._width;}


	set height(v) {
		if(this._height!=v){
			this._height = v;

			this.pan.height=this._height-this._otstup*2;
			this.panel.height=this.panel.width=this._height;

			

		}		
	}		
	get height() { return  this._height;}


	set borderRadius(value) {
		if(this._borderRadius!=value){				
			this._borderRadius = value;			
			this.panel.borderRadius = value;			
			this.pan.borderRadius = value;
					
		}
	}	
	get borderRadius() { 		
		return  this._borderRadius;
	}

	
	set value(v) {
		v = Math.round(v*this._okrug)/this._okrug;
		if(v>this._max)	v=this._max
		if(v<this._min)	v=this._min	
		this._value = v;
		
		
		var xx=v-this._min;
		var xxx=xx/(this._max-this._min)

		this.panel.x=(this.pan.width-this._height)*xxx

		
				
	}	
	get value() { return  this._value;}	

	set okrug(v) {		
		this._okrug = v;
		this.value=	this._value;		
	}	
	get okrug() { return  this._okrug;}	
	


	
	set min(v) {
		if(this._min!=v){
			this._min = v;	
			this.value=	this._value;	
			//this.object.value=(this._value-this._min)/(this._max-this._min)*this.mm
		}		
	}	
	get min() { return  this._min;}	

	
	set max(v) {
		if(this._max!=v){
			this._max = v;
			this.value=	this._value;			
			//this.object.value=(this._value-this._min)/(this._max-this._min)*this.mm

		}		
	}	
	get max() { return  this._max;}	

	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				this.alpha=1;
				this.div.style.pointerEvents=null;	
		    }else{
		    	this.alpha=0.7;		    	
		    	this.div.style.pointerEvents="none";	
		    }		        
		}		
	}
  	get activMouse() { return  this._activMouse;}	

}



export class DSliderBig extends DCont {
  	constructor(dCont, _x, _y, fun, _text, _min, _max) {
  		super();
  		this.type="DSliderBig";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		var self=this;
  		this.x=_x||0;	
  		this.y=_y||0;
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
  		this._width=100;
  		this._height=dcmParam.wh+12;
  		this.fun=fun
  		this.funChange=undefined;

  		this._min=-2357845745434785894;
  		this._max=3567567856787967889;
  		this._value = 0; // округление value
  		this._okrug = 100; // округление value
  		this._text=_text||"null";

  		this._borderRadius = dcmParam.borderRadius;	

  		

  		this.input=new DInput(this,0,0,"0", function(){  			
  			var vv= this.text-1+1;  			
  			self.value =vv;
  			if(self.fun)self.fun();
  			if(self.funChange)self.funChange();	
  		})


  		this.slider=new DSlider(this,0,0, function(){  			
  			self.value=this.value;
  			if(self.fun)self.fun();	
  		})




  		this.slider.funChange=function(){
  			
  			if(self.funChange)self.funChange();	
  		}

  		this.slider.y=dcmParam.wh/2-2;
  		
  		this.label=new DLabel(null,0,0, this._text);
  		this.label.fontSize=this.label.fontSize*2/3;

		
  		

  		this.label1=new DLabel(this,0,0, this._min+"");
  		this.label1.fontSize=this.label.fontSize*2/3;
  		this.label1.y=37

  		this.label2=new DLabel(this,0,0, this._max+"");
  		this.label2.fontSize=this.label.fontSize*2/3;
  		this.label2.y=37

		if(dcmParam.mobile==true){
  			this.slider.height=this.input.height
  			this.slider.y=0;
  			this.slider.pan.add(this.label)
  			this.label.y=7
  			this.label.x=10
			this.label.div.style.pointerEvents="none";
			this.label.alpha=0.5;
  		}else{
  			this.add(this.label)
  		}
  		this.label.testVisi(true);



		this._width++;
  		this.width=this._width-1;  

  		this.min=_min||0;
  		this.max=_max||100;
  	} 

  	set x(v) {this.position.x = v;}	get x() { return  this.position.x;}
	set y(v) {this.position.y = v;}	get y() { return  this.position.y;}
	set width(v) {
		if(this._width!=v){
			this._width = v;				
			this.slider.width=(this._width-dcmParam._otstup)*0.7
			this.label.width=this.slider.width
			this.input.width=(this._width-dcmParam._otstup)*0.3-4
			this.input.x=this.slider.width+dcmParam._otstup;

			this.label2.x=this.input.x-4*this.label2.text.length;

		}		
	}	
	get width() { return  this._width;}


	set height(v) {
		if(this._height!=v){
			this._height = v;		
		}		
	}		
	get height() { return  this._height;}


	set borderRadius(value) {
		if(this._borderRadius!=value){				
			this._borderRadius = value;			
			this.input.borderRadius = value;	
			this.slider.borderRadius = value;		
		}
	}	
	get borderRadius() { 		
		return  this._borderRadius;
	}

	
	set value(v) {		
		this._value = v;		
		if(this._value>this._max)this._value=this._max;
		if(this._value<this._min)this._value=this._min;	
		this.input.text=""+this._value	
		this.slider.value=	this._value;
	}	
	get value() { return  this._value;}	

	set okrug(v) {		
		this._okrug = v;
		this.slider.okrug=	this._okrug;
		this.value=this._value

	}	
	get okrug() { return  this._okrug;}	
	
	set min(v) {
		if(this._min!=v){
			this._min = v;	
			this.label1.text=	this._min+"";
			this.slider.min=this._min	
		}		
	}	
	get min() { return  this._min;}	

	
	set max(v) {
		if(this._max!=v){
			this._max = v;			
			this.label2.text=	this._max+"";	
			this.slider.max=this._max;
			this.label2.x=this.input.x-4*this.label2.text.length;	
		}		
	}	
	get max() { return  this._max;}	

	set text(v) {
		if(this._text!=v){
			this._text = v;			
			this.label.text=this._text
		}		
	}	
	get text() { return  this._text;}		

}





export class DInput extends DCont {
  	constructor(dCont, _x, _y, _text, _fun) {
  		super();
  		this.type="DInput";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		var self=this;

   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
  		this._width=100;
  		this._height=dcmParam.wh;
  		this.fun=_fun;
  		this._text=_text||"null";
  		this._value = this._text;

  		var timeoutID = null;
  		
 		this.funEnter=undefined

  		this._activMouse=true
  		this._okrug = 0;
  		this._color1=dcmParam._color1;
  		
  		this._colorText1=dcmParam._colorText1;
  		this._fontFamily=dcmParam._fontFamily;
  		this._fontSize=dcmParam._fontSize;
  		this._textAlign="center";

  		this._borderRadius = dcmParam.borderRadius;
		this._color2=dcmParam._color;

		this.boolFocus=false;
		this.funFocus=undefined;
		this._numLine=1;
  		
		this.timeFun=1000

	
  		this.object = document.createElement('input')
  		this.object.type = 'text';
  		this.object.value = this._text;
  		this.object.style.backgroundColor=this._color1
		this.object.style.color = this._colorText1;
  		this.object.style.border = this._numLine+'px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -50);		
		this.object.style.fontFamily = this._fontFamily;
		this.object.style.textAlign = 'center';
		this.object.style.fontSize = this._fontSize + 'px';
		this.object.style.textAlign= this._textAlign;	
		this.object.style.outline="none"
		this.object.style.borderRadius=this._borderRadius+"px";

	
		this.object.onfocus = function() {
			self.object.style.border= self._numLine+'px solid ' + self._color2;//"none";	
			self.boolFocus=true;
			if(self.funFocus)self.funFocus()
				
		}

		this.object.onblur= function() {
			self.object.style.border = self._numLine+'px solid '+dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -50);			
			//if(self.fun)self.fun()	
			self.boolFocus=false;
			if(self.funFocus)self.funFocus()
			
		}

		this.object.addEventListener("keyup", function(event) {	
			if (event.keyCode === 13) {
				self.dragInput(self.object.value);
				if(self.fun)self.fun()
				if(self.funEnter!=undefined)self.funEnter()	

			}
		})


		this.object.oninput = function () {	
			if(self.timeFun){
				clearTimeout(timeoutID);
				timeoutID = setTimeout(self.funTimeOut, self.timeFun);
			}			
		}

		this.funTimeOut = function () {
			self.dragInput(self.object.value);
		}

		this.dragInput = function (s) {
			var str=s;

			if(self._okrug!=0){
				str=str*1;
				
				if(typeof str  != "number")str=0;
				if(isNaN(str)==true)str=0;
				str=Math.round(str*(1/self._okrug))/(1/self._okrug);
			}
			self._text=str;
			self._value =str;
			self.object.value = self._text;
			if(self.fun)self.fun()
		}



		var sp;

		this.mouseup = function(e){
  			sp=undefined;
  			if(dcmParam.mobile==false){
  			
  				document.removeEventListener("mouseup", self.mouseup);
  			}else{
  				
  				document.removeEventListener("touchend", self.mouseup);
  				
  			}
  			dcmParam.removeFunMove(self.mousemove);	
  			
  		}
		var ss,sss
  		this.mousemove = function(e){  			
  			
  			if(dcmParam.mobile==false){
	  			if(sp==undefined){
	  				sp={
	  					x:e.clientX,
	  					y:e.clientY,
	  					value:self.value,
	  					b:false
	  				};
	  			}	  			
	  			var ss=(e.clientY-sp.y);		
	  		}else{
	  			if(sp==undefined){
	  				sp={
	  					x:e.targetTouches[0].clientX,
	  					y:e.targetTouches[0].clientY,
	  					value:self.value
	  				};
	  			}
	  			
	  			ss=(e.targetTouches[0].clientY-sp.y)   			  			
	  		}
	  		if(Math.abs(ss)>20){
	  			if(typeof sp.value  != "number")sp.value=0;
				if(isNaN(sp.value)==true)sp.value=0;
	  			sp.b=true;

	  		}
	  		
	  		if(sp.b==true){
	  			sss=Math.round((sp.value+ss* self.okrug)*100)/100;
	  			self.dragInput(sss);
	  		}
  		}


		this.mousedown = function (e) {
			
			
			if(dcmParam.mobile==false){				
  				
  				document.addEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.addEventListener("touchend", self.mouseup);
  				
  			}
  			dcmParam.addFunMove(self.mousemove);	
		}

		this.mousedown1 = function (e) {
			dcmParam.activInp = self;
		}
		this.object.addEventListener("mousedown", self.mousedown1);

		this.setNum = function (okrug) {
			this.okrug=okrug;

			if(dcmParam.mobile==false){
				this.object.addEventListener("mousedown", self.mousedown);
  			
  			}else{
  				this.object.addEventListener("touchstart", self.mousedown);  			
  			}
		}


		this.object.style.width=(this._width-2)+"px";
		this.object.style.height=(this._height-4)+"px";

  		this.div.appendChild(this.object);	

  		this.x=_x||0;	
  		this.y=_y||0;

 
  	} 


  	set numLine(value) {
		if(this._numLine!=value){				
			this._numLine = value;
			this.object.style.border = this._numLine+'px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -50);
			
		}
	}	
	get numLine() { 		
		return  this._numLine;
	}

  	

  	set borderRadius(value) {
		if(this._borderRadius!=value){				
			this._borderRadius = value;
			this.object.style.borderRadius=this._borderRadius+"px";
			
		}
	}	
	get borderRadius() { 		
		return  this._borderRadius;
	}

  	set x(v) {this.position.x = v;}	get x() { return  this.position.x;}
	set y(v) {this.position.y = v;}	get y() { return  this.position.y;}
	set width(v) {
		if(this._width!=v){
			this._width = v;
			this.object.style.width=(this._width-2)+"px";

		}		
	}	
	get width() { return  this._width;}
	
	set height(v) {
		if(this._height!=v){
			this._height = v;
			this.object.style.height=(this._height-4)+"px";

		}		
	}		
	get height() { return  this._height;}

	
	set value(v) {		
		this._value = v;
		this._text = v;	
		
		this.object.value = this._text;
				
	}	
	get value() { return  this._value;}	

	set text(v) {		
		this._text = v;		
		this._value = v;
		this.object.value = this._text;
	}	
	get text() { return  this._text;}

	set textAlign(value) {  		
  		if(this._textAlign!=value){
  			this._textAlign=value
  			this.object.style.textAlign= this._textAlign;	
  		}
  	}	get textAlign() { return  this._textAlign;}	



	set color1(v) {	
		if(this._color1 == v)return	
		this._color1 = v;		
		this.object.style.backgroundColor=this._color1
		this.object.style.border = '1px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -50);	
		
	}	
	get color1() { return  this._text;}

	set colorText1(v) {	
		if(this._colorText1 == v)return		
		this._colorText1 = v;		
		this.object.style.color = this._colorText1;
	}	
	get colorText1() { return  this._colorText1;}


	set fontFamily(v) {	
		if(this._fontFamily == v)return		
		this._fontFamily = v;		
		this.object.style.fontFamily = this._fontFamily;
		
	}	
	get fontFamily() { return  this._fontFamily;}


	set fontSize(v) {
		if(this._fontSize == v)return			
		this._fontSize = v;		
		this.object.style.fontSize = this._fontSize + 'px';
		
	}	
	get fontSize() { return  this._fontSize;}

	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				this.alpha=1;
				this.object.style.pointerEvents=null;	
		    }else{
		    	this.alpha=0.7;		    	
		    	this.object.style.pointerEvents="none";	
		    }		        
		}		
	}
  	get activMouse() { return  this._activMouse;}

}






export class DTextArea extends DCont {
  	constructor(dCont, _x, _y, _text, _fun) {
  		super();
  		this.type="DTextArea";
  		if(dcmParam==undefined)dcmParam=new DCM();
  		dcmParam.add(this);
  		var self=this;

  		var timeoutID=null

   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
  		this._width=100;
  		this._height=100;
  		this.fun=_fun;
  		this._text=_text||"null";
  		this._value = this._text;

  		this._numLine=1;
  		this.timeFun=1000;
  /*		this._color="#008CBA";
	this._color1="#ffffff";
	this._colorText="#ffffff";
	this._colorText1="#999999";
	this._fontSize = 16;
	this._fontFamily = "Arial, Helvetica, sans-serif";
	this._otstup = 2;	*/

		this.funEnter=undefined
  		this._color1=dcmParam._color1;
  		this._colorText1=dcmParam._colorText1;
  		this._fontFamily=dcmParam._fontFamily;
  		this._fontSize=dcmParam._fontSize;
  		this._textAlign="center";

  		this._borderRadius = dcmParam.borderRadius;
		this._color2=dcmParam._color;

		this.boolFocus=false;
		this.funFocus=undefined

  		this.object = document.createElement('textarea')
  		//this.object.type = 'textArea';
  		this.object.value = this._text;
  		this.object.style.backgroundColor=this._color1
		this.object.style.color = this._colorText1;
  		this.object.style.border = this._numLine+'px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -50);		
		this.object.style.fontFamily = this._fontFamily;
		this.object.style.textAlign = 'center';
		this.object.style.fontSize = this._fontSize + 'px';

		this.object.style.width=(this._width-6)+"px";
		this.object.style.height=(this._height-6)+"px";		
		this.object.style.textAlign= this._textAlign;
		this.object.style.resize= "none";
		this.object.style.outline="none"
		this.object.style.borderRadius=this._borderRadius+"px";	
		//this.object.style.htmlElement.isOnFocus = false;
		
		this.object.onfocus = function() {
			self.object.style.border= self._numLine+'px solid ' + self._color2;//"none";	
			self.boolFocus=true;
			if(self.funFocus)self.funFocus()		
		}

		this.object.onblur= function() {
			self.object.style.border = self._numLine+'px solid '+dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -50);			
			//if(self.fun)self.fun()
			self.boolFocus=false;
			if(self.funFocus)self.funFocus()	
		}

		this.object.addEventListener("keyup", function(event) {	
			if (event.keyCode === 13) {
				self.dragInput(self.object.value);
				if(self.fun)self.fun()	
				if(self.funEnter!=undefined)self.funEnter()		
			}
		})


		/*this.object.oninput = function () {			
			clearTimeout(timeoutID);
			timeoutID = setTimeout(self.funTimeOut, 100);
		}*/

		this.object.oninput = function () {	
			if(self.timeFun){
				clearTimeout(timeoutID);
				timeoutID = setTimeout(self.funTimeOut, self.timeFun);
			}			
		}

		this.funTimeOut = function () {
			self.dragInput(self.object.value);
		}

		this.dragInput = function (s) {
			var str=s;			
			self._text=str;
			self._value =str;
			self.object.value = self._text;
			if(self.fun)self.fun()
		}


		//self.activInp
		this.object.addEventListener('mousedown', function() {
			dcmParam.activInp = self;
		})


  		this.div.appendChild(this.object);

  		this.x=_x||0;	
  		this.y=_y||0;		
  	} 


  	set numLine(value) {
		if(this._numLine!=value){				
			this._numLine = value;
			this.object.style.border = this._numLine+'px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -50);
			
		}
	}	
	get numLine() { 		
		return  this._numLine;
	}


  	set borderRadius(value) {
		if(this._borderRadius!=value){				
			this._borderRadius = value;
			this.object.style.borderRadius=this._borderRadius+"px";
			
		}
	}	
	get borderRadius() { 		
		return  this._borderRadius;
	}

  	set x(v) {this.position.x = v;}	get x() { return  this.position.x;}
	set y(v) {this.position.y = v;}	get y() { return  this.position.y;}
	
	set width(v) {
		if(this._width!=v){
			this._width = v;
			this.object.style.width=(this._width-6)+"px";

		}		
	}	
	get width() { return  this._width;}


	set height(v) {
		if(this._height!=v){
			this._height = v;
			this.object.style.height=(this._height-6)+"px";

		}		
	}	
	get height() { return  this._height;}

	
	set value(v) {		
		this._value = v;
		this._text = v;		
		this.object.value = this._text;
				
	}	
	get value() { return  this._value;}	

	set text(v) {		
		this._text = v;		
		this._value = v;
		this.object.value = this._text;
	}	
	get text() { return  this._text;}	

	set textAlign(value) {  		
  		if(this._textAlign!=value){
  			this._textAlign=value
  			this.object.style.textAlign= this._textAlign;	
  		}
  	}	get textAlign() { return  this._textAlign;}	

	set color1(v) {	
		if(this._color1 == v)return	
		this._color1 = v;		
		this.object.style.backgroundColor=this._color1
		this.object.style.border = '1px solid '+dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -50);	
		
	}	
	get color1() { return  this._text;}

	set colorText1(v) {	
		if(this._colorText1 == v)return		
		this._colorText1 = v;		
		this.object.style.color = this._colorText1;
	}	
	get colorText1() { return  this._colorText1;}


	set fontFamily(v) {	
		if(this._fontFamily == v)return		
		this._fontFamily = v;		
		this.object.style.fontFamily = this._fontFamily;
		
	}	
	get fontFamily() { return  this._fontFamily;}


	set fontSize(v) {
		if(this._fontSize == v)return			
		this._fontSize = v;		
		this.object.style.fontSize = this._fontSize + 'px';
		
	}	
	get fontSize() { return  this._fontSize;}

	set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				this.alpha=1;
				this.object.style.pointerEvents=null;	
		    }else{
		    	this.alpha=0.7;		    	
		    	this.object.style.pointerEvents="none";	
		    }		        
		}		
	}
  	get activMouse() { return  this._activMouse;}
}





export class DBitmapData  {
  	constructor(w, h, rgba, fun) {
  		var self = this;
	    this.type = 'DBitmapData';
	   // pl102.addElement(this);

	    this.fun = fun;
	    this._width = w != undefined ? w : 100;
	    this._height = h != undefined ? h : 100;
	    this._color = rgba != undefined ? rgba : [0, 0, 0, 0];
	    this._widthVisi = 100;
	    this._heightVisi = 100;

	    this.canvas = document.createElement('canvas'); // канвас для картинки
	    this.ctx = this.canvas.getContext('2d'); // контекст картинки

	    // загружаем картинку . путь к картинке или data:base64
	    this.load = function (data, isClear) {
	        var img = new Image();
	        img.crossOrigin = 'Anonymous';
	        img.onload = function () {
	            if (isClear) {
	                self.clear();
	            }
	            self.width = img.width;
	            self.height = img.height;
	            self.ctx.drawImage(img, 0, 0);
	            self.imgData = self.ctx.getImageData(0, 0, self.width, self.height);
	            if (self.fun) self.fun();
	        };
	        img.src = data;
	    };

	    this.setCanvas = function (canvas, context2d) {
	        self.canvas = canvas;
	        self.ctx = context2d;
	        self.imgData = self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height);
	        self.upDate();
	    };

	    this.setImage = function (img) {
	        this._width = img.width;
	        this._height = img.height;
	        this.canvas.width = this._width;
	        this.canvas.height = this._height;
	        this.ctx.clearRect(0, 0, this._width, this._width);
	        this.ctx.drawImage(img, 0, 0);
	        this.imgData = this.ctx.getImageData(0, 0, img.width, img.height);
	    };

	    // возвращает data:image/png;base64


	    this.setImage2 = function (img, s) {
	        this._width = img.width;
	        this._height = img.height;
	        this.canvas.width = this._width*s;
	        this.canvas.height = this._height*s;
	        this.ctx.clearRect(0, 0, this._width, this._width);
	        this.ctx.drawImage(img, 0, 0, this._width,this._height,0,0,this._width*s,this._height*s);
	        this.imgData = this.ctx.getImageData(0, 0, img.width, img.height);
	    };







	    this.getData = function () {        
	        return this.canvas.toDataURL();
	    };

	    this.arrRgba = [0, 0, 0, 0];
	    // получить пиксель. x, y - позиция пикселя
	    // возвращает масив [r,g,b,a]. при выходе за контекст [0, 0, 0, 0]
	    this.getPixel = function (x, y) {
	        this.arrRgba[0] = this.imgData.data[(y * this.imgData.width + x) * 4 + 0];
	        this.arrRgba[1] = this.imgData.data[(y * this.imgData.width + x) * 4 + 1];
	        this.arrRgba[2] = this.imgData.data[(y * this.imgData.width + x) * 4 + 2];
	        this.arrRgba[3] = this.imgData.data[(y * this.imgData.width + x) * 4 + 3];

	        this.arrRgba[0] = this.arrRgba[0] ? this.arrRgba[0] : 0;
	        this.arrRgba[1] = this.arrRgba[1] ? this.arrRgba[1] : 0;
	        this.arrRgba[2] = this.arrRgba[2] ? this.arrRgba[2] : 0;
	        this.arrRgba[3] = this.arrRgba[3] ? this.arrRgba[3] : 0;
	        return this.arrRgba;
	    };

	    this.getAlphaPixel = function (x, y) {
	        return this.getPixel(x, y)[3];
	    };

	    // установить канал пикселя .x, y - позиция
	    // rgba - масив [r,g,b,a]
	    this.setPixelDin = function (i, j, rgba) {
	        var imgData = this.ctx.createImageData(1, 1);
	        imgData.data[0] = rgba[0];
	        imgData.data[1] = rgba[1];
	        imgData.data[2] = rgba[2];
	        imgData.data[3] = rgba[3];
	        this.ctx.putImageData(imgData, i, j);
	    };

	    this.setPixel = function (i, j, rgba) { // установить пиксель по координатам
	        this.imgData.data[(j * this.imgData.width + i) * 4 + 0] = rgba[0];
	        this.imgData.data[(j * this.imgData.width + i) * 4 + 1] = rgba[1];
	        this.imgData.data[(j * this.imgData.width + i) * 4 + 2] = rgba[2];
	        this.imgData.data[(j * this.imgData.width + i) * 4 + 3] = rgba[3];
	    };

	    this.addPixel = function (i, j, rgba) { // добавить пиксель
	        this.setPixel(i, j, this.blendColors(this.getPixel(i, j), rgba));
	    };

	    //
	    this.addImgData = function (imgData, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) { // image, sx, sy, sWidth, sHeight, dx, dy
	        var context = {
	            imgData: imgData,
	            arrRgba: []
	        };
	        var countx = 0;
	        var county = 0;
	        for (var i = sx; i < sWidth; i++) {
	            for (var j = sy; j < sHeight; j++) {
	                var pixelOther = this.getPixel.call(context, i, j);

	                this.addPixel(dx + countx, dy + county, pixelOther);

	                county++;
	            }
	            county = 0;
	            countx++;
	        }
	    };

	    this.addBitmapData = function (bmp, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) { // todo dWidth
	        if (arguments.length == 1) {
	            sx = sy = 0;
	            sWidth = bmp.imgData.width;
	            sHeight = bmp.imgData.height;
	            dx = dy = 0;
	        } else if (arguments.length == 3) {
	            dx = sx;
	            dy = sy;
	            sx = sy = 0;
	            sWidth = bmp.imgData.width;
	            sHeight = bmp.imgData.height;
	        } else if (arguments.length == 9) {
	           
	        } else {
	           
	        }
	        this.addImgData(bmp.imgData, sx, sy, sWidth, sHeight, dx, dy);
	    };

	    this.upDate = function () {
	        this.ctx.putImageData(this.imgData, 0, 0);
	    };

	    this.changeWH = function (width, height) {
	        var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
	        this.canvas.width = width != undefined ? width : this._width;
	        this.canvas.height = height != undefined ? height : this._height;
	        this.clear();
	        this.ctx.putImageData(imgData, 0, 0);
	        this.imgData = this.ctx.getImageData(0, 0, this._width, this._height);
	        this.widthVisi = this._widthVisi;
	        this.heightVisi = this._heightVisi;
	    };

	    this.setColor = function (rgba) {
	        if (!rgba) rgba = this._color;
	        this.ctx.fillStyle = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] / 255 + ')';
	    };

	    this.setPixelTempData = function (i, j, rgba) {
	        this.tempData.data[(j * this.tempWidth + i) * 4 + 0] = rgba[0];
	        this.tempData.data[(j * this.tempWidth + i) * 4 + 1] = rgba[1];
	        this.tempData.data[(j * this.tempWidth + i) * 4 + 2] = rgba[2];
	        this.tempData.data[(j * this.tempWidth + i) * 4 + 3] = rgba[3];
	    };

	    this.tempData = [];
	    this.tempWidth = 100;
	    var sw = 1,
	        sh = 1,
	        pw = 0,
	        ph = 0;
	    var vw, vh;
	    this.compress = function (w, h, funCompress) {
	        w = Math.round(w);
	        h = Math.round(h);
	        if (w > this._width) {
	            w = this._width;
	        }
	        if (h > this._height) {
	            h = this._height;
	        }
	        sw = this._width / w;
	        sh = this._height / h;

	        pw = sw % 1;
	        ph = sh % 1;
	        sw -= pw;
	        sh -= ph;

	        this.tempWidth = w;
	        this.tempData = this.ctx.createImageData(w, h);

	        vw = (this._width + 2) / w;
	        vh = (this._height + 2) / h;
	        for (var i = 0, ii = 0; i < w; i++) {
	            for (var j = 0, jj = 0; j < h; j++) {
	                this.setPixelTempData(i, j, this.getPixelMerge(Math.round(i * vw), Math.round(j * vh)));
	            }
	        }

	        this.width = w;
	        this.height = h;
	        this.imgData = this.tempData;
	        this.upDate();
	        if (funCompress) funCompress(this);
	    };

	    this.getPixelMerge = function (i, j) {
	        var basePixel = this.getPixel(i, j);
	        this.tempPixel[0] = basePixel[0];
	        this.tempPixel[1] = basePixel[1];
	        this.tempPixel[2] = basePixel[2];
	        this.tempPixel[3] = basePixel[3];
	        var countPix = 1; // количество взятых пикселей
	        var pix;
	        var ss = 1;
	        for (var ii = 0; ii < sw; ii++) {
	            if (i + (ii + 1) < this._width) { // не вышли за пределы , в право берем пиксель для мержа
	                pix = this.getPixel(i + (ii + 1), j);
	                this.tempPixel[0] += (pix[0] * ss);
	                this.tempPixel[1] += (pix[1] * ss);
	                this.tempPixel[2] += (pix[2] * ss);
	                this.tempPixel[3] += (pix[3] * ss);
	                countPix++;
	            } else { // иначе добавляем базовый пиксель
	                this.tempPixel[0] += basePixel[0] * ss;
	                this.tempPixel[1] += basePixel[1] * ss;
	                this.tempPixel[2] += basePixel[2] * ss;
	                this.tempPixel[3] += basePixel[3] * ss;
	                countPix++;
	            }
	            if (i - (ii + 1) > 0) { // не вышли за пределы , в лево берем пиксель для мержа
	                pix = this.getPixel(i - (ii + 1), j);
	                this.tempPixel[0] += pix[0] * ss;
	                this.tempPixel[1] += pix[1] * ss;
	                this.tempPixel[2] += pix[2] * ss;
	                this.tempPixel[3] += pix[3] * ss;
	                countPix++;
	            } else { // иначе добавляем базовый пиксель
	                this.tempPixel[0] += basePixel[0] * ss;
	                this.tempPixel[1] += basePixel[1] * ss;
	                this.tempPixel[2] += basePixel[2] * ss;
	                this.tempPixel[3] += basePixel[3] * ss;
	                countPix++;
	            }
	        }
	        ss = 1;
	        for (var jj = 0; jj < sh; jj++) {
	            if (j + (jj + 1) < this._height) { // не вышли за пределы , в низ берем пиксель для мержа
	                pix = this.getPixel(i, j + (jj + 1));
	                this.tempPixel[0] += pix[0] * ss;
	                this.tempPixel[1] += pix[1] * ss;
	                this.tempPixel[2] += pix[2] * ss;
	                this.tempPixel[3] += pix[3] * ss;
	                countPix++;
	            } else { // иначе добавляем базовый пиксель
	                this.tempPixel[0] += basePixel[0] * ss;
	                this.tempPixel[1] += basePixel[1] * ss;
	                this.tempPixel[2] += basePixel[2] * ss;
	                this.tempPixel[3] += basePixel[3] * ss;
	                countPix++;
	            }
	            if (j - (jj + 1) > 0) { // не вышли за пределы , в вверх берем пиксель для мержа
	                pix = this.getPixel(i, j - (jj + 1));
	                this.tempPixel[0] += pix[0] * ss;
	                this.tempPixel[1] += pix[1] * ss;
	                this.tempPixel[2] += pix[2] * ss;
	                this.tempPixel[3] += pix[3] * ss;
	                countPix++;
	            } else { // иначе добавляем базовый пиксель
	                this.tempPixel[0] += basePixel[0] * ss;
	                this.tempPixel[1] += basePixel[1] * ss;
	                this.tempPixel[2] += basePixel[2] * ss;
	                this.tempPixel[3] += basePixel[3] * ss;
	                countPix++;
	            }
	        }
	        this.tempPixel[0] = this.tempPixel[0] / (countPix);
	        this.tempPixel[1] = this.tempPixel[1] / (countPix);
	        this.tempPixel[2] = this.tempPixel[2] / (countPix);
	        this.tempPixel[3] = this.tempPixel[3] / (countPix);
	        return this.tempPixel;
	    };

	    this.tempPixel = [];

	    this.clear = function () {
	        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	        this.imgData = this.ctx.getImageData(0, 0, 1, 1);
	    };

	    this.width = this._width;
	    this.height = this._height;
	    this.setColor();
	    this.ctx.fillRect(0, 0, this._width, this._height);
	    this.imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

	    this.changeWH();

	    function blendColors () { // миксование rgba цветов blendColors([69,109,160,255],[61,47,82,204])//return[63,59,98,255]
	        var args = [];
	        for (var i = 0; i < arguments.length; i++) {
	            args.push(arguments[i]);
	        }
	        var base = [0, 0, 0, 0];
	        var mix;
	        var added;
	        var alpha;
	        var alphaBase;
	        while (added = args.shift()) {
	            if (typeof added[3] === 'undefined') {
	                added[3] = 255;
	            }

	            alpha = added[3] / 255;
	            alphaBase = base[3] / 255;

	            if (alphaBase && alpha) {
	                mix = [0, 0, 0, 0];
	                mix[3] = 1 - (1 - alpha) * (1 - alphaBase); // alpha
	                mix[0] = Math.round((added[0] * alpha / mix[3]) + (base[0] * alphaBase * (1 - alpha) / mix[3])); // red
	                mix[1] = Math.round((added[1] * alpha / mix[3]) + (base[1] * alphaBase * (1 - alpha) / mix[3])); // green
	                mix[2] = Math.round((added[2] * alpha / mix[3]) + (base[2] * alphaBase * (1 - alpha) / mix[3])); // blue
	            } else if (alpha) {
	                mix = added;
	            } else {
	                mix = base;
	            }
	            base = mix;
	        }
	        mix[3] = mix[3] * 255;// возвращяем обратно
	        return mix;
	    }
	    this.blendColors = blendColors;	

	}

	set width(value) {		
		
	    var old = this._width;
        // if (this._width == value) return;
        this._width = value;
        this.changeWH();
        if (old < this._width) {
            this.setColor();
            this.ctx.fillRect(old, 0, this._width, this._height);
        }
        this.widthVisi = this._widthVisi;	    
		    		        
				
	}
  	get width() { return  this._width;}

	set height(value) {		
		
	    var old = this._height;
        // if (this._height == value) return;
        this._height = value;
        this.changeWH();
        if (old < this._height) {
            this.setColor();
            this.ctx.fillRect(0, old, this._width, this._height);
        }
        this.heightVisi = this._heightVisi;		
	}
  	get height() { return  this._height;}


  	set widthVisi(value) {		
		  this._widthVisi = value;	    		
	}
  	get widthVisi() { return  this._widthVisi;}	

  	set heightVisi(value) {		
		  this._heightVisi = value;	    		
	}
  	get heightVisi() { return  this._heightVisi;}	
}


export class DScrollBarH extends DCont {
  	constructor(dCont, _x, _y, _fun) {
  	super(); 
  		this.type="DScrollBarH";
  		this.dcmParam=dcmParam; 
  		this.dcmParam.add(this)
  		var self=this
  		this.x=_x||0;	
  		this.y=_y||0;
   		this._text="null";
   		this.fun=_fun;

   		this.fun_mouseover=undefined;
   		this.fun_mouseout=undefined;
   		this.fun_mousedown=undefined;

  		this._width=100;
  		this._height=dcmParam.wh;
  		this._color=dcmParam._color;
  		this._colorText=dcmParam._colorText;
  		this._fontSize=dcmParam._fontSize;
  		this._borderRadius=dcmParam.borderRadius;
  		this._widthContent = 200; // высота контента
    	this._offsetHit = 0;
    	this._value=0;
    	this._otstup=0;
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);


   		

   		this.panel = new DPanel(this, 0, 0);
   		
   		this.but = new DPanel(this, 0, 0);
   		this.but.color1=this._color
   		this.panelA = new DPanel(this, this._offsetHit, this._offsetHit);
   		this.panelA.alpha=0;
   		/*this.but.fun_mousedown=function(){  			
  			self.onDragStart()
  		} */


  		/*if(dcmParam.mobile==false){
  			this.but.div.addEventListener("mousedown", self.onDragStart);
  		}else{
  			this.but.div.removeEventListener("touchstart", self.onDragStart);
  		}	*/



   		var sp=undefined;
   		var pv, pv2, sss;
   		this.mouseup = function(e){
   			document.body.style.pointerEvents='auto'
  			sp=undefined;
  			if(dcmParam.mobile==false){  				
  				document.removeEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.removeEventListener("touchend", self.mouseup);  				
  			}
  			dcmParam.removeFunMove(self.mousemove);	
  		}

  		this.mousemove = function(e){  			
  			var ss=0;
  			var sss=0;
  			var xz=0;
  			if(e.clientX==undefined){
  				xz=e.targetTouches[0].clientX
  			}else{
  				xz=e.clientX
  			}

  			
  			if(sp==undefined){
  				sp={
  					x:xz,
  					x1:self.x,
  					y1:self.y
  				};
  			}
  			ss=(xz-sp.x)  					
  			sss=ss+pv2;
	  		

	  	
  		


  			if(self.but.width+sss>self._width)sss=self._width-self.but.width;
  			if(sss<0)sss=0;
  			self.value=sss/(self._width-self.but.width)*100;
  			if(self.fun)self.fun()
  			
  		}



   		this.onDragStart = function (e) {
        	//self.downLocal = self.toLocal(pl102.global);
        	pv = self.value;
        	pv2 = self.but.x;


        	/*sss=e.offsetX-self.but.width/2
			if(self.but.width+sss>self._width)sss=self._width-self.but.width;
  			if(sss<0)sss=0;
  			self.value=sss/(self._width-self.but.width)*100;
  			self.onDragStart()
  			if(self.fun)self.fun()*/

  			document.body.style.pointerEvents='none'	
        	if(dcmParam.mobile==false){
  				
  				document.addEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.addEventListener("touchend", self.mouseup);
  				
  			}
  			dcmParam.addFunMove(self.mousemove);	
        }

        this.panelA.div.addEventListener("mousedown", function(e){			
			sss=e.offsetX-self.but.width/2
			if(self.but.width+sss>self._width)sss=self._width-self.but.width;
  			if(sss<0)sss=0;
  			self.value=sss/(self._width-self.but.width)*100;
  			self.onDragStart(e)
  			if(self.fun)self.fun()
		})



   		this._width--;
   		this.width=this._width+1;
   		this._height--;
   		this.height=this._height+1;
  	}




  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			if (this._width + this._otstup * 2 >= this._widthContent) this.but.width = this._width - this._otstup * 2;
            else this.but.width = this._width * this._width / this._widthContent;
            if (this.but.width < this._wh) this.but.width = this._wh;

            this.panel.width = this._width;
            this.panelA.width = this._width;

            var pv = this.value;
            this._value = -1;
            this.value = pv;
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
			this.panel.height = value;
			this.but.height = value;
			this.panelA.height =this._height+this._offsetHit*2;           
		}		
	}	
	get height() { return  this._height;}


	set borderRadius(value) {
		if(this._borderRadius!=value){
			this._borderRadius = value;
			this.but.borderRadius=this.panel.borderRadius=this.panelA.borderRadius = value;			
		}
	}	
	get borderRadius() { 		
		return  this._borderRadius;
	}


	set widthContent(value) {
		if(this._widthContent!=value){
			
            this._widthContent = value;
            var vv = this._width - this._otstup * 2;
            if (vv >= this._widthContent) {
                this.but.width = vv;// -this._otstup*2;
            } else {
                var s = vv * vv / this._widthContent;
                if (s < this._wh) s = this._wh; // ставим чтоб меньше кнопка не была кнопка
                var d = s - this.but.width;
                // кнопка только по панели
                if (this.but.x + this.but.width + d > vv ) this.but.x -= d;
                else if (this.but.x < 0) this.but.x = 0;
                this.but.width = s;
            }

            var pv = this.value;
            this._value = -1;
            this.value = pv;
		}		
	}	
	get widthContent() { return  this._widthContent;}

	set value(v) {
		if(this._value!=v){
			this._value = v;
           
            if (isNaN(parseFloat(this._value))) this._value = 0;
            if (this._value < 0) this._value = 0;
            if (this._value > 100) this._value = 100;
            this.but.x = this._otstup + ((this._width - this._otstup * 2) - this.but.width) * (this._value / 100);
            this._scrolValue = (this._widthContent - this._width) * this._value / 100;
            if (this._scrolValue < 0) this._scrolValue = 0;		
		}
	}	
	get value() { 		
		return  this._value;
	}

	set offsetHit(v) {
		if(this._offsetHit!=v){
			this._offsetHit = v;
			this.panelA.height =this._height+this._offsetHit*2;
          	this.panelA.y=-this._offsetHit;	
		}
	}	
	get offsetHit() { 		
		return  this._offsetHit;
	}
}




export class DScrollBarV extends DCont {
  	constructor(dCont, _x, _y, _fun) {
  		super(); 
  		this.type="DScrollBarV";
  		this.dcmParam=dcmParam; 
  		this.dcmParam.add(this)
  		var self=this
  		this.x=_x||0;	
  		this.y=_y||0;
   		this._text="null";
   		this.fun=_fun;

   		this.fun_mouseover=undefined;
   		this.fun_mouseout=undefined;
   		this.fun_mousedown=undefined;

  		this._width=dcmParam.wh;
  		this._height=100;
  		this._color=dcmParam._color;
  		this._colorText=dcmParam._colorText;
  		this._fontSize=dcmParam._fontSize;
  		this._borderRadius =dcmParam.borderRadius;
  		this._heightContent = 200; // высота контента
    	this._offsetHit = 0;
    	this._value=0;
    	this._otstup=0;
   		if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);




   		this.panel = new DPanel(this, 0, 0);
   		
   		this.but = new DPanel(this, 0, 0);
   		this.but.color1=this._color

   		this.panelA = new DPanel(this, this._offsetHit, this._offsetHit);
   		this.panelA.alpha=0;

   		//this.but.object.style.transform       = 'rotate('+90+'deg)'; 

   			

   		var sp=undefined;
   		var pv, pv2, sss;
   		this.mouseup = function(e){
   			document.body.style.pointerEvents='auto'
  			sp=undefined;
  			if(dcmParam.mobile==false){
  			
  				document.removeEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.removeEventListener("touchend", self.mouseup);
  				
  			}
  			dcmParam.removeFunMove(self.mousemove);	
  		}

  		this.mousemove = function(e){  			
  			var ss=0;
  			var sss=0;
  			var xz=0;
  			if(e.clientY==undefined){
  				xz=e.targetTouches[0].clientY
  			}else{
  				xz=e.clientY
  			}



  			if(sp==undefined){
  				sp={
  					x:e.clientX,
  					y:xz,
  					x1:self.x,
  					y1:self.y
  				};
  			}  					
  			var ss=(xz-sp.y)   			
  			sss=ss+pv2;
  			if(self.but.height+sss>self._height)sss=self._height-self.but.height;
  			if(sss<0)sss=0;

  			self.value=sss/(self._height-self.but.height)*100;
  			

  			if(self.fun)self.fun()
  			
  		}



   		this.onDragStart = function () {
        	//self.downLocal = self.toLocal(pl102.global);
        	document.body.style.pointerEvents='none'
        	pv = self.value;
        	pv2 = this.but.y;
        	if(dcmParam.mobile==false){
  			
  				document.addEventListener("mouseup", self.mouseup);
  			}else{  				
  				document.addEventListener("touchend", self.mouseup);
  				
  			}
  			dcmParam.addFunMove(self.mousemove);
        }

        this.panelA.div.addEventListener("mousedown", function(e){			
			sss=e.offsetY-self.but.height/2
			if(self.but.height+sss>self._height)sss=self._height-self.but.height;
  			if(sss<0)sss=0;
  			self.value=sss/(self._height-self.but.height)*100;
  			self.onDragStart()
  			if(self.fun)self.fun()
		})



   		this._width--;
   		this.width=this._width+1;
   		this._height--;
   		this.height=this._height+1;
  	}




  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.panel.width = value;
			this.but.width = value;
			this.panelA.width =this._width+this._offsetHit*2;	
			//this.but.object.style.left=-(this.but.width/2-this._width/2)+"px"
			//this.but.object.style.top=(this.but.width/2-this._width/2)+"px"	
		}		
	}	
	get width() { return  this._width;}

	set height(value) {
		if(this._height!=value){
			this._height = value;
            if (this._height + this._otstup * 2 >= this._heightContent) this.but.height = this._height - this._otstup * 2;
            else this.but.height = this._height * this._height / this._heightContent;
            if (this.but.height < this._wh) this.but.height = this._wh;
            // this.button.height = this._height;
            this.panel.height = this._height;
            this.panelA.height = this._height;
            var pv = this._value;
            this.value = -1;
            this.value = pv;
		}		
	}	
	get height() { return  this._height;}

	set borderRadius(value) {
		if(this._borderRadius!=value){
			this._borderRadius = value;
			this.but.borderRadius=this.panel.borderRadius=this.panelA.borderRadius = value;			
		}
	}	
	get borderRadius() { 		
		return  this._borderRadius;
	}


	set heightContent(value) {
		if(this._heightContent!=value){
			this._heightContent = value;
            var vv = this._height - this._otstup * 2;
            if (vv >= this._heightContent) {
                this.but.height = vv;// -this._otstup*2;
            } else {
                var s = vv * vv / this._heightContent;
                if (s < this._wh) s = this._wh; // ставим чтоб меньше кнопка не была кнопка
                var d = s - this.but.height;
                // кнопка только по панели
                if (this.but.y + this.but.height + d > vv) this.but.y -= d;
                else if (this.but.y < 0) this.but.y = 0;
                this.but.height = s;
            }
            // this.value = this._value;
            var pv = this._value;
            this.value = -1;
            this.value = pv;
            //this.but.object.style.left=-(this.but.width/2-this._width/2)+"px"
            //this.but.object.style.top=(this.but.width/2-this._width/2)+"px"	
		}		
	}	
	get heightContent() { return  this._heightContent;}

	set value(v) {
		if(this._value!=v){
			this._value = v;
            if (isNaN(parseFloat(this._value))) this._value = 0;
            if (this._value < 0) this._value = 0;
            if (this._value > 100) this._value = 100;
            this.but.y = this._otstup + ((this._height - this._otstup * 2) - this.but.height) * (this._value / 100);
            this._scrolValue = (this._heightContent - this._height) * this._value / 100;
            if (this._scrolValue < 0) this._scrolValue = 0;			
		}
	}	
	get value() { 		
		return  this._value;
	}

	set offsetHit(v) {
		if(this._offsetHit!=v){
			this._offsetHit = v;
			this.panelA.width =this._width+this._offsetHit*2;
          	this.panelA.x=-this._offsetHit;	
		}
	}	
	get offsetHit() { 		
		return  this._offsetHit;
	}
}


export function CtrlCV (cont) {
	var self = this;

	this.textArea = document.createElement('textarea');
	this.textArea.value = 'текст';
	document.body.appendChild(this.textArea);
	this.textArea.fokk = true;

	this.textArea.style.zIndex = -100;
	this.textArea.style.position = 'absolute';
	this.textArea.style.top = '-100px';
	this.textArea.style.visibility = 'hidden';



	this.boolCntr = false;
	this.boolC = false;
	this.boolV = false;

	this.array = [];
	this.addFun = function (_fun) {
		this.array.push(_fun);
	};

	this.str = null;
	this.zapros = function (_s) {
		
		var i = 0;
		if (_s === undefined) {
			this.str = null;
			for (i = 0; i < this.array.length; i++) {
				this.str = this.array[i]();
				if (this.str != null) {
					this.textArea.value = this.str;
					break;
				}
			}
		} else {
			for (i = 0; i < this.array.length; i++) {
				this.array[i](_s);
			}
		}
	};

	this.saveText = function (s) {
		this.str=s;
		this.textArea.value = this.str;
		this.save()
		try { 
		    document.execCommand('copy'); 
		} catch(err) { 
		   
		} 
	}


	this.save = function (s) {





		if (this.str != null) {
			if (this.getFokus() === true) {
				this.textArea.style.visibility = 'visible';
				this.textArea.focus();
				this.textArea.select();
			
				setTimeout(function () {
					// self.zapros(self.textArea.value)
					self.textArea.style.visibility = 'hidden';
				}, 1);
			}

		}
	};

	






	this.getFokus = function () {
		/*var ii = $('*:focus');
		if (ii) {
			if (ii.length !== undefined) {
				if (ii.length !== 0) {
					if (ii[0].fokk === undefined) {
						return false;
					}
				}
			}
		}*/

		return true;
	};


	this.saveNa = function () {
		
		
		if(this.array.length==0)return;	

		if(document.activeElement.children!=undefined)return;

		if (this.getFokus() === true) {
			this.textArea.style.visibility = 'visible';
			this.textArea.focus();
			this.textArea.select();


			setTimeout(function () {
				self.zapros(self.textArea.value);
				self.textArea.style.visibility = 'hidden';
			}, 1);
		}

	};

	// 17 контрл
	// 67 С
	// 86 V
	document.addEventListener('keydown', function (e) {
	// this.document.keydown(function (e) {
		if (e.keyCode === 17) {
			if (self.boolCntr === false) {
				self.boolCntr = true;
				self.zapros();
				if (self.boolC === true) {
					self.save();
				}
				if (self.boolV === true) {
					self.saveNa();
				}

			}
		}
		if (e.keyCode === 67) {
			if (self.boolC === false) {
				self.boolC = true;
				self.zapros();
				if (self.boolCntr === true) {
					self.save();
				}

			}
		}
		if (e.keyCode === 86) {
			if (self.boolV === false) {
				self.boolV = true;
				if (self.boolCntr === true) {
					self.saveNa();
				}
			}
		}


	});

	document.addEventListener('keyup', function (e) {
	// this.document.keyup(function (e) {
		if (e.keyCode === 17) {
			if (self.boolCntr === true) {
				self.boolCntr = false;

			}
		}
		if (e.keyCode === 67) {
			if (self.boolC === true) {
				self.boolC = false;
			}
		}
		if (e.keyCode === 86) {
			if (self.boolV === true) {
				self.boolV = false;
			}
		}
	});
}












export class DWindowS extends DCont {
    constructor(dCont, _x, _y, _text, _fun,_link) {
        super(); 
        this.type="DWindowS";
        if(dcmParam==undefined)dcmParam=new DCM();
        
        var self=this;
        this.fun=_fun;  
        this.x=_x||0;   
        this.y=_y||0;
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);    
        this._width=200;
        this._height=200;
        this._color=dcmParam._color;
        this._color1=dcmParam._color1;
        this._wh=dcmParam.wh;
        this.sizeFont=20
        this.otstupVerh=50
        this.otstup=15


   

        this._minimize = false; // спрятать низ или открыть по ум открыто   
        this._hasMinimizeButton = false; // кнопочка для спрятать
        this._dragBool = true;  
        this._activMouse = true;        

        this._text="nullMMy";
        this.textPlus="";

        this.panel=new DPanel(this,0,0);
        this.panel.boolLine=false;
        this.panel.color1='#e1e8ee'


        this.panel1=new DPanel(this, this.otstup, this.otstupVerh);
        this.panel1.width=this._width-this.otstup*2
        this.panel1.height=this._height-this.otstupVerh-this.otstup;
        this.panel1.boolLine=false;
        this.panel1.color1='#adadad';




        this.button=new DButton(this,0,0," ");
        this.button.fun_mousedown=function(){
            if( self._dragBool != false){
                self.startDrag();
            }
        }
        this.button.height=this.otstupVerh;
        this.button.alpha=0;


        this.label=new DLabel(this,this.otstup,(this.otstupVerh - this.sizeFont)/2,"");
        this.label.fontSize=this.sizeFont;
        this.label.fontFamily="SFUIDisplay-Light"


        this.content=new DCont(this);
        this.content.y=this.otstupVerh;
        this.content.x=this.otstup;


        //DButSim funLoadImag
        this.butKrest
        if(_link!=undefined){
            this.butKrest=new DButSim(this,0,0,"",function(){            
                self.fun()
            });
            this.butKrest.alphaTeni=0
            this.butKrest.boolLine=false;
        
            this.butKrest.color=this.panel.color1;           
            this.butKrest.boolLine=false;
            //this.butKrest.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 


            this.butKrest.width = this.butKrest.height= this.otstupVerh-this.otstup;
            this.butKrest.funLoadImag=function(){  

                this.width=this.image.picWidth;
                this.height=this.image.picHeight;

                this.y=(self.otstupVerh-this.height)/2
                this.visible=true;
                self._width--;
                self.width=self._width+1;
            }
            this.butKrest.loadImeg(_link)   
            this.butKrest.visible=false;
        }
        


        var sp=undefined;   

        this.mouseup = function(e){
            sp=undefined;
            if(dcmParam.mobile==false){
            
                document.removeEventListener("mouseup", self.mouseup);
            }else{
                
                document.removeEventListener("touchend", self.mouseup);
               
            }
            	dcmParam.removeFunMove(self.mousemove);	
            
        }

        this.mousemove = function(e){           
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX,
                        y:e.clientY,
                        x1:self.x,
                        y1:self.y
                    };
                }
                var ss=sp.x1+(e.clientX-sp.x)           
                self.x=ss
                var ss=sp.y1+(e.clientY-sp.y)           
                self.y=ss
            }else{
                if(sp==undefined){
                    sp={
                        x:e.targetTouches[0].clientX,
                        y:e.targetTouches[0].clientY,
                        x1:self.x,
                        y1:self.y
                    };
                }
                var ss=sp.x1+(e.targetTouches[0].clientX-sp.x)              
                self.x=ss
                var ss=sp.y1+(e.targetTouches[0].clientY-sp.y)              
                self.y=ss               
            }
        }


        this.startDrag = function(){            
            if(dcmParam.mobile==false){
               
                document.addEventListener("mouseup", self.mouseup);
            }else{
                
                document.addEventListener("touchend", self.mouseup);
                
            }
            dcmParam.addFunMove(self.mousemove);		
            
        }


        this._width--;
        this._height--;

        dcmParam.add(this);
        this.width=this._width+1;
        this.height=this._height+1;
        this.text=_text||"null";
        this.hasMinimizeButton=true
    }




    set x(value) {this.position.x = value;} get x() { return  this.position.x;}
    set y(value) {this.position.y = value;} get y() { return  this.position.y;}
    set width(value) {
        if(this._width!=value){
            this._width = value;
            this.panel.width = value;
            this.button.width = value;
            this.panel1.width=this._width-this.otstup*2
            this.label.width=this._width-this.otstup*2


            if(this.butKrest!=undefined)this.butKrest.x= this._width-this.butKrest.width-this.otstup
            
        }       
    }   
    get width() { return  this._width;}

    set height(value) {
        if(this._height!=value){
            this._height = value;
            this.panel.height = this._height;
            this.panel1.height= this._height-this.otstupVerh-this.otstup
        }       
    }   
    get height() { return  this._height;}

    set color(value) {
        if(this._color!=value){
            this._color = value;
            var c=dcmParam.compToHexArray(dcmParam.hexDec(this._color), -50);       
            this.button.color= c;   
        }
    }   
    get color() {       
        return  this._color;
    }

    set text(value) {       
        this._text = value; 
       
        this.label.text=this.textPlus+" "+value;       
    }   
    get text() {        
        return  this._text;
    }

    set minimize(value) {
        if(this._minimize!=value){
            this._minimize = value;
            if(this._hasMinimizeButton==true){
                if(this._minimize==true){
                    this.textPlus="►  ";
                }else{
                    this.textPlus="▼  ";
                }
                this.text=this._text;
            }           
            this.content.visible=!this._minimize;
            this.panel.visible=!this._minimize;         
        }
    }   
    get minimize() {        
        return  this._minimize;
    }
    set hasMinimizeButton(value) {
        if(this._hasMinimizeButton!=value){
            this._hasMinimizeButton = value;            
           // this.buttonMin.visible=this._hasMinimizeButton;
            if(value==true){
                if(this._minimize==true){
                    this.textPlus="►  ";
                }else{
                    this.textPlus="▼  ";
                }
                
            }else{
                this.textPlus="";
            }
            this.text=this._text;
        }
    }   
    get hasMinimizeButton() {       
        return  this._hasMinimizeButton;
    }
    set dragBool(value) {
        if(this._dragBool!=value){
            this._dragBool = value;
            if(value){
                this.button.object.style.cursor="pointer";
            }else{
                this.button.object.style.cursor="auto";
            }       
            
        }
    }   
    get dragBool() {        
        return  this._dragBool;
    }

    set activMouse(value) {     
        if(this._activMouse!=value){
            this._activMouse = value;
            this.button.activMouse = value;                         
        }       
    }
    get activMouse() { return  this._activMouse;}
}






export class DButSim extends DCont {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super(); 
        this.type="DButSim";
        this.dcmParam=dcmParam; 
        this.dcmParam.add(this)
        var self=this
       
        this._text=_text||"null";
        this.fun=_fun;
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
        this.x=_x||0;   
        this.y=_y||0;

        this.fun_mouseover=undefined;
        this.fun_mouseout=undefined;
        this.fun_mousedown=undefined;
        this.funDownFile=undefined;

        this.dCont=new DCont(this)

        this._width=100;
        this._height=dcmParam.wh;
        this._color=dcmParam._color;
        this._colorText=dcmParam._colorText;
        this._fontSize=dcmParam._fontSize;
        this._fontFamily=dcmParam._fontFamily;
        this._borderRadius=0;
        this._boolLine=dcmParam._boolLine;


        this.alphaTeni=0.1;

        this.aSah=1;
        this.alphaAnimat=true;




        this.panel=new DPanel(this.dCont, 0, 0)
        this.panel.width=this._width+1;
        this.panel.height=this._height+1;
        this.panel.color1=this._color

        this.panel1=new DPanel(this.dCont, 0, 0)
        this.panel1.width=this._width+1;
        this.panel1.height=this._height+1;
        this.panel1.color1="#000000";
        this.panel1.alpha=0

        
        this.panel.div.style.borderRadius=this._borderRadius+"px";
        this.panel1.div.style.borderRadius=this._borderRadius+"px";

        this.label=new DLabel(this.dCont, 5, (this._height-this._fontSize)/2,_text);    
        this.label.div.style.pointerEvents="none";


        this.panel1.div.style.cursor="pointer";
 


        this.mousedown=function(){
            if (self.file != undefined) {
                self.file.value = null;
                self.file.click();
                if (self.funDownFile)self.funDownFile();
                return;
            }

            if(self.fun)self.fun();
        }

        var timerId
        this.dragIcontime=function(){
            self.dCont.alpha=self.aSah;
            if(self.aSah>1){
                self.aSah=1;
                if(timerId!=undefined){
                    clearInterval(timerId);
                    timerId=undefined
                   
                }
                return
            }

            if(timerId==undefined){
                timerId = setInterval(this.dragIcontime, 10)
            }else{
                self.aSah+=0.01;
            }           
            
        }


        this.dragIcon=function(){ 
            
            if(this.alphaAnimat==true){
                if(this.aSah==1){
                   
                    this.aSah=0.5;
                    this.dragIcontime();
                }
            }
        }



        this.mouseover=function(){            
            self.panel1.alpha=self.alphaTeni; 
            self.dragIcon()                  
            if(self.fun_mouseover)self.fun_mouseover();
        }    
        this.mouseout=function(){
               
            self.panel1.alpha=0    
            if(self.fun_mouseout)self.fun_mouseout();
        }       


        if(dcmParam.mobile==false){
            this.panel1.div.addEventListener("mousedown", self.mousedown)
            this.panel1.div.addEventListener("mouseover", self.mouseover)
            this.panel1.div.addEventListener("mouseout", self.mouseout)
        }else{
            this.panel1.div.addEventListener("touchstart", self.mousedown)

        }



        this.image=undefined;
        this.reDrag=function(){
            this.panel.width=this.panel1.width=this._width+1;
            this.panel.height=this.panel1.height=this._height+1;
            this.label.width=this._width;
            if(this.image!=undefined){
                var s=this._height/this.image.picHeight;
                this.image.height=this.image.picHeight*s;
                this.image.width=this.image.picWidth*s;
                self.label.x=this.image.width+5;             
            }
        }



        this.file;
        this.startFile = function (accept) {
            if (this.file == undefined) {
                this.file = document.createElement('input');
                this.file.type = 'file';
                this.file.multiple=true;
                if (accept) this.file.accept = accept;// "image/*";
                this.file.style.display = 'none';
                this.file.onchange = this.onchange;
            }
        };
        this.result;
        this.files;// files
        this.onchange = function (e) {
            if (e.target.files.length == 0) return;// нечего не выбрали
            self.files = e.target.files;
            
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function (_e) {             
                self.result = _e.target.result;
                if (self.fun) self.fun(self.result);
                          
                            
            };
        };
        
        this.funLoadImag=undefined;
        this._link="null";
        this.loadImeg=function(s){
            this._link=s;
            if(this.image==undefined){
                this.panel1.parent.remove(this.panel1);
                this.image=new DImage(this.dCont, 0,0,null,function(){
                    
                    self.reDrag();
                    if(self.funLoadImag!=undefined)self.funLoadImag()

                })
                this.image.div.style.pointerEvents="none";
                this.add(this.panel1);
            }
            this.image.link=this._link;
        }   

        if(_link!=undefined)this.loadImeg(_link)
        
        
    }



    set x(value) {this.position.x = value;} get x() { return  this.position.x;}
    set y(value) {this.position.y = value;} get y() { return  this.position.y;}
    set width(value) {
        if(this._width!=value){
            this._width = value;
            this.reDrag()
            //this.object.style.width=this._width+"px";
        }       
    }   
    get width() { return  this._width;}

    set height(value) {
        if(this._height!=value){
            this._height = value;
            this.reDrag();
            //this.object.style.height=this._height+"px";
        }       
    }   
    get height() { return  this._height;}



    set boolLine(value) {
        if(this._boolLine!=value){
            this._boolLine = value;
            this.panel.boolLine = value;
            this.panel1.boolLine = value;
            if(this._boolLine==true){
                //this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(self._color), -20);//"none";
            }else{
                //this.object.style.border= '0px solid'
            }
        }
    }   
    get boolLine() {        
        return  this._boolLine;
    }


    set fontSize(value) {
        if(this._fontSize!=value){
            this._fontSize = value;
            this.label.y= (this._height-this._fontSize)/2
            this.label.fontSize = value; 
           // this.object.style.fontSize = value+"px";
        }
    }   
    get fontSize() {        
        return  this._fontSize;
    }

    set fontFamily(value) {
        if(this._fontFamily!=value){
            this._fontFamily= value;
            //this.object.style.fontFamily= this._fontFamily;

        }
    }   
    get fontFamily() {      
        return  this._fontFamily;
    }
    

    set color(value) {
        if(this._color!=value){
            this._color = value;
            this.panel.color1=  value;          
            //this.object.style.background = this._color; 
            //this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);
        }
    }   
    get color() {       
        return  this._color;
    }

    set text(value) {
        if(this._text!=value){
            this._text = value;
            this.object.value = this._text;
        }
    }   
    get text() {        
        return  this._text;
    }

    set colorText(value) {
        if(this._colorText!=value){             
            this._colorText = value;
            this.label.colorText = value;
            //this.object.style.color=this._colorText;
        }
    }   
    get colorText() {       
        return  this._colorText;
    }

    set borderRadius(value) {
        if(this._borderRadius!=value){              
            this._borderRadius = value;
            
            this.panel.borderRadius=this._borderRadius;
            this.panel1.borderRadius=this._borderRadius;

        }
    }   
    get borderRadius() {        
        return  this._borderRadius;
    }

    set activMouse(value) {     
        if(this._activMouse!=value){
            this._activMouse = value;           
            if(value==true){
                this.alpha=1;
                this.object.style.pointerEvents=null;   
            }else{
                this.alpha=0.7;             
                this.object.style.pointerEvents="none"; 
            }               
        }       
    }
    get activMouse() { return  this._activMouse;}

}



