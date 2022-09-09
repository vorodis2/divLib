
//класс компонент работающий с кнопками

export class DButtons extends DCont {
    constructor(dCont, x, y, array,fun) {
        super();
        this.type = 'DButtons';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        var self = this;
        this.x = x || 0;
        this.y = y || 0;
        this.fun = fun;
        this._array=array;

        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        
        this.funChange = undefined;


        this._width = 100;
        this._height = 32;
        //внутрение переменые параметров кнопок 
        this._widthPic = this._width;
        this._heightPic = this._height;

        this._otstup = 2;
        this._index = -1;

        this.arrComp=[]

        //создает кнопку 
        this.getButton = function(){
            //делет видимыми кнопки в масиве
            for (var i = 0; i < this.arrComp.length; i++) {
                if(this.arrComp[i].visible==false){
                    this.arrComp[i].visible=true
                    return this.arrComp[i]
                }
            }
            //инициация кнопка
            let button=new DButton(this,0,0,this.text,function(){
                self.index=this.idArr
                if(self.fun)self.fun()
            })
            //размещене и параметры кнопка
            button.x=this.arrComp.length*(this._otstup+this._widthPic)
            button.idArr=this.arrComp.length
            button.width=(this._widthPic)/this._array.length;
            button.height=this._heightPic
            //наполение масива кнопкой
            this.arrComp.push(button)
            return button  
        }


        //делает не видимыми кнопки не входящие в масив
        this.clear = function(){
            for (var i = 0; i < this.arrComp.length; i++) {
                this.arrComp[i].visible=false
                
            }        
        }
        
        //вызов кнопок и передача им значения(текста)
        this.dragArr=function(){
            this.clear()
            for (var i = 0; i < this._array.length; i++) {
                let button = this.getButton()
                button.text=this._array[i] 
            }  
            this.index=-1                  
        }

        

        this.dragArr();

    }

    //сеттер длины
    set width(v) {
        if (this._width != v) {
            this._width = v;
           /* let ww=(this._widthPic-this.otstup)/this._array.length;
            this.widthPic=ww  */
            this._widthPic = this._width;
            for (var i = 0; i < this.arrComp.length; i++) {
                this.arrComp[i].x=this._otstup*i+this.arrComp[i].width*i
                this.arrComp[i].width=(this._widthPic)/this._array.length;
            }
        }
    }
    get width() {
        return this._width;
    }


    //сеттер высоты
    set height(v) {
        if (this._height != v) {
            this._height = v;
            this._heightPic = this._height;
            for (var i = 0; i < this.arrComp.length; i++) {
                this.arrComp[i].height=this._heightPic;
            }
        }
    }

    get height() {
        return this._height;
    }

    //сеттер отступа
    set otstup(v) {
        if (this._otstup != v) {
            this._otstup = v;
            for (var i = 0; i < this.arrComp.length; i++) {
                this.arrComp[i].x=this._otstup*i+this.arrComp[i].width*i
            }
        }
    }
    get otstup() {
        return this._otstup;
    }

    //сеттер прозрачности определенной кнопки
    set index(v) {
        if (this._index != v) {
            this._index = v;
            for (var i = 0; i < this.arrComp.length; i++) {
                if (this.arrComp[i].idArr==this._index) {
                    this.arrComp[i].alpha=1;
                }else{
                    this.arrComp[i].alpha=0.5;
                }
            }
        }
    }
    get index() {
        return this._index;
    }

    //сеттер обновления масива кнопок
    set array(v) {
        if (this._array != v) {
            this._array = v;
            this.dragArr()
        }
    }
    get array() {
        return this._array;
    }


}