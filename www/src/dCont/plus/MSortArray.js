
/*
окно поверх с инпутами
*/

import { SwitchPage } from './SwitchPage.js';

export class MSortArray {
    constructor(par, fun) {          
        var self=this   
        this.type="MSortArray";
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

            this.panel = new DPanel(this.dCont, 0, 0);
            this.panel.alpha = 0.5;
            this.window=new DWindow(this.dCont,0,0,"Сортировка массива");
            this.window.dragBool=false;
            this.window.hasMinimizeButton=false;
            this.button=new DButton(this.window,2,2,"X",function(){
                self.active=false
            })
            this.button.width=this.button.height=28

            this.mSArray=new MSArray(this,function(s,p){
                if(self.funDin)self.funDin("ok",p)
                self.active=false;
            })

            this.window.content.add(this.mSArray.dCont)
            
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
            this.mSArray.setArray(arr,ap)
            
            
            
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
                this.window.width = this.mSArray.width;
                this.window.height = this.otstup+this.mSArray.height+32;

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


export class MSArray  {
    constructor(par, fun) {          
        var self=this   
        this.type="MSArray";
        this.fun=fun;



        this.dCont=new DCont();
        this.otstup=2;
        this.par=par;
        this.hhh=555

        if(this.par){
            this.otstup=this.par.otstup;
            this.par=par;
            this.hhh=this.par.hhh
        }
        

        this.width=200;
        this.height=200;
       
        this.kol=17
        this.wh=32;
        this.hGal=this.kol*(24)+(this.wh+this.otstup*2)+this.otstup*4;


        this.arrParam=[
           {key:null, type:"string",name:"string"},
           {key:null, type:"number",name:"number"}, 
           {key:null, type:"boolean",name:"boolean"}, 
        ]
        
        this.arrayStart=null
        this.array=[];

        
        this.wComp=150;

        this.init=function(){

            new DPanel(this.dCont)

            this.panel=new DPanel(this.dCont,this.otstup,this.otstup);
            this.panel.height=this.wh+this.otstup*2;
            this.chek=new DCheckBox(this.panel,this.otstup,this.otstup+8,"Все",function(){
                for (var i = 0; i < self.array.length; i++) {
                    self.array[i].bool=this.value;
                }
                for (var i = 0; i < self.gallery.array.length; i++) {
                    self.gallery.array[i].dragObj()
                }
                
            })
            this.button=new DButton(this.panel,this.otstup+55,this.otstup,"Перевернуть",function(){
                for (var i = 0; i < self.array.length; i++) {

                    self.array[i].bool=!self.array[i].bool;
                }
                for (var i = 0; i < self.gallery.array.length; i++) {
                    self.gallery.array[i].dragObj()
                }
            })

            this.button1=new DButton(this.dCont,this.otstup,this.otstup,"Вернуть обрезаный массив",function(){
                self.getFun()
            })

            this.pKey=new PKey(this,this.otstup*3+24,this.panel.height+this.otstup*2,function(s,p){
                if(s=="drag"){
                    self.korekt()                      
                }
            });

            this.gallery=new GalleryXZ(this.dCont,this.otstup,this.panel.height+this.otstup*6+dcmParam.fontSize+24,function(s,p){

            },this)
            this.gallery.kolII=1;
            //this.gallery.widthPic=75+2;
            this.gallery.heightPic=24;
            //this.gallery.width=this.otstup*2+77;
            //this.gallery.height=this.otstup+(77+this.otstup)*this.arrayBD.length;
            this.gallery.otstup=0;
            this.gallery.panel.visible=false;

           
            


            this.switchPage=new SwitchPage(this.dCont, 0,function(s){ 
                if(s=="sobKol"){                    
                    self.dragSP();
                }
                if(this!=undefined && this.width!=undefined){
                    self.switchPage.x=(self.width-this.width)/2                    
                }
            })
            this.switchPage.whStart=24;
            this.switchPage.wh=24;
        }  

        this.getFun=function(){  
            let a=[]
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].bool==true)a.push(this.array[i].obj);

            }
            fun("get",a)
        }

