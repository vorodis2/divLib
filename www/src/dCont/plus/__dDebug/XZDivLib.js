




export class XZDivLib{
    constructor(par,fun) {
        
        var self=this
        this.type="XZDivLib"
        this._active=false;

        this.par=par;
        this.param=par.param;


        this.fun=fun;
        this.dC=this.par.dCont

        this.dCont=new DCont()
        this.dCont.x=this.param.otstup*2+this.param.sizeBase2;
        this.dCont.y=this.param.otstup

        var content= new DCont(this.dCont);
        var ww=150
        var otstup=this.param.otstup
        var array=[];

        var base64='data:image/png;base64,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'
        
        var dfg=false 
        this.init = function() {    
        
            if(dfg==true)return;
            dfg=true;


            for (var i = 0; i < this.aDo.length; i+=2) {                
                plus(this.aDo[i], this.aDo[i+1])
            }

            plus(dcmParam);
            plus(new DButton(null,0,0,"Button",downMy,base64));

            plus(new DButtons(null,0,0,["xz","ritq  qe"],downMy,base64));
            plus(new DPanel(null,0,0));
            plus(new DImage(null,0,0,base64));

            let bm=new DBitmapData(32,32)
            bm.dragRendom();

            plus(bm);
            plus(new DLabel(null,0,0,"DLabel"));
            plus(new DGlow(null,0,0));
            plus(new DSlider(null,0,0,downMy));
            plus(new DSliderBig(null,0,0,downMy,"DSliderBig",50,150));
            plus(new DInput(null,0,0,"DInput",downMy));
            plus(new DTextArea(null,0,0,"DTextArea",downMy));
            plus(new DCheckBox(null,0,0,"DCheckBox",downMy));
            plus(new DWindow(null,0,0,"DWindow",downMy));
            plus(new DColor(null,0,0,"#0000ff",downMy));
            plus(new DScrollBarV(content,0,0,downMy)) 
            plus(new DScrollBarH(content,0,0,downMy))
            plus(new DComboBox(content,0,0,["xz","xz1"],downMy))

            plus(new DButtons(content,0,0,["xz","xz1"],downMy))




            var g= new DGallery(content,800,300,downMy);
            var a=[]
            for (var i = 0; i < 10; i++) {
                a.push({src:base64})
            }
            g.start(a);
            g.kolII=2;
            plus(g);
            var pp=new DParamObject(content,0,0,downMy)
            plus(pp)
            

            var three=new DThree(content,0,0,downMy)
            var obj1={uuid:Math.random(),name:"name1",link:base64,array:[{uuid:Math.random(),link:base64,array:[]},{uuid:Math.random(),link:base64,array:[{uuid:Math.random(),link:base64,array:[]}]}]}
            three.setObj(obj1,"array","name")
            plus(three)


            let dClip=new DClip(null, 0,0,downMy);
            let bp=new DBitmapData(50,255)
            bp.dragRendom();
            dClip.content.add(bp.getDCont());
            dClip.heightContent=255;
            dClip.sbv=1;
            plus(dClip);



            if(self.par.ls.object["xzdl_index"]!=undefined){
                setTimeout(function() {                    
                    setIndex(self.par.ls.object["xzdl_index"])
                }, 10);
            }
     
        }

        this.aDo=[]
        this.setObj = function(o,n){
            if(dfg==true){
                this.addPlus(o, n)
            }else{
                this.aDo.push(o, n)
            }
        }



        function downMy(s,p,p1) {
            //console.warn(s,p,p1,this.type,this)    
            if(this.idArrPoz!=undefined){
                setIndex(this.idArrPoz)
            }                 
        }

        var lInfo=new DLabel(this.dCont,otstup,otstup,"null");
        lInfo.fontSize=dcmParam._fontSizeLitte;

        var dTextArea=new DTextArea(this.dCont,0,0,"null");
        dTextArea.fontSize=dcmParam._fontSizeLitte+2;
        dTextArea.height=dTextArea.fontSize*6
        dTextArea.textAlign='left'
        function plus (obj, name) {   
            if(obj.height && obj.height>50)obj.height=50
            if(obj.height==undefined)   obj.height=50 


            var p=new DPanel(content,0,0);
            var l1=new DLabel(p,dcmParam._fontSizeLitte+otstup*2,otstup,name||obj.type);
            var b1=new DButton(p,otstup,otstup," ",function(){
                setDin(this)
            });
            var p1=new DPanel(p,otstup,otstup+dcmParam._fontSizeLitte+otstup);
            p.width=ww+otstup*4;
            p1.width=ww+otstup*2;
            p.height=obj.height+otstup*5+dcmParam._fontSizeLitte;

            p1.height=obj.height+otstup*2;


            obj.x=otstup;
            obj.y=otstup;
            if(obj.type=="DParamObject" ||obj.type==='DCM'||obj.type==='DBitmapData') {
                if(obj.w)p1.add(obj.w);
                if(obj.getDCont!=undefined)p1.add(obj.getDCont());
            } else{
                p1.add(obj);
                
            }         
            

            p.object=obj
            p.panel=p1
            obj.width=ww;

            p.obj=obj;

            
            l1.fontSize=dcmParam._fontSizeLitte

            array.push(p);

            var b=new DButton(p,otstup,otstup," ",function(){
                setDin(this)
            });
            

            b.idArr=array.length-1
            obj.idArrPoz=array.length-1
            b.obj=obj;
            b.width=dcmParam._fontSizeLitte;
            b.height=dcmParam._fontSizeLitte;
            b.borderRadius=22
            b.color="#dddddd";
            p.button=b;
            b.pan=p;
            b.pan1=p1;

            
            b1.width=p.width;
            b1.height=p.height;
            b1.alpha=0.01
            b1.idArr=array.length-1

            drahHH();
        }

        function drahHH () { 
            if(self._active==false)return

            var y=(dcmParam._fontSizeLitte+otstup*2)/ssc;
            var x=0;
            for (var i = 0; i < array.length; i++) {
                array[i].y=y;
                array[i].x=x;
                y+=array[i].height+otstup;
                if(y>hhh1/ssc){
                    y=otstup;
                    x+=ww+otstup*6
                    array[i].y=y;
                    array[i].x=x;
                    y+=array[i].height+otstup;   
                }
            }
        }

        function setDin (o){            
            setIndex(o.idArr)
            self.par.ls.object["xzdl_index"]=o.idArr;          
            self.par.ls.save();
        }

        var dind=-1
        function setIndex (idArr){
            if(dind==idArr)return
            dind=idArr
            for (var i = 0; i < array.length; i++) {
                if(i==idArr){
                    array[i].button.color=dcmParam._colorActive;
                    array[i].color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -20);
                    array[i].panel.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -80);
                    self.fun("addObject", array[i].object);
                    let ss="Нет информации в классе infoThis";
                    if(array[i].object.infoThis)ss=array[i].object.infoThis;
                    setTTT(ss)
                }else{
                    array[i].button.color=dcmParam._color;
                    array[i].color=dcmParam._color1
                    array[i].panel.color=dcmParam._color1
                }
            }
        }


        function setTTT (str){
            
            let arr=str.split("\n");
            
            let bb
            
            for (var i = 0; i < arr.length; i++) {                     
                bb=true;
                for (var j = 0; j < arr[i].length; j++) {
                    if(arr[i][j]!=" "){
                        bb=false;
                        break
                    }
                    
                }
                if(bb==true){
                    arr.splice(i,1)
                    i=0
                }else{
                    break
                }                
            }

            for (var i = 0; i < arr.length; i++) {                     
                bb=true;
                if(arr[i]=="//xz")break
                let sdf=''
                for (var j = 0; j < arr[i].length; j++) {
                    if(arr[i][j]==" "){                       
                        
                    }else{
                        bb=false;
                        
                    } 
                    if(bb==false)sdf+= arr[i][j]                 
                }
                arr[i]=sdf
            }


            let sss="";
            for (var i = 0; i < arr.length; i++) {
                if(arr[i]=="")continue
                if(i==0){
                    sss+=arr[i]
                }else{
                    sss+="\n"+arr[i]
                }                
            }
           
            dTextArea.text=sss
        }





        var ssc=1
        
        var w, h, s;
        var www, hhh,hhh1;
        this.sizeWindow = function(_w, _h, _s) {
            if (_w) {
                w = _w
                h = _h;
                s = _s;
            }
            if(this._active==false)return
            www=w/s-this.param.sizeBase2;
            hhh=h/s
            dTextArea.width=www//-otstup*2;
            dTextArea.y=hhh-dTextArea.height;

            hhh1=dTextArea.y-otstup

            ssc=hhh1/(this.param.sizeBase2*2);
            
            if(ssc<0.25)ssc=0.25
            if(ssc>1)ssc=1
            content.scale= ssc  
            lInfo.text="scale:"+Math.round(ssc*100)/100
            drahHH()      
        }

       

    }



    set active(value) {
        if(this._active!=value){
            this._active = value;             
            if(this._active){
                this.dC.add(this.dCont)
                this.init()
                this.sizeWindow()
            }else{
                this.dC.remove(this.dCont)
            } 
        }       
    }   
    get active() { return  this._active;} 

  


}
