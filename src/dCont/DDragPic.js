
/*
глобальный, перетягивает картинки, юзаеться в клиенте и админ

дев 
vorodis2.com   
vorodis2@gmail.com 
2019
*/



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
    this.pointZdvig={x:22,y:0}
    this.whBase=null;
    
    this.image=new DImage(this.dCont, 0,0);
    this.image.div.style.pointerEvents="none";
    this.dCont.div.style.pointerEvents="none";
     
    this.array=[];


    var sp=undefined; 
    
    this.scale=1;
    


    this.devas = dcmParam.mobile;



  
    this.start = function(wh,link,object,fUp){
        if(this.whBase!=null)wh=this.whBase
        this.image.link=link;
        this.image.width=wh;
        this.image.height=wh;
        this.image.x=-wh/2;
        this.image.y=-wh/2;
        this.fUp=fUp;
        sp=undefined;
        
        this.dCont.alpha=0;
        //this.dCont.scale=0;      
        this.dC.add(this.dCont);

        this.object=object;
        this.link=link;
        this.active = true; 

        dcmParam.addFunMove(this.mousemove)
       
    }

 


   

    //вешаем функции на апычь
    this.arrFunUp=[]
    this.addFunAp=function(f){
        this.arrFunUp.push(f)
    }

    //дергает вложеные фунАпы
    this.mouseup = function(e){
        if(sp!=undefined){
            self.stop();
        }
    }

    this.stop = function(){               
        if(self.fUp)self.fUp(); 
        for (var i = 0; i < self.arrFunUp.length; i++) {
            self.arrFunUp[i]()
        }      
        dcmParam.removeFunMove(self.mousemove) 
        self.dC.remove(self.dCont);
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


        self.dCont.x=self._x+self.pointZdvig.x;
        self.dCont.y=self._y+self.pointZdvig.y;

        let dd= self.getDistance (self.dCont,sp)
        let n=dd/50;
        if(n>1)n=1;
        if(self.dCont.alpha<n){           
            self.dCont.alpha=n;
        } 
        
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
        }         
        var ss,ss1
        if(self.devas==false){       
            ss=(e.clientX-sp.x);            
            ss1=(e.clientY-sp.y);
        }else{
            ss=(e.touches[0].clientX-sp.x);            
            ss1=(e.touches[0].clientY-sp.y);
        }     
        if(Math.abs(ss>self.dist)||Math.abs(ss1>self.dist)){
            self.mouseStop();
            if(self.fDrag!=undefined)self.fDrag();
           
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
    this.testDrag = function(dist,fClik,fDrag){ 
        sp=undefined;  
        this.dist=dist;
        this.fClik=fClik;
        this.fDrag=fDrag;


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



