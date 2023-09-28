



export class DVerhPanels extends DCont{
    constructor(dCont, _x, _y, _fun) {
        super();
        var self=this
        this.type="DVerhPanels";
        this.uuid=dcmParam.generateRendom(2) 
        this.infoThis=`
            var dp = new DVerhPanels(this.dCont,0,0,function(){});  
            dp.addPanel(this,"test0_____sdfs sf sf","test1111111111111111")

        `

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;
        this.fun=_fun;
        this.par=undefined;
        this.array=[];
        this.arrayCesh=[];
        this._width=800;
        this._height=dcmParam.wh
        this._wNorm=180;
        this._borderRadius=dcmParam.borderRadius
        this._otXZ=10;
        this._color=dcmParam._color;
        this._color1=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color), -30);
        this._alphaPlus=0.7;
        this._colorText=dcmParam._colorText;

        this.timeT = 250

        this._boolClose=true;
        this._boolDrag=true;
       // this.label=new DLabel()
        this._fontSize=dcmParam._fontSize
        /*this.tbig='`1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./ `1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./ `1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./ ';
        this.sim=0.8;
        this.label.fontSize=this._fontSize;*/

        this.arrLink=[            
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBpZD0iZGV2TGliX0RDSTIiIHN0eWxlPSJ3aWR0aDogMjAwcHg7IGhlaWdodDogMjAwcHg7Ij48cGF0aC8+PGZpbHRlciBpZD0iZjIiIHg9Ii0xMCIgd2lkdGg9IjIwIiB5PSItMTAiIGhlaWdodD0iMjAiIGNvbG9yPSIjMGQwZDBkIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTAiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGxpbmUgeDE9IjY1LjI3NDc3MTc3ODM0NDE5IiB5MT0iNjUuMjc0NzcxNzc4MzQ0MTkiIHgyPSIxMzQuNzI1MjI4MjIxNjU1ODciIHkyPSIxMzQuNzI1MjI4MjIxNjU1NzUiIHN0cm9rZT0iIzBkMGQwZCIgc3Ryb2tlLXdpZHRoPSIxNy4zNjI2MTQxMTA4Mjc5MjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSI2NS4zMjY4MjczMzcxNTA2OCIgeTE9IjEzNC42NzMxNzI2NjI4NDkzNyIgeDI9IjEzNC42NzMxNzI2NjI4NDk0NSIgeTI9IjY1LjMyNjgyNzMzNzE1MDYiIHN0cm9rZT0iIzBkMGQwZCIgc3Ryb2tlLXdpZHRoPSIxNy4zMzY1ODYzMzE0MjQ2OSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjxnIGZpbHRlcj0idXJsKCNmMikiPjxsaW5lIHgxPSItNTAiIHkxPSItNTAiIHgyPSItNTAiIHkyPSItNTAiIHN0cm9rZT0iIzBkMGQwZCIgc3Ryb2tlLXdpZHRoPSIxNy4zMzY1ODYzMzE0MjQ2OSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjY1LjI3NDc3MTc3ODM0NDE5IiB5MT0iNjUuMjc0NzcxNzc4MzQ0MTkiIHgyPSIxMzQuNzI1MjI4MjIxNjU1ODciIHkyPSIxMzQuNzI1MjI4MjIxNjU1NzUiIHN0cm9rZT0iIzBkMGQwZCIgc3Ryb2tlLXdpZHRoPSIxNy4zNjI2MTQxMTA4Mjc5MjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgaWE9IjAiLz48bGluZSB4MT0iNjUuMzI2ODI3MzM3MTUwNjgiIHkxPSIxMzQuNjczMTcyNjYyODQ5MzciIHgyPSIxMzQuNjczMTcyNjYyODQ5NDUiIHkyPSI2NS4zMjY4MjczMzcxNTA2IiBzdHJva2U9IiMwZDBkMGQiIHN0cm9rZS13aWR0aD0iMTcuMzM2NTg2MzMxNDI0NjkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PGxpbmUgeDE9IjY1LjI3NDc3MTc3ODM0NDE5IiB5MT0iNjUuMjc0NzcxNzc4MzQ0MTkiIHgyPSIxMzQuNzI1MjI4MjIxNjU1ODciIHkyPSIxMzQuNzI1MjI4MjIxNjU1NzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNy4zNjI2MTQxMTA4Mjc5MjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgaWE9IjAiLz48bGluZSB4MT0iNjUuMzI2ODI3MzM3MTUwNjgiIHkxPSIxMzQuNjczMTcyNjYyODQ5MzciIHgyPSIxMzQuNjczMTcyNjYyODQ5NDUiIHkyPSI2NS4zMjY4MjczMzcxNTA2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTcuMzM2NTg2MzMxNDI0NjkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgaWE9IjEiLz48L3N2Zz4=',
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBpZD0iZGV2TGliX0RDSTIiIHN0eWxlPSJ3aWR0aDogMjAwcHg7IGhlaWdodDogMjAwcHg7Ij48cGF0aC8+PGZpbHRlciBpZD0iZjIiIHg9Ii0xMCIgd2lkdGg9IjIwIiB5PSItMTAiIGhlaWdodD0iMjAiIGNvbG9yPSIjMGQwZDBkIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTAiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0Mi41OTg0MDcwMDQ2NDIyNyIgZmlsbD0iIzBkMGQwZCIgc3Ryb2tlPSIjMGQwZDBkIiBzdHJva2Utd2lkdGg9IjIxLjI5OTIwMzUwMjMyMTE0NSIvPjwvZz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIiBzdHJva2U9IiMwZDBkMGQiIHN0cm9rZS13aWR0aD0iMTcuMzYyNjE0MTEwODI3OTIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQyLjU5ODQwNzAwNDY0MjI3IiBmaWxsPSIjMGQwZDBkIiBzdHJva2U9IiMwZDBkMGQiIHN0cm9rZS13aWR0aD0iMjEuMjk5MjAzNTAyMzIxMTQ1Ii8+PC9nPjwvZz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQyLjU5ODQwNzAwNDY0MjI3IiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjEuMjk5MjAzNTAyMzIxMTQ1IiBpYT0iMCIvPjwvc3ZnPg==',
            
        ]

      


       
        this.panel=undefined
        this.dC=new DCont(this)
        this.init=function (){
            if(this.panel!=undefined)return                     
            this.panel=new DPanel(this.dC);
            //this.panel.color="#444444"
            this.dCont=new DCont(this.dC)
            this.dContB=new DCont(this.dCont)
            this.panel.width=this._width;
            this.panel.height=this._height;
            this.dContB.div.style.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)";

            
            //this.korectSim()


            this.drag()
        }
        
        



        this.drag=function (){
            this.dragBut(this._width)
        }
        

        this.ara=[]
        this.ara1=[]
        this.arM=[]
        this.dragBut=function (w){
            let ww=0;
            let ww1=0;
            let kol=0;
            let kol1=0;
            this.arM.length=0
            let wwB=0;
            let ww1Max=0;
            let ww1Max1=0;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].wTMin>this._wNorm){
                    ww+=this.array[i].wTMin;
                    ww1Max+=this.array[i].wTMin;
                    kol++;
                }else{
                    ww1+=this.array[i].wTMin;
                    ww1Max+=this._wNorm;
                    ww1Max1+=this._wNorm;
                    kol1++;
                    this.arM.push(this.array[i])
                }
                wwB+=this.array[i].wTMin;

                
            }
            let bool=false
            if(wwB>w){//длина не влазтит по всем текстам
                for (var i = 0; i < this.array.length; i++) {
                    this.array[i].wDin=1111111
                    this.array[i].width=this.array[i].wTMin
                }
               
            }else{
                
                bool=true
                for (var i = 0; i < this.array.length; i++) {
                    this.array[i].wDin=1111111
                    
                }

                if(ww1Max<w){//все влазят и еще остоеться
                    for (var i = 0; i < this.array.length; i++) {
                        if(this.array[i].wTMin>this._wNorm){
                            this.array[i].width=this.array[i].wTMin
                        }else{
                            this.array[i].width=this._wNorm
                        }
                        this.array[i].dragDin()
                    }

                    
                }else{
                   
                    for (var i = 0; i < this.array.length; i++) {
                        if(this.array[i].wTMin>this._wNorm){
                            this.array[i].width=this.array[i].wTMin
                        }
                    } 
                    let p=w-ww;//надо впихнуть
                    //ww1-минимальное значение всех
                    //ww1Max1-мин от границ;

                    let p1=ww1Max1-ww1
                    let p2=ww1Max1-p;
                    let p3=1-p2/p1;

                    for (var i = 0; i < this.arM.length; i++) {                        
                        this.array[i].width=this.array[i].wTMin+(this._wNorm-this.array[i].wTMin)*p3
                        
                    }
                }
            }

            if(this._activeBut && bool==false){
                this.ara.length=0;
                this.ara1.length=0;
                let pp=-1;
                let xp=0;
                for (var i = 0; i < this.array.length; i++) {                    
                    if(this.array[i].uuid==this._activeBut.uuid){
                        pp=i;
                        xp=this.array[i].x
                        break
                    }
                }
                for (var i = pp+1; i < this.array.length; i++) { 
                    this.ara1.push(this.array[i])
                }
                for (var i = pp - 1; i >= 0; i--) {
                    this.ara.push(this.array[i])
                }


                let kol=this.array.length-pp-1
                let posx=xp
                let minx=w-this._activeBut.width-kol*this._otXZ
                if(xp>minx){
                    posx=minx
                }
                if(posx<this._otXZ){
                    posx=xp
                }
                

                this.korWW(this.ara, posx)
                let xx=0
                for (var i = this.ara.length - 1; i >= 0; i--) {
                    this.ara[i].setX(xx);
                    xx+=this.ara[i].wDin
                }
                
                let www=w-(posx+this._activeBut.width)
                this._activeBut.wDin=this._activeBut.width
                this._activeBut.setX(xx);
                this.korWW(this.ara1, www,true)
                
                
                xx+=this._activeBut.width
                for (var i = 0; i < this.ara1.length; i++) {
                    this.ara1[i].setX(xx);
                    xx+=this.ara1[i].wDin
                }

                for (var i = 0; i < this.array.length; i++) { 
                    this.array[i].dragDin()
                }
            


            } else{
                let xx=0;
                for (var i = 0; i < this.array.length; i++) {                
                    this.array[i].setX(xx);
                    xx+= this.array[i].width;
                }
            } 
        }


        this.korWW = function(arr, ww,b) {
            let munww=arr.length*this._otXZ;
            if(ww<munww){
                for (var i = 0; i < arr.length; i++) {
                    arr[i].wDin=this._otXZ;
                }
                return
            }

            
            this.korWW2(arr, ww, 0,b) 

        }

        this.korWW2 = function(arr, ww, sah,b) {
            if(sah>arr.length)return






            let wr=sah*this._otXZ;
            let we=0
            let cent=ww


            for (var i = 0; i < arr.length-sah; i++) {
                we+=arr[i].wTMin;                
                
            }

            let wrrr=ww-wr-we;    



            if(wrrr>=0){                
                let kk=arr.length-sah
                let pp=ww-we -sah*this._otXZ+this._otXZ
                if(pp<this._otXZ)pp=this._otXZ
                for (var i = 0; i < arr.length; i++) {
                    arr[i].wDin=pp
                    arr[i].dCont.y=0
                    if(i==kk){
                        //arr[i].label.text=" 0"
                    }else{
                        if(i<kk){
                            //arr[i].label.text=" 1"
                            arr[i].wDin=arr[i].wTMin;
                        }else{
                            //arr[i].label.text="2"
                            arr[i].wDin=this._otXZ;
                        }
                    }                    
                }
                return
            }

            this.korWW2(arr, ww, sah+1)
        }






        this.dragLines = function() {
            let b=false
            let b1=false
            for (var i = 0; i < this.array.length; i++) { 
                b=true
                b1=true
                if(i==0)b=false;
                if(i==this.array.length-1)b1=false;

                if(this.array[i].active==true){
                    b=false
                    b1=false
                }

                if(this.array[i+1])if(this.array[i+1].active==true) b1=false
                if(this.array[i-1])if(this.array[i-1].active==true) b=false    

                if(this.array[i].boolNa==true){
                    b=false
                    b1=false
                }

                if(this.array[i+1])if(this.array[i+1].boolNa==true) b1=false
                if(this.array[i-1])if(this.array[i-1].boolNa==true) b=false     



                this.array[i].panel.visible=b;
                this.array[i].panel1.visible=b1;
            }

            for (var i = 0; i < this.array.length; i++) { 
                b=true
                b1=true
                if(i!==0){
                    if(this.array[i].panel.visible){
                        if(this.array[i-1].panel1.visible){
                            this.array[i-1].panel1.visible=false
                        }
                    }
                }
            }
        }

        var but;
        this.addPanel=function (o,t,t1){            
            but=this.getBut();
            but.add(o,t,t1);

            if(this._activeBut){
                let r=this.getId(this._activeBut)
                but.x=this._activeBut.x+this._activeBut.width

                this.array.splice(r+1,0,but)
            }else{
                this.array.push(but);
            }

            let tt=this.timeT
            this.timeT = 0
            this.drag();            
            this.activeBut=but
            this.timeT = tt
            return but
        }

        this.removePanel=function (but){   
            let p=this.getId(but) 

            if(p==-1){
                return null
            }        
             
            this.array.splice(p,1);

            but.life=false;
             if(this.array.length==0){
                this.activeBut=null                
            }else{
                if(this.array[p-1]){
                    this.activeBut=this.array[p-1]
                }else{
                    if(this.array[p]){
                        this.activeBut=this.array[p]                        
                    } 
                } 
            }
            this.drag()

            
             
        }



        this.getId= function(but) {
            let rez=-1
            for (var i = 0; i < this.array.length; i++) {
                if(but.uuid===this.array[i].uuid){
                    rez=i;
                    break
                }
            }

            return rez
        }

        /////////////////////////////////////////
        /////////////////////////////////////

        this.startDrag= function() {
            if(self.boolDrag==false)return
            document.body.style.pointerEvents = 'none';
            if (dcmParam.mobile == false) {
                document.addEventListener('mouseup', self.mouseup);
            } else {
                document.addEventListener('touchend', self.mouseup);
            }
            dcmParam.addFunMove(self.mousemove);
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
            self.drag()
            if(self.fun)  self.fun("up")          
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

                sp.xxx= self.activeBut.x;
                sp.xxx1= self.activeBut.x;
                sp.bool=false               
            }

            if (dcmParam.mobile == false) {
                sp._x= e.clientX;
                sp._y= e.clientY;                                              
            } else { 
                sp._x= e.targetTouches[0].clientX;
                sp._y= e.targetTouches[0].clientY;                
            }
            
            let zdvih=sp.x-sp._x; 

            if(Math.abs(zdvih)>5)sp.bool=true

            if(sp.bool){
                let xs=sp.xxx-zdvih
                if(xs<0)xs=0
                if(xs>self._width-self.activeBut.width)xs=self._width-self.activeBut.width   
                self.activeBut.x=xs              
                self.drPos()
            } 
        }

        this.drPos=function(){
            let apid=this.getId(self.activeBut)
            let ww=this.activeBut._width
            if(ww>this.activeBut.wDin)ww=this.activeBut.wDin

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].uuid!=self.activeBut.uuid){
                    let ww1=this.array[i]._width
                    if(ww1>this.array[i].wDin)ww1=this.array[i].wDin

                    if(self.activeBut._x>this.array[i]._x){
                        if(self.activeBut._x<this.array[i]._x+ww1/2){ 
                            this.drID(apid,i)
                            return
                        }
                    }
                }
            }

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].uuid!=self.activeBut.uuid){
                    let ww1=this.array[i]._width
                    if(ww1>this.array[i].wDin)ww1=this.array[i].wDin


                    if(self.activeBut._x+ww>this.array[i]._x+ww1/2){
                        if(self.activeBut._x+ww/2<this.array[i]._x+ww1){ 


                            this.drID(apid,i)
                            return
                        }
                    }
                }
            }
        }

        this.drID=function(id,id1){
            let o=this.array[id]
            let o1=this.array[id1]

            this.array[id]=o1
            this.array[id1]=o
            let apid=this.getId(self.activeBut)
            let xx=0;
            for (var i = 0; i < this.array.length; i++) {
                if(apid==i){
                    xx+=this.array[i]._width
                }else{
                    let ww1=this.array[i]._width
                    if(ww1>this.array[i].wDin)ww1=this.array[i].wDin
                    this.array[i].setX(xx);
                    xx+=ww1
                }
            }


            //this.array.splice(r+1,0,but)
        }





        /////////////////////////////////////////
        /////////////////////////////////////






        this.sob= function(s,p,p1) {
            if(s=="down"){
                self.activeBut=this;
                self.startDrag()
                if(self.fun)self.fun("down",self.activeBut)
            }
            if(s=="closedVopros"){
                if(self.fun)self.fun(s,p,p1)
            }
            if(s=="closed"){
                self.removePanel(p)
                if(self.fun)self.fun(s,p,p1)
                if(self.fun)self.fun("down",self.activeBut)    
            }
        }

        this.getBut = function() {
            for (var i = 0; i < this.arrayCesh.length; i++) {
                if (this.arrayCesh[i].life == false) {
                    this.arrayCesh[i].life = true
                    return this.arrayCesh[i]
                }
            }
            let b = new DBut(this.dContB, 0, 0, "xz", this.sob,null,this)
            b.idArrCesh = this.arrayCesh.length;
            b.height=this._height
            b.borderRadius=this._borderRadius
            b.colorText=this._colorText; 
            this.arrayCesh[this.arrayCesh.length] = b;
            return b;
        };

        this.dragXA = function(p) {
           
            if(!this._activeBut)return;
            let pp=this._activeBut.x-p
            if(this.array[0].uuid!=this._activeBut.uuid){
                if(pp<this._otXZ)pp=this._otXZ
            }else{
                if(pp<0)pp=0
            }
            
            this._activeBut.setX(pp)
        }


        this.dab = function() {
            if(!this._activeBut)return;
            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].uuid==this._activeBut.uuid){
                    this.array[i].active = true;
                }else{
                    this.array[i].active = false;
                }
            }           
            self.dragLines();
            this.drag();
        }







        this.init();
        

    } 

    set activeBut(value) { 
        if(this._activeBut!=value){ 
            this._activeBut=value;  
             
            if(this._activeBut) this._activeBut.dContPar.add(this._activeBut.dCont)
            
                
                
                    
            this.dab();            
        }
    }   
    get activeBut() { return  this._activeBut}


    set width(value) { 
        if(this._width!=value){
            let p =this._width-value
            this._width=value; 
            this.panel.width=this._width;
            this.dragXA(p)
            this.dContB.div.style.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)";         
            
            this.drag();
            this.dragBut(this._width)
        }
    }   
    get width() { return  this._width}

    set wNorm(value) { 
        if(this._wNorm!=value){            
            this._wNorm=value;           
            this.drag();           
        }
    }   
    get wNorm() { return  this._wNorm}



    set height(value) { 
        if(this._height!=value){ 
            this._height=value;
            this.dContB.div.style.clip = "rect(0px "+this._width+"px "+this._height+"px 0px)";
            this.panel.height=this._height;
            for (var i = 0; i < this.arrayCesh.length; i++) {
                this.arrayCesh[i].height=this._height                
            } 

        }
    }   
    get height() { return  this._height} 

    set borderRadius(value) { 
        if(this._borderRadius!=value){ 
            this._borderRadius=value;
            for (var i = 0; i < this.arrayCesh.length; i++) {                
                this.arrayCesh[i].borderRadius=this._borderRadius                
            } 
            this.drag();
            
        }
    }   
    get borderRadius() { return  this._borderRadius} 

    set fontSize(value) { 
        if(this._fontSize!=value){ 
            this._fontSize=value;
            for (var i = 0; i < this.arrayCesh.length; i++) {                
                this.arrayCesh[i].fontSize=this._fontSize                
            } 
            //this.korectSim()
            this.drag();
            
        }
    }   
    get fontSize() { return  this._fontSize} 

    set otXZ(value) { 
        if(this._otXZ!=value){ 
            this._otXZ=value;            
            this.drag();            
        }
    }   
    get otXZ() { return  this._otXZ} 

    set color(value) { 
        if(this._color!=value){ 
            this._color=value;            
            for (var i = 0; i < this.arrayCesh.length; i++) {                
                this.arrayCesh[i].color=this._color                
            }          
        }
    }   
    get color() { return  this._color} 

    set color1(value) { 
        if(this._color1!=value){ 
            this._color1=value;            
            for (var i = 0; i < this.arrayCesh.length; i++) {                
                this.arrayCesh[i].color1=this._color1                
            }          
        }
    }   
    get color1() { return  this._color1} 


    set alphaPlus(value) { 
        if(this._alphaPlus!=value){ 
            this._alphaPlus=value;            
            for (var i = 0; i < this.arrayCesh.length; i++) {                
                this.arrayCesh[i].alphaPlus=this._alphaPlus                
            }          
        }
    }   
    get alphaPlus() { return  this._alphaPlus}
    
    set colorText(value) { 
        if(this._colorText!=value){ 
            this._colorText=value;            
            for (var i = 0; i < this.arrayCesh.length; i++) {                
                this.arrayCesh[i].colorText=value             
            }          
        }
    }   
    get colorText() { return  this._colorText}

    set boolClose(value) { 
        if(this._boolClose!=value){ 
            this._boolClose=value;            
            for (var i = 0; i < this.arrayCesh.length; i++) {                
                this.arrayCesh[i].boolClose=value             
            } 
            this.drag();          
        }
    }   
    get boolClose() { return  this._boolClose}
    
    set boolDrag(value) { 
        if(this._boolDrag!=value){ 
            this._boolDrag=value;            
                     
        }
    }   
    get boolDrag() { return  this._boolDrag}



}




