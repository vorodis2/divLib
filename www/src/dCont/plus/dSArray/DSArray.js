import { SwitchPage } from './SwitchPage.js';
import { MSAHron } from './MSAHron.js';
import { PKey } from './PKey.js';
import { DSArrGallery } from './DSArrGallery.js';

/*
    Парсер массивов
*/


export class DSArray extends DCont {
    constructor(dCont, _x, _y, fun) {
        super();
        this.type = 'DSArray';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        this.infoThis=`
            var ds = new DSArray(this.dCont,0,0);
            .setArray(arr, ap)//arr массив поиска ap- структура данных

            let arr=[
                {name:"Тут глубина",bool:true,pic:"resources/pic/1.png",object:{num:100}},                
                {Feature:[{num:100},{code:'IM_pipe',source:'inframodel',Property:[{label:"elevType",value:"wwww"}]}]},
            ]

            let ap=[
                {key:["name"], type:"string",name:"name",width:40},
                {key:["object","num"], type:"number",name:"xz"},
                {key:["bool"], type:"boolean",name:"bool"},                 
                {key:["pic"], type:"image",name:"image"},       
                {key:[                    
                    {type:"seek",key:"Feature",array:['code','IM_pipe','source','inframodel']},
                    {type:"seek",key:"Property",array:['label','elevType']},
                    "value"
                    ], type:"string",name:"elevType"},
            ]
        `  
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined)
        if (dCont.add != undefined) dCont.add(this);
        this.fun = fun;
        var self = this
        this.dCont = new DCont(this);
        this._otstup = dcmParam._otstup;

        this._width = 400;
        this._height = 200;
        this._wh = 24;
        this._wComp = 150;
        this._kol = 32;

        this._boolLeft = true;
        this._boolUp = true;

        this.hGal = 100;
        this.arrayStart = null
        this.array = [];
        this.arrParam = [
            { key: null, type: "string", name: "string" },
            { key: null, type: "number", name: "number" },
            { key: null, type: "boolean", name: "boolean" },
        ]
        this.arrLitel = []


        this.init = function() {

            this.panelBase = new DPanel(this.dCont, 0, 0);

            this.chek = new DCheckBox(this.dCont, this._otstup, 0, " ", function() {
                for (var i = 0; i < self.array.length; i++) {
                    self.array[i].bool = this.value;
                }
                for (var i = 0; i < self.gallery.array.length; i++) {
                    self.gallery.array[i].dragObj()
                }

            })
            this.button = new DButton(this.dCont, this._otstup + 60, this._otstup, null, function() {
                for (var i = 0; i < self.array.length; i++) {

                    self.array[i].bool = !self.array[i].bool;
                }
                for (var i = 0; i < self.gallery.array.length; i++) {
                    self.gallery.array[i].dragObj()
                }
            })
            this.button.link = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjZmZmIj4KICA8cGF0aCBkPSJtMzc2IDUxOC4wN2MtMzkuMjMgMC03NC43NS0xNS45MDItMTAwLjQ2LTQxLjYxM2w1My4xMDUtNTMuMTAyaC0xNDIuMDd2MTQyLjA3bDU1LjQ4NC01NS40ODRjMzQuMjc3IDM0LjI4MSA4MS42MzcgNTUuNDg0IDEzMy45NSA1NS40ODQgMTA0LjYyIDAgMTg5LjQzLTg0LjgwOSAxODkuNDMtMTg5LjQzaC00Ny4zNTljMCA3OC40NjktNjMuNjA1IDE0Mi4wNy0xNDIuMDcgMTQyLjA3eiIvPgogIDxwYXRoIGQ9Im0zNzYgMTg2LjU3Yy0xMDQuNjIgMC0xODkuNDMgODQuODA5LTE4OS40MyAxODkuNDNoNDcuMzU5YzAtNzguNDY5IDYzLjYwNS0xNDIuMDcgMTQyLjA3LTE0Mi4wNyAzOS4yMyAwIDc0Ljc1IDE1LjkwMiAxMDAuNDYgNDEuNjEzbC01My4xMDIgNTMuMTAyaDE0Mi4wN3YtMTQyLjA3bC01NS40ODQgNTUuNDg0Yy0zNC4yNzctMzQuMjg1LTgxLjYzNy01NS40ODQtMTMzLjk1LTU1LjQ4NHoiLz4KIDwvZz4KPC9zdmc+Cg=="
            this.button.width = this.button.height = 20;

            this.pKey = new PKey(this, function(s, p) {
                if (s == "drag") {
                    self.korekt()
                }
            });
            this.pKey.visible = this._boolUp

            this.gallery = new DSArrGallery(this.dCont, 0, 0, function(s, p) {

            }, this)
            this.gallery.kolII = 1;
            this.gallery.heightPic = this._wh;
            this.gallery._otstup = this._otstup;
            this.gallery.panel.visible = false;

            this.switchPage = new SwitchPage(this.dCont, 0, function(s) {
                if (s == "sobKol") {
                    self.dragSP();
                }
                if (this != undefined && this.width != undefined) {
                    self.switchPage.x = (self.width - this.width) / 2
                }
            })

            this.switchPage.whStart = 24;
            this.switchPage.wh = 24;

        }

