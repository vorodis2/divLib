
import { DCont } from './DCont.js';

export class DHoleOld extends DCont {
    constructor(dCont, _x, _y, _rect, _fun) {
        super(dCont);

        this.type="DHole";
        var self=this
        this.x=_x||0;   
        this.y=_y||0;


        this.rect={x:0,y:0,width:200,height:200};

        if(_rect && _rect.width)this.rect=_rect;
        this.fun=_fun



        if(dcmParam==undefined)dcmParam=new DCM();
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this); 
        this.dCont=new DCont(this)
        this.dCont1=new DCont(this.dCont)

        this._width=500;
        this._height=500; 
        this._boolFont=true;
        this._glowColor="#000000";
        this._glowSah=0;

        this._radius=10;
        this.radBut=this._radius*2; //20
      
        this.arrPoint=[];//кнопри
        this.arrBut=[];//кнопри
        this.arrBut1=[];//грани
        this.arrBut2=[];//грани

        this.arrCC=[];

        this._colorAct = dcmParam.color//"#ff0000";
        this._colorButton = dcmParam.color//"#ff0000";
        this._borderRadius=0;
        this._borderThickness=1;
        this.oca=undefined;
    
    
        var button
        this.button
        this.canvas
        this.ctx

        this.btn={x:0,y:0,width:this.rect.width/10,heigt:this.rect.height/10};


        this.init=function () { 
            this.canvas = document.createElement('canvas'); // канвас для картинки
            this.ctx = this.canvas.getContext('2d');
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0px';
            this.canvas.style.left = '0px';
            this.canvas.width=this._width;
            this.canvas.height=this._height;
            this.dCont1.div.appendChild(this.canvas);


            this.button=new DButton(this.dCont, 0, 0, "", null);
            this.button.idArr=0;
            this.button.tip=2;
            this.button.alpha=0.0//25;
            this.button.fun_mousedown=this.sobBut 

            this.canvas.rect
  
            for (var i = 0; i < 4; i++) {

                let dC=new DCont(this.dCont);
                // this.arrPoint.push(dC);

                this.arrPoint.push({x:0, y:0, scale:1})
                this.arrCC.push(dC)
                
                button=new DButton(dC, 0, 0, "", null);
                button.idArr=i;
                button.tip=0;
                button.alpha=0.00//025;
                button.fun_mousedown=this.sobBut 
                this.arrBut1.push(button);

                button=new DButton(dC, 0, 0, "", null);
                button.idArr=i;
                button.tip=0;
                button.alpha=0.5//025;
                button.fun_mousedown=this.sobBut 
                this.arrBut2.push(button);           


                button=new DButton(dC, -this.radBut/2, -this.radBut/2, "", null);
                button.idArr=i;
                button.tip=1; 
                button.width= button.height=this.radBut; 
                button.fun_mousedown=this.sobBut              
                this.arrBut.push(button);
            }            
        }

        var whh=4

