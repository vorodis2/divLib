import { DCont } from '../DCont.js';
import { DThreeButton } from './DThreeButton.js';

export class DThreeBool extends DCont{
    constructor(dCont, _x, _y, fun, _bool) {
        super(dCont);
        dCont.add(this)

        this.type = 'DThreeBool';
        var self = this; 
        
        this.dcmParam=dcmParam; 
        this.dcmParam.add(this)
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);

        this.otstup = 4;    

        this.fun = fun;
        this.x=_x;
        this.y=_y;
        this.boolClick=_bool;

        this._width=36;
        this._height=200;
        this._heightBut=32;  

        this._widthBut=this._width-(this.otstup*2); //32
        // this._widthBut=32; //32
        this._activMouse = true;
        this._activId = -1;
        this._bool = true
        this._scalePic=0

        this.arr=[];                                   
        this.arrBut=[];                                
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
        this.lines.x = this.otstup
        this.lines.y = this.otstup
        this.add(this.lines);

        this.content = new DCont();
        this.add(this.content);

        this.oldValue;
        this.folderOtstup=this.x;                      
        this.step_y=this.y;                            
        this.i_y=0;                                    
        this.zebra=false;   
                

        this.temp_y = this.y


        this.color0 = dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color),-20) //pl102.color;          // Цвет при наведении
        this._color1 =  dcmParam._color
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
            this.content.y=this.otstup;
            this.content.x=this.otstup;
            this.lines.y = this.otstup;
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
                this.activId = obj.id;
                //Открытие/закрытие папки
                if(this.boolClick == false || this.boolClick == undefined)this.openCloseObj(obj, !obj.isOpen); 
                if(this.boolClick == true) {
                     var vv = obj.id
                     if(this.findPath(this.arrBut, obj.id)[0] != undefined) vv = this.findPath(this.arrBut, obj.id)[0]
                     this.openId(vv)
                }
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
            this.redrawThree()
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
        this.drawElement = function (arrBut, p){
            //debugger;

            for (var i = 0; i < arrBut.length; i++){
                //Если была наведена мышка
                let col = arrBut[i].zebra_color

                if(arrBut[i].isIndexOver) arrBut[i]._color=col;
                else arrBut[i]._color=col;

                arrBut[i].actXZ="null"
                if(arrBut[i].id == this._activId){
                    arrBut[i]._color = this.color4;
                    arrBut[i].actXZ=this.color4
                } 

                arrBut[i].drawElement();

                //Рисуем вложенные эл-ты
                if(arrBut[i].isOpen===true) this.drawElement(arrBut[i].arrBut, this.arrObj[i].obj);
            }
        }

        //Обновление структуры дерева
        this.update = function(arrBut,bool){
            if(arrBut===undefined) arrBut=this.arrBut;
            if(!bool){
                this.i_y=0;
                this.i1_y=0;
                this.step_y=this.y;
                this.zebra=false;
                this.butCount=0;
                this.folderOtstup=0;
                this.difference=0;
                this.otstup=4;
                this.ee = 1
            }
            for (var i = 0; i < arrBut.length; i++){
                var oo = this._otst * this.ee

                var height = this._heightBut > this._widthBut ? this._widthBut + this.otstup : this._heightBut + this.otstup
                var height1 =  this._heightBut > this._widthBut-oo ? this._widthBut-oo*2 + this.otstup : this._heightBut + this.otstup

                this.step_y=((this.i_y*height)-(this.i1_y*height))+(this.i1_y*height1)




                this.i_y++;
                if(bool===true) this.i1_y++;

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
                this.ee = levelCounter > 1 ? levelCounter : 1

                if(arrBut[i].isFolder && arrBut[i].isOpen===true){// если мы открыты показываем содержимое
                    levelCounter++;
                    this.folderOtstup+=this._otst;
                    this.update(arrBut[i].arrBut,true);
                    arrBut[i].isOpen = true
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
                this.lines.height = ((this.i_y*height)-(this.i1_y*height))+(this.i1_y*height1);
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
                } else {
                    this.openCloseObj(this.bufferOt[i], false);
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

            trace(this.key,this.key1 )

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




        var iii = -1
        var sahi = -1
        var el = undefined
        this.openKey=function(name, key, bool, _arr, _but, _bb){
            var arr = _arr || this.arrObj
            var but = _but || this.arrBut

            for (var i = 0; i < arr.length; i++) {
                sahi++
                if(arr[i].obj[name] == key || arr[i][name] == key){
                    if(but[i].isOpen) but[i].isOpen = true
                    el = arr[i]
                    this.activId=sahi
                } else {
                    if(but[i].isOpen) but[i].isOpen = false
                }
                if(arr[i].obj.array) this.openKey(name, key, bool, arr[i].obj.array, but[i].obj.arr, true)
            }

            if (_bb != true){
                if(sahi>-1) {
                    sahi = -1
                    if(self.fun)self.fun("openKey", el)
                } else {
                    sahi = -1
                    if(self.fun)self.fun("openKey", "null")
                }
            }
        }



        /*var startJson = '[{"text":"Папка 1","arr":[{"text":"Вложенный файл 1"},{"text":"Вложенный файл 2"}]}]';
        //var a=[{text:"Папка 1", arr:[{text:"Вложенный 1"},{text:"Вложенный 2"},{text:"Вложенный 2"},{text:"Папка 1", arr:[{text:"Вложенный 1"},{text:"Вложенный 2"},{text:"Вложенный 2"} ]} ,{text:"Вложенный 2"}]}];
        var a=[{text:"Папка 1", arr:[{text:"Вложенный 1"},{text:"Вложенный 2"},{text:"Вложенный 2"}]}]
        
        this.setArr(a);
        this.updateThree();*/
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
        this._widthBut=this._width-(this.otstup*2);
        this.panelGlav.width = value 
        
        for (var i = 0; i < this.bufferOt.length; i++) {
            if (this.bufferOt[i].inited) {
                this.bufferOt[i].width = this._widthBut;
            }
        }
        this.redrawThree();
    }   
    get width() { return  this._width;} 

    set scalePic(value) {
        if(value==this._scalePic)return;
        this._scalePic = value;
        for (var i = 0; i < this.bufferOt.length; i++) {
            if (this.bufferOt[i].inited) {
                this.bufferOt[i].scalePic = this._scalePic;
            }
        }
        this.redrawThree();
    }   
    get scalePic() { return  this._scalePic;} 

    set heightBut(value) {
        if(value==this._heightBut)return;
        this._heightBut = value;
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
        this._activId=value;

        this.clear();
        this.openTillId(value);
        this.drawElement(this.arrBut);
        this.update();
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
        this._width=50;
        this._height=20;
        this._title=' ';
        this._title1 = null;
        this._color = '#fff000';
        this._link = null
        this._scalePic = 0;

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
        this._height1 = this.height;
        // this.color = undefined

        this.actXZ="null"

        this.init = function () {
            this.content = new DCont();
            this.add(this.content);

            // Основная кнопка
            this.button=new DThreeButton(this.content,0,0)
            if (this.link != null && this.link != 'null') this.button.link = this.link

            this.button.text=this.title
            this.button.height=this._height
            this.label=new DLabel(this.content,36,24)
            this.label.fontSize=8
            this.label.activMouse=false;
            this.label.visible=false
            this.label.width=50
            //this._title1 = null;
            //this.label.textAlign  ="center" 
            this.sobEvent = "null";
            this.label.color="#dddddd"

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
                this.button.div.addEventListener("mousedown", this.mouseDown);
                this.button.div.addEventListener("mouseout", this.mouseOut);
                this.button.div.addEventListener("mouseover", this.mouseOver);
            }else{
                this.button.div.addEventListener("touchstart", this.mouseDown);        
            }
        }

        this.correctInfo = false;
        this.setInfo = function () {
           
            
            this.title1 = this.obj.title1;
            if(this.obj && this.obj.obj && this.obj.obj.title1 && dcmParam.mobile==false){                
                this.title1 = this.obj.obj.title1;
            }else{
                this.title1 = null;
            }

            this.title = this.obj.text;
            this.width = this.three._widthBut;
            this.height = this.three._heightBut;
            this.height1 = this.height > this.width ? this.width-this.x*2 : this.height 
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

            this.button.x=this.x;
            this.button.scalePic=this.scalePic;
            
           
            if(this.obj.obj)if(this.obj.obj.color!=undefined){
                if(this.actXZ=="null"){
                    this.button.color=this.obj.obj.color;
                }else{
                    this.button.color=this.actXZ;
                }
                
            }else{
                this.button.color=this.color;
            }
            

            this.button.width=this.width-this.x*2;

            if (this.button.height>this.button.width)this.button.height = this.button.width
            if (this.button.height<this.button.width)this.button.height = this.height

            this.height1 = this.button.height
        }
    }
    
    set title (value) {
        if(value==this._title)return;
        this._title = value; 
        if (value) this.button.text = value;        

    }
    get title () { return this._title; }

    set title1 (value) {
        if(value==this._title1)return;
        this._title1 = value; 

        if (value!=null) {
            this.label.visible=true;
            this.label.text = value;
            
        }else{
            this.label.visible=false; 
        }       

    }
    get title1 () { return this._title1; }


    set scalePic(value) {
        if (this._scalePic != value) {
            this._scalePic = value;
            this.drawElement();
        }
    }
    get scalePic() {
        return this._scalePic;
    }

    set color (value) {
        if(value==this._color)return;
        this._color = value; 
        if (value) if(this.button) this.button.color = value; 
        this.drawElement()

    }
    get color () { return this._color; }

    set link (value) {
        if(value==this._link)return;
        this._link = value; 
        if (value) if(this.button) this.button.link = value; 

    }
    get link () { return this._link; }

    set width (value) {
        if(value==this._width)return;
        this._width = value; 
        this.button.width=this._width   
        this.label.width=this._width   
        if (this.button.height>this.button.width)this.button.height = this.button.width
        if (this.button.height<this.button.width)this.button.height = this.height
        this.drawElement()
    }
    get width () { return this._width; }

    set height (value) {     
        if(value==this._height)return;
        this._height = value;
        this.drawElement()
    }

    get height () { return this._height; }

    set height1 (value) {
        if(value==this._height1)return;
        this._height1 = value; 
    }

    get height1 () { return this._height1; }
}