        this.getFun = function() {
            let a = []
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].bool == true) a.push(this.array[i].obj);

            }
            fun("get", a)
        }

        /////////////////////////////////korekt/////////////////////////////////////
        this.korekt = function() {
            let a = []
            if (this.pKey.index == -1) {
                for (var i = 0; i < this.array.length; i++) {
                    a[this.array[i].idArr] = this.array[i]
                }
                this.array = a;
            } else {
                this.array.sort(this.pKey.array[this.pKey.index].sort)
            }

            for (var i = 0; i < this.array.length; i++) {
                this.pKey.getStatus(this.array[i])
            }

            this.dragSP();
        }

        /////////////////////////////////////////////////////

        this.dragSP = function() {
            let s = self.switchPage.index * this._kol;
            let f = (self.switchPage.index + 1) * this._kol;
            if (f > this.array.length) f = this.array.length;

            this.arrLitel.length = 0;
            for (var i = s; i < f; i++) {
                this.arrLitel.push(this.array[i])
            }

            this.gallery.width = this.pKey.x + this.pKey.width - this._otstup * 2;
            this.gallery.widthPic = this.gallery.width;
            this.gallery.start(this.arrLitel)
        }


        var sah;
        this.setArray = function(arr, ap) {
            if (ap != undefined) {
                this.pKey.setArr(ap);
            } else {
                this.pKey.setArr(this.arrParam);
            }

            
            this.active = true;
            this.chek.value = false;
            this.arrayStart = arr;
            this.array.length = 0;

            sah = -1;
            for (var i = 0; i < arr.length; i++) {
                let hron = this.getGron()
                hron.setObject(arr[i])
            }

            var k = Math.ceil(arr.length / this._kol)
            this.switchPage._index = -1
            this.switchPage.index = 0
            this.switchPage.kol = k;

            this.dragSP();
            this.drag();

            this.pKey.finalArr()
            this.dragWh()
            this.drag();

        }

        this.ach = []
        this.getGron = function() {
            sah++
            if (this.ach[sah] == undefined) this.ach[sah] = new MSAHron(this)
            this.array[sah] = this.ach[sah];
            this.array[sah].idArr = sah
            return this.array[sah];
        }


        this.sortDrag = function() {}


        this.aPos = [
            10, //0  верхушка
            10
        ]

        var otL=0;
        var otU=0;
        this.drag = function() {
           // this.width = 0;

            this.aPos[1] = this.switchPage.wh + this._otstup * 3;
            this.aPos[0] = this._height - this.aPos[1];

            otL=0;
            otU=0;
            if(this._boolLeft)otL=this._otstup * 2 + 24

            if(this._boolUp)otU=this._otstup * 3 + 42   

            this.pKey.setWidth(this.width-otL)
/*
            if (this.switchPage.width + this._otstup * 2 > this.width) this.width = this.switchPage.width + this._otstup * 2
            if (this.width < 250) this.width = 250

            this.pKey.x = this._otstup * 2 + this._wh;

            if (this.pKey.x + this.pKey.width + this._otstup > this.width) {
                this.width = this.pKey.x + this.pKey.width + this._otstup
            }*/



            this.panelBase.width = this.width
            this.panelBase.height = this.height

            this.pKey.x = otL;
            this.pKey.y = this._otstup ;
            this.pKey.height = this.aPos[0]

            this.gallery.x = 0;
            this.gallery.y = otU;
            this.gallery.width = this.width //- otL;
            this.gallery.widthPic = this.gallery.width//+ otL;
            this.gallery.height = this.height-otU- this._otstup * 2-24


            this.button.x = this._otstup+2;
            this.button.y = this._otstup ;

            this.chek.x = this._otstup;
            this.chek.y = this._otstup*2+ this.button.height;


            if(this._boolLeft && this._boolUp){
                this.button.visible=this.chek.visible=true
            }else{
                this.button.visible=this.chek.visible=false
            }


            this.switchPage.x = (this.width - this.switchPage.width) / 2
            this.switchPage.y = this.height - this.switchPage.wh - this._otstup

        }


        this.dragWh = function() {

            var k = Math.ceil(this.arrayStart.length / this._kol)
            this.switchPage.kol = k;
            if (this.switchPage.index > k - 1) {
                this.switchPage.index = k - 1
            }

            this.pKey.x = this._otstup * 3 + this._wh;
            this.gallery.heightPic = this._wh;

            this.drag()
            this.dragSP()

        }


        this.init()
        this.drag()

        this.getArr =function(){
            let a=[];
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].bool==true)a.push(this.array[i].obj);
            }
            return a;
        }

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

    set kol(value) {
        if (this._kol != Math.round(value)) {
            this._kol = Math.round(value);
            this.dragWh()
            this.dragSP()
        }
    }
    get kol() {
        return this._kol;
    }

