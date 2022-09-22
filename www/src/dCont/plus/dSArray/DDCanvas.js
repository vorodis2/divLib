

export class DDCanvas extends DCont {
    constructor(dCont, _x, _y) {
        super();
        this.type = 'DDCanvas';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined)
        if (dCont.add != undefined) dCont.add(this);
        
        var self = this
        this.dCont = new DCont(this);
        
        this._width = 200;
        this._height = 200;
        this._otstup = 5;
        this._color=dcmParam._color;
        this._depth=1;
        this._alp=1;
        this._fontSize=dcmParam._fontSizeLitte;
        this._pointX=0;
        this._pointY=0;
        this.sah=20;
        this.rarius=2;
        var xx=0;
        var yy=0;
        let cc=null;
 

        this.panel = new DPanel(this,0,0)
        this.panel.width=this._width;
        this.panel.height=this._height;

        this.panel1 = new DPanel(this.panel,0,0)
        this.panel1.x=this._fontSize*4*0.8+this._otstup*2;
        this.panel1.y=this._fontSize+this._otstup*2
        this.panel1.width=this._width-(this._fontSize*4*0.8+this._otstup*3);
        this.panel1.height=this._height-(this._fontSize+this._otstup*3);


        trace(this.panel1.width,this.panel1.height)

        this.bmd=new DBitmapData(this._width,this._height)
        var canvas = this.bmd.canvas;
        var ctx =this.bmd.ctx;
        canvas.style.position = 'fixed';
        /*canvas.style.top = '0px';
        canvas.style.left = '0px';*/
        canvas.style.top = this._pointX+'px';
        canvas.style.left = this._pointY+'px';
        this.panel1.div.appendChild(canvas)
        this.bmd.upDate()  
        trace(canvas)

        this.setSetka=function(sah,depth,color,alp){
            ctx.beginPath();
            ctx.lineWidth = depth+"";
            if(alp==undefined)alp=this._alp
            if(color==undefined)color=this._color
            cc=dcmParam.parseColor(color)
            ctx.strokeStyle = 'rgba('+cc.r+', '+cc.g+', '+cc.b+', '+alp+')';
            let qq=this._width/this.sah;
            let rr=this._height/this.sah;

            for (var i = 0; i < qq; i++) {
                ctx.moveTo(sah*i,   0);
                ctx.lineTo(sah*i,  this._height);   
            }

            for (var i = 0; i < rr; i++) {
                ctx.moveTo(0, sah*i);
                ctx.lineTo(this._width,  sah*i);
            }  

            ctx.stroke();
        }

        
        this.setPoint =function(point,rarius,depth,color,alp){
            ctx.beginPath();
            ctx.lineWidth =  depth+"";
            if(alp==undefined)alp=this._alp
            if(color==undefined)color=this._color
            if(rarius==undefined)rarius=this.rarius
            cc=dcmParam.parseColor(color)
            ctx.strokeStyle = 'rgba('+cc.r+', '+cc.g+', '+cc.b+', '+alp+')';
            ctx.arc(point.x+xx, point.y+yy, rarius, 0, 2*Math.PI, false);
            ctx.stroke()
            ctx.closePath()
        }

        this.setLine =function(point,point1,depth,color,alp){
            ctx.beginPath();
            ctx.lineWidth = depth+"";
            if(alp==undefined)alp=this._alp
            if(color==undefined)color=this._color
            cc=dcmParam.parseColor(color)
            ctx.strokeStyle = 'rgba('+cc.r+', '+cc.g+', '+cc.b+', '+alp+')';
            ctx.globalAlpha = alp;
            ctx.moveTo(point.x+xx,   point.y+yy);
            ctx.lineTo(point1.x+xx,   point1.y+yy);            
            ctx.stroke();
        }


        this.setRPs =function(point,point1,depth,color,alp){
            ctx.beginPath();
            ctx.lineWidth = depth+"";
            if(alp==undefined)alp=this._alp
            if(color==undefined)color=this._color
            cc=dcmParam.parseColor(color)
            ctx.strokeStyle = 'rgba('+cc.r+', '+cc.g+', '+cc.b+', '+alp+')'; 
            ctx.globalAlpha = alp;
            ctx.rect(point.x+xx,point.y+yy,point1.x+xx-point.x+xx,point1.y+yy-point.y+yy);         
            ctx.stroke();
        }

