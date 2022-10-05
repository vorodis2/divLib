
//класс компонент работающий с кнопками

export class DButtons extends DCont {
    constructor(dCont, x, y, kol,fun) {
        super();
        this.type = 'DButtons';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        var self = this;
        this.x = x || 0;
        this.y = y || 0;
        this.fun = fun;
        this._kol=kol|| 0;

        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        
        this.funChange = undefined;

        this._wh=dcmParam.wh;
        
        this._otstup = dcmParam._otstup;
        this._index = 0;
        this._boolLine=dcmParam._boolLine;
        this._color = dcmParam._color;
        this._colorActive = dcmParam.colorActive;
        this._boolFond = true;
        this._borderRadius = 0;
        this._fontSize = dcmParam._fontSize;
        this._scalePic = 0;
        this._activMouse = true;
        this._glowSah = 0;
        this._glowColor = '#000000';
        this._tip=0; 
        this.arrayCash=[]
        this.array=[]

        this.aa=this._wh*this._kol+this._otstup*(this._kol-1)
        this._width=this.aa;
        this._height=this.aa;

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
                button=new DButtonXZ(this,0,0," ",this.sob)
            }
            
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


        this.sob = function(){
            if (self._tip==2) {
                let p=(this.idArr+1)%self._kol
                
                self.index=p
                if(self.fun)self.fun()
                return
            }

            self.index=this.idArr

            if(self.fun)self.fun()
        }
      

        this.dragIndex = function(){
            
            for (var i = 0; i < this.arrayCash.length; i++) {
                if (this.arrayCash[i].idArr==this._index) {
                    this.arrayCash[i].color=this._color;
                }else{
                    this.arrayCash[i].color=dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);
                }
            }

            if (this._tip==0 || this._tip==1) {
                for (var i = 0; i < this.arrayCash.length; i++) {
                    if(i >= this._kol){
                        this.arrayCash[i].visible=false
                    }else{
                        this.arrayCash[i].visible=true
                    }
                }
            }

            if (this._tip==2) {
                for (var i = 0; i < this.arrayCash.length; i++) {
                    if(i===this._index){
                        this.arrayCash[i].visible=true;
                    }else{
                        this.arrayCash[i].visible=false;
                    }
                }
            }
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
            this.dragIndex()
        }


        this.dragTip = function(){
            if (this._tip==0) {
                for (var i = 0; i < this._kol; i++) {
                    this.arrayCash[i].x=this._otstup*i+this.arrayCash[i].width*i
                    this.arrayCash[i].y=0;
                }                
            }
            if (this._tip==1) {
                for (var i = 0; i < this._kol; i++) {
                    this.arrayCash[i].x=0;
                    this.arrayCash[i].y=this._otstup*i+this.arrayCash[i].height*i                    
                }                
            }
            if (this._tip==2) {
                for (var i = 0; i < this._kol; i++) {
                    this.arrayCash[i].x=0;
                    this.arrayCash[i].y=0;
                }
            }
        }


        this.dragArr();

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
            this._wh=bb  
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].width=this._wh;
                this.arrayCash[i].height=this._wh;           
            } 
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
            this._wh=cc  
            for (var i = 0; i < this.arrayCash.length; i++) {
                this.arrayCash[i].width=this._wh;
                this.arrayCash[i].height=this._wh;              
            } 
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
            if (this._tip==0) { 
                for (var i = 0; i < this.arrayCash.length; i++) {
                    this.arrayCash[i].x=this._otstup*i+this.arrayCash[i].width*i
                }
                return
            }
            if (this._tip==1) {
                for (var i = 0; i < this.arrayCash.length; i++) {
                    this.arrayCash[i].y=this._otstup*i+this.arrayCash[i].height*i
                }
            }
        }
    }
    get otstup() {
        return this._otstup;
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
            
        }
    }
    get boolLine() {
        return this._boolLine;
    }


    set color(value) {
        if (this._color != value) {
            this._color = value;
            this.dragIndex()
        }
    }
    get color() {
        return this._color;
    }


    set colorActive(value) {
        if (this._colorActive != value) {
            this._colorActive = value;
            this.dragIndex()
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
        }
    }
    get boolFond() {
        return this._boolFond;
    }


}

export class DButtonXZ extends DButton {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super(dCont, _x, _y, _text, _fun, _link);
        this.type = 'DButton';
        this._active=true;

    }
    set active(value) {
        if (this._active != value) {
            this._active = value;
            
        }
    }
    get active() {
        return this._active;
    }

}