export class DBut {
    constructor(dCont, _x, _y, _text, _fun, _link, par) {
        
        this.type = 'DBut';
        this.uuid=dcmParam.generateRendom(2) 
        this.par=par
        var self = this;
        this.dContPar = dCont
        this._life = false;
        this._active = false;
        this._boolDrag = false;
        this._borderRadius = par._borderRadius;
        this.boolLine = false;
        this._x=0
        this._width=100
        this._height = par._height;
        this.fun = _fun;
        this.dCont=new DCont();
        this.wOtstup=10
        
        this._fontSize=par._fontSize;
        this._boolCloseActive=false

        this.wDin=77777
        this._color=par._color; 
        this._color1=par._color1; 
        this._alphaPlus=par._alphaPlus; 
        this._boolClose=par._boolClose; 

        this.button=new DButton(this.dCont,0,0," ")
        this.button.fun_mousedown=function() {
            
            if (self.boolClose==true && this.eventOriginal && this.eventOriginal.button == 1) {
                
                self.fun("closed",self);
                return
            }
            self.fun("down");
        }

        this.button.borderRadius=this._borderRadius
        this.button.alpha=this._alphaPlus
        this.button.color=this._color1

        this.but = new DButtons(this.dCont, 0, 2, 2, function() {
            if(this.index==0){
                self.fun("closed",self);
            }
            if(this.index==1){
                self.fun("closedVopros",self);
            }
        })
        this.but.wh = 16;
        this.but.boolFond=false
        this.but.tip=2
        this.but.array[0].link=this.par.arrLink[0];
        this.but.array[1].link=this.par.arrLink[1];

        this.but.boolDragIndex=false;


        this.panel=new DPanel(this.dCont)
        this.panel1=new DPanel(this.dCont)

        this.panel.width=1;    
        this.panel1.width=1;

        this.panel.boolLine=false;    
        this.panel1.boolLine=false;
        this.panel.alpha=this.panel1.alpha=0.5


        this.tweenButton
        this.boolNa=false
        if (dcmParam.mobile == false) { 
            if(window.TWEEN!=undefined){                    
                this.but.div.addEventListener('mouseover', function(e){
                    self.but.alpha=0.5;
                    self.tweenBut.stop()
                    self.tweenBut.to({alpha:1},self.par.timeT).start();
                });
                this.tweenBut=new TWEEN.Tween(this.but)            
                    
                this.dCont.div.addEventListener('mouseover', function(e){
                    if(self.active==false){
                        self.boolNa=true;
                        self.tweenButton.to({alpha:(self._alphaPlus+0.5)%1},self.par.timeT).start();
                        self.par.dragLines()
                    }else{
                        self.button.alpha=1;
                    }
                });
                this.dCont.div.addEventListener('mouseout', function(e){
                    if(self.active==false){
                        self.boolNa=false;
                        self.tweenButton.to({alpha:self._alphaPlus},self.par.timeT).start();
                        self.par.dragLines()
                    }else{
                        self.button.alpha=1;
                    }
                });
                this.tweenButton=new TWEEN.Tween(this.button)
            }

        } 


        self.but.index=0;
        this.dCLab=new DCont(this.dCont);
        this.label=new DLabel(this.dCLab)

        this.label.textAlign = 'left';        
        this.label.activMouse = false;
        this.label.width = 1111
        this.label.fontSize = 12
        this.label.color=dcmParam.color1
        this.label.fontSize=this._fontSize;

       
        this.setSaveModel = function(bool) {
            if (bool == true) {
                self.but.index=1;               
            } else {
                self.but.index=0;                
            }            
        }

        
        this.obj = undefined
        this._title = undefined
        this._title1 = undefined    
        this.add = function(o,t,t1) {
            this.obj = o;
            this._title = t;
            this._title1 = t1;
            this.reDragText()
            this.text=this._title          
            this.reDrag();
            this.life=true
        }

        if(window.TWEEN!=undefined){  
            this.tweenX=new TWEEN.Tween(this.dCont)
        }   


        this.setX = function(x) {            
            if(x!==this.x){
                if(this.tweenX){
                    this._x=x;
                    self.tweenX.to({x:x},self.par.timeT).start();
                
                }else{
                    this.x=x;
                }


                
            }
        }

        var yy = 6;
        this.reDrag = function() {
           
            this.but.y = (this._height - this.but.wh)/2;
            this.but.visible=this._boolClose
            this.label.x = this.wOtstup;
            this.label.y = (this._height - this._fontSize)/2-2;          
            this.button.height=this._height+this._borderRadius;
            
            

            this.panel.x=0;
            this.panel1.y=this.panel.y=this._borderRadius-2;
            this.panel1.height=this.panel.height=this._height-this._borderRadius-4;

            this.dddWidth=this._width

        }


        this.wDin=77777
        this.tweenDD
        if(window.TWEEN!=undefined){  
            //this.tweenDD=new TWEEN.Tween(this)
        } 
        this.dragDin = function() {
            if(this.wDin>this._width){
                if(this.button.width!=this._width){
                    this.reDrag()

                }                
            }else{

                
               /* if(this.tweenDD){
                    self.tweenButton.to({dddWidth:this.wDin},self.par.timeT).start();
                }else{*/
                    this.dddWidth=this.wDin
                //}

            }
        }


        this.dragDWW=function(){
            this.button.width=this._dddWidth;
            this.panel1.x=this._dddWidth-2;
            this.but.x = this._dddWidth - this.but._width-this.wOtstup/2;
            if(this.but.x>this.wOtstup)this.but.visible=this._boolClose
            else this.but.visible=false;
            let ww=this.but.x-this.wOtstup
            if(this._boolClose==false)ww+=this.wOtstup*2
            this.dCLab.div.style.clip = "rect(0px "+ww+"px "+this._height+"px 0px)";
        }





        this.sim=1;
        this.wTMin=100;
        this.wText=100;
        this.reDragText = function() {
            this.label.fontSize=this._fontSize;
            this.wText=this.label.getTextWidth(this._title)+this._fontSize;
            if(this._boolClose==true){
                this.wTMin = this.wText+this.wOtstup*2+this.but.wh;
            }else{
                this.wTMin = this.wText+this.wOtstup;
            }
            
        }


             
    }

