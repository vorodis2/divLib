import { DRScane} from './DRScane.js';

import { DREvent} from './DREvent.js';
import { UXml} from './UXml.js';
export class Scane {
    constructor(par,  fun, dCont) {
        var self=this
        this.type="Scane"
        this.par=par
        this.fun=fun;
        this.arrInfo=par.arrInfo
        this.rPar=par.rPar
        this.dCont=new DCont(dCont);
        this.uXml=undefined
        this.ols=this.par.ols;

        this.wScane=new WScane(this);

        this.drScane=new DRScane(this, function(s,p,p1){},this.wScane.array);      
        this.drEvent=new DREvent(this, function(s,p,p1){
            if(s=="dragScane")self.drScane.draw()

        },this.wScane.array);      
        


        this.setLink=function(link, bClear, bType){
            let bb=true;
            //console.warn("===0===",link, bClear, bType)
            let a1=link.split(".");
            let ss=a1[a1.length-1].toUpperCase();
            if(bClear==true)this.wScane.clear();

            if(link.indexOf("data:image/svg+xml;base64")!=-1)ss="SVG"

            


            let tb=0;
            let sahLoad = this.par.sahLoad;
            if(ss=="SVG"){ 

                if(window.$!=undefined){

                    window.$.ajax({
                        url: link,
                        dataType: "text",
                        async: true,
                        success: function(msg){
                            if(sahLoad!==self.par.sahLoad)return
                            var test = msg;
                            if(self.uXml==undefined)self.uXml=new UXml()

                            if(test.indexOf("devLib_DCI2")==-1){
                                self.setLink2(link)
                                if(bType==true)self.dragType(".png") 
                                return    
                            }    


                            //console.warn("===1===",self.uXml) 
                            //console.warn("===2===",test) 
                            let  df=self.uXml.testToDOM(test)
                            //console.warn("===2===",df) 
                            let  df1=self.uXml.xml2json(df)
                            //console.warn("===2===",df1) 
                            let o = JSON.parse( df1)
                            
                            if(o && o.svg && o.svg["@id"] && o.svg["@id"]=="devLib_DCI2"){                                
                                
                                self.parserSVG(o.svg)
                                if(bType==true)self.dragType(".svg") 
                            }else{
                                self.setLink2(link)
                                if(bType==true)self.dragType(".png") 
                            }
                            
                        },
                        error:function(msg){
                            
                            self.setLink2(link)
                            if(bType==true)self.dragType(".png") 
                        }
                    });
                }
                return
                
                
            }
            

            
            

            this.setLink2(link)
            if(bType==true)this.dragType(".png")    
            
        }

        this.setLink2=function(link){
            this.drEvent.plusPic(link);
        }
        this.dragType=function(str){            
            this.par.metodType=this.par.arrInfo[0].type;
            this.par.menu.mIBlok.mibBase.setAT(str)
        }


        this.parserSVG=function(o){
            
            if(o.filter){
                this.ols.base.glowSah = o.filter.feGaussianBlur["@stdDeviation"]*1
                this.ols.base.color = o.filter["@color"];
                this.ols.base.sahTen=0;
                if(o.g && o.g.g){
                    this.tuArray(o.g,"g")
                    this.ols.base.sahTen=o.g.g.length;                    
                }
            }else{
                this.ols.base.sahTen=0;
            }
            this.bodyFin=null
            for (var s in o){
                if(s=="circle" || s=="rect" || s=="line" || s=="path" || s=="polyline" || s=="text"){
                    this.tuArray(o, s)
                    for (var i = 0; i < o[s].length; i++) {
                        this.setOKey(o[s][i],s)
                    }                    
                }
            }

            this.wScane.array.sort(function(a,b){
                return a.idxz-b.idxz;
            })

            
            this.drEvent.galBody.drag(this.wScane.array)
            this.wScane.dragBig(); 
            if(this.bodyFin)  this.par.aBody=    this.bodyFin     
        }


        this.bodyFin
        var ss=0.5
        var body, obj
        this.setOKey=function(o,key){

            




            obj=JSON.parse(JSON.stringify( this.rPar.objStart));
            obj.blColor=false
            if(o["@stroke-width"] !=undefined ){
                if(o["@stroke-width"]!=="none"){
                    obj.blColor=true
                    if(o["@stroke"] !=undefined )obj.lColor=o["@stroke"];
                    obj.lineSah=o["@stroke-width"]*1;
                }                
            }
            obj.bfColor=false
            if(o["@fill"] !=undefined ){
                if(o["@fill"]!=="none"){
                    obj.bfColor=true;
                    obj.fcolor =obj.fColor=o["@fill"];
                }
            }
            obj.bRound=false;

            if(o["@stroke-linecap"]!=undefined)if(o["@stroke-linecap"]=="round")obj.bRound=true;


            if(key=="text"){

                obj.type="Text";
                let aa=o['@font-size'].split("px")
                obj.lineSah=aa[0]*1/4;
                obj.lColor=o["@fill"]

                

                body=this.wScane.creat(obj);
                let xx=o["@x"]*1-3;
                let yy=o["@y"]*1-obj.lineSah*4+obj.lineSah*ss;
                body.addPoint(xx, yy);
                
                body.object.text=o["#text"]                
            }


            if(key=="polyline"){

                obj.type="Line2";
                let a=o["@points"].split(',');
                for (var i = 0; i < a.length; i++) {
                    let a1=a[i].split(' ');
                    if(a1.length==2){
                        a.splice(i,1,a1[0],a1[1])
                    }
                }

                body=this.wScane.creat(obj);
                for (var i = 0; i < a.length; i+=2) {
                    body.addPoint(a[i]*1, a[i+1]*1);
                }
            }

            if(key=="path"){               

                obj.type="Line3";
                let s0=o['@d'];
                let s1=s0.replace("M"," ")+'';
                let s2=s1.replace("C"," ")+'';
                let s3=s2.replace(","," ")+'';
                let s4=s3.replace(","," ")+'';
               
                let a=[];
                let b=false;
                let sah=0
                for (var i = 0; i < s4.length; i++) {
                    if(s4[i]==" "){
                        if(b){
                            b=false;
                            sah++;
                        }
                        
                    }else{
                        b=true;
                        if(a[sah]==undefined)a[sah]=''
                        a[sah]+=s4[i]    
                    }
                }

             


                body=this.wScane.creat(obj);

                
                body.addPoint(a[0]*1, a[1]*1);
                body.addPoint(a[4]*1, a[5]*1); 
                body.addPoint(a[2]*1, a[3]*1);                  

            }



            if(key=="line"){
                obj.type="Line";
                body=this.wScane.creat(obj);                
                body.addPoint(o["@x1"]*1, o["@y1"]*1);
                body.addPoint(o["@x2"]*1, o["@y2"]*1);                
            }



            if(key=="circle"){
                
                if(o["@rx"] !=undefined && o["@rx"] !="0")obj.bRound=true;  

                obj.type="Сircle";
                body=this.wScane.creat(obj);
                
                body.addPoint(o["@cx"]*1, o["@cy"]*1);
                body.addPoint(o["@cx"]*1+o["@r"]*1, o["@cy"]*1);
             
            }

    
            if(key=="rect"){
                
                if(o["@rx"] !=undefined && o["@rx"] !="0")obj.bRound=true;  

                obj.type="Rect";
                body=this.wScane.creat(obj);
                
                body.addPoint(o["@x"]*1, o["@y"]*1);
                body.addPoint(o["@x"]*1+o["@width"]*1, o["@y"]*1+o["@height"]*1);

                
            }

            if(body ){
                body.idxz=0;
                if(o["@ia"]!=undefined)body.idxz=o["@ia"];
                this.bodyFin=body;
            }
        }

        this.tuArray=function(o,key){
            if(o[key]==undefined){
                o[key]=[]
                return
            }else{
                if(o[key].length==undefined){
                    o[key]=[o[key]]
                }
            }
        }


    }

