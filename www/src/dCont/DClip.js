
//класс компонент работающий с кнопками
import { DCont } from './DCont.js';


export class DClip extends DCont {
    constructor(dCont, _x, _y, _fun) {
        super();
        this.type = 'DClip';
       this.infoThis=`
            var dClip= new DClip(this.dCont,0,0,function(){})
            dClip.heightContent=100;
            dClip.sbv=0//скрол с лева 1 с права 2 воще нет
            dClip.time=500
            dClip.fun_drahYY(value)//процент с анимации 0-100
        `

        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        this._width = 100;
        this._height = 100;
        this.fun=_fun
        this._heightContent=100;
        this._sbv = 0;
        var self=this;
        this.time = 100;
        this.fun_drahYY = undefined
        this.panel=new DPanel(this)
        this.panel.alpha=0

        this._value = 0;       
        this.dd = new DCont(this);
        this.content = new DCont(this.dd);
        this.tween=undefined
        if(window.TWEEN!=undefined){
            this.tween=new TWEEN.Tween(this.content);
            this.tween.onUpdate(function(){
                if(self.fun_drahYY!=undefined)self.fun_drahYY(-self.content.y/self.hhh*100)
            })
        }


        this.ddSS = new DCont(this);
        this.ddSS.visible=false;
        this.scrollBarV = new DScrollBarV(this.ddSS, this._width - this.otstup1, 0, function () {
            // self.content.y = -this.scrolValue;
            //self.scrolPos(false);
           
            self.value = this.value;
            if(self.fun)self.fun()  
        });
        this.scrollBarV.offsetHit=3;
        this.scrollBarV.width=2;
        this.scrollBarV.alpha=0.5;

        this.bb=true
        let hh
        this.dragValue = function () {
            hh=this.hhh;
            if(hh<0)hh=0;

            
            this.scrollBarV.value = this._value;
            if(this.time!=0 && this.tween!=undefined){
                this.tween.to({y:-hh*this._value/100},this.time).start()
            }else{
                this.content.y=-hh*this._value/100;

            }
                       

            this.bb=true;
            if(hh==0)this.bb=false;
            this.scrollBarV.visible=this.bb
        }

        
        var delta, p;
        var sah=5;
        this.mousewheel = function (e) { 
            delta=-1;
            p=e.delta
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
            
            self.value+=p*sah; 
            if(self.fun)self.fun()          
        };

        this.div.addEventListener('mousewheel', this.mousewheel,  { passive: true})
        this.div.addEventListener("DOMMouseScroll", this.mousewheel,  { passive: true});

        this.boolDragMouse=true
        var sp=undefined;   
        this.dragActiv=false
        this.mouseDown=function(e){  

          
            if(self.boolDragMouse==false)return
            if(self.dragActiv==true)return    
            self.dragActiv=true;
            sp=undefined; 

            if(dcmParam.mobile==false){  
                window.addEventListener("mouseup", self.mouseup);                    
            }else{                   
                window.addEventListener("touchend", self.mouseup);                    
            }

            dcmParam.addFunMove(self.mousemove) 

        }

        this.mouseup=function(e){       
            self.dragActiv=false;
            sp=undefined; 

            if(dcmParam.mobile==false){  
                window.removeEventListener("mouseup", self.mouseup);                    
            }else{                   
                window.removeEventListener("touchend", self.mouseup);                    
            }

            dcmParam.removeFunMove(self.mousemove) 
        }

        var yyy=0
        this.mousemove=function(e){ 
         
            if(self.dragActiv==false)return;
            if(self.scrollBarV.visible == false)return; 
            if(self.scrollBarV.sp !== undefined)return;
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={                    
                        y:e.clientY,                    
                        y1:self.value
                    };
                }  
                sp.ys=e.clientY         
            }else{
                if(sp==undefined){
                    sp={                    
                        y:e.targetTouches[0].clientY,                   
                        y1:self.value
                    };
                }
                sp.ys=e.targetTouches[0].clientY
            }
            

            yyy=(sp.y-sp.ys); 
            let nb=self.time
            self.time = 0;
            self.value=sp.y1 + yyy/(self.hhh/100); 
            self.time = nb;
            if(self.fun)self.fun()  
        }   


        if(dcmParam.mobile==false){         
            this.div.addEventListener("mousedown", this.mouseDown);
            //window.addEventListener("mouseup", this.mouseup);
            
        }else{
            this.div.addEventListener("touchstart", this.mouseDown);
            //window.addEventListener("touchend", this.mouseup);
            
        }
        



        this.drag = function () {
            this.dd.div.style.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)";

        }; 
        this.drag();  

    }

    set x(v) {
        this.position.x = v;
    }
    get x() {
        return this.position.x;
    }
    set y(v) {
        this.position.y = v;
    }
    get y() {
        return this.position.y;
    }

    set value(v) {
        if(v<0)v=0;
        if(v>100)v=100;
        
        if (this._value != v) {
            this._value = v;                       
            this.dragValue();
        }
    }
    get value() {
        return this._value;
    }


    set width(v) {
        if (this._width != v) {
            this._width = v;
            if(this._sbv!==2)this.scrollBarV.x=-this.scrollBarV.width;
            else this.scrollBarV.x=this._width -this.scrollBarV.width;
            this.drag(); 
            this.panel.width=this._width
        }
    }
    get width() {
        return this._width;
    }

    set height(v) {
        if (this._height != v) {
            this._height = v;
            this.hhh=this._heightContent-this._height
            this.scrollBarV.height= v;
            this.drag();
            this.dragValue(); 
            this.panel.height=this._height  
        }
    }
    get height() {
        return this._height;
    }

    set heightContent(v) {
        if (this._heightContent != v) {
            this._heightContent = v;
            this.hhh=this._heightContent-this._height
            this.scrollBarV.heightContent = v;
            this.dragValue();
            //this.drag();
        }
    }
    get heightContent() {
        return this._heightContent;
    }

    
    set sbv(v) {
        if (this._sbv != Math.round(v)) {
            this._sbv = Math.round(v);
            if(this._sbv==0){
                this.ddSS.visible=false;
            }else{
                this.ddSS.visible=true;
            }
            
            if(this._sbv!==2)this.scrollBarV.x=-this.scrollBarV.width;
            else this.scrollBarV.x=this._width -this.scrollBarV.width;

            this.drag();            
        }
    }
    get sbv() {
        return this._sbv;
    }
}