        this.setRect =function(rect,depth,color,alp){
            ctx.beginPath();
            ctx.lineWidth = depth+"";
            if(alp==undefined)alp=this._alp
            if(color==undefined)color=this._color
            cc=dcmParam.parseColor(color)
            ctx.strokeStyle = 'rgba('+cc.r+', '+cc.g+', '+cc.b+', '+alp+')';
            ctx.globalAlpha = alp;
            if(rect.h==undefined )rect.h=rect.height
            if(rect.w ==undefined )rect.w=rect.width
            ctx.rect(rect.x+xx,rect.y+yy, rect.h,rect.w);           
            ctx.stroke();
        }
      

        this.clear =function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
        
      
        this.debag=new Debag(this.dCont, function(s,p,p1){

            let r1={x:p[0].x,y:p[0].y, width:p[1].y-p[0].y, height:p[1].x-p[0].x}

            self.clear()
            self.setSetka(self.sah,self._depth,self._color,self._alp)
            for (var i = 0; i <p.length; i++) {
                self.setPoint(p[i],self.rarius,self._depth,self._color,self._alp)
            }
            self.setLine(p[2],p[3],self._depth,self._color,self._alp)
            self.setRect(r1,self._depth,self._color,self._alp)
            self.setRPs(p[1],p[2],self._depth,self._color,self._alp)

        })

        this.dragPrm=function(){
            this.panel.width=this._width;
            this.panel.height=this._height;
            this.panel1.x=this._fontSize*4*0.8+this._otstup*2;
            this.panel1.y=this._fontSize+this._otstup*2
            this.panel1.width=this._width-(this._fontSize*4*0.8+this._otstup*3);
            this.panel1.height=this._height-(this._fontSize+this._otstup*3);
            canvas.width=this._width;
            canvas.height=this._height;
        }

        this.setPos=function(){
            canvas.style.top = this._pointX+'px';
            canvas.style.left = this._pointY+'px';
        }

    }

    set x(value) {        
        this.position.x = value;
    }
    get x() {
        return this.position.x;
    }
    set y(value) {
        this.position.y = value;
    }
    get y() {
        return this.position.y;
    }


    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.dragPrm()
            this.debag.width=this._width;
        }
    }
    get width() {
        return this._width;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.dragPrm()
            this.debag.height=this._height;
        }
    }
    get height() {
        return this._height;
    }


    set depth(value) {
        if (this._depth != value) {
            this._depth = value;
        }
    }
    get depth() {
        return this._depth;
    }

    set color(value) {
        if (this._color != value) {
            this._color = value;
        }
    }
    get color() {
        return this._color;
    }

    set alp(value) {
        if (this._alp != value) {
            this._alp = value;
        }
    }
    get alp() {
        return this._alp;
    }

    set otstup(value) {
        if (this._otstup != value) {
            this._otstup = value;
        }
    }
    get otstup() {
        return this._otstup;
    }


    set pointX(value) {
        if (this._pointX != value) {
            this._pointX = value;
            this.setPos()
        }
    }
    get pointX() {
        return this._pointX;
    }


    set pointY(value) {
        if (this._pointY != value) {
            this._pointY = value;
            this.setPos()
        }
    }
    get pointY() {
        return this._pointY;
    }

}



