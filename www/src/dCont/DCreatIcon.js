
import { DCont } from './DCont.js';

export class DCreatIcon extends DCont{
    constructor(dCont, _x, _y, _text, _fun) {
        super();
        this.x=_x||0; 
        this.y=_y||0;
        this._sizeheight=10;
        this._sizeLine = 10;

        this.otstup = 5;
        this.widthV = 200;

        this.dcmParam=dcmParam; 
        this.dcmParam.add(this)
        var self=this
       
        // this._width=100;
        // this._height=dcmParam.wh;

        this.window=new DWindow(this, 0, 0)

        this.panel=new DPanel(this.window.content, this.otstup, this.otstup)
        this.panel.width=this.widthV 
        var yy=this.otstup
        var wh=35
        for (var i = 0; i < 4; i++) {
            let xx=i*(wh+this.otstup)
            
            this.b = new DButton(this.panel, this.otstup+xx, yy, ""+i) 
            this.b.width=this.b.height=wh          
        }

        this.panel.height=wh+this.otstup*2
        yy+=this.panel.height+this.otstup+100


        this.panel1=new DPanel(this.window.content, this.otstup, yy)

        yy+=this.panel1.height+this.otstup
        this.window.height=yy+32


        //this.window.width=this._width;
        //this.window.height=this._height;

        // this.panel=new DPanel(this.dCont, 2, 2)
        // this.panel.width=this._width-1;
        // this.panel.height=this._height-1;

        // this.reDrag=function(){
        //     this.panel.width=this._width-1;
        //     this.panel1.width=this._width+1;

        //     this.panel.height=this._height-1;
        //     this.panel1.height=this._height+1;

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this); 
        //this.b=new DButton(this, 0,0, _text) 

        if(dcmParam==undefined)dcmParam=new DCM();
        dcmParam.add(this);


        this._colorText1=dcmParam._colorText1;
        this.object = document.createElement('input');


        this._boolLine=dcmParam._boolLine;


       /* console.warn(dCont, _x, _y, _link, _fun)
        console.log(dCont, _x, _y, _link, _fun)
        console.error(dCont, _x, _y, _link, _fun)*/
        trace(dCont, _x, _y, _text, _fun)

    }
    // set width(value) {
    //     if(this._width!=value){
    //         this._width = value;
    //         this.reDrag()
           
    //     }       
    // }   
    // get width() { return  this._width;}
    

    // set height(value) {
    //     if(this._height!=value){
    //         this._height = value;
    //         this.reDrag();
            
    //     }       
    // }   
    // get height() { return  this._height;}



    set scale25x25(value) {
        if(this._boolLine!=value){
            this.b.x = 25
            this.b.y = 25
        }
    }   
    get scale25x25() {        
        return  this._boolLine;
    }




    set sizeLine(value) {
        if(this._sizeLine!=value){
            this._sizeLine = value;
            trace("hasd",value)
            this.panel1.width= this._sizeLine
        }
      }
    get sizeLine() { return  this._sizeLine;}


    set sizeheight(value) {
        if(this._sizeheight!=value){
            this._sizeheight = value;
            trace("hasd",value)
            this.b.y= this._sizeheight 
        }
      }
    get sizeheight() { return  this._sizeheight;}



    set colorText1(value) {
        if(this._colorText1!=value){                
            this._colorText1 = value;
            this._color = value;
            this.b.color=this._colorText1;          
        }
    }   
    get colorText1() {      
        return  this._colorText1;
    }
}



// import { DCont } from './DCont.js';

// export class DCreatIcon extends DCont {
//     constructor(dCont, _x, _y, _link, _fun) {
//       super();
//       this.type="DCreatIcon";
//       if(dcmParam==undefined)dcmParam=new DCM();
//       dcmParam.add(this);
//       var self=this;
//       this.x=_x||0; 
//       this.y=_y||0;
//       if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);  
//       this._width=100;
//       this._height=100;
//       this.picWidth = 100; // реальные размеры картинки
//     this.picHeight = 100; // реальные размеры картинки
//     this.funError = null;
//     this._link = null;
//     this.fun=_fun;

//     this._glowColor="#000000";
//     this.aC=[1,1,1]
//     this._glowSah=0;