        this.drag=function () {
            if(this.rect.x<0)this.rect.x=0;
            if(this.rect.y<0)this.rect.y=0;

            if(this.rect.width+this.rect.x>this._width)this.rect.width=this._width-this.rect.x;
            if(this.rect.height+this.rect.y>this._height)this.rect.height=this._height-this.rect.y;

            let ww=this.radBut/2;

            
           
            this.arrPoint[0].x=this.rect.x;
            this.arrPoint[0].y=this.rect.y;

            this.arrPoint[1].x=this.rect.x+this.rect.width;
            this.arrPoint[1].y=this.rect.y;

            this.arrPoint[2].x=this.rect.x+this.rect.width;
            this.arrPoint[2].y=this.rect.y+this.rect.height;

            this.arrPoint[3].x=this.rect.x;
            this.arrPoint[3].y=this.rect.y+this.rect.height;
        
            //
            this.arrBut1[0].x=this.radBut/2;
            this.arrBut1[0].width=this.rect.width - this.radBut;
            this.arrBut1[0].y=-this.radBut/2;
            this.arrBut1[0].height=this.radBut;


            this.arrBut1[1].x=-this.radBut/2;
            this.arrBut1[1].width= this.radBut;
            this.arrBut1[1].y=this.radBut/2;
            this.arrBut1[1].height=this.rect.height- this.radBut;

            this.arrBut1[2].x=this.radBut/2-this.rect.width;
            this.arrBut1[2].width= this.rect.width - this.radBut;
            this.arrBut1[2].y=-this.radBut/2;
            this.arrBut1[2].height=this.radBut;


            this.arrBut1[3].x=-this.radBut/2;
            this.arrBut1[3].width=  this.radBut;
            this.arrBut1[3].y=this.radBut/2-this.rect.height;
            this.arrBut1[3].height=this.rect.height-this.radBut;
            //


            this.arrBut2[0].x=this.radBut/2;
            this.arrBut2[0].width=this.rect.width - this.radBut;
            this.arrBut2[0].y=-whh/2;
            this.arrBut2[0].height=whh;


            this.arrBut2[1].x=-whh/2;
            this.arrBut2[1].width= whh;

            this.arrBut2[1].y=this.radBut/2;
            this.arrBut2[1].height=this.rect.height- this.radBut;


            this.arrBut2[2].x=this.radBut/2-this.rect.width;
            this.arrBut2[2].width= this.rect.width - this.radBut;
            this.arrBut2[2].y=-whh/2;
            this.arrBut2[2].height=whh;  


            this.arrBut2[3].x=-whh/2;
            this.arrBut2[3].width=  whh;
            this.arrBut2[3].y=this.radBut/2-this.rect.height;
            this.arrBut2[3].height=this.rect.height-this.radBut;


            this.button.x=this.rect.x;
            this.button.y=this.rect.y;
            this.button.width=this.rect.width;
            this.button.height=this.rect.height;

            for (let i = 0; i < this.arrCC.length; i++) {
                this.arrCC[i].x = this.arrPoint[i].x;
                this.arrCC[i].y = this.arrPoint[i].y;
            }

            this.ctx.clearRect(0, 0, this._width, this._height);

            var alpha=0.2;

            if(this._boolFont==true){
                this.ctx.fillStyle ="rgba("+this._oca.r+", "+this._oca.g+", "+this._oca.b+", "+alpha+")";

                this.ctx.fillRect(0, 0, this.rect.x, this._height);
                this.ctx.fillRect(this.rect.x, 0, this.rect.width, this.rect.y);
                this.ctx.fillRect(this.rect.x, this.rect.y+this.rect.height, this.rect.width, this._height-(this.rect.y+this.rect.height));

                this.ctx.fillRect(this.rect.x+this.rect.width, 0, this._width-this.rect.width-this.rect.x, this._height);

                this.ctx.fill();
            }

            this.fun("drag");

        }


        this.min=100


