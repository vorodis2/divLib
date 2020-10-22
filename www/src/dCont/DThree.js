

import { DCont } from './DCont.js';

export  function DThree(dCont, _x, _y, fun){
    DCont.call(this);
    this.type = 'DThree';
    var self = this; 
    
    this.dcmParam=dcmParam; 
    this.dcmParam.add(this)
    if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);

    this.fun = fun;
    this.x=_x;
    this.y=_y;
    this._width=100;
    this._height=100;
    this._heightBut=24;  

    this._widthBut=200;  
    this._activMouse = true;
    this._activId = -1;

    this.arr=[];                                   
    this.arrBut=[];                                
    this.otstup = 2;                               
    this.butOnPanel = 10;                          
    this.butCount=0;                               
    this.butInProc=0;
    this.indexMouseDown = -1;                      
    this.indexOver= -1;

    this.lines = new Dlines();
    this.lines.heightBut = this._heightBut;
    this.add(this.lines);

    this.content = new DCont();
    this.add(this.content);

    this.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)"; 




    this.oldValue;
    this.folderOtstup=this.x;                      
    this.step_y=this.y;                            
    this.i_y=0;                                    
    this.zebra=false;   
    this.color0 = dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1),-10) //pl102.color;                     
    this.color1 = dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1),-20)                   
    this.color2 = dcmParam._color1               
    this.color3 = '#ff0000'; ///////////////////////////////////////                  
    this.color4 = dcmParam._color//pl102.color10;                       

    this.lines.color = this.color1;


    var levelCounter=0;                            
    var last_closed=false;                         
    this._otst = this._heightBut;
    var idArr = -1;
    this.bufferOt = [];  

    //Скролл-бар
    this.scrollBar = new DScrollBarV(this,0,0, function(){
        self.content.y=-(this.heightContent-this.height)*this.value/100;
        self.lines.y = -(this.heightContent-this.height)*this.value/100;
    });
   
    this.scrollBar.visible = false;
    this.scrollBar.width = this._heightBut/4;
    //this.scrollBar.radius = 100;
    this.scrollBar.but.radius = 100;

    //Принимает новый массив и меняет дерево
    this.setArr = function(arr){
        this.clear();
        this.arr=arr;
        idArr = -1;
        this.activId = -1;
        this.arrBut=this.convertArr(arr);
        this.redrawThree();
    }
    //Обновляет дерево после изменений в массиве
    this.updateThree = function(){
        this.clear();
        idArr = -1;
        this.activId = -1;
        this.arrBut=this.convertArr(this.arr);
        this.redrawThree();
    }  

    this.redrawThree = function () {
        this.butCount = 0
        this.content.y=0;
        this.lines.y = 0;
        this.update();
        this.drawAll();
    }
    //Конвертирует обычный массив в дерево объектов PLObjectThree
    this.convertArr =function(arr){
        var arrBut=[];
        for (var i = 0; i < arr.length; i++) {
            arrBut.push(this.convertElem(arr[i]))
        }
        return arrBut;
    }
    //Конвертирует один элемент дерева
    this.convertElem = function(obj){
        var but;
        idArr++;
        but = this.getElement();
        but.id = idArr;
        but.obj = obj;
        // but.title = obj.text;
        but.isFolder = false;
        // but.width = this._width;
        // but.height = this._heightBut;
        if(obj.arr!==undefined){
            if(obj.arr.length>0){// если папка
                but.isFolder=true;
                but.arrBut=this.convertArr(obj.arr);
            } 
        }
              
        return but;
    }
    this.mouseUpFun
    this.mouseOverFun
    this.mouseOutFun
    this.naId=-1
    //Отловка события нажатия, наведения курсора и когда курсор убирается
    this.mouseEvent = function(obj){ 
        //Нажатие клавиши     
        if(obj.sobEvent=="mouseDown"){
            if(this.fun!=undefined) this.fun(obj.obj);
            this._activId = obj.id;
            //Открытие/закрытие папки
            this.openCloseObj(obj, !obj.isOpen); 
        }
        //Наведение курсора
        if(obj.sobEvent == "mouseOver"){
            obj.isIndexOver=true;
            this.naId=obj.id
            this.drawElement(this.arrBut);
            if(self.mouseOverFun)self.mouseOverFun(obj)
        }   
        //Отведение курсора
        if(obj.sobEvent == "mouseOut"){
            obj.isIndexOver = false;
            this.naId=-1
            this.drawElement(this.arrBut);
            if(self.mouseOutFun)self.mouseOutFun(obj)
        }
        
        if(obj.sobEvent == "mouseUp"){
            if(self.mouseUpFun)self.mouseUpFun(obj)
        }
    } 

    this.openCloseObj = function(obj, bb){
        if (obj.isFolder) obj.isOpen = bb;
        this.scrollSet();
        this.clear();
        this.update();
        this.drawElement(this.arrBut);
        this.scrollBar.scrolValue = -this.content.y
        this.content.y=- this.scrollBar.scrolValue;
        this.lines.y = -this.scrollBar.scrolValue;
        //Если видно не все элементы и пропадает скролл
        //Устанавливаем область видимости в ноль
        if(!obj.isOpen&&this.content.y<0&&this.scrollBar.visible==false){
            this.content.y=0;
            this.lines.y = 0;
        }
    }
           
    this.getElement = function(){
        for (var i = 0; i < this.bufferOt.length; i++) {
            if (!this.bufferOt[i].life) {
                this.bufferOt[i].life = true;
                this.bufferOt[i].isFolder=false;
                this.bufferOt[i].isOpen = false;
                this.bufferOt[i].arrBut = [];

                this.bufferOt[i].three = this;
                this.bufferOt[i].correctInfo = false;
                return this.bufferOt[i];
            }
        }
        var ot = new DObjectThree(this.content, 0, 0, function(){
            self.mouseEvent(this);
        },this);
      
        ot.three = this;
        this.bufferOt.push(ot);
        return ot;
    }

    this.clear = function() {
        for (var i = 0; i < this.bufferOt.length; i++) {
            this.bufferOt[i].life = false;
            this.bufferOt[i].visible=false;
        }
    }

    //Отрисовка всего дерева
    this.drawAll = function (){
        this.drawElement(this.arrBut);
       /* this.graphics.clear();
        this.graphics.beginFill(this.color3);
        this.graphics.drawRect(0,0, this._width, this._height);

        this.graphCover.clear();
        this.graphCover.beginFill(pl102.color);
        this.graphCover.drawRect(0,0,this._width,this._height);
        this.graphCover.endFill();*/

        this.scrollBar.x = this._width - this.scrollBar.width;
        this.scrollBar.height=this._height;
    }

    //Отрисовка элемента
    this.drawElement = function (arrBut){
        //debugger;
        for (var i = 0; i < arrBut.length; i++){
            //Если была наведена мышка
            if(arrBut[i].isIndexOver){
                arrBut[i]._color=this.color0;
            } else arrBut[i]._color=arrBut[i].zebra_color;
            if(arrBut[i].id == this._activId) arrBut[i]._color = this.color4;
            arrBut[i].drawElement();
            //Рисуем вложенные эл-ты
            if(arrBut[i].isOpen===true) this.drawElement(arrBut[i].arrBut);

        }
    }
    //Обновление структуры дерева
    this.update = function(arrBut,bool){
        if(arrBut===undefined) arrBut=this.arrBut;
        if(!bool){
            this.i_y=0;
            this.step_y=this.y;
            this.zebra=false;
            this.butCount=0;
            this.folderOtstup=0;
        }
        for (var i = 0; i < arrBut.length; i++){
            this.step_y=this.i_y*(this._heightBut)
            this.i_y++;

            if(this.zebra===false){
                arrBut[i].zebra_color=this.color1;
                this.zebra=true;
            }else{
                arrBut[i].zebra_color=this.color2;
                this.zebra=false;
            }
            // arrBut[i].id=this.butCount;
            arrBut[i].y=this.step_y;           
            arrBut[i].x=this.folderOtstup-this._heightBut;
            arrBut[i].visible = true;
            arrBut[i].level=levelCounter;
            this.butCount++;

            if(arrBut[i].isFolder && arrBut[i].isOpen===true){// еслит мы открыты показываем кишки
                levelCounter++;
                this.folderOtstup+=this._otst;
                this.update(arrBut[i].arrBut,true);
                levelCounter--;
            }
            else {// прячем вложеные
                for (var j = 0; j < arrBut[i].arrBut.length; j++){
                    arrBut[i].arrBut[j].visible = false;
                }
            }
            if(i===arrBut.length-1) {
                 arrBut[i].isLast=true;
                this.folderOtstup-=this._otst;
                levelCounter=0;
            }
            else{
                arrBut[i].isLast=false;
            }
        }
        if(!bool){
            this.lines.height = this.butCount * this._heightBut;
            this.lines.width = this._width;
            this.lines.redrawLines(arrBut);
            
            
            this.butInProc=100/this.butCount;
            this.scrollSet();
        }

        
    }

    //Обработка действий скролла
    this.scrollSet=function(){
        if(this.butCount*(this._heightBut)<=this._height){
            this.scrollBar.visible = false;           
        }else{
            this.scrollBar.visible = true;           
            this.scrollBar.height = this._height;
            this.scrollBar.heightContent = (this.butCount*(this._heightBut));
        }
        if(this.scrollBar.height<this._heightBut) {
            this.scrollBar.visible=false;   
        } 
    }

    var arrFolderId = [];
    this.openTillId = function(id){
        arrFolderId = [];
        this.findPath(this.arrBut, id);
        for (var i = 0; i < arrFolderId.length; i++) {
            this.openId(arrFolderId[i]);
        }
    }
    this.findPath = function(arr,id){
        var rez;
        for (var i = 0, numSplice = -1; i < arr.length; i++) {
            if(arr[i].id == id){
                return arrFolderId;
            }
            else if(arr[i].arrBut.length > 0){
                if(numSplice == -1) numSplice = arrFolderId.length;
                arrFolderId.push(arr[i].id);
                rez = this.findPath(arr[i].arrBut, id);
                if(rez != null)
                return rez;
            }
            if(numSplice != -1) arrFolderId.splice(numSplice,1);
        }
        return null;
    }
    this.openId = function(id){
        for (var i = 0; i < this.bufferOt.length; i++) {
            if(this.bufferOt[i].id == id){
                this.openCloseObj(this.bufferOt[i], true);
            }
        }
    }




    var ii, jj, ww, hh, bat, sahLoad, wM, hM, sliderOtstup;
    this.scrolPos = function (_bool) {
        if (_bool == true) {
            self.scrollBar.value = this.content.y / (this._height - self.scrollBar.heightContent) * 100;            
        } else {
            self.content.y = (self.scrollBar.value / 100) * (this._height - self.scrollBar.heightContent);
            self.lines.y = (self.scrollBar.value / 100) * (this._height - self.scrollBar.heightContent);
        }       
    };



    // прокрутка колесом мышки
    var hhh, www;
    this.sahDelta=10
    this.mousewheel = function (e) {
        if(self.scrollBar.visible==false)   return

        var p=e.deltaY*-1;
        if(e.wheelDelta!=undefined){
            if(e.wheelDelta>0)p=1;
            else p=-1;
        }
        p*=-1;

        hhh=(self.scrollBar.heightContent-self.scrollBar.height)

        var pp=self.content.y-self.sahDelta*p;

        if(pp<-hhh)pp=-hhh
        self.content.y=pp
        self.lines.y = pp;

        if (p < 0) {
            if (self.content.y >= 0) {
                self.content.y = 0;
                self.lines.y = 0;
            } else {                
                self.content.y += self.sahDelta;
                self.lines.y += self.sahDelta;
            }
        } 
        self.scrolPos(true)
        
    };




    if(dcmParam.mobile==false){             
        this.div.addEventListener('mousewheel', this.mousewheel)
    }



    var sp=undefined;   
    this.dragActiv=false
    this.mouseDown=function(e){     
        self.dragActiv=true;
        sp=undefined;
        document.body.style.pointerEvents="none";
        
    
    }

    this.mouseup=function(e){       
        self.dragActiv=false;
        sp=undefined;
        document.body.style.pointerEvents=null;

        if(self.naId!=-1){
            if(self.bufferOt[self.naId])
            if(self.mouseUpFun)self.mouseUpFun(self.bufferOt[self.naId])
        } 

        
        
    }

    var yyy=0
    this.mousemove=function(e){         
        if(self.dragActiv==false)return;
        if(self.scrollBar.visible == false)return;
        
            hhh=(self.scrollBar.heightContent-self.scrollBar.height)
           
     

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
        self.lines.y = yyy;
        self.scrolPos(true)
    }   

    if(dcmParam.mobile==false){         
        this.content.div.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseup);
        
    }else{
        this.content.div.addEventListener("touchstart", this.mouseDown);
        window.addEventListener("touchend", this.mouseup);
        
    }
    dcmParam.addFunMove(self.mousemove)





    this.objectNa
    this.arrObj;
    this.key;
    this.key1;
    this.setObj=function(_o,_key,_key1){
        this.objectNa=_o;
        this.key=_key
        if(_key==undefined)this.key="children";
        this.key1=_key1
        if(_key1==undefined)this.key1="name";

        this.arrObj=this.getArr(_o,this.key,this.key1)

        
        this.setArr(this.arrObj);
    }

    this.getArr=function(_o,_key,_key1){
        var a=[]
        a[0]={}
        a[0].text=_o[_key1]
        a[0].obj=_o

        if(_o[_key]!=undefined){
            if(_o[_key].length!=undefined){
                if(_o[_key].length!=0){
                    a[0].arr=[]
                    for (var i = 0; i < _o[_key].length; i++) {
                        a[0].arr[i]=this.getArr(_o[_key][i],_key,_key1)[0]
                    }
                }
            }
        }
        return a;
    }




    var startJson = '[{"text":"Папка 1","arr":[{"text":"Вложенный файл 1"},{"text":"Вложенный файл 2"}]}]';
    //var a=[{text:"Папка 1", arr:[{text:"Вложенный 1"},{text:"Вложенный 2"},{text:"Вложенный 2"},{text:"Папка 1", arr:[{text:"Вложенный 1"},{text:"Вложенный 2"},{text:"Вложенный 2"} ]} ,{text:"Вложенный 2"}]}];
    var a=[{text:"Папка 1", arr:[{text:"Вложенный 1"},{text:"Вложенный 2"},{text:"Вложенный 2"}]}]
    
    this.setArr(a);
    this.updateThree();
}   
DThree.prototype = Object.create(DCont.prototype);
DThree.prototype.constructor = DThree;
Object.defineProperties(DThree.prototype, {
    height: {
        set : function(value){
            if(value==this._height)return;
            this._height = value;  
            this.scrollBar.height=value;
            this.content.y=0;
            this.lines.y = 0;
            this.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)"; 
            this.redrawThree();
        },
        get : function() { return this._height; }
    },
    width: {
        set : function(value){
            if(value==this._width)return;
            this._width = value;
            this.scrollBar.x=value-this.scrollBar.width;
            this.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)"; 
            
            this.redrawThree();
        },
        get : function() { return this._width; }
    },
    heightBut: {
        set : function(value){
            if(value==this._heightBut)return;
            this._heightBut = value;
            this.lines.heightBut = this._heightBut;
            this._otst=this._heightBut;
            for (var i = 0; i < this.bufferOt.length; i++) {
                if (this.bufferOt[i].inited) {
                    this.bufferOt[i].height = this._heightBut;
                }
            }
            this.lines.heightBut=value;
            this.redrawThree();
        },
        get : function() { return this._heightBut; }
    },
    widthBut: {
        set : function(value){
            if(value==this._widthBut)return;
            this._widthBut = value; 
            for (var i = 0; i < this.bufferOt.length; i++) {
                if (this.bufferOt[i].inited) {
                    this.bufferOt[i].width = this._widthBut;
                }
            }
            this.redrawThree(); 
        },
        get : function() { return this._widthBut; }
    }, 
    activMouse: {
        set : function(value){
            if(this._activMouse == value) return;
            this._activMouse=value;
            this.scrollBar.activMouse = value;
            this.graphCover.visible = !value;
        },
        get : function() {
            return this._activMouse;
        }
    }, 
    activId: {
        set : function(value){
            this.openTillId(value);
            for (var i = 0; i < this.bufferOt.length; i++) {
                if(this.bufferOt[i].id == value){
                    this.bufferOt[i].mouseDown();
                    this._activId=value;

                    if (!this.scrollBar.visible) {
                        return;
                    }
                    let offset = -Math.min(this.bufferOt[i].y,
                        this.scrollBar.heightContent - this.scrollBar.height);

                    this.content.y = offset;
                    this.lines.y = offset;
                    this.scrolPos(true);
                    return;
                }
            }
            this._activId=-1;
        },
        get : function() {
            return this._activId;
        }
    },  
});

