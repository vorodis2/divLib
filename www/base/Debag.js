export class Debag {
    constructor(dCont, _x, _y, _wh) {
        let self = this;
        this._x = _x;
        this._y = _y;
        this._wh = _wh;
        this.wh = _wh;

        this.dCont = new DCont(dCont);
        

        this.arr = [];

        if (!dcmParam) dcmParam=new DCM();

        this.dCont.y = this._y;
        this.dCont.x = this._x;
        
        this.panel=new DPanel(this.dCont, 0, -this.wh);
        this.panel.width=this._wh;
        this.panel.height=this._wh;
        this.panel.color="#ff0000";
        this.panel.visible=false

        this.setArr = function(arr, isNeedReverse) {
            this.panel.visible=false
            for (let i = 0; i < this.arr.length; i++) {
                this.arr[i].visible=false;
            }
            
            for (let i = 0; i < arr.length; i++) {
                if(!this.arr[i]){
                    this.arr[i]=new DPanel(this.dCont, this._wh * i, 0);
                    this.arr[i].width=this._wh;
                    this.arr[i].height=this._wh;
                }
                this.arr[i].visible=true;
                let c="#"+dcmParam.compToHex(arr[i][0])+dcmParam.compToHex(arr[i][1])+dcmParam.compToHex(arr[i][2]);
                this.arr[i].color=c;
            }
        }

        this.setNum = function(x) {
            this.panel.visible=true
            this.panel.x=x;
        }
    }
}