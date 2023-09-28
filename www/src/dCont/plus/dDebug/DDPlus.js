


import { DCreatIcon } from '../dCreatIcon/DCreatIcon.js';
import { DShtora } from '../dShtora/DShtora.js';
import { DSArray } from '../dSArray/DSArray.js';
import { DVerhPanels } from '../dShtora/DVerhPanels.js';
import { DRedactPM } from './DRedactPM.js';

//import { DPreloader } from '../dSArray/DPreloader.js';

export class DDPlus{
    constructor(par,fun) {
        
        var self=this
        this.type="DDPlus"
        this._active=false;

        this.par=par;
        this.param=par.param;


        this.fun=fun;
        this.dC=this.par.dCont

        this.dCont=new DCont()
        this.dCont.x=this.param.otstup*2+this.param.sizeBase2;
        this.dCont.y=this.param.otstup

        this.dCont1= new DCont(this.dCont);
        this.dCont1.x=0;
        this.dCont1.y=32+this.param.otstup+dcmParam.fontSize//Litte;
        this.content= new DCont(this.dCont1);
        
        this.panel=new DPanel(this.content);
        this.dDCanvas=new DDCanvas(this.panel);
        this.dDCanvas.bSetkaCobe=true;
        this.dDCanvas.bSetkaText=false;
        this.dDCanvas.mashtab=10;



        var ww=150
        var otstup=this.param.otstup
        this.array=[];

        var base64='data:image/png;base64,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'
        this.dbs
        var dfg=false 
        this.init = function() {    
        
            if(dfg==true)return;
            dfg=true;

            this.dbs=new DButtons(this.dCont,0,0,1,function(){
                
                setIndex(this.index)
            });
            this.dbs.otstup=0;
            this.dbs.index=-1;

            for (var i = 0; i < this.aDo.length; i+=2) {                
                this.addPlus(this.aDo[i], this.aDo[i+1], false)
            }

            /*let aa=[
                                
                {Feature:[{num:100},{code:'IM_pipe',source:'inframodel',Property:[{label:"elevType",value:"wwww"}]}]},
            ]

            let aoo=[
                {key:["name"], type:"string",name:"name",width:40},
                {key:["object","num"], type:"number",name:"xz"},
                {key:["bool"], type:"boolean",name:"bool"},                 
                {key:["pic"], type:"image",name:"image"},       
                {key:[                    
                    {type:"seek",key:"Feature",array:['code','IM_pipe','source','inframodel']},
                    {type:"seek",key:"Property",array:['label','elevType']},
                    "value"
                    ], type:"string",name:"elevType"},
            ]*/

            let aa=[
                                
                {num:13,str:"xz1",bo:true,pic:"resources/pic/1.png",col:"#ff0000"},
                {num:17,str:"xz2",bo:false,pic:"resources/pic/2.png",col:"#00ff00"},
                {num:11,str:"xz0",bo:false,pic:"resources/pic/0.png",col:"#00ff00"},
            ]

            let aoo=[
                {key:["num"], type:"number",name:"num"},//,width:40},
                {key:["str"], type:"string",name:"str"},
                {key:["bo"],  type:"boolean",name:"bo"},
                {key:["pic"], type:"image",name:"pic"},//,width:40},
            ]

            
            var dSArray=new DSArray(null, 0,0,function(){
            
            })
            dSArray.setArray(aa,aoo);

            this.addPlus(dSArray, null, false)


            this.addPlus(new DDCanvas(), null, false)


            this.addPlus(new DCreatIcon(), null, false)




            var dShtora=new DShtora(null,0,0,function(s,p,p1){
                

                if(s=="down"){
                    
                    self.fun("addObject", p);
                }
            });

            dShtora.addDShtora(new DShtora());
           /**/ //dShtora.addDShtora(new DShtora());    
            var dShtora1=new DShtora(null,0,0,function(s,p,p1){
                
            });
            dShtora1.addDShtora(new DShtora());
            dShtora1.addDShtora(new DShtora());
            dShtora1.bVrtikal=true

            dShtora.addDShtora(dShtora1);
            dShtora.addDShtora(new DShtora());
            this.addPlus(dShtora, null, false)

            ///////////////////////////////////////////////////////////
            var dp=new DVerhPanels()

            dp.addPanel(this,"test0_____sdfs sf sf","test1111111111111111")
            dp.addPanel(this,"test1_______")
            dp.addPanel(this,"test2_________")
            dp.addPanel(this,"test3___________")
            dp.addPanel(this,"test4_____________")
            this.addPlus(dp, null, false);


            
            new DButton(dp,55,111,"get",function(){
               dp.addPanel(this,Math.random()+"",Math.random()+"") 
            })
            new DButton(dp,55,141,"AClose",function(){
               dp.activeBut.boolCloseActive=!dp.activeBut.boolCloseActive;
            })    

            var s='[{"object":{"@name":"name","@brkType":"standard","Feature":{"@code":"IM_coding","@source":"inframodel","Property":[{"@label":"infraCoding","@value":"0"},{"@label":"infraCodingDesc","@value":"no description"},{"@label":"terrainCoding","@value":"0"},{"@label":"terrainCodingDesc","@value":"no description"},{"@label":"surfaceCoding","@value":"0"},{"@label":"surfaceCodingDesc","@value":"no description"}]},"PntList3D":"6679242.252 25600425.8922 3.1663 6679240.8411 25600423.0462 0.2598 6679241.2793 25600424.077 -1.3613"}},{"object":{"@name":"name","@brkType":"standard","Feature":{"@code":"IM_coding","@source":"inframodel","Property":[[],{"@label":"infraCoding","@value":"0"},{"@label":"infraCodingDesc","@value":"no description"},{"@label":"terrainCoding","@value":"0"},{"@label":"terrainCodingDesc","@value":"no description"},{"@label":"surfaceCoding","@value":"0"},{"@label":"surfaceCodingDesc","@value":"no description"}]},"PntList3D":"6679237.8562 25600422.8776 -0.5424 6679240.7107 25600421.8405 0.9234 6679241.8805 25600422.908 2.3839"}}]'

            let dPreloader=new DPreloader(null,0,0)

            this.addPlus(dPreloader, null, false)
            //this.setMHBD()    


            this.drag();    
     
            if(self.par.ls.object["ddPlus_index"]!=undefined){
                setTimeout(function() {
                    setIndex(self.par.ls.object["ddPlus_index"]);
                }, 10);
                
            }
            
        }

        this.setMHBD= function(a,key){
            var aa=["ru","en","su"]
            if(a)aa=a;
            var key1="xz_"
            if(key)key1=key;
            let oo=[{xs:[],array:[]}]
            if(window.mhbd)oo=window.mhbd.objectBase
            var dr=new DRedactPM(null, 2, 2, key1 ,aa,oo)
            this.addPlus(dr, null, false)
            return dr
        }


        this.aDo=[]
        this.setObj = function(o,n){
            if(dfg==true){
                this.addPlus(o, n)
            }else{
                this.aDo.push(o, n)
            }
        }


        this.drag = function(){
            let aa=[];
            for (var i = 0; i < this.array.length; i++) {
                aa[i]=this.array[i].name
            }
            this.dbs.setTArr(aa);
        }


        this.addPlus = function(obj, name, bool){
            this.array.push(new DDPBlok(obj, name));
            if(bool==undefined)this.drag()            
        }


        var dTextArea=new DTextArea(this.dCont,0,0,"null");
        dTextArea.fontSize=dcmParam._fontSizeLitte+2;
        dTextArea.height=dTextArea.fontSize*6
        dTextArea.textAlign='left'


        var chek=new DCheckBox(this.dCont,otstup,otstup+32," ",function(){
            self.par.ls.object["ddPlus_chek"]=this.value
            self.par.ls.save()
            self.sizeWindow()
        });
        chek.width=chek.height=12
        if(self.par.ls.object["ddPlus_chek"]!=undefined)chek.value=self.par.ls.object["ddPlus_chek"]


        var lInfo=new DLabel(this.dCont,otstup+24,otstup+32,"null");
        lInfo.fontSize=dcmParam._fontSizeLitte;



        var dind=-1
        function setIndex (idArr){
            if(dind==idArr)return
            dind=idArr
            self.par.ls.object["ddPlus_index"]=idArr;          
            self.par.ls.save();

            self.dbs.index=dind
            for (var i = 0; i < self.array.length; i++) {
                if(i==idArr){
                    self.content.add(self.array[i].dCont)

                    self.fun("addObject", self.array[i].object);
                    let ss="Нет информации в классе infoThis";
                    if(self.array[i].object.infoThis)ss=self.array[i].object.infoThis;
                    setTTT(ss)
                }else{
                    if(self.array[i].dCont.parent)self.array[i].dCont.parent.remove(self.array[i].dCont)
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

            hhh1=dTextArea.y-otstup*2-32

            ssc=hhh1/(this.param.sizeBase2*2);

            

            if(ssc<0.25)ssc=0.25
            if(ssc>1)ssc=1

            if(chek.value==true )  ssc=1     


            this.panel.width=www/ssc//-otstup*2;
            this.panel.height=hhh1/ssc-otstup*3;
            this.dDCanvas.width=this.panel.width
            this.dDCanvas.height=this.panel.height
            this.content.scale= ssc  
            lInfo.text="scale:"+Math.round(ssc*100)/100
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


export class DDPBlok{
    constructor(object, name) {
        
        var self=this
        this.type="DDPBlok";
        this.name=object.type;
        this.object=object;
        if(name)this.name=name;

        this.dCont=new DCont()

        if(object.boolDCont){
            this.dCont.add(object)
        }
       


    }
}
       