function DObjectThree(cont, _x, _y, fun, par){
    var self = this;
    DCont.call(this);   
    this.type = 'DObjectThree'; 
    cont.add(this);                    
    
    this.par=par

    this.fun=fun;                 
    this.x=_x;
    this.y=_y;
    this._width= 100;
    this._height=20;
    this._title='';
    this._color = '#fff000';

    this.arrBut=[];  
    this.life = true;       
    this.zebra_color=this._color;
    this.otstup=4;
    this.id=-1;         
    this.isLast=false; 
    this.level=0;
    this.visible=false;
    this.isFolder;
    this.isOpen=false; 
    this.isIndexOver = false;
    this.three = null;
    this.inited = false;
    this.init = function () {
        this.content = new DCont();
        this.add(this.content);


        this.panel=new DPanel(this.content,0,0)
        this.panel.boolLine=false

    /* this.graphicsM = new PIXI.Graphics(); 
        this.graphicsM.interactive = true;
        this.graphicsM.buttonMode = true;

        // this.imgEye = new PLImage(this,0,0);
        
        this.graphic = new PIXI.Graphics(); 
        this.graphic1 = new PIXI.Graphics();
        this.graphicsM.addChild(this.graphic);*/
        
        this.icon_type=2;
        this.icon=new DIconThree(this);

        
        /*this.graphicsM.addChild(this.icon.content);
        this.graphicsM.addChild(this.graphic1);
        this.addChild(this.graphicsM);*/

        this.panel1=new DPanel(this,0,0)
        this.panel1.alpha=0;
        //this.panel1.color="#ff0000"

        this.panel.height=this.panel1.height=this._height

        this.label = new DLabel(this.content,this.x, this.y, this.title);
        this.label.y = (this._height - this.label.height) / 2;

        this.label.div.style.pointerEvents="none"; 


        this.sobEvent = "null";

        this.mouseOver = function (e) {
            self.sobEvent="mouseOver";
            if(self.fun!=undefined)self.fun();
        };

        this.mouseOut = function (e) {
            self.sobEvent="mouseOut"; 
            if(self.fun!=undefined)self.fun();
        };

        this.mouseDown = function (e) {
            self.sobEvent="mouseDown"; 
            if(self.fun!=undefined)self.fun();
        };

        

        

        if(dcmParam.mobile==false){         
            this.panel1.div.addEventListener("mousedown", this.mouseDown);
            this.panel1.div.addEventListener("mouseout", this.mouseOut);
            this.panel1.div.addEventListener("mouseover", this.mouseOver);
            
            //this.panel1.div.addEventListener("mouseup", this.mouseup);
        }else{
            this.panel1.div.addEventListener("touchstart", this.mouseDown);        
        }
    }

    this.correctInfo = false;
    this.setInfo = function () {
        this.title = this.obj.text;
        this.width = this.three._width;
        this.height = this.three._heightBut;
    }

    this.drawElement = function () {
        if (!this.inited) {
            this.init();
            this.inited = true;
        }

        if (!this.correctInfo) {
            this.setInfo();
            this.correctInfo = true;
        }

        this.icon.isLast=this.isLast;
        this.icon.level=this.level;
        this.icon._height=this._height;
        this.icon._width=this._height;
        this.icon.isOpen=this.isOpen;
        this.icon.isLast=this.isLast;
        // this.imgEye.width = this.imgEye.height = this._height;
        if (this.isFolder) {
            this.icon.icon_type = 1;
        } else {
            this.icon.icon_type = 2;
        }
        this.icon.clear();
        this.icon.drawIcon();
        this.label.visible=true;
        this.rect = this.label.getRect();
        if(this._height<24){
            let s=Math.round(this._height)-8
            if(s<4)s=4
            this.label.fontSize=s
        }else{
            this.label.fontSize=16
        }
        
        //this.rect.width/=this.worldTransform.a;
        //this.rect.height/=this.worldTransform.a;
        this.label.y = (this._height - this.rect.height) / 2;


        /*this.graphic.clear();
        this.graphic.beginFill(this._color);
        this.graphic1.clear();
        this.graphic1.beginFill(0,0);*/
        // this.panel.width=this._width
        this.panel.x=this.icon.but._width*2+3+this.otstup;
        this.label.x = this.icon.but._width*2+this.otstup*2;
        this.panel.color=this._color;
        this.panel.width=this._width




        this.panel1.x=-this.x
        this.panel1.width=this.par.width



        // if(this.isFolder){
        //     this.panel.x=this.icon.but._width*2+3+this.otstup
        //    /* this.graphic.drawRect(this.icon.but._width*2+3+this.otstup,0, this._width, this._height);
        //     this.graphic1.drawRect(0,0,this.icon.but._width*2+this.otstup, this._height);*/
        //     this.label.x = this.icon.but._width*2+this.otstup*2;

        // }
        // else{
        //     this.panel.x=this.icon.but._width+3+this.otstup
        //     //this.graphic.drawRect(this.icon.but._width+this.otstup,0, this._width, this._height);
        //    // this.graphic1.drawRect(0,0,this.icon.but._width+this.otstup, this._height);
        //     this.label.x = this.icon.but._width+this.otstup*2;
        // }

    }
}
DObjectThree.prototype = Object.create(DCont.prototype);
DObjectThree.prototype.constructor = DObjectThree;
Object.defineProperties(DObjectThree.prototype, {
    title: {
        set : function(value){
            if(value==this._title)return;
            this._title = value; 
            this.label.text = this._title;
        },
        get : function() { return this._title; }
    },
    width: {
        set : function(value){
            if(value==this._width)return;
            this._width = value; 
            this.panel.width=this._width   
            this.panel1.width=this._width

            

        },
        get : function() { return this._width; }
    },
    height: {
        set : function(value){
            if(value==this._height)return;
            this._height = value;
            this.panel.height=this.panel1.height=this._height
            
        },
        get : function() { return this._height; }
    },
});



