
import { PKBlokString } from './PKBlokString.js';
import { PKBlokNumber } from './PKBlokNumber.js';
import { PKBlokBoolean } from './PKBlokBoolean.js';
import { PKBlokImage } from './PKBlokImage.js';

/*
     класс хранящий масивы PKBS,PKBN,PKBB,PKBI
*/


export class PKey{
    constructor(par, fun) {          
        var self=this   
        this.type="PKey";
        this.fun=fun;
        this.par=par;
        this._otstup=this.par._otstup;
        this._wh=this.par._wh;
        this.dCont=new DCont(this.par.dCont);
        this._x=0;
        this._y=0;
        this._wComp=this.par._wComp;
        this._height=this.par.hGal;      
        this.width=0
        this.array=[];
        this.arrC=[];
        this._index=-1;
        this._visible=true
        var  aaa=[]

        this.setObjArr=function(obj, arr){            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].setObjArr(obj, arr)                
            }
        }

        this.getStatus=function(obj){
            obj.aStat.length=0;
            let bb1=true;
            for (var i = 0; i < this.array.length; i++) {
                obj.aStat[i]=this.array[i].getStat(obj.aPram[i])
                if(this.array[i].active1)bb1=false
            }
            let bb=-1 
            aaa.length=0
                     
            for (var i = obj.aStat.length - 1; i >= 0; i--) {
                if(obj.aStat[i]!==-1){
                    aaa.push(obj.aStat[i])
                   
                }
                if(obj.aStat[i]==0)bb=0    
            }

           
            if(aaa.length!=0){
                bb1=false;
                bb=1;
                for (var i = 0; i < aaa.length; i++) {
                    if(aaa[i]==0){
                        bb=0
                        break
                    }
                }
                
                if(bb==1)bb1=true;
                                  
            }
            obj.bool= bb1

        }

        this.finalArr=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].finalArr()
            }
        }

        this.arrParam=undefined
        this.setArr=function(arr){
            this.arrParam=arr;    
            this.clear();
            for (var i = 0; i < arr.length; i++) {
                this.get(arr[i])
            }
            this.width=0
            let b=false
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].dCont.x=this.width
                this.width+=this.array[i].width;
                this.array[i].setBoolColor(b)
                b=!b
            }            
        }


        this.get=function(o){
            
            for (var i = 0; i < this.arrC.length; i++) {
                
                if(this.arrC[i].active==false){
                    if(this.arrC[i].key==o.type){                       
                        this.arrC[i].setObj(o);
                        this.arrC[i].idArr=this.array.length
                        this.array.push(this.arrC[i])
                        return;
                    }
                }
            }
            let bl=null;

            if(o.type=="string"){
                bl=new PKBlokString(this,function(s,p){
                    if(s=="drag"){
                        self.fun(s,p)                       
                    }
                    if(s=="index"){
                        self.index=p
                        self.fun("drag")                       
                    }
                });
            }

            if(o.type=="number"){
                bl=new PKBlokNumber(this,function(s,p){
                    if(s=="drag"){
                        self.fun(s,p)                       
                    }
                    if(s=="index"){
                        self.index=p
                        self.fun("drag")                       
                    }
                });

            }

            if(o.type=="boolean"){
                bl=new PKBlokBoolean(this,function(s,p){
                    if(s=="drag"){
                        self.fun(s,p)                       
                    }
                    if(s=="index"){
                        self.index=p
                        self.fun("drag")                       
                    }
                });
                

            }

            //---------------------------------

            if(o.type=="image"){
                bl=new PKBlokImage(this,function(s,p){
                    if(s=="drag"){
                        self.fun(s,p)                       
                    }
                    if(s=="index"){
                        self.index=p
                        self.fun("drag")                       
                    }
                });
                

            }

            //---------------------------------
            bl.idArr=  this.arrC.length    
            this.arrC.push(bl)
            
            bl.visible= this._visible      
            bl.setObj(o);
            bl.idArr=this.array.length
            this.array.push(bl)
            

            return bl;
        }


        this.clear=function(){
            this.array.length=0
            
            for (var i = 0; i < this.arrC.length; i++) {
                this.arrC[i].clear();
            }

        }


        this.setWidth=function(w){            
            let ww=0;
            let kk=0
            let kk1=0
            for (var i = 0; i < this.array.length; i++) {                
                if(this.array[i].obj.width!=undefined){
                    ww+=this.array[i].obj.width
                    kk++;
                }else{
                    kk1++
                }
            }
            let wer=(w-ww)//(this.array.length-kk);
            
            let wgh=wer/kk1;

            let xx=0
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].obj.width!=undefined){
                    this.array[i].wComp=this.array[i].obj.width
                }else{
                    this.array[i].wComp=wgh
                }
                this.array[i].dCont.x=xx; 
                xx+=this.array[i].wComp
            }
        }


        //------Nik
        this.redrawWComp=function(){
            /*for (var i = 0; i < this.arrC.length; i++) {
                    this.arrC[i].wComp=this._wComp
            }
           
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].dCont.x=i*this._wComp;               
               
            }

            this.width=0
            for (var i = 0; i < this.array.length; i++) {               
                this.width+=this._wComp;
            }*/
            
        }
        //----------

    }

    set x(value) {
        if(this._heiaght!=value){
            this._x = value;        
            this.dCont.x =this._x;        
        }
    }    
    get x() { return  this._x;}


    set y(value) {
        if(this._heiaght!=value){
            this._y = value;        
            this.dCont.y =this._y;        
        }
    }    
    get y() { return  this._y;}


    set height(value) {
        if(this._heiaght!=value){
            let minH=dcmParam.fontSize+this._otstup*5 + this._wh
            if(value<minH)value=minH
            this._height = value; 
 
            for (var i = 0; i < this.arrC.length; i++) {
                this.arrC[i].panel.height=this._height
            }          
        }
    }    
    get height() { return  this._height;}


    set index(value) {
        if(this._index!=value){
            this._index = value;                  
            for (var i = 0; i < this.array.length; i++) {
                if(this._index==i){
                    this.array[i].bIndex=true
                }else{
                    this.array[i].bIndex=false
                }
            }          
        }
    }    
    get index() { return  this._index;}


    //ширина компонента    
    set wComp(value) {
        if (this._wComp != value) {
            this._wComp = value; 
            this.redrawWComp()
        }
    }
    get wComp() {
        return this._wComp;
    }


    //отступы
    set otstup(value) {
        if(this._otstup!=value){
            this._otstup = value;        
            for (var i = 0; i < this.arrC.length; i++) {
                this.arrC[i].otstup=this._otstup
            }

        }
    }    
    get otstup() { return  this._otstup;}

    set visible(value) {
        if(this._visible!=value){
            this._visible = value;  

            for (var i = 0; i < this.arrC.length; i++) {
                this.arrC[i].visible=this._visible
            }
        }
    }    
    get visible() { return  this._visible;}


    set wh(value) {
        if(this._wh!=value){
            this._wh = value;        
            for (var i = 0; i < this.arrC.length; i++) {
                this.arrC[i].wh=this._wh
            }
        }
    }    
    get wh() { return  this._wh;}

}