export class Debag  {
    constructor(dCont, fun) {

        this.type = 'Debag';
        this.dCont=dCont;
        this.fun=fun;
        var self=this;


        this.kol=4
        this.time=1000  
        
        this._width=200;
        this._height=200;   
        this.otstup=10; 

        this.array=[]
        this.arrayT=[]
        
        this.dWindow=new DWindow(dCont,300,0,"TestPanel") 
        
        this.buttonTest = new DButton(this.dWindow.content,this.otstup,this.otstup,"TEST",function(){
            self.drahXZ() 
        })

    
        this.panelBase = new DPanel(this.dWindow.content,this.otstup,this.otstup*2+this.buttonTest.height)
      

        this.drag= function(){
            this.dWindow.width=this._width+this.otstup*2;
            this.dWindow.height=this._height+this.otstup*3+this.buttonTest.height+32;
            this.panelBase.width=this._width;
            this.panelBase.height=this._height;
        }
        
        this.drag()

        this.drahwwww=function(){
            let res=[]
            for (var i = 0; i < self.array.length; i++) {
                res.push({
                    x:self.array[i].x,
                    y:self.array[i].y,
                })
            }
            self.fun("draw",res)
        }


        for (var i = 0; i < this.kol; i++) {
            let buttonTest=new DButton(this.panelBase)
            buttonTest.width=10;
            buttonTest.height=10;
            buttonTest.x=Math.random()*(this.panelBase.width-buttonTest.width);
            buttonTest.y=Math.random()*(this.panelBase.height-buttonTest.height);
            this.array.push(buttonTest)

            let t=new TWEEN.Tween(buttonTest)
            this.arrayT.push(t)

            if(i==0)t.onUpdate( this.drahwwww)
        }




        this.drahXZ=function(){
            for (var i = 0; i < self.array.length; i++) {
                self.arrayT[i].to({x:Math.random()*(this.panelBase.width-10),y:Math.random()*(this.panelBase.height-10)},this.time).start();
            }
        }
        this.drahXZ() 

    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.drag()
        }
    }
    get width() {
        return this._width;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.drag()
        }
    }
    get height() {
        return this._height;
    }


}

    // this.setSetka=function(point,point1,depth,pxz,color,alp){
        //     ctx.beginPath();
        //     ctx.lineWidth = depth+"";
        //     ctx.strokeStyle = color;
        //     ctx.moveTo(point.x+xx,   point.y+yy);
        //     ctx.lineTo(point1.x+xx,   point1.y+yy);            
        //     ctx.stroke();
        // }

        // this.setLine =function(point,point1,depth,pxz,color,alp){
        //     if(!color)color=_color

        //     ctx.beginPath();
        //     ctx.lineWidth = depth+"";
        //     ctx.strokeStyle = color;
        //     ctx.moveTo(point.x+xx,   point.y+yy);
        //     ctx.lineTo(point1.x+xx,   point1.y+yy);            
        //     ctx.stroke();
        // }

    // set otstup(value) {
    //     if (this._otstup != value) {
    //         this._otstup = value;
    //     }
    // }
    // get otstup() {
    //     return this._otstup;
    // }





    


    


    // set fontSize(value) {
    //     if (this._fontSize != value) {
    //         this._fontSize = value;
    //     }
    // }
    // get fontSize() {
    //     return this._fontSize;
    // }


