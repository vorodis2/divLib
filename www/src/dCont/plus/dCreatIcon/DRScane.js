
export class DRScane {
    constructor(par,  fun, array) {
        var self=this
        this.type="DRScane";
        this._activBody=null
        this.par=par
        this.fun=fun;
        this.array=array

        this.rPar=par.rPar;
        this.dCont=new DCont(this.par.dCont);
        this.ols=this.par.ols;
    


        this.drsPng=new DRSPng(this);
        this.drsSvg=new DRSSvg(this);
        this.oDN={}
        this.oDN[".png"]=this.drsPng
        this.oDN[".svg"]=this.drsSvg

        this.drsActive=this.drsPng
        this.drsActive.active=true
        //this.drsActive=this.drsSvg

        this.draw=function(){
            this.isDin()
            this.drsActive.draw()            
        }

        this.getPicBody=function(body, bbb){
            this.isDin()

            
            this.drsActive.draw([body]) 
            let r=this.drsActive.getBase64()
            if(body.button!=undefined)body.button.link=r
            if(bbb==undefined)this.draw()   
            return r
        }

        this.getPic=function(){
            this.isDin()

            
            let r=this.drsActive.getBase64()               
            return r
        }

        this.getFile=function(wh){
            this.isDin()
            let r=this.drsActive.getFile(wh)               
            return r
        }

        this.getBase64=function(wh){
            this.isDin()
            let r=this.drsActive.getBase64(wh)               
            return r
        }

        this.isDin=function(){
            let t = this.ols.base.type;
            if(this.drsActive.typeId==t)return
            for(var s in this.oDN) {
                if(this.oDN[s].typeId==t){
                    this.oDN[s].active=true
                    this.drsActive=this.oDN[s]
                }else{
                    this.oDN[s].active=false
                }
            }   

        }

        this.getRect = function (a) {
            let r={x:9999999,y:9999999,x1:-9999999,y1:-9999999,w:1,h:-1}
            for (var i = 0; i < a.length; i++) {
                if(a[i].x>r.x1)r.x1=a[i].x
                if(a[i].x<r.x)r.x=a[i].x 
                if(a[i].y>r.y1)r.y1=a[i].y
                if(a[i].y<r.y)r.y=a[i].y   
            }
            r.w=r.x1-r.x
            r.h=r.y1-r.y
            return  r
        }

    }
}


export class DRSSvg {
    constructor(par,  fun) {
        var self=this
        this.type="DRSSvg";
        this.typeId=".svg";
        this._activBody=null
        this._active=false
        this.par=par
        this.fun=fun;
        this.array=[];
        this.rPar=par.rPar;
        this.dC=new DCont(this.par.dCont);
        this.dCont=new DCont();
        this.ols=this.par.ols;


        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.style.width = this.rPar.whScane+"px";
        this.svg.style.height = this.rPar.whScane+"px";
        this.svg.setAttribute("viewBox","0 0 200 200");
        this.svg.setAttribute( "id", "devLib_DCI2" );


        this.dCont.div.append(this.svg);

        var NS = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS( NS, "svg" );


        var filter = document.createElementNS( NS, "filter" );
        filter.setAttribute( "id", "f2" );
        //filter.setAttribute( "stdDeviation", "244" );
        

        var blur = document.createElementNS( NS, "feGaussianBlur" );
        blur.setAttribute( "in","SourceGraphic")
        //blur.setAttribute( "in","SourceGraphic");
        blur.setAttribute( "stdDeviation", "2" );



        //x="-50%" y="-50%" width="200%" height="200%"

        filter.appendChild( blur );
        this.svg.appendChild( filter );
       
        this.bb=true

        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.svg.append(circle);

        this.clear=function(){
            if(this.bb==true){
                this.svg.removeChild( filter );
                this.bb=false
            }
            //
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active=false
            }           
        }

