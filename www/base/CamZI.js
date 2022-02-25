export class CamZI {
    constructor(_fun) {
        var self = this;
        this.type = 'DCam';
        this.fun = _fun;
        this._ot = 23;
        this.url;

        this.bmp = new DBitmapData(2, 2, null, function () {
            self.fun('complite');
        });

        this.load = function (url) {
            this.bmp.load(url, true);
            this.url = url;
        };

        this.getArr = function (ii, jj, w, h) {
            let arr = [];

            for (let j = 0; j < h; j++) {
                arr[j] = [];
                for (let i = 0; i < w; i++) {
                    arr[j][i] = [...this.bmp.getPixel(i + ii, j + jj)];
                }
            }
            return arr;
        };

        this.setArr = function (ii, jj, arr, isNeedUpdate) {
            for (let j = 0; j < arr.length; j++) {
                for (let i = 0; i < arr[j].length; i++) {
                    this.bmp.setPixel(i + ii, j + jj, arr[j][i]);
                }
            }
            if (isNeedUpdate) this.bmp.upDate();
        };

        this.mirroY = function (arr) {
            let resArr = [];
            for (let j = 0; j < arr.length; j++) {
                resArr[j] = [];
                for (let i = 0; i < arr[j].length; i++) {
                    resArr[j][i] = [...arr[j][i]];
                }
            }
            for (let j = 0; j < arr.length; j++) {
                for (let i = 0; i < arr[j].length; i++) {
                    arr[j][i] = resArr[arr.length - j - 1][i];
                }
            }
        };

        this.mirroX = function (arr) {
            let resArr = [];
            for (let j = 0; j < arr.length; j++) {
                resArr[j] = [];
                for (let i = 0; i < arr[j].length; i++) {
                    resArr[j][i] = [...arr[j][i]];
                }
            }
            for (let j = 0; j < arr.length; j++) {
                for (let i = 0; i < arr[j].length; i++) {
                    arr[j][i] = resArr[j][arr.length - i - 1];
                }
            }
        };

        this.korArr = function (arr, p) {
            let rez = [];
            let sah = arr.length * (1 - p);
            let sah2 = sah / arr.length;
            let sah3 = arr.length * p;
            //console.log(sah);
            let ii;
            for (let i = 0; i < arr.length; i++) {
                ii = Math.round(sah3 + i * sah2);
                if (ii > arr.length - 1) ii = arr.length - 1;
                rez[i] = [0, 0, 0, 0];
                //console.log(ii+"   "+arr[i]);
                rez[i][0] = arr[ii][0];
                rez[i][1] = arr[ii][1];
                rez[i][2] = arr[ii][2];
                rez[i][3] = arr[ii][3];
            }

            return rez;
        };

        this.getKat = function (wh, y) {
            let ab = wh; //-y
            let bc = wh - y;
            let ac = Math.sqrt(Math.pow(ab, 2) - Math.pow(bc, 2));
            ac = wh - ac;
            return ac;
        };

        this.normal = function (wh) {
            let ar;
            ar = this.getArr(0, 0, wh, wh);

            this.mirroX(ar);
            this.mirroY(ar);
            this.setArr(0, 0, ar);
        };

        this.cc = function (arr) {
            var vvvv = arr.length;
            var aaa;
            for (let i = 0; i < arr.length; i++) {
                let ac = this.getKat(vvvv, i) / vvvv;
                aaa = this.korArr(arr[i], ac);
                arr[i] = aaa;
            }
        };

        this.maNa = function (arr) {
            let rez = [];

            for (let j = 0; j < arr.length; j++) {
                rez[j] = [];
                for (let i = 0; i < arr[j].length; i++) {
                    rez[j][i] = [...arr[i][j]];
                }
            }

            for (let j = 0; j < arr.length; j++) {
                for (let i = 0; i < arr[j].length; i++) {
                    arr[j][i] = [...rez[j][i]];
                }
            }
        };

        this.sahWH = 100;
        var trace = window.console.log.bind(window.console);

        this.create = function () {
            /*if (this.bmp._height % 2 !== 0) this.bmp.height = this.bmp._height - 1;
            if (this.bmp._width % 4 !== 0) {
                let it = this.bmp._width;
                while (it % 4 !== 0) {
                    it -= 1;
                }
                this.bmp.width = it;
            }*/

            this.aaxz = [];
            this.aaxzIJ = [[], []];
            var sss = 0;
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 4; i++) {
                    this.aaxz[sss] = new CBoxZI(this);
                    this.aaxz[sss].idArr = sss;
                    this.aaxz[sss].ii = i;
                    this.aaxz[sss].jj = j;
                    this.aaxz[sss].ot = this._ot;
                    this.aaxzIJ[j][i] = this.aaxz[sss];
                    sss++;
                }
            }
            var wh = Math.floor(this.bmp._height / 2);
            if (wh > Math.floor(this.bmp._width / 4))
                wh = Math.floor(this.bmp._width / 4);

            this.normal(wh * 2);

            var sss = 0;
            var sahWH = wh - this._ot;
            this.sahWH = sahWH;
            // trace(wh,this.bmp._width,this.bmp._height,sahWH)

            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 4; i++) {
                    this.aaxz[sss].wh = sahWH;
                    this.aaxz[sss].upArr();
                    sss++;
                }
            }
            //////////////////////////////

            this.cc(this.aaxz[0].arr);

            this.mirroX(this.aaxz[1].arr);
            this.cc(this.aaxz[1].arr);
            this.mirroX(this.aaxz[1].arr);

            this.cc(this.aaxz[2].arr);

            this.mirroX(this.aaxz[3].arr);
            this.cc(this.aaxz[3].arr);
            this.mirroX(this.aaxz[3].arr);

            this.mirroY(this.aaxz[4].arr);
            this.cc(this.aaxz[4].arr);
            this.mirroY(this.aaxz[4].arr);

            this.mirroY(this.aaxz[5].arr);
            this.mirroX(this.aaxz[5].arr);
            this.cc(this.aaxz[5].arr);
            this.mirroX(this.aaxz[5].arr);
            this.mirroY(this.aaxz[5].arr);

            this.mirroY(this.aaxz[6].arr);
            this.cc(this.aaxz[6].arr);
            this.mirroY(this.aaxz[6].arr);

            this.mirroY(this.aaxz[7].arr);
            this.mirroX(this.aaxz[7].arr);
            this.cc(this.aaxz[7].arr);
            this.mirroX(this.aaxz[7].arr);
            this.mirroY(this.aaxz[7].arr);

            ////////////////////////////////

            for (let j = 0; j < this.bmp._height; j++) {
                for (let i = 0; i < this.bmp._width; i++) {
                    if (i > this.bmp._width / 4)
                        this.bmp.setPixel(i, j, [255, 0, 0, 255]);
                    else this.bmp.setPixel(i, j, [0, 255, 0, 255]);
                }
            }

            sss = 0;
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 4; i++) {
                    this.aaxz[sss].upSetArr();
                    sss++;
                }
            }
            /* var i=0
            for (let j= 0; j < 2; j++) {
                this.setArr(sahWH*4,j*sahWH,this.aaxzIJ[j][i].arr); 
            }*/

            this.bmp.upDate();
        };

        this.create2 = function () {
            var a = this.getArr(0, 0, this.bmp._width, this.bmp._height);
            this.cc(a);
            this.setArr(0, 0, a);
            this.bmp.upDate();
        };

        this.submit = function () {
            this.bmp.width = this.sahWH * 4;
            this.bmp.height = this.sahWH * 2;
            return this.bmp.getData();
        };

        this.isSI = function () {
            const w = this.bmp._width;
            const h = this.bmp._height;

            const otstup = Math.floor(w / 100);

            const points = [];
            const rgba = this.bmp.arrRgba;
            //1
            this.bmp.getPixel(otstup, otstup);
            points.push([...rgba]);
            this.bmp.getPixel(w / 2 - otstup, otstup);
            points.push([...rgba]);
            this.bmp.getPixel(w / 2 - otstup, h - otstup);
            points.push([...rgba]);
            this.bmp.getPixel(otstup, h - otstup);
            points.push([...rgba]);
            //2
            this.bmp.getPixel(w / 2 + otstup, otstup);
            points.push([...rgba]);
            this.bmp.getPixel(w - otstup, otstup);
            points.push([...rgba]);
            this.bmp.getPixel(w - otstup, h - otstup);
            points.push([...rgba]);
            this.bmp.getPixel(w / 2 + otstup, h - otstup);
            points.push([...rgba]);

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
            return true;
        };

        this.getVector = function (length, angle, point) {
            if (point == undefined) var point = new THREE.Vector2(0, 0);
            if (length < 0) angle += Math.PI;
            point.x = Math.abs(length) * Math.cos(angle);
            point.y = Math.abs(length) * Math.sin(angle);
            return point;
        };

        this.getAngle = function (a, b) {
            b = b || rezNull;
            a = a || rezNull;
            return Math.atan2(b.y - a.y, b.x - a.x);
        };
    }

    set otstup(value) {
        let vv = Math.round(value);
        if (this._ot != vv) {
            this._ot = vv;

            this.load(this.url);

            setTimeout(() => {
                this.create();
            }, 100);
        }
    }

    get otstup() {
        return this._ot;
    }
}

