

export class MScaneA {
    constructor(par,  fun) {
        var self=this
        this.type="MScaneA"
        this.par=par
        this.fun=fun;
        this.rPar=par.rPar
        this.array=[]
        this.dCont=new DCont(this.par.dCont);

        this.dCont.x=this.rPar.width1+ this.rPar.otstup*2+this.rPar.whScane


        this.panel=new DPanel(this.dCont,this.rPar.otstup,this.rPar.otstup)
        
        this.panel.width = this.rPar.swh*1.5;
        this.panel.height = this.rPar.swh+ this.rPar.otstup*3+this.rPar.whScane;    

        var www=(this.rPar.swh+this.rPar.otstup*2)
        var www1=(this.rPar.swh+this.rPar.otstup*3+this.rPar.whScane)


        
        let bb=true
        this.button=new DButton(this.panel,0,0,"",function(){
            self.par.par.aBody=null;
            self.par.par.metodType=self.par.par.arrInfo[0].type

            
           /* if(bb){
                self.button.height=self.button.width=www1

            }
            else{
                self.button.height=self.button.width=www
            }*/
            /*
            self.label.visible=bb*/
            bb=!bb

        })

        this.label=new DLabel(this.panel,5,5," ")
        this.label.visible=false
        this.label.width=www1
        this.label.activMouse=false
        this.label.color="#ffffff"
       
        this.button.height=this.button.width=www
        

        this.galBody=new GalBody(this);

        this.setLink=function(l){
            this.label.text=l.length+" количество символов"
            this.button.link=l
        }
    }




}

export class GalBody {
    constructor(par,  fun) {
        var self=this
        this.type="GalBody"
        this.par=par
        this.fun=fun;
        this.rPar=par.rPar
        this.array=[]
        this.arrKesh=[]
        this.dCont=new DCont(this.par.dCont);
        this._aBody=null

        this.dClip=new DClip(this.dCont,11,0,function(){
            
        });
        this.dClip.x = this.rPar.otstup;
        this.dClip.y = this.rPar.otstup*4+this.rPar.swh;
        this.dClip.width=this.rPar.swh*1.5
        this.dClip.sbv=2;
        this.dClip.boolDragMouse = false;   
        this.dClip.height=this.rPar.whScane
        this.dC = new DCont(this.dClip.content);


        this.redactMass=function(){
            this.array.length=0
            for (var i = 0; i < this.arrKesh.length; i++) {
                this.arrKesh[i].visible=false
            }

            for (var i = 0; i < this.arrayBody.length; i++) {
                let p = this.creat()                
            }
             
            let yy=0;
            
            for (var i = 0; i < this.array.length; i++) {
                //this.array[i].setBody(this.arrayBody[i])
                this.array[i].y=yy
                yy+=this.rPar.swh
            }   
            this.dClip.heightContent=yy;

            this.dragInd()

        }

        this.arrayBody=null
        this.drag=function(aBody){ 
            this.arrayBody =  aBody    
            if(this.arrayBody.length!=this.array.length){
                this.redactMass()
            }
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].setBody(this.arrayBody[i])
            }   

        }


        this.sob=function(s,body){
            if(s=="kill"){
                let p=-1
                for (var i = 0; i < self.arrayBody.length; i++) {
                
                    if(self.arrayBody[i].idArrKesh==body.idArrKesh){
                        p=i
                        break
                    }
                }
                if(p!=-1){
                    let bb=this._active                 

                    body.active = false;
                    self.arrayBody.splice(p,1)                    
                }
                self.drag(self.arrayBody)
                self.par.par.fun("dragScane")
                let body1=null
                if(self.arrayBody[self.arrayBody.length-1]!=undefined)body1=self.arrayBody[self.arrayBody.length-1]
                self.par.par.par.aBody=body1;
                
            }

            if(s=="startDrag"){
                self.startDrag(body)
            }
        }

        this.dinBody=null;
        this.startDrag=function(body){
            if(this.dinBody!=null)return 
            this.dinBody= body;
            if (dcmParam.mobile == false) {
                document.addEventListener('mouseup', self.mouseup);
            } else {
                document.addEventListener('touchend', self.mouseup);
            }
            dcmParam.addFunMove(self.mousemove);   
        }
        

        this.mouseup=function(e){
            
            
            if (dcmParam.mobile == false) {
                document.removeEventListener('mouseup', self.mouseup);
            } else {
                document.removeEventListener('touchend', self.mouseup);
            }
            dcmParam.removeFunMove(self.mousemove);         
            
            self.dinBody=null;
              
            
        }
        this.mP={x:0, y:0}
        var ind,ind1
        this.mousemove = function(e) {

            
            self.getPoint(e,self.mP) 
            ind=Math.floor(self.mP.y/ self.rPar.swh)
            ind1=ind//self.arrayBody.length-ind
            if(ind1<0){
                ind1=0
            }
            if(ind1>=self.arrayBody.length){
                ind1=self.arrayBody.length-1
            }
            if(self.dinBody.idArrKesh!=self.arrayBody[ind1].idArrKesh){ 
                self.setPos(self.dinBody,ind1)                
            }

  
        }

        this.setPos = function(b,ii) {
            let p=-1;
            for (var i = 0; i < self.arrayBody.length; i++) {
                if(self.arrayBody[i].idArrKesh==b.idArrKesh){
                    p=i;
                    break
                }
            }
            if(p==-1)return
            if(p==ii)return
                 
            self.arrayBody.splice(p,1)
            self.arrayBody.splice(ii,0,b)
             
            self.drag(self.arrayBody);
            self.redactMass();  
            self.par.par.fun("dragScane")
        }


        var rect1;
        var ss 
        this.getPoint=function(e,p){
            if(p==undefined)p=rP
            if(e && e.target){
                rect1 = self.dC.div.getBoundingClientRect();
            }  
            ss=self.dC.getScaleScane()
              
            if (dcmParam.mobile==false) {
                p.x = e.clientX;
                p.y = e.clientY;
            }else{              
                p.x = e.touches[0].clientX;
                p.y = e.touches[0].clientY;
            }
            p.y-=rect1.y;
            p.y/=ss;
            p.x-=rect1.x;
            p.x/=ss; 
        
            return p;
        }


        this.creat=function(){
            for (var i = 0; i < this.arrKesh.length; i++) {
                if(this.arrKesh[i].visible==false){
                    this.arrKesh[i].visible = true
                    this.array.push(this.arrKesh[i])
                    return this.arrKesh[i]
                }
            }
            let b=new GBDButton(this.dC,0,0,"",this.sob, null, this);
            b.idArr=this.arrKesh.length;
            this.arrKesh.push(b);
            this.array.push(b);
            b.height=this.rPar.swh;
            b.width=this.rPar.swh*1.5
            return b;
        }

        this.dragInd=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].body===this._aBody){
                    this.array[i].active=true
                }else{
                    this.array[i].active=false
                }
            }

        }
    }

    set aBody(value) { 
        if(this._aBody!=value){  
            this._aBody=value;
            this.dragInd()
            
        }
    }   
    get aBody() { return  this._aBody} 
}


