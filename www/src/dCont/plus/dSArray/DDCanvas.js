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
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);

        var self = this
        this.dCont = new DCont(this);

        this._width = 200;
        this._height = 200;
        this._otstup = dcmParam._otstup;

        
        this._pointX = 30;                           //Здвиг осей
        this._pointY = 40;


        this.fontSize = dcmParam._fontSizeLitte;   //толщина текста
        this.fontFamily = dcmParam.fontFamily;   //толщина текста
        this.color = dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -100);
        this.depth = 2;                            //толщина если нет
        this.alp = 0.5;                            //Прозрачность если нет                                                               //Здвиг осей
        this.sah = 10;                             //шаг сетки 
        this.radius = 2;                           //радиус точек и других обЬектов
        this._mashtab = 10;                        //маштаб сетки
        this.otX = 20;                             //отступ по x
        this.otY = this._otstup*2+this.fontSize;                             //отступ по y
        this.alpSetka = 0.05; 


        this.widthContent = this._width+this.otX+this._otstup;
        this.heightContent = this._height+this.otY-this._otstup;
        let cc = null;

        //нижняя панель(подложка)
        this.panel = new DPanel(this, 0, 0)
        this.panel.width = this.widthContent;
        this.panel.height = this.heightContent;


        //панель содержащая в себе canva
        this.panel1 = new DPanel(this.panel, 0, 0)
        this.panel1.x = this.otX+this._otstup*2;
        this.panel1.y = this.otY
        this.panel1.width = this.width - this._otstup*2;
        this.panel1.height = this.height - this._otstup*2;

        //панель при наведении показывающая нахождение курсора
        this.panel2 = new DPanel(this.panel1, 0, 0)
        this.panel2.visible=false
        this.panel2.alpha=this.alpSetka
  

        //обьявление канвы 
        this.canvas = document.createElement('canvas'); // канвас для картинки
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.width=this.widthContent;
        this.canvas.height=this.heightContent;

        this.panel.div.appendChild(this.canvas)
        
        
        this.moveTo = function(x,y) {
            this.ctx.moveTo(Math.round(this._pointX+this.otX+x+this._otstup*2), Math.round(this._pointY+this.otY+y));
        }
        this.lineTo = function(x,y) {
            this.ctx.lineTo(Math.round(this._pointX+this.otX+x+this._otstup*2), Math.round(this._pointY+this.otY+y));
        }

        
        var point={x:0,y:0}
        var xx1,yy1
        //отрисовка сетки
        this.setSetka = function(sah, depth, color, alp) {
            if (sah == undefined) sah = this.sah
            if (depth == undefined) depth = this.depth
            if (color == undefined) color = this.color
            if (alp == undefined) alp = this.alpSetka  

            this.ctx.beginPath();
            this.ctx.lineWidth = depth + "";
            cc = dcmParam.parseColor(color)
            this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
            
            xx1 = -Math.floor(this._pointX / (this.sah*this._mashtab))*(this.sah*this._mashtab);
            for (var i = xx1; i < this._width-this._pointX-this._otstup*2; i+=sah*this._mashtab) {
                this.moveTo(i, 0-this._pointY);
                this.lineTo(i, this._height-this._pointY-this._otstup*2);
            }

            yy1 = -Math.floor(this._pointY / (this.sah*this._mashtab))*(this.sah*this._mashtab);
            for (var i = yy1; i < this._height-this._pointY-this._otstup*2; i+=(this.sah*this._mashtab)) {
                this.moveTo(0-this._pointX, i );
                this.lineTo(this._width-this._pointX-this._otstup*2, i  );
            }

            this.ctx.stroke();
           
            this.ctx.beginPath();
            this.ctx.lineWidth = depth + "";
            cc = dcmParam.parseColor(color)
            alp*=2
            this.ctx.strokeStyle = 'rgba(' + cc.r + ', ' + cc.g + ', ' + cc.b + ', ' + alp + ')';
            
            if (this._pointY >= 0 && this._pointY<=this._height) {
                this.moveTo(-this._pointX, 0);
                this.lineTo(-this._pointX+this._width-this._otstup*2, 0);
            }

            if (this._pointX >= 0 && this._pointX<=this._width) {
                this.moveTo(0, -this._pointY);
                this.lineTo(0, -this._pointY+this._height-this._otstup*2);
           }

            this.ctx.stroke();

            for (var i = xx1; i < this._width; i+=sah*this._mashtab) {
                this.ctx.textAlign = "center";
                point.x=i+this._otstup*2;
                point.y=-this.otY-this._pointY+this._otstup;         
                this.setText(point,Math.round(i/this._mashtab*1000)/1000+"")
            }

            for (var i = yy1; i < this._height; i+=sah*this._mashtab) {
                this.ctx.textAlign = "right"; 
                point.x=-this._pointX+this._otstup
                point.y=i-this.fontSize/2;      
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
                point.x+this._pointX+this.otX,
                point.y+fontSize+this._pointY+this.otY
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
                point.x+this._pointX+this.otX, 
                point.y+this._pointY+this.otY, 
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
            this.ctx.moveTo(point.x + this._pointX+this.otX, point.y + this._pointY+this.otY);
            this.ctx.lineTo(point1.x + this._pointX+this.otX, point1.y + this._pointY+this.otY);
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
            this.ctx.rect(point.x + this._pointX+this.otX, point.y + this._pointY+this.otY, point1.x  - point.x , point1.y - point.y );
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
            this.ctx.rect(rect.x + this._pointX+this.otX, rect.y + this._pointY+this.otY, rect.h, rect.w);
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
        //появление panel2 при наведении курсора
        this.mousemove = function (e) {
            self.panel2.visible=true;
            rr=self.panel1.div.getBoundingClientRect();
            self.panel2.width=e.clientX-rr.x;
            self.panel2.height=e.clientY-rr.y;
        }    

        this.mouseover = function (e) {
            dcmParam.addFunMove(self.mousemove);
            self.mousemove(e)

        };
        this.mouseout = function (e) {
            dcmParam.removeFunMove(self.mousemove); 
            self.panel2.visible=false
        };        

        if (dcmParam.mobile == false) {           
            this.panel1.div.addEventListener('mouseover', self.mouseover);
            this.panel1.div.addEventListener('mouseout', self.mouseout);
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

    //изменение ширены 
    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.widthContent = this._width+this.otX+this._otstup;
            this.canvas.width = this.widthContent;
            this.panel1.width = this._width-this._otstup*2;
            this.panel.width = this.widthContent;
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
            this.heightContent = this._height+this.otY-this._otstup;
            this.canvas.height = this.heightContent;
            this.panel1.height = this.height-this._otstup*2;
            this.panel.height = this.heightContent;
            this.clear()
            this.setSetka()
            //this.debag.height = this._height;
        }
    }
    get height() {
        return this._height;
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

}



/*export class Debag {
    constructor(dCont, fun) {

        this.type = 'Debag';
        this.dCont = dCont;
        this.fun = fun;
        var self = this;


        this.kol = 4
        this.time = 1000

        this._width = 200;
        this._height = 200;
        this.otstup = 10;

        this.array = []
        this.arrayT = []

        this.dWindow = new DWindow(dCont, 300, 0, "TestPanel")

        this.buttonTest = new DButton(this.dWindow.content, this.otstup, this.otstup, "TEST", function() {
            self.drahXZ()
        })


        this.panelBase = new DPanel(this.dWindow.content, this.otstup, this.otstup * 2 + this.buttonTest.height)


        this.drag = function() {
            this.dWindow.width = this._width + this.otstup * 2;
            this.dWindow.height = this._height + this.otstup * 3 + this.buttonTest.height + 32;
            this.panelBase.width = this._width;
            this.panelBase.height = this._height;
        }

        this.drag()

        this.drahwwww = function() {
            let res = []
            for (var i = 0; i < self.array.length; i++) {
                res.push({
                    x: self.array[i].x,
                    y: self.array[i].y,
                })
            }
            self.fun("draw", res)
        }


        for (var i = 0; i < this.kol; i++) {
            let buttonTest = new DButton(this.panelBase)
            buttonTest.width = 10;
            buttonTest.height = 10;
            buttonTest.x = Math.random() * (this.panelBase.width - buttonTest.width);
            buttonTest.y = Math.random() * (this.panelBase.height - buttonTest.height);
            this.array.push(buttonTest)

            let t = new TWEEN.Tween(buttonTest)
            this.arrayT.push(t)

            if (i == 0) t.onUpdate(this.drahwwww)
        }




        this.drahXZ = function() {
            for (var i = 0; i < self.array.length; i++) {
                self.arrayT[i].to({ x: Math.random() * (this.panelBase.width - 10), y: Math.random() * (this.panelBase.height - 10) }, this.time).start();
            }
        }
       // this.drahXZ()

    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.drag()
        }
    }
    get width() {
        return this._width;
    }


    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.drag()
        }
    }
    get height() {
        return this._height;
    }


}*/
