
import { PKBlok } from './PKBlok.js';


/*
     класс отвечающи за колонку Boolean
*/

export class PKBlokBoolean extends PKBlok {
    constructor(par, fun) {  
        super(par, fun);        
        var self=this   
        this.type="PKBlokBoolean";
        this.min=999999999;
        this.max=-999999999;
        this.key="boolean"
        this.bool=null

        
       this.sob=function(){
            self.bool=null
            if(this.index==0){
                self.active1=false;              
            }else{
                self.active1=true;

                if(this.index==1){
                    self.bool=false
                }
                if(this.index==2){
                    self.bool=true
                }
            }
            self.fun("drag")
        }

        this.initComp=function(){
            if(this.comp!=undefined)return
           
            this.comp= new DButtons(this.panel1, 0, 0,3, this.sob)
            this.comp.wh=24
            this.comp.tip=3

            this.comp.array[1].text="0"
            this.comp.array[2].text="1"

            this.reDraw()

        } 

        this.reDraw=function(){
            this.comp.x=this._otstup*2
            this.comp.y=this._otstup*2+dcmParam.fontSize;
            //this.comp.width=this.panel1.width - this._otstup*4

            let ww=this.panel1.width/3- this._otstup
            
            for (var i = 0; i < this.comp.array.length; i++) {
                this.comp.array[i].width=ww
            }
            this.comp.dragTip()
            //this.comp.height=this._wh+this.comp.label1.fontSize;
            //this.comp.otstup=this._otstup
            
            
        }

        this.postDrawWComp=function(){
            this.reDraw()
            
        }

        this.postDrawOtstup=function(){
            this.reDraw()

        }

        this.postDrawWh=function(){
            this.reDraw()
        }

        this.setObjArr=function(obj, arr){

            let p=null;
            if(this.obj.key==null){//одномерный массив
                
                if(typeof obj =="boolean" ) p=obj
               
                arr.push(p)
            }else{
                let pp=this.getOA(obj, this.obj.key, 0)                
                if(pp==undefined || pp==null){
                    arr.push(null)
                }else{
                    if(typeof pp =="boolean" ) p=pp
                    arr.push(pp)
                }
            }
           /* for (var i = 0; i < this.array.length; i++) {
                this.array[i].setObjArr(obj, arr)
            }*/
        }

        this.funActiv1=function(){
            if(this._active1==false){
                this.comp.text=''
            }
        }

        this.getStat=function(p){
            if(this._active1==false)return -1;
            if(p==null)return -1;
            
            if(p==this.bool)return 1;
            //if(p.indexOf(this.comp.value)!=-1)return 1;

            return 0;
        }

        var aaa,bbb;
        this.sort=function(a,b){
            aaa=a.aPram[self.idArr]
            bbb=b.aPram[self.idArr]

            if(aaa==null && bbb==null)return 0; 
            if(aaa==null)return 1; 
            if(bbb==null)return -1;


            if(aaa==true && bbb==false)return -1;
            if(aaa==false && bbb==true)return 1;
          /*  if(aaa==null && bbb==null)return 0; 
            if(aaa==null)return 1; 
            if(bbb==null)return -1;*/

           
            // a должно быть равным b
            return aaa > bbb; 
        }
    }
}



