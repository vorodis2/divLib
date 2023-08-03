
/*
     класс связывающий PKBS,PKBN,PKBB
*/

export class PKBlok  {
    constructor(par, fun) {          
        var self=this   
        this.type="PKBlok";
        this.fun=fun;
        this.par=par;
        this._wh=this.par._wh; 
        this.dCont=new DCont();
        this.dC=this.par.dCont
        this._otstup=this.par._otstup;
        this._wComp=this.par._wComp;
        this._active  = false 
        this._active1  = false
        this._bIndex  = false; 
        this.key="null"

        this.width=this._wComp;
        this._visible=true

        trace("########",this.par.height)
        this.panel=new DPanel(this.dCont)
        this.panel.width=this._wComp;
        this.panel.height=this.par.height//par.hGal;
        this.panel1=new DPanel(this.panel,this._otstup,this._otstup)
        this.panel1.width=this._wComp-this._otstup*2;

        this.panel1.height=dcmParam.fontSize+this._otstup*3 + this._wh;
        this.dLabel=new DLabel(this.panel1,0,this._otstup);
        this.dLabel.width=this.panel.width;        
        this.dLabel.textAlign="center";
        this.chek=new DCheckBox(this.panel1,this.panel.width-16,0," ",function(){
           
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
        
        this.getOA=function(o,a,s){
           
            if(o==undefined)return null
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
                        }else{
                            if(this.isObjArr(o[a[s].key],a[s].array)==true){                                    
                                return this.getOA(o[a[s].key], a, s+1)                                    
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
            if(o.width!=undefined){
                this.width=o.width;
                this.drawWComp()
                
            }
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

        this.finalArr=function(){
            
        }


        this.postClear=undefined
        this.clear=function(){
            this.boolInt=true
            this.active1=false;
            this.active=false;
            this.bIndex= false
            if(this.postClear!=undefined)this.postClear()
        }

        this.postDrawWComp=undefined
        this.drawWComp=function(){

            this.panel.width=this.width;
            this.panel1.width=this.width-this._otstup*2;
            this.dLabel.width=this.panel.width;
            this.chek.x=this.panel.width-16-this._otstup*2;
            if(this.postDrawWComp!=undefined)this.postDrawWComp()
            
        }
        


        this.postDrawOtstup=undefined
        this.drawOtstup=function(){
            this.panel1.x=this._otstup;
            this.panel1.y=this._otstup;
            this.panel1.width=this.width-this._otstup*2;
            this.panel1.height=dcmParam.fontSize+this._otstup*2+this._wh
            this.dLabel.y=this._otstup;
            this.chek.x=this.panel.width-16-this._otstup;
            this.chek.y=this._otstup;
            if(this.postDrawOtstup!=undefined)this.postDrawOtstup()
        } 


        this.postDrawWh=undefined
        this.drawWh=function(){
           // this.panel1.height=dcmParam.fontSize+this._otstup*2+this._wh;
           // if(this.postDrawWh!=undefined)this.postDrawWh()
        }


        this.setBoolColor=function(b){
            
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


    set wComp(value) {
        if (this._wComp != value) {
            this._wComp = value;
            this.width=value;
            this.drawWComp()

          
        }
    }
    get wComp() {
        return this._wComp;
    }


    set otstup(value) {
        if (this._otstup != value) {
            this._otstup = value;
            this.drawOtstup()

        }
    }
    get otstup() {
        return this._otstup;
    }


    set wh(value) {
        if (this._wh != value) {
            this._wh = value;
            this.drawWh()

        }
    }
    get wh() {
        return this._wh;
    }

    set visible(value) {
        if (this._visible != value) {
            this._visible = value;
            this.panel1.visible=this._visible

        }
    }
    get visible() {
        return this._visible;
    }


}