/*
    set wComp(value) {
        if (this._wComp != value) {
            this._wComp = value;
            this.pKey.wComp = this._wComp;
            this.gallery.wComp = this._wComp;
            this.drag()


        }
    }
    get wComp() {
        return this._wComp;
    }*/

   set width(value) {
        if (this._width != value) {
            this._width = value;
            this.drag()
            this.gallery.dragObj()
        }
    }
    get width() {
        return this._width;
    }  
    
    set boolLeft(value) {
        if (this._boolLeft != value) {
            this._boolLeft = value;

            this.drag()
            this.gallery._boolLeft = value;
            this.gallery.dragObj()
        }
    }
    get boolLeft() {
        return this._boolLeft;
    }  
    
    set boolUp(value) {
        if (this._boolUp != value) {
            this._boolUp = value;
            this.pKey.visible=this._boolUp
            this.drag()
            this.gallery.dragObj()
        }
    }
    get boolUp() {
        return this._boolUp;
    }   

    

        
    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.drag()

        }
    }
    get height() {
        return this._height;
    }


    set wh(value) {
        if (this._wh != value) {
            this._wh = value;
            this.pKey.wh = this._wh;
            this.gallery.wh = this._wh;
            this.dragWh()
            this.drag()
        }
    }
    get wh() {
        return this._wh;
    }


    set otstup(value) {
        if (this._otstup != value) {
            this._otstup = value;
            this.pKey.otstup = this._otstup;
            this.gallery.otstup = this._otstup;
            this.drag()


        }
    }
    get otstup() {
        return this._otstup;
    }


}