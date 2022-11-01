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


///Дебагер 2д позиций, базируеться на канве
export class DDCanvas extends DCont {
    constructor(dCont, _x, _y) {
        super();
        this.type = 'DDCanvas';
        this.infoThis=`
            var ddc = new DDCanvas(this.dCont,0,0);
            ddc.setSetka()              //sah, depth, color, alp)
            ddc.setText(point,text)     //, fontSize, color, alp) 
            ddc.setPoint(point)         //, radius, depth, color, alp)
            ddc.setLine(point, point1)  //, depth, color, alp)
            ddc.setRPs(point, point1)   //, depth, color, alp)
            ddc.setRect(rect)           //, depth, color, alp)
        `    


        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);

        var self = this
        this.dCont = new DCont(this);

        this._width = 200;
        this._height = 200;

        this._bSetkaText=true;
        this._bSetkaCobe=false;
        this._bDrag=false;
        

        
        this._pointX = 0;                           //Здвиг осей
        this._pointY = 0;


        this.fontSize = dcmParam._fontSizeLitte;   //толщина текста
        this.fontFamily = dcmParam.fontFamily;   //толщина текста
        this.color = dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -100);
        this.depth = 2;                            //толщина если нет
        this.alp = 0.5;                            //Прозрачность если нет                                                               //Здвиг осей
        this.sah = 10;                             //шаг сетки 
        this.radius = 2;                           //радиус точек и других обЬектов
        this._mashtab = 10;                        //маштаб сетки
        
        this._canPlus=25
        this._otXY =0
        this.alpSetka = 0.1; 


        this.widthContent = this._width+this._otXY;
        this.heightContent = this._height+this._otXY;
        let cc = null;

        //нижняя панель(подложка)
        //this.panel = new DPanel(this, 0, 0)
      


        //панель содержащая в себе canva
        this.panel1 = new DPanel(this, this._otXY, this._otXY)

        this.panel1.width = this.width;
        this.panel1.height = this.height;
        this.panel1.visible=this._bDrag;

        //панель при наведении показывающая нахождение курсора
        this.panel2 = new DPanel(this.panel1, 0, 0)
        this.panel2.visible=false
        //this.panel2.alpha=this.alpSetka
  

        //обьявление канвы 
        this.dCC=new DCont(this)
        this.dCC.x=-this._canPlus
        this.dCC.y=-this._canPlus
        this.canvas = document.createElement('canvas'); // канвас для картинки
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.width=this.widthContent+this._canPlus*2;
        this.canvas.height=this.heightContent+this._canPlus*2;
        this.dCC.div.appendChild(this.canvas)
        

        
        this.getX = function(num) {
            return Math.round(this._pointX+this._otXY + num+this._canPlus);
        }
        this.getY = function(num) {
            return Math.round(this._pointY+this._otXY+num+this._canPlus)
        }


        this.moveTo = function(x,y) {
            this.ctx.moveTo(this.getX(x), this.getY(y));
        }
        this.lineTo = function(x,y) {
            this.ctx.lineTo(this.getX(x), this.getY(y));
        }

        
        var point={x:0,y:0}
        var xx1,yy1
        //отрисовка сетки
        this.setSetka = function(sah, depth, color, alp) {
            if (sah == undefined) sah = this.sah
            if (depth == undefined) depth = this.depth
            if (color == undefined) color = this.color
            if (alp == undefined) alp = this.alpSetka  


            if(this._bSetkaCobe==false){

                

                this.ctx.beginPath();
                this.ctx.lineWidth = depth + "";
                cc = dcmParam.parseColor(color)
                this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
                
                xx1 = -Math.floor(this._pointX / (this.sah*this._mashtab))*(this.sah*this._mashtab);
                for (var i = xx1; i < this._width-this._pointX; i+=sah*this._mashtab) {
                    this.moveTo(i, 0-this._pointY);
                    this.lineTo(i, this._height-this._pointY);
                }

                yy1 = -Math.floor(this._pointY / (this.sah*this._mashtab))*(this.sah*this._mashtab);
                for (var i = yy1; i < this._height-this._pointY; i+=(this.sah*this._mashtab)) {
                    this.moveTo(0-this._pointX, i );
                    this.lineTo(this._width-this._pointX, i  );
                }

                this.ctx.stroke();
               
                this.ctx.beginPath();
                this.ctx.lineWidth = depth + "";
                cc = dcmParam.parseColor(color)
                alp*=2
                this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + 0.5 + ')';
                
                if (this._pointY >= 0 && this._pointY<=this._height) {
                    this.moveTo(-this._pointX, 0);
                    this.lineTo(-this._pointX+this._width, 0);
                }

                if (this._pointX >= 0 && this._pointX<=this._width) {
                    this.moveTo(0, -this._pointY);
                    this.lineTo(0, -this._pointY+this._height);
                }

                this.ctx.stroke();
            }else{
                this.ctx.beginPath();
              
                cc = dcmParam.parseColor(color)
                //this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
                this.ctx.fillStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
               //this.ctx.fillRect(10, 10, 100, 100);
                let b=true
                var j=0

                yy1 = -Math.floor(this._pointY / (this.sah*this._mashtab))*(this.sah*this._mashtab);
                for (var j = yy1; j < this._height-this._pointY; j+=(this.sah*this._mashtab)) {
                    xx1 = -Math.floor(this._pointX / (this.sah*this._mashtab))*(this.sah*this._mashtab);
                    if(b==false)xx1+=(this.sah*this._mashtab)
                    for (var i = xx1; i < this._width-this._pointX; i+=sah*this._mashtab*2) {
                        this.ctx.fillRect(this.getX(i), this.getX(j), (this.sah*this._mashtab), (this.sah*this._mashtab));
                        this.ctx.fill();                   
                    } 
                    b=!b; 


                }

                
            }

            if(this._bSetkaText==false)return
            for (var i = xx1; i < this._width; i+=sah*this._mashtab) {
                this.ctx.textAlign = "center";
                point.x=i;
                point.y=-this._pointY-5;         
                this.setText(point,Math.round(i/this._mashtab*1000)/1000+"")
            }

            for (var i = yy1; i < this._height; i+=sah*this._mashtab) {
                this.ctx.textAlign = "right"; 
                point.x=-this._pointX-5
                point.y=i+this.fontSize/4;      
                this.setText(point,Math.round(i/this._mashtab*1000)/1000+"")
            }
            this.ctx.textAlign = "left";
        }

        //текст длясетки
        this.setText = function(point,text, fontSize, color, alp) {
            if (fontSize == undefined) fontSize = this.fontSize
            if (color == undefined) color = this.color
            if (alp == undefined) alp = this.alp 
            this.ctx.beginPath();   
            this.ctx.font = fontSize+"px "+this.fontFamily;
            cc = dcmParam.parseColor(color)
            this.ctx.fillStyle =  'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')'; 
            this.ctx.fillText(text,
                this.getX(point.x),
                this.getY(point.y)
            );
            this.ctx.stroke()
            this.ctx.closePath()
        }    

        //отрисовка точек в сетке 
        this.setPoint = function(point, radius, depth, color, alp) {
            if (radius == undefined) radius = this.radius
            if (depth == undefined) depth = this.depth
            if (color == undefined) color = this.color    
            if (alp == undefined) alp = this.alp
            this.ctx.beginPath();
            this.ctx.lineWidth = depth + "";  
            cc = dcmParam.parseColor(color)
            this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
            this.ctx.arc(
                this.getX(point.x), 
                this.getY(point.y), 
                radius, 0, 2 * Math.PI, false);
            this.ctx.stroke()
            this.ctx.closePath()
        }

        //отрисовка линии от одной точки к другой
        this.setLine = function(point, point1, depth, color, alp) {
            if (depth == undefined) depth = this.depth
            if (color == undefined) color = this.color
            if (alp == undefined) alp = this.alp 
            this.ctx.beginPath();
            this.ctx.lineWidth = depth + "";           
            cc = dcmParam.parseColor(color)
            this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';           
            this.ctx.moveTo(this.getX(point.x), this.getY(point.y));
            this.ctx.lineTo(this.getX(point1.x), this.getY(point1.y));
            this.ctx.stroke();
        }


        //отрисовка прямоугольника от одной точки к другой
        this.setRPs = function(point, point1, depth, color, alp) {
            if (depth == undefined) depth = this.depth
            if (color == undefined) color = this.color
            if (alp == undefined) alp = this.alp
            this.ctx.beginPath();
            this.ctx.lineWidth = depth + "";
            cc = dcmParam.parseColor(color)
            this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
            this.ctx.globalAlpha = alp;
            this.ctx.rect(this.getX(point.x), this.getY(point.y), point1.x  - point.x , point1.y - point.y );
            this.ctx.stroke();
        }

        //отрисовка прямоугольника от точки 
        this.setRect = function(rect, depth, color, alp) {
            if (depth == undefined) depth = this.depth
            if (color == undefined) color = this.color
            if (alp == undefined) alp = this.alp
            if (rect.h == undefined) rect.h = rect.height
            if (rect.w == undefined) rect.w = rect.width
            this.ctx.beginPath();
            this.ctx.lineWidth = depth + "";
            cc = dcmParam.parseColor(color)
            this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
            this.ctx.globalAlpha = alp;
            this.ctx.rect(this.getX(rect.x), this.getY(rect.y), rect.h, rect.w);
            this.ctx.stroke();
        }


        //очистка
        this.clear = function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        //дебагер(проверка работы функций)
        /* this.debag = new Debag(this.dCont, function(s, p, p1) {
            let r1 = { x: p[0].x, y: p[0].y, width: p[1].y - p[0].y, height: p[1].x - p[0].x }

            self.clear()
            self.setSetka(self.sah, self._depth, self._color, self._alp)
            
            for (var i = 0; i < p.length; i++) {
                self.setPoint(p[i], self.radius, self.depth, self.color, self.alp)
            }
            self.setLine(p[2], p[3], self.depth, self.color, self.alp)
            self.setRect(r1, self.depth, self.color, self.alp)
            self.setRPs(p[1], p[2], self.depth, self.color, self.alp)

        })
        */
     
        //вызов отрисовки сетки
        this.setSetka()


        var rr=null;
        let sc
        //появление panel2 при наведении курсора
        this.mousemove = function (e) {
            

            self.panel2.visible=true;
            rr=self.panel1.div.getBoundingClientRect();
            self.panel2.width=(e.clientX-rr.x)/sss;
            self.panel2.height=(e.clientY-rr.y)/sss;
            
        } 



        var sss=1
        this.mouseover = function (e) {
            sss=self.getScaleScane() 
            dcmParam.addFunMove(self.mousemove);
            self.mousemove(e)

        };
        this.mouseout = function (e) {
            dcmParam.removeFunMove(self.mousemove); 
            self.panel2.visible=false
        };        

      

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

    //изменение ширены 
    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.widthContent = this._width+this._otXY;
            this.canvas.width = this.widthContent+this._canPlus*2;
            this.panel1.width = this._width;
            //this.panel.width = this.widthContent;
            this.clear()
            this.setSetka()
            //this.debag.width = this._width;
        }
    }
    get width() {
        return this._width;
    }

    //изменение высоты
    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.heightContent = this._height+this._otXY;
            this.canvas.height = this.heightContent+this._canPlus*2;
            this.panel1.height = this.height;
           // this.panel.height = this.heightContent;
            this.clear()
            this.setSetka()
            //this.debag.height = this._height;
        }
    }
    get height() {
        return this._height;
    }

    //движение сетки по x
    set bDrag(value) {
        if (this._bDrag != value) {
            this._bDrag = value;
            this.panel1.visible=this._bDrag;
            
            if(this._bDrag==true){
                if (dcmParam.mobile == false) {           
                    this.panel1.div.addEventListener('mouseover', this.mouseover);
                    this.panel1.div.addEventListener('mouseout', this.mouseout);
                }
            }else{
                if (dcmParam.mobile == false) {           
                    this.panel1.div.removeEventListener('mouseover', this.mouseover);
                    this.panel1.div.removeEventListener('mouseout', this.mouseout);
                }
            }
            
        }
    }
    get bDrag() {
        return this._bDrag;
    }



    //движение сетки по x
    set pointX(value) {
        if (this._pointX != value) {
            this._pointX = value;
            this.clear()
            this.setSetka()
        }
    }
    get pointX() {
        return this._pointX;
    }

    //движение сетки по y
    set pointY(value) {
        if (this._pointY != value) {
            this._pointY = value;
            this.clear()
            this.setSetka()
        }
    }
    get pointY() {
        return this._pointY;
    }

    //изменение маштаба у сетки
    set mashtab(value) {
        if (this._mashtab != Math.abs(value)) {
            this._mashtab = Math.abs(value);
            this.clear()
            this.setSetka()
        }
    }
    get mashtab() {
        return this._mashtab;
    }

    set bSetkaText(value) {
        if (this._bSetkaText != value) {
            this._bSetkaText = value;
            

            this.clear();
            this.setSetka();
        }
    }
    get bSetkaText() {
        return this._bSetkaText;
    }

    set bSetkaCobe(value) {
        if (this._bSetkaCobe != value) {
            this._bSetkaCobe = value;           

            this.clear();
            this.setSetka();
        }
    }
    get bSetkaCobe() {
        return this._bSetkaCobe;
    }

    


    set canPlus(value) {
        if (this._canPlus != value) {
            this._canPlus = value;
            this.canvas.width = this.widthContent+this._canPlus*2;
            this.canvas.height = this.heightContent+this._canPlus*2;
            this.dCC.x=-this._canPlus
            this.dCC.y=-this._canPlus
            this.clear();
            this.setSetka();
        }
    }
    get canPlus() {
        return this._canPlus;
    }

    set otXY(value) {
        if (this._otXY != value) {
            this._otXY = value;
            this.panel1.x= this._otXY;
            this.panel1.y= this._otXY; 
                  
            this.clear();
            this.setSetka();
        }
    }
    get otXY() {
        return this._otXY;
    }
}

