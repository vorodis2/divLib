

import { DCont } from './DCont.js';

export function DGallery (dCont, _x, _y, _fun) {
	DCont.call(this);
	this.type = 'DGallery';
	var self = this;
	this.dcmParam=dcmParam; 
  	this.dcmParam.add(this)
	if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);

	this.x = _x || 0;
	this.y = _y || 0;
	this.fun = _fun;
	this._panelBool=false;

	this._prosentH=0;
	this._prosentW=0;

	this._widthPic = 64; // elements width
	this._heightPic = 64; // elements height
	this._width = 200;
	this._height = 200;
	this._otstup = 2;
	this._kolII = 2;
	this._index = -1;
	this._otstup1 = 5;
	this.clearIndex = true;

	this.dragNotEvent=dcmParam.dragNotEvent;

	this._color = dcmParam._color;
	this._color1 = dcmParam._color1;
	this._borderRadius =dcmParam.borderRadius;
	this._lineSize = 2;
	this._boolPositScrol = true;// выворот положений
	this._boolPositOtctup = true;// внутурь/наружу
	this._boolWheel = true;

	this.killTukIndex = 0;//rколичество тыков по индексу


	this.sahDelta = 20;

	this.funLoad;
	this.funOver;
	this.funOut;


	this.arrayKesh = [];
	this.arrayObj = [];
	this.array = [];

	this.ww = 1;
	this.wM = 1;
	this.hh = 1;
	this.hM = 1;

	this.div.boolDiv=true;

	/*this.graphicsMask = new PIXI.Graphics();
	this.addChild(this.graphicsMask);*/
	
	this.contPanel = new DCont();
	this.add(this.contPanel);

	this.content1 = new DCont();
	this.add(this.content1);

	this.panel=new DPanel(this.contPanel,0,0);
	this.panel.width=this._width;
	this.panel.height=this._height;

	this.content = new DCont();
	this.content1.add(this.content)	
	this.content1.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)";

	// Вертикальный и горизонтальный скролл
	this.scrollBarH = new DScrollBarH(this, 0, this._height - this.otstup1, function () {
		self.scrolPos(false);
		// self.content.x = -this.scrolValue;
	});
	this.scrollBarH.offsetHit=3; // elements width
	
	
	this.scrollBarV = new DScrollBarV(this, this._width - this.otstup1, 0, function () {
		// self.content.y = -this.scrolValue;
		self.scrolPos(false);
	});
	this.scrollBarV.offsetHit=3;


	this.createZamen;// Замена типа кнопки
	this.complitLoad;// Окончание загрузки
	this.postDraw;// По окончанию отрисовки


	this.funOver;
	this.funOut;
	this.fOver = function (e) { if (self.funOver)self.funOver(e); };
	this.fOut = function (e) { if (self.funOver)self.funOver(e); };
	// Отрисовка элементов
	this.createDrawBox = function (_obj) {
		for (var i = 0; i < this.arrayKesh.length; i++) {
			if (this.arrayKesh[i].visible == false) {
				if (this.arrayKesh[i].isObj(_obj) == true) {
					return this.arrayKesh[i];
				}
			}
		}

		if (this.createZamen != undefined) {
			this.arrayKesh.push(this.createZamen());
		} else {
			this.arrayKesh.push(new DBox(this.content, 0, 0, this.downBtn));
		}
		if (this.funOver) this.arrayKesh[this.arrayKesh.length - 1].funOver = this.fOver;
		if (this.funOut) this.arrayKesh[this.arrayKesh.length - 1].funOut = this.fOut;
		this.arrayKesh[this.arrayKesh.length - 1].width = this._widthPic;
		this.arrayKesh[this.arrayKesh.length - 1].height = this._heightPic;
		this.arrayKesh[this.arrayKesh.length - 1].color = this._color;
		this.arrayKesh[this.arrayKesh.length - 1].color1 = this._color1;
		this.arrayKesh[this.arrayKesh.length - 1].idArrKesh = this.arrayKesh.length - 1;
		this.arrayKesh[this.arrayKesh.length - 1].funLoad = this.funLoad;
		this.arrayKesh[this.arrayKesh.length - 1].funOver = this.funOver;
		this.arrayKesh[this.arrayKesh.length - 1].funOut = this.funOut;
		this.arrayKesh[this.arrayKesh.length - 1].borderRadius = this._borderRadius;

		return this.arrayKesh[this.arrayKesh.length - 1];
	};


	var ii, jj, ww, hh, bat, sahLoad, wM, hM, sliderOtstup;
	this.scrolPos = function (_bool) {
		if (_bool == true) {
			self.scrollBarV.value = this.content.y / (this._height - self.scrollBarV.heightContent) * 100;
			self.scrollBarH.value = this.content.x / (this._width - self.scrollBarH.widthContent) * 100;
		} else {
			self.content.y = (self.scrollBarV.value / 100) * (this._height - self.scrollBarV.heightContent);
			self.content.x = (self.scrollBarH.value / 100) * (this._width - self.scrollBarH.widthContent);
		}
		self.dragIE()
	};


	this.korektPoIndex = function (_ind) {
		if (_ind == undefined)_ind = this._index;
		if (this.array[_ind] == undefined) return;

		if (this.array[_ind].x + this.content.x + this.array[_ind].width - this.otstup > this._width) this.content.x = -(this.array[_ind].x + this.array[_ind].width - this._width + this.otstup);
		if (this.array[_ind].x + this.content.x - this.otstup < 0) this.content.x = -this.array[_ind].x + this.otstup;


		if (this.array[_ind].y + this.content.y + this.array[_ind].height - this.otstup > this._height) this.content.y = -(this.array[_ind].y + this.array[_ind].height - this._height + this.otstup);
		if (this.array[_ind].y + this.content.y - this.otstup < 0) this.content.y = -this.array[_ind].y + this.otstup;

		this.scrolPos(true);
	};

	// Функция клика по иконке
	this.downBtn = function () {

		self.index = this.idArr;
		self.obj = self.array[this.idArr].object;

		if (self.fun) self.fun();
	};

	this.sahLoad = 0;
	this.sahRendom = 0;
	// Пошаговая загрузка
	this.funLoad = function () {
		self.sahLoad++;
		if (self.sahLoad > self.array.length) {
			if (this.complitLoad != undefined) this.complitLoad();
			self.draw();

		} else {
			self.array[self.sahLoad - 1].boolFL=true
			self.array[self.sahLoad - 1].startLoad(self.array[self.sahLoad - 1].object11);
		}
	};


	// новый массив обьектов
	this.start = function (_array) {
		this.clear();
		this.arrayObj = _array;
		for (var i = 0; i < this.arrayObj.length; i++) {
			bat = this.createDrawBox(this.arrayObj[i]);
			bat.visible = true;
			bat.object11 = this.arrayObj[i];
			bat.idArr = this.array.length;
			this.array.push(bat);
		}
		this.draw();
		if (this.array.length != 0) {
			self.sahLoad = 0;
			this.sahRendom = Math.round(Math.random() * 10000);
			self.array[self.sahLoad].sahRendom = this.sahRendom * 1;
			this.funLoad();
		}
	};




	this.zScrol=0
	// перерисовка галереи
	this.draw = function () {
		if (this.preDraw) this.preDraw();

		ii = 0;
		jj = 0;
		sliderOtstup = this.otstup1 + this.otstup * 2;
		ww = 1;
		if (this._kolII > this.array.length)ww = this.array.length * (this._widthPic + this._otstup) + this._otstup;
		hh = this._heightPic + this._otstup * 2;
		for (var i = 0; i < this.array.length; i++) {
			this.array[i].x = ii * (this._widthPic + this._otstup) + this._otstup;
			this.array[i].y = jj * (this._heightPic + this._otstup) + this._otstup;
			if (this.array[i].x + this._widthPic + this._otstup > ww)ww = this.array[i].x + this._widthPic + this._otstup;
			hh = (jj + 1) * (this._heightPic + this._otstup) + this._otstup;
			ii++;
			if (ii >= this._kolII) {
				ii = 0;
				jj++;
			}
		}


		if (ww > this._width) this.scrollBarH.visible = true;
		else this.scrollBarH.visible = false;

		if (hh > this._height) this.scrollBarV.visible = true;
		else this.scrollBarV.visible = false;


		this.scrollBarH.widthContent = ww;
		this.scrollBarV.heightContent = hh;


		if (ww > this._width) {
			wM = this._width;
		} else {
			wM = ww;
		}
		if (hh > this._height) {
			hM = this._height;
		} else {
			hM = hh;
		}

		this.ww = ww;
		this.wM = wM;
		this.hh = hh;
		this.hM = hM;
		// this.scrollBarH     внизу
		// this.scrollBarV     сбоку

		//  this._boolPositScrol = true;//выворот положений
		// this._boolPositOtctup= true;//внутурь/наружу

		if (this._boolPositScrol) {
			if (this._boolPositOtctup) {
				this.scrollBarH.y = hM - this.otstup - this._otstup1+this.zScrol;
				this.scrollBarV.x = wM - this.otstup - this._otstup1+this.zScrol;
			} else {
				this.scrollBarH.y = hM + this.otstup+this.zScrol;
				this.scrollBarV.x = wM + this.otstup+this.zScrol;
			}


		} else {
			if (this._boolPositOtctup) {
				this.scrollBarH.y = this.otstup+this.zScrol;
				this.scrollBarV.x = this.otstup+this.zScrol;
			} else {
				this.scrollBarH.y = -this.otstup - this._otstup1+this.zScrol;
				this.scrollBarV.x = -this.otstup - this._otstup1+this.zScrol;
			}
		}

		if(this.panel!=undefined){			
			this.panel.width=this._width;
			this.panel.height=this._height;
		}

		// this.graphicsMask.clear();
		// this.graphicsMask.beginFill(0xff0000, 0);
		// this.graphicsMask.drawRect(0, 0, wM, hM);
		// this.graphicsMask.endFill();


		// if (this._boolWheel) {
		// 	this.graphics.clear();
		// 	this.graphics.beginFill(0xff0000, 0);
		// 	this.graphics.drawRect(0, 0, ww, hh);
		// 	this.graphics.endFill();

		// }
		this.dragIE()
		if (this.postDraw) this.postDraw();
	};

	// положение слидеров
	this.drawScrol = function () {
		this.scrollBarH.height = this._otstup1;
		// this.scrollBarH.y=this._height-this.otstup1;
		this.scrollBarH.width = this._width;

		this.scrollBarV.width = this._otstup1;
		// this.scrollBarV.x=this._width-this.otstup1;
		this.scrollBarV.height = this._height;

		// this.scrollBarH.offsetHit = this._otstup1*2;
		// this.scrollBarV.offsetHit = this._otstup1*2;
	};

	this.drawScrol();


	// очистка
	this.clear = function () {
		this.clearPosit();

		for (var i = 0; i < this.arrayKesh.length; i++) {
			this.arrayKesh[i].clear();
		}
		this.array.length = 0;
	};
	this.clearIndex = true;
	this.clearPosit = function () {
		this.content.x = 0;
		this.content.y = 0;
		this.scrollBarH.scrolValue = 0;
		this.scrollBarV.scrolValue = 0;
		if (this.clearIndex) {
			this.index = -1;
		}
	};


	// прокрутка колесом мышки
	var hhh, www;
	this.mousewheel = function (e) {
		
		if (self.kolII <= self.array.length) {
			hhh = (self.heightPic + self.otstup) * (Math.ceil(self.array.length / self.kolII)) - self._height;
			www = (self.widthPic + self.otstup) * self.kolII - self._width;
		} else {
			hhh = self.heightPic + self.otstup - self._height;
			www = (self.widthPic + self.otstup) * self.array.length - self._width;
		}

		var delta=-1;
        var p=e.delta
        if(e.wheelDelta==undefined){
            p=e.wheelDelta
        }

        if(e.delta)if(e.delta<0)delta=1;
        if(e.deltaY)if(e.deltaY<0)delta=1;
        if(e.detail)if(e.detail<0)delta=1;

        
        if(e.wheelDelta!=undefined){
            if(e.wheelDelta>0)delta=-1;
            else delta=1;
        }


        p=delta;


		if (self.scrollBarV.visible) {
			if (p < 0) {
				if (self.content.y >= 0) {
					self.content.y = 0;
					//self.scrollBarV.value = 0;
				} else {
					//self.scrollBarV.value -= self.sahDelta;
					self.content.y += self.sahDelta;
				}
			} else {
				if (self.content.y <= -(hhh + self.otstup)) {
					self.content.y = -(hhh + self.otstup);
					//self.scrollBarV.value = hhh;
				} else {
					//self.scrollBarV.value += self.sahDelta;
					self.content.y -= self.sahDelta;
				}

			}

			//
		} else if (self.scrollBarH.visible) {
			if (p < 0) {
				if (self.content.x >= 0) {
					self.content.x = 0;
					//self.scrollBarH.value = 0;
				} else {
					//self.scrollBarH.value -= self.sahDelta;
					self.content.x += self.sahDelta;
				}
			} else {
				if (self.content.x <= -(www + self.otstup)) {
					self.content.x = -(www + self.otstup);
					//self.scrollBarH.value = www;
				} else {
					//self.scrollBarH.value += self.sahDelta;
					self.content.x -= self.sahDelta;
				}
			}
		}
		//self.koreckScrol();
		self.scrolPos(true)
		self.dragIE();
	};

	



	var sp=undefined;	
	this.dragActiv=false
	this.mouseDown=function(e){		
		self.dragActiv=true;
		sp=undefined;
		if(self.dragNotEvent==true)document.body.style.pointerEvents="none";
		
		
	
	}

	this.mouseup=function(e){		
		self.dragActiv=false;
		sp=undefined;
		if(self.dragNotEvent==true)document.body.style.pointerEvents=null;	
		
	}

	var yyy=0
	this.mousemove=function(e){			
		if(self.dragActiv==false)return;
		if(self.scrollBarV.visible == false)return;
		if (self.kolII <= self.array.length) {
			hhh = (self.heightPic + self.otstup) * (Math.ceil(self.array.length / self.kolII)) - self._height;
			www = (self.widthPic + self.otstup) * self.kolII - self._width;
		} else {
			hhh = self.heightPic + self.otstup - self._height;
			www = (self.widthPic + self.otstup) * self.array.length - self._width;
		}

		if(dcmParam.mobile==false){
  			if(sp==undefined){
  				sp={  					
  					y:e.clientY,  					
  					y1:self.content.y
  				};
  			}  
  			sp.ys=e.clientY			
  		}else{
  			if(sp==undefined){
  				sp={  					
  					y:e.targetTouches[0].clientY,  					
  					y1:self.content.y
  				};
  			}
  			sp.ys=e.targetTouches[0].clientY
 		}

  		yyy=sp.y1-(sp.y-sp.ys);

  		if(yyy>=0)yyy=0
  		if(yyy <= -(hhh + self.otstup)){
  			yyy=-(hhh + self.otstup)
  		}	
  		self.content.y=yyy

  		self.scrolPos(true)
	}	

	this._bmd=false;
	this.startMouseDown=function(){
		if(this._bmd==true){
			if(dcmParam.mobile==false){			
				this.content.div.addEventListener("mousedown", this.mouseDown);
				window.addEventListener("mouseup", this.mouseup);
				
			}else{
				this.content.div.addEventListener("touchstart", this.mouseDown);
				window.addEventListener("touchend", this.mouseup);
	  			
			}
			dcmParam.addFunMove(self.mousemove)
		}else{
			if(dcmParam.mobile==false){			
				this.content.div.removeEventListener("mousedown", this.mouseDown);
				window.removeEventListener("mouseup", this.mouseup);
				
			}else{
				this.content.div.removeEventListener("touchstart", this.mouseDown);
				window.removeEventListener("touchend", this.mouseup);
	  			
			}
			dcmParam.removeFunMove(self.mousemove) 
		}		
	}


	this.bmd=true





	



	this.dragIE=function(){
		if(dcmParam.isIE==true){
			for (var i = 0; i < this.array.length; i++) {
				this.array[i].dragIE(this)
			}
			this.x-=1
			this.x+=1
		}
	}

	var bb = this._boolWheel;
	this._boolWheel = null;
	this.boolWheel = bb;

	this.panelBool=true
}
DGallery.prototype = Object.create(DCont.prototype);
DGallery.prototype.constructor = DGallery;
Object.defineProperties(DGallery.prototype, {
	
	bmd: { // вынести\внести отступ за элемент
		set: function (value) {
			if (this._bmd == value) return;
			this._bmd = value;
			this.startMouseDown()
		},
		get: function () {
			return this._bmd;
		}
	},

	borderRadius: { // вынести\внести отступ за элемент
		set: function (value) {
			if (this._borderRadius == value) return;
			this._borderRadius = value;
			this.scrollBarH.borderRadius = value;
			this.scrollBarV.borderRadius = value;
			this.panel.borderRadius = value;
			for (var i = 0; i < this.array.length; i++) {
				this.array[i].borderRadius = value;
			}
		},
		get: function () {
			return this._borderRadius;
		}
	},

	prosentH: { // вынести\внести отступ за элемент
		set: function (value) {
			
			this._prosentH = value;
			let hd=(this.hh-this._height)*this._prosentH;      
	        if(hd>0)hd=0
	        this.content.y=  hd  
			
		},
		get: function () {
			let hd=this.hh-this._height;       
	        this._prosentH=this.content.y/hd
	        return  this._prosentH;
		}
	},

	prosentW: { // вынести\внести отступ за элемент
		set: function (value) {
			
			this._prosentW = value;
			let hd=(this.ww-this._height)*this._prosentW;      
	        if(hd>0)hd=0
	        this.content.x=  hd  
			
		},
		get: function () {
			let hd=this.ww-this._height;       
	        this._prosentW=this.content.x/hd
	        return  this._prosentW;
		}
	},






	
	panelBool: { // вынести\внести отступ за элемент
		set: function (value) {
			if (this._panelBool == value) return;
			this._panelBool = value;			
			this.panel.visible=value;
			if(this.panel==undefined){
				this.panel=new DPanel(this.contPanel,0,0);
				this.panel.width=this._width;
				this.panel.height=this._height;
			}
			this.panel.visible=value;
		},
		get: function () {
			return this._panelBool;
		}
	},


	boolWheel: { // включить\выключить прокрутку колесом
		set: function (value) {
			if (this._boolWheel == value) return;
			this._boolWheel = value;
			this.interactive = this._boolWheel;

			if (this._boolWheel == true) {				
				this.div.addEventListener('mousewheel', this.mousewheel)
				this.div.addEventListener("DOMMouseScroll", this.mousewheel);
			} else {				
				this.div.removeEventListener('mousewheel', this.mousewheel)
				this.div.removeEventListener('DOMMouseScroll', this.mousewheel)
			}
		},
		get: function () {
			return this._boolWheel;
		}
	},
	boolPositScrol: { // вынести\внести отступ за элемент
		set: function (value) {
			if (this._boolPositScrol == value) return;
			this._boolPositScrol = value;
			this.draw();
		},
		get: function () {
			return this._boolPositScrol;
		}
	},

	boolPositOtctup: { // зеркальное отображение слайдеров
		set: function (value) {
			if (this._boolPositOtctup == value) return;
			this._boolPositOtctup = value;
			this.draw();
		},
		get: function () {
			return this._boolPositOtctup;
		}
	},


	color: { // цвет актива
		set: function (value) {
			if (this._color == value) return;
			this._color = value;
			for (var i = 0; i < this.arrayKesh.length; i++) {
				this.arrayKesh[i].color = this.color;
			}
		},
		get: function () {
			return this._color;
		}
	},
	color1: { // цвет актива
		set: function (value) {
			if (this._color1 == value) return;
			this._color1 = value;
			for (var i = 0; i < this.arrayKesh.length; i++) {
				this.arrayKesh[i].color1 = this.color1;
			}
		},
		get: function () {
			return this._color1;
		}
	},


	lineSize: { // ширина контура
		set: function (value) {
			if (this._lineSize == value) return;
			this._lineSize = value;
			for (var i = 0; i < this.arrayKesh.length; i++) {
				this.arrayKesh[i].lineSize = this.lineSize;
			}
		},
		get: function () {
			return this._lineSize;
		}
	},

	heightPic: {// верх кнопка
		set: function (value) {
			if (this._heightPic == value) return;
			this._heightPic = value;
			for (var i = 0; i < this.arrayKesh.length; i++) {
				this.arrayKesh[i].height = this._heightPic;
			}
			this.draw();
		},
		get: function () {
			return this._heightPic;
		}
	},

	widthPic: {// верх кнопки
		set: function (value) {
			if (this._widthPic == value) return;
			this._widthPic = value;
			for (var i = 0; i < this.arrayKesh.length; i++) {
				this.arrayKesh[i].width = this._widthPic;
			}
			this.draw();
		},
		get: function () {
			return this._widthPic;
		}
	},

	width: {// верх холеоеи
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.content1.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)";
			this.content1.x=0
			this.drawScrol();
			this.draw();
		},
		get: function () {
			return this._width;
		}
	},
	height: {// верх холеоеи
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.content1.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)";
			this.content1.x=0;
			this.drawScrol();

			this.draw();
		},
		get: function () {
			return this._height;
		}
	},

	otstup: {// Отступ
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			for (var i = 0; i < this.arrayKesh.length; i++) {
				this.arrayKesh[i].otstup = this._otstup;
			}
			this.draw();
		},
		get: function () {
			return this._otstup;
		}
	},
	otstup1: {// Отступ
		set: function (value) {
			if (this._otstup1 == value) return;
			this._otstup1 = value;
			this.drawScrol();
			this.draw();
		},
		get: function () {
			return this._otstup1;
		}
	},
	kolII: {// Количество в ряду
		set: function (value) {
			if (this._kolII == value) return;
			this._kolII = value;
			var ii = this.index;
			this.clearPosit();
			this.index = ii;
			this.drawScrol();
			this.draw();

		},
		get: function () {
			return this._kolII;
		}
	},
	index: {// Активный элемент
		set: function (value) {
			this.killTukIndex++;

			if (this.array[value] != undefined) {
				this.korektPoIndex(value);
			}
			if (this._index == value) return;
			this.killTukIndex=0
			this._index = value;

			for (var i = 0; i < this.array.length; i++) {
				if (this._index == i) {
					this.array[i].activ = true;
					this.killTukIndex=1
				}					
				else {
					this.array[i].activ = false;
				}
			}		

		},
		get: function () {
			return this._index;
		}
	},
	x: {// Активный элемент
		set: function (value) {			
			if (this._x == value) return;
			this._x = value;
			this.position.x = value;
		},
		get: function () {
			return this._x;
		}
	},
	y: {// Активный элемент
		set: function (value) {			
			if (this._y == value) return;
			this._y = value;
			this.position.y = value;
		},
		get: function () {
			return this._y;
		}
	},
	activMouse: {// Активный элемент
		set: function (value) {			
			if (this._activMouse == value) return;
			this._activMouse = value;
			 if(value==true){
				this.alpha=1;
					
		    }else{
		    	this.alpha=0.7;			    	
		    }				
		},
		get: function () {
			return this._activMouse;
		}
	}


		/*set activMouse(value) {		
		if(this._activMouse!=value){
		    this._activMouse = value;		    
		    if(value==true){
				//this.alpha=1;
				this.div.style.pointerEvents=null;	
		    }else{
		    	//this.alpha=0.7;		    	
		    	this.div.style.pointerEvents="none";	
		    }		        
		}		
	}
  	get activMouse() { return  this._activMouse;}	*/

});