/*   
}



Хозяин, [09.09.2022 12:29]
export class LineInfo extends DCont {
    constructor(dCont, x, y, fun, par) {
        super(); 
        this.type = 'LineInfo';  
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        this.x = x  0;
        this.y = y  0;
        this.fun = fun
        this.par = par
        var self = this;
        this._height=200;
        this._width=200;
        var otstup=this.par.param.otstup


        this.array=[]
        this.arrayCech=[]


        this.panel=new DPanel(this, 0,0);

        this.panelM=new DPanel(this, otstup,otstup);
        this.panelM.height=otstup*2+24;

        this.panelXZ=new DPanel(this, otstup,otstup);


        this.bmd=new DBitmapData(this._width,this._height)
        var canvas = this.bmd.canvas;
        var ctx =this.bmd.ctx;
        this.panelXZ.content.div.appendChild(canvas)






        this.button=new DButton(this.panelM,otstup,otstup,"",function(){
            self.creat()
            self.fun();
        } )
        this.button.width=this.button.height=24;      
       
        mhbd.getKeyId("info",54,function(e){
            self.button.link=mhbd.getLink(e.icon);
            //self.button.text=e.name;
            mCPodskazka.setBuuton(self.button,e)            
        }) 

        this.button1=new DButton(this.panelM,otstup*2+24,otstup,"",function(){
            self.minus()
            self.fun();
        })
        this.button1.width=this.button1.height=24;      
       
        mhbd.getKeyId("info",55,function(e){
            self.button1.link=mhbd.getLink(e.icon);
            //self.button1.text=e.name;
            mCPodskazka.setBuuton(self.button1,e)            
        }) 

        this.button2=new DButton(this.panelM,otstup*3+48,otstup,"",function(){
            self.clear()
            self.fun();
        } )
        this.button2.width=this.button2.height=24;      
       
        mhbd.getKeyId("info",56,function(e){
            self.button2.link=mhbd.getLink(e.icon);
            //self.button2.text=e.name;
            mCPodskazka.setBuuton(self.button2,e)            
        }) 



        this.mouseup = function (e) {
            document.removeEventListener('mouseup', self.mouseup);
            dcmParam.removeFunMove(self.mousemove);
        }
        this.mousemove = function (e) {
            
            let x=Math.round((e.clientX-rect.x-xx)/10)*10
            let y=Math.round((e.clientY-rect.y-yy)/10)*10
            let bbbb=false
            
            if(x!==bat.x){
                bat.x=x;
                bbbb=true
            } 
            if(y!==bat.y){
                bat.y=y;
                bbbb=true
            }
            if(bbbb){
                self.draggg();
                self.fun();
            }
            
            
        }    
        var oo={x:0,y:0,s:0}
        var rect=null
        var bat
        this.sob=function(){
            bat=this;

            self.panelXZ.xyp.x=0
            self.panelXZ.xyp.y=0
            self.panelXZ.funXYP(self.panelXZ, self.panelXZ.xyp) 

            rect=self.panelXZ.div.getBoundingClientRect();

            document.addEventListener('mouseup', self.mouseup);
            dcmParam.addFunMove(self.mousemove);
        }


        this.getArr=function(){
            let a=[]
            for (var i = 0; i < this.array.length; i++) {
                let o={}
                o.x=this.array[i].xx;
                o.y=this.array[i].yy;
                a.push(o);
            }
            return a
        }


        this.minus=function(){
            if(this.array.length<=2)return;
            this.array[1].visible=false;
            this.array.splice(1,1)
            this.draggg()

        }

Хозяин, [09.09.2022 12:29]
this.dCont=new DCont(this.panelXZ.content)
        var bbb
        this.creat=function(){            
            for (var i = 0; i < this.arrayCech.length; i++) {
                if(this.arrayCech[i].visible==false){
                    this.arrayCech[i].visible=true;
                    this.array.splice(1,0,this.arrayCech[i]); 
                    if(this.array[2]!=undefined){
                        this.array[1].x=(this.array[0].x+this.array[2].x)/2
                        this.array[1].y=(this.array[0].y+this.array[2].y)/2
                    }                   
                    return this.arrayCech[i];
                }
            }

            bbb=new DButton(this.dCont,0,0," ");
            bbb.fun_mousedown =this.sob

            bbb.height=bbb.width=20
            bbb.borderRadius=20
            bbb.panel1.x=bbb.panel1.y=bbb.panel.x=bbb.panel.y=-10;
           // bbb.panel1.div.style.border= '3px solid #ff0000'// + dcmParam.compToHexArray(dcmParam.hexDec(bbb._color), -20);//"none";


            //bbb.panel.dCont.div.style.border = 3+'px solid #ff0000' 
            //bbb.panel.dCont.div.style.width = (bbb.panel._width-3*2)  + 'px';
            //bbb.panel.dCont.div.style.height = (bbb.panel._height-3*2)  + 'px';


            bbb.idArr=this.arrayCech.length
            this.arrayCech.push(bbb)

            if(this.array.length>1){
                trace("==",this.array)
                this.array.splice(1,0,bbb);
                if(this.array[2]!=undefined){
                    this.array[1].x=(this.array[0].x+this.array[2].x)/2
                    this.array[1].y=(this.array[0].y+this.array[2].y)/2
                }   
            }else{
                this.array.push(bbb);
            }

            
            this.draggg();
            return bbb
        }

        
        this.clear=function(){
            for (var i = this.array.length - 1; i >= 0; i--) {
                if(i==0){
                    this.array[i].x=0;
                    this.array[i].y=0;
                    continue
                }
                if(i==1){
                    this.array[i].x=0;
                    this.array[i].y=ww/2;
                    continue
                }

                this.array[i].visible=false;
                this.array.splice(i,1);
            }
            this.draggg()
        }




        this.reDrag=function(){
            this.panel.width=this._width;
            this.panel.height=this._height;
            this.panelM.width=this._width-otstup*2
            this.reDrag2()
        }


        var ww=100;
        var hh=100;
        var xx=100;
        var yy=100;
        this.reDrag2=function(){
            ww=this._width-otstup*2;
            ww=Math.floor(ww/20)*20;
            hh=this._height-this.panelM.height-otstup*2;
            hh=Math.floor(hh/20)*20;

            xx=ww/2;
            yy=hh/2;

            this.panelXZ.width= ww 
            this.panelXZ.height= hh 

            this.panelXZ.x=(this._width-ww)/2
            this.panelXZ.y=this.panelM.height+otstup*2+(this._height-hh-this.panelM.height-otstup*2)/2

            canvas.width=ww+1;
            canvas.height=hh+1

            this.dCont.x=xx;
            this.dCont.y=yy;
            trace(ww,hh)
            
            this.clear();
        }

        this.draggg=function(){
            clear()
            setka(      10,             1,  null,    );
            pointXY(    {x:0,y:0},      2,  null,     );

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].xx= this.array[i].x/xx;
                this.array[i].yy= this.array[i].y/yy;

                if(i!==0){
                    line(
                        { x:this.array[i].x, y:this.array[i].y}, 
                        { x:this.array[i-1].x, y:this.array[i-1].y}, 
                        10)
                }
            }
        }



        var sah11=10
        var _color="#bbbbbb"
        function setka(sah,depth,pxz,color,alpha){
            if(!color)color=_color

Хозяин, [09.09.2022 12:29]
ctx.beginPath();
            ctx.lineWidth = depth+"";
            ctx.strokeStyle = color;
            for (var i = 0; i < hh+sah; i+=sah) {
                ctx.moveTo(ww, i);
                ctx.lineTo(0, i);
            }
            for (var i = 0; i < hh+sah; i+=sah) {
                ctx.moveTo(i,   ww);
                ctx.lineTo(i,   0);
            }               

            ctx.stroke();
        }

        function pointXY(point,depth,pxz,color,alpha){
            if(!color)color=_color

            ctx.beginPath();
            ctx.lineWidth = depth+"";
            ctx.strokeStyle = color;
            ctx.moveTo(point.x+xx,   hh);
            ctx.lineTo(point.x+xx,   0);
            ctx.moveTo(0,-point.y+yy);
            ctx.lineTo(ww,-point.y+yy);
            ctx.stroke();
        }

         function line(point,point1,depth,pxz,color,alpha){
            if(!color)color=_color

            ctx.beginPath();
            ctx.lineWidth = depth+"";
            ctx.strokeStyle = color;
            ctx.moveTo(point.x+xx,   point.y+yy);
            ctx.lineTo(point1.x+xx,   point1.y+yy);            
            ctx.stroke();
        }

        function point(point,depth,pxz,color,alpha){
            if(!color)color=_color
            ctx.beginPath();
            ctx.lineWidth = depth+"";
            ctx.strokeStyle = color;
          

            ctx.arc(point.x+xx, -point.y+yy, pxz, 0, 2*Math.PI, false);
            ctx.stroke();
        }


        function clear(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        }


        this.reDrag()

        this.creat();
        this.creat();
        

    }
    set x(value) {
        this.position.x = value;
    }
    get x() {
        return this.position.x;
    }
    set y(value) {
        this.position.y = value;
    }
    get y() {
        return this.position.y;
    }
    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.reDrag();
        }
    }
    get height() {
        return this._height;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.reDrag();
        }
    }
    get width() {
        return this._width;
    }
}

*/