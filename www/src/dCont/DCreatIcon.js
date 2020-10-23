
import { DCont } from './DCont.js';

export class DCreatIcon extends DCont{
    constructor(dCont, _x, _y, _text, _fun) {
        super();
        var self=this
        this.type="DCreatIcon"

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;
        this.text=_text||"dfgre";    
        this.fun=_fun;
        this._wh=100

        this._sizeheight=10;
        this._glowSah = 10;
        this._glowColor = "#222222";
        this._lineSah = 10;
        this._lineColor = "#fafafa";


        this._xz = "22222";
        this.otstup = 5;
        this.widthV = 200;
        this.dCont=undefined

        this.dcmParam=dcmParam; 
        this.dcmParam.add(this);

        this.arrB3=[];
        this.arrBName3=[1, 2, 3];
        
        this.arrB=[];
        this.arrBName=[32, 64, 100, 256];


        this.arrB2=[];
        this.arrBLink=[
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADeSURBVFhH7c1bCsJAEERRF+Kn+9+Za4iBugmdwph5dEbBXOpn6IFzm77UBQ/rRPh5f2i8t50Cr+Q6DqFB8DxuS/mwees4L11wZ4bF8WMpEzYpjh+hNNikOH5sy4FN0rjtlACbp3Hbrxc2T+P2sS7YPI3bUe2weRq3ghph8zRuZbXA5mnciquGzdO41VQHm6dxq6wCNk/jVl8pbJ7Graki2DyNW2vHsHkat44OYPM0bn29h02K40d3Dhtj41NGFTA/ktrAJsXxI68/h+fM07il9jOwOpVU7+EBXfCgpukF7mMAsP/UTZIAAAAASUVORK5CYII=',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADZSURBVFhH7ZYxDsMgEARJnpDeZf7/oJTp8wW80iGI4MBwcFgmmcaIgtEuYPtmrTVncHfP6ZwmVqn6sz1p8Hi/aJAyWOyV37D6JfaYjQvY+d871UuIc5dn3VOdgqy5GpZInLvHLIqJcyUT16+6qWeglbjcM7h41a09A5XEhz2DAWJBXNArTq01cUGXWJaVEP7s5ZSVcUEs9iuyS5Qj1ltBELO71VTmMHE9TUrCHa7JVuASC8Qyn6dZ3OnzHO/xKFNE6QUCpZIVBHHk0FMSoerJ9H4kxPzFkzBmB4VMZGUyvWeIAAAAAElFTkSuQmCC',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD3SURBVFhH7Zc7DsMgEERJjpA+Ze5/oJTpcwUykhFCa3D2M9hK5NcYXPA0y4LsS845HcG1PHfnMPH0Ur/vjzJK6fZ6ltHsxK0VtNN/3GMRd6G+nCXuWlumiL9aAVkMpcYKmGKNsp4omlgZtMIRj6ztjQHaKefmWouFcg0hscMKomKfFTC72kRI7I4LmIn1VuAXj46QElpiU1zwm80VwSkWG2ytMzhLvRsecfAELxASOzoL2MTISokLDOKu0hcX9L9AWgeW3kjJFOuL6bYCKVZaI8qF4R5vLB23AltXQ0mxAm2pWb6KTNwV0K2gU2qhmWEFnD8JMyl9AKvTZ2HChis3AAAAAElFTkSuQmCC',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEISURBVFhH7ZcxDsIwDEULR2Bn5P4HYmTnCiVSIpTGjv0ctaUSfQsd7Lzkx6rKZZ7n6Rdcy+/unOLdCA/X+/4oTxW317M8YahY9Un4DnwxVNYQvXPHA9YE6bLEY9aM29uN2uhskuSVNbpYXcu9uVCXEvWYNaHW9PJALxBizfDKViw3yNfKyHr10M6Jo9YM6UJRb8FC3BuEAZpDy5WtE4/lDDlG1HtyimtWHHLJQrziGDeblisf9Y7H0iZdrVhmEnXLevUGUdTczSsVsbpBsqJa0xvY8DdXaFs9a8L6rua5qRjWhHXHdqeN2+sM15ibdPl/YTIwdr5RKv4SGl2DsHgt0AtkC/5NPE0fs1yBJXgILGYAAAAASUVORK5CYII='];

        var yy=this.otstup;
        var count,wh;
        var max_width;
        var scale = 320;
        var www
        this.init=function(){
            if(this.dCont!=undefined)return
            this.window=new DWindow(this, 0, 0); // Главное окно
            this.dCont=new DCont(this.window.content)



            this.dCont1=new DCont(this.window)
            this.dCont1.x=this.widthV+this.otstup * 2
            count = this.arrBName3.length;
            // wh= (this.widthV - ((this.otstup * 2) + (this.otstup * (count - 1)))) / count;
            wh = 32-this.otstup*2

            for (var i = 0; i < count; i++) {
                let xx=i*(wh+this.otstup);
                
                this.arrB3[i] = new DButton(this.dCont1, this.otstup+xx, this.otstup, ""+this.arrBName3[i], this.sob);
                this.arrB3[i].width=this.arrB3[i].height=wh; // размер кнопок
                this.arrB3[i].idArr=i;
                this.arrB3[i].tipe=0;
                //this.arrB3[i].value=this.arrBName[i];
            }
            this.slider2 = new DSliderBig(this.dCont1, count * (wh + this.otstup) + this.otstup, this.otstup);
            // yy += this.slider2.height + this.otstup
            this.bat =new DButton(this.dCont1, this.slider2.x+this.slider2.width+this.otstup);
            www=this.bat.x+this.bat.width
            yy=this.otstup;


            this.panel=new DPanel(this.dCont, this.otstup, yy + this.slider2.height + this.otstup);
            this.panel.width= this.widthV // ширина панели с кнопками

            this.scane = new DCScane(this)

            count = this.arrBName.length;
            wh= (this.widthV - ((this.otstup * 2) + (this.otstup * (count - 1)))) / count;
            for (var i = 0; i < count; i++) {
                let xx=i*(wh+this.otstup);
                
                this.arrB[i] = new DButton(this.panel, this.otstup+xx, yy, ""+this.arrBName[i], this.sob);
                this.arrB[i].width=this.arrB[i].height=wh; // размер кнопок
                this.arrB[i].idArr=i;
                this.arrB[i].tipe=0;
                //this.arrB[i].value=this.arrBName[i];
            }
            
            yy+=wh+this.otstup;

            this.panel1=new DPanel(this.panel.content, this.otstup, yy);
            this.color=new DColor(this.panel1, this.otstup, this.otstup, this._glowColor);

            this.slider=new DSliderBig(this.panel1, this.otstup, this.color.height + this.otstup * 2,function(){self.glowSah=this.value;},"glowSah",1,50);
            this.slider.value = this._glowSah
            
           
            this.panel1.height=this.color.height + this.slider.height + this.otstup * 3;
            this.panel1.width=this.panel.width - this.otstup * 2;
            this.color.width = this.slider.width = this.panel1.width - this.otstup * 2;
            
            yy+=this.panel.height;

            this.panel2=new DPanel(this.panel.content, this.otstup, yy);
            this.color1=new DColor(this.panel2, this.otstup, this.otstup, this._lineColor);

            this.slider1=new DSliderBig(this.panel2, this.otstup, this.color1.height + this.otstup * 2, function(){self.lineSah=this.value;},"lineSah",1,50);
            this.slider1.value = this._lineSah


            this.panel2.height=this.color1.height + this.slider1.height + this.otstup*3;
            this.panel2.width=this.panel.width - this.otstup * 2;
            this.color1.width = this.slider1.width = this.panel2.width - this.otstup * 2;


            yy+=this.panel2.height + this.otstup * 1;

            count = this.arrBLink.length;
            wh = (this.widthV - ((this.otstup * 2) + (this.otstup * (count - 1)))) / count;
            for (var i = 0; i < count; i++) {
                let xx=i*(wh+this.otstup);
                
                this.arrB2[i] = new DButton(this.panel, this.otstup+xx, yy, "", this.sob, this.arrBLink[i]);
                this.arrB2[i].width=this.arrB2[i].height=wh;
               // this.arrB2[i].idArr=i;
               //this.arrB2[i].tipe=0;
            }
            
            this.panel.height = (wh*2) + this.panel.height + this.panel2.height + (this.otstup * 4)



            // this.panel.height = yy; // высота панели с кнопками 
            //this.panel_paint(scale);


            // if (this.panel.height > this._wh) {
            //     max_width = this.panel.height;
            // } else {
            //     max_width = this._wh;
            // }


            // this.window.height=this.panel.height + 32 + (this.otstup * 2);
            this.window.height= this.slider2.height + this.panel.height + 32 + this.otstup * 3 ; // высота всего окна
            this.window.width= this.widthV + this.otstup * 3;  //+ this.width; ширина всего окна






            

            if(dcmParam==undefined)dcmParam=new DCM();
            dcmParam.add(this);


            // this._colorText1=dcmParam._colorText1;
            // this.object = document.createElement('input');


            // this._boolLine=dcmParam._boolLine;


           /* console.warn(dCont, _x, _y, _link, _fun)
            console.log(dCont, _x, _y, _link, _fun)
            console.error(dCont, _x, _y, _link, _fun)*/
            // trace(dCont, _x, _y, _text, _fun)


            this.wh=this.arrBName[0];
        }

        this.sob = function() {
            trace( '123', this.idArr, this.tipe, this.value, this);
            if (this.tipe == 0) {
                self.wh=self.arrBName[this.idArr]

            }
        }

        // this.panel_paint = function(scale) {
        //     var xx = this.widthV + this.otstup * 2;

        //     this.panel_paint=new DPanel(this.window.content, xx, this.otstup);
        //     this.panel_paint.height = this.panel_paint.width = scale


        //     if (this.panel.height > this.panel_paint.height) {
        //         max_width = this.panel.height;
        //     } else {
        //         max_width = this.panel_paint.height;
        //     }
        // }

        
        this.reDrag=function(){
            this.window.width=this.widthV + this._wh + this.otstup * 3;
        }
        this.init()
    }


