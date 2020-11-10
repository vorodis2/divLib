var Stats=function(){var n=Date.now(),p=n,g=0,q=Infinity,r=0,h=0,t=Infinity,u=0,v=0,w=0,f=document.createElement("div");window.onload=function(){document.getElementById("stats").style.top=document.documentElement.clientHeight-100+"px"};f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();x(++w%2)},!1);f.style.cssText="position:fixed; width:65px; height: 40px;border-width: 3px 3px 1px 1px;border-style: solid;border-color: rgb(255, 255, 255);border-image: initial; opacity:0.9;cursor:pointer";
var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var k=document.createElement("div");k.id="fpsText";k.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";k.innerHTML="FPS";a.appendChild(k);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:54px;height:27px;background-color:#0ff";for(a.appendChild(c);54>c.children.length;){var l=
document.createElement("span");l.style.cssText="display:block; width:1px;height:22px;float:left;background-color:#113";c.appendChild(l)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var m=document.createElement("div");m.id="msText";m.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";m.innerHTML="MS";d.appendChild(m);var e=document.createElement("div");
e.id="msGraph";e.style.cssText="position:relative;width:57px;height:27px;background-color:#0f0";for(d.appendChild(e);57>e.children.length;)l=document.createElement("span"),l.style.cssText="display:block;width:1px;height:22px;float:left;background-color:#131",e.appendChild(l);var x=function(b){w=b;switch(w){case 0:a.style.display="block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:x,begin:function(){n=Date.now()},end:function(){var b=
Date.now();g=b-n;q=Math.min(q,g);r=Math.max(r,g);m.textContent=g+" MS ("+q+"-"+r+")";var a=Math.min(25,25-g/200*25);e.appendChild(e.firstChild).style.height=a+"px";v++;b>p+1E3&&(h=Math.round(1E3*v/(b-p)),t=Math.min(t,h),u=Math.max(u,h),k.textContent=h+" FPS ("+t+"-"+u+")",a=Math.min(25,25-h/100*25),c.appendChild(c.firstChild).style.height=a+"px",p=b,v=0);return b},update:function(){n=this.end()}}};



import { DCont } from '../DCont.js';

import { DCreatIcon } from './DCreatIcon.js';
export class DCompDev extends DCont{
    constructor(dCont, _x, _y, _text, _fun) {
        super();
        var self=this
        this.type="DCompDev"
        this._active=true
        this.visible=this._active
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;
        this.text="DevWindow"
        // this.text=_text||"DCompDev";
        this.fun=_fun;
        this.array=[]
        this._index=-1

       //npm run build
        this.wind=new DWindow(this,50,50,this.text);
        this.wind.width=516
        this.wind.height=356.5


        this.array[0]=new DXBasa0(this,0,"Icon")
        this.array[1]=new DXBasa1(this,1,"FTP")

        this.index=0;


        this.button=new DButton(this.wind, this.wind.width-30, +2, 'X',function(){
            self.active=false
            if(self.fun)self.fun("active",false)
        })
        this.button.width=this.button.height=28
    }

    set index(value) {
        if(this._index!=value){
            this._index = value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active=value==i ? true : false
            }
        }       
    }   
    get index() { return  this._index;}

    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.visible=this._active
            this.wind.x=0;
            this.wind.y=0;
          
        }       
    }   
    get active() { return  this._active;} 
}




export class DXBasa {
    constructor(par, idArr, _text, fun) {
        //this.dCont=new DCont();
        this._active = false
        
        var self=this
        this.idArr=idArr;
        trace(par,"   ",par.wind)

        this.button=new DButton(par.wind.content, 2+idArr*102,2,_text,function(){
            par.index=self.idArr
        })

        this.panel=new DPanel(par.wind.content, 0, 34);
        this.panel.width=150+Math.random()*200
        this.panel.visible=this._active

        this.panel.width=516
        this.panel.height=356.5
    }

    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.panel.visible=this._active
            this.button.alpha=value?0.5:1
        }       
    }   
    get active() { return  this._active;} 
}


export class DXBasa0 extends DXBasa{
    constructor(par, idArr, _text, fun) {
        super(par, idArr, _text, fun);      
        var a = new DCreatIcon(this.panel, 0, 0,null,function(s,p) {})

        // par.wind.width=this.panel.width=a.fullW
        // par.wind.height=this.panel.height=a.fullH

    }   
}


export class DXBasa1 extends DXBasa{
    constructor(par, idArr, _text, fun) {
        super(par, idArr, _text, fun);
        
        var stats=new Stats()

        if (stats)stats.update();        
        stats.setMode(0)
        stats.domElement.style.position = 'fixed';
        stats.domElement.style.top = '5px';
        stats.domElement.style.left = '5px';
        var a = stats.domElement.style.width+50
        var stats1=new Stats()

        if (stats1)stats1.update();  
        stats1.setMode(1)
        stats1.domElement.style.position = 'fixed';
        stats1.domElement.style.top = '5px';
        stats1.domElement.style.left =  '70px';


        this.panel.div.appendChild(stats.domElement);
        this.panel.div.appendChild(stats1.domElement);  

        function animate() {            
            requestAnimationFrame( animate );
            if(self._active ==false)return
            stats.update();
        }
        animate()    

    }

   
}