        var k=0
        this.draw=function(a){
            this.clear()
            //this.drawArr(this.par.array)
            k=this.ols.base.sahTen
            if(a==undefined)a=this.par.array
            if(k!=0){
                this.svg.appendChild( filter );
                this.bb=true
                blur.setAttribute( "stdDeviation", ""+this.ols.base.glowSah);
                

                filter.setAttribute( "x","-"+this.ols.base.glowSah)
                filter.setAttribute( "width",""+this.ols.base.glowSah*2)
                filter.setAttribute( "y","-"+this.ols.base.glowSah)
                filter.setAttribute( "height",""+this.ols.base.glowSah*2)
                filter.setAttribute( "color", this.ols.base.color );

                let h222= this.getKey('group')
                h222.setP(this.svg);

                for (var j = 0; j < k; j++) {  
                    let hron1= this.getKey('group')
                    hron1.setP(h222.oSvg);


                    let h1 = this.getKey('line')
                    h1.oSvg.setAttribute('x1','-50');
                    h1.oSvg.setAttribute('y1','-50');
                    h1.oSvg.setAttribute('x2','-50');
                    h1.oSvg.setAttribute('y2','-50');

                    h1.setP(hron1.oSvg);
                    
                    this.drawArr(a,hron1.oSvg, this.ols.base.color );
                    


                    hron1.oSvg.setAttribute("filter","url(#f2)")
                    
                }
                //h222.oSvg.setAttribute("filter","url(#f2)")
                

                for (var j = 0; j < k; j++) {        
                    /*if(this.ols.base.glowSah==0)break
                    this.aC[2+j].filter = 'blur('+this.ols.base.glowSah+'px)';
                    this.aC[0].drawImage(this.aCanvas[2+j],0,0)*/
                } 
            }
            

            this.drawArr(a,this.svg,undefined,true);

            /*this.aC[0].drawImage(this.aCanvas[1],0,0)*/
        }

        this.drawArr=function(a, ctx, color, idArr){
            
            for (var i = 0; i < a.length; i++) {
                let ii=undefined
                if(idArr)ii=i
                this.drawBody(a[i], ctx, color, ii)                
            }
        }


        /*
if(obj.type=="Line"){ 
                if(obj.blColor==false)return
                ctx.beginPath();                              
                ctx.moveTo(body.array[0].x, body.array[0].y);
                ctx.lineTo(body.array[1].x, body.array[1].y);                
                ctx.stroke();            
            }
        */

