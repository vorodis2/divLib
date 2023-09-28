

export class DRedactPM extends DCont{
    constructor(dCont, _x, _y, _key, arrObj, ob) {
        super();
        var self=this
        this.type="DRedactPM"
        this._active=true
        this.visible=this._active
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;

        this.arrPlus=[]
        if(arrObj[0]!=undefined) {
            this.arr=arrObj
        } else{
            this.arr=arrObj.arr
            if(arrObj.arrPlus)this.arrPlus=arrObj.arrPlus
        }      
        
        this.key = _key;
        this.fun=undefined
        var oo=ob//JSON.parse(ss)
        this.oo=oo;
        
        this._group =-1
        
        this.panel=new DPanel(this)

        var dci=new DCreatIcon(this, 0, 0, this.key)
        this.dci=dci
        this.rPar=dci.rPar;
        this.width=this.rPar.width1+this.rPar.otstup*3+this.rPar.width
        this.height=this.rPar.swh+this.rPar.otstup*6+this.rPar.height+this.rPar.swh

        dci.x=this.rPar.width1+this.rPar.otstup*2
        dci.y=this.rPar.swh+this.rPar.otstup*4

        this.but=new DButton(this,dci.x,dci.y+dci.height+2,"Load png,jpg,svg",function(e){
            let file=this.files[0]
            let id=self.object.id
            let ggg=self._group;

            let oo=mhbd.getKeyId(ggg, id)
            let ss = mhbd.getLink(oo.icon)

            mhbd.saveFile(file, ggg, id, (date) => {                
                mhbd.getKeyId(ggg, id, function(e) {
                    if(date.url0){
                        e.icon = date;
                        self.setIndex()
                        if(self.fun)self.fun("dragIcon", e, ss)
                        return
                    }

           
                    mhbd.clearFile(ggg, e.iconId);
                    e.iconId = date.id;
                    e.icon = date.src;
                    mhbd.setParam(ggg, id, "iconId", date.id);
                    mhbd.setParam(ggg, id, "icon", date.src);
                    self.setIndex();
                    if(self.fun)self.fun("dragIcon", e, ss)

                })    
            })
        })
        this.but.startFile("image/*");
        this.but.width=240//dci.width
        this.but.height=this.rPar.swh
        this.but.svgColor="#ff0000";

        this.ta=new DTextArea(this,this.but.x+this.but.width+2,this.but.y,"--") 
        this.ta.fontSize=8;
        this.ta.height=this.rPar.swh 
        this.ta.width=dci.width-this.but.width-2


        dci.funGetFile=function(file){
           
            let id=self.object.id
            let ggg=self._group

            let oo=mhbd.getKeyId(ggg, id)
            let ss = mhbd.getLink(oo.icon)

            mhbd.saveFile(file, ggg, id, (date) => {
                
                mhbd.getKeyId(ggg, id, function(e) {
                  
                    if(date.url0){
                        e.icon = date;
                        self.setIndex()
                        if(self.fun)self.fun("dragIcon", e, ss)
                        return
                    }
                    mhbd.clearFile(ggg, e.iconId);
                    e.iconId = date.id;
                    e.icon = date.src;
                    mhbd.setParam(ggg, id, "iconId", date.id);
                    mhbd.setParam(ggg, id, "icon", date.src);
                    self.setIndex()

                    if(self.fun)self.fun("dragIcon", e, ss)
                })    
            })
        }


       
        
        this.panel.width=this.width;
        this.panel.height=this.height;

        this.panel1=new DPanel(this.panel,this.rPar.otstup,this.rPar.otstup)
        this.panel1.width=this.width-this.rPar.otstup*2;
        this.panel1.height=this.rPar.swh+this.rPar.otstup*2;


        //this.input=new DInput(this.panel1, 0)
        this.bPlus=new DButton(this.panel1, this.rPar.width1-this.rPar.swh, this.rPar.otstup,"+",function(){
            mhbd.creat(self._group, function(e) {                
                self.setgroup()
                self.index=e.id                
            })
        })
        this.bPlus.width=this.bPlus.height=this.rPar.swh;

        this.input=new DInput(this.panel1, this.rPar.width1-this.rPar.swh*3-this.rPar.otstup, this.rPar.otstup,"+",function(){
            self.index=(this.value)*1
            self.dci.saveLoc();
        })
        this.input.width=this.rPar.swh*2;
        this.input.height=this.rPar.swh;


        this.gallery = new GalleryInfo(this,this.rPar.otstup,this.rPar.otstup*4+this.rPar.swh, function(s, p) {
            self.index=self.gallery.array[this.index].object.id
            self.dci.ols["plusXZ_index"]=self._index;
            if(self.fun)self.fun("idObject", self.index, self.gallery.keyPar )
            self.dci.saveLoc();
        },this)
        this.gallery.otstup=this.rPar.otstup
        this.gallery.width = this.rPar.width1 //+ this.rPar.otstup;
        this.gallery.height = this.height-this.rPar.swh- this.rPar.otstup*5;
        this.gallery.kolII = 1
        this.gallery.widthPic = this.gallery.width - this.gallery.otstup * 2;
        this.gallery.heightPic = this.rPar.swh;
        this.gallery.keyPar=this.arr[0];





        this.arrName=[]
        for (var s in oo) {
            if(oo[s].length!=undefined){
                this.arrName.push(s)
            }            
        }

        this.dComboBox=new DComboBox(this.panel1, this.rPar.otstup, this.rPar.otstup,this.arrName,function(){
            self.group=self.arrName[this.index]
            self.dci.ols["plusXZ_index"]=self._index;
            if(self.fun)self.fun("indexGroup", self.arrName[this.index])
            self.dci.saveLoc();
        })
        this.dComboBox.width=this.input.x-this.rPar.otstup*2;
        this.dComboBox.height=this.rPar.swh; 


        this.sob=function(){  
            if(this.type=='DInput'){
                self.object[this.title]=this.value;            
                self.sevePlus(self._group,self.object.id,this.title,this.value)
                if(self.fun)self.fun("dragObject",self._group,self.object)
            }    
            if(this.type=='DComboBox'){
                self.object[this.title] = this.index;            
                self.sevePlus(self._group,self.object.id,this.title,this.index)
                if(self.fun)self.fun("dragObject",self._group,self.object)
            }       
            
        }



        //{w:22, type:"DComboBox", arr:["0-xa","1-xa","2-xa","3-xa"], param:"orderBy"}]}
        let dist=0;
        let kol=0;
        let oZo;
        for (var i = 0; i < this.arr.length; i++) {
            if(typeof this.arr[i]=='string'){
                oZo={type:"DInput", param:this.arr[i], boZolLang:true}
                kol++
                this.arr[i]=oZo;
            }else{
                if(this.arr[i].w){
                    dist+=this.arr[i].w
                }else{
                    kol++
                }
            }
        }


        this.arIn=[];
        var ww=(this.panel1.width-this.rPar.width1-this.rPar.otstup-dist)/kol;

        for (var i = 0; i < this.arr.length; i++) {
            if(this.arr[i].w==undefined)this.arr[i].w=ww
        }
        

        let xx=0    
        for (var i = 0; i < this.arr.length; i++) {
            oZo=this.arr[i]
            if(oZo.type=='DInput'){  
                this.arIn[i]=new DInput(this.panel1,this.rPar.otstup,this.rPar.otstup,"0",this.sob);
                this.arIn[i].width=oZo.w-this.rPar.otstup;
                this.arIn[i].height=this.rPar.swh
                this.arIn[i].x=this.rPar.width1+this.rPar.otstup+i*ww
                this.arIn[i].title=oZo.param;
                this.arIn[i].fontSize=this.rPar.fontSizeLitel;
                this.arIn[i].timeFun=100
                this.arIn[i].objInfo=oZo
                
                this.arIn[i].funFocus=function(){
                    if(this.boolFocus==true){
                        self.gallery.keyPar=this.title
                        
                        if(self.fun)self.fun("keyPar", this.title)
                    }
                }

                xx+=oZo.w
            }

            if(oZo.type=='DComboBox'){  
                this.arIn[i]=new DComboBox(this.panel1,this.rPar.otstup,this.rPar.otstup,oZo.arr,this.sob);
                this.arIn[i].width=oZo.w-this.rPar.otstup;
                this.arIn[i].height=this.rPar.swh
                this.arIn[i].x=this.rPar.width1+this.rPar.otstup+i*ww
                this.arIn[i].title=oZo.param;
                this.arIn[i].fontSize=this.rPar.fontSizeLitel;
                this.arIn[i].timeFun=100
                this.arIn[i].objInfo=oZo
                let iii=i;
             
                this.arIn[i].div.addEventListener('mousedown', function(e){
                    self.gallery.keyPar=self.arIn[iii].title
               
                    if(self.arIn[iii].objInfo.boZolLang){
                        if(self.fun)self.fun("keyPar", self.arIn[iii].title)
                    }
                    
                })
                   

                xx+=oZo.w
            }
        }






        ////////this.arrPlus///////////////////////////////
        
        this.setUrl=function(url){
            this.but.link = url;
            this.ta.text=url
        }



        this.setgroup=function(){
            this.dci.ols["plusXZ_group"]=this._group;
            
            for (var i = 0; i < this.arrName.length; i++) {
                if(this.arrName[i]==this._group){
                    this.dComboBox.index=i
                    break
                }
            }
            if(this.oo[this._group])this.gallery.start(this.oo[this._group]);
            this.index=0;
        }

        this.setIndex=function(){
            //if(this.oo[this._group][this._index]==undefined)this._index=0
            if(!this.oo[this._group])return
            let p=0;
            for (var i = 0; i < this.oo[this._group].length; i++) {
                if(this.oo[this._group][i].id==this._index){
                    p=i;
                    break
                }
            } 

            if(this.gallery.array[p]==undefined)return

            this.gallery.index=p;
            this.gallery.array[p].dragIm("?"+Math.random())
            this.input.value=this._index
            this.setObj(this.oo[this._group][p])
        }

        this.object
        this.setObj=function(o){
            this.object=o;
            for (var i = 0; i < this.arr.length; i++) {
                if(this.object[this.arr[i].param]!=undefined){
                    if(this.arIn[i]){
                        if(this.arIn[i].type=="DInput") {
                            this.arIn[i].text=this.object[this.arr[i].param]
                        }
                        if(this.arIn[i].type=="DComboBox") {
                            this.arIn[i].index=this.object[this.arr[i].param]
                        }
                    }
                }else{
                    if(this.arIn[i]){
                        if(this.arIn[i].type=="DInput"){
                            let s=this._group+"_"+this.object.id+"_"+this.arr[i].param;
                            this.object[this.arr[i].param]=s
                            this.arIn[i].text=this.object[this.arr[i].param]
                            this.sevePlus(this._group,this.object.id,this.arr[i].param,this.object[this.arr[i].param])
                        } 
                        if(this.arIn[i].type=="DComboBox") {
                            this.arIn[i].index=0
                        }  
                    }
                    
                    
                }
            }
           
            let s=mhbd.getLink(this.object.icon);                      
            this.dci.setLink(s,true,true);
            this.setUrl(s)
        }

        this.sevePlus=function(g,id,k,v){

            if(window.mhbd)mhbd.setParam(g, id, k, v);
            

            if(this._group==g){
                
                for (var i = 0; i < this.gallery.array.length; i++) {                    
                    if(this.gallery.array[i].object.id==id){                        
                        this.gallery.array[i].dragText()
                    }
                }                
            }            
        }





        if(this.dci.ols["plusXZ_group"]==undefined)this.dci.ols["plusXZ_group"]=this.arrName[0]


        this.group =  this.dci.ols["plusXZ_group"]

        if( this.dci.ols["plusXZ_index"]!=undefined)this.index=this.dci.ols["plusXZ_index"]
          
    }