function DIconThree(cont, _x, _y,_h,_w, icon_type){
    DCont.call(this);
    this.type = 'DIconThree';
    var self = this;
    this.cont=cont;

    this.par=cont
    this.x=_x;
    this.y=_y;
    this._width=100;     //высота фигуры
    this._height=this.par._height;    //ширина фигуры


    this.color =  '#777777';
    this.otstup = 3;
    this.otstupIcon=this._width*2; //отступ иконки от кнопи

    this.cont.add(this);
    this.content = new DCont();
    this.add(this.content);

    this.but = new DImage(this,0,0);
    this.content.add(this.but);

    this.but.div.style.pointerEvents="none";
    //this.but.width=this._width;
    //this.but.height=this._height;
    this.base1 = "data:image/png;base64,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";
    this.base2 = "data:image/png;base64,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";
    this.base3 = "data:image/png;base64,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";

    /*this.triangle = new PIXI.Graphics();
    this.content.addChild(this.triangle);*/

    this.p1={};
    this.isOpen=false;
    this.isLast=false;

    this.lineArr=[];
   /* this.line = new PIXI.Graphics();//Графика для линии
    this.content.addChild(this.line);*/

    this.level=0;
    this.dist=this._height;


    this.drawIcon = function (){
        this.p1.x=this._width/2;
        this.p1.y=this._height/3;
        this.p1.width=this.p1.x+this._width/4
        this.but.width=this._width-this.otstup;
        this.but.height=this._height-this.otstup;
        
        this.but.x=this.but.width+this.otstup;
        this.dist=this._height;
        if(this.icon_type==1){ 
            /*this.triangle.clear();
            this.triangle.beginFill(this.color, 1);
            this.triangle.lineStyle(1, this.color);*/
            if(this.isOpen){
               /* var _shape =
                [this.p1.x, this.p1.y, this.p1.width,
                this.p1.y+this._height/8, this.p1.x, this.p1.y+this._height/4,
                this.p1.x,this.p1.y];*/
                this.but.link=this.base1;
            }
            else{
                /*var _shape =
                [this.p1.x, this.p1.y,
                this.p1.x+this._width/4, this.p1.y, 
                this.p1.x+this._width/8, this.p1.y+this._height/4,
                this.p1.x,this.p1.y];  */ 
                this.but.link=this.base2;
            }
            /*this.triangle.drawPolygon(_shape);
            this.triangle.endFill();*/

        }else if(this.icon_type==2){
            this.but.link=this.base3;
            // this.but.x=this.otstup;
        }
        //this.line.lineStyle(0.5, this.color);
        for (var i = 1; i <= this.level; i++){
            /*this.lineArr[i]=new PIXI.Graphics();
            this.content.addChild(this.lineArr[i]);     
            this.lineArr[i].clear();
            this.lineArr[i].lineStyle(0.5, this.color);
            if(this.isLast&&!this.isOpen){
                this.lineArr[i].moveTo(-(i*this.dist)+this._height/1.5,0);                  
                this.lineArr[i].lineTo(-(i*this.dist)+this._height/1.5,this._height/2);     
            }
            else{
            this.lineArr[i].moveTo(-(i*this.dist)+this._height/1.5,0);                  
            this.lineArr[i].lineTo(-(i*this.dist)+this._height/1.5,this._height);       
            }
            this.line.moveTo(-this.dist+this._width/1.5,this._height/2);                
            this.line.lineTo(this.width/4-this.otstup,this._height/2);*/
        }/**/
    }
    this.clear=function(){
        /*this.triangle.clear();
        for (var i = 1; i < this.lineArr.length; i++) {
            this.lineArr[i].clear();
        }
        this.line.clear();*/
    }  
}
DIconThree.prototype = Object.create(DCont.prototype);
DIconThree.prototype.constructor = DIconThree;
/*Object.defineProperty(DIconThree.prototype, "width", {
    set : function(value){         
        this._width = value;                              
    },
    get : function() { return this._width; }
});
Object.defineProperty(DIconThree.prototype, "height", {
    set : function(value){         
        this._height = value;                              
    },
    get : function() { return this._height; }
});*/

