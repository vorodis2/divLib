var Stats=function(){var n=Date.now(),p=n,g=0,q=Infinity,r=0,h=0,t=Infinity,u=0,v=0,w=0,f=document.createElement("div");window.onload=function(){document.getElementById("stats").style.top=document.documentElement.clientHeight-100+"px"};f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();x(++w%2)},!1);f.style.cssText="position:fixed; width:65px; height: 40px;border-width: 3px 3px 1px 1px;border-style: solid;border-color: rgb(255, 255, 255);border-image: initial; opacity:0.9;cursor:pointer";
var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var k=document.createElement("div");k.id="fpsText";k.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";k.innerHTML="FPS";a.appendChild(k);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:54px;height:27px;background-color:#0ff";for(a.appendChild(c);54>c.children.length;){var l=
document.createElement("span");l.style.cssText="display:block; width:1px;height:22px;float:left;background-color:#113";c.appendChild(l)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var m=document.createElement("div");m.id="msText";m.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";m.innerHTML="MS";d.appendChild(m);var e=document.createElement("div");
e.id="msGraph";e.style.cssText="position:relative;width:57px;height:27px;background-color:#0f0";for(d.appendChild(e);57>e.children.length;)l=document.createElement("span"),l.style.cssText="display:block;width:1px;height:22px;float:left;background-color:#131",e.appendChild(l);var x=function(b){w=b;switch(w){case 0:a.style.display="block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:x,begin:function(){n=Date.now()},end:function(){var b=
Date.now();g=b-n;q=Math.min(q,g);r=Math.max(r,g);m.textContent=g+" MS ("+q+"-"+r+")";var a=Math.min(25,25-g/200*25);e.appendChild(e.firstChild).style.height=a+"px";v++;b>p+1E3&&(h=Math.round(1E3*v/(b-p)),t=Math.min(t,h),u=Math.max(u,h),k.textContent=h+" FPS ("+t+"-"+u+")",a=Math.min(25,25-h/100*25),c.appendChild(c.firstChild).style.height=a+"px",p=b,v=0);return b},update:function(){n=this.end()}}};


import { XZDivLib } from './XZDivLib.js';
import { DDPlus } from './DDPlus.js';

import { DDBase } from './DDBase.js';
import { DDCont } from './DDCont.js';