        var obj
        var hron
        var cF
        var sss
        this.drawBody=function(body, ctx, color, idArr){
            obj=body.object;
            cF=color
            if(cF==undefined)cF=obj.fcolor

            color = color!=undefined ? color : obj.lColor//obj.lColor//

           

            
            if(obj.type=="Line"){ 
                if(obj.blColor==false)return

                hron= this.getKey('line')
                hron.setP(ctx);
                hron.oSvg.setAttribute('x1',''+body.array[0].x);
                hron.oSvg.setAttribute('y1',''+body.array[0].y);
                hron.oSvg.setAttribute('x2',''+body.array[1].x);
                hron.oSvg.setAttribute('y2',''+body.array[1].y);
                hron.oSvg.setAttribute("stroke", color); 
                hron.oSvg.setAttribute("stroke-width", ""+obj.lineSah); 
                if(obj.bRound==true){
                    hron.oSvg.setAttribute("stroke-linecap","round")                    
                }else{
                    hron.oSvg.setAttribute("stroke-linecap","butt") 
                }

                
            }

            if(obj.type=="Сircle"){ 
                if(obj.blColor==true || obj.bfColor==true){
                    let d=this.getDistance(body.array[0],body.array[1])
                    hron= this.getKey('circle')
                    hron.setP(ctx);
                    hron.oSvg.setAttribute('cx',''+body.array[0].x);
                    hron.oSvg.setAttribute('cy',''+body.array[0].y);
                    hron.oSvg.setAttribute('r',''+d);
                    if(obj.bfColor==true){
                        
                        hron.oSvg.setAttribute("fill",""+cF)
                    }else{
                        hron.oSvg.setAttribute("fill","none")
                    }
                    if(obj.blColor==true){
                        hron.oSvg.setAttribute("stroke", color); 
                        hron.oSvg.setAttribute("stroke-width", ""+obj.lineSah); 
                    }else{
                        hron.oSvg.setAttribute("stroke", "none"); 
                        hron.oSvg.setAttribute("stroke-width", "none");
                    }                     
                }
            }


            if(obj.type=="Rect" || obj.type=="BitMap"){ 
                if(obj.blColor==true || obj.bfColor==true){
                    let r=this.par.getRect(body.array)

                    if(r.w==0)r.w=0.001
                    if(r.h==0)r.h=0.001
                    hron= this.getKey('rect')
                    hron.setP(ctx);
                    hron.oSvg.setAttribute('x',''+r.x);
                    hron.oSvg.setAttribute('y',''+r.y);
                    hron.oSvg.setAttribute('width',''+r.w);
                    hron.oSvg.setAttribute('height',''+r.h);
                    
                    if(obj.bRound==true){
                        hron.oSvg.setAttribute('rx',''+obj.lineSah);
                        hron.oSvg.setAttribute('ry',''+obj.lineSah);
                    }else{
                        hron.oSvg.setAttribute('rx','0');
                        hron.oSvg.setAttribute('ry','0');
                    }

                    if(obj.bfColor==true){
                        hron.oSvg.setAttribute("fill",""+cF)
                    }else{
                        hron.oSvg.setAttribute("fill","none")
                    }
                    if(obj.blColor==true){
                        hron.oSvg.setAttribute("stroke", color); 
                        hron.oSvg.setAttribute("stroke-width", ""+obj.lineSah); 
                    }else{
                        hron.oSvg.setAttribute("stroke", "none"); 
                        hron.oSvg.setAttribute("stroke-width", "none");
                    } 


                }
            }

            if(obj.type=="Line3"){ 
                if(body.array.length==2){
                    hron= this.getKey('line')
                    hron.setP(ctx);
                    hron.oSvg.setAttribute('x1',''+body.array[0].x);
                    hron.oSvg.setAttribute('y1',''+body.array[0].y);
                    hron.oSvg.setAttribute('x2',''+body.array[1].x);
                    hron.oSvg.setAttribute('y2',''+body.array[1].y);


                }else{
                    hron= this.getKey('path')
                    hron.setP(ctx);
                    sss="M "+body.array[0].x+" "+body.array[0].y
                    sss+="C "+body.array[2].x+" "+body.array[2].y;
                  
                    sss+=", "+body.array[1].x+" "+body.array[1].y;
                    sss+=", "+body.array[1].x+" "+body.array[1].y;
                  
                    hron.oSvg.setAttribute("d", sss)


                }

                if(obj.bRound==true){
                    hron.oSvg.setAttribute("stroke-linecap","round")                    
                }else{
                    hron.oSvg.setAttribute("stroke-linecap","butt") 
                }               
               

                if(obj.bfColor==true){
                    hron.oSvg.setAttribute("fill",""+cF)
                }else{
                    hron.oSvg.setAttribute("fill","none")
                }
                if(obj.blColor==true){
                    hron.oSvg.setAttribute("stroke", color); 
                    hron.oSvg.setAttribute("stroke-width", ""+obj.lineSah); 
                }else{
                    hron.oSvg.setAttribute("stroke", "none"); 
                    hron.oSvg.setAttribute("stroke-width", "none");
                }
            }



            if(obj.type=="Line2"|| obj.type=="LineDrag"){ 
                    if(body.array.length<=1)return
                
                    hron= this.getKey('polyline')
                    hron.setP(ctx);
                    sss=body.array[0].x+','+body.array[0].y


                    for (var i = 1; i < body.array.length; i++) {
                        sss+=' '+body.array[i].x+','+body.array[i].y
                    }
                    //sss='20,20 40,25 60,40 80,120 120,140 200,180'

                    hron.oSvg.setAttribute('points',sss);

                   

                
                
                if(obj.bRound==true){
                    hron.oSvg.setAttribute("stroke-linecap","round")                    
                }else{
                    hron.oSvg.setAttribute("stroke-linecap","butt") 
                }


                if(obj.bfColor==true){
                    hron.oSvg.setAttribute("fill",""+cF)
                }else{
                    hron.oSvg.setAttribute("fill","none")
                }
                if(obj.blColor==true){
                    hron.oSvg.setAttribute("stroke", color); 
                    hron.oSvg.setAttribute("stroke-width", ""+obj.lineSah); 
                }else{
                    hron.oSvg.setAttribute("stroke", "none"); 
                    hron.oSvg.setAttribute("stroke-width", "none");
                }
            }

            if(obj.type=="Text"){
                let s=obj.lineSah*4+"px "+this.rPar.fontFamily   
                s=this.rPar.fontFamily+" "+obj.lineSah*4+"px" 
                s='italic 40px serif'               
                /*ctx.fillStyle = color!=undefined ? color : obj.lColor
                ctx.font = s;*/
                aa=body.object.text.split("\n")
                xx=body.array[0].x+3
                yy=body.array[0].y+obj.lineSah*4-obj.lineSah*ss

               

                
                
                for (var i = 0; i < aa.length; i++) {
                    hron= this.getKey('text')
                    hron.setP(ctx);
                    hron.oSvg.textContent = aa[i]
                    hron.oSvg.setAttribute('x',''+xx);
                    hron.oSvg.setAttribute('y',''+yy);
                    hron.oSvg.setAttribute('font-size',obj.lineSah*4+'px');
                    hron.oSvg.setAttribute('font-family',this.rPar.fontFamily+'');
                    hron.oSvg.setAttribute("fill",""+color)

                    yy+=obj.lineSah*4
                }                 
            }
           
            if(idArr!=undefined && hron && hron.oSvg)hron.oSvg.setAttribute("ia",""+idArr)
        }
        var aa
        var xx,yy
        var ss=0.5

