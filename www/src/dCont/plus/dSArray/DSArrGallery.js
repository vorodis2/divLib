import { DButtons } from './DButtons.js';

/*
     класс отвечающи за отрисовку масивов
*/


//достроеный класс галерий
export class DSArrGallery extends DGallery {
    constructor(dCont, x, y, fun,par) { 
        super(dCont, x, y, fun);         
        this.indexOld=-1;
        this.par=par
        this._wComp=this.par._wComp;
        this._otstup=this.par._otstup;
        this._wh=this.par._wh;
        var b=false


        this.createZamen=function(){ 
            var r=new BoxXZ(this.content, 0, 0,null,this);  
            r.whPic=this._whPic; 
            r.finalLink=this.finalLink;
            return r
        }


        var ii, jj, ww, hh, bat, sahLoad, wM, hM, sliderOtstup;
        this.draw = function () {
            if (this.preDraw) this.preDraw();

            ii = 0;
            jj = 0;
            sliderOtstup = this.otstup1 + this.otstup * 2;
            ww = 1;
            if (this._kolII > this.array.length)ww = this.array.length * (this._widthPic) ;
            hh = this._heightPic + this._otstup * 2;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].x = ii * (this._widthPic);
                this.array[i].y = jj * (this._heightPic) ;
                if (this.array[i].x + this._widthPic + this._otstup > ww)ww = this.array[i].x + this._widthPic;
                hh = (jj + 1) * (this._heightPic) ;
                ii++;
                if (ii >= this._kolII) {
                    ii = 0;
                    jj++;
                }
            }


            if (ww > this._width) this.scrollBarH.visible = true;
            else this.scrollBarH.visible = false;

            if (hh > this._height) this.scrollBarV.visible = true;
            else this.scrollBarV.visible = false;


            this.scrollBarH.widthContent = ww;
            this.scrollBarV.heightContent = hh;


            if (ww > this._width) {
                wM = this._width;
            } else {
                wM = ww;
            }
            if (hh > this._height) {
                hM = this._height;
            } else {
                hM = hh;
            }

            this.ww = ww;
            this.wM = wM;
            this.hh = hh;
            this.hM = hM;
            // this.scrollBarH     внизу
            // this.scrollBarV     сбоку

            //  this._boolPositScrol = true;//выворот положений
            // this._boolPositOtctup= true;//внутурь/наружу

            if (this._boolPositScrol) {
                if (this._boolPositOtctup) {
                    this.scrollBarH.y = hM - this.otstup - this._otstup1+this.zScrol;
                    this.scrollBarV.x = wM - this.otstup - this._otstup1+this.zScrol;
                } else {
                    this.scrollBarH.y = hM + this.otstup+this.zScrol;
                    this.scrollBarV.x = wM + this.otstup+this.zScrol;
                }


            } else {
                if (this._boolPositOtctup) {
                    this.scrollBarH.y = this.otstup+this.zScrol;
                    this.scrollBarV.x = this.otstup+this.zScrol;
                } else {
                    this.scrollBarH.y = -this.otstup - this._otstup1+this.zScrol;
                    this.scrollBarV.x = -this.otstup - this._otstup1+this.zScrol;
                }
            }

            if(this.panel!=undefined){          
                this.panel.width=this._width;
                this.panel.height=this._height;
            }

            // this.graphicsMask.clear();
            // this.graphicsMask.beginFill(0xff0000, 0);
            // this.graphicsMask.drawRect(0, 0, wM, hM);
            // this.graphicsMask.endFill();


            // if (this._boolWheel) {
            //  this.graphics.clear();
            //  this.graphics.beginFill(0xff0000, 0);
            //  this.graphics.drawRect(0, 0, ww, hh);
            //  this.graphics.endFill();

