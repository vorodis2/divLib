//import { DCont } from '../DCont.js';


export class DSliderMM extends DCont {
    constructor(dCont, _x, _y, fun) {
        super();
        this.type = 'DSliderMM';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        var self = this;
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        this._width = 100;
        this.wh=20
        this.OTEXT=12;
        this._height = this.wh+this.OTEXT;
        this._colorText1=dcmParam._colorText1;
        this._colorText=dcmParam._colorText;

        this.fun = fun;
        this.funChange = undefined;
        this._borderRadius = 0;
        this._color = dcmParam._color; //"#008CBA";

        this._min = 0;
        this._max = 100;
        this._mobile=dcmParam.mobile;
        



        this._otstup = 2;
        //this._okrug = 100; // округление value
        this._okrug = 1; // округление value
        this._value = 0; // округление value
        this._value1 = 100;

        this.mm = 10000000000000000000000;

        this.pan = new DPanel(this, 0, 0);
        this.pan.color1 = dcmParam.compToHexArray(
            dcmParam.hexDec(dcmParam._color1),
            -20
        );
        this.pan.tip = 0;

        


        this.panel = new DPanel(this, 0, 0);
        this.panel.color1 = this._color;
        this.panel.div.style.cursor = 'pointer';
        this.panel.tip = 1;
        this.panel.div.xzTip=1

        this.label=new DLabel(this.panel,0,0,this._value+"")
        this.label.activMouse=false;
        this.label.fontSize=10;

        
        
        this.panel1 = new DPanel(this, 0, 0);
        this.panel1.color1 = this._color;
        this.panel1.div.style.cursor = 'pointer';
        this.panel1.tip = 2;
        this.panel1.div.xzTip=2
        

        this.label1=new DLabel(this.panel1, 0,0,this._value1)
        this.label1.activMouse=false;
        this.label1.fontSize=10;
        this.label1.textAlign="right"
       
         
        //this.panel.borderRadius = 50;
        //this.pan.borderRadius = 50;


        this.dragMobile = function(){
            if (this._mobile) {
                this.wh=this._height
                this.pan.y = this._otstup;
                this.label1.y = this.label.y =(this._height-this.label.fontSize)/2// (this._height - (this._height - this.wh)) / 2 -  this._otstup * 3;
                this.panel.y=this.panel1.y=0
                this.label.colorText1=this._colorText;
                this.label1.colorText1=this._colorText;
            }else{
                this.wh=this._height-this.OTEXT
                this.pan.y = this._otstup+this.OTEXT;
                this.label1.y = this.label.y =-this.OTEXT
                this.panel.y=this.panel1.y=this.OTEXT
                this.label.colorText1=this._colorText1;
                this.label1.colorText1=this._colorText1;
            }

            this.pan.height = this.wh - this._otstup * 2;
            this.panel.height = this.panel.width = this.wh;
            this.panel1.height = this.panel1.width = this.wh;
            this.value1 = this._value1;
            this.label1.x=this.wh-100;

        }
        this.dragMobile()


        this.setMM = function (min,max) {
            this.min=min;
            this.max=max;
            if(this.min==this.max){
               // this.max+=0.001
            }
            this.value=min;
            this.value1=max;

           /* if(this.min==this.max){
                this.panel.activMouse=false;
                this.panel1.activMouse=false;
            }else{
                this.panel.activMouse=true;
                this.panel1.activMouse=true;
            }*/
        }

        //TODO
        /*this.comparison=function(){
            if (this._min==this._max) {
                this.panel.x=0;
                this.panel1.x=0
            }
        }*/



        this.borderRadius = dcmParam.borderRadius;

        var xx, xxx;
        this.naValue = function (n) {
            xx =(n * ((this._height + self._width) / self._width) -
                    this._height / 2) /
                self._width;
            xxx = this._max - this._min; 
            let ww= this._min + xxx * xx;
            if(ww>this.value1) ww=this.value1               
            this.value = ww;
        };

         this.naValue1 = function (n) {            
            xx =(n * ((this._height + self._width) / self._width) -
                    this._height / 2) /
                self._width;
            xxx = this._max - this._min;  
            let ww= this._min + xxx * xx;
            if(ww<this.value) ww=this.value        
            this.value1 = ww;
        };

        var sp;
        this.mouseup = function (e) {
            document.body.style.pointerEvents = 'auto';

            sp = undefined;
            if (dcmParam.mobile == false) {
                document.removeEventListener('mouseup', self.mouseup);
            } else {
                document.removeEventListener('touchend', self.mouseup);
            }
            dcmParam.removeFunMove(self.mousemove);

            if (self.funChange) self.funChange();
        };
        var b2=false
        var ss, sss;
        this.mousemove = function (e) {
            if (dcmParam.mobile == false) {
                if (sp == undefined) {
                    sp = {
                        x: e.clientX,
                        value: self.panel.x,
                        value1: self.panel1.x,
                        b: false,
                    };
                } 
                ss = (e.clientX - sp.x) / self.scaleDrag.s;
            } else {
                if (sp == undefined) {
                    sp = {
                        x: e.targetTouches[0].clientX,
                        value: self.panel.x,
                        value1: self.panel1.x,
                    };
                }
                ss = (e.targetTouches[0].clientX - sp.x) / self.scaleDrag.s;
            }

            if(b2==false){
                let s=sp.value + ss + self._height / 2;
                if(isNaN(s)==true)s=self._value                
                self.naValue(s);
            }else{
                let s=sp.value1 + ss + self._height / 2;
                if(isNaN(s)==true)s=self._value1
                self.naValue1(s);
            }
            
            if (self.fun) self.fun();
        };

        this.testScale = function (c, o) {
            if (c.scale) o.s *= c.scale;
            if (c.parent) {
                self.testScale(c.parent, o);
            }
        };

        this.scaleDrag = { s: 1 };

        this.xyp = { x: 0, y: 0 };
        this.getPosGlob = function (c2) {
            var rx = c2.x;
            var scal = 1;
            if (c2.scale) scal = c2.scale;

            if (c2.parent) {
                rx += this.getPosGlob(c2.parent) * scal;
            }
            return rx;
        };

        this.mousedown = function (e) {
            if (this.tip === 0) {
                var aa=self.panel.width/2
                let coords = e.target.getBoundingClientRect();
                let rr1 =(e.clientX - coords.x) / self.scaleDrag.s;
                var a=Math.abs(e.offsetX-self.panel.x+aa)*self.scaleDrag.s
                var a1=Math.abs(e.offsetX-self.panel1.x+aa)*self.scaleDrag.s
      
                if (a <= a1) {
                    self.naValue(e.offsetX);
                } else {
                    self.naValue1(e.offsetX);
                }
                if (self.fun) self.fun();
                return
            }
            

            b2=false
            if(this.tip==2){
                b2=true
                
            }
            self.scaleDrag.s = 1;
            self.testScale(self, self.scaleDrag);

            if (e.target.xz != undefined) {
                if (e.offsetX != undefined) {

                    b2=false
                    if(this.tip==1)self.naValue(e.offsetX);
                    if(this.tip==2){
                        b2=true
                        self.naValue1(e.offsetX);
                    }
                }
                else {
                    if (e.targetTouches)
                        if (e.targetTouches[0]) {
                         
                            //var rr=self.getPosGlob(self.pan)

                            self.xyp.x = 0;
                            self.xyp.y = 0;
                            self.funXYP(self.pan, self.xyp);
                            let coords = e.targetTouches[0].target.getBoundingClientRect();
                            let rr = self.xyp.x;
                            let rr1 =
                                (e.targetTouches[0].clientX - coords.x) /
                                self.scaleDrag.s;

                            //self.naValue(rr1);

                            b2=false
                            if(this.tip==1)self.naValue(rr1);
                            if(this.tip==2){
                                b2=true
                                self.naValue1(rr1);
                            }
                        }
                }
                if (self.fun) self.fun();
            }

            document.body.style.pointerEvents = 'none';

            if (dcmParam.mobile == false) {
                document.addEventListener('mouseup', self.mouseup);
            } else {
                document.addEventListener('touchend', self.mouseup);
            }
            dcmParam.addFunMove(self.mousemove);
        };

        if (dcmParam.mobile == false) {
            
            this.panel.div.addEventListener(
                'mousedown',
                self.mousedown.bind(this.panel)
            );
            this.pan.div.addEventListener(
                'mousedown',
                self.mousedown.bind(this.pan)
            );

            this.panel1.div.addEventListener(
                'mousedown',
                self.mousedown.bind(this.panel1)
            );



            this.pan.div.xz = true;
        } else {
            /*this.panel.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this)
            );
            this.pan.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this)
            );*/
            this.panel.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this.panel)
            );
            this.pan.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this.pan)
            );

            this.panel1.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this.panel1)
            );


            this.pan.div.xz = true;
        }

    }

    set x(v) {
        this.position.x = v;
    }
    get x() {
        return this.position.x;
    }
    set y(v) {
        this.position.y = v;
    }
    get y() {
        return this.position.y;
    }
    set width(v) {
        if (this._width != v) {
            this._width = v;
            this.pan.width = this._width;
            this.value = this._value;
            this.value1 = this._value1;
        
        }
    }
    get width() {
        return this._width;
    }

    set height(v) {
        if (this._height != v) {
            this._height = v;
            this.dragMobile()
        }
    }
    get height() {
        return this._height;
    }

    set borderRadius(value) {
        if (this._borderRadius != value) {
            this._borderRadius = value;
            this.panel.borderRadius = value;
            this.pan.borderRadius = value;
            this.panel1.borderRadius = value;
        }
    }
    get borderRadius() {
        return this._borderRadius;
    }

    set value(v) {
        v = Math.round(v * this._okrug) / this._okrug;
        if (v > this._max) v = this._max;
        if (v < this._min) v = this._min;
        this._value = v;
        var xx = v - this._min;
        var xxx = xx / (this._max - this._min);
        this.panel.x = (this.pan.width - this.wh*2) * xxx;
        this.label.text=this._value;

    }
    get value() {
        return this._value;
    }


    set value1 (v) {
        v = Math.round(v * this._okrug) / this._okrug;
        if (v > this._max) v = this._max;
        if (v < this._min) v = this._min;
        this._value1 = v;
        var xx = v - this._min;   
        var xxx = xx / (this._max - this._min); 
        this.panel1.x =  this.wh+(this.pan.width - this.wh*2) * xxx;
        this.label1.text=this._value1;
    }
    get value1() {
        return this._value1;
    }



    set okrug(v) {
        this._okrug = v;
        this.value = this._value;
    }
    get okrug() {
        return this._okrug;
    }

    set min(v) {
        if (this._min != v) {
            this._min = v;
            this.value = this._value;
            //this.object.value=(this._value-this._min)/(this._max-this._min)*this.mm
            //this.comparison()

        }
    }
    get min() {
        return this._min;
    }

    set max(v) {
        if (this._max != v) {
            this._max = v;
            this.value1 = this._value1;
            //this.comparison()
            //this.object.value=(this._value-this._min)/(this._max-this._min)*this.mm
        }
    }
    get max() {
        return this._max;
    }


    set activMouse(value) {
        if (this._activMouse != value) {
            this._activMouse = value;
            if (value == true) {
                this.alpha = 1;
                this.div.style.pointerEvents = null;
            } else {
                this.alpha = 0.7;
                this.div.style.pointerEvents = 'none';
            }
        }
    }
    get activMouse() {
        return this._activMouse;
    }


    set mobile(value) {
        if (this._mobile != value) {
            this._mobile = value;
            this.dragMobile()
            
        }
    }
    get mobile() {
        return this._mobile;
    }


    set colorText(value) {
        if (this._colorText1 != value) {
            this._colorText1 = value;
            this.dragMobile()
        }
    }
    get colorText() {
        return this._colorText1;
        
    }


    set colorTMobl(value) {
        if (this._colorText1 != value) {
            this._colorText = value;
            this.dragMobile()
        }
    }
    get colorTMobl() {
        return this._colorText;
    }
}