export class DDebug extends DCont{
    constructor(dCont, _x, _y, _key, param) {
        super();
        var self=this
        this.type="DCompDev"
        this._active=true
        this.visible=this._active
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;
        this.key=_key||"DevWindow";
        this._minimize=false
        this._dragBool=true;
        this._boolStatus=false;
        this.ls=new LocalStorage(function(){},this.key)
        this._index=-1

        this.array=[]

        this.param=new Param().param;
        if(param) this.param=param;



        this._width=this.param.sizeBase2*3+this.param.otstup*3;
        this._height=this.param.sizeBase2+this.param.otstup*2;

        
        this.wind=new DWindow(this,0,0," ",function(){
            self.minimize=this.minimize;           
            //if(self.fun)self.fun("minimize",this.minimize); 
            self.saveLS.dragPos();
        });
        this.wind.dragBool=this._dragBool;
        this.dCont=new DCont(this.wind.content)

        this.wind.fubDrag = function(){ 

            self._width=self.wind.width;
            self._height=self.wind.height-32;
            self.reDrag()
            self.saveLS.dragPos();
        }
        this.wind.dragBoolWH=true;

        this.ssss = new SSSS(this); 
        this.saveLS = new SaveLS(this);
        this.dbs=new DButtons(self.wind,32,0,["0. divLib","1. plus","2. dBase","3. getDCont"],function(){
            self.index=this.index
            self.saveLS.dragPos();
            self.wind.startDrag();
        });
        this.dbs.otstup=0
        this.dbs.color=this.wind.button.color

        this.arrCom=[]
        this.arrCom[0] = this.xzDivLib = new XZDivLib(this,function(s,p){
            if(s=="addObject")self.addObject(p)
        });
        this.arrCom[1] = this.ddPlus = new DDPlus(this,function(s,p){
            if(s=="addObject")self.addObject(p)
        });
        this.arrCom[2] = this.ddBase= new DDBase(this,function(s,p){
            if(s=="addObject")self.addObject(p)
        });

        this.arrCom[3] = this.dDCont= new DDCont(this,function(s,p){
            if(s=="addObject")self.addObject(p)
        });

        this.array[this.array.length]=this.arrCom[0]
        this.array[this.array.length]=this.arrCom[1]
        this.array[this.array.length]=this.arrCom[2]
        this.array[this.array.length]=this.arrCom[3]
        this.array[this.array.length]=this.pobject = new PObject(this);
        

        this.addPlus = function(obj){
            this.ddPlus.addPlus(obj);
        }

        this.setObj = function(obj, idArr, name ){
            if(this.array[idArr]){
                if(this.array[idArr].setObj){
                    this.array[idArr].setObj(obj,name)
                }
            }
        }

        this.getBase = function(name){
            return this.ddBase.getBase(name)
        }
        this.setBase = function(name, obj){
            this.ddBase.setBase(name, obj)
        }
        this.getDDcont = function(){
            return this.dDCont.getDDcont()
        }


        this.sizeWN = function(w, h, s) {                     
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].sizeWindow) this.array[i].sizeWindow(w, h, s)
            }
        }

        this.reDrag=function(){
            this.wind.width=this._width;
            this.wind.height=this._height+32;

            let ww = this._width - this.param.otstup*3;
            let hh = this._height - this.param.otstup*2;
            let ss = 1;
            this.sizeWN(ww,hh,ss)
        }




     
        var w, h, s;
        this.sizeWindow = function(_w, _h, _s) {
            if (_w) {
                w = _w;
                h = _h;
                s = _s;
            }                        
            this.saveLS.sizeWindow(w,h,s)           
        }

        function tick() {               
            if(self._active==true){                
                self.ssss.update();
            }
            requestAnimationFrame(tick);            
        }
        tick();
        this.reDrag(); 

        this.addObject=function(obj){
            this.pobject.addObject(obj);
        }


    }
    set index(value) {
        if(this._index!=value){
            this._index = value; 
            this.dbs.index = this._index; 
            
            for (var i = 0; i < this.arrCom.length; i++) {
                if(i==this._index){
                    this.arrCom[i].active=true
                }else{
                    this.arrCom[i].active=false
                }
            }
        }       
    }   
    get index() { return  this._index;} 





    set minimize(value) {
        if(this._minimize!=value){
            this._minimize = value; 
            if(this._minimize){

                this.wind.button.width=32; 
                this.saveLS.testPXY()
                this.dbs.visible = false;

            }else{
                this.wind.button.width=this.wind.width;
                this.dbs.visible = true; 

            }
            

            this.wind.minimize=this._minimize;
        }       
    }   
    get minimize() { return  this._minimize;} 

    set dragBool(value) {
        if(this._dragBool!=value){
            this._dragBool = value;           
            

            this.wind.dragBool=this._dragBool;
        }       
    }   
    get dragBool() { return  this._dragBool;}

    set boolStatus(value) {
        if(this._boolStatus!=value){
            this._boolStatus = value;            

            this.ssss.boolStatus=this._boolStatus;
        }       
    }   
    get boolStatus() { return  this._boolStatus;}    



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

