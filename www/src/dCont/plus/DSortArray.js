
/*
окно поверх с инпутами
*/

import { SwitchPage } from './dSArray/SwitchPage.js';
import { DSArray } from './dSArray/DSArray.js';

export class DSortArray {
    constructor(par, fun) {          
        var self=this   
        this.type="DSortArray";
        this.fun=fun;
        this.par=par;
        if(par && par.dCont){
            this.dC=par.dCont;
        }


        this._width=100;
        this._height=100;
       

        this._active=false;
        this.otstup=2//2;
        this.dCont=undefined

        this.init=function(){
            if(this.dCont!==undefined)return;
            this.dCont=new DCont();
            trace("sdfsfdsfsd")
            this.panel = new DPanel(this.dCont, 0, 0);

            new DPanel(this.dCont, 0, 0);
            this.panel.alpha = 0.5;
            this.window=new DWindow(this.dCont,0,0,"Сортировка массива");
            this.window.dragBool=false;
            this.window.hasMinimizeButton=false;
            this.button=new DButton(this.window,2,2,"X",function(){
                self.active=false
            })
            this.button.width=this.button.height=28

            this.dSArray=new DSArray(this,function(s,p){
                if(self.funDin)self.funDin("ok",p)
                self.active=false;
            })
            this.dSArray.boolPlus=true
            this.window.content.add(this.dSArray.dCont)
            
        }

        this.arrayStart=null
        this.array=[]
        this.funDin=undefined
        this.setArray=function(arr, fun, ap){
            this.active=true;
            this.funDin=fun
            if(!arr){                
                this.active=false;
                return
            }
            if(arr.length==0){                
                this.active=false;
                return
            }
            this.dSArray.setArray(arr,ap)
            
            
            
            this.sizeWindow()
        }


        this.hhh
        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w!=undefined){
                w=_w
                h=_h
                s=_s
            } 
            this.hhh=h / s
            if(w && this._active){

                this.panel.width = w / s;
                this.panel.height = h / s;
                this.window.width = this.dSArray.width;
                this.window.height = this.otstup+this.dSArray.height+32;

                this.window.x = (w / s - this.window.width) / 2;
                this.window.y = (h / s - this.window.height) / 2;


                this.button.x=this.window.width-30
            }            
        }
    }


    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.init();
            trace(this._active)
            if(!this.dC) return

            if(this._active==true){
                this.dC.add(this.dCont)
            } else{
                this.dC.remove(this.dCont)
            }           
        }
    }    
    get active() { return  this._active;}
}

