
//класс компонент работающий с кнопками
import { DCont } from './DCont.js';
import { DButton } from './DCM.js';
export class DVupodalka extends DCont {
    constructor(dCont, x, y, kol,fun) {
        super();
        this.type = 'DVupodalka';
        this.infoThis=`
            var dbs= new DVupodalka(this.dCont,0,0, ["xz","xz1"],function(){}) 
            dbs.tip=0;//в лево по w; 1 право; 2 низ; 3 лево;
            dbs.setTArr(["xz","xz1"]);выстопит tip=3;  
            .boolDragIndex=true//При тыке меняет индекс   

            dbs.array[0].link="resources/pic/1.png";

            dbs.array[0].color='#ff0000'
            dbs.dragIndex() Вызови эту хренб если изменял детей       
        `

        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        var self = this;
        this.x = x || 0;
        this.y = y || 0;
        this.fun = fun;

       

        this._kol=kol|| 2;
        if(kol && kol[0]!=undefined){
            this._kol=kol.length
        }


        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        
        this.funChange = undefined;
        this.boolDragIndex=true
        this._wh=dcmParam.wh;
        this._otMy=0
        this._visiIndex = true; 
        this._open = false;      

        this.keyuuid=Math.random()   
        this.div.keyuuid=this.keyuuid;

        
        this._otstup = dcmParam._otstup;
        this._index = 0;
        this._boolLine=dcmParam._boolLine;
        this._color = dcmParam._color;
        this._colorActive = dcmParam.compToHexArray(dcmParam.hexDec(this._color), -40);//dcmParam.colorActive;
        this._boolFond = true;
        this._borderRadius = dcmParam._borderRadius;
        this._fontSize = dcmParam._fontSize;
        this._scalePic = 0;
        this._activMouse = true;
        this._glowSah = 0;
        this._glowColor = '#000000';

        this._activeIndex = true;   
        this.arrAct = [];           
        this._tip=0; 
        this.arrayCash=[]
        this.array=[]

        this.aa=this._wh*this._kol+this._otstup*(this._kol-1)
        this._width=this.aa;
        this._height=this._wh;

        this._closed=true;        


        //создает кнопку
        var button 
        this.createZamen=undefined
        this.getButton = function(){
            //делет видимыми кнопки в масиве
            for (var i = 0; i < this.arrayCash.length; i++) {
                if(this.arrayCash[i].active==false){
                    this.arrayCash[i].active = true
                    return this.arrayCash[i]
                }
            }
            if (this.createZamen != undefined) {
                button=this.createZamen()
            }else{
                button=new DButBox(this.dCont,0,0," ",this.sob)
            }
           // button.fun_mousedown=this.sob;
            //размещене и параметры кнопка
            button.idArr=this.arrayCash.length
            button.width=this._wh;
            button.height=this._wh;
            button.borderRadius = this._borderRadius;
            button.glowSah = this._glowSah;
            button.glowColor = this._glowColor;
            button.activMouse = this._activMouse;
            button.boolLine=this._boolLine;
            button.fontSize=this._fontSize;
            button.scalePic=this._scalePic;
            
            //наполение масива кнопкой
            this.arrayCash.push(button)
            return button  
        }

        this.button
        this.dCont
        this.init = function(){

            this.dCont=new DCont();
            this.panel=new DPanel(this.dCont);


            if (this.createZamen != undefined) {
                button=this.createZamen()
            }else{
                button=new DButBox(this, 0, 0, " ")
            }
            button.fun_mousedown=function(){
                self.open=true
            }

            button.width=this._wh;
            button.height=this._wh;
            button.glowSah = this._glowSah;
            button.glowColor = this._glowColor;
            button.activMouse = this._activMouse;
            button.boolLine=this._boolLine;
            button.fontSize=this._fontSize;
            button.scalePic=this._scalePic;
            
            this.button=button
        }

        this.init();

        this.setArrAct = function(a){
            for (var i = 0; i < a.length; i++) {
                if(self.array[i]){
                    if(a[i]){
                        self.array[i].color=self._colorActive
                    }else{
                        self.array[i].color=self._color
                    }
                }
                
            }
        }



        this.sob = function(){

            self.setIndex(this.idArr)
            if(self.fun)self.fun()

        }
      
        this.setIndex = function(index){
            self.index=index;
            self.dragTip();
        }



        this.boolColor=true
        this.dragIndex = function(){

            if(this._activeIndex==false){
                return;
            }

            let text=' ';
            let link='';
            if(this.array[this._index]){
                text=this.array[this._index];
                if(this.array[this._index].image &&this.array[this._index].image.visible && this.array[this._index].link!="null"){
                    link=this.array[this._index].link
                }
            }
            this.button.text=this.array[this._index].text;
            if(link==""){
                if(this.button.image)this.button.image.visible=false
            }else{
                this.button.link=link;
                this.button.image.visible=true
            }

            this.button.color=this.array[this._index].color;
        }




        //делает не видимыми кнопки не входящие в масив
        this.clear = function(){
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].active=false                
            } 
        }
        
        //вызов кнопок и передача им значения(текста)
        this.dragArr=function(){
            this.clear()
            this.array.length=0
            for (var i = 0; i < this._kol; i++) {
               this.array.push(this.getButton())
            }  
            this.dragTip()           

        }


              
        this.dragTip = function(){            
           

            let x=this._otstup;
            let y=this._otstup;
            let b=true;
            let b1=true;

            if(this._tip==2 || this._tip==3)b=false;

            arrDin.length=0;
            for (var i = 0; i < this.array.length; i++) {
                b1=false
                if(i==this._index){
                    this.array[i].visible=false
                    
                    if(this._visiIndex==true){
                        b1=true;  
                        this.array[i].activMouse=false
                        this.array[i].visible=true
                    }else{
                        this.array[i].visible=false
                    }
                }else{
                    this.array[i].visible=true
                    this.array[i].activMouse=true
                    b1=true;                    
                } 

                if(b1){
                    if(b)arrDin.push(this.array[i])
                    else arrDin.unshift(this.array[i])
                }               
            }


            for (var i = 0; i < arrDin.length; i++) {
                arrDin[i].x=x;
                arrDin[i].y=y;
                if(this._tip==0)y+=this._otstup+this._wh;
                if(this._tip==1)x+=this._otstup+this._wh;
                if(this._tip==2)y+=this._otstup+this._wh;
                if(this._tip==3)x+=this._otstup+this._wh;
            }

            if(this._tip==0){
                this.dCont.x=-this._otstup;
                this.dCont.y=-y-this._otstup-this._otMy;
                this.panel.width=this._otstup*2+this._wh;
                this.panel.height=y;
            }

            if(this._tip==1){
                this.dCont.x=this._otstup+this._wh+this._otMy;
                this.dCont.y=-this._otstup;
                this.panel.width=x;
                this.panel.height=this._otstup*2+this._wh;
            }

            if(this._tip==2){
                this.dCont.x=-this._otstup;
                this.dCont.y=this._otstup+this._wh+this._otMy;
                this.panel.width=this._otstup*2+this._wh;
                this.panel.height=y;
            }

            if(this._tip==3){

                this.dCont.x=-x-this._otstup-this._otMy;
                this.dCont.y=-this._otstup;
                this.panel.width=x;
                this.panel.height=this._otstup*2+this._wh;
            }
        }

        let arrDin=[]        
       
            







        this.setTArr = function(arr){
            let ss
            this.kol=arr.length
            for (var i = 0; i < arr.length; i++) { 
                ss=arr[i]+""
                //this.array[i].width=this._fontSize*ss.length*0.60+this._fontSize
                this.array[i].text=ss;
                this.array[i].visible=true                
            }
            this._tip=-1;
            this.tip=3;

            let s=' '
            if(arr[this._index])s=arr[this._index]
            this.button.text=s;
        }



        this.dragOpen = function(b){ 
            this.dragTip()

            if(b)this.add(this.dCont);
            else this.remove(this.dCont);

            if(this._closed)this.dragClosed(b)
        } 

        this.dragClosed = function(b){ 
            if(b==true){
                if (dcmParam.mobile == false) {
                    document.addEventListener('mousedown', self.mousedown);                  
                } else {
                    document.addEventListener('touchstart', self.mousedown);
                }
            }else{
                if (dcmParam.mobile == false) {
                    document.removeEventListener('mousedown', self.mousedown);                  
                } else {
                    document.removeEventListener('touchstart', self.mousedown);
                }
            }
        }

        this.mousedown = function(e){ 
            if(e.target){
              
                let r=self.getBlok(e.target)
                if(r==null){
                    self.open=false;
                }
            }
            
        }
        this.getBlok=function(div){ 
            if(div.keyuuid!=undefined){
                if(div.keyuuid==self.keyuuid){
                    return div;
                }
            }

            let dd= div.parentNode;
            if(dd){
                return this.getBlok(dd)
            }
            return null
        }  




        this.dragArr();

        if(kol && kol[0]!=undefined){
            this.setTArr(kol)
        }
    }




    set x(value) {
        this.position.x = value;
    }
    get x() {
        return this.position.x;
    }
    set y(value) {
        this.position.y = value;
    }
    get y() {
        return this.position.y;
    }


    set activeIndex(v) {
        if (this._activeIndex != v) {
            this._activeIndex =v;
            this.dragTip();

        }
    }

    get activeIndex() {
        return this._activeIndex;
    }


    set visiIndex(v) {
        if (this._visiIndex !=v) {
            this._visiIndex = v;
            this.dragTip()
        }
    }

    get visiIndex() {
        return this._visiIndex;
    }

    set open(v) {
        if (this._open != v) {
            this._open = v;
            this.dragTip();
            this.dragOpen(this._open);
        }
    }

    get open() {
        return this._open;
    }

    set closed(v) {
        if (this._closed != v) {
            this._closed = v;     

        }
    }

    get closed() {
        return this._closed;
    }







    set tip(v) {
        if (this._tip != Math.round(v)) {
            this._tip = Math.round(v);
            this.dragTip()
            this.dragIndex()
        }
    }

    get tip() {
        return this._tip;
    }

    set wh(v) {
        if (this._wh != v) {
            this._wh = v;          
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].width=this._wh;                
                this.arrayCash[i].height=this._wh;               
            } 
            this.button.width=this._wh; 
            this.button.height=this._wh; 
            this.dragTip()            
        }
    }

    get wh() {
        return this._wh;
    }


    set width(v) {
        if (this._width != v) {
            this._width = v;          
            let bb = (this._width-this._otstup*(this._kol-1)) /this._kol           
           
            this.dragTip()    
        }
    }

    get width() {
        return this._width;
    }



    set height(v) {
        if (this._height != v) {
            this._height = v;          
            let cc = (this._height-this._otstup*(this._kol-1)) /this._kol
            //this._wh=cc  
            
            this.dragTip()      
        }
    }

    get height() {
        return this._height;
    }

    //сеттер отступа
    set otstup(v) {
        if (this._otstup != v) {
            this._otstup = v;
            this.dragTip()  
          
        }
    }
    get otstup() {
        return this._otstup;
    }

    //сеттер отступа
    set otMy(v) {
        if (this._otMy != v) {
            this._otMy = v;
            this.dragTip()
          
        }
    }
    get otMy() {
        return this._otMy;
    }





    //сеттер прозрачности определенной кнопки
    set index(v) {
        if (this._index != v) {
            this._index = v;
         
            this.dragIndex()           
        }
    }
    get index() {
        return this._index;
    }

    //сеттер обновления количества кнопок
    set kol(v) {
        if (this._kol != Math.floor(v)) {
            this._kol = Math.floor(v);
            this.dragArr()
        }
    }
    get kol() {
        return this._kol;
    }


    set boolLine(value) {
        if (this._boolLine != value) {
            this._boolLine = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].boolLine=this._boolLine;
            }
            this.button.boolLine=this._boolLine; 
            this.panel.boolLine=this._boolLine; 
        }
    }
    get boolLine() {
        return this._boolLine;
    }


    set color(value) {
        if (this._color != value) {
            this._color = value;
            this._colorActive =dcmParam.compToHexArray(dcmParam.hexDec(this._color), -40);
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].color=this._color;
            }
            this.button.color=this._color; 
         
        }
    }
    get color() {
        return this._color;
    }


    set colorActive(value) {
        if (this._colorActive != value) {
            this._colorActive = value;

        }
    }
    get colorActive() {
        return this._colorActive;
    }


    set borderRadius(value) {
        if (this._borderRadius != value) {
            this._borderRadius = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].borderRadius = this._borderRadius;
            }
            this.button.borderRadius=this._borderRadius; 
            this.panel.borderRadius=this._borderRadius; 
        }
    }
    get borderRadius() {
        return this._borderRadius;
    }


    set fontSize(value) {
        if (this._fontSize != value) {
            this._fontSize = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].fontSize = this._fontSize;
            }
            this.dragTip() 
        }
    }
    get fontSize() {
        return this._fontSize;
    }


    set scalePic(value) {
        if (this._scalePic != value) {
            this._scalePic = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].scalePic = this._scalePic;
            }
            this.button.scalePic=this._scalePic; 
        }
    }
    get scalePic() {
        return this._scalePic;
    }


    set glowSah(value) {
        if (this._glowSah != value) {
            this._glowSah = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].glowSah = this._glowSah;
            }
            this.button.glowSah=this._glowSah; 
        }
    }
    get glowSah() {
        return this._glowSah;
    }


    set glowColor(value) {
        if (this._glowColor != value) {
            this._glowColor = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].glowColor = this._glowColor;
            }
            this.button.glowColor=this._glowColor; 
        }
    }
    get glowColor() {
        return this._glowColor;
    }


    set activMouse(value) {
        if (this._activMouse != value) {
            this._activMouse = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].activMouse = this._activMouse;
            }
            this.button.activMouse=this._activMouse; 
        }
    }
    get activMouse() {
        return this._activMouse;
    }


    set boolFond(value) {
        if (this._boolFond != value) {
            this._boolFond = value;
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].panel.visible = value;
                if (value == false) this.arrayCash[i].panel1.alpha = 0.01;
                else this.arrayCash[i].panel1.alpha = 1;
            }
            this.button.panel.visible = value;
            if (value == false) this.button.panel1.alpha = 0.01;
            else this.button.panel1.alpha = 1;
          
        }
    }
    get boolFond() {
        return this._boolFond;
    }


}

export class DButBox extends DButton {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super(dCont, _x, _y, _text, _fun, _link);
        this.type = 'DButton';
        this._active=true;
        //this.creatImage()
    }
    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.visible=value;            
        }
    }
    get active() {
        return this._active;
    }

}