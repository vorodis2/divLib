


import { DCont } from './DCont.js';
//import { DButton} from './dCont/DCM.js';



export class DAroundButton extends DCont {
  	constructor(dCont, _x, _y, _fun) {
  		super(); 
  		this.type="DAroundButton";
  		var self=this
  		this.x=_x||0;	
  		this.y=_y||0;
   		this.fun=_fun;

		
  	}



  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			//this.reDrag();
			
		}		
	}	
	get width() { return  this._width;}


}

/*

export class DButtonDrag extends DButton {
  	constructor(dCont, _x, _y, _link, _link1, _fun) {
  		super(); 
  		this.type="DButton";
  		this.dcmParam=dcmParam; 
  		this.dcmParam.add(this)
  		var self=this
  		this.x=_x||0;	
  		this.y=_y||0;
   		this._text=_text||"null";
   		this.fun=_fun;

   
  	}



  	set x(value) {this.position.x = value;}	get x() { return  this.position.x;}
	set y(value) {this.position.y = value;}	get y() { return  this.position.y;}
	set width(value) {
		if(this._width!=value){
			this._width = value;
			this.reDrag()
			//this.object.style.width=this._width+"px";
		}		
	}	
	get width() { return  this._width;}




}
*/