class Dlines extends DCont {
    constructor(dCont, _x, _y, _fun) {
        super(dCont);
        this.canvas = document.createElement('canvas');
        this.div.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        // this.lineLength = 0.4;
    }

    redrawLines (arrBut) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLines(arrBut, -(-this._heightBut / 2) * 0.25, 0, 0);
        this.xx= -(-this._heightBut / 2) * 0.25
    }

    drawLines (arrBut, pathX, _pathY, lvl, hh) {
        let path = new Path2D();
        let butCount = 0;
        var pathY = _pathY
        
        let yy = 0
        this.ctx.strokeStyle = this.color;

        for (var i = 0; i < arrBut.length; i++){
            if(arrBut[i].isFolder && arrBut[i].isOpen===true && lvl < 1){
                yy = arrBut[i].y
                path.moveTo(this.xx, yy);
                yy += arrBut[i].height1
                path.lineTo(this.xx, yy); 
                let innerButCount = this.drawLines(arrBut[i].arrBut, this.xx, yy, i+1, arrBut[i].arrBut[0].height1);

            }

            if (lvl > 0){
                path.moveTo(this.xx, pathY);
                let sp = 5+(arrBut[i].height1/2)*(i+1)
                path.lineTo(this.xx, pathY+sp);
                path.lineTo(this.xx*5, pathY+sp);
                path.moveTo(this.xx, pathY+sp);
                if(!arrBut[i].isLast)path.lineTo(this.xx, pathY+sp+(arrBut[i].height1/2));
                pathY+= arrBut[i].height1/2
            }

        }

        this.ctx.stroke(path);
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