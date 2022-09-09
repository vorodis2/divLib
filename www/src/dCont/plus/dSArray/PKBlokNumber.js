
import { PKBlok } from './PKBlok.js';
import { DSliderMM } from './DSliderMM.js';

/*
     класс отвечающи за колонку Number
*/

export class PKBlokNumber extends PKBlok {
    constructor(par, fun) {  
        super(par, fun);        
        var self=this   
        this.type="PKBlokNumber";
        this.min=999999999;
        this.max=-999999999;
        //this.okrug=1;
        this.boolInt=true
        this.key="number"


        this.initComp=function(){
            if(this.comp!=undefined)return
            this.comp=new DSliderMM(this.panel, this._otstup*2, this._otstup*2+dcmParam.fontSize-10,function(){
                
                /*if(this.value==""){
                    self.active1=false;
                }else{
                    self.active1=true;
                }
                self.fun("drag")*/
                if(this.value==this.min && this.value1==this.max){
                    self.active1=false;
                    
                }else{
                    self.active1=true;

                }
                
                self.fun("drag")

            }); 
            this.comp.width= this.panel1.width- this._otstup*2;
            this.comp.height=this._wh+this.comp.label1.fontSize;
            //this.comp.timeFun=1;

        } 

        this.finalArr=function(){}


        this.postClear=function(){
            this.min=999999999;
            this.max=-999999999; 
            this.okrug=1;
        }

        this.setObjArr=function(obj, arr){
            if(this.obj.key==null){//одномерный массив
                let p=null;
                if(typeof obj =="number" ) p=obj
                this.okrugObjArr(p)
                arr.push(p)
                
            }else{
                let pp=this.getOA(obj, this.obj.key, 0)                
                if(pp==undefined || pp==null){
                    arr.push(null)
                }else{
                    let p=null;
                    if(typeof pp =="number" ) p=pp                    
                    this.okrugObjArr(p)                     
                    arr.push(p)
                }
            }           
        }

        this.okrugObjArr=function(p){
            if(p==null)return
            if(this.min>p)this.min=p;
            if(this.max<p)this.max=p;
            if(this.comp.okrug==1){
                if(p!=Math.round(p)){
                    this.comp.okrug=100
                }
            }
            this.comp.setMM(this.min,this.max)
        }

        this.funActiv1=function(){
            if(this._active1==false){
                this.comp.text=''
            }
        }

        this.getStat=function(p){
            if(this._active1==false)return -1;
            if(p==null)return -1;
            
            if(p>=this.comp.value && p<=this.comp.value1){
                
                return 1;
            }
            //if(p.indexOf(this.comp.value)!=-1)return 1;

            return 0;
        }

        var aaa,bbb
        this.sort=function(a,b){
            aaa=a.aPram[self.idArr]
            bbb=b.aPram[self.idArr]
            trace(aaa,bbb )
            if(aaa==null && bbb==null)return 0; 
            if(aaa==null)return 1; 
            if(bbb==null)return -1;

           
            // a должно быть равным b
            return aaa - bbb; 
        }

        //----nik
        this.postDrawWComp=function(){
            this.comp.width= this.panel1.width- this._otstup*2;
        }

        this.postDrawOtstup=function(){
            this.comp.width= this.panel1.width- this._otstup*2;
            this.comp.x=this._otstup*2;
            // this.comp.y=this._otstup*2+dcmParam.fontSize
            this.comp.y=this._otstup*2+dcmParam.fontSize-10
        }

        this.postDrawWh=function(){
            this.comp.height=this._wh+this.comp.label1.fontSize;
        }
    }
}


