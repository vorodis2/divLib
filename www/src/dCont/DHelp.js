


import { DCont } from './DCont.js';





export class DHelp extends DCont {
    constructor(dCont, _x, _y, _text, _link) {
        super(dCont); 
        this.type="DHelp";
        var self=this
        this.x=_x||0;   
        this.y=_y||0;


        this._text="null";
        this._link=null;
        this._color="#ff0000";

        if(dcmParam==undefined)dcmParam=new DCM();

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);    
        this._width=100;
        this._picWidth=32;        
        this._height=100;


        this.dCont=new DCont(this)
        
        

        this._color=dcmParam._color;
        this._colorText=dcmParam._colorText;
        this._otstup=dcmParam._otstup;
        this._fontSize=dcmParam._fontSize;
        this._boolLine=dcmParam._boolLine;

        this._fontFamily=dcmParam._fontFamily;
        this._borderRadius=0;

        this._boolNiz=false;



        this.panel=new DPanel(this.dCont)
        this.panel.div.style.borderRadius=this._borderRadius+"px";
        this.panel.color1=this._color; 

        this.label=new DLabel(this.dCont);
        this.label.colorText1=this._colorText;




        this.dragPic=function(){
            this.image.width=this._picWidth;
            this.image.height=this.image.picHeight*this.image.width/this.image.picWidth;
            this.image.visible=true;
            this.draw()
        }
        this.image=new DImage(this.dCont,0,0,null,function(){
            self.dragPic()
        })

        this.dContNiz=new DCont(this.dCont)
        this.dContNiz.visible=true


        this.image.visible=false;

        this._wCan=20
        this._hCan=15
        this.canvas=undefined;
        this.ctx=undefined;

        this.initNiz=function(){
            if(this.canvas!=undefined)return;
            this.canvas = document.createElement('canvas'); 
            this.canvas.width= this._wCan
            this.canvas.height= this._hCan             
            if (this.canvas.getContext){
                this.ctx = this.canvas.getContext('2d');              
            }
            this.dContNiz.div.appendChild(this.canvas);
            this.drawNiz()
        }

        this.drawNiz=function(){   
            if(this.canvas==undefined)return;     

            this.ctx.clearRect(0, 0, this._wCan, this._hCan);            
            if(this._boolLine==true){
                this.ctx.fillStyle =  dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);//"#ff0000"//                
                
                this.ctx.beginPath();
                this.ctx.moveTo(0,0);
                this.ctx.lineTo(this._wCan,0);
                this.ctx.lineTo(this._wCan/2,this._hCan);
                this.ctx.fill();

            }
            


            this.ctx.fillStyle = this._color
            this.ctx.beginPath();
            this.ctx.moveTo(1,0);
            this.ctx.lineTo(this._wCan-1,0);
            this.ctx.lineTo(this._wCan/2,this._hCan-1);

            this.ctx.fill();



        }

        this.plusLabelX=0
        var xt,ww,hh
        var r
        this.draw=function(){
            xt=this._otstup+this.plusLabelX;

            if(this.image.visible!=false){
                this.image.x=this._otstup;
                this.image.y=this._otstup;
                xt+= this._picWidth+this._otstup;
            }
            this.label.x=xt;
            this.label.width=this._width-xt-this._otstup
            r=this.label.getRect();

            hh=r.height+this._otstup*2;
            if(this.image.visible!=false){
                if(this.image.height+this._otstup*2>hh)hh=this.image.height+this._otstup*2

            }
            this.panel.height=hh;

            
            this.dCont.x=-this.width/2


            if(this._boolNiz==true){
                this.dContNiz.y=hh-2
                hh+=this._hCan;
                this.dContNiz.x=(this._width-this._wCan)/2;


            }

            this.dCont.y=-hh;



            this._height

            

        }

        
       /* this.p=new DPanel(this)
        this.p.width=this.p.height=10  */ 

        this.text= _text
        this.link=_link;

    }



    set text(value) {
        if(this._text!=value){            
            this._text = value;            
            if(this._text){
                if(this._text.lenght!=0){
                    this.label.visible=true;
                    this.label.text=this._text;
                    this.draw();  
                    return
                }                
            }
            this.label.visible=false;             
            this.draw()         
        }       
    }   
    get text() { return  this._text;}



    set fontFamily(value) {
        if(this._fontFamily!=value){            
            this._fontFamily = value; 
            this.label.fontFamily=this._fontFamily;          
            this.draw()         
        }       
    }   
    get fontFamily() { return  this._fontFamily;}
  




    set fontSize(value) {
        if(this._fontSize!=value){            
            this._fontSize = value;            
            this.label.fontSize = value;          
            this.draw()         
        }       
    }   
    get fontSize() { return  this._fontSize;}

    set boolLine(value) {
        if(this._boolLine!=value){            
            this._boolLine = value;            
            this.panel.boolLine = value;  
            this.drawNiz()        
            this.draw()         
        }       
    }   
    get boolLine() { return  this._boolLine;}

    
    set boolNiz(value) {
        if(this._boolNiz!=value){            
            this._boolNiz = value;            
            this.initNiz() 
            this.dContNiz.visible =this._boolNiz   
            this.draw()         
        }       
    }   
    get boolNiz() { return  this._boolNiz;}


    



    set otstup(value) {
        if(this._otstup!=value){            
            this._otstup = value;  
            this.draw()         
        }       
    }   
    get otstup() { return  this._otstup;}

    set picWidth(value) {
        if(this._picWidth!=value){            
            this._picWidth = value; 
            if( this.image.visible!=false){
                this.dragPic()
            }
            //this.draw()         
        }       
    }   
    get picWidth() { return  this._picWidth;}








    set link(value) {
        if(this._link!=value){            
            this._link = value;            
            
            if(this._link){
                if(this._link.lenght!=0){
                    this.image.visible=false
                    this.image.link=this._link;                    
                    return
                }                
            }
            this.image.visible=false;             
            this.draw()         
        }       
    }   
    get link() { return  this._link;}

    set width(value) {
        if(this._width!=value){            
            this._width = value;
            this.panel.width = value;
            this.draw()         
        }       
    }   
    get width() { return  this._width;}

    set borderRadius(value) {
        if(this._borderRadius!=value){              
            this._borderRadius = value;            
            this.panel.div.style.borderRadius=this._borderRadius+"px";
        }
    }   
    get borderRadius() {        
        return  this._borderRadius;
    }

    set color(value) {
        if(this._color!=value){              
            this._color = value;            
            this.panel.color1=this._color;  
            this.drawNiz();          
        }
    }   
    get color() {        
        return  this._color;
    }

    set colorText(value) {
        if(this._colorText!=value){              
            this._colorText = value;            
            this.label.colorText1=this._colorText;

        }
    }   
    get colorText() {        
        return  this._colorText;
    }




}
