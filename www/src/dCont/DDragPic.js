
export function DDragPic(dC) {  
    var self=this   
    this.type="DDragPic";
    this.fun=undefined;
    this.dC=dC;
    this._width=100;
    this._height=100;
    this._active=false;
    this.otstup=2;
    this.otstup2=10;
    this.dCont=new DCont();


    this.fUp=undefined;
    this.object=undefined;
    this._x=0;
    this._y=0;
    this.pointZdvig={x:0,y:0}
    this.whBase=null;
    
    this.image=new DImage(this.dCont, 0,0);
    this.image.div.style.pointerEvents="none";
    this.dCont.div.style.pointerEvents="none";   
    this.dCont.div.style.userSelect="none";
    this.image.div.style.userSelect="none";  
    this.array=[];


    var sp=undefined; 
    
    this.scale=1;
    


    this.devas = dcmParam.mobile;

    var sT=1;
    this.oSc={x:0,y:0,x:1}


    this.tween=undefined
    if(window.TWEEN){
        this.tween=new TWEEN.Tween(this.dCont);

    }



    this.start = function(wh,link,object,fUp,alpha){
        if(this.whBase!=null)wh=this.whBase

      
        this.image.link=link;
        this.image.width=wh;
        this.image.height=wh;
        this.image.x=-wh/2;
        this.image.y=-wh/2;
        this.fUp=fUp;
        sp=undefined;

        
        this.dCont.alpha =0// alpha ==undefined ? 0 : alpha;
              
        this.dC.add(this.dCont);

        this.object=object;
        this.link=link;
        this.active = true; 


        
        this.fXYS(this.dC,this.oSc,true);

        this.dCont.x=dcmParam.globXY.x/this.oSc.s;
        this.dCont.y=dcmParam.globXY.y/this.oSc.s;

        dcmParam.addFunMove(this.mousemove)

        
        if(this.tween){
            this.tween.to({alpha:1},500).start();
        }
        
       
    }

 
    this.fXYS=function(c,o,b){
        if(b!=undefined){
            o.x=0;
            o.y=0;
            o.s=1;
        }
        o.x*=c._scale;
        o.y*=c._scale;
        o.s*=c._scale;

        o.x+=c.position._x;
        o.y+=c.position._y;
        if(c.visible==false)o.y+=99999
    
        if(c.parent!=undefined){                
            self.fXYS(c.parent, o)              
        }
    }

   

    //вешаем функции на апычь
    this.arrFunUp=[]
    this.addFunAp=function(f){
        this.arrFunUp.push(f)
    }

    //дергает вложеные фунАпы
    this.mouseup = function(e){

        if(sp!=undefined){
            for (var i = 0; i < self.arrFunUp.length; i++) {
                self.arrFunUp[i](e);
            } 
        }
        self.stop();
        
    }

    this.stop = function(){               
        if(self.fUp)self.fUp(); 
 
        dcmParam.removeFunMove(self.mousemove) 
        if(self.dCont)if(self.dCont.parent)self.dCont.parent.remove(self.dCont);
        self.object=undefined
        sp=undefined;
    }

    //постояно весит в слушатели
    //можно грохнуть и перехвать, гляю мобилы с окончанием евента
    this.mousemove = function(e){   
        if(sp==undefined){
            if(self.devas==false){
                sp={
                    x:e.clientX,
                    y:e.clientY
                };
            }else{
                sp={
                    x:e.touches[0].clientX,
                    y:e.touches[0].clientY
                };
            }
        } 
        var ss,ss1
        if(self.devas==false){       
            self._x=e.clientX;
            self._y=e.clientY;            
        }else{
            self._x=e.touches[0].clientX;
            self._y=e.touches[0].clientY;
        }


        self.dCont.x=self._x/self.oSc.s+self.pointZdvig.x;
        self.dCont.y=self._y/self.oSc.s+self.pointZdvig.y;

        if(self.tween==undefined){
           if(self.dCont.alpha<1){
                self.dCont.alpha+=0.1;
            } 
        }
        
        /*let dd= self.getDistance(self.dCont,sp)
        let n=dd/50;
        if(n>1)n=1;
        if(self.dCont.alpha<n){           
            self.dCont.alpha=n;
        }*/ 
        
    }


    this.getDistance = function (p1, p2) {
        if (p1 == undefined) {
            return 0;
        }
        if (p2 == undefined) {
            p2 = rezNull;
        }
        p2 = p2 || rezNull;
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    };

    if(self.devas==false){
        document.addEventListener("mouseup", self.mouseup); 
    }else{
        document.addEventListener("touchend", self.mouseup); 
    }


///////////////////////////////////////////////////////
////////////////////////тест драга//////////////////////////////

    

    //система проверки клик это или драг
    this.mouseup1 = function(e){       
        self.mouseStop();       
        if(self.fClik!=undefined)self.fClik();
    }

    this.pointNull={x:0,y:0}  
    this.getDistance = function (p1, p2) {       
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    };


    this.sp
    this.point={x:0,y:0}  
    this.posit={x:0,y:0}
    this.mousemove1 = function(e){        
        if(sp==undefined){
            if(self.devas==false){
                sp={
                    x:e.clientX,
                    y:e.clientY
                };
            }else{
                sp={
                    x:e.touches[0].clientX,
                    y:e.touches[0].clientY
                };
            }
            self.sp = sp
        } 

        var ss,ss1
        if(self.devas==false){       
            ss=(e.clientX-sp.x);            
            ss1=(e.clientY-sp.y);
            self.posit.x=e.clientX
            self.posit.y=e.clientY
        }else{
            ss=(e.touches[0].clientX-sp.x);            
            ss1=(e.touches[0].clientY-sp.y);
            self.posit.x=e.touches[0].clientX
            self.posit.y=e.touches[0].clientY
        }   
        self.point.x=ss;
        self.point.y=ss1;
        var dd=self.getDistance(self.point,self.pointNull)
        if(self.fDDD) self.fDDD();              
        if(dd>self.dist){ 
            self.fClik=   undefined        
            self.mouseStop();
            if(self.fDrag!=undefined)self.fDrag(); 
            return;          
        } 
       
    }

    this.mouseStop = function(){
        sp=undefined;   
        if(self.devas==false){            
            document.removeEventListener("mouseup", self.mouseup1);           
        }else{           
            document.removeEventListener("touchend", self.mouseup1);           
        } 
        dcmParam.removeFunMove(self.mousemove1)  
    }


    this.dist=0;    
    this.fClik=0;
    this.fDrag=0;   
    this.fDDD=undefined  
    this.testDrag = function(dist,fClik,fDrag,fDDD){ 
        
        sp=undefined;  
        this.dist=dist;
        this.fClik=fClik;
        this.fDrag=fDrag;
        this.fDDD=fDDD;

        if(this.devas==false){
            document.addEventListener("mouseup", self.mouseup1);
        }else{
            document.addEventListener("touchend", self.mouseup1);
        } 
        dcmParam.addFunMove(this.mousemove1)       
    } 



     

//-------------------------------------------------

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;                               
                if(value==true){ 
                    if(this.devas==false){
                        document.addEventListener("mouseup", this.mouseup); 
                    }else{
                        document.addEventListener("touchend", this.mouseup); 
                    }
                }else{
                    this.object=undefined                    
                    if(this.devas==false){
                        document.removeEventListener("mouseup", this.mouseup); 
                    }else{
                        document.removeEventListener("touchend", this.mouseup); 
                    }                    
                }                
            }           
        },
        get: function () {
            return this._active;
        }
    });
}


