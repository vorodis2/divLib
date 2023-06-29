

export class MThree3d {
    constructor(par,  fun) {
        var self=this
        this.type="MThree3d"
        this.par=par
        this.fun=fun;
        this.rPar=par.rPar
        this.array=[]
        this.dC=new DCont(this.par.dCont);        
        this.dCont=new DCont(this.dC);
        this.dC.x=480
        this._width=this._height=512

        this._active = false
        this.panel
        this.init=function(){
            //self.bb.visible=false;
            if(this.panel!=undefined)return
            this.panel=new DPanel(this.dCont);
            this.panel.width=this.panel.height=230

            this.dddd=new DCont(this.panel);
            this.dddd.scale=this.panel.width/512

            var scene = new THREE.Scene();
            //scene.background = new THREE.Color( 0xa0a0a0 );
            //scene.fog = new THREE.Fog( 0xa0a0a0, 10, 500 );

            var camera = new THREE.PerspectiveCamera( 35, this._width / this._height, 1, 500 );
            camera.position.set( 0, 0, 40 );
            scene.add( camera );

            //

          /*  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 100, 0 );
            scene.add( hemiLight );*/

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
            hemiLight.color.setHSL( 0.6, 1, 0.6 );
            hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
            hemiLight.position.set( 0, 30, 50 );
            scene.add( hemiLight );


            var dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( - 0, 50, 50 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 50;
            dirLight.shadow.camera.bottom = - 25;
            dirLight.shadow.camera.left = - 25;
            dirLight.shadow.camera.right = 25;
            dirLight.shadow.camera.near = 0.1;
            dirLight.shadow.camera.far = 200;
            dirLight.shadow.mapSize.set( 1024*2, 1024*2 );
            scene.add( dirLight );

         


            var renderer = new THREE.WebGLRenderer( { antialias: true , alpha:true} );
           // renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( this._width, this._height );
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.shadowMap.enabled = true;
          //  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.setClearColor("#ff0000", 0);

            this.contHTML= document.createElement('div');
            this.contHTML.style.position = 'fixed';
            this.contHTML.style.top = '0px';         //drflgkjdflg  dasdasdf dasgfadsgf ads z dasgfda            fgh
            this.contHTML.style.left = '0px';
            this.dddd.div.appendChild(this.contHTML);  
            this.contHTML.appendChild(renderer.domElement);


  

            //

            
            this.renderer=renderer
            this.scene=scene

            this.camera=camera

            this.canvas = document.createElement('canvas');
            this.canvas.width = 1024;
            this.canvas.height = 512;
            this.ctx =this.canvas.getContext('2d');
            this.canvasTexture=new THREE.CanvasTexture(this.canvas);
            this.canvasTexture.wrapS = this.canvasTexture.wrapT = THREE.RepeatWrapping;
            this.canvasTexture.repeat.x = 1
            this.canvasTexture.repeat.y = 1

            this.mesh=new THREE.Mesh(new THREE.SphereBufferGeometry(10,64,32),new THREE.MeshPhongMaterial({ map:this.canvasTexture, color: 0xffffff } ))            
            scene.add(this.mesh)
            //this.mesh.rotation.y=Math.PI
            this.mesh.receiveShadow = true;           

            this.render()
            this.redrag()
        }

        this.image=new Image();
        this.image.onload = () => {
          
            self.redrag()
        }

        this.redrag= function () {
            if(this.l64==undefined)return;
           
            if(this._active==false)return; 
            
            this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#ffffff"
            this.ctx.fillRect(0, 0,this.canvas.width, this.canvas.height); 

            this.ctx.drawImage(this.image,0,0,this.canvas.width/2, this.canvas.height);
            self.canvasTexture.needsUpdate = true;
            this.render()
        }


        this.l64
        this.setLink= function (l64) {
            this.l64=l64;
           
            this.image.src=l64
        }




        this.render = function () {
            this.renderer.render(this.scene, this.camera);
        };

        this.bb1=new DButton(this.dC,0,230-this.rPar.swh,"<",function(){
            self.render() 
            if(self.fun)self.fun("pic",self.renderer.domElement.toDataURL("image/png"))
        })
        this.bb1.visible=false
        this.bb1.width=this.bb1.height=this.rPar.swh
       




        this.bb=new DButton(this.dC,0,0,"+3",function(){
            self.active=!self.active
        })
        this.bb.scale=0.7    
        this.bb.width=this.bb.height=this.rPar.swh
        //self.active=true
    }
    set active(value) { 
        if(this._active!=value){  
            this._active=value;
            this.bb1.visible=value
            this.init()
            this.dCont.visible=value
            this.redrag()
            
        }
    }   
    get active() { return  this._active} 

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
            if(this.link!=this.body.link){
                this.link=this.body.link                
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


