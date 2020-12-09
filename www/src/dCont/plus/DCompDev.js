var Stats=function(){var n=Date.now(),p=n,g=0,q=Infinity,r=0,h=0,t=Infinity,u=0,v=0,w=0,f=document.createElement("div");window.onload=function(){document.getElementById("stats").style.top=document.documentElement.clientHeight-100+"px"};f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();x(++w%2)},!1);f.style.cssText="position:fixed; width:65px; height: 40px;border-width: 3px 3px 1px 1px;border-style: solid;border-color: rgb(255, 255, 255);border-image: initial; opacity:0.9;cursor:pointer";
var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var k=document.createElement("div");k.id="fpsText";k.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";k.innerHTML="FPS";a.appendChild(k);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:54px;height:27px;background-color:#0ff";for(a.appendChild(c);54>c.children.length;){var l=
document.createElement("span");l.style.cssText="display:block; width:1px;height:22px;float:left;background-color:#113";c.appendChild(l)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var m=document.createElement("div");m.id="msText";m.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";m.innerHTML="MS";d.appendChild(m);var e=document.createElement("div");
e.id="msGraph";e.style.cssText="position:relative;width:57px;height:27px;background-color:#0f0";for(d.appendChild(e);57>e.children.length;)l=document.createElement("span"),l.style.cssText="display:block;width:1px;height:22px;float:left;background-color:#131",e.appendChild(l);var x=function(b){w=b;switch(w){case 0:a.style.display="block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:x,begin:function(){n=Date.now()},end:function(){var b=
Date.now();g=b-n;q=Math.min(q,g);r=Math.max(r,g);m.textContent=g+" MS ("+q+"-"+r+")";var a=Math.min(25,25-g/200*25);e.appendChild(e.firstChild).style.height=a+"px";v++;b>p+1E3&&(h=Math.round(1E3*v/(b-p)),t=Math.min(t,h),u=Math.max(u,h),k.textContent=h+" FPS ("+t+"-"+u+")",a=Math.min(25,25-h/100*25),c.appendChild(c.firstChild).style.height=a+"px",p=b,v=0);return b},update:function(){n=this.end()}}};


///Окно дебагера

import { DCont } from '../DCont.js';
import { DCreatIcon } from './DCreatIcon.js';

export class DCompDev extends DCont{
    constructor(dCont, _x, _y, _text, _fun, bool) {
        super();
        var self=this
        this.type="DCompDev"
        this._active=true
        this.visible=this._active
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;
        this.text=_text||"DevWindow";
        this.fun=_fun;
        this.array=[]
        this._index=-1
        this._width=516;
        this._height=356.5;
        this._notSize=600
        this._otstup=5 

        this._minimize=false
        this.wind=new DWindow(this,0,0,this.text,function(){
            self.minimize=this.minimize;           
            if(self.fun)self.fun("minimize",this.minimize); 

        });
        

        this.fubDrag=undefined
        this.wind.fubDrag=function(){
            if(self.fubDrag)self.fubDrag("drag",self.x+self.wind.x,self.y+self.wind.y);         
        }
        this.wind.fubUp=function(){
            self.x+=self.wind.x
            self.y+=self.wind.y
            self.wind.x=0;
            self.wind.y=0;
            if(self.fun)self.fun("up",self.x,self.y); 
        }


        this.panBut = new DPanel(this.wind.content, this._otstup, this._otstup)
        this.panBut.height = 32 + (this._otstup*2)

        this.dCont=new DCont(this.wind.content);
        this.dCont.x=this._otstup;
        this.dCont.y=this.panBut.height + this._otstup*2;

        this.sob=function(s,p,p1){
            if(s=="index"){
                self.index=p
                if(self.fun)self.fun(s,p,p1)
            }

            
        }

        this.addCont=function(objPar, dCont, name, w, h){
            w = w != undefined ? w : this._notSize;
            h = h != undefined ? h : this._notSize;

            var gron=new GronXZ(this,objPar, dCont, name, w, h)
            gron.idArr=this.array.length
            gron.fun=this.sob
            this.array.push(gron);
            this.panBut.add(gron.button)
        }
        
        if(bool!=false){
            var oo1 = new DCreatIcon(null, 0, 0, null,function(s,p) {})
            var o1=new DXFTP(this.dCont)
   

            this.addCont(oo1,oo1,"Icon",516,356);
            this.addCont(o1, o1.dCont,"FTP",200,150);
       
        }
        

        this.button=new DButton(this.wind, this.wind.width-30, +2, 'X',function(){
            self.active=false
            if(self.fun)self.fun("active",false)
        })
        this.button.width=this.button.height=28

        this.reDrag=function(){
            this.wind.width=this._width+this._otstup*2
            this.wind.height=this._height+38+this.panBut.height+this._otstup*2
            this.panBut.width=this.wind.width-this._otstup*2
            this.button.x=this.wind.width-30
        }
        if(bool!=false)this.index=0

           
            
    }


