import { DCont } from '../DCont.js';


export class DThreeButton extends DCont {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super();
        this.type = 'DThreeButton';
        this.dcmParam = dcmParam;
        this.dcmParam.add(this);
        var self = this;

        this._text = _text || 'null';
        this.fun = _fun;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        this.x = _x || 0;
        this.y = _y || 0;

        this.fun_mouseover = undefined;
        this.fun_mouseout = undefined;
        this.fun_mousedown = undefined;
        this.fun_mouseup = undefined;
        this.funDownFile = undefined;
        this.funReDrag = undefined;
        this._activMouse = true;
        this._textAlign = 'left';
        this._link = 'null';

        this._glowColor = '#000000';
        this.aC = [1, 1, 1];
        this._glowSah = 0;

        this._width = 100;
        this._height = dcmParam.wh;
        this._color = dcmParam._color;
        this._colorText = dcmParam._colorText;
        this._fontSize = dcmParam._fontSize;
        this._fontFamily = dcmParam._fontFamily;
        this._borderRadius = 0;
        this._boolLine = dcmParam._boolLine;
        this._boolFond = true;
        this._scalePic = 0;

        this.alphaTeni = 0.1;

        this.aSah = 1;
        this.alphaAnimat = true;

        this.object = {};
        this.object.style = {};

        this.dCont = new DCont(this);
        this.dContC = new DCont(this.dCont);

        this.panel1 = new DPanel(this.dCont, 0, 0);
        this.panel1.width = this._width + 1;
        this.panel1.height = this._height + 1;
        this.panel1.color1 = this._color;

        this.panel = new DPanel(this.dCont, 2, 2);
        this.panel.width = this._width - 1;
        this.panel.height = this._height - 1;
        this.panel.color1 = this._color;
        this.panel.div.style.pointerEvents = 'none';
        this.panel.boolLine = false;

        // this.panel1.alpha=0

        this.panel.div.style.borderRadius = this._borderRadius + 'px';
        this.panel1.div.style.borderRadius = this._borderRadius + 'px';

        this.label = new DLabel(this.dCont, 5, (this._height - this._fontSize) / 2, _text);
        this.label.div.style.pointerEvents = 'none';

        this.label.color = this._colorText;
        this.label.textAlign = this.textAlign;
        this.panel1.div.style.cursor = 'pointer';
        this.label.fontFamily = this._fontFamily;

        this.mouseup2 = function () {
            self.file.value = null;
            self.file.click();
            if (self.funDownFile) self.funDownFile();
            document.removeEventListener('touchend', self.mouseup2);
        };

        this.eventOriginal = undefined;
        this.mousedown = function (e) {
            self.eventOriginal = e;
            if (self._activMouse == false) return;
            if (self.file != undefined) {
                self.file.value = null;
                self.file.click();
                if (self.funDownFile) self.funDownFile();

                if (dcmParam.mobile == true) {
                    document.addEventListener('touchend', self.mouseup2);
                }
                return;
            }
            bb = false;
            self.panel.color1 = dcmParam.compToHexArray(
                dcmParam.hexDec(self._color),
                -20
            );
            self.panel1.color1 = dcmParam.compToHexArray(
                dcmParam.hexDec(self._color),
                -40
            );
            document.body.style.pointerEvents = 'none';

            if (self.fun_mousedown) self.fun_mousedown();
            if (dcmParam.mobile == false) {
                document.addEventListener('mouseup', self.mouseup);
            } else {
                document.addEventListener('touchend', self.mouseup);
            }
        };

        var bb = true;
        this.mouseup = function (e) {
            bb = true;
            self.panel.color1 = self._color;
            self.panel1.color1 = self._color;
            document.body.style.pointerEvents = null;
            if (dcmParam.mobile == false) {
                document.removeEventListener('mouseup', self.mouseup);
            } else {
                document.removeEventListener('touchend', self.mouseup);
            }

            if (self.fun) self.fun();
        };

        var timerId;
        this.dragIcontime = function () {
            self.dCont.alpha = self.aSah;
            if (self.aSah > 1) {
                self.aSah = 1;
                if (timerId != undefined) {
                    clearInterval(timerId);
                    timerId = undefined;
                }
                return;
            }

            if (timerId == undefined) {
                timerId = setInterval(this.dragIcontime, 10);
            } else {
                self.aSah += 0.01;
            }
        };

        this.dragIcon = function () {
            if (this.alphaAnimat == true) {
                if (this.aSah == 1) {
                    this.aSah = 0.5;
                    this.dragIcontime();
                }
            }
        };

        this.mouseover = function () {
            if (self._activMouse == false) return;
            if (bb == true) {
                self.panel.color1 = dcmParam.compToHexArray(
                    dcmParam.hexDec(self._color),
                    -20
                );
                self.panel1.color1 = dcmParam.compToHexArray(
                    dcmParam.hexDec(self._color),
                    -20
                );
            }

            if (self.fun_mouseover) self.fun_mouseover();
        };
        this.mouseout = function () {
            if (self._activMouse == false) return;
            if (bb == true) {
                self.panel.color1 = self._color;
                self.panel1.color1 = self._color;
            }
            if (self.fun_mouseout) self.fun_mouseout();
        };