        /////////////////////////////////korekt/////////////////////////////////////
        this.korekt=function(){            
            let a=[]
            if(this.pKey.index==-1){
                for (var i = 0; i < this.array.length; i++) {
                    a[this.array[i].idArr]=this.array[i]
                }
                this.array=a;
            }else{
                this.array.sort(this.pKey.array[this.pKey.index].sort)
            } 

            for (var i = 0; i < this.array.length; i++) {
                this.pKey.getStatus(this.array[i])
            }


            this.dragSP();
        }



        /////////////////////////////////////////////////////

        this.arrLitel=[] 

        this.dragSP=function(){            
            let s=self.switchPage.index*this.kol;
            let f=(self.switchPage.index+1)*this.kol;
            if(f>this.array.length)f=this.array.length;

            this.arrLitel.length=0;
            for (var i = s; i < f; i++) {
                this.arrLitel.push(this.array[i])
            }

            this.gallery.width=this.pKey.x+this.pKey.width-this.otstup*2;
            this.gallery.widthPic= this.gallery.width;

            this.gallery.height=this.gallery.heightPic*this.kol
            this.gallery.start(this.arrLitel)
        }    



        var sah;
        this.setArray=function(arr, ap){
            if(ap!=undefined){
                this.pKey.setArr(ap);
            }else{
                this.pKey.setArr(this.arrParam);
            }

           // if(this.pKey.arrParam==undefined)this.pKey.setArr(this.arrParam);
            


            let hh=Math.round((this.hhh-300)/24)           
            this.kol=hh
            if(this.kol<5)this.kol=5
            this.gallery.height=this.gallery.heightPic*this.kol
            this.hGal=this.kol*(24)+(this.wh+this.otstup*2)+this.otstup*4;
            this.pKey.height=this.hGal
            
            this.active=true;
            this.chek.value=false;           
            this.arrayStart = arr;
            this.array.length=0;
            
            sah=-1;
            for (var i = 0; i < arr.length; i++) {
                let hron=this.getGron()
                hron.setObject(arr[i])                
            }

            var k=Math.ceil(arr.length/this.kol)
            this.switchPage._index=-1
            this.switchPage.index=0
            this.switchPage.kol=k;

            this.dragSP();            
            this.drag();

            
        }

        this.ach=[]
        this.getGron=function(){
            sah++
            if(this.ach[sah]==undefined)this.ach[sah]=new MSAHron(this)
            this.array[sah]=  this.ach[sah];
            this.array[sah].idArr=sah
            return  this.array[sah];
        }


        this.sortDrag=function(){

        }


        this.drag=function(){
            this.width=0;
            this.height=this.hGal+this.wh*3+this.otstup*6; 

            if(this.switchPage.width+this.otstup*2>this.width)this.width=this.switchPage.width+this.otstup*2
            if(this.width<250)this.width=250

            if(this.pKey.x+this.pKey.width+this.otstup>this.width)this.width=this.pKey.x+this.pKey.width+this.otstup

            this.panel.width=this.width-this.otstup*2
            this.button1.width=this.width-this.otstup*2
            this.button1.y=this.height-this.otstup-32

            this.switchPage.y=this.height-(this.otstup+32)-this.switchPage.wh-this.otstup
            this.switchPage.x=(this.width-this.switchPage.width)/2
        }    

        this.init()
    }
}

export class MSAHron  {
    constructor(par) {          
        var self=this   
        this.type="MSAHron";  
        this.idArr=-1
        this.par=par;
        this.obj = null;
        this.bool = true;
        this.aPram=["xz","xz1"]
        this.aStat=[-1,-1];
        

        this.pKey=this.par.pKey;

        this.setObject = function(obj){
            this.obj=obj;
            this.aPram.length=0;
            this.bool = true;
            this.pKey.setObjArr(this.obj,this.aPram);
            

        }
    }
}