export class SaveLS {
    constructor(par) {
        this.type = "SaveLS";
        var self = this;
        this.par = par;
        this.wind= this.par.wind
        this.ls=this.par.ls
        this.px=0
        this.py=0

        this.dragPos=function(b){
            if(w==undefined)return
            let ww=(w/s)-this.wind.button.width;
            this.px=this.wind.x/ww;
            if(this.px<0)this.px=0
            if(this.px>1)this.px=1    
                
            let hh=(h/s)-this.wind.height;
            if(this.wind.minimize)hh=(h/s)-this.wind.button.height;
            this.py=this.wind.y/hh;
            if(this.py<0)this.py=0
            if(this.py>1)this.py=1

            if(this.par._dragBool==false){
                this.px=1;
                this.py=0;
            }    

            this.wind.x=ww*this.px;
            this.wind.y=hh*this.py;

            

            if(b==undefined)this.save()
        }




        this.testPXY=function(){
            if(this.px>=0.99){
                let ww=(w/s)-32;
                this.wind.x=ww*this.px;
            }

            if(this.py>=0.99){
                let hh=(h/s)-32;
                this.wind.y=hh*this.py;
            }
        }

        this.save=function(){
            this.ls.object["sls_px"]=this.px;
            this.ls.object["sls_py"]=this.py;
            this.ls.object["sls_width"]=this.par.width;
            this.ls.object["sls_height"]=this.par.height;
            this.ls.object["sls_minimize"]=this.par.minimize;  
            this.ls.object["sls_index"]=this.par.index;          
            this.ls.save()
        }

        this.otSave=function(){
            this.par.minimize=this.ls.object["sls_minimize"]
            if(w){
                if(this.ls.object["sls_width"])this.par.width=this.ls.object["sls_width"]
                if(this.ls.object["sls_height"])this.par.height=this.ls.object["sls_height"]  

                this.px=this.ls.object["sls_px"]
                this.py=this.ls.object["sls_py"]
                if(this.par._dragBool==false){
                    this.px=1;
                    this.py=0;
                }

                let ww=(w/s)-this.wind.button.width;
                this.wind.x=ww*this.px;
                let hh=(h/s)-this.wind.height;
                if(this.wind.minimize)hh=(h/s)-this.wind.button.height;
                if(this.wind.minimize){
                    this.wind.button.width=32;  
                }
                this.wind.y=hh*this.py;  
                
                if(this.ls.object["sls_index"]!=undefined){
                    setTimeout(function() {
                        
                        self.par.index=self.ls.object["sls_index"] 
                    }, 1);                 
                }                 
            }            
        }

        setTimeout(function() {
         
            if(self.ls.object["sls_px"]!=undefined){
                self.otSave()
            }

        }, 0);
       
        var w, h, s;
        this.sizeWindow = function(_w, _h, _s) {
            if (_w) {
                w = _w;
                h = _h;
                s = _s;
            } 
            this.otSave()
            
        }
    }
}


export class PObject {
    constructor(par) {
        this.type = "PObject";
        var self = this;
        this.par = par;
        this.param=this.par.param

        var scale=0.75;
        this.object
        this.dCont=new DCont(this.par.wind.content)
        this.panel=new DPanel(this.dCont,this.param.otstup,this.param.otstup);

        this.panel.width=this.param.sizeBase2

        this.dClip=new DClip(this.panel,11,0,function(){
            self.par.ls.object["PObject_value"]=this.value
            self.par.ls.save()
        });       
        this.dClip.x=this.param.otstup;
        this.dClip.y=this.param.otstup;
        this.dClip.width=this.panel.width
        this.dClip.sbv=1;
        

        this.dC=new DCont(this.dClip.content);
        this.dC.scale=scale;


        var pObject=new DParamObject(this.dC,2,2,function(s){           
            //trace(dButtons.width, dButtons.height)
        },1);
        pObject.width=(this.param.sizeBase2-this.param.otstup*2)/scale;

        pObject.startUp()

        this.addObject=function(obj){
            this.object=obj;
            pObject.addObject(obj)           
            this.dClip.heightContent=pObject.height*scale;

            
        }
        this.addObject(this.dClip)
        
        var w, h, s;
        this.sizeWindow = function(_w, _h, _s) {
            if (_w) {
                w = _w;
                h = _h;
                s = _s;
            }
            this.panel.height=h-this.param.otstup;
            this.dClip.height=this.panel.height-this.param.otstup;
        }


        if(self.par.ls.object["PObject_value"]!=undefined){            
            self.dClip.value=self.par.ls.object["PObject_value"]
        }

    }
}




export class SSSS {
    constructor(par) {
        this.type = "SSSS";
        var self = this;
        this.par = par;
        this._boolStatus=false

        this.dcS=new DCont()
        this.par.wind.add(this.dcS,0)
        this.par.wind.add(this.par.wind.buttonMin)
        
        var sb=false
        var stats
        this.init=function(){
            if(stats!=undefined)return
            this.dcS1=new DCont()    
            //new DPanel(this.dcS)
            this.dcS.div.style.clip = "rect(1px "+30+"px "+30+"px 1px)";

            stats=new Stats() 
            stats.setMode(0)
            stats.domElement.style.position = 'fixed';
            this.dcS1.div.appendChild(stats.domElement);
            stats.domElement.style.top = '-10px';
            stats.domElement.style.left = '-2px';
             
            setTimeout(function() {
                sb=true;
            }, 1000);

        }

       
        trace("@@",this._boolStatus)


        this.update=function(){
            if(this._boolStatus==false)return
            
            stats.update();
            if(!sb){
                stats.domElement.style.top = '-10px';
                stats.domElement.style.left = '-28px'; 
            }
        }

        this.boolStatus = this.par.boolStatus
    }

