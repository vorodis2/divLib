import { DCont } from "../src/dCont/DCont";

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

        ctx.canvas.toBlob((blob) => {
            const image = new File([blob], name==undefined ? "icon.png" : name);
            fun(image);
        }, 'image/png');

       /* var down = document.createElement('a');
        down.href = elem.toDataURL();
        down.download = 'pic.png';
        down.click();*/               
    }
    img.src = b64;           
}

export class DCam extends DCont {
    constructor (dCont, _x, _y, _link, _fun) {
        super();
        this.type = "DCam";
        
    }
}