class Dlines extends DCont {
    constructor(dCont, _x, _y, _fun) {
        super(dCont);

        this.canvas = document.createElement('canvas');
        this.div.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        this.lineLength = 0.4;
    }

    redrawLines (arrBut) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLines(arrBut, -this._heightBut / 2, 0);
    }

    drawLines (arrBut, pathX, pathY) {
        let path = new Path2D();
        let butCount = 0;
        this.ctx.strokeStyle = this.color;
        path.moveTo(pathX, pathY);
        pathY += this._heightBut / 2;
        path.lineTo(pathX, pathY);

        for(let but of arrBut) {
            path.lineTo(pathX + this._heightBut * this.lineLength, pathY);
            path.moveTo(pathX, pathY);

            if(but.isFolder && but.isOpen === true) {
                let innerButCount = this.drawLines(but.arrBut, pathX + this._heightBut, pathY + this._heightBut / 2);
                pathY += this._heightBut * innerButCount;
                butCount += innerButCount;
            }

            if(!but.isLast) {
                pathY += this._heightBut;
                path.lineTo(pathX, pathY);
            }
        }
        
        this.ctx.stroke(path);
        return butCount + arrBut.length;
    }

    
    set width (w) {
        if(this.canvas.width != w) {
            this.canvas.width = w;
        }
    }

    get width () {
        return this.canvas.width;
    }

    set height (h) {
        if(this.canvas.height != h) {
            this.canvas.height = h;
        }
    }

    get height () {
        return this.canvas.height;
    }

    set heightBut (value) {     
        if(this._heightBut!=value){
            this._heightBut = value;
        }       
    }

    get heightBut () { return  this._heightBut;}

    set color (c) {
        if (this.color !== c) {
            this._color = c;
        }
    }

    get color () {
        return this._color;
    }
}