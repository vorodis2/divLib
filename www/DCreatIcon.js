


export class DCreatIcon {
    constructor() {

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