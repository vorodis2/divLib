import { DCont } from '../DCont.js';
import { DThreeButton } from './DThreeButton.js';

export class DThreeBool extends DCont{
    constructor(dCont, _x, _y, fun, bool) {
        super(dCont);
        dCont.add(this)

        this.type = 'DThreeBool';
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

        // this.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)"; 

        this.oldValue;
        this.folderOtstup=this.x;                      
        this.step_y=this.y;                            
        this.i_y=0;                                    
        this.zebra=false;   
        this.color0 = dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color),-20) //pl102.color;      
        this.color1 = dcmParam._color //dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1),-20)                               
        this.color2 = dcmParam._color
        // this.color3 = '#ff0000'; ///////////////////////////////////////    
        this.color3 = dcmParam.compToHexArray(dcmParam.hexDec('#ff8c00'),-20)                                   
        this.color4 = '#ff8c00'


        this.lines.color = this.color1;

        var levelCounter=0;                            
        var last_closed=false;                         
        this._otst = this._heightBut;
        var idArr = -1;
        this.bufferOt = [];  

        //Скролл-бар
        // this.scrollBar = new DScrollBarV(this,0,0, function(){
        //     self.content.y=-(this.heightContent-this.height)*this.value/100;
        //     self.lines.y = -(this.heightContent-this.height)*this.value/100;
        // });
       
        // this.scrollBar.visible = false;
        // this.scrollBar.width = this._heightBut/4;
        // this.scrollBar.but.radius = 100;

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
            if (obj) if (obj.obj) if (obj.obj.link) but.link = obj.obj.link;
            but.id = idArr;
            but.obj = obj;
            but.isFolder = false;
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
            // this.scrollSet();
            this.clear();
            this.update();
            this.drawElement(this.arrBut);
            // this.scrollBar.scrolValue = -this.content.y
            // this.content.y=- this.scrollBar.scrolValue;
            // this.lines.y = -this.scrollBar.scrolValue;
            //Если видно не все элементы и пропадает скролл
            // //Устанавливаем область видимости в ноль
            // if(!obj.isOpen&&this.content.y<0&&this.scrollBar.visible==false){
            //     this.content.y=0;
            //     this.lines.y = 0;
            // }
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

            // this.scrollBar.x = this._width - this.scrollBar.width;
            // this.scrollBar.height=this._height;
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
                arrBut[i].y=this.step_y;           
                arrBut[i].x=this.folderOtstup;
                arrBut[i].visible = true;
                arrBut[i].level=levelCounter;
                this.butCount++;

                if(arrBut[i].isFolder && arrBut[i].isOpen===true){// если мы открыты показываем содержимое
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
                // this.scrollSet();
            }

            
        }

        //Обработка действий скролла
        // this.scrollSet=function(){
        //     if(this.butCount*(this._heightBut)<=this._height){
        //         this.scrollBar.visible = false;           
        //     }else{
        //         this.scrollBar.visible = true;           
        //         this.scrollBar.height = this._height;
        //         this.scrollBar.heightContent = (this.butCount*(this._heightBut));
        //     }
        //     if(this.scrollBar.height<this._heightBut) {
        //         this.scrollBar.visible=false;   
        //     } 
        // }

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
            // if (_bool == true) {
            //     self.scrollBar.value = this.content.y / (this._height - self.scrollBar.heightContent) * 100;            
            // } else {
            //     self.content.y = (self.scrollBar.value / 100) * (this._height - self.scrollBar.heightContent);
            //     self.lines.y = (self.scrollBar.value / 100) * (this._height - self.scrollBar.heightContent);
            // }       
        };


        // прокрутка колесом мышки
        var hhh, www;
        this.sahDelta=10
        this.mousewheel = function (e) {
            // if(self.scrollBar.visible==false)   return

            var p=e.deltaY*-1;
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)p=1;
                else p=-1;
            }
            p*=-1;
            // hhh=(self.scrollBar.heightContent-self.scrollBar.height)
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
            // if(self.scrollBar.visible == false)return;
            
            // hhh=(self.scrollBar.heightContent-self.scrollBar.height)
               
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

    set height(value) {
       if(value==this._height)return;
        this._height = value;  
        // this.scrollBar.height=value;
        this.content.y=0;
        this.lines.y = 0;
        // this.div.style.clip = "getRect(1px "+this._width+"px "+this._height+"px 0px)"; 
        this.redrawThree();
    }   
    get height() { return  this._height;} 

    set width(value) {
        if(value==this._width)return;
        this._width = value;
        // this.scrollBar.x=value-this.scrollBar.width;
        // this.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)"; 
        
        this.redrawThree();
    }   
    get width() { return  this._width;} 

    set heightBut(value) {
        if(value==this._heightBut)return;
        this._heightBut = value;
        this.lines.heightBut = this._heightBut;
        this._otst=this._heightBut*0.25;
        for (var i = 0; i < this.bufferOt.length; i++) {
            if (this.bufferOt[i].inited) {
                this.bufferOt[i].height = this._heightBut;
            }
        }
        this.lines.heightBut=value;
        this.redrawThree();
    }   
    get heightBut() { return  this._heightBut;} 

    set widthBut(value) {
        if(value==this._widthBut)return;
        this._widthBut = value; 
        for (var i = 0; i < this.bufferOt.length; i++) {
            if (this.bufferOt[i].inited) {
                this.bufferOt[i].width = this._widthBut;
            }
        }
        this.redrawThree(); 
    }   
    get widthBut() { return  this._widthBut;} 

    set activMouse(value) {
        if(this._activMouse == value) return;
        this._activMouse=value;
        // this.scrollBar.activMouse = value;
        this.graphCover.visible = !value;
    }   
    get activMouse() { return  this._activMouse;} 

    set activId(value) {
        this.openTillId(value);
        for (var i = 0; i < this.bufferOt.length; i++) {
            if(this.bufferOt[i].id == value){
                this.bufferOt[i].mouseDown();
                this._activId=value;

                // if (!this.scrollBar.visible) {
                //     return;
                // }
                let offset = -Math.min(this.bufferOt[i].y)
                    // this.scrollBar.heightContent - this.scrollBar.height);

                this.content.y = offset;
                this.lines.y = offset;
                this.scrolPos(true);
                return;
            }
        }
        this._activId=-1;
    }   
    get activId() { return  this._activId;} 
}

