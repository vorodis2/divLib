import { DCont } from '../DCont.js';
import { DThreeButton } from './DThreeButton.js';

export class DThreeBool extends DCont{
    constructor(dCont, _x, _y, fun) {
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
        this._width=32;
        this._height=200;
        this._heightBut=32;  

        this._widthBut=32;  
        this._activMouse = true;
        this._activId = -1;
        this._bool = true

        this.arr=[];                                   
        this.arrBut=[];                                
        this.otstup = 2;                               
        this.butOnPanel = 10;                          
        this.butCount=0;                               
        this.butInProc=0;
        this.indexMouseDown = -1;                      
        this.indexOver= -1;

        this.panelGlav = new DPanel();
        this.panelGlav.width = this.width
        this.panelGlav.height = this.height
        this.panelGlav.color1 = '#EBEBEB'
        this.panelGlav.visible = this.bool
        this.add(this.panelGlav);

        this.lines = new Dlines();
        this.lines.heightBut = this._heightBut;
        this.add(this.lines);

        this.content = new DCont();
        this.add(this.content);

        this.oldValue;
        this.folderOtstup=this.x;                      
        this.step_y=this.y;                            
        this.i_y=0;                                    
        this.zebra=false;   

        this.color0 = dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color),-20) //pl102.color;          // Цвет при наведении
        this._color1 =  '#008cba'              
        this.color2 = this.color1
        this.color3 = dcmParam.compToHexArray(dcmParam.hexDec('#ff8c00'),-20)                               // ХЗ                             
        this._color4 = '#ff8044'                                                                            // Цвет активного эллемента


        this.lines.color = this.color1;

        var levelCounter=0;                            
        var last_closed=false;                         
        this._otst = this.heightBut*0.15;
        var idArr = -1;
        this.bufferOt = [];  

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
            this.clear();
            this.update();
            this.drawElement(this.arrBut);
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
                this.difference=0;
                this.otstup=5;
            }
            for (var i = 0; i < arrBut.length; i++){

                if (this._heightBut>this._widthBut+this.folderOtstup) this.difference+=this._heightBut-(this._widthBut+this.folderOtstup)

                this.step_y=this.i_y*(this._heightBut+this.otstup)-this.difference
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
                trace('w', arrBut[i].width-this.folderOtstup)
                trace('h',arrBut[i].height)

                arrBut[i].visible = true;
                arrBut[i].level=levelCounter;
                this.butCount++;

                if(arrBut[i].isFolder && arrBut[i].isOpen===true){// если мы открыты показываем содержимое
                    levelCounter++;
                // trace(levelCounter)
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

        // прокрутка колесом мышки
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
        }   

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

            if(_o[0]!==undefined){
                
                this.arrObj=[] 

                for (var i = 0; i < _o.length; i++) {
                    this.arrObj.push(this.getArr(_o[i],this.key,this.key1)[0])
                }   
            }else{
                this.arrObj=this.getArr(_o,this.key,this.key1)
            }

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
        this.panelGlav.height = value 

        this.content.y=0;
        this.lines.y = 0;
        this.redrawThree();
    }   
    get height() { return  this._height;} 

    set width(value) {
        if(value==this._width)return;
        this._width = value;
        this._widthBut=this._width;
        this.panelGlav.width = value 
        
        for (var i = 0; i < this.bufferOt.length; i++) {
            if (this.bufferOt[i].inited) {
                this.bufferOt[i].width = this._widthBut;
            }
        }


        this.redrawThree();
    }   
    get width() { return  this._width;} 

    set heightBut(value) {
        if(value==this._heightBut)return;
        this._heightBut = value;
        this.lines.heightBut = this._heightBut;
        this._otst=this._heightBut*0.15;
        for (var i = 0; i < this.bufferOt.length; i++) {
            if (this.bufferOt[i].inited) {
                this.bufferOt[i].height = this._heightBut;
            }
        }
        this.lines.heightBut=value;
        this.redrawThree();
    }   
    get heightBut() { return  this._heightBut;} 

    // set widthBut(value) {
    //     if(value==this._widthBut)return;
    //     this._widthBut = value; 
    //     for (var i = 0; i < this.bufferOt.length; i++) {
    //         if (this.bufferOt[i].inited) {
    //             this.bufferOt[i].width = this._widthBut;
    //         }
    //     }
    //     this.redrawThree(); 
    // }   
    // get widthBut() { return  this._widthBut;} 

    set activMouse(value) {
        if (this._activMouse != value) {
            this._activMouse = value;
            if (value == true) {
                this.alpha = 1;
                this.content.div.style.cursor = 'pointer';
                this.div.style.pointerEvents = null;
            } else {
                this.alpha = 0.85;
                this.content.div.style.cursor = 'auto';
                this.div.style.pointerEvents = 'none';
            }
        }


    }   
    get activMouse() { return  this._activMouse;} 

    set activId(value) {
        value = Math.round(value)
        this.openTillId(value);

        this._activId=value;
        this.clear();
        this.update();
        this.drawElement(this.arrBut);
    }   
    get activId() { return  this._activId;} 



    set bool(value) {
        if(this._bool == value) return;
        this._bool=value;
        this.panelGlav.visible = value

    }   
    get bool() { return  this._bool;} 


    set color1(value) {
        if(this._color1 == value) return;
        this._color1=value;
        this.color2=value;
        this.color0=dcmParam.compToHexArray(dcmParam.hexDec(value),-20);

        this.clear();
        this.update();
        this.drawElement(this.arrBut);
    }   
    get color1() { return  this._color1;} 

    set color4(value) {
        if(this._color4 == value) return;
        this._color4=value;

        this.clear();
        this.update();
        this.drawElement(this.arrBut);
    }   
    get color4() { return  this._color4;} 


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
            this.panel.boolLine=true
            if (this.link != null && this.link != 'null') this.panel.link = this.link

            this.panel.text=this.title
            this.panel.height=this._height

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
                this.panel.div.addEventListener("mousedown", this.mouseDown);
                this.panel.div.addEventListener("mouseout", this.mouseOut);
                this.panel.div.addEventListener("mouseover", this.mouseOver);
            }else{
                this.panel.div.addEventListener("touchstart", this.mouseDown);        
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

            this.panel.x=this.x;
            this.panel.color=this._color;
            this.panel.width=this.width-this.x*2;

            if (this.panel.height>this.panel.width)this.panel.height = this.panel.width
            if (this.panel.height<this.panel.width)this.panel.height = this.height
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

        if (this.panel.height>this.panel.width)this.panel.height = this.panel.width
        if (this.panel.height<this.panel.width)this.panel.height = this.height

    }
    get width () { return this._width; }

    set height (value) {     
        if(value==this._height)return;
        this._height = value;
        this.panel.height=this._height  

        if (this.panel.height>this.panel.width)this.panel.height = this.panel.width
        if (this.panel.height<this.panel.width)this.panel.height = this.height
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
        pathX =( pathX*0.15)
        
        this.ctx.strokeStyle = this.color;
        path.moveTo(pathX, pathY-50);
        pathY += (this._heightBut + 10) / 2 ;
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