export class GBDButton extends DButton {
    constructor(dCont, _x, _y, _text, _fun, _link, par) {
        super(dCont, _x, _y, _text, _fun, _link);
        this.type = 'GBDButton';
        var self=this;
        this.par=par;   
        this.body=null;
        this._active=false
        this.rPar=par.rPar
        this.c=dcmParam._color
        
        this.c1=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -30);

        this.color=this.c1;

        this.bk=new DButton(this,this.rPar.swh,0,"",function(){
            self.fun("kill", self.body)
        },
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItMTIiIHdpZHRoPSIyNCIgeT0iLTEyIiBoZWlnaHQ9IjI0Ij48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTIiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGxpbmUgeDE9IjQwIiB5MT0iNDAiIHgyPSIxNjAiIHkyPSIxNjAiIHN0cm9rZT0iIzAzMDMwMyIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjQwIiB5MT0iMTYwIiB4Mj0iMTYwIiB5Mj0iNDAiIHN0cm9rZT0iIzAzMDMwMyIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjwvZz48bGluZSB4MT0iNDAiIHkxPSI0MCIgeDI9IjE2MCIgeTI9IjE2MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iNDAiIHkxPSIxNjAiIHgyPSIxNjAiIHkyPSI0MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4='
        //this.rPar.linkXZ
        );
        this.bk.width=this.bk.height=this.rPar.swh/2
        
        this.bk.boolFond=false
        this.funReDrag=function(){
            if(self.image)self.image.x=0
        }

        this.setBody=function(body){
            this.body=body;
            this.body.button=this;

            
            let link=this.body.link;
            if(!link && this.body._piclink){
                link = this.body._piclink
            }


           
            if(!link){
                if(this.image){
                    this.image.visible=false
                }
            }else{
                if(this.link!=link){
                    this.link=link                
                } 
                if(this.image){
                    this.image.visible=true
                }  
            }

                     
        }

        this.fun_mousedown=function(){ 
            if(self._active==false)self.par.par.par.par.aBody=self.body;           
            else self.par.par.par.par.aBody=null;
            self.fun("startDrag", self.body)
        }

        

    }

    set active(value) { 
        if(this._active!=value){  
            this._active=value;
            if(this._active==true){
                this.color=this.c
            } else{
                this.color=this.c1
            }
        }
    }   
    get active() { return  this._active} 
}