        this.getKey=function(key){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i]._active==false){
                    if(this.array[i].key==key){
                        //this.array[i].active=true
                        return this.array[i]
                    }
                }
            }
            let hronSvg=new HronSvg(this, key)
            hronSvg.idArr=this.array.length
            this.array.push(hronSvg)
            //hronSvg.active=true
            return hronSvg
        }


        //var s = new XMLSerializer().serializeToString(document.getElementById("svg"))
        var xxw=new XMLSerializer()

        this.getBase64 =function(wh){ 
                     
            let r=xxw.serializeToString(this.svg) 
                      
            var encodedData = "data:image/svg+xml;base64," +window.btoa(r);
            
            return encodedData
        }
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
        this.getFile=function(wh){
            this.draw()
            var img_b64=this.getBase64(wh);  
                   
            var file = dataURLtoFile(img_b64, 'image.svg'); 
                            
            return file
        }




        this.getDistance = function (p1, p2) {      
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
        };
    }

    set active(value) { 
        if(this._active!=value){  
            this._active=value;
            if(this._active==true){                
                this.dC.add(this.dCont);
            }else{
                this.dC.remove(this.dCont);
            }
            
        }
    }   
    get active() { return  this._active} 
}


export class HronSvg {
    constructor(par,  key) {
        this.par=par
        this.key=key
        this._active=false

        this.oSvg=null;
        if(key=="line")this.oSvg=document.createElementNS('http://www.w3.org/2000/svg','line');
        if(key=="group")this.oSvg=document.createElementNS('http://www.w3.org/2000/svg','g');
        if(key=="circle")this.oSvg=document.createElementNS('http://www.w3.org/2000/svg','circle');
        if(key=="rect")this.oSvg=document.createElementNS('http://www.w3.org/2000/svg','rect');
        if(key=="path")this.oSvg=document.createElementNS('http://www.w3.org/2000/svg','path');
        if(key=="polyline")this.oSvg=document.createElementNS('http://www.w3.org/2000/svg','polyline');
        if(key=="text")this.oSvg=document.createElementNS('http://www.w3.org/2000/svg','text');
        //this.par.svg.append(this.oSvg);
       // this.oSvg.setAttribute('key',key);

        this.pS=null
        this.setP=function(pS){
            this.pS=pS;
            this.active=true;            
        }
    }
    set active(value) { 
        if(this._active!=value){  
            this._active=value;
            if(this._active==true){
               
                this.pS.append(this.oSvg);
            }else{
                this.pS.removeChild(this.oSvg);
            }
            
        }
    }   
    get active() { return  this._active} 
}
        