    set wh(value) {
        if(this._wh!=value){
            this._wh = value;
            
            if(this.scane)this.scane.wh= value;
            for (var i = 0; i < this.arrBName.length; i++) {
                if(this.arrBName[i]==this._wh)this.arrB[i].alpha=0.5
                else this.arrB[i].alpha=1    
            }
            
            this.reDrag()
        }       
    }   
    get wh() { return  this._wh;}  


    set glowSah(value) { 
        if(this._glowSah!=value){  
            this._glowSah=value;
            this.slider.value = value;            
        }
    }   
    get glowSah() { return  this._glowSah}

    set glowColor(value) { 
        if(this._glowColor!=value){  
            this._glowColor=value;
            this.color.value = value;            
        }
    }   
    get glowColor() { return  this._glowColor;}


    set lineSah(value) { 
        if(this._lineSah!=value){  
            this._lineSah=value;
            this.slider1.value = value;            
        }
    }   
    get lineSah() { return  this._lineSah}

    set lineColor(value) { 
        if(this._lineColor!=value){  
            this._lineColor=value;
            this.color1.value = value;            
        }
    }   
    get lineColor() { return  this._lineColor;}
  


  
    set xz(value) { 
        if(this._xz!=value){  
            this._xz=value;
                     
        }
    }   
    get xz() { return  this._xz;}



}






export class DCScane{
    constructor(par) {        
        var self=this;
        this.type="DCScane";
        this.par = par;

        this._wh=this.par._wh;
        this.otstup =this.par.otstup;
        this.dCont=new DCont(par.dCont)
        this.dCont.x=this.par.widthV+this.otstup
        
        
        this.panel=new DPanel(this.dCont, this.otstup, this.otstup);

        this.reDrag=function(){
            this.panel.width=this.panel.height=this._wh;
        }
    }

    set wh(value) {
        if(this._wh!=value){
            this._wh = value;
           
            
            this.reDrag();
           
        }       
    }   
    get wh() { return  this._wh;}   


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