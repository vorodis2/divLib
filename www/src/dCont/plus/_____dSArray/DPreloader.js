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
    

        this.dCont = new DCont(this);


        this._width = 200;
        this._height = 200;
        this._whComp = 100;
        this._otstup = dcmParam._otstup;
        this._color=dcmParam._color;
        this._text = null;
        this._size=10;
        this._active=true;
        this._sah=1;
        this._sah1=1.2;
    
    
        
        this.panel=new DPanel(this.dCont)
        this.panel.width=this._width
        this.panel.height=this._height

        this.dCL=new DCont(this.dCont)
        this.dCL.x=this._width/2;
        this.dCL.y=this._height/2;

        this.dRadius=new DRadius(this.dCL)
        this.dRadius.x= -this._whComp/2
        this.dRadius.y= -this._whComp/2
        this.dRadius.color=this._color;
        this.dRadius.radius=this._whComp-this._size;
        this.dRadius.radius1=this._whComp;
        this.label=new DLabel(this)
        

        this.visibleText=function(){
            if (this._text == null) {
                this.label.visible=false;
            } else {
                this.label.text=this._text;
                this.label.textAlign='center'
                this.label.width=this._width;
                this.label.height=dcmParam.fontSize;
                this.label.y=this.dCL.y-this.dRadius.y
            }    
        }

        this.reDraw=function(){
            let aa =Math.abs(this._whComp/this._height)
           
            this.dRadius.x= -this._whComp/2+(this._otstup*2)*aa
            this.dRadius.y= -this._whComp/2+(this._otstup*2)*aa
            this.dRadius.radius=this._whComp-this._size-(this._otstup*2)*aa*2;
            this.dRadius.radius1=this._whComp-(this._otstup*2)*aa*2;

        }
        //if(this._whComp >= this._height || this._whComp >= this._width )this.reDraw()

        this.update=function(){
            if(self._active==false){
                self.dRadius.angel=0
                self.dRadius.angel1=180
                return 
            }
           

            self.dRadius.angel+=self._sah
            self.dRadius.angel1+=self._sah1 

            /*let aa=self.dRadius.angel
            let aa1=self.dRadius.angel1
            let ss=(aa1-aa)%360*/

            




            requestAnimationFrame(self.update);
        }
        if(self._active==true)this.update()
       

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
            this.update()
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
            //if(this._whComp >= this._height || this._whComp >= this._width )this.reDraw()
            this.visibleText()
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
            //if(this._whComp >= this._height || this._whComp >= this._width )this.reDraw()
            this.visibleText()
        }
    }
    get height() {
        return this._height;
    }  


    set whComp(value) {
        if (this._whComp != value) {
            this._whComp = value;
            this.dRadius.x= -this._whComp/2
            this.dRadius.y= -this._whComp/2
            this.dRadius.radius=this._whComp-this._size;
            this.dRadius.radius1=this._whComp;
            this.visibleText()
            
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


    set size(value) {
        if (this._size != value) {
            this._size = value;
            if (this._size<0||this._size >this._whComp) {
                this._size=10
            }
            this.dRadius.radius=this._whComp-this._size;
        }
    }
    get size() {
        return this._size;
    }


    set text(value) {
        if (this._text != value) {
            this._text = value;
            this.visibleText()
            
        }
    }
    get text() {
        return this._text;
    }  
}







