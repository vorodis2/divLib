
export class MSAHron  {
    constructor(par) {          
        var self=this   
        this.type="MSAHron";  
        this.idArr=-1
        this.par=par;
        this.obj = null;
        this.bool = true;
        this.aPram=["xz","xz1"]
        this.aStat=[-1,-1];
        

        this.pKey=this.par.pKey;

        this.setObject = function(obj){
            this.obj=obj;
            this.aPram.length=0;
            this.bool = true;
            this.pKey.setObjArr(this.obj,this.aPram);
            
           
        }
    }
}