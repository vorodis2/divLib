export class SwitchPage  {
    constructor(dCont, kol, fun, param) {          
        this.type="SwitchPage";
        var self=this;
        this._active = true
        this.dCont=new DCont(dCont);
        this.dCont.visible=this._active;
        
        this._kol=kol;
        this._maxKol=7;
        this.fun= fun;
        this.param=param
        this.otstup=5
        if(this.param)this.otstup=this.param.otstup;
        //this.param.otstup;

        this._activMouse = true
        
        this._index = -1
        

        this.width=0
        this.height=0

        this.array=[];

        this._wh=18;
        this.whStart=18;
        this._widthContent = this.width;
        this.kolActive = 0;

        this.butBack = undefined;
        this.butNext = undefined;


        this.drag=function(){
            if(this.kol <= 0) {
                this.active = false;
                return
            } else {
                this.active = true;
            }
            this.clear()

            for (var i = 0; i < this._kol; i++) {
                if(this.array[i]==undefined)this.array[i]=new SwitchGron(this.dCont, i, this.sob, this);
                this.array[i].active=true; 
                this.width+=this.array[i].wh
                this.height=this.array[i].wh
            }

            this.dragXZ()
        }



        var b = undefined;
        this.indexInput=function(){
            let val = (this.value*1)-1
            if(val < 0) val = 0;

            b = false;
            if(Number.isInteger(val)){
                if(val >= 0 && val < self._kol){
                    b = true;
                    self.index = val
                    self.sob('index', val)
                }
            } 

            if(!b){
                this.value = ''
            }
        }


        this.initButBack=function(){
            if(this.butBack == undefined) {
                this.butBack = new DButton(this.dCont, 0, 0, '<', function(){
                    let aa = self.index
                    if(aa-1 >= 0) self.sob('index', aa-1)//self.index = aa-1
                })
                this.butNext = new DButton(this.dCont, 0, 0, '>', function(){
                    let aa = self.index
                    if(aa+1 <= self._kol-1) self.sob('index', aa+1)//self.index = aa+1
                })
                this.butBack.height = this.butNext.height = this.butBack.width = this.butNext.width = this.wh;
                
                this.skipMark = new DInput(this.dCont, 0, 0, '...', this.indexInput)
                this.skipMark1 = new DInput(this.dCont, 0, 0, '...', this.indexInput)
                this.skipMark.height = this.skipMark1.height = this.skipMark.width = this.skipMark1.width = this.wh;

                this.skipMark.funFocus = this.skipMark1.funFocus = function(){
                    if(this.boolFocus == true) {
                        this.value = ''
                    }
                    if(this.boolFocus == false) {
                        this.value = '...'
                    }
                }
            }
        }


        var xx, yy;
        this.dragXZ=function(){   
            xx = 0;             
            this.kolActive=0;
            this.initButBack();
            
            this.skipMark.visible = this.skipMark1.visible = false;
            if(this._kol>this._maxKol){
                this.visibleControl();
                this.butBack.x = xx;
                if(this.butBack.visible) {
                    xx += this.butBack.width + this.otstup;
                    this.kolActive++;
                }

                xx = this.xxArray(xx);

                this.butNext.x = xx;
                if(this.butNext.visible) {
                    xx += this.butBack.width + this.otstup;
                    this.kolActive++;
                }

            } else {
                this.butBack.visible = this.butNext.visible = false;
                xx = this.xxArray(xx);
            }
            this.width = xx;

            if(this.width > this.widthContent && this.widthContent > 0) this.wh = ((this.widthContent-this.otstup*2)/this.kolActive)-this.otstup
            fun('resize')

        }

        this.whDrag = function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].wh = this._wh;

            }

            this.butBack.width = this.butBack.height = this._wh;
            this.butNext.width = this.butNext.height = this._wh;
            this.skipMark.width = this.skipMark.height = this._wh;
            this.skipMark1.width = this.skipMark1.height = this._wh;
            this.skipMark.fontSize = this.skipMark1.fontSize = this._wh;
        }

        this.visibleControl = function() {
            if (this.index <= 1) {
                this.butBack.visible = false;
                this.butNext.visible = true;
            }

            if (this.index >= this.kol-2) {
                this.butBack.visible = true;
                this.butNext.visible = false;
            }

            if (this.index > 0 && this.index < this.kol-1) {
                this.butBack.visible = true;
                this.butNext.visible = true;
            }

            for (var i = 0; i < this._kol; i++) {
                this.array[i].active = false;

                if(i == 0 || i == this._kol-1 || i == this.index-1 || i == this.index || i == this.index+1) this.array[i].active = true

                if(this.index == 0) if(i < this.index + (this._maxKol - 3)) this.array[i].active = true
                if(this.index == this._kol-1) if(i > this.index - (this._maxKol - 3)) this.array[i].active = true
            }
        }


        this.xxArray = function(xx){
            var rr = 0;
            var bb = true;            
            for (var i = 0; i < this._kol; i++) {
                if(bb && i > 0 && i != rr + 1) {
                    this.kolActive++
                    bb = false;
                    if(this.skipMark.visible == false){
                        this.skipMark.visible = true;
                        this.skipMark.x = xx//+(this.skipMark.width/2);
                        xx += this.array[i].wh + this.otstup;
                    } else {
                        this.skipMark1.visible = true;
                        this.skipMark1.x = xx//+(this.skipMark1.width/2);
                        xx += this.array[i].wh + this.otstup;
                    }
                    

                }
                if(this.array[i]==undefined){
                    this.drag();
                    return
                }

                if(this.array[i].active) {
                    this.kolActive++
                    if( i == rr+1) bb = true
                    rr = i;
                    this.array[i].x = xx;
                    xx += this.array[i].wh + this.otstup;
                }
            }

            return xx;
        }

        this.sob=function(s,p,p1){   
            if(s=="index") {
                self.index=p
                self.fun("sobKol", p);
            }
        }

        this.clear=function(){ 
            this.width=0
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active = false;
            }
            this.wh = this.whStart;
        }
        this.drag()
        this.index=0
    }

    set index(value) {
        if(this._index!=value){
            this._index=value;
            if(value < 0) return
            this.dragXZ()

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].idArr==value)this.array[i].button.color=dcmParam._colorActive;
                else this.array[i].button.color= dcmParam._color;;     
            }
        }
    }    
    get index() { return  this._index;}

    set widthContent(value) {
        if(this._widthContent!=value){
            this._widthContent=value;
            this.wh = this.whStart;
            this.dragXZ()

        }
    }    
    get widthContent() { return  this._widthContent;}
    
    set kol(value) {
        if(this._kol!=value){
            this._kol=value;

            this.drag();
        }
    }    
    get kol() { return  this._kol;}

    set maxKol(value) {
        if(this._maxKol!=value){
            this._maxKol=value;
          
            this.drag()
        }
    }    
    get maxKol() { return  this._maxKol;}

    set wh(value) {
        if(this._wh!=value){
            this._wh=value;
            this.whDrag();
            this.dragXZ();
        }
    }    
    get wh() { return  this._wh;}

    set x(value) {
        if(this._x!=value){
            this._x=value;
            this.dCont.x=value
        }
    }    
    get x() { return  this._x;}

    set y(value) {
        if(this._y!=value){
            this._y=value;
            this.dCont.y=value
        }
    }    
    get y() { return  this._y;}

    set active(value) {
        if (this._active != value) {
            this._active = value;            
            this.dCont.visible=value
        }             
    }
    get active() { return this._active; }

    set activMouse(value) {
        if (this._activMouse != value) {
            this._activMouse = value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].activMouse = value;
            }
        }
    }


}