        if (dcmParam.mobile == false) {
            this.panel1.div.addEventListener('mousedown', self.mousedown);
            this.panel1.div.addEventListener('mouseover', self.mouseover);
            this.panel1.div.addEventListener('mouseout', self.mouseout);
        } else {
            this.panel1.div.addEventListener('touchstart', self.mousedown);
        }

        this.boolDrahVert = true;
        var sp = 5;
        var ww, ww1;
        this.image = undefined;
        this.reDrag = function () {
            this.panel.width = this._width// - 1;
            this.panel1.width = this._width// + 1;

            this.panel.height = this._height// - 1;
            this.panel1.height = this._height// + 1;

            sp = 5;
            var s;
            if (this.image != undefined) {
                s = this._height / this.image.picHeight;
                if (this._width / this.image.picWidth < s)
                    s = this._width / this.image.picWidth;

                if(this._scalePic!==0){
                    s=this._scalePic;
                }

                this.image.height = this.image.picHeight * s;
                this.image.width = this.image.picWidth * s;
                sp = this.image.width + 5;

                this.image.x = 0;
                this.image.y = (this._height - this.image.height) / 2;
            }
            let b = true;

            if (this.image != undefined) {
                if (this._height > self.label.fontSize * 3) {
                    if (self.label.value.length >= 1) {
                        b = false;
                    }
                }
            }
            if (this.boolDrahVert == false) b = true;

            var ppp = 0;
            if (this.image) ppp = this.image.width
            
            if (b) {
                this.label.width = this._width - sp;
                self.label.y = (this._height - this._fontSize) / 2;
                self.label.x = ppp+5;
            } else {
                s = (this._height - self.label.fontSize * 2) / this.image.picHeight;
                if (this._width / this.image.picWidth < s)
                    s = this._width / this.image.picWidth;

                if(this._scalePic!==0){
                    s=this._scalePic;
                }
                // this.image.height = this.image.picHeight * s;
                // this.image.width = this.image.picWidth * s;

                // this.image.x = (this._width - this.image.width) / 2;
                // this.image.y = 0;
                this.image.x = 0;
                this.image.y = (this._height - this.image.height) / 2;;

                this.label.width = this._width;
                self.label.y = (this._height - this._fontSize)/2;
                self.label.x = ppp+5;
            }

            if( this.image ) if ((this.width - this.image.width) < (this.label.value.length * this._fontSize)/2) this.label.visible = false
            if( this.image ) if ((this.width - this.image.width) > (this.label.value.length * this._fontSize)/2) this.label.visible = true

            this.dragCanvas();
            if (this.funReDrag != undefined) this.funReDrag();
        };

        this.file;
        this.startFile = function (accept) {
            if (this.file == undefined) {
                this.file = document.createElement('input');
                this.file.type = 'file';
                this.file.multiple = true;
                if (accept) this.file.accept = accept; // "image/*";
                this.file.style.display = 'none';
                this.file.onchange = this.onchange;
            }
        };
        this.result;
        this.files; // files
        this.onchange = function (e) {
            if (e.target.files.length == 0) return; // нечего не выбрали
            self.files = e.target.files;
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function (_e) {
                self.result = _e.target.result;
                if (self.fun) self.fun(self.result);
            };
        };

        this.funLoadImag = undefined;

        this.loadImeg = function (s) {
            this._link = s;
            if (this.image == undefined) {
                // this.panel1.parent.remove(this.panel1);
                this.image = new DImage(this.dCont, 0, 0, null, function () {
                    self.reDrag();
                    if (self.funLoadImag != undefined) self.funLoadImag();
                });
                this.image.div.style.pointerEvents = 'none';
                //this.add(this.panel1);
            }
            this.image.link = this._link;
        };
        if (_link != undefined) this.loadImeg(_link);
        this.borderRadius = dcmParam.borderRadius;

        this.rectPlus = { x: 0, y: 0, w: 0, h: 0 };
        this.canvas = undefined; // document.createElement('canvas');
        this.ctx = undefined; // canvas.getContext('2d');
        this.dragCanvas = function () {
            if (this.canvas == undefined) return;

            this.canvas.width =
                this.width + this.rectPlus.w + this._glowSah * 4;
            this.canvas.height =
                this.height + this.rectPlus.h + this._glowSah * 4;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this._glowSah == 0) return;
            this.ctx.filter = 'blur(' + this._glowSah + 'px)';
            this.ctx.fillStyle = this._glowColor;

            let rr = this._borderRadius;
            roundRect(
                this.ctx,
                this._glowSah * 2,
                this._glowSah * 2,
                this.width,
                this.height,
                rr
            );
            this.ctx.fillStyle = this._glowColor;
            this.ctx.fill();
            this.ctx.lineWidth = 0;