    set index(value) {
        if(this._index!=value){
            this._index = value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active= value==i ? true : false
                this.array[i].button.alpha= this.array[i].idArr==value ? 0.5 : 1
            }
            this.width = this.array[value].w
            this.height = this.array[value].h
            
        }
    }
    get index() { return  this._index;}

    set minimize(value) {
        if(this._minimize!=value){
            this._minimize = value;            
            this.wind.minimize=this._minimize;
        }       
    }   
    get minimize() { return  this._minimize;} 

  


    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.visible=this._active
            this.wind.x=0;
            this.wind.y=0;
        }       
    }   
    get active() { return  this._active;} 

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
            this.reDrag()
        }       
    }   
    get height() { return  this._height;}   
}


/// Получает объект, контент для объекта, нейм, ширину, высоту, функцию 
/// Генерирует экземпляр класса с задаными парамметрами и передает в основное окно
export class GronXZ{
    constructor(par, objPar, dCont, name, w, h, fun) {  
        this.type="GronXZ"
        var self=this
        this.par=par;
        this.objPar=objPar;
        this.dCont=dCont;
        this.name=name;
        this.w=w;
        this.h=h;
        this.fun=fun;
        this._idArr=-1;
        this._otstup=this.par._otstup

        if(dCont){
            this.par.dCont.add(dCont) 
        }   

        this.button=new DButton(null, 0, this._otstup, name, function(){              
            if(self.fun)self.fun("index",self._idArr)
        })
        this.button.width=50
        this.button.height=32


        this.dddd=function(){
            if(this.dCont!=undefined){
                this.dCont.visible=this._active;
            }
            if(this.objPar!=undefined){
                if(this.objPar._active!=undefined){
                    this.objPar.active=this._active;
                }
                if(objPar.funDrwgWG==null){
                    objPar.funDrwgWG=this.funDrwgWG
                }
            }
        } 

        this.funDrwgWG=function(w,h){
            self.w=w
            self.w=w
            self.par.width = w;
            self.par.height = h;
        }
    }

    set idArr(value) {
        if(this._idArr!=value){
            this._idArr = value;
            this.button.x=this._idArr*(this.button.width+2)
        }       
    }   
    get idArr() { return  this._idArr;}

    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.dddd()
        }       
    }   
    get active() { return  this._active;}       
}


export class DXFTP{
    constructor(dC) {
        this.type="DXFTP"
        var self=this;

        this.dC=dC
        this._active = false        
        this.dCont = new DCont(this.dC)

        this.dCont.visible = this.active
        var stats1
        var stats=undefined
        this.init=function(){
            if(stats!=undefined)return

            stats=new Stats() 
            stats.setMode(0)
            stats.domElement.style.position = 'fixed';
            stats.domElement.style.top = '5px';
            stats.domElement.style.left = '5px'; 

            stats1=new Stats()           
            stats1.setMode(1)
            stats1.domElement.style.position = 'fixed';
            stats1.domElement.style.top = '5px';
            stats1.domElement.style.left =  '70px';

            this.dCont.div.appendChild(stats.domElement);
            this.dCont.div.appendChild(stats1.domElement); 
            animate()  
        }

        function animate() {            
            requestAnimationFrame( animate );
            if(self._active ==false)return
            stats.update();
            stats1.update();
        }        
    }

    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.init()
            this.dCont.visible = this.active

        }       
    }   
    get active() { return  this._active;} 
}




// export class DWStenColiz{
//     constructor(dC) {
//         this.type="DWStenColiz"
//         var self=this;

//         this.dC=dC
//         this._active = false 
//         this._otstup = 5
//         this._width=600
//         this._height=600

//         this.pan = new DPanel (this.dC)
//         this.pan.width = this._width
//         this.pan.height = this._height
//         this.pan.visible = this.active

//         this.slider = new DSliderBig (this.pan, this._otstup, this._otstup, function(){self.width=this.value;}, 'width', 300, 800)
//         this.slider.value = this._width
//         this.slider1 = new DSliderBig (this.pan, this._otstup, this.slider.height + this._otstup * 2, function(){self.height=this.value;}, 'height', 300, 800)
//         this.slider1.value = this._height

//         this.funDrwgWG=null
//         this.funxz=function(){
//             if(this.funDrwgWG!=undefined)this.funDrwgWG(this._width,this._height)
//         }

//     }

//     set active(value) {
//         if(this._active!=value){
//             this._active = value;
//             this.pan.visible = this.active
//         }       
//     }   
//     get active() { return  this._active;} 

//     set width(value) { 
//         if(this._width!=value){
//             this._width=value;
//             this.pan.width=value
//             this.slider.value = value;
//            this.funxz();
//         }
//     }   
//     get width() { return  this._width}

//     set height(value) { 
//         if(this._height!=value){
//             this._height=value;
//             this.pan.height=value
//             this.slider1.value = value;
//             this.funxz();
//         }
//     }   
//     get height() { return  this._height}
// }