export class SwitchGron  {
    constructor(_dCont, _idArr, fun, par) {  
        this.type="SwitchGron";
        var self=this;

        // this.dCont=new DCont(_dCont);
        this.dCont=_dCont;
        this.idArr = _idArr;
        this.fun = fun;
        //this.param=param

        this._activMouse = true
        this.otstup=par.otstup;


        this._wh=par._wh;
        this._x = (this._wh+this.otstup) * this.idArr;
        this._y = 0;

        this._active=true;

        this.button = new DButton(this.dCont, this._x, this._y, this.idArr+1,function(){fun("index",self.idArr)});
        this.button.width = this.wh;
        this.button.height = this.wh;
    }

    set x(value) {
        if(this._x!=value){
            this._x=value;
            this.button.x=value;
            // this.dCont.x=value;
        }
    }    
    get x() { return  this._x;}

    set y(value) {
        if(this._y!=value){
            this._y=value;
            this.dCont.y=value;
        }
    }    
    get y() { return  this._y;}

    set wh(value) {
        if(this._wh!=value){
            this._wh=value;
            this.button.width = this.wh;
            this.button.height = this.wh;
        }
    }    
    get wh() { return  this._wh;}

    set active(value) {
        if(this._active!=value){
            this._active=value;
            this.button.visible=value;
        }
    }    
    get active() { return  this._active;}

    set activMouse(value) {
        if (this._activMouse != value) {
            this._activMouse = value;
            this.button.activMouse = value
        }
    }
}
