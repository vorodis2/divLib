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




export class DRadius extends DCont {
    constructor(dCont, _x, _y) {
        super();
        this.type = 'DRadius';
        if (dcmParam == undefined) dcmParam = new DCM();
        dcmParam.add(this);
        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        var self = this
    

        this.dCont = new DCont(this);


        this._color=dcmParam._color;
        this._alpha=1;

        this._radius=90;
        this._radius1=100;
        this.dCont.div.style.width=this._radius1+"px"
        this.dCont.div.style.height=this._radius1+"px"
        this._angel=0;
        this._angel1=180;  


        //инициация svg
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.svg.append(circle);
        this.svg.style.width = this._radius1+"px";
        this.svg.style.height = this._radius1+"px";
        this.dCont.div.append(this.svg);

        var so=''
        var rr,ww
        var rad,rad1
        var ang,ang1
        var temp
        var xxd
        this.drag=function(){            
            
            //проверка для радиусов
            rad=Math.abs(this._radius/2)
            rad1=Math.abs(this._radius1/2)
            if(rad>rad1){
                xxd=rad1
                rad1=rad
                rad=xxd
            }

            ww=rad1-rad
            rr=rad+ww/2
            
            //проверка для углов
            ang=this._angel
            ang1=this._angel1
            if(ang>ang1){
                xxd=ang1
                ang1=ang
                ang=xxd
            }
            xxd=(ang1-ang)%360
            ang1=ang+Math.abs(xxd)
            //присваивание значиний переменым
            so=describeArc(
                rad1, 
                rad1, 
                rr, ang, ang1)
            
            circle.setAttribute("d",so)
            //параметры объекта
            circle.setAttribute('fill', 'transparent') 
            circle.setAttribute('stroke', this._color)
            circle.setAttribute('stroke-width', ww) 
            circle.setAttribute('stroke-opacity', this._alpha)
        }

        
        var angleInRadians;
        var largeArcFlag,sweepFlag;
        var o1={x:0,y:0}
        //функция отвечающие за расчет отрисовки кривой 
        function polarToCartesian(centerX, centerY, radius, angleInDegrees, oo) {
            angleInRadians = (angleInDegrees) * Math.PI / 180.0;
            oo.x=centerX + (radius * Math.cos(angleInRadians))
            oo.y=centerY + (radius * Math.sin(angleInRadians))               
        }


        var start={x:0,y:0}
        var end={x:0,y:0}
        var sss=''
        //функция отвечающие за расчет отрисовки кривой
        function describeArc(x, y, radius, startAngle, endAngle){
            polarToCartesian(x, y, radius, endAngle, start);
            polarToCartesian(x, y, radius, startAngle,end);
            largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            sss="M "+start.x+" "+start.y;
            //          (rx         ry      angle    large-arc-flag    sweep-flag        x          y)
            sss+=" A "+radius+" "+radius+" "+ 0 +" "+ largeArcFlag+" "+ 0 +" "+ end.x+" "+ end.y
            return sss;  
        }
        this.drag()       
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


    set color(value) {
        if (this._color != value) {
            this._color = value;
            this.drag()
        }
    }
    get color() {
        return this._color;
    }


    set alpha(value) {
        if (this._alpha != value) {
            this._alpha = value;
            this.drag()
        }
    }
    get alpha() {
        return this._alpha;
    }


    set radius(value) {
        if (this._radius != value) {
            this._radius = value;
            let r=Math.abs(this._radius);
            if(r<Math.abs(this._radius1))r=Math.abs(this._radius1)
            this.dCont.div.style.width=r+"px"
            this.dCont.div.style.height=r+"px"
            this.svg.style.width = r+"px";
            this.svg.style.height = r+"px";
            this.drag()
        }
    }
    get radius() {
        return this._radius;
    }

    set radius1(value) {
        if (this._radius1 != value) {
            this._radius1 = value;
            let r=Math.abs(this._radius1);
            if(r<Math.abs(this._radius))r=Math.abs(this._radius)
            this.dCont.div.style.width=r+"px"
            this.dCont.div.style.height=r+"px"
            this.svg.style.width = r+"px";
            this.svg.style.height = r+"px";
            this.drag()
        }
    }
    get radius1() {
        return this._radius1;
    }


    set angel(value) {
        if (this._angel != value) {
            this._angel = value;
            this.drag()
        }
    }
    get angel() {
        return this._angel;
    }


    set angel1(value) {
        if (this._angel1 != value) {
            this._angel1 = value;
            this.drag()
        }
    }
    get angel1() {
        return this._angel1;
    }
}