    set boolStatus(value) {
        if(this._boolStatus!=value){
            trace("@@@@@@@@@@@@@@@@@@",value)
            this._boolStatus = value;            
            if(this._boolStatus==true){
                this.init()
                this.dcS.add(this.dcS1)

            }else{
                this.dcS.remove(this.dcS1)
            }
        }       
    }   
    get boolStatus() { return  this._boolStatus;}  
}



export class Param  {
///Основные параметры прилдожения мигрируют, не писать сюда ничего!!!!!!
    constructor() {         
        this.type="Param";      
        this.param={}  

        this.param.color="#008cba";
        this.param.colorFont="#ffffff";
        this.param.color1="#999999";
        this.param.colorActive="#f28044";

        this.param.otstup=5//2;
        this.param.otMy=10;

        this.param.wh=40;
        this.param.wh2=32;
        this.param.wb=150;
        this.param.sizeBase=292;
        this.param.sizeBase2=150;
        
        this.param.mobile=false
        this.param.whb=32;
        this.param.whCr=840;

        
        

        this.param.fontSize=16;
        this.param.fontSize1=24;
        this.param.fontSizeLittel=10;
   
        this.param.debug=false

        
        this.param.bRadius=24;


        this.param.whPic=256;
        this.param.kolVolid=10;


        this.param.fontFamily="Montserrat"
        this.param.maxW=350
        this.param.maxH=350

        this.param.borderRadius = 0;
        this.param.glowColor="#979797"
        this.param.glowSah=0




        this.param.host = "https://xz.ru/";
        this.param.server=this.param.host+"api/v1/";
        this.param.serverNa = this.param.host + "www/";

        this.param.nameLS="___credentials2"        

        this.param.version_reliz=1;
        this.param.version_dev=8;
        this.param.versi="v "+this.param.version_reliz+".0"+this.param.version_dev;
        
        this.param.token=null;
        
        this.param.objects3d=undefined;
        this.param.materials=undefined;
        this.param.textures=undefined;
        this.param.objectBase=undefined;
        this.param.scenes3d=undefined;


        this.param.arrayName=[
            "objects3d",
            "materials",
            "textures",
            "scenes3d",
            "materials_sorts",
            "objects3d_sorts",
            /*"group","group1","group2","group3","langs","auth/users"*/
        ]; 

        

        this.param.parentId=0;
        this.param.simMani="₽"
        this.param.objectBase={}


       

        this.param.langs = ['ru','en'];           
    }
}



export function LocalStorage(fun,_key) {
    this.fun = fun;
    var self = this;
    this.object;
    this.key = _key||'shirt';
    this.object; // тут храняться все данные с localStorage
    var b;
    // инициализация localStorage
    this.initLoad=function() {
        b=true;
        this.object = window.localStorage[this.key];
        if(this.object == "undefined")b=false;
        if(this.object == undefined)b=false;
        
        // проверка пуст ли  localStorage
        if(b == false) {
            this.object = this.getStartObj(); // если localStorage пуст, записываем обьект с функции getStartObj
        }else {
            this.object = JSON.parse(this.object); // если localStorage не пуст записываем содержимое предварительно
        }   
        if(this.fun)self.fun();
    }
    
    // если localStorage пуст, записываем обьект
    this.getStartObj = function() {
        /*var obj = {
            activ:false,
            dubag:false,
            menu:{},
            xz:{}
        };*/
        return {}//obj;
    }

    // сохраняем в localStorage данные
    this.save = function() {        
        window.localStorage[this.key] = JSON.stringify(self.object);
    }

    // сохраняем в localStorage данные
    this.clear = function() {
        window.localStorage[this.key] = undefined;
    }
    self.initLoad();
    
        
}