//     this._s=1;
//     var dC=new DCont()
//     this.add(dC)

//     this.div2= document.createElement('div');
//     if(dcmParam.isIE==false)this.div2.style.position = 'fixed';
//     this.div2.style.top = '0px';
//     this.div2.style.left = '0px';       
//     this.div.appendChild(this.div2);


//     this.image = new Image();
//     this.div2.appendChild(this.image);
    
//     this.canvas = undefined// document.createElement('canvas');
//     this.ctx = undefined// canvas.getContext('2d');
//     this.image.ondragstart = function() { return false; };
//       this.loadError=function() {        
//          if (self.funError) self.funError();
//       }
//       this.loadComplit = function (e) {
//         self.picWidth = this.naturalWidth;
//           self.picHeight = this.naturalHeight;          
//           self._width++;
//           self._height++;           
//           self.width=self._width-1;
//           self.height=self._height-1;
//           self.dragCanvas()
//             if (self.fun) self.fun();
//       }

//       this.load = function () {
//         self.image.onerror = self.loadError; 
//           self.image.crossOrigin = "";
//         this.image.onload = self.loadComplit;    
//           self.image.src = self._link;
//           self.image.crossOrigin = "";
//       } 



//       this.dragCanvas=function(){
//         if(this.canvas==undefined)return
//         this.canvas.width = this.image.width+this._glowSah*4;
//           this.canvas.height = this.image.height+this._glowSah*4; 
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         if(this._glowSah==0)return
//         this.ctx.filter = 'blur('+this._glowSah+'px)'; 
//         this.ctx.drawImage(this.image, this._glowSah*2, this._glowSah*2, this.image.width, this.image.height);
        
//         var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

//         var pixels = imageData.data;
//           var n=1
//           for (var i = 0; i < pixels.length; i += 4) {
//               pixels[i]     = this.aC[0]; 
//               pixels[i + 1] = this.aC[1];  
//               pixels[i + 2] = this.aC[2];  
//           }         
//           this.ctx.putImageData(imageData, 0, 0);
//       }

//       this.initCanvas=function(){
//         if(this.canvas!=undefined)return
//         this.canvas = document.createElement('canvas');
//         this.ctx = this.canvas.getContext('2d');
        
//         //this.div2.removeChild(this.image);

//         dC.div.appendChild(this.canvas);
//         //this.div2.appendChild(this.image);
        

        
//       }

//       if(_link)this.link=_link;
//     }
    


//     set x(value) {this.position.x = value;} get x() { return  this.position.x;}
//   set y(value) {this.position.y = value;} get y() { return  this.position.y;}
//   set width(value) {
//     if(this._width!=value){
//       this._width = value;
//       this.image.width=this._width//(100/this.picWidth);
//       this.dragCanvas()
//       //this.drag()

//       //this.div.style.width=this._width+"px";
//       /*this.image.style.width=this._width+"px";*/
//     }   
//   } 
//   get width() { return  this._width;}




  
//   set glowColor(value) {
//     if(this._glowColor!=value){
//       this._glowColor = value;
//       let o=dcmParam.parseColor(this._glowColor)
//       this.aC[0]= o.r;
//       this.aC[1]= o.g;
//       this.aC[2]= o.b;    
//       this.dragCanvas();
//       trace()


//     }   
//   } 
//   get glowColor() { return  this._glowColor;}

//   set glowSah(value) {
//     if(this._glowSah!=value){
//       this._glowSah = value;
//       this.initCanvas();
//       this.dragCanvas();
//       this.canvas.style.top =-this._glowSah*2+'px';
//       this.canvas.style.left = -this._glowSah*2+'px'; 
//       this.canvas.style.position = 'fixed';

//     }   
//   } 
//   get glowSah() { return  this._glowSah;}

  

//   set height(value) {
//     if(this._height!=value){
//       this._height = value;
//       //this.drag()
//       this.image.height=this._height; 
//       this.dragCanvas()
//       //this.div.style.height=this._height+"px";
//     }   
//   } 
//   get height() { return  this._height;}

//   set link(value) {
//     if(this._link!=value){
//       this._link = value;
//       this.load();
//     }
//   } 
//   get link() {    
//     return  this._link;
//   }


// }