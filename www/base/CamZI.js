// import { DPanel } from "../src/dCont/DCM";
// import { DCont } from "../src/dCont/DCont";

export class CamZI {
    constructor (_fun) {
        var self=this;        
        this.type = "DCam";
        this.fun=_fun;

        this.bmp = new DBitmapData(2, 2,null,function(){
            self.fun("complite");
        });

        this.load=function(url){
            this.bmp.load(url, true);
        }

        //проверка
        this.isSI=function(){
            const w = this.bmp._width;
            const h = this.bmp._height;

            const otstup = Math.floor(w/100);

            const points = []
            const rgba = this.bmp.arrRgba;
            //1
            this.bmp.getPixel(otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 - otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 - otstup, h - otstup);
            points.push([...rgba])
            this.bmp.getPixel(otstup, h - otstup);
            points.push([...rgba])
            //2
            this.bmp.getPixel(w/2 + otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w - otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w - otstup, h - otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 + otstup, h - otstup);
            points.push([...rgba])

            const maxSpread = 10;
            const maxRange = 50;

            let rgbPoint = points[0][0];
            if (rgbPoint > maxRange) return false;

            for (const point of points) {                
                if (point[3] != 255) return false;
                for (let i = 0; i < 3; i++) {
                    if (rgbPoint + maxSpread < point[i]) return false;
                    if (rgbPoint - maxSpread > point[i]) return false;
                }
            }                
            return true
        }


        var arr=[]
        var c,n,n1;
        this.create = function() {           
            var ii=this.bmp.width
            var jj=this.bmp.height  
           /* var jj=51//this.bmp.height          
            for (let j = 50; j < jj; j++) {*/
        
            for (let j = 0; j < jj; j++) {

                arr.length=0;
                n=Math.abs(j/jj*2-1)
                n1=Math.sin(n*Math.PI/2)

                for (let i = 0; i < ii; i++) {
                    c=this.bmp.getPixel(i, j);
                    //this.bmp.setPixel(i, j,[255*Math.random(),255*Math.random(),255*Math.random(),255]);
                    arr.push([...c]);
                    
                }
                ///arr-полоса фото
                this.create1(arr,n1,j)
                
            }
            this.bmp.upDate(); 





            //this.bmp.ctx.clearRect(0, 0, this.bmp.canvas.width, this.bmp.canvas.height);
            //this.bmp.ctx.fillStyle = '#568777'
            //this.bmp.ctx.fillRect(0, 0, 200, 200);
            

        }
        var aa,aa1
        this.create1 = function(arr,num,_j) {
            
            aa=[]
            for (let i = 0; i < arr.length/4; i++) {
                aa.push(arr[i])
            }
            //aa изменен
            this.create2(aa,num,true)

            for (let i = 0; i < arr.length/4; i++) {
                this.bmp.setPixel(i, _j, aa[i]);
            }

            
        }
        this.debag=undefined
        var a1=[]
        var a2=[]
        var pxx,sah
        this.create2 = function(arr,num,bool) {
            //console.log("arr.length  ",arr.length)
            var p= Math.round(arr.length*num)
            a1=[]
            a2=[]
           
           // if(this.debag)this.debag(arr)
           
            for (let i = p; i < arr.length; i++) {
                a1.push(arr[i])
            }
            pxx=a1.length/arr.length;
            console.log(pxx);
            sah=p;
            for (let i = 0; i < arr.length; i++) {
                let ss=Math.floor(sah)
                //console.log(arr[ss])
               // console.log(i+">",Math.round(sah)+" "+arr[ss][2])
                if(arr[ss]){
                    a2.push([arr[ss][0],arr[ss][1],arr[ss][2],arr[ss][3]])
                }else{
                    a2.push([arr[i][0],arr[i][1],arr[i][2],arr[i][3]])
                }
                
                sah+=pxx;
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i]=a2[i]
            }


           /* console.log(">>>>",pxx)

            setTimeout(function(){
                if(self.debag)self.debag(a1)
            },1000)

            setTimeout(function(){
                if(self.debag)self.debag(a2)
            },3000)*/

        }

        
      

    }
}






function resizeImageFile(b64, fun, w, h,_name, _wh) {            
    const img = new Image();
    img.onload = () => {
        //fun(img);
        const elem = document.createElement('canvas');

        if(_wh==undefined){
            if(_w!=undefined && _w > img.naturalWidth){
                fun(null);
                return;
            }
            elem.width = w==undefined ? img.naturalWidth : w;
            elem.height = h==undefined ? img.naturalHeight : h;
        }else{
            var s=img.naturalWidth/_wh;
            if(s<img.naturalHeight/_wh)s=img.naturalHeight/_wh;
            elem.width = Math.round(img.naturalWidth/s);
            elem.height = Math.round(img.naturalHeight/s);   
        }


    
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, elem.width, elem.height);

        // ctx.canvas.toBlob((blob) => {
        //     const image = new File([blob], name==undefined ? "icon.png" : name);
        //     fun(image);
        // }, 'image/png');

       /* var down = document.createElement('a');
        down.href = elem.toDataURL();
        down.download = 'pic.png';
        down.click();*/               
    }
    img.src = b64;           
}