export class PKey{
    constructor(par, x,y,fun) {          
        var self=this   
        this.type="PKey";
        this.fun=fun;
        this.par=par;
        this.dCont=new DCont(this.par.dCont);
        this.dCont.x=x;
        this.dCont.y=y;
        this.x=x;
        this.y=y;
        this.otstup=this.par.otstup;
        this.wComp=this.par.wComp;
        //new DPanel(this.dCont)
        this._height=this.par.hGal;
        this.wh=this.par.wh;       
        this.width=0
        this.array=[];
        this.arrC=[];
        this._index=-1;


        this.setObjArr=function(obj, arr){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].setObjArr(obj, arr)
            }
        }
        var  aaa=[]
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


        this.arrParam=undefined
        this.setArr=function(arr){
            this.arrParam=arr;


            
            
            this.clear();

            for (var i = 0; i < arr.length; i++) {
                this.get(arr[i])
            }
            this.width=0
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].dCont.x=this.width
                this.width+=this.wComp;
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

                bl.idArr=  this.arrC.length    
                this.arrC.push(bl)
                       
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

    }
    set height(value) {
        if(this._height!=value){
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

}

export class PKBlok  {
    constructor(par, fun) {          
        var self=this   
        this.type="PKBlok";
        this.fun=fun;
        this.par=par;
        this.wh=this.par.wh; 
        this.dCont=new DCont();
        this.dC=this.par.dCont
        this.otstup=this.par.otstup
        this._active  = false 
        this._active1  = false
        this._bIndex  = false; 
        this.key="null"

        this.panel=new DPanel(this.dCont)
        this.panel.width=this.par.wComp;
        this.panel.height=this.par.height//par.hGal;


        this.panel1=new DPanel(this.panel,this.otstup,this.otstup)
        this.panel1.width=this.par.wComp-this.otstup*2;
        this.panel1.height=dcmParam.fontSize+this.otstup*3+24;
        this.dLabel=new DLabel(this.panel,0,this.otstup);        
        this.dLabel.width=this.panel.width;
        this.dLabel.textAlign="center";
        this.chek=new DCheckBox(this.panel,this.panel1.width-16,this.otstup," ",function(){
           
            if(this.value==false){
                self.fun("index",-1)
            }else{
                self.fun("index",self.idArr)
            }
        })
        this.chek.height=this.chek.width=16

        this.comp=undefined
        this.initComp=function(){
            if(this.comp!=undefined)return

        }
        this.funActiv1=undefined
        

        /**
         * Ищем значение
         * о обьект в ктором лежит значение
         * а масив ключей обьекта
         * s шаг по массиву ключей
         */
        this.getOA=function(o,a,s){
            if(a[s+1]==undefined){
                return o[a[s]]
            }else{
                if(typeof a[s]=='object'){
                    if(a[s].type=="seek"){                       
                        if(o[a[s].key]==undefined)return null;
                        if(typeof o[a[s].key]!=='object'){
                            return null;
                        }
                        if(o[a[s].key][0]!==undefined){//это массив
                            for (var i = 0; i < o[a[s].key].length; i++) {
                                if(this.isObjArr(o[a[s].key][i],a[s].array)==true){                                    
                                    return this.getOA(o[a[s].key][i], a, s+1)                                    
                                } 
                            }
                        }
                    }
                    return null
                }                
                return this.getOA(o[a[s]], a, s+1)
            }
            return null
        }

        this.isObjArr=function(o,a){           
            for (var i = 0; i < a.length; i+=2) {
                if(o[a[i]]==undefined)return false;
                if(o[a[i]]!=a[i+1])return false;
            }
            return true;
        }


        this.setObjArr=function(obj, arr){
            
            let p=null;
            if(this.obj.key==null){//одномерный массив  
                          
                if(typeof obj =="string" ) p=obj
                arr.push(p)
            }else{
                let pp=this.getOA(obj, this.obj.key, 0)                
                if(pp==undefined || pp==null){
                    arr.push(null)
                }else{
                    if(typeof pp =="string" ) p=pp
                    arr.push(pp)
                }
            }
        }

        this.setObj=function(o){
            this.initComp()
            this.obj=o;
            this.active  = true 
            this.dLabel.text= o.name   
        }
        var aaa,bbb
        this.sort=function(a,b){
            /*aaa=a.aPram[self.idArr]
            bbb=b.aPram[self.idArr]
           
            if (aaa > bbb) {
             return 1;
            }
            if (aaa < bbb) {
             return -1;
            }*/
            // a должно быть равным b
            return 0; 
        }

        this.getStat=function(p){
            return -1;
        }

        this.clear=function(){
            this.min=999999999;
            this.max=-999999999; 
            this.active1=false;
            this.active=false;
            this.bIndex= false
        }
    }

    set bIndex(value) {
        if(this._bIndex!=value){
            this._bIndex = value;        
            this.chek.value=value          
        }
    }    
    get bIndex() { return  this._bIndex;}


    set active(value) {
        if(this._active!=value){
            this._active = value;  
                 
            if(this._active==true){
                this.dC.add(this.dCont);
            } else{
                this.active1=false
                this.dC.remove(this.dCont);
            }           
        }
    }    
    get active() { return  this._active;}
    
    set active1(value) {
        if(this._active1!=value){
            this._active1 = value;

            if(this._active1==true){
                this.panel.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color1), -10);
            } else{
                this.panel.color=dcmParam.color1
            }          
        }
    }    
    get active1() { return  this._active1;}
}




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
            if(this.idArr==0){
                self.active1=false;
                self.comp[0].alpha=1;
                self.comp[1].alpha=0.5;
                self.comp[2].alpha=0.5;               
            }else{
                self.active1=true;

                if(this.idArr==1){
                    self.bool=false
                    self.comp[0].alpha=0.5;
                    self.comp[1].alpha=1;
                    self.comp[2].alpha=0.5;
                }
                if(this.idArr==2){
                    self.bool=true
                    self.comp[0].alpha=0.5;
                    self.comp[1].alpha=0.5;
                    self.comp[2].alpha=1;
                }
            }
            self.fun("drag")
        }

        this.initComp=function(){
            if(this.comp!=undefined)return
            this.comp=[]
            this.comp[0]=new DButton(this.panel, 0, 0, "a", this.sob)
            this.comp[1]=new DButton(this.panel, 0, 0, "0", this.sob)
            this.comp[2]=new DButton(this.panel, 0, 0, "1", this.sob)
            var ww=(this.panel1.width- this.otstup*4)/3
            for (var i = 0; i < this.comp.length; i++) {
                this.comp[i].y=this.otstup*2+dcmParam.fontSize;
                this.comp[i].idArr=i;
                this.comp[i].x=this.otstup*2+i*(ww+this.otstup);
                this.comp[i].width=ww
                this.comp[i].height=24;
            }
            this.comp[0].alpha=1;
            this.comp[1].alpha=0.5;
            this.comp[2].alpha=0.5;

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



export class PKBlokNumber extends PKBlok {
    constructor(par, fun) {  
        super(par, fun);        
        var self=this   
        this.type="PKBlokNumber";
        this.min=999999999;
        this.max=-999999999;
        this.key="number"
        this.initComp=function(){
            if(this.comp!=undefined)return
            this.comp=new DSliderMM(this.panel, this.otstup*2, this.otstup*2+dcmParam.fontSize+10,function(){
                
                /*if(this.value==""){
                    self.active1=false;
                }else{
                    self.active1=true;
                }
                self.fun("drag")*/
                if(this.value==this.min && this.value2==this.max){
                    self.active1=false;
                }else{
                    self.active1=true;
                }

                self.fun("drag")
            }); 
            this.comp.width= this.panel1.width- this.otstup*2;
            //this.comp.height=24;
            //this.comp.timeFun=1;
        } 

        this.setObjArr=function(obj, arr){

            if(this.obj.key==null){//одномерный массив
                let p=null;
                if(typeof obj =="number" ) p=obj
                if(p!=null){
                    if(this.min>p)this.min=p;
                    if(this.max<p)this.max=p;
                    this.comp.setMM(this.min,this.max)

                }
                arr.push(p)
            }else{
                
                let pp=this.getOA(obj, this.obj.key, 0)                
                if(pp==undefined || pp==null){
                    arr.push(null)
                }else{
                    let p=null;
                    if(typeof pp =="number" ) p=pp
                    if(p!=null){
                        if(this.min>p)this.min=p;
                        if(this.max<p)this.max=p;
                        this.comp.setMM(this.min,this.max)

                    }
                    arr.push(p)
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
            
            if(p>=this.comp.value && p<=this.comp.value2){
                
                return 1;
            }
            //if(p.indexOf(this.comp.value)!=-1)return 1;

            return 0;
        }

        var aaa,bbb
        this.sort=function(a,b){
            aaa=a.aPram[self.idArr]
            bbb=b.aPram[self.idArr]

            if(aaa==null && bbb==null)return 0; 
            if(aaa==null)return 1; 
            if(bbb==null)return -1;

           
            // a должно быть равным b
            return aaa > bbb; 
        }
    }
}



export class PKBlokString extends PKBlok {
    constructor(par, fun) {  
        super(par, fun);        
        var self=this   
        this.type="PKBlokString";
        this.key="string"
        this.initComp=function(){
            if(this.comp!=undefined)return
            this.comp =new DInput(this.panel, this.otstup*2, this.otstup*2+dcmParam.fontSize,"",function(){
                
                if(this.value==""){
                    self.active1=false;
                }else{
                    self.active1=true;
                }
                self.fun("drag")
            }); 
            this.comp.width= this.panel1.width- this.otstup*2;
            this.comp.height=24;
            this.comp.timeFun=1;
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
    }
}











//достроеный класс галерий
export class GalleryXZ extends DGallery {
    constructor(dCont, x, y, fun,par) { 
        super(dCont, x, y, fun);         
        this.indexOld=-1;
        this.par=par
        var b=false
        this.createZamen=function(){ 
            var r=new BoxXZ(this.content, 0, 0,null,this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink;

                
            return r
        }
    }
}

//достроеный класс галерий

export function BoxXZ(_cont, _x, _y, _fun, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self = this;
    this.par=par

    this.pKey=this.par.par.pKey
    this.chek=new DCheckBox(this,this.par.par.otstup,0," ",function(){
        self.object.bool=this.value
        if(self.object.bool){
            self.lab.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 144)
        }else{
            self.lab.color=dcmParam.color
        }
    })
    this.lab=new DLabel(this,this.par.par.otstup+3,13,"")
    this.lab.fontSize=8;
    this.lab.color=dcmParam.color//dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 20);
    this.lab.activMouse=false;


    var b,link;
    var bo
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        this.object = _obj;
        this.dragObj()

        let p=this.idArrKesh%2
        this.panel.boolLine=false
        this.panel.alpha=0.5
        if(p==0){ 
            this.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), -10);
            this.color1=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color1), -10);
            
        }
        if(bo)this.mouseOver()
        

        self.funLoad();
        
    }

    this.arrLabel=[];


    this.dragObj=function(){
        if(this.visible==false)return
        for (var i = 0; i < this.arrLabel.length; i++) {
            this.arrLabel[i].visible=false
        }
        this.lab.text=this.object.idArr+"";
        this.chek.value=this.object.bool;
        if(this.object.bool){
            this.lab.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 144)
        }else{
            this.lab.color=dcmParam.color
        }


        for (var i = 0; i < this.object.aPram.length; i++) {
            if(this.arrLabel[i]==undefined){
                this.arrLabel[i]=new DLabel(this,this.par.par.otstup*2+24+i*this.par.par.wComp,0,"")
                this.arrLabel[i].fontSize=dcmParam.fontSizeLitte
                this.arrLabel[i].y=(this.height-this.arrLabel[i].fontSize)/2

                this.arrLabel[i].width=this.par.par.wComp
                this.arrLabel[i].activMouse=false;
                this.arrLabel[i].textAlign="center"
            }

            this.arrLabel[i].visible=true
            this.arrLabel[i].text=this.object.aPram[i];

        }

        
    }

    this.isObj = function (_obj) {
        return true
    }


}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;
Object.defineProperties(BoxXZ.prototype, {
   /* activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            if(this._activ==false)this.panel.color1=this._color1;
            else this.panel.color1=this._color;

            if(this.pPlus){
                if(this._activ==false)this.pPlus.visible=false
                else  this.pPlus.visible=true   
            }

        },
        get: function () {
            return this._activ;
        }
    },*/
})


