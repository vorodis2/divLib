
export class Unik_Steps {
	constructor() { 
	
  		var self=this;
  		this.type="Unik_Steps";

        this._width=1000;
        this._height=1000;
        this._delph=1000;
        this._step = 4

        

        this._bool = false
        this._bool1 = true
        this._bool2 = false
        this.dragWHD=function(_w,_h,_d){

        	trace (_w,_h,_d)
        }            

        









	}

    set width(value) {
        if(this._width!=value){
            this._width= value;            
            this.dragWHD()
        }
    }    
    get width() { return  this._width;}    

    set height(value) {
        if(this._height!=value){
            this._height= value;
            this.dragWHD()
        }
    }    
    get height() { return  this._height;}


    set step(value) {
        if(this._step!=value){
            this._step= value;
            this.dragWHD()
        }
    }    
    get step() { return  this._step;}


    set bool(value) {
        if(this._bool!=value){
            this._bool= value;
            this.dragWHD()
        }
    }    
    get bool() { return  this._bool;}  

    set bool1(value) {
        if(this._bool1!=value){
            this._bool1= value;
            this.dragWHD()
        }
    }    
    get bool1() { return  this._bool1;}  


    set bool2(value) {
        if(this._bool2!=value){
            this._bool2= value;
            this.dragWHD()
        }
    }    
    get bool2() { return  this._bool2;}  
}