    set dddWidth(value) {
        if (this._dddWidth != value) {
            this._dddWidth = value;
            this.dragDWW()
        }
    }
    get dddWidth() {
        return this._dddWidth;
    }


    set life(value) {
        if (this._life != value) {
            this._life = value;
            this.boolNa=false;
             
            if (this._life == true) {
                this.dContPar.add(this.dCont)
            } else {
                this.dContPar.remove(this.dCont)  
                this.boolCloseActive=false               
            }
        }
    }
    get life() {
        return this._life;
    }

    set x(value) {
        if (this._x != value) {
            this._x = value;
            this.dCont.x=this._x
        }
    }
    get x() {
        return this._x;
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

    set height(value) {
        if (this._height != value) {
            this._height = value;
            let ww=16;
            if(ww>this._height){
                ww=this._height
            }
            this.but.wh=ww
            this.reDrag();
            
        }
    }
    get height() {
        return this._height;
    }



    set text(value) {
        if (this._text != value) {
            this._text = value; 
            this.label.text = value;          
            this.reDragText();
        }
    }
    get text() {
        return this._text;
    }

    set boolDrag(value) {
        if (this._boolDrag != value) {
            this._boolDrag = value;
            this.setSaveModel(this._boolDrag)

        }
    }
    get boolDrag() { return this._boolDrag; }



    set boolCloseActive(value) {
        if (this._boolCloseActive != value) {
            this._boolCloseActive = value;
            if(this._boolCloseActive==true){
                this.but.index=1
            }else{
                this.but.index=0
            }
        }
    }
    get boolCloseActive() { return this._boolCloseActive; }


    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.boolNa=false;
            if(this.tweenButton)this.tweenButton.stop()

            if (this._active == true) {
                this.button.alpha=1;
                this.button.color=this._color
            } else {
                this.button.alpha=this._alphaPlus;
                this.button.color=this._color1
            }

        }
    }
    get active() { return this._active; }


    set borderRadius(value) { 
        if(this._borderRadius!=value){ 
            this._borderRadius=value;
            
            this.button.borderRadius=value;
            this.reDrag();
            
        }
    }   
    get borderRadius() { return  this._borderRadius} 

    set fontSize(value) { 
        if(this._fontSize!=value){ 
            this._fontSize=value;
            this.label.fontSize=value;
            this.reDragText()
            this.reDrag();
            
        }
    }   
    get fontSize() { return  this._fontSize} 

    set color(value) { 
        if(this._color!=value){ 
            this._color=value;            
            if (this._active == true) {                
                this.button.color=this._color
            } else {                
                this.button.color=this._color1
            }         
        }
    }   
    get color() { return  this._color} 

    set color1(value) { 
        if(this._color1!=value){ 
            this._color1=value;            
            if (this._active == true) {                
                this.button.color=this._color
            } else {                
                this.button.color=this._color1
            }         
        }
    }   
    get color1() { return  this._color1} 

    set alphaPlus(value) { 
        if(this._alphaPlus!=value){ 
            this._alphaPlus=value;            
            if (this._active == true) {
                this.button.alpha=1;       
            } else {
                this.button.alpha=this._alphaPlus;                
            }        
        }
    }   
    get alphaPlus() { return  this._alphaPlus} 

    set colorText(value) { 
        if(this._colorText!=value){ 
            this._colorText=value;            
            this.label.color= value;
            this.panel.color= value;
            this.panel1.color= value;           
        }
    }   
    get colorText() { return  this._colorText} 


    set boolClose(value) { 
        if(this._boolClose!=value){ 
            this._boolClose=value;            
            this.reDragText()        
        }
    }   
    get boolClose() { return  this._boolClose}






}








































