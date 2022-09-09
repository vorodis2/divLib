
import { PKBlok } from './PKBlok.js';

/*
     класс отвечающи за колонку Image
*/

export class PKBlokImage extends PKBlok {
    constructor(par, fun) {  
        super(par, fun);        
        var self=this   
        this.type="PKBlokImage";
        this.key="image"

        
        this.initComp=function(){
            if(this.comp!=undefined)return
            this.comp =new DInput(this.panel, this._otstup*2, this._otstup*2+dcmParam.fontSize,"",function(){
                
                if(this.value==""){
                    self.active1=false;
                }else{
                    self.active1=true;
                }
                self.fun("drag")
            }); 
            this.comp.width= this.panel1.width- this._otstup*2;
            this.comp.height=this._wh;
            this.comp.timeFun=1;
        }

        this.isPic=function(p){
            if(p==null)return p
            if (p.includes('.png') == true || p.includes('.svg') == true|| p.includes('.jpeg') == true || p.includes('.jpg') == true || p.includes('.JPEG') == true|| p.includes('.JPG') == true|| p.includes('.SVG') == true|| p.includes('.PNG') == true) {
                return p;       
            }
            return null;  
        }

        this.setObjArr=function(obj, arr){
            let p=null;
            if(this.obj.key==null){          
                if(typeof obj =="string" ) p=obj
                    arr.push(this.isPic(p))                   
            }else{
                let pp=this.getOA(obj, this.obj.key, 0)                
                if(pp==undefined || pp==null){
                    arr.push(null)
                }else{
                    if(typeof pp =="string" ) p=pp
                       if (typeof p == "object") {
                           arr.push(this.isPic(p))
                       } 
                    
                }
            }
        }

        this.funActiv1=function(){
            if(this._active1==false){
                this.comp.text=''
            }
        }

        this.getStat=function(p){
            if(this._active1==false)return -1;
            if(p==null)return -1;
            if(p.indexOf(this.comp.value)!=-1)return 1;
            return 0;
        }
        var aaa,bbb
        this.sort=function(a,b){
            aaa=a.aPram[self.idArr]
            bbb=b.aPram[self.idArr]

            if(aaa==null && bbb==null)return 0; 
            if(aaa==null)return 1; 
            if(bbb==null)return -1;

            if (aaa > bbb) {
             return 1;
            }
            if (aaa < bbb) {
             return -1;
            }
            // a должно быть равным b
            return 0; 
        }

        this.postDrawWComp=function(){
            this.comp.width= this.panel1.width- this._otstup*2;
        }

        this.postDrawOtstup=function(){
            this.comp.width= this.panel1.width- this._otstup*2;
            this.comp.x=this._otstup*2;
            this.comp.y=this._otstup*2+dcmParam.fontSize;
        }

        this.postDrawWh=function(){

            this.comp.height=this._wh; 

        }
    }
}