export class DSliderMM extends DCont {
    constructor(dCont, _x, _y, fun) {
        super();
        this.type = 'DSlider';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        var self = this;
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        this._width = 100;
        this._height = 15;

        this.fun = fun;
        this.funChange = undefined;
        this._borderRadius = 0;
        this._color = dcmParam._color; //"#008CBA";

        this._min = 0;
        this._max = 100;

       
        this._value2 = 100;

        this._otstup = 2;
        this._value = 0; // округление value
        this._okrug = 100; // округление value

        this._value = 0; // округление value

        this.mm = 10000000000000000000000;

        this.pan = new DPanel(this, 0, this._otstup);
        this.pan.width = this._width;
        this.pan.height = this._height - this._otstup * 2;
        this.pan.color1 = dcmParam.compToHexArray(
            dcmParam.hexDec(dcmParam._color1),
            -20
        );
        this.pan.tip = 0;

        



        this.panel = new DPanel(this, 0, 0);
        this.panel.width = this.panel.height = this._height;
        this.panel.color1 = this._color;
        this.panel.div.style.cursor = 'pointer';
        this.panel.tip = 1;
        this.panel.div.xzTip=1

        this.label=new DLabel(this.panel,0,-12,"")
        this.label.activMouse=false;
        this.label.fontSize=10;



        this.panel2 = new DPanel(this, 0, 0);
        this.panel2.width = this.panel2.height = this._height;
        this.panel2.color1 = this._color;
        this.panel2.div.style.cursor = 'pointer';
        this.panel2.tip = 2;
        this.panel2.div.xzTip=2

        this.label2=new DLabel(this.panel2,this.panel2.width-100,-12,"xz")
        this.label2.activMouse=false;
        this.label2.fontSize=10;
        this.label2.textAlign="right"

        //this.panel.borderRadius = 50;

        //this.pan.borderRadius = 50;

        this.setMM = function (min,max) {
            this.min=min;
            this.max=max;
            this.value=min;
            this.value2=max;
        }

        this.borderRadius = dcmParam.borderRadius;

        var xx, xxx;
        this.naValue = function (n) {
            xx =(n * ((this._height + self._width) / self._width) -
                    this._height / 2) /
                self._width;
            xxx = this._max - this._min; 

            let ww= this._min + xxx * xx;
            if(ww>this.value2) ww=this.value2               
            this.value = ww;
        };

         this.naValue2 = function (n) {            
            xx =(n * ((this._height + self._width) / self._width) -
                    this._height / 2) /
                self._width;
            xxx = this._max - this._min;  
            let ww= this._min + xxx * xx;
            if(ww<this.value) ww=this.value        
            this.value2 = ww;
        };

        var sp;
        this.mouseup = function (e) {
            document.body.style.pointerEvents = 'auto';

            sp = undefined;
            if (dcmParam.mobile == false) {
                document.removeEventListener('mouseup', self.mouseup);
            } else {
                document.removeEventListener('touchend', self.mouseup);
            }
            dcmParam.removeFunMove(self.mousemove);

            if (self.funChange) self.funChange();
        };
        var b2=false
        var ss, sss;
        this.mousemove = function (e) {
            
            if (sp == undefined) {
                sp = {
                    x: e.clientX,
                    value: self.panel.x,
                    value2: self.panel2.x,
                    b: false,
                };
            }
            ss = (e.clientX - sp.x) / self.scaleDrag.s;
         
            if(b2==false){
                self.naValue(sp.value + ss + self._height / 2);
            }else{
                self.naValue2(sp.value2 + ss + self._height / 2);
            }
            
            if (self.fun) self.fun();
        };

        this.testScale = function (c, o) {
            if (c.scale) o.s *= c.scale;
            if (c.parent) {
                self.testScale(c.parent, o);
            }
        };

        this.scaleDrag = { s: 1 };

        this.xyp = { x: 0, y: 0 };
        this.getPosGlob = function (c2) {
            var rx = c2.x;
            var scal = 1;
            if (c2.scale) scal = c2.scale;

            if (c2.parent) {
                rx += this.getPosGlob(c2.parent) * scal;
            }
            return rx;
        };

        this.mousedown = function (e) {
            if (this.tip === 0) {
                self.naValue(e.offsetX);
                if (self.fun) self.fun();
            }

            b2=false
            if(this.tip==2){
                b2=true
                
            }
            self.scaleDrag.s = 1;
            self.testScale(self, self.scaleDrag);

            if (e.target.xz != undefined) {
                if (e.offsetX != undefined) {

                    b2=false
                    if(this.tip==1)self.naValue(e.offsetX);
                    if(this.tip==2){
                        b2=true
                        self.naValue2(e.offsetX);
                    }
                }
                else {
                    if (e.targetTouches)
                        if (e.targetTouches[0]) {
                            //var rr=self.getPosGlob(self.pan)

                            self.xyp.x = 0;
                            self.xyp.y = 0;
                            self.funXYP(self.pan, self.xyp);
                            let coords = e.targetTouches[0].target.getBoundingClientRect();
                            let rr = self.xyp.x;
                            let rr1 =
                                (e.targetTouches[0].clientX - coords.x) /
                                self.scaleDrag.s;

                            self.naValue(rr1);
                        }
                }
                if (self.fun) self.fun();
            }

            document.body.style.pointerEvents = 'none';

            if (dcmParam.mobile == false) {
                document.addEventListener('mouseup', self.mouseup);
            } else {
                document.addEventListener('touchend', self.mouseup);
            }
            dcmParam.addFunMove(self.mousemove);
        };

        if (dcmParam.mobile == false) {
            this.panel.div.addEventListener(
                'mousedown',
                self.mousedown.bind(this.panel)
            );
            this.pan.div.addEventListener(
                'mousedown',
                self.mousedown.bind(this.pan)
            );

            this.panel2.div.addEventListener(
                'mousedown',
                self.mousedown.bind(this.panel2)
            );



            this.pan.div.xz = true;
        } else {
            this.panel.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this)
            );
            this.pan.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this)
            );
            this.pan.div.xz = true;
        }

        this._width++;
        this.width = this._width - 1;
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
    set width(v) {
        if (this._width != v) {
            this._width = v;
            this.pan.width = this._width;
            this.value = this._value;
        }
    }
    get width() {
        return this._width;
    }

    set height(v) {
        if (this._height != v) {
            this._height = v;

            this.pan.height = this._height - this._otstup * 2;
            this.panel.height = this.panel.width = this._height;
            this.panel2.height = this.panel2.width = this._height;
        }
    }
    get height() {
        return this._height;
    }

    set borderRadius(value) {
        if (this._borderRadius != value) {
            this._borderRadius = value;
            this.panel.borderRadius = value;
            this.pan.borderRadius = value;
        }
    }
    get borderRadius() {
        return this._borderRadius;
    }

    set value(v) {
        v = Math.round(v * this._okrug) / this._okrug;
        if (v > this._max) v = this._max;
        if (v < this._min) v = this._min;
        this._value = v;
        var xx = v - this._min;
        var xxx = xx / (this._max - this._min);
        this.panel.x = (this.pan.width - this._height) * xxx;

        this.label.text=this._value;

    }
    get value() {
        return this._value;
    }


    set value2 (v) {
        v = Math.round(v * this._okrug) / this._okrug;
        if (v > this._max) v = this._max;
        if (v < this._min) v = this._min;
        this._value2 = v;
        var xx = v - this._min;
        var xxx = xx / (this._max - this._min);
        this.panel2.x = (this.pan.width - this._height) * xxx;
        this.label2.text=this._value2;
    }
    get value2() {
        return this._value2;
    }



    set okrug(v) {
        this._okrug = v;
        this.value = this._value;
    }
    get okrug() {
        return this._okrug;
    }

    set min(v) {
        if (this._min != v) {
            this._min = v;
            this.value = this._value;
            //this.object.value=(this._value-this._min)/(this._max-this._min)*this.mm
        }
    }
    get min() {
        return this._min;
    }

    set max(v) {
        if (this._max != v) {
            this._max = v;
            this.value = this._value;
            //this.object.value=(this._value-this._min)/(this._max-this._min)*this.mm
        }
    }
    get max() {
        return this._max;
    }








  

    set activMouse(value) {
        if (this._activMouse != value) {
            this._activMouse = value;
            if (value == true) {
                this.alpha = 1;
                this.div.style.pointerEvents = null;
            } else {
                this.alpha = 0.7;
                this.div.style.pointerEvents = 'none';
            }
        }
    }
    get activMouse() {
        return this._activMouse;
    }
}