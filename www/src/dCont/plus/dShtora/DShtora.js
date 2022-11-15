



export class DShtora extends DCont{
    constructor(dCont, _x, _y, _fun) {
        super();
        var self=this
        this.type="DShtora";
        this.uuid=dcmParam.generateRendom(2) 
        this.infoThis=`
            var dShtora = new DShtora(this.dCont,0,0,function(){});  
            .addDShtora(dShtora) ,.removeDShtora(dShtora)//добавить экземпляр
            .addFun(function(w,h,dShtora))//при изменения этого окна отдают 
            .getObj .setObj Сохронение размеров и выключашек
            _bVrtikal =true будет по вертикали
            _bStatic не изменяеться размеры
            _otstup размер кнопок <1 нет

        `

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;
        this.fun=_fun
        this.par=undefined
        this.array=[];
        this.arrayCheh=[]
        this._width=200;
        this._height=200;
        this._min=20;
       
        this._prosent=0;
        this._bStatic=false;
        this._active=true;        

        this._bVrtikal=false;
        this._bPanel=true;              
        this._otstup=2;
        this._color=dcmParam._color1;
        this._colorB=dcmParam.compToHexArray(dcmParam.hexDec(this._color), -30);;

        var lb=false;
        this.panel=undefined
        this.dC=new DCont(this)
        this.init=function (){
            if(lb)return
            lb=true;            
            this.panel=new DPanel(this.dC);
            this.dCont=new DCont(this.dC)
            this.dCButton=new DCont(this.dC)
            this.drag();
        }


        this.addDShtora=function(dShtora){
            this.removeDShtora(dShtora);
            this.arrayCheh.push(dShtora);
            this.dCont.add(dShtora);
            dShtora.par=this

            dShtora.otstup=this.otstup;
            dShtora.color=this.color;
            
            this.drag();
        }

        this.removeDShtora=function(dShtora){
            let p=-1;
            for (var i = 0; i < this.arrayCheh.length; i++) {
                if(this.arrayCheh[i].uuid==dShtora.uuid){
                    p=i;
                    break
                }
            }
            if(p==-1)return null;

            this.dCont.remove(dShtora);
            dShtora.par=undefined
            this.arrayCheh.splice(p,1);
            this.drag();
            return dShtora;
        }


        this._bHorizont=false;
        this._type="DIN";

        




        this.drag=function(dShtor){
            this.array.length=0;
            for (var i = 0; i < this.arrayCheh.length; i++) {
                if(this.arrayCheh[i].active==true){
                    this.array.push(this.arrayCheh[i])
                }
            }
            



            this.panel.width=this._width;
            this.panel.height=this._height;
            if(this.array.length==0)return
            
            if(this._bVrtikal == false)this.dragW(dShtor);
            else this.dragH(dShtor);
        }

        this.dragH=function(dShtor, sah){
            if(sah==undefined)sah=0
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].bool=false
                if(sah==0)this.array[i].bool1=false
            }

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].height!=this._height)this.array[i].bool1=true
                this.array[i].width=this._width
                this.array[i].x=0
            }


            let b=false;
            let k=0
            let ww=0
            let ww1=0
            for (var i = 0; i < this.array.length; i++) {                
                if(this.array[i]._bStatic){
                    ww1+=this.array[i].height; 
                    continue;
                }
                if(this.array[i].height<=this.array[i]._min){
                    if(this.array[i].height!=this.array[i]._min){
                        this.array[i].bool1=true
                        b=true
                    }
                    this.array[i].height = this.array[i]._min;
                    
                    ww1+=this.array[i].height; 
                    continue;
                }
                k++;
                ww+=this.array[i].height; 
                this.array[i].bool=true               
            }           

            
            let ww2=(this._height- ww1)-(this.array.length-1)*this._otstup
            let ss=ww2/ww;            
            let xx=0;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].y=xx;
                if(this.array[i].bool){
                    this.array[i].height*=ss;
                    if(ss!=1)this.array[i].bool1=true
                    if(this.array[i].height<=this.array[i]._min)b = false;
                } 
                xx+=this.array[i].height+this._otstup;
            }

            if(xx<this._height-1){
                for (var i = 0; i < this.array.length; i++) {
                    if(this.array[i]._bStatic==false){
                        this.array[i].height*=2;
                        if(ss!=1)this.array[i].bool1=true
                    }
                }

                this.dragH(dShtor, sah+1)
                return;    
            }

            if(b){
                this.dragH(dShtor, sah+1)
                return;
            }

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].bool1==true){
                    this.array[i].dragWH();
                }
            }
            this.dragBuuton()
        }

       // var ww,www,www1,www2,www3,xx,ss;
        this.dragW=function(dShtor, sah){
            if(sah==undefined)sah=0
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].bool=false
                if(sah==0)this.array[i].bool1=false
            }

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].height!=this._height)this.array[i].bool1=true
                this.array[i].height=this._height
                this.array[i].y=0
            }


            let b=false;
            let k=0
            let ww=0
            let ww1=0
            for (var i = 0; i < this.array.length; i++) {                
                if(this.array[i]._bStatic){
                    ww1+=this.array[i].width; 
                    continue;
                }
                if(this.array[i].width<=this.array[i]._min){
                    if(this.array[i].width!=this.array[i]._min){
                        this.array[i].bool1=true
                        b=true
                    }
                    this.array[i].width = this.array[i]._min;
                    
                    ww1+=this.array[i].width; 
                    continue;
                }
                k++;
                ww+=this.array[i].width; 
                this.array[i].bool=true               
            }           

            
            let ww2=(this._width- ww1)-(this.array.length-1)*this._otstup
            let ss=ww2/ww;            
            let xx=0;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].x=xx;
                if(this.array[i].bool){
                    this.array[i].width*=ss;
                    if(ss!=1)this.array[i].bool1=true
                    if(this.array[i].width<=this.array[i]._min)b = false;
                } 
                xx+=this.array[i].width+this._otstup;
            }

            if(xx<this._width-1){
                for (var i = 0; i < this.array.length; i++) {
                    if(this.array[i]._bStatic==false){
                        this.array[i].width*=2;
                        if(ss!=1)this.array[i].bool1=true
                    }
                }

                this.dragW(dShtor, sah+1)
                return;    
            }

            if(b){
                this.dragW(dShtor, sah+1)
                return;
            }

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].bool1==true){
                    this.array[i].dragWH();
                }
            }
            this.dragBuuton()

        }

        this.arrFun=[]
        this.addFun=function(f){
            this.arrFun.push(f)
        }
        this.dragWH=function(){
            for (var i = 0; i < this.arrFun.length; i++) {
                this.arrFun[i](this._width,this.height,this)
            }           
        }


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
        };



        this.mousemove = function (e) {
            if (sp == undefined) {
                if (dcmParam.mobile == false) {                
                    sp = {
                        x: e.clientX,
                        y: e.clientY,
                    };                              
                } else {                
                    sp = {
                        x: e.targetTouches[0].clientX,
                        xy: e.targetTouches[0].clientY,
                    };
                } 

                sp.s=self.dC.getScaleScane()

                sp.w= self._dShtor.width;
                sp.h= self._dShtor.height;

                sp.w1= self._dShtor1.width;
                sp.h1= self._dShtor1.height;                
            }

            if (dcmParam.mobile == false) {
                sp._x= e.clientX;
                sp._y= e.clientY;                                              
            } else { 
                sp._x= e.targetTouches[0].clientX;
                sp._y= e.targetTouches[0].clientY;                
            }
            if(self._bVrtikal==false){
                let zdvih=sp.x-sp._x;
                self._dShtor.width=sp.w-zdvih/sp.s
                self._dShtor1.width=sp.w1+zdvih/sp.s                
            }
            if(self._bVrtikal==true){
                let zdvih=sp.y-sp._y;
                self._dShtor.height=sp.h-zdvih/sp.s
                self._dShtor1.height=sp.h1+zdvih /sp.s               
            }
            
            self.drag() 
            self.sorPar("drag")
        }

        this._dShtor1
        this._dShtor
        this.sob=function(){
            let p=self.getIdDin(this.sah-1,false)
            self._dShtor=self.array[p];

            p=self.getIdDin(this.sah,true)
            self._dShtor1=self.array[p];
            document.body.style.pointerEvents = 'none';
            if (dcmParam.mobile == false) {
                document.addEventListener('mouseup', self.mouseup);
            } else {
                document.addEventListener('touchend', self.mouseup);
            }
            dcmParam.addFunMove(self.mousemove);
        }


        this.ab=[]
        var kol=0
        this.dragBuuton=function(){
            for (var i = 0; i < this.ab.length; i++) {
                this.ab[i].visible=false;
            }
            kol=0;
            if(this._otstup<1)return

            for (var i = 1; i < this.array.length; i++) {                
                if(this.getIdDin(i,true)!=-1){                    
                    if(this.getIdDin(i-1,false)!=-1){

                        if(this.ab[kol]==undefined){
                            this.ab[kol]=new DButton(this.dCButton,0,0,"")
                            this.ab[kol].idArr=kol
                            this.ab[kol].fun_mousedown=this.sob
                            this.ab[kol].alpha=0.4
                            this.ab[kol].fun_mouseover = function(){  
                                if(self._bVrtikal==false) {
                                    this.panel1.div.style.cursor = 'ew-resize'; 
                                } else{
                                    this.panel1.div.style.cursor = 'n-resize'; 
                                }  
                                
                            };
                        }
                        this.ab[kol].color=this._colorB
                        this.ab[kol].visible=true;
                        if(this._bVrtikal==false){
                            this.ab[kol].width=this._otstup;
                            this.ab[kol].height=this._height;                        
                            this.ab[kol].y=0;
                            this.ab[kol].x=this.array[i].x-this._otstup;
                        }
                        if(this._bVrtikal==true){
                            this.ab[kol].width=this._width;
                            this.ab[kol].height=this._otstup;                        
                            this.ab[kol].y=this.array[i].y-this._otstup;
                            this.ab[kol].x=0;
                        }

                        this.ab[kol].sah = i;
                        kol++;
                    }
                }
            }
        }
        
        this.getIdDin=function(ii, bool){
           
            if(bool==true){//впнрд
                
                for (var i = ii; i < this.array.length; i++) {
                    
                    if(this.array[i]._bStatic==false)return i;
                }
            }else{//назад
                for (var i = ii ; i >= 0; i--) {
                    if(this.array[i]._bStatic==false)return i;
                }
            }

            return -1
        }


        this.init();

        this.sorPar=function(s,p,p1){            
            if(this.par!=undefined){
                this.par.sorPar(s,p,p1);
                return
            }
            if(this.fun!=undefined)this.fun(s,p,p1);
        }


        this.getObj=function(){
            var o={};
            o.active=this.active;
            o.width=this.width;
            o.height=this.height;
            o.children=[]
            for (var i = 0; i < this.arrayCheh.length; i++) {
                o.children.push(this.arrayCheh[i].getObj())
            }
            return o
        }
        this.setObj=function(o){
             
            this.width= o.width 
            this.height= o.height 
            this.active= o.active 

            for (var i = 0; i < o.children.length; i++) {
                if(this.arrayCheh[i]!=undefined)this.arrayCheh[i].setObj(o.children[i]);
            }
            this.drag()
        }

       /* this.panel.div.addEventListener('mousedown', function () {
            self.sorPar("down",self)

        });*/

    } 

    set width(value) { 
        if(this._width!=value){ 
            this._width=value;            
            this.drag();
            
        }
    }   
    get width() { return  this._width} 


    set height(value) { 
        if(this._height!=value){ 
            this._height=value;            
            this.drag();
            
        }
    }   
    get height() { return  this._height} 


    set min(value) { 
        if(this._min!=value){ 
            this._min=value;            
            this.drag();

        }
    }   
    get min() { return  this._min} 




    set bStatic(value) { 
        if(this._bStatic!=value){ 
            this._bStatic=value;                  
            this.drag();
        }
    }   
    get bStatic() { return  this._bStatic} 

    set active(value) { 
        if(this._active!=value){ 
            this._active=value;      
            if(this._active==true){
                this.add(this.dC)
            }else{
                this.remove(this.dC)
            }            
            if(this.par!=undefined)this.par.drag();
        }
    }   
    get active() { return  this._active} 


    set bVrtikal(value) { 
        if(this._bVrtikal!=value){ 
            this._bVrtikal=value;      
            this.drag();
        }
    }   
    get bVrtikal() { return  this._bVrtikal} 

   
    set bPanel(value) { 
        if(this._bPanel!=value){ 
            this._bPanel=value;
            
            this.panel.visible=this._bPanel
            
        }
    }   
    get bPanel() { return  this._bPanel} 


    set otstup(value) { 
        if(this._otstup!=value){ 
            this._otstup=value;
            for (var i = 0; i < this.arrayCheh.length; i++) {
                this.arrayCheh[i].otstup=this._otstup;
            }      
            this.drag();
        }
    }   
    get otstup() { return  this._otstup} 


    set color(value) { 
        if(this._color!=value){ 
            this._color=value;
            this._colorB=dcmParam.compToHexArray(dcmParam.hexDec(this._color), -30);;
            this.panel.color=this._color;
            for (var i = 0; i < this.arrayCheh.length; i++) {
                this.arrayCheh[i].color=this._color;
            }      
            this.drag();
        }
    }   
    get color() { return  this._color} 


            
}












































export function LocalStorageWW(fun,_key) {
    this.fun = fun;
    var self = this;
    this.object;
    this.key = _key||'shirt';
    this.object; // тут храняться все данные с localStorage
    var b;
    // инициализация localStorage
    this.initLoad=function() {
        b=true;
        this.object = window.localStorage[this.key];
        if(this.object == "undefined")b=false;
        if(this.object == undefined)b=false;
        
        // проверка пуст ли  localStorage
        if(b == false) {
            this.object = {}; // если localStorage пуст, записываем обьект с функции getStartObj
        }else {
            this.object = JSON.parse(this.object); // если localStorage не пуст записываем содержимое предварительно
        }   
        if(this.fun){
            setTimeout(function() {self.fun();}, 1);  
        }
    }
    
 

    // сохраняем в localStorage данные
    this.save = function() {        
        window.localStorage[this.key] = JSON.stringify(self.object);
    }

    // удаляем из localStorage данные
    this.clear = function() {
        window.localStorage[this.key] = undefined;
    }
    self.initLoad();     
}


