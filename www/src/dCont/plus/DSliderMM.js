import { DCont } from '../DCont.js';


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
        this._height = 16;//+12

        this.fun = fun;
        this.funChange = undefined;
        this._borderRadius = 0;
        this._color = dcmParam._color; //"#008CBA";

        this._min = 0;
        this._max = 100;

       
        this._value2 = 100;

        this._otstup = 2;
        this._value = 0; // округление value  //Fixe clinear
        this._okrug = 100; // округление value

        this._value = 0; // округление value

        this.mm = 10000000000000000000000;//Fixe clinear

        this.pan = new DPanel(this, 0, this._otstup);
        this.pan.width = this._width;
        this.pan.height = this._height - this._otstup * 2;
        this.pan.color1 = dcmParam.compToHexArray(
            dcmParam.hexDec(dcmParam._color1),
            -20
        );
        this.pan.tip = 0;

        



        this.panel = new DPanel(this, 0, 0);
        this.panel.width = this.panel.height = this._height;
        this.panel.color1 = this._color;
        this.panel.div.style.cursor = 'pointer';
        this.panel.tip = 1;
        this.panel.div.xzTip=1

        this.label=new DLabel(this.panel,0,-12,"")
        this.label.activMouse=false;
        this.label.fontSize=10;



        this.panel2 = new DPanel(this, 0, 0);
        this.panel2.width = this.panel2.height = this._height;
        this.panel2.color1 = this._color;
        this.panel2.div.style.cursor = 'pointer';
        this.panel2.tip = 2;
        this.panel2.div.xzTip=2

        this.label2=new DLabel(this.panel2,this.panel2.width-100,-12,"xz")
        this.label2.activMouse=false;
        this.label2.fontSize=10;
        this.label2.textAlign="right"

        //this.panel.borderRadius = 50;

        //this.pan.borderRadius = 50;

        this.setMM = function (min,max) {
            this.min=min;
            this.max=max;
            this.value=min;
            this.value2=max;
        }

        this.borderRadius = dcmParam.borderRadius;

        var xx, xxx;
        this.naValue = function (n) {
            xx =(n * ((this._height + self._width) / self._width) -
                    this._height / 2) /
                self._width;
            xxx = this._max - this._min; 

            let ww= this._min + xxx * xx;
            if(ww>this.value2) ww=this.value2               
            this.value = ww;
        };

         this.naValue2 = function (n) {            
            xx =(n * ((this._height + self._width) / self._width) -
                    this._height / 2) /
                self._width;
            xxx = this._max - this._min;  
            let ww= this._min + xxx * xx;
            if(ww<this.value) ww=this.value        
            this.value2 = ww;
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
            
            if (sp == undefined) {
                sp = {
                    x: e.clientX,
                    value: self.panel.x,
                    value2: self.panel2.x,
                    b: false,
                };
            }
            ss = (e.clientX - sp.x) / self.scaleDrag.s;
         
            if(b2==false){
                self.naValue(sp.value + ss + self._height / 2);
            }else{
                self.naValue2(sp.value2 + ss + self._height / 2);
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
                self.naValue(e.offsetX);
                if (self.fun) self.fun();
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
                        self.naValue2(e.offsetX);
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

                            self.naValue(rr1);
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

            this.panel2.div.addEventListener(
                'mousedown',
                self.mousedown.bind(this.panel2)
            );



            this.pan.div.xz = true;
        } else {
            this.panel.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this)
            );
            this.pan.div.addEventListener(
                'touchstart',
                self.mousedown.bind(this)
            );
            this.pan.div.xz = true;
        }

        this._width++;
        this.width = this._width - 1;
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
        }
    }
    get width() {
        return this._width;
    }

    set height(v) {
        if (this._height != v) {
            this._height = v;

            this.pan.height = this._height - this._otstup * 2;
            this.panel.height = this.panel.width = this._height;
            this.panel2.height = this.panel2.width = this._height;
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
        this.panel.x = (this.pan.width - this._height) * xxx;

        this.label.text=this._value;

    }
    get value() {
        return this._value;
    }


    set value2 (v) {
        v = Math.round(v * this._okrug) / this._okrug;
        if (v > this._max) v = this._max;
        if (v < this._min) v = this._min;
        this._value2 = v;
        var xx = v - this._min;
        var xxx = xx / (this._max - this._min);
        this.panel2.x = (this.pan.width - this._height) * xxx;
        this.label2.text=this._value2;
    }
    get value2() {
        return this._value2;
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
        }
    }
    get min() {
        return this._min;
    }

    set max(v) {
        if (this._max != v) {
            this._max = v;
            this.value = this._value;
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
}