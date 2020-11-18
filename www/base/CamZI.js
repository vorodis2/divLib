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

        this.isSI=function(){

            const w = this.bmp._width;
            const h = this.bmp._height;

            const otstup = Math.floor(w/100);

            const points = []
            const rgba = this.bmp.arrRgba;

            this.bmp.getPixel(otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 - otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 - otstup, h - otstup);
            points.push([...rgba])
            this.bmp.getPixel(otstup, h - otstup);
            points.push([...rgba])

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