export class DObjectThree extends DCont{
    constructor(cont, _x, _y, fun, par) {
        super(cont);
        var self = this;
        cont.add(this)
        this.type = 'DObjectThree'; 
        this.par=par

        this.fun=fun;                 
        this.x=_x;
        this.y=_y;
        this._width= 100;
        this._height=20;
        this._title=' ';
        this._color = '#fff000';
        this._link = null

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

            // Основная кнопка
            this.panel=new DThreeButton(this.content,0,0)
            this.panel.boolLine=false
            if (this.link != null && this.link != 'null') this.panel.link = this.link

            this.panel.text=this.title

            this.panel1=new DPanel(this,0,0)
            this.panel1.alpha=0;

            this.panel.height=this.panel1.height=this._height

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
            
            this.panel.x=-this.x+(this.x);
            this.panel.color=this._color;
            this.panel.width=this.width-this.x;

            // this.panel1.x=-this.x;
            // this.panel1.width=this.par.width;

            this.panel1.x=-this.x+(this.x);
            this.panel1.width=this.width-this.x;
        }
    }
    
    set title (value) {
        if(value==this._title)return;
        this._title = value; 
        if (value) this.panel.text = value;

    }
    get title () { return this._title; }

    set link (value) {
        if(value==this._link)return;
        this._link = value; 
        if (value) if(this.panel) this.panel.link = value; 

    }
    get link () { return this._link; }

    set width (value) {
        if(value==this._width)return;
        this._width = value; 
        this.panel.width=this._width   
        this.panel1.width=this._width
    }
    get width () { return this._width; }

    set height (value) {     
        if(value==this._height)return;
        this._height = value;
        this.panel.height=this.panel1.height=this._height  
    }
    get height () { return this._height; }
}


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