    set metodType(value) { 
        if(this._metodType!=value){  
            this._metodType=value;            
            this.drEvent.metodType=value;                   
        }
    }   
    get metodType() { return  this._metodType}


    set aBody(value) { 
      
        if(this._aBody!==value){  
            this._aBody=value;
            this.wScane.aBody=value; 
            this.drEvent.aBody=value;    
        }
    }   
    get aBody() { return  this._aBody}
}



export class WScane {
    constructor(par,  fun) {
        var self=this
        this.type="WScane";
        this._activBody=null
        this.par=par
        this._aBody=par._aBody;
        this.fun=fun;
        this.arrInfo=par.arrInfo
        this.rPar=par.rPar
  

        this.ols=this.par.ols;

        this.array=[];
        this.arrayKesh=[];

        this.dcKorBit=new DCKorBit()

        this.clear=function(){
            this.array.length=0
            for (var i = 0; i < this.arrayKesh.length; i++) {
                this.arrayKesh[i].active=false 
            }
        }

        this.creat=function(o){
            for (var i = 0; i < this.arrayKesh.length; i++) {
                if(this.arrayKesh[i].active==false){
                    this.arrayKesh[i].setObj(o)
                    this.array.push(this.arrayKesh[i]); 
                    this.arrayKesh[i].active=true                  
                    return this.arrayKesh[i]
                }
            }

            let body=new WSBody(this);
            body.setObj(o)
            body.idArrKesh=this.arrayKesh.length;
            this.arrayKesh.push(body);
            this.array.push(body);  
            return body;
        }


        this.setObjAll=function(o){
            for (var i = 0; i < this.array.length; i++) {
                let ooo=this.array[i].object
                for (var s in ooo) {
                    if(s=="type")continue
                    if(o[s]!=undefined) ooo[s] = o[s] 
                }                             
            }

            this.dragBig()
        }

        this.dragBig=function(o){
            for (var i = 0; i < this.array.length; i++) {
                
                this.par.drScane.getPicBody(this.array[i],true)
                               
            }
            this.par.drScane.draw()
            this.par.par.restart()
        }

        let aaa=[]


        this.setArrPoint=function(p){
            if(this._aBody)aaa=[this._aBody]
            else aaa=this.array

            for (var i = 0; i < aaa.length; i++) {
                for (var j = 0; j < aaa[i].array.length; j++) {
                    aaa[i].array[j].x+=p.x;
                    aaa[i].array[j].y+=p.y;
                }
            }
            this.par.drScane.draw()
        }

        var ppNull={x:0,y:0}
        var pp={x:0,y:0}
        var dd,aa,aa1
        this.setArrRidation=function(n){
            if(this._aBody)aaa=[this._aBody]
            else aaa=this.array
            for (var i = 0; i < aaa.length; i++) {
                for (var j = 0; j < aaa[i].array.length; j++) {
                    pp.x=aaa[i].array[j].x-100;
                    pp.y=aaa[i].array[j].y-100;

                    dd=this.getDistance(ppNull,pp)
                    aa=this.getAngle(ppNull,pp)

                    this.getVector(dd,aa+n*0.01,pp)

                    aaa[i].array[j].x=pp.x+100;
                    aaa[i].array[j].y=pp.y+100;
                }
            }
            this.par.drScane.draw()
        }

        this.setArrScale=function(n){
            if(this._aBody)aaa=[this._aBody]
            else aaa=this.array
            let ss=(100-n)/100
            for (var i = 0; i < aaa.length; i++) {
                for (var j = 0; j < aaa[i].array.length; j++) {
                    pp.x=aaa[i].array[j].x-100;
                    pp.y=aaa[i].array[j].y-100;

                    dd=this.getDistance(ppNull,pp)
                    aa=this.getAngle(ppNull,pp)

                    this.getVector(dd*ss,aa,pp)

                    aaa[i].array[j].x=pp.x+100;
                    aaa[i].array[j].y=pp.y+100;
                }
                aaa[i].object.lineSah*=ss;
            }
            this.par.drScane.draw()
        }


  

        this.getDistance = function (p1, p2) {      
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
        };
        this.getAngle = function (a, b) {
            b = b || rezNull;
            a = a || rezNull;
            return Math.atan2(b.y - a.y, b.x - a.x);
        };

        this.getVector = function (length, angle, point) {
            if (point == undefined) var point = new THREE.Vector2(0, 0);
            if (length < 0) angle += Math.PI;
            point.x = Math.abs(length) * Math.cos(angle);
            point.y = Math.abs(length) * Math.sin(angle);
            return point;
        };

    }