            // }
            this.dragIE()
            if (this.postDraw) this.postDraw();
        };


    }

    set wComp(value) {
        if (this._wComp != value) {
            this._wComp = value;
            for (var i = 0; i < this.arrayKesh.length; i++) {
                this.arrayKesh[i].wComp=this._wComp
            }
        }
    }
    get wComp() {
        return this._wComp;
    }


    set otstup(value) {
        if (this._otstup != value) {
            this._otstup = value;
            for (var i = 0; i < this.arrayKesh.length; i++) {
                this.arrayKesh[i].otstup=this._otstup
            }
        }
    }
    get otstup() {
        return this._otstup;
    }


    set wh(value) {
        if (this._wh != value) {
            this._wh = value;
            for (var i = 0; i < this.arrayKesh.length; i++) {
                this.arrayKesh[i].wh=this._wh
            }
        }
    }
    get wh() {
        return this._wh;
    }


}


//достроеный класс галерий

export function BoxXZ(_cont, _x, _y, _fun, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self = this;
    this.par=par
    this._wComp=this.par._wComp;
    this._otstup=this.par._otstup;
    this._wh=this.par._wh;
    this.arrLabel=[];
    this.arrImage=[];


    this.pKey=this.par.par.pKey
    this.chek=new DCheckBox(this,this._otstup,0," ",function(){
        self.object.bool=this.value
        if(self.object.bool){
            self.lab.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 144)
        }else{
            self.lab.color=dcmParam.color
        }
    })
    this.chek.y=this._wh-this.chek._height
    this.lab=new DLabel(this,this._otstup+3,0,"")
    this.lab.y=this._wh-11;
    this.lab.fontSize=8;
    this.lab.color=dcmParam.color//dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 20);
    this.lab.activMouse=false;


    var b,link;
    var bo
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        this.object = _obj;
        this.dragObj()
        let p=this.idArrKesh%2
        this.panel.boolLine=false
        this.panel.alpha=0.5
        if(p==0){ 
            this.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), -10);
            this.color1=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color1), -10);
            this.panel.color=this.color1
        }
        if(bo)this.mouseOver()
        
        self.funLoad();
        
    }



    var cc,qq,bb,aa,tl,gg
    this.dragObj=function(){
        if(this.visible==false)return

        this.lab.text=this.object.idArr+"";
        this.chek.value=this.object.bool;
        if(this.object.bool){
            this.lab.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 144)
        }else{
            this.lab.color=dcmParam.color
        }

         

        for (var i = 0; i < this.arrLabel.length; i++) {
            this.arrLabel[i].visible=false
        }

        for (var i = 0; i < this.arrImage.length; i++) {
            this.arrImage[i].visible=false
        }

        var ww=this._otstup*2+this._wh

        for (var i = 0; i < this.pKey.array.length; i++) {
            bb=this.pKey.array[i]
            if(bb.type=="PKBlokImage"){
                if(!this.object.aPram[i]){
                    continue
                }
                qq=this.getImage();
                qq.link=this.object.aPram[i];
                qq.x=ww;


/*
                if(qq.width!=this._wComp){
                    qq.height=this._wh-this._otstup*2;
                    qq.width=this._wh-this._otstup*2;
                    qq.x=this._otstup*2+this._wh+i*this._wComp
                    qq.y=1
                    qq.y=0
                    
                }
                // qq.y=(this._wh-qq._height-this._otstup*2)/2
                qq.y=this._otstup
                
                aa=this.getLab()
                tl =this.object.aPram[i].length
                aa.text=this.gettt(this.object.aPram[i],this.pKey.array[i].width 
                /////////////////////////
                //this.drawText(tl,aa)

                let bb = Math.floor((this._wComp-this._wh-this._otstup)/this.lab.fontSize)
                if (tl > bb) {
                   gg=aa.text.slice(tl-bb,tl)
                }else{
                    gg=aa.text
                }
                aa.text=gg
                /////////////////////////////////////
                aa.textAlign="left"
                if(aa.width!=this._wComp){
                    aa.width=this._wComp
                    aa.x=this._otstup+this._wh*2+i*this._wComp
                    aa.y=1
                    aa.y=0
                    
                }
                aa.x=this._otstup+this._wh*2+i*this._wComp
                aa.y=(this._wh-aa._height)/2
               */


            }else{

                if(this.object.aPram[i]!=null){  
                    cc=this.getLab()
                    cc.text=this.gettt(this.object.aPram[i],this.pKey.array[i].width-this._otstup*2) 
                    cc.width=this.pKey.array[i].width-this._otstup*2
                    cc.x=ww+this._otstup
                    cc.y=(this._wh-cc._height)/2
                }
                ///////////////////////////

/*
                tl =this.object.aPram[i].length
                let bb = Math.floor(this._wComp/this.lab.fontSize)
                if (tl > bb) {
                   gg=cc.text.slice(tl-bb,tl)
                }else{
                    gg=cc.text
                }
                cc.text=gg





                //////////////////////////////
                if(cc.width!=this._wComp){
                    cc.width=this._wComp
                    cc.x=this._otstup*2+this._wh+i*this._wComp
                    cc.y=1
                    cc.y=0
                    
                }*/
                
            }

            ww+=this.pKey.array[i].width
        }



    }

    this.getLab=function(){
        for (var i = 0; i < this.arrLabel.length; i++) {
            if(this.arrLabel[i].visible==false){
                this.arrLabel[i].visible=true;
                return this.arrLabel[i]
            }
        }
        let ll=new DLabel(this,0,0,"")
        ll.fontSize=dcmParam.fontSizeLitte
        ll.activMouse=false;
        ll.textAlign="center"

        this.arrLabel.push(ll)
        return ll
    }

    this.getImage=function(){
        for (var i = 0; i < this.arrImage.length; i++) {
            if(this.arrImage[i].visible==false){
                this.arrImage[i].visible=true;
                return this.arrImage[i]
            }
        }
        let ss=new DImage(this,0,0)
        ss.height=this._wh-this._otstup*2;
        ss.width=this._wh-this._otstup*2;
        ss.activMouse=false;
        ss.textAlign="left"

        this.arrImage.push(ss)
        return ss
    }

    this.gettt=function(s,w){
        let ss=''
        let n = Math.floor(w/(this.lab.fontSize*0.8))

       
        if(n>=s.length){
            ss=s
        }else{
            ss=s.substr(0, n-2)+".."
            
        }
        

        return ss
    }


    this.drawText=function(tl,aa){

        
        let bb = this._wComp/this.lab.fontSize
        if (tl > bb) {
            let gg=aa.text.slice(tl-bb,tl)
        }
        
    }



    this.setPos = function (num) {  
    }


    this.isObj = function (_obj) {
        return true
    }
  

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;
Object.defineProperties(BoxXZ.prototype, {

    wComp: {
        set: function (value) {
            if (this._wComp != value) {
                this._wComp = value; 
                this.dragObj()

                      
        }

        },
        get: function () {
            return this._wComp;
        }
    },


    otstup: {
        set: function (value) {
            if (this._otstup != value) {
                this._otstup = value; 
                this.chek.x=this._otstup;
                this.lab.x=this._otstup+3;
                this.dragObj() 

        }

        },
        get: function () {
            return this._otstup;
        }
    },


    wh: {
        set: function (value) {
            if (this._wh != value) {
                this._wh = value; 
                this.chek.y=this._wh-this.chek._height;
                this.lab.y=this._wh-this.lab.height;
                this.dragObj()
                          
        }

        },
        get: function () {
            return this._wh;
        }
    }



   /* activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            if(this._activ==false)this.panel.color1=this._color1;
            else this.panel.color1=this._color;

            if(this.pPlus){
                if(this._activ==false)this.pPlus.visible=false
                else  this.pPlus.visible=true   
            }

        },
        get: function () {
            return this._activ;
        }
    },*/
})