    set group(value) {
        if (this._group != value) {
            this._group = value;
            this.setgroup(this._group)
        }
    }
    get group() {
        return this._group;
    }

    set index(value) {
        if (this._index != value) {
            this._index = value;

            
            this.setIndex(this._index)
        }
    }
    get index() {
        return this._index;
    }
  
  
 
}







export class GalleryInfo extends DGallery {
    constructor(dCont, x, y, fun, par) {
        super(dCont, x, y, fun);
        this.par = par
        this._keyPar="cxz"
        this.type = "GalleryMani";
        this.color=dcmParam.compToHexArray(dcmParam.hexDec(this.color1), -50);
        dcmParam.addFunNotActivDiv(this.div);
        this.createZamen = function() {
            var r = new BoxInfo(this.content, 0, 0, this.downBtn, this);
            r.whPic = this.whPic;
            r._widthPic = this._widthPic; // elements width
            r._heightPic = this._heightPic; // elements height    
            return r
        }


    }
    set keyPar(value) {
        if (this._keyPar != value) {
            this._keyPar = value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].dragText()
            }
        }
    }
    get keyPar() {
        return this._keyPar;
    }

}


export class BoxInfo extends DBox {
    constructor(dCont, x, y, fun, par) {
        super(dCont, x, y, fun);
        this.par = par
        var self = this;


        this.label1 = new DLabel(this)        
        this.label1.fontSize=par.par.rPar.fontSizeLitel
        this.label.fontSize=par.par.rPar.fontSizeLitel
        this.image.activMouse = false;




        var ss
        this.draw = function() {

            this.image.width = this.height-4;
            this.image.height = this.height-4;
            this.image.x = this.height
            this.label1.x = 2
            this.label1.width = 333
            this.label1.y = this.height-2 - this.label.fontSize

            this.label.x = 2 + this.height * 2
            this.label.y = this.height-2 - this.label.fontSize
            this.label.activMouse = this.label1.activMouse = false

            if (this.postDraw) this.postDraw();
        };



        this.dragText= function() {
            if(this.object){
                this.label.text = this.object[this.par.keyPar];
            }
        }


        this.dragIm= function(p) {
            if(p==undefined)p=""
            let link=this.object.icon
            if(window.mhbd)link=mhbd.getLink(this.object.icon);
            this.image.link = link+p;
            this.image.visible = true;
        }

        this.startLoad = function(_obj) {
            this.object = _obj;
            this.dragIm()
            
           
            this.dragText()
            this.label.width = this.width - this.label.x;
            this.label.visible = true;
            this.label1.text = this.object.id
            this.draw();
            self.funLoad();

        }
    }
}
