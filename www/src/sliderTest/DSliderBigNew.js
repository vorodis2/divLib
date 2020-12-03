import {DSlider} from "./DSlider.js"
export class DSliderBigNew extends DCont {
    constructor(dCont, _x, _y, fun, _text, _min, _max) {
        super();
        this.type="DSliderBig";
        if(dcmParam==undefined)dcmParam=new DCM();
        dcmParam.add(this);
        var self=this;
        this.x=_x||0;	
        this.y=_y||0;
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);	
        console.log(dcmParam);
        this._width=100;
        this._height=dcmParam.wh+12;
        this.fun=fun
        this.funChange=undefined;

        this._min=-2357845745434785894;
        this._max=3567567856787967889;
        this._value = 0; // округление value
        this._okrug = 100; // округление value
        this._okrug1  = 1;
        this._text=_text||"null";

        this._mobile = dcmParam.mobile;
        if(dcmParam.mobileVisi!=undefined)this._mobile = dcmParam.mobileVisi;

        this._borderRadius = dcmParam.borderRadius;	

        this.input=new DInput(this,0,0,"0", function(){  			
            var vv= this.text-1+1;  			
            self.value =vv;
            if(self.fun)self.fun();
            if(self.funChange)self.funChange();	
        })

        this.slider=new DSlider(this,0,0, function(){  			
            self.value=this.value;
            if(self.fun)self.fun();	
        })

        this.slider.funChange=function(){
            if(self.funChange)self.funChange();	
        }

        this.slider.y=dcmParam.wh/2-2;
        
        this.label=new DLabel(null,0,0, this._text);
        this.label.fontSize=this.label.fontSize*2/3;

        this.label1=new DLabel(this,0,0, this._min+"");
        this.label1.fontSize=this.label.fontSize*2/3;
        this.label1.y=37

        this.label2=new DLabel(this,0,0, this._max+"");
        this.label2.fontSize=this.label.fontSize*2/3;
        this.label2.y=37;

        if(this._mobile==true){
            this.slider.height=this.input.height;
            this.slider.y=0;
            this.label.y =(this._height - (this._height - this.input.height)) / 2 - dcmParam._otstup * 3;
            this.label.x=10;
            this.label.div.style.pointerEvents="none";
            this.label.alpha=0.5;
        }

        this.add(this.label)

        this.label.testVisi(true);

        this._width++;
        this.width=this._width-1;  

        this.min=_min||0;
        this.max=_max||100;

        this.mousedown = function(e) {}

        if(dcmParam.mobile==false){			
			this.div.addEventListener("mousedown", self.mousedown);
			this.div.addEventListener("mousedown", self.mousedown);
		}else{
			this.div.addEventListener("touchstart", self.mousedown);
			this.div.addEventListener("touchstart", self.mousedown);
		}
    } 

  set x(v) {this.position.x = v;}	get x() { return  this.position.x;}
  set y(v) {this.position.y = v;}	get y() { return  this.position.y;}
  set width(v) {
      if(this._width!=v){
          this._width = v;				
          this.slider.width=(this._width-dcmParam._otstup)*0.7
          this.input.width=(this._width-dcmParam._otstup)*0.3-4
          this.input.x=this.slider.width+dcmParam._otstup;

          this.label2.x=this.input.x-4*this.label2.text.length;
      }		
  }	
  get width() { return  this._width;}


  set height(v) {
      if(this._height != v){
          this._height = v;

          this.input.height = this._height - dcmParam._otstup * 5;
          this.slider.height = this._mobile 
            ? this.input.height
            : this._height - dcmParam._otstup * 11;

          this.label.y = this._mobile 
            ? (this._height - (this._height - this.input.height)) / 2 - dcmParam._otstup * 3
            : 0

          this.label1.y = this._height - dcmParam._otstup * 3
          this.label2.y = this._height - dcmParam._otstup * 3

          this.value = this._value;
      }		
  }		
  get height() { return  this._height;}


  set borderRadius(value) {
      if(this._borderRadius!=value){				
          this._borderRadius = value;			
          this.input.borderRadius = value;	
          this.slider.borderRadius = value;		
      }
  }	
  get borderRadius() { 		
      return  this._borderRadius;
  }

  set okrug1(v) {
    this._okrug1 = v;
  }

  get okrug1() { return this._okrug1 }

  set mobile(value) {
      if (this._mobile != value) {
        this._mobile = value;
          
          if (this._mobile) {
            this.slider.height=this.input.height
            this.slider.y=0;
            this.label.y=(this._height - (this._height - this.input.height)) / 2 - dcmParam._otstup * 3
            this.label.x=10
            this.label.div.style.pointerEvents="none";
            this.label.alpha=0.5;
          } 

          

          if (!this._mobile) {
            this.slider.height=this._height - dcmParam._otstup * 11;
            this.slider.y=this._height - this.input.height;
            this.label.x = 0;
            this.label.y = 0;
            this.label.div.style.pointerEvents="auto";
            this.label.alpha = 1;
          }
      }
  }

  get mobile() { return this._mobile }
  
  set value(v) {   
      let len = String(this._okrug).length - 1; 

      this._value = v;
      this._value -= (this._value % this.okrug1);
      this._value = +this._value.toFixed(len);

      if(this._value>this._max)this._value=this._max;
      if(this._value<this._min)this._value=this._min;	
      this.input.text=""+this._value	
      this.slider.value=this._value;
  }	
  get value() { return  this._value;}	

  set okrug(v) {		
      this._okrug = v;
      this.slider.okrug = this._okrug;
      this.value = this._value;
  }	
  get okrug() { return  this._okrug;}	
  
  set min(v) {
      if(this._min!=v){
          this._min = v;	
          this.label1.text=	this._min+"";
          this.slider.min=this._min	
      }		
  }	
  get min() { return  this._min;}	

  
  set max(v) {
      if(this._max!=v){
          this._max = v;			
          this.label2.text=	this._max+"";	
          this.slider.max=this._max;
          this.label2.x=this.input.x-4*this.label2.text.length;	
      }		
  }	
  get max() { return  this._max;}	

  set text(v) {
      if(this._text!=v){
          this._text = v;			
          this.label.text=this._text
      }		
  }	
  get text() { return  this._text;}		

}