            this.dContC.x = this.rectPlus.x;
            this.dContC.y = this.rectPlus.y;
        };

        function roundRect(_ctx, x, y, width, height, radius) {
            if (width < 2 * radius) radius = width / 2;
            if (height < 2 * radius) radius = height / 2;
            _ctx.beginPath();
            _ctx.moveTo(x + radius, y);
            _ctx.arcTo(x + width, y, x + width, y + height, radius);
            _ctx.arcTo(x + width, y + height, x, y + height, radius);
            _ctx.arcTo(x, y + height, x, y, radius);
            _ctx.arcTo(x, y, x + width, y, radius);
            _ctx.closePath();
        }

        this.initCanvas = function () {
            if (this.canvas != undefined) return;
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.dContC.div.appendChild(this.canvas);
            //this.div.appendChild(this.canvas);
        };

        this.reDrag();
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

    set link(value) {
        if (this._link != value) {
            this._link = value;
            this.loadImeg(value);
        }
    }
    get link() {
        return this._link;
    }

    set glowColor(value) {
        if (this._glowColor != value) {
            this._glowColor = value;
            let o = dcmParam.parseColor(this._glowColor);
            this.aC[0] = o.r;
            this.aC[1] = o.g;
            this.aC[2] = o.b;
            this.dragCanvas();
        }
    }
    get glowColor() {
        return this._glowColor;
    }

    set glowSah(value) {
        if (this._glowSah != value) {
            this._glowSah = value;
            this.initCanvas();
            this.dragCanvas();
            this.canvas.style.top = -this._glowSah * 2 + 'px';
            this.canvas.style.left = -this._glowSah * 2 + 'px';
            this.canvas.style.position = 'fixed';
        }
    }
    get glowSah() {
        return this._glowSah;
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
    set scalePic(value) {
        if (this._scalePic != value) {
            this._scalePic = value;
            this.reDrag();
        }
    }
    get scalePic() {
        return this._scalePic;
    }
    set textAlign(value) {
        if (this._textAlign != value) {
            this._textAlign = value;
            this.label.textAlign = value;
            this.reDrag();
        }
    }
    get textAlign() {
        return this._textAlign;
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

    set boolLine(value) {
        if (this._boolLine != value) {
            this._boolLine = value;
            this.panel.boolLine = value;
            this.panel1.boolLine = value;
            // if (this._boolLine == true) {
            //     this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(self._color), -20);//"none";
            // } else {
            //     this.object.style.border= '0px solid'
            // }
        }
    }
    get boolLine() {
        return this._boolLine;
    }

    set boolFond(value) {
        if (this._boolFond != value) {
            this._boolFond = value;
            this.panel.visible = value;
            if (value == false) this.panel1.alpha = 0.01;
            else this.panel1.alpha = 1;
        }
    }
    get boolFond() {
        return this._boolFond;
    }

    set fontSize(value) {
        if (this._fontSize != value) {
            this._fontSize = value;
            this.label.y = (this._height - this._fontSize) / 2;
            this.label.fontSize = value;
            this.reDrag();
            // this.object.style.fontSize = value+"px";
        }
    }
    get fontSize() {
        return this._fontSize;
    }

    set fontFamily(value) {
        if (this._fontFamily != value) {
            this._fontFamily = value;
            this.label.fontFamily = value;
            //this.object.style.fontFamily= this._fontFamily;
        }
    }
    get fontFamily() {
        return this._fontFamily;
    }

    set color(value) {
        if (this._color != value) {
            this._color = value;
            this.panel.color1 = value;
            this.panel1.color1 = value;
            //this.object.style.background = this._color;
            //this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);
        }
    }
    get color() {
        return this._color;
    }

    set text(value) {
        if (this._text != value) {
            this._text = value;
            this.label.text = this._text;
            this.reDrag();
        }
    }
    get text() {
        return this._text;
    }

    set colorText(value) {
        if (this._colorText != value) {
            this._colorText = value;

            this.label.colorText1 = value;
            //this.object.style.color=this._colorText;
        }
    }
    get colorText() {
        return this._colorText;
    }

    set borderRadius(value) {
        if (this._borderRadius != value) {
            this._borderRadius = value;

            this.panel.borderRadius = this._borderRadius;
            this.panel1.borderRadius = this._borderRadius;

            this.dragCanvas();

            //this.object.style.borderRadius=this._borderRadius+"px";
            //this.object.style.webkitBorderRadius =this._borderRadius+"px";
            //this.object.style.mozBorderRadius =this._borderRadius+"px";
        }
    }
    get borderRadius() {
        return this._borderRadius;
    }

    set activMouse(value) {
        if (this._activMouse != value) {
            this._activMouse = value;
            if (value == true) {
                this.alpha = 1;
                this.panel1.div.style.cursor = 'pointer';

                this.div.style.pointerEvents = null;
            } else {
                this.alpha = 0.55;
                //this.object.style.pointerEvents="none";
                this.panel1.div.style.cursor = 'auto';
                this.div.style.pointerEvents = 'none';
            }
        }
    }
    get activMouse() {
        return this._activMouse;
    }
}