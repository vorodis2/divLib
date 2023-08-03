/**
Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
Разработчик и владелец данного кода Сидоров Евгений vorodis2:
The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
Developer and owner of this code Sidorov Evgeniy vorodis2
contacts:
site: vorodis2
mail: vorodis2@gmail.com
skype: vorodis2
phone: +380951026557 
*/


import { DRadius } from './DRadius.js';

export class DPreloader extends DCont {
    constructor(dCont, _x, _y) {
        super();
        this.type = 'DPreloader';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        var self = this
    




        this._width = 200;
        this._height = 200;
        this._whComp = 100;
        this._otstup = dcmParam._otstup;
        this._color=dcmParam._color;
        this._color1=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -30); 
        this._color2=dcmParam._color1;         
                


        this._text = "null";
        this._size=10;
        this._active = false;
        this._sah=1;
        this._sah1=1.5;
        this.bool=true;
    
        this.dCont = new DCont(); 


        
        this.panel=new DPanel(this.dCont)
        this.panel.width=this._width;
        this.panel.height=this._height;
        this.panel.alpha=0.25;
        this.panel.boolFond=false
        this.panel.color=this._color2;

        this.dCL=new DCont(this.dCont)
        this.dCL.x=this._width/2;
        this.dCL.y=this._height/2;

        this.dRadius1=new DRadius(this.dCL)
        this.dRadius1.x= -this._whComp/2
        this.dRadius1.y= -this._whComp/2

        this.dRadius1.angel=0
        this.dRadius1.angel1=359.999

        this.dRadius1.color=this._color1;              


        this.dRadius=new DRadius(this.dCL)
        this.dRadius.x= -this._whComp/2
        this.dRadius.y= -this._whComp/2
        this.dRadius.color=this._color;
        this.dRadius.radius=this._whComp-this._size;
        this.dRadius.radius1=this._whComp;



        
        this.label=new DLabel(this,0,0,"null")
        this.label.visible=false
        this.label.textAlign='center'

        this.visibleText=function(){
            if (this._text == "null") {
                this.label.visible = false;
            } else {
                this.label.text=this._text;
                this.label.textAlign='center'
                this.label.width=this._width;
                this.label.height=this.label.fontSize;
                this.label.y=this.dCL.y-this.dRadius.y
            }    
        }

        let wh=1
        this.reDraw=function(){

            wh=this._whComp;
            if(wh>this._height-this._otstup*2)wh=this._height-this._otstup*2
            if(wh>this._width-this._otstup*2)wh=this._width-this._otstup*2  
            if(this.label.visible){
                if(wh>this._height-this._otstup*2-this.label.fontSize*2)wh=this._height-this._otstup*2-this.label.fontSize*2

                this.label.width=  this._width;
                
            }
                   

            let aa =Math.abs(this._whComp/this._height)           
            this.dRadius.x= -wh/2//+(this._otstup*2)*aa
            this.dRadius.y= -wh/2//+(this._otstup*2)*aa

            this.dRadius1.x= -wh/2-this._otstup/2
            this.dRadius1.y= -wh/2-this._otstup/2
            
            this.dRadius.radius=wh-this._size//-(this._otstup*2)*aa*2;
            this.dRadius.radius1=wh//-(this._otstup*2)*aa*2;

            if(this.label.visible){
                this.label.y=  this._height/2+wh/2+this.label.fontSize
            }

            this.dRadius1.radius=wh-this._size-this._otstup;
            this.dRadius1.radius1=wh+this._otstup;
            
        }

        let r,r1,rd;
        this.update=function(){
            /*if(self._active==false){
                self.dRadius.angel=0
                self.dRadius.angel1=180
                return 
            }*/
            //self.ddd()   

           
            r=self.dRadius._angel+self._sah;
            r1=self.dRadius._angel1+self._sah1;
            
            


            self.dRadius.angel=r;
            self.dRadius.angel1=r1; 

            if(self._active == true)requestAnimationFrame(self.update);
        }

        this.ddd=function(){



            r=self.dRadius._angel+self._sah;
            if(this.bool) r1=self.dRadius._angel1+self._sah1;
            else r1=self.dRadius._angel1-self._sah1;

            rd=  Math.abs(r1-r)
            if(self.bool){
                if(rd>360){
                    self.bool=false;
                    
                    self.dRadius._angel=self.dRadius._angel1%360
                    self.dRadius._angel1=self.dRadius._angel1%360
                }
            }else{
                if(rd>360){
                    self.bool=true;
                    
                    self.dRadius._angel=self.dRadius._angel1%360
                    self.dRadius._angel1=self.dRadius._angel1%360
                }
            }
            






        }    

       
       

    } 


    set x(value) {
        this.position.x = value;
    }
    get x() {
        return this.position.x;
    }


    set y(value) {
        this.position.y = value;
    }
    get y() {
        return this.position.y;
    }


    set active(value) {
        if (this._active != value) {
            this._active = value;
            if(this._active){
                this.add(this.dCont)
                this.update();
            }else{
                this.remove(this.dCont)
            }


            
        }
    }
    get active() {
        return this._active;
    }


    set sah(value) {
        if (this._sah != value) {
            this._sah = value;
            this.dRadius.angel=this._sah
        }
    }
    get sah() {
        return this._sah;
    }


    set sah1(value) {
        if (this._sah1 != value) {
            this._sah1 = value;
            this.dRadius.angel1=this._sah1
        }
    }
    get sah1() {
        return this._sah1;
    } 


    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.panel.width=this._width
            this.dCL.x=this._width/2;
            this.reDraw()
            
        }
    }
    get width() {
        return this._width;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.panel.height=this._height
            this.dCL.y=this._height/2;
            this.reDraw()
       
        }
    }
    get height() {
        return this._height;
    }  


    set whComp(value) {
        if (this._whComp != value) {
            this._whComp = value;
          
           
            this.reDraw()
            
            
        }
    }
    get whComp() {
        return this._whComp;
    } 

    set color(value) {
        if (this._color != value) {
            this._color = value;
            this.dRadius.color=this._color;
        }
    }
    get color() {
        return this._color;
    }

    set color1(value) {
        if (this._color1 != value) {
            this._color1 = value;
            this.dRadius1.color=this._color1;
        }
    }
    get color1() {
        return this._color1;
    }

    set color2(value) {
        if (this._color2 != value) {
            this._color2 = value;
            this.panel.color=this._color2;
        }
    }
    get color2() {
        return this._color2;
    }    



    set otstup(value) {
        if (this._otstup != value) {
            this._otstup = value;
            this.reDraw()
        }
    }
    get otstup() {
        return this._otstup;
    }


    set size(value) {
        if (this._size != value) {
            this._size = value;
            this.reDraw()
        }
    }
    get size() {
        return this._size;
    }


    set text(value) {
        if (this._text != value) {
            this._text = value;
            this.label.text = value;
            if(this._text=='null'){
                this.label.visible=false 
            }else{
                this.label.visible=true 
            }
            this.reDraw()
        }
    }
    get text() {
        return this._text;
    }  
}