export class CBoxZI {
    constructor(_par) {
        var self = this;
        this.par = _par;

        this.type = 'CBoxZI';

        this.idArr = -1;
        this.ii = -1;
        this.jj = -1;
        this.ot = 0;
        this.arr = [];
        this.wh = 100;

        this.ottX = 0;
        this.ottX1 = 0;
        this.ottY = 0;
        this.ottY1 = 0;

        this.upArr = function () {
            if (this.ii == 0) this.ottX = this.ot;
            if (this.ii == 1) this.ottX = this.ot + this.wh;
            if (this.ii == 2) this.ottX = this.ot * 2 + this.wh * 2;
            if (this.ii == 3) this.ottX = this.ot * 2 + this.wh * 3;

            if (this.ii == 0) this.ottX1 = 0;
            if (this.ii == 1) this.ottX1 = this.wh;
            if (this.ii == 2) this.ottX1 = this.wh * 2;
            if (this.ii == 3) this.ottX1 = this.wh * 3;

            ///////////////

            if (this.jj == 0) this.ottY = this.ot;
            if (this.jj == 1) this.ottY = this.ot + this.wh;

            if (this.jj == 0) this.ottY1 = 0;
            if (this.jj == 1) this.ottY1 = this.wh;

            this.arr = this.par.getArr(this.ottX, this.ottY, this.wh, this.wh);
        };

        this.upSetArr = function () {
            this.par.setArr(this.ottX1, this.ottY1, this.arr);
        };
    }
}