    set aBody(value) { 
      
        if(this._aBody!==value){  
            this._aBody=value;                
        }
    }   
    get aBody() { return  this._aBody}

    set activBody(value) { 
        if(this._activBody!==value){  
            this._activBody=value;
                   
        }
    }   
    get activBody() { return  this._activBody} 


}




export class WSBody {
    constructor (par) {
        this.type="WSBody";
        this.active=true;  
        this.array=[]; 
        this.par=par
        var self=this
        this._piclink="null";
        this.width=2;
        this.height=2;
        this.bitmapData=new DBitmapData(this.width,this.height,null,function(){
            
            self.width=this.width;
            self.height=this.height;

           /* if(self.getDistance(ppp,self.array[0])<self.getDistance(ppp,self.array[1])){
                self.array[1].x=self.array[0].x+this.width/2;
                self.array[1].y=self.array[0].y+this.height/2;
            }else{
                self.array[0].x=self.array[1].x+this.width/2;
                self.array[0].y=self.array[1].y+this.height/2;
            }*/
            
            self.drag2();

            
            
        });

        this.bitmapData1=new DBitmapData(2,2);
        this.bitmapData2=new DBitmapData(2,2);


        var ppp={x:0, y:0}
        this.getDistance = function (p1, p2) {      
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
        };


        var b,b1,pp
        var cc,aea
        var a=[0,0,0,0]
        this.dragColor=function(c){
            
            if(this.bitmapData1.color==c){
                return
            }
            
            this.bitmapData1.color=c
            b=self.bitmapData2;
            b1=self.bitmapData1;
            b1.width=b.width;
            b1.height=b.height;
           
            cc=dcmParam.parseColor(c)   
                    
            for (var i = 0; i < b.width; i++) {
                for (var j = 0; j < b.height; j++) { 
                    pp = b.getPixel(i,j);
                    pp[0]=cc.r
                    pp[1]=cc.g
                    pp[2]=cc.b
                    b1.setPixel(i,j,pp)
                    //b.setPixel(i,j,testyy(pp))
                }
            }
            this.bitmapData1.upDate()
        }
        let bbbb=false
        this.drag2=function(){
       
            b=self.bitmapData;
            b1=self.bitmapData2;
            b1.width=b.width;
            b1.height=b.height;

            bbbb=false;
            if(this.object.bmBNax==true){
                bbbb=true;
                for (var i = 0; i < b.width; i++) {
                    for (var j = 0; j < b.height; j++) { 
                        pp = b.getPixel(i,j);
                        b1.setPixel(i,j,pp)
                    }
                }


                this.par.dcKorBit.setBit(b1,this.object.naxV)
                b=b1
            }

            
            if(this.object.bmBColor==true){
                bbbb=true
                cc=dcmParam.parseColor(this.object.bmColor)
                for (var i = 0; i < b.width; i++) {
                    for (var j = 0; j < b.height; j++) { 
                        pp = b.getPixel(i,j);
                        pp[0]=cc.r
                        pp[1]=cc.g
                        pp[2]=cc.b
                        b1.setPixel(i,j,pp)
                        //b.setPixel(i,j,testyy(pp))
                    }
                }
                
            }

            if(bbbb==false){
                for (var i = 0; i < b.width; i++) {
                    for (var j = 0; j < b.height; j++) { 
                        pp = b.getPixel(i,j);
                        b1.setPixel(i,j,pp)
                    }
                }
            }
            self.bitmapData2.upDate();
            self.bitmapData1.color="xz";
            self.par.par.drScane.draw()
        }

        function testyy(p, p1, ddd){
            if(Math.abs(p[0]-p1[0])<ddd && Math.abs(p[1]-p1[1])<ddd && Math.abs(p[2]-p1[2])<ddd){
                return [0,0,0,0];
            }  
            return [p[0],p[1],p[2],p[3]];
        }



        this.addPoint=function(p,p1){            
            if(p1!=undefined){
                this.array.push({x:p,y:p1})
            }else{
                this.array.push({x:p.x,y:p.y})
            }
            
        }

        this.object=null
        this.setObj=function(o){
            this.clear();
            this.object=JSON.parse(JSON.stringify(o));
            
        }


        this.clear=function(){
            this.array.length=0
        }

        this.setPFinal=function(p,p1){ 
            if(p1!=undefined){
                this.array[this.array.length-1].x=p;
                this.array[this.array.length-1].y=p1
            }else{
                this.array[this.array.length-1].x=p.x;
                this.array[this.array.length-1].y=p.y
            }           
        }
    }
    set piclink(value) { 
        if(this._piclink!==value){  
            this._piclink=value;
            this.bitmapData.load(this._piclink, true);                 
        }
    }   
    get piclink() { return  this._piclink} 

}