        this.korektDrag=function (bb) {
            if(this.tip==2){


                point.x=this.pointStart.x+self.point.x
                point.y=this.pointStart.y+self.point.y 

                if(point.x<0)point.x=0
                if(point.y<0)point.y=0 
                if(point.x+this.rect.width>this._width)point.x=this._width-this.rect.width
                if(point.y+this.rect.height>this._height)point.y=this._height-this.rect.height    

                this.rect.x=this.arrPoint[0].x;
                this.rect.y=this.arrPoint[0].y;

                this.drag() 

                return
            }

            if(bb==true){

                let bx=true;
                if(this.tip==0&&(this.idArr==0||this.idArr==2))bx=false
                let by=true;
                if(this.tip==0&&(this.idArr==1||this.idArr==3))by=false    

                if(bx)point.x=this.pointStart.x+self.point.x
                if(by)point.y=this.pointStart.y+self.point.y 

                if(point.x<0)point.x=0
                if(point.y<0)point.y=0    
            }
            
            if(point1.bx==true){                
                point1.x=point.x
                if(point1.byn>0){
                    if(point.y>point1.y-this.min){
                        point.y=point1.y-this.min;
                        this.korektDrag()
                        return
                    }


                }else{
                    if(point.y<point1.y+this.min){
                        point.y=point1.y+this.min;
                        this.korektDrag()
                        return
                    }
                }
            }            
            if(point1.by==true){
                point1.y=point.y
                if(point1.bxn>0){
                    if(point.x>point1.x-this.min){
                        point.x=point1.x-this.min;
                        this.korektDrag()
                        return
                    }
                }else{
                    if(point.x<point1.x+this.min){
                        point.x=point1.x+this.min;
                        this.korektDrag()
                        return
                    }

                }
            }

            if(point2.bx==true){                
                point2.x=point.x
                if(point2.byn>0){
                    if(point.y>point2.y-this.min){
                        point.y=point2.y-this.min;
                        this.korektDrag()
                        return
                    }

                }else{
                    if(point.y<point2.y+this.min){
                        point.y=point2.y+this.min;
                        this.korektDrag()
                        return
                    }

                }
            }            
            if(point2.by==true){
                point2.y=point.y
                if(point2.bxn>0){
                    if(point.x>point2.x-this.min){
                        point.x=point2.x-this.min;
                        this.korektDrag()
                        return
                    }

                }else{
                    if(point.x<point2.x+this.min){
                        point.x=point2.x+this.min;
                        this.korektDrag()
                        return
                    }
                }
            }

            this.rect.x=this.arrPoint[0].x;
            this.rect.y=this.arrPoint[0].y;

            this.rect.width=this.arrPoint[2].x-this.arrPoint[0].x;
            this.rect.height=this.arrPoint[2].y-this.arrPoint[0].y;           

            this.fun("dragXY");

            this.drag() 
        }


        var point
        var point1
        var point2
        var point3


        this.tip
        this.idArr
        this.sobBut=function () {            
            self.tip=this.tip;
            self.idArr=this.idArr;

            if(self.tip==2){
                point=self.arrPoint[0]
                self.start(point)
                return
            }

            point=self.arrPoint[this.idArr]
            point1=self.arrPoint[(this.idArr+1)%4]
            point2=self.arrPoint[(this.idArr+3)%4]
            point3=self.arrPoint[(this.idArr+2)%4]

            if(point.x==point1.x){
                point1.bx=true;
                point1.by=false;
            }else{
                point1.bx=false;
                point1.by=true; 
            }
            point1.bxn=point1.x-point.x;
            point1.byn=point1.y-point.y; 

            if(point.x==point2.x){
                point2.bx=true;
                point2.by=false;
            }else{
                point2.bx=false;
                point2.by=true; 
            }
            point2.bxn=point2.x-point.x;
            point2.byn=point2.y-point.y; 


            self.start(point)
        }

        var sp;
        this.mouseup = function(e){
            document.body.style.pointerEvents='auto'
           // self.fun("up")
            sp=undefined;
            if(dcmParam.mobile==false){                
                document.removeEventListener("mouseup", self.mouseup);
            }else{                
                document.removeEventListener("touchend", self.mouseup);                
            }  
            dcmParam.removeFunMove(self.mousemove);                        
        }

        this.point={x:0,y:0} 
        this.pointStart={x:0,y:0}
        this.object=undefined
        this.scaleStart=1;