export function DBox(_cont, _x, _y, _fun) {
	DCont.call(this);
	this.type = 'DBox';
	var self = this;
	_cont.add(this);

	this.x = _x || 0;
	this.y = _y || 0;
	this.fun = _fun;


	this._link = '';
	this._title = '';
	this._width = 100;
	this._height = 100;
	this._otstup = 2;
	this.clearIndex = true;

	this.boolFL=false;

	this._object = null;

	this._borderRadius=0
	this._activ = false;

	this.idArr = -1;
	this.idArrKesh = -1;
	this.id = -1;
	this.funLoad;

	this.postDraw;
	this.funOver;
	this.funOut;

	this.content = new DCont();
	this.add(this.content);

	this.panel = new DPanel(this.content, 0, 0);
	//this.content.div.style.clip = "rect(1px 20px 20px 0px)";

	this.image = new DImage(this.content, 0, 0, undefined, function () {	
		self.draw();
		this.visible=true
		if(self.boolFL==true){
			self.boolFL=false
			if (self.funLoad) self.funLoad();
		}

	});
	this.image.visible=false;

	this.image.funError =function () {
		this._link="fgh"
		this.link='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY/jBwPAfhKEMhv8ARqQH3aEVcqIAAAAASUVORK5CYII='
	}


	this.label = new DLabel(this.content, 0, 0, ' ');

	//this.image._preloaderBool = true;
	//this.image.visible = false;
	this.label.visible = false;



	/*this.graphics = new PIXI.Graphics();
	this.content.addChild(this.graphics);*/

	this.object=undefined;
	this._color = "#ffffff";
	this._color1 = "#ff0000";
	this._lineSize = 2;
	this.boolOut = true;

	var ss;
	// Отрисовка и позиционирование иконки, обводки
	this.draw = function () {
		/*this.graphics.clear();
		if (this.boolOut == true) this.graphics.beginFill(0xffffff, 0);
		else this.graphics.beginFill(0xffffff, 0.2);
		this.graphics.drawRect(0, 0, this._width, this._height);
		this.graphics.endFill();
		if (this._activ == true) {
			this.graphics.lineStyle(this._lineSize, this._color, 1);
			this.graphics.drawRect(this._lineSize / 2, this._lineSize / 2, this._width - this._lineSize, this._height - this._lineSize);
			this.graphics.endFill();
		}*/

		ss = (this._width - this._otstup * 2) / this.image.picWidth;
		if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
		//this.image.scale = ss;
		//this.image.scale = 0.1;
		//this.image.scale.y = ss;
		
		this.image.x = 0;
		this.image.width=this.image.picWidth*ss;
		this.image.height=this.image.picHeight*ss;

		this.image.x = (this._width - this.image.picWidth * ss) / 2;
		this.image.y = (this._height - this.image.picHeight * ss) / 2;

		this.label.x = (this._width - this.label.curW) / 2;
		this.label.y = this._height - this.label.curH - this._otstup;
		if (this.postDraw) this.postDraw();
	};
	

    var b,s, ss,s1
    this.isObj = function (_obj) {
        

        if (this.object11 != undefined) {         
            if (_obj != undefined) {                
                for (s in this.object11) {
                    ss=typeof this.object11[s]
                    if(ss =='number'||ss =='boolean'||ss =='string'){
                        b=false;
                        for (s1 in _obj) {
                            if(s==s1){
                                if(this.object11[s]==_obj[s1]){
                                    b=true;
                                }
                            }
                        }
                        if(!b){
                            
                            return false;//обьект был не найден или не равен
                        }
                    }
                }
                return true;
            }
        }
        return false;
    };



    var b,link;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {        
       
        if(this.object!=undefined) {
            self.funLoad();
            return   
        }  
		

		this.object = _obj;

		if (_obj.title) {
			this.label.text = _obj.title;
			this.label.value = _obj.title;
			this.label.visible = true;
		}
		if (_obj.src) {
			//this.image.visible = true;
			if (this.image.link == _obj.src) {
				if (self.funLoad) self.funLoad();
			} else {
				this.image.width = 100;
				this.image.height = 100;
				this.image.link = _obj.src;
			}
		}else{
			if (self.funLoad) self.funLoad();
		}
		this.draw();
	};
	// Очистка
	this.clear = function () {
		this.visible = false;
		this.label.visible = false;
		this.boolFL=false;
		//this.image.visible = false;
		if (this.clearIndex) {
			this.activ = false;
		}

	};
	this.funOver;
	this.funOut;
	// События
	this.mouseOver = function (e) {
		self.boolOut = false;
		if(self._activ==false)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -30);
		else self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -30);
		if (self.funOver) self.funOver(self);
	};
	this.mouseOut = function (e) {		
		if(self._activ==false)self.panel.color1=self._color1;
		else self.panel.color1=self._color;		
		if (self.funOut) self.funOut(self);
	};
	this.mouseDown = function (e) {		
		if (self.fun) self.fun();
	};
	this.draw();


	this.image.div.style.pointerEvents = 'none';
	

	if(dcmParam.mobile==false){
		//this.image.image.addEventListener("mousedown", this.mouseDown)
		this.panel.div.addEventListener("mousedown", this.mouseDown)

		this.panel.div.addEventListener("mouseout", this.mouseOut);
		//this.image.image.addEventListener("mouseout", this.mouseOut);

		this.panel.div.addEventListener("mouseover", this.mouseOver);
		//this.image.image.addEventListener("mouseover", this.mouseOver);		
	}else{
		//this.image.image.addEventListener("touchstart", this.mouseDown)
		this.panel.div.addEventListener("touchstart", this.mouseDown)
	}

	this.arIE=[0,0,0,0]
	this.par=undefined
	var sy,sy1
	this.dragIE=function(p){
		if(this.par==undefined)this.par=p;
		sy=1;
		
		this.arIE[0]=0
		this.arIE[2]=this._height
		this.arIE[1]=this._width		
		this.arIE[3]=0


		if(this.y<-this.par.content.y){
			sy=	-(this.y+this.par.content.y)
			this.arIE[0]=sy
			this.arIE[2]=sy+this._height
			if(this.arIE[2]<this.arIE[0])this.arIE[2]=this.arIE[0]
		}

		sy=this.y+this.par.content.y
		sy1=this.par._height-this._height
		if(sy>sy1){			
			this.arIE[0]=0
			this.arIE[2]=this._height+(sy1-sy)
			if(this.arIE[2]<0)this.arIE[2]=0;		
		}


		
		if(this.x<-this.par.content.x){
			sy=	-(this.x+this.par.content.x)
			this.arIE[3]=sy;
			this.arIE[1]=sy+this._width;
			if(this.arIE[1]<this.arIE[3])this.arIE[1]=this.arIE[3]
		}	
		

		sy=this.x+this.par.content.x
		sy1=this.par._width-this._width
		if(sy>sy1){			
			this.arIE[3]=0
			this.arIE[1]=this._height+(sy1-sy)			
		}
		
		this.content.div.style.clip = "rect("+Math.round(this.arIE[0])+"px "+Math.round(this.arIE[1])+"px "+Math.round(this.arIE[2])+"px "+Math.round(this.arIE[3])+"px)";
	}


}
DBox.prototype = Object.create(DCont.prototype);
DBox.prototype.constructor = DBox;
Object.defineProperties(DBox.prototype, {
	activ: { // активный элемент
		set: function (value) {
			if (this._activ == value) return;
			this._activ = value;
			if(this._activ==false)this.panel.color1=this._color1;
			else this.panel.color1=this._color;

		},
		get: function () {
			return this._activ;
		}
	},

	borderRadius: { // вынести\внести отступ за элемент
		set: function (value) {
			if (this._borderRadius == value) return;
			this._borderRadius = value
			this.panel.borderRadius = value
		},
		get: function () {
			return this._borderRadius;
		}
	},

	color: { // цвет обводки
		set: function (value) {
			if (this._color == value) return;
			this._color = value;
			this.draw();

		},
		get: function () {
			return this._color;
		}
	},	
	color1: { // цвет актива
		set: function (value) {
			if (this._color1 == value) return;
			this._color1 = value;
			
		},
		get: function () {
			return this._color1;
		}
	},
	lineSize: { // ширина обводки
		set: function (value) {
			if (this._lineSize == value) return;
			this._lineSize = value;
			this.draw();

		},
		get: function () {
			return this._lineSize;
		}
	},
	otstup: { // Отступ
		set: function (value) {
			if (this._otstup == value) return;
			this._otstup = value;
			this.draw();
		},
		get: function () {
			return this._otstup;
		}
	},
	width: { // ширина элемента
		set: function (value) {
			if (this._width == value) return;
			this._width = value;
			this.panel.width = this._width;
			this.draw();
		},
		get: function () {
			return this._width;
		}
	},
	height: { // высота элемента
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			this.panel.height = this._height;
			this.draw();
		},
		get: function () {
			return this._height;
		}
	}
});