export class DCKorBit {
    constructor (par) {
        this.type="DCKorBit";
        this.par=par
        var self=this

        this.setPic=function(s,bb,b1){
           
            let body=self.par.get()
            body.boolColor=bb;
            body.type="Pic";
            body.bitmapData.cb=undefined
            body.bitmapData1.cb=undefined
            body.bitmapData.clear();
            body.bitmapData1.clear();


            body.bitmapData1.fun=function(){
                self.setBitCol(body.bitmapData1,self.par._glowColor)
                self.par.draw();
            }  

            body.bitmapData.boolLoad=false;
            body.bitmapData.fun=function(){
                if(bb){
                    self.setBit(body.bitmapData);
                    self.setBitCol(body.bitmapData,self.par._lineColor)
                }


                var s=body.bitmapData.width/300;
                if(s<body.bitmapData.height/300){
                    s=body.bitmapData.height/300;
                }
                if(s<1)s=1;
                let ww=body.bitmapData.width/s
                let hh=body.bitmapData.height/s

                body.position.x=(300-ww)/2
                body.position.y=(300-hh)/2
                

                body.ww=ww;
                body.hh=hh;
                
                body.bitmapData1.load(body.bitmapData.getData())
            }
            /**/
            body.bitmapData.load(s);

            
             

            
        }

        this.dis=4

        this.setBit =function(b,dis){
            if(dis!=undefined)this.dis=dis
            let aa=[];
            let pp;
            for (var i = 0; i < b.width; i++) {
                var j=0;
                pp = b.getPixel(i,j);                        
                testtt(pp) 
                var j=b.height-1;
                pp = b.getPixel(i,j);                        
                testtt(pp)

                
            }
            for (var j = 0; j < b.height; j++) {
                var i=0;
                pp = b.getPixel(i,j);                        
                testtt(pp) 
                var i=b.width-1;
                pp = b.getPixel(i,j);                        
                testtt(pp) 
                 
                                  
            }

            tdd();


            
            

            var ttt;
            function testtt(p){
                ttt=true;
                for (var i = 0; i < aa.length; i++) {
                    if(p[0]==aa[i][0] && p[1]==aa[i][1] && p[2]==aa[i][2]){
                        ttt = false
                    }                  
                }
                if(ttt){
                    aa.push([p[0],p[1],p[2],p[3]]);
                }
                return null;
            }

            var ttt;
            function tdd(){
                
                for (var i = 0; i < b.width; i++) {
                    for (var j = 0; j < b.height; j++) { 
                        pp = b.getPixel(i,j);
                        b.setPixel(i,j,testyy(pp))
                    }
                }
                b.upDate();
            }

            function testyy(p){
                ttt=true;
                var ddd=self.dis
                for (var i = 0; i < aa.length; i++) {
                    if(Math.abs(p[0]-aa[i][0])<ddd &&Math.abs(p[1]-aa[i][1])<ddd && Math.abs(p[2]-aa[i][2])<ddd&& Math.abs(p[3]-aa[i][3])<ddd){
                        return [0,0,0,0];
                    }                  
                } 
                return [p[0],p[1],p[2],p[3]];
            }

        }


        this.setBitCol =function(b,c){
            
            let bb=false;
            if(b.cb==undefined){
                bb=true
            }else{
                if(b.cb!==c){
                    bb=true
                }
            }
            
            if(bb){                
                let oc=dcmParam.parseColor(c)
                let pp
                for (var i = 0; i < b.width; i++) {
                    for (var j = 0; j < b.height; j++) {
                        pp=b.getPixel(i,j);
                        pp[0]=oc.r;
                        pp[1]=oc.g;
                        pp[2]=oc.b;
                        b.setPixel(i,j,pp)
                    }
                }
                b.upDate();
                b.cb=c; 
            }
        }

    }
}