        var sx,sy,sNum,scale,scale1;
        this.mousemove = function(e){        
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX,                        
                        y:e.clientY, 
                        b:false
                    };
                }               
                sx=(e.clientX-sp.x)/self.scaleDrag.s;
                sy=(e.clientY-sp.y)/self.scaleDrag.s; 

            }else{
                if(sp==undefined){
                    sp={
                        x:e.targetTouches[0].clientX, 
                        y:e.targetTouches[0].clientY
                    };
                }               
                sx=(e.targetTouches[0].clientX-sp.x)/self.scaleDrag.s;
                sy=(e.targetTouches[0].clientY-sp.y)/self.scaleDrag.s; 
            }
            self.point.x=sx;
            self.point.y=sy;
            
            self.korektDrag(true);
            //self.fun("move");
           // self.drag(sx/(scale*scale1),sy/(scale*scale1));                       
        }

        this.start = function(obj){            
            document.body.style.pointerEvents="none";  
            this.appPoint()           
            sp=undefined
            this.object=obj
            if(obj){
                this.pointStart.x=obj.x;
                this.pointStart.y=obj.y; 
            }
            this.scaleDrag.s=this.object.scale;
            this.testScale(this.object,this.scaleDrag)

            if(dcmParam.mobile==false){                 
                document.addEventListener("mouseup", self.mouseup);
            }else{                  
                document.addEventListener("touchend", self.mouseup);                
            }
            dcmParam.addFunMove(self.mousemove);    
        }
        this.testScale = function (c,o) {       
            if(c.scale)o.s*=c.scale;
            if(c.parent){
                self.testScale(c.parent,o);
            }
        }
        this.scaleDrag={s:1}

        this.appPoint = function () { 
            //this.arrPoint
        }

        this.setRect = function (x,y,w,h,b) { 
            this.rect.x=x;
            this.rect.y=y;
            this.rect.width=w;
            this.rect.height=h;
            if(b==undefined)this.drag();
        }
        


        this.parseColor = function (color) {
            var cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color);           
            return {r: parseInt(cache[1], 16), g: parseInt(cache[2], 16), b: parseInt(cache[3], 16)};
        }

        this._oca=this.parseColor(this._colorAct);

        this.init();
        this.drag();


        if(dcmParam.borderRadius!=0)this.borderRadius=dcmParam.borderRadius
    }

    set borderRadius(value) {
        if (this._borderRadius != value) {
            this._borderRadius = value;
            for (var i = 0; i < 4; i++) {                
                this.arrBut[i].borderRadius= this._borderRadius                
            }           
        }           
    }
    get borderRadius() { return this._borderRadius;}


        

    set glowSah(value) {
        if (this._glowSah != value) {
            this._glowSah = value; 

            for (var i = 0; i < 4; i++) {
                
                this.arrBut[i].glowSah= this._glowSah
                //this.arrBut2[i].glowSah= this._glowSah
            }           
        }           
    }
    get glowSah() { return this._glowSah; }


    set glowColor(value) {
        if (this._glowColor != value) {
            this._glowColor = value; 

            for (var i = 0; i < 4; i++) {
                
                this.arrBut[i].glowColor= this._glowColor
                //this.arrBut2[i].glowColor= this._glowColor
            }           
        }           
    }
    get glowColor() { return this._glowColor; }
    

    set colorButton(value) {
        if (this._colorButton != value) {
            this._colorButton = value; 

            for (var i = 0; i < 4; i++) {
                
                this.arrBut[i].color= this._colorButton
                // this.arrBut2[i].color= this._colorButton
            }
        }           
    }
    get colorButton() { return this._colorButton; }

    set colorAct(value) {
        if (this._colorAct != value) {
            this._colorAct = value; 
            this._oca=this.parseColor(this._colorAct);
            this.drag();
        }           
    }
    get colorAct() { return this._colorAct; }


    set boolFont(value) {
        if (this._boolFont != value) {
            this._boolFont = value; 
            if(value){
               this.dCont1.div.appendChild(this.canvas); 
            }else{
                this.dCont1.div.removeChild(this.canvas); 
            }
            
            this.drag();
        }           
    }
    get boolFont() { return this._boolFont; }

   /* set radius(value) {
        if (this._radius != value) {
            this._radius = value; 
            this.drag();
        }           
    }
    get radius() { return this._radius; }*/

    set width(value) {
        if (this._width != value) {
            this._width = value; 
            this.canvas.width=this._width;            
            this.drag();
        }           
    }
    get width() { return this._width; }

    set height(value) {
        if (this._height != value) {
            this._height = value;            
            this.canvas.height=this._height*1;           
            this.drag(); 
        }           
    }
    get height() { return this._height; }


} 