export class DRSPng {
    constructor(par,  fun) {
        var self=this
        this.type="DRSPng";
        this.typeId=".png";
        this._activBody=null
        this._active=false
        this.par=par
        this.fun=fun;

        this.rPar=par.rPar;
        this.dC=new DCont(this.par.dCont);
        this.dCont=new DCont();
        this.ols=this.par.ols;

       

        

        this.aCanvas=[] 
        this.aC=[]

        for (var i = 0; i < 6; i++) {
            this.aCanvas[i] =  document.createElement('canvas');
            this.aCanvas[i].style.position = 'fixed';
            this.aCanvas[i].style.top = '0px';
            this.aCanvas[i].style.left = '0px';
            this.aCanvas[i].width = this.rPar.whScane
            this.aCanvas[i].height = this.rPar.whScane
            this.aC[i] = this.aCanvas[i].getContext('2d');
            if(i==0)this.dCont.div.appendChild(this.aCanvas[i]);  
        } 



        this.getBase64=function(wh){

            let ww = this.ols.base.wh
            if(wh!=undefined)ww=wh

            let ii=5
            this.aCanvas[ii].width = ww
            this.aCanvas[ii].height = ww
            this.aC[ii].clearRect(0, 0, ww, ww);

            this.aC[ii].drawImage(this.aCanvas[0],0,0,ww,ww)

            let r=this.aCanvas[ii].toDataURL();           
            return r
        }

        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
        

        this.getFile=function(wh){
            this.draw()
            var img_b64=this.getBase64(wh);            
            var file = dataURLtoFile(img_b64, 'image.png');                
            return file
        }



        this.clear=function(){
            for (var i = 0; i < this.aC.length; i++) {
                this.aC[i].clearRect(0, 0, this.rPar.whScane, this.rPar.whScane);
            }            
        }

        var k=0
        this.draw=function(a){
            this.clear()
            k=this.ols.base.sahTen
            if(a==undefined)a=this.par.array
            this.drawArr(a);
            for (var j = 0; j < k; j++) {        
                if(this.ols.base.glowSah==0)break
                this.aC[2+j].filter = 'blur('+this.ols.base.glowSah+'px)';
                this.aC[0].drawImage(this.aCanvas[2+j],0,0)
            }
            this.aC[0].drawImage(this.aCanvas[1],0,0)
        }


        this.drawArr=function(a){
           
            for (var i = 0; i < a.length; i++) {
                this.drawBody(a[i], this.aC[1])
                for (var j = 0; j < k; j++) {
                    this.drawBody(a[i], this.aC[2+j], this.ols.base.color)
                }
            }
        }


        var bb
        var obj 
        var xx=2
        var yy=2
        var aa
        var ss=0.5
        this.drawBody=function(body, ctx, color){
            obj=body.object;
            
            



            if(obj.bRound!=undefined){
                if(obj.bRound==true){
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round"
                }else{
                    ctx.lineCap = 'none';
                    ctx.lineJoin = 'none'
                } 
                
                ctx.strokeStyle = color!=undefined ? color : obj.lColor//obj.lColor//
                ctx.lineWidth =obj.lineSah;   

            }
            if(obj.type=="Line"){ 
                if(obj.blColor==false)return
                ctx.beginPath();                              
                ctx.moveTo(body.array[0].x, body.array[0].y);
                ctx.lineTo(body.array[1].x, body.array[1].y);                
                ctx.stroke();   
                ctx.closePath();         
            }

            if(obj.type=="Сircle"){
                if(obj.blColor==true || obj.bfColor==true){
                    let d=this.getDistance(body.array[0],body.array[1])
                    ctx.beginPath();                     
                    ctx.arc(body.array[0].x, body.array[0].y, d, 0, 2 * Math.PI);
                    if(obj.bfColor==true){
                        ctx.fillStyle =obj.fcolor;                 
                        ctx.fill();
                    }
                    if(obj.blColor==true){
                        ctx.stroke();
                    }
                }  
                ctx.closePath();              
            }
            if(obj.type=="Rect"){ 
                if(obj.blColor==true || obj.bfColor==true){
                    if(obj.bRound==true){
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round"
                }else{
                    ctx.lineCap = 'butt';
                    ctx.lineJoin = 'butt'
                } 

                    ctx.beginPath(); 
                    let r=this.par.getRect(body.array)
                    ctx.rect(r.x, r.y, r.w, r.h, 0);
                    if(obj.bfColor==true){
                        ctx.fillStyle =obj.fcolor;                 
                        ctx.fill();
                    }
                    if(obj.blColor==true){
                        ctx.stroke();
                    }
                }
                ctx.closePath();
            } 
            
            if(obj.type=="Line2" || obj.type=="LineDrag"){ 
                if(body.array.length<=1)return
                bb=false
                if(body.array[0].x==body.array[body.array.length-1].x && body.array[0].y==body.array[body.array.length-1].y){
                    bb=true
                }   

                ctx.beginPath();
                
                if(bb==false){
                    ctx.moveTo(body.array[0].x, body.array[0].y);
                    for (var i = 1; i < body.array.length; i++) {
                        ctx.lineTo(body.array[i].x, body.array[i].y);
                    }
                }else{
                    ctx.moveTo(body.array[1].x, body.array[1].y);
                    for (var i = 2; i < body.array.length; i++) {
                        ctx.lineTo(body.array[i].x, body.array[i].y);
                    }
                    ctx.closePath(); 
                }
               
               
                if(obj.bfColor==true){
                    ctx.fillStyle =obj.fcolor;                 
                    ctx.fill();
                }
                if(obj.blColor==true){
                    ctx.stroke();
                }  
                ctx.closePath();        
            }

            if(obj.type=="Line3"){ 
                if(obj.blColor==true || obj.bfColor==true){
                    if(obj.bRound==true){
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round"
                }else{
                    ctx.lineCap = 'butt';
                    ctx.lineJoin = 'butt'
                } 
                    
                    ctx.beginPath();
                    //this.ctx.moveTo(body.position.x, body.position.y);
                    if(body.array.length==2){
                        ctx.moveTo(body.array[0].x, body.array[0].y);
                        ctx.lineTo(body.array[1].x, body.array[1].y);  
                    }else{
                        ctx.moveTo(body.array[0].x, body.array[0].y);
                        ctx.quadraticCurveTo(body.array[2].x, body.array[2].y, body.array[1].x, body.array[1].y);
                     
                    }
                    //this.ctx.quadraticCurveTo(body.position2.x, body.position2.y, body.position1.x, body.position1.y);
                     
                    
                    if(obj.bfColor==true){
                        ctx.fillStyle =obj.fcolor;                 
                        ctx.fill();
                    }
                    if(obj.blColor==true){
                        ctx.stroke();
                    }
                }
                ctx.closePath();
            }

            if(obj.type=="Text"){
                ss=0.5
                let s=obj.lineSah*4+"px "+this.rPar.fontFamily                
                ctx.fillStyle = color!=undefined ? color : obj.lColor
                ctx.font = s;
                aa=body.object.text.split("\n")
                xx=body.array[0].x+3
                yy=body.array[0].y+obj.lineSah*4-obj.lineSah*ss
                for (var i = 0; i < aa.length; i++) {
                    ctx.fillText(aa[i], xx, yy);
                    yy+=obj.lineSah*4
                }                 
            }

            
            if(obj.type=="BitMap"){
                dd=this.getDistance(body.array[0], body.array[1]) 
                if(dd==0) return

                let r=this.par.getRect(body.array)
                
                rrrr.x=r.x;
                rrrr.y=r.y;
                ss=body.width/r.w;
                if(ss<body.height/r.h)ss=body.height/r.h

                rrrr.w=body.width/ss;
                rrrr.h=body.height/ss; 

                if(color!=undefined){
                    if(obj.blColor==true){
                        body.dragColor(color)
                        ctx.drawImage(
                            body.bitmapData1.canvas,
                            rrrr.x,
                            rrrr.y,
                            rrrr.w,
                            rrrr.h
                        );
                    }
                }else{
                    
                    ctx.drawImage(
                        body.bitmapData2.canvas,
                        rrrr.x,
                        rrrr.y,
                        rrrr.w,
                        rrrr.h
                    );
                } 
            } 
        }


        var ww, hh,ss,dd
        var rrrr={x:0,y:0,w:1,h:1}

        this.getDistance = function (p1, p2) {      
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
        };


    }

/*
 if(obj.type=="Rect"){ 
                if(obj.blColor==true || obj.bfColor==true){
                    let r=this.getRect(body.array)

                    if(r.w==0)r.w=0.001
                    if(r.h==0)r.h=0.001
                    hron= this.getKey('rect')
                    hron.setP(ctx);
                    hron.oSvg.setAttribute('x',''+r.x);
                    hron.oSvg.setAttribute('y',''+r.y);
                    hron.oSvg.setAttribute('width',''+r.w);
                    hron.oSvg.setAttribute('height',''+r.h);
                    
                    if(obj.bRound==true){
                        hron.oSvg.setAttribute('rx',''+obj.lineSah);
                        hron.oSvg.setAttribute('ry',''+obj.lineSah);
                    }else{
                        hron.oSvg.setAttribute('rx','0');
                        hron.oSvg.setAttribute('ry','0');
                    }

                    if(obj.bfColor==true){
                        hron.oSvg.setAttribute("fill",""+cF)
                    }else{
                        hron.oSvg.setAttribute("fill","none")
                    }
                    if(obj.blColor==true){
                        hron.oSvg.setAttribute("stroke", color); 
                        hron.oSvg.setAttribute("stroke-width", ""+obj.lineSah); 
                    }else{
                        hron.oSvg.setAttribute("stroke", "none"); 
                        hron.oSvg.setAttribute("stroke-width", "none");
                    }                    
                }
            }



*/



    set active(value) { 
        if(this._active!=value){  
            this._active=value;
            if(this._active==true){                
                this.dC.add(this.dCont);
            }else{
                this.dC.remove(this.dCont);
            }
            
        }
    }   
    get active() { return  this._active} 
}

