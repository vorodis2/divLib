import { MScaneA} from './MScaneA.js';

import { MThree3d} from './MThree3d.js';

export class Menu {
    constructor(par,  fun) {
        var self=this
        this.type="Menu"
        this.par=par
        this.fun=fun;
        this.arrInfo=par.arrInfo
        this.rPar=par.rPar

        this.dCont=new DCont(this.par.dCont);

        this.ols=this.par.ols

        if(this.ols.privazka==undefined)this.ols.privazka=true


        this.menuInfo=new MenuInfo(this,function(s,p,p1){});
        this.mIBlok=new MIBlok(this,function(s,p,p1){
            fun(s,p,p1)
        });
        this.mDrawW=new MDrawW(this,function(s,p,p1){});

        this.mVerh=new MVerh(this,function(s,p,p1){
            fun(s,p,p1)
        });

        this.mVerhStart=new MVerhStart(this,function(s,p,p1){
            fun(s,p,p1)
        });

        this.mScaneA=new MScaneA(this,function(s,p,p1){
            fun(s,p,p1)
        });
       
        if(window.THREE!=undefined){
            this.mThree3d=new MThree3d(this,function(s,p,p1){
               
                if(s=="pic"){
                    self.par.scane.drEvent.plusPic(p)
                }
                //fun(s,p,p1)
            });
        }
        


        this.getObjInf=function(){
            return this.mIBlok.getObjInf()
        }
    }

    set metodType(value) { 
        if(this._metodType!=value){  
            this._metodType=value;
            this.menuInfo.metodType=value;
            this.mIBlok.metodType=value;
            this.mDrawW.metodType=value;          
        }
    }   
    get metodType() { return  this._metodType}

    set aBody(value) { 
        if(this._aBody!=value){  
            this._aBody=value;
            this.mScaneA.galBody.aBody=value;
            this.mIBlok.aBody=value;   
        }
    }   
    get aBody() { return  this._aBody} 
}



//верхния менюшка
export class MVerhStart {
    constructor(par,  fun) {
        var self=this
        this.type="MVerhStart"
        this.par=par
        this.fun=fun;
        this.rPar=par.rPar
        this.array=[]
        this.dCont=new DCont(this.par.dCont);
        this.panel=new DPanel(this.dCont,this.rPar.otstup,this.rPar.otstup)
        this.panel.width=this.rPar.width1
        this.panel.height=this.rPar.swh+ this.rPar.otstup*2
        this.panel.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -50);
        this.input
        this.ols=this.par.ols
        this.button
        this.init=function(){
            let b=new DButton( this.panel,this.rPar.otstup,this.rPar.otstup,"file",function(){
                


                let file=self.par.par.getFile()

                if(self.par.par.funGetFile!=undefined){
                    self.par.par.funGetFile(file)
                    return
                }

                var reader = new FileReader();
                reader.onloadend = function (event) {                            
                    var s = event.target.result;                     
                    var down = document.createElement('a');               
                    down.download = file.name;
                    down.href = s;
                    down.click();                                           
                }                        
                reader.readAsDataURL(file);

            })
            b.height=this.rPar.swh;
            b.width=70
            //b.fontSize=this.rPar.fontSizeLitel
            b.link='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItMTEiIHdpZHRoPSIyMiIgeT0iLTExIiBoZWlnaHQ9IjIyIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTEiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHBvbHlsaW5lIHBvaW50cz0iNTAuMDE1MzUyOTg3MDE2NzIsMTIzLjEzNDA4NDAwNzQxOSA1MC4wMTUzNTI5ODcwMTY2OCwxNDQuOTg0NjQ3MDEyOTgzMzIgMTUxLjk4NDY0NzAxMjk4MzM0LDE0NC45ODQ2NDcwMTI5ODMzMiAxNTEuOTg0NjQ3MDEyOTgzMzQsMTIzLjEzNDA4NDAwNzQxOTEyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGEwYTBhIiBzdHJva2Utd2lkdGg9IjE0LjU2NzA0MjAwMzcwOTU0OSIvPjxwb2x5bGluZSBwb2ludHM9IjEwMSwzNS43MzE4MzE5ODUxNjE4MDQgMTAxLDEwOC41NjcwNDIwMDM3MDk2IDEwMSwxMTUuODUwNTYzMDA1NTY0MzEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwYTBhMGEiIHN0cm9rZS13aWR0aD0iMTQuNTY3MDQyMDAzNzA5NTQ5Ii8+PHBvbHlsaW5lIHBvaW50cz0iMTIyLjg1MDU2MzAwNTU2NDMxLDk0IDEwMSwxMTUuODUwNTYzMDA1NTY0MzEgNzkuMTQ5NDM2OTk0NDM1NjksOTQiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwYTBhMGEiIHN0cm9rZS13aWR0aD0iMTQuNTY3MDQyMDAzNzA5NTQ5Ii8+PC9nPjwvZz48cG9seWxpbmUgcG9pbnRzPSI1MC4wMTUzNTI5ODcwMTY3MiwxMjMuMTM0MDg0MDA3NDE5IDUwLjAxNTM1Mjk4NzAxNjY4LDE0NC45ODQ2NDcwMTI5ODMzMiAxNTEuOTg0NjQ3MDEyOTgzMzQsMTQ0Ljk4NDY0NzAxMjk4MzMyIDE1MS45ODQ2NDcwMTI5ODMzNCwxMjMuMTM0MDg0MDA3NDE5MTIiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTQuNTY3MDQyMDAzNzA5NTQ5Ii8+PHBvbHlsaW5lIHBvaW50cz0iMTAxLDM1LjczMTgzMTk4NTE2MTgwNCAxMDEsMTA4LjU2NzA0MjAwMzcwOTYgMTAxLDExNS44NTA1NjMwMDU1NjQzMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNC41NjcwNDIwMDM3MDk1NDkiLz48cG9seWxpbmUgcG9pbnRzPSIxMjIuODUwNTYzMDA1NTY0MzEsOTQgMTAxLDExNS44NTA1NjMwMDU1NjQzMSA3OS4xNDk0MzY5OTQ0MzU2OSw5NCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNC41NjcwNDIwMDM3MDk1NDkiLz48L3N2Zz4='    
            this.button=b
            this.input=new DInput(this.panel,b.x+b.width+this.rPar.otstup,this.rPar.otstup,"null",function(){
                self.setLink=self.input.text;
                b1.alpha=1
            })
            this.input.height=this.rPar.swh
            this.input.fontSize=this.rPar.fontSizeLitel
            this.input.width=this.rPar.width1-this.input.x-this.rPar.otstup*2-this.rPar.swh/2;


            this.setLink="null"    
            var b1=new DButton( this.panel,0,this.rPar.otstup,"*",function(){
                if(self.setLink=="null" )return
                self.par.par.setLink(self.setLink)    
            })
            b1.fontSize=10
            b1.height=this.rPar.swh/2
            b1.width=this.rPar.swh/2
            b1.x=this.rPar.width1-this.rPar.swh/2-this.rPar.otstup
            b1.alpha=0.15

            var b2=new DButton( this.panel,0,this.rPar.otstup+this.rPar.swh/2,"s",function(){
                self.setLink=self.input.text;
                b1.alpha=1
            })
            b2.fontSize=10
            b2.height=this.rPar.swh/2
            b2.width=this.rPar.swh/2
            b2.x=this.rPar.width1-this.rPar.swh/2-this.rPar.otstup
           // b2.alpha=0.15


        }
        this.init();
    }
}



//верхния менюшка
export class MVerh {
    constructor(par,  fun) {
        var self=this
        this.type="MVerh"
        this.par=par
        this.fun=fun;
        this.rPar=par.rPar
        this.array=[]
        this.dCont=new DCont(this.par.dCont);
        this.panel=new DPanel(this.dCont,this.rPar.otstup,this.rPar.otstup)
        this.panel.width=this.rPar.width1
        this.panel.height=this.rPar.swh+ this.rPar.otstup*2
        this.dCont.x=this.rPar.width1+this.rPar.otstup;

        this.ols=this.par.ols



        this.init=function(){
            var b=this.plus()//Privazka
            b.link=this.rPar.linkXZ;
            b.alpha=self.ols.privazka ? 1 : 0.5
            b.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color), 20)

            b.link='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGxpbmUgeDE9IjEwMCIgeTE9IjIwIiB4Mj0iMTAwIiB5Mj0iMTgwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNi44ODI1NjM2NDkyMDYyMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSIxODAiIHkxPSIxMDAiIHgyPSIyMCIgeTI9IjEwMCIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjYuODgyNTYzNjQ5MjA2MjEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNiIgcnk9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI2Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIyMi4zNjA2Nzk3NzQ5OTc4OTgiIGZpbGw9IiMzMDMwMzAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI2Ljg4MjU2MzY0OTIwNjIxMiIvPjwvZz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNi44ODI1NjM2NDkyMDYyMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSIxMDAiIHkxPSIyMCIgeDI9IjEwMCIgeTI9IjE4MCIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjYuODgyNTYzNjQ5MjA2MjEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iMTgwIiB5MT0iMTAwIiB4Mj0iMjAiIHkyPSIxMDAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI2Ljg4MjU2MzY0OTIwNjIxMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjYiIHJ5PSI2IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjIuMzYwNjc5Nzc0OTk3ODk4IiBmaWxsPSIjMzAzMDMwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNi44ODI1NjM2NDkyMDYyMTIiLz48L2c+PC9nPjxsaW5lIHgxPSIxMDAiIHkxPSIyMCIgeDI9IjEwMCIgeTI9IjE4MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYuODgyNTYzNjQ5MjA2MjEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iMTgwIiB5MT0iMTAwIiB4Mj0iMjAiIHkyPSIxMDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2Ljg4MjU2MzY0OTIwNjIxMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjYiIHJ5PSI2IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjIuMzYwNjc5Nzc0OTk3ODk4IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNi44ODI1NjM2NDkyMDYyMTIiLz48L3N2Zz4='

            var b=this.plus()//bPoint
            b.link=this.rPar.linkXZ;
            b.alpha=self.ols.bPoint ? 1 : 0.5

            b.link='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGxpbmUgeDE9IjEzOS4yOTY1NzU5MDc0MDU4NCIgeTE9IjU3LjcwMzQyNDA5MjU5NDE5IiB4Mj0iNDUuMTkxOTk5ODg2NTM3OTE0IiB5Mj0iMTY1LjYxNjAwMDIyNjkyMzkyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMi45NDE4Nzg4MzA2ODczOSIvPjxjaXJjbGUgY3g9IjE1MC43Njc1MTUzMjI3NDk3MiIgY3k9IjQ2LjIzMjQ4NDY3NzI1MDM3IiByPSIxNi4yMjIzNTgwOTQzMzkzNzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxOS41MDA1OTcwMDYwODQyOSIvPjxjaXJjbGUgY3g9IjE1MC43Njc1MTUzMjI3NDk3MiIgY3k9IjQ2LjIzMjQ4NDY3NzI1MDM3IiByPSIxNi4yMjIzNTgwOTQzMzkzNzMiIGZpbGw9IiMzMDMwMzAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI2Ljg4MjU2MzY0OTIwNjIxMiIvPjwvZz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGxpbmUgeDE9IjEzOS4yOTY1NzU5MDc0MDU4NCIgeTE9IjU3LjcwMzQyNDA5MjU5NDE5IiB4Mj0iNDUuMTkxOTk5ODg2NTM3OTE0IiB5Mj0iMTY1LjYxNjAwMDIyNjkyMzkyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMi45NDE4Nzg4MzA2ODczOSIvPjxjaXJjbGUgY3g9IjE1MC43Njc1MTUzMjI3NDk3MiIgY3k9IjQ2LjIzMjQ4NDY3NzI1MDM3IiByPSIxNi4yMjIzNTgwOTQzMzkzNzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxOS41MDA1OTcwMDYwODQyOSIvPjxjaXJjbGUgY3g9IjE1MC43Njc1MTUzMjI3NDk3MiIgY3k9IjQ2LjIzMjQ4NDY3NzI1MDM3IiByPSIxNi4yMjIzNTgwOTQzMzkzNzMiIGZpbGw9IiMzMDMwMzAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI2Ljg4MjU2MzY0OTIwNjIxMiIvPjwvZz48L2c+PGxpbmUgeDE9IjEzOS4yOTY1NzU5MDc0MDU4NCIgeTE9IjU3LjcwMzQyNDA5MjU5NDE5IiB4Mj0iNDUuMTkxOTk5ODg2NTM3OTE0IiB5Mj0iMTY1LjYxNjAwMDIyNjkyMzkyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMi45NDE4Nzg4MzA2ODczOSIvPjxjaXJjbGUgY3g9IjE1MC43Njc1MTUzMjI3NDk3MiIgY3k9IjQ2LjIzMjQ4NDY3NzI1MDM3IiByPSIxNi4yMjIzNTgwOTQzMzkzNzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxOS41MDA1OTcwMDYwODQyOSIvPjxjaXJjbGUgY3g9IjE1MC43Njc1MTUzMjI3NDk3MiIgY3k9IjQ2LjIzMjQ4NDY3NzI1MDM3IiByPSIxNi4yMjIzNTgwOTQzMzkzNzMiIGZpbGw9IiMwMDU3YmEiIHN0cm9rZT0iIzJhMjFiMCIgc3Ryb2tlLXdpZHRoPSI2Ljg4MjU2MzY0OTIwNjIxMiIvPjwvc3ZnPg=='

            b.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color), 20)

            var b=this.plus()//clear
            b.link="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHBhdGggZD0iTSA1MC4wMTE2MDUxNjYxNDE1NjQgNTIuMDExNjA1MTY2MTQxNTZDIDEwNCAxMDYsIDE1Ny45ODgzOTQ4MzM4NTg0OCA1Mi4wMTE2MDUxNjYxNDE1NiwgMTU3Ljk4ODM5NDgzMzg1ODQ4IDUyLjAxMTYwNTE2NjE0MTU2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4yOTY3MTE4Njk1OTMyMjQiLz48cGF0aCBkPSJNIDUwLjAxMTYwNTE2NjE0MTU2NCA1Mi4wMTE2MDUxNjYxNDE1NkMgMTA0IDcuMDIxMjc2MTM3OTI2MjM2LCAxNTcuOTg4Mzk0ODMzODU4NDggNTIuMDExNjA1MTY2MTQxNTYsIDE1Ny45ODgzOTQ4MzM4NTg0OCA1Mi4wMTE2MDUxNjYxNDE1NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMjk2NzExODY5NTkzMjI0Ii8+PGxpbmUgeDE9IjY4LjAwNzczNjc3NzQyNzY4IiB5MT0iMTU5Ljk4ODM5NDgzMzg1ODQ4IiB4Mj0iNTAuMDExNjA1MTY2MTQxNTY0IiB5Mj0iNTIuMDExNjA1MTY2MTQxNTYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE1LjI5NjcxMTg2OTU5MzIyNCIvPjxsaW5lIHgxPSIxMzAuOTk0MTk3NDE2OTI5NCIgeTE9IjE1OS45ODgzOTQ4MzM4NTg0NSIgeDI9IjE1Ny45ODgzOTQ4MzM4NTg0OCIgeTI9IjUyLjAxMTYwNTE2NjE0MTU2IiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMjk2NzExODY5NTkzMjI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNIDY4LjAwNzczNjc3NzQyNzY4IDE1OS45ODgzOTQ4MzM4NTg0OEMgOTUuMDAxOTM0MTk0MzU2NCAxODYuOTgyNTkyMjUwNzg3NiwgMTMwLjk5NDE5NzQxNjkyOTQgMTU5Ljk4ODM5NDgzMzg1ODQ1LCAxMzAuOTk0MTk3NDE2OTI5NCAxNTkuOTg4Mzk0ODMzODU4NDUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE1LjI5NjcxMTg2OTU5MzIyNCIvPjwvZz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4yOTY3MTE4Njk1OTMyMjQiLz48cGF0aCBkPSJNIDUwLjAxMTYwNTE2NjE0MTU2NCA1Mi4wMTE2MDUxNjYxNDE1NkMgMTA0IDEwNiwgMTU3Ljk4ODM5NDgzMzg1ODQ4IDUyLjAxMTYwNTE2NjE0MTU2LCAxNTcuOTg4Mzk0ODMzODU4NDggNTIuMDExNjA1MTY2MTQxNTYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE1LjI5NjcxMTg2OTU5MzIyNCIvPjxwYXRoIGQ9Ik0gNTAuMDExNjA1MTY2MTQxNTY0IDUyLjAxMTYwNTE2NjE0MTU2QyAxMDQgNy4wMjEyNzYxMzc5MjYyMzYsIDE1Ny45ODgzOTQ4MzM4NTg0OCA1Mi4wMTE2MDUxNjYxNDE1NiwgMTU3Ljk4ODM5NDgzMzg1ODQ4IDUyLjAxMTYwNTE2NjE0MTU2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4yOTY3MTE4Njk1OTMyMjQiLz48bGluZSB4MT0iNjguMDA3NzM2Nzc3NDI3NjgiIHkxPSIxNTkuOTg4Mzk0ODMzODU4NDgiIHgyPSI1MC4wMTE2MDUxNjYxNDE1NjQiIHkyPSI1Mi4wMTE2MDUxNjYxNDE1NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMjk2NzExODY5NTkzMjI0Ii8+PGxpbmUgeDE9IjEzMC45OTQxOTc0MTY5Mjk0IiB5MT0iMTU5Ljk4ODM5NDgzMzg1ODQ1IiB4Mj0iMTU3Ljk4ODM5NDgzMzg1ODQ4IiB5Mj0iNTIuMDExNjA1MTY2MTQxNTYiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4yOTY3MTE4Njk1OTMyMjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0gNjguMDA3NzM2Nzc3NDI3NjggMTU5Ljk4ODM5NDgzMzg1ODQ4QyA5NS4wMDE5MzQxOTQzNTY0IDE4Ni45ODI1OTIyNTA3ODc2LCAxMzAuOTk0MTk3NDE2OTI5NCAxNTkuOTg4Mzk0ODMzODU4NDUsIDEzMC45OTQxOTc0MTY5Mjk0IDE1OS45ODgzOTQ4MzM4NTg0NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMjk2NzExODY5NTkzMjI0Ii8+PC9nPjwvZz48cGF0aCBkPSJNIDUwLjAxMTYwNTE2NjE0MTU2NCA1Mi4wMTE2MDUxNjYxNDE1NkMgMTA0IDEwNiwgMTU3Ljk4ODM5NDgzMzg1ODQ4IDUyLjAxMTYwNTE2NjE0MTU2LCAxNTcuOTg4Mzk0ODMzODU4NDggNTIuMDExNjA1MTY2MTQxNTYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjE1LjI5NjcxMTg2OTU5MzIyNCIvPjxwYXRoIGQ9Ik0gNTAuMDExNjA1MTY2MTQxNTY0IDUyLjAxMTYwNTE2NjE0MTU2QyAxMDQgNy4wMjEyNzYxMzc5MjYyMzYsIDE1Ny45ODgzOTQ4MzM4NTg0OCA1Mi4wMTE2MDUxNjYxNDE1NiwgMTU3Ljk4ODM5NDgzMzg1ODQ4IDUyLjAxMTYwNTE2NjE0MTU2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNS4yOTY3MTE4Njk1OTMyMjQiLz48bGluZSB4MT0iNjguMDA3NzM2Nzc3NDI3NjgiIHkxPSIxNTkuOTg4Mzk0ODMzODU4NDgiIHgyPSI1MC4wMTE2MDUxNjYxNDE1NjQiIHkyPSI1Mi4wMTE2MDUxNjYxNDE1NiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjE1LjI5NjcxMTg2OTU5MzIyNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjEzMC45OTQxOTc0MTY5Mjk0IiB5MT0iMTU5Ljk4ODM5NDgzMzg1ODQ1IiB4Mj0iMTU3Ljk4ODM5NDgzMzg1ODQ4IiB5Mj0iNTIuMDExNjA1MTY2MTQxNTYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNS4yOTY3MTE4Njk1OTMyMjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gNjguMDA3NzM2Nzc3NDI3NjggMTU5Ljk4ODM5NDgzMzg1ODQ4QyA5NS4wMDE5MzQxOTQzNTY0IDE4Ni45ODI1OTIyNTA3ODc2LCAxMzAuOTk0MTk3NDE2OTI5NCAxNTkuOTg4Mzk0ODMzODU4NDUsIDEzMC45OTQxOTc0MTY5Mjk0IDE1OS45ODgzOTQ4MzM4NTg0NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTUuMjk2NzExODY5NTkzMjI0Ii8+PC9zdmc+";

            var b=this.plus()//drag            
            b.link='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHBvbHlsaW5lIHBvaW50cz0iMTAwLDU0LjA3MTAzNzc5NTQ2MDg2IDEwMCwxNDUuOTI4OTYyMjA0NTM5MDMiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSIjMzAzMDMwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMzA5NjU0MDY4MTc5NzI3Ii8+PHBvbHlsaW5lIHBvaW50cz0iNTQuMDcxMDM3Nzk1NDYwODYsMTAwIDE0NS45Mjg5NjIyMDQ1MzkwMywxMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSIjMzAzMDMwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMzA5NjU0MDY4MTc5NzI3Ii8+PHBvbHlsaW5lIHBvaW50cz0iNjEuNzI1ODY0ODI5NTUwNjksODQuNjkwMzQ1OTMxODIwMjcgMzguNzYxMzgzNzI3MjgxMDksMTAwLjAwMDAwMDAwMDAwMDAxIDYxLjcyNTg2NDgyOTU1MDY5LDExNS4zMDk2NTQwNjgxNzk3MyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4zMDk2NTQwNjgxNzk3MjciLz48cG9seWxpbmUgcG9pbnRzPSIxMzguMjc0MTM1MTcwNDQ5MzQsODQuNjkwMzQ1OTMxODIwMjUgMTYxLjIzODYxNjI3MjcxOSwxMDAgMTM4LjI3NDEzNTE3MDQ0OTM0LDExNS4zMDk2NTQwNjgxNzk3NSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4zMDk2NTQwNjgxNzk3MjciLz48cG9seWxpbmUgcG9pbnRzPSI4NC42OTAzNDU5MzE4MTk5LDEzOC4yNzQxMzUxNzA0NDkwNiAxMDAsMTYxLjIzODYxNjI3MjcxOSAxMTUuMzA5NjU0MDY4MTc5NjcsMTM4LjI3NDEzNTE3MDQ0OTI4IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE1LjMwOTY1NDA2ODE3OTcyNyIvPjxwb2x5bGluZSBwb2ludHM9IjExNS4zMDk2NTQwNjgxNzk2NSw2MS43MjU4NjQ4Mjk1NTA4MyAxMDAsMzguNzYxMzgzNzI3MjgxMDkgODQuNjkwMzQ1OTMxODE5OTYsNjEuNzI1ODY0ODI5NTUwODkiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMzA5NjU0MDY4MTc5NzI3Ii8+PC9nPjxnIGZpbHRlcj0idXJsKCNmMikiPjxsaW5lIHgxPSItNTAiIHkxPSItNTAiIHgyPSItNTAiIHkyPSItNTAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cG9seWxpbmUgcG9pbnRzPSIxMDAsNTQuMDcxMDM3Nzk1NDYwODYgMTAwLDE0NS45Mjg5NjIyMDQ1MzkwMyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9IiMzMDMwMzAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4zMDk2NTQwNjgxNzk3MjciLz48cG9seWxpbmUgcG9pbnRzPSI1NC4wNzEwMzc3OTU0NjA4NiwxMDAgMTQ1LjkyODk2MjIwNDUzOTAzLDEwMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9IiMzMDMwMzAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4zMDk2NTQwNjgxNzk3MjciLz48cG9seWxpbmUgcG9pbnRzPSI2MS43MjU4NjQ4Mjk1NTA2OSw4NC42OTAzNDU5MzE4MjAyNyAzOC43NjEzODM3MjcyODEwOSwxMDAuMDAwMDAwMDAwMDAwMDEgNjEuNzI1ODY0ODI5NTUwNjksMTE1LjMwOTY1NDA2ODE3OTczIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE1LjMwOTY1NDA2ODE3OTcyNyIvPjxwb2x5bGluZSBwb2ludHM9IjEzOC4yNzQxMzUxNzA0NDkzNCw4NC42OTAzNDU5MzE4MjAyNSAxNjEuMjM4NjE2MjcyNzE5LDEwMCAxMzguMjc0MTM1MTcwNDQ5MzQsMTE1LjMwOTY1NDA2ODE3OTc1IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE1LjMwOTY1NDA2ODE3OTcyNyIvPjxwb2x5bGluZSBwb2ludHM9Ijg0LjY5MDM0NTkzMTgxOTksMTM4LjI3NDEzNTE3MDQ0OTA2IDEwMCwxNjEuMjM4NjE2MjcyNzE5IDExNS4zMDk2NTQwNjgxNzk2NywxMzguMjc0MTM1MTcwNDQ5MjgiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUuMzA5NjU0MDY4MTc5NzI3Ii8+PHBvbHlsaW5lIHBvaW50cz0iMTE1LjMwOTY1NDA2ODE3OTY1LDYxLjcyNTg2NDgyOTU1MDgzIDEwMCwzOC43NjEzODM3MjcyODEwOSA4NC42OTAzNDU5MzE4MTk5Niw2MS43MjU4NjQ4Mjk1NTA4OSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNS4zMDk2NTQwNjgxNzk3MjciLz48L2c+PC9nPjxwb2x5bGluZSBwb2ludHM9IjEwMCw1NC4wNzEwMzc3OTU0NjA4NiAxMDAsMTQ1LjkyODk2MjIwNDUzOTAzIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0iI2Q3ZDdkNyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjE1LjMwOTY1NDA2ODE3OTcyNyIvPjxwb2x5bGluZSBwb2ludHM9IjU0LjA3MTAzNzc5NTQ2MDg2LDEwMCAxNDUuOTI4OTYyMjA0NTM5MDMsMTAwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0iI2Q3ZDdkNyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjE1LjMwOTY1NDA2ODE3OTcyNyIvPjxwb2x5bGluZSBwb2ludHM9IjYxLjcyNTg2NDgyOTU1MDY5LDg0LjY5MDM0NTkzMTgyMDI3IDM4Ljc2MTM4MzcyNzI4MTA5LDEwMC4wMDAwMDAwMDAwMDAwMSA2MS43MjU4NjQ4Mjk1NTA2OSwxMTUuMzA5NjU0MDY4MTc5NzMiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTUuMzA5NjU0MDY4MTc5NzI3Ii8+PHBvbHlsaW5lIHBvaW50cz0iMTM4LjI3NDEzNTE3MDQ0OTM0LDg0LjY5MDM0NTkzMTgyMDI1IDE2MS4yMzg2MTYyNzI3MTksMTAwIDEzOC4yNzQxMzUxNzA0NDkzNCwxMTUuMzA5NjU0MDY4MTc5NzUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTUuMzA5NjU0MDY4MTc5NzI3Ii8+PHBvbHlsaW5lIHBvaW50cz0iODQuNjkwMzQ1OTMxODE5OSwxMzguMjc0MTM1MTcwNDQ5MDYgMTAwLDE2MS4yMzg2MTYyNzI3MTkgMTE1LjMwOTY1NDA2ODE3OTY3LDEzOC4yNzQxMzUxNzA0NDkyOCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNS4zMDk2NTQwNjgxNzk3MjciLz48cG9seWxpbmUgcG9pbnRzPSIxMTUuMzA5NjU0MDY4MTc5NjUsNjEuNzI1ODY0ODI5NTUwODMgMTAwLDM4Ljc2MTM4MzcyNzI4MTA5IDg0LjY5MDM0NTkzMTgxOTk2LDYxLjcyNTg2NDgyOTU1MDg5IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjE1LjMwOTY1NDA2ODE3OTcyNyIvPjwvc3ZnPg=='

            var b=this.plus()//rotat
            b.link="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHBhdGggZD0iTSA3Mi42NzM5MjY2MTEwNTg4MiAxMzQuMzk4NTA5MDExMDk5OEMgLTMwLjAxMjEzNjk1MzgyMjY0NyAxNi4yNjQ4MDM2MTk1MDA2MjYsIDEzMy4xNDI2ODMzMDk0NjQ1MyA0MC4zNTg0NjcyMDI1NzU0OCwgMTMzLjE0MjY4MzMwOTQ2NDUzIDQwLjM1ODQ2NzIwMjU3NTQ4IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBhdGggZD0iTSAxNTEuMDMxNzI4ODUyMTQ2NTkgMTAxLjg0MDAyNTgxNjI5MjEzQyAxNDYuMDIxMTE0ODcxNjg4MjcgMjE4Ljc3OTcyNzE0Nzk1NjQsIDcyLjY3MzkyNjYxMTA1ODgyIDEzNC4zOTg1MDkwMTEwOTk4LCA3Mi42NzM5MjY2MTEwNTg4MiAxMzQuMzk4NTA5MDExMDk5OCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjEzNC4xNTU0ODUyMjQ3NzQ5NiwxMTYuNTA5NDYzNDY4NDE4MTggMTQ1LjYwNTMxNDk4NjM0NTA2LDg4Ljc4MDM5MjEwOTQ0NDIgMTY5LjUxNzc3NjQyNDc5NTU2LDEwOS40NzMyNDU2NTczMzg5NiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIvPjwvZz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBhdGggZD0iTSA3Mi42NzM5MjY2MTEwNTg4MiAxMzQuMzk4NTA5MDExMDk5OEMgLTMwLjAxMjEzNjk1MzgyMjY0NyAxNi4yNjQ4MDM2MTk1MDA2MjYsIDEzMy4xNDI2ODMzMDk0NjQ1MyA0MC4zNTg0NjcyMDI1NzU0OCwgMTMzLjE0MjY4MzMwOTQ2NDUzIDQwLjM1ODQ2NzIwMjU3NTQ4IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBhdGggZD0iTSAxNTEuMDMxNzI4ODUyMTQ2NTkgMTAxLjg0MDAyNTgxNjI5MjEzQyAxNDYuMDIxMTE0ODcxNjg4MjcgMjE4Ljc3OTcyNzE0Nzk1NjQsIDcyLjY3MzkyNjYxMTA1ODgyIDEzNC4zOTg1MDkwMTEwOTk4LCA3Mi42NzM5MjY2MTEwNTg4MiAxMzQuMzk4NTA5MDExMDk5OCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjEzNC4xNTU0ODUyMjQ3NzQ5NiwxMTYuNTA5NDYzNDY4NDE4MTggMTQ1LjYwNTMxNDk4NjM0NTA2LDg4Ljc4MDM5MjEwOTQ0NDIgMTY5LjUxNzc3NjQyNDc5NTU2LDEwOS40NzMyNDU2NTczMzg5NiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIvPjwvZz48L2c+PHBhdGggZD0iTSA3Mi42NzM5MjY2MTEwNTg4MiAxMzQuMzk4NTA5MDExMDk5OEMgLTMwLjAxMjEzNjk1MzgyMjY0NyAxNi4yNjQ4MDM2MTk1MDA2MjYsIDEzMy4xNDI2ODMzMDk0NjQ1MyA0MC4zNTg0NjcyMDI1NzU0OCwgMTMzLjE0MjY4MzMwOTQ2NDUzIDQwLjM1ODQ2NzIwMjU3NTQ4IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBhdGggZD0iTSAxNTEuMDMxNzI4ODUyMTQ2NTkgMTAxLjg0MDAyNTgxNjI5MjEzQyAxNDYuMDIxMTE0ODcxNjg4MjcgMjE4Ljc3OTcyNzE0Nzk1NjQsIDcyLjY3MzkyNjYxMTA1ODgyIDEzNC4zOTg1MDkwMTEwOTk4LCA3Mi42NzM5MjY2MTEwNTg4MiAxMzQuMzk4NTA5MDExMDk5OCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjEzNC4xNTU0ODUyMjQ3NzQ5NiwxMTYuNTA5NDYzNDY4NDE4MTggMTQ1LjYwNTMxNDk4NjM0NTA2LDg4Ljc4MDM5MjEwOTQ0NDIgMTY5LjUxNzc3NjQyNDc5NTU2LDEwOS40NzMyNDU2NTczMzg5NiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIvPjwvc3ZnPg==";

            var b=this.plus()//scale
            b.link="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHJlY3QgeD0iNDEuMzIzNjA2ODExMTc4MjQiIHk9IjkzIiB3aWR0aD0iNjQuNjc2MzkzMTg4ODIxNzYiIGhlaWdodD0iNjQuNjc2MzkzMTg4ODIxNzUiIHJ4PSIwIiByeT0iMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE2LjE2OTA5ODI5NzIwNTQ3Ii8+PHJlY3QgeD0iNDEuMzIzNjA2ODExMTc4MjQiIHk9IjI4LjMyMzYwNjgxMTE3Nzg5NiIgd2lkdGg9IjEyOS4zNTI3ODYzNzc2NDM5IiBoZWlnaHQ9IjEyOS4zNTI3ODYzNzc2NDM4NCIgcng9IjAiIHJ5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iOC4wODQ1NDkxNDg2MDI3MzUiLz48L2c+PGcgZmlsdGVyPSJ1cmwoI2YyKSI+PGxpbmUgeDE9Ii01MCIgeTE9Ii01MCIgeDI9Ii01MCIgeTI9Ii01MCIvPjxyZWN0IHg9IjQxLjMyMzYwNjgxMTE3ODI0IiB5PSI5MyIgd2lkdGg9IjY0LjY3NjM5MzE4ODgyMTc2IiBoZWlnaHQ9IjY0LjY3NjM5MzE4ODgyMTc1IiByeD0iMCIgcnk9IjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxNi4xNjkwOTgyOTcyMDU0NyIvPjxyZWN0IHg9IjQxLjMyMzYwNjgxMTE3ODI0IiB5PSIyOC4zMjM2MDY4MTExNzc4OTYiIHdpZHRoPSIxMjkuMzUyNzg2Mzc3NjQzOSIgaGVpZ2h0PSIxMjkuMzUyNzg2Mzc3NjQzODQiIHJ4PSIwIiByeT0iMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjguMDg0NTQ5MTQ4NjAyNzM1Ii8+PC9nPjwvZz48cmVjdCB4PSI0MS4zMjM2MDY4MTExNzgyNCIgeT0iOTMiIHdpZHRoPSI2NC42NzYzOTMxODg4MjE3NiIgaGVpZ2h0PSI2NC42NzYzOTMxODg4MjE3NSIgcng9IjAiIHJ5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTYuMTY5MDk4Mjk3MjA1NDciLz48cmVjdCB4PSI0MS4zMjM2MDY4MTExNzgyNCIgeT0iMjguMzIzNjA2ODExMTc3ODk2IiB3aWR0aD0iMTI5LjM1Mjc4NjM3NzY0MzkiIGhlaWdodD0iMTI5LjM1Mjc4NjM3NzY0Mzg0IiByeD0iMCIgcnk9IjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI4LjA4NDU0OTE0ODYwMjczNSIvPjwvc3ZnPg==";
            
        }
        

        this.sob=function(){
            if(this.idArr==0){//privazka
                self.ols.privazka=!self.ols.privazka
                this.alpha=self.ols.privazka ? 1 : 0.5
                self.par.mDrawW.dCont2.visible=self.ols.privazka
                self.par.par.saveLoc()
            }
            if(this.idArr==1){//bPoint
                self.ols.bPoint=!self.ols.bPoint
                this.alpha=self.ols.bPoint ? 1 : 0.5 
                self.par.par.scane.drEvent.drButton.active=self.ols.bPoint             
                self.par.par.saveLoc();
            }

            if(this.idArr==2){//clear
                self.par.par.scane.wScane.clear()
                self.par.par._aBody=1;
                self.par.par.aBody=null;
                //self.par.par.scane.drScane.draw();
                self.par.mScaneA.galBody.drag(self.par.par.scane.wScane.array);
                self.par.par.scane.wScane.dragBig();

            }

            if(this.idArr==3 || this.idArr==4|| this.idArr==5){//clear
                self.par.par.scane.drEvent.drMenu.start(this.idArr-3)

            }

        }


        this.start=function(){

        }







        this.plus=function(){
            let b=new DButton(
                this.panel,
                Math.round(this.rPar.otstup+this.array.length*(this.rPar.swh+ this.rPar.otstup)),
                Math.round(this.rPar.otstup),
                ""
            )
            b.fun_mousedown=this.sob
            b.idArr=this.array.length;
            this.array.push(b)
            b.width=b.height=this.rPar.swh
            return b
        }

        this.init()
    }
}


//верхния менюшка
export class MenuInfo {
    constructor(par,  fun) {
        var self=this
        this.type="MenuInfo"
        this.par=par
        this.fun=fun;
        this.rPar=par.rPar

        this.dCont=new DCont(this.par.dCont);
        this.panel=new DPanel(this.dCont,this.rPar.otstup,this.rPar.otstup*4+this.rPar.swh)
        this.panel.width=this.rPar.width1
        this.panel.height=this.rPar.swh+ this.rPar.otstup*2

        this.panelActive=new DPanel(this.panel,0,0);
        this.panelActive.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -80)
        this.panelActive.width=this.panel.height;
        this.panelActive.height=this.panel.height;

        this.buttons=new DButtons(this.panel, this.rPar.otstup,this.rPar.otstup,this.par.arrInfo.length,function(){
            self.par.par.metodType=self.par.arrInfo[this.index].type;
            self.par.par.ls.object.metodType=self.par.par.metodType;
            self.par.par.saveLoc();
        })
        this.buttons.otstup=this.rPar.otstup
        this.buttons.tip=0;
        this.buttons.wh=this.rPar.swh
        for (var i = 0; i < this.par.arrInfo.length; i++) {
            this.buttons.array[i].link=this.par.arrInfo[i].icon
        }


        this.dragIndex=function(){
            //let p=this.buttons.index;
            //if(p==0)p=1;
            let  p=this.par.par.oldM
            this.panelActive.x=p*(this.rPar.swh+this.rPar.otstup);
        }
    }

    set metodType(value) { 
        if(this._metodType!=value){  
            this._metodType=value;
            let p=-1
            for (var i = 0; i < this.par.arrInfo.length; i++) {                
                if(this.par.arrInfo[i].type==value){
                    p=i;
                    break
                }
            }            
            this.buttons.index = p 
            this.dragIndex()        
        }
    }   
    get metodType() { return  this._metodType}


}




export class MIBlok {
    constructor(par,  fun) {
        var self=this
        this.type="MIBlok"
        this.par=par
        this.fun=fun;
        this.dCont=new DCont(this.par.dCont);
        
        //this.dCont,this.rPar.otstup*5+this.rPar.swh


        this.rPar=par.rPar



        this.otstup=this.rPar.otstup;
        this.width1=this.rPar.width1;
        this.swh=this.rPar.swh;
        this.fontSizeLitel=this.rPar.fontSizeLitel
        
        this.dCont.y=this.rPar.swh+this.rPar.otstup*3


        this.array=[];

        this.array[0]=this.mibBase=new MibBase(this, function(s,p,p1){
            fun("dragScane")
            
        });

        this.array[1]=this.mibLinsAnd=new MibLinsAnd(this, function(s,p,p1){
            if(s=="dragScane")fun("dragScane")
            
        });


        this.getObjInf=function(){
            return this.mibLinsAnd.getObjInf()            
        }

    }


    set metodType(value) { 
        if(this._metodType!=value){  
            this._metodType=value;
            let p=1
            if(this._metodType=="Base")p=0
            for (var i = 0; i < this.array.length; i++) {
                if(p==i){
                    this.array[i].dCont.visible=true;                    
                }else{
                    this.array[i].dCont.visible=false;
                }
            }                     
        }
    }   
    get metodType() { return  this._metodType}

    set aBody(value) { 
        if(this._aBody!=value){  
            this._aBody=value;
            this.mibLinsAnd.setBody(value) 
        }
    }   
    get aBody() { return  this._aBody} 

}

export class MibLinsAnd {
    constructor(par,  fun) {
        var self=this
        this.type="MibLinsAnd"
        this.par=par
        this.fun=fun;
        this.dCont=new DCont(this.par.dCont);

        this.rPar=par.rPar

        this.otstup=this.par.otstup;
        this.width1=this.par.width1;
        this.fontSizeLitel=this.par.fontSizeLitel;
        this.swh=this.par.swh;

        
        this.objStart={           
            lineSah:20,
            lColor:"#ffffff",
            blColor:true,
            fcolor:"#ffffff",
            bfColor:true,
            bBlur:true,
            bRound:true,

            bmBColor:false,
            bmColor:"#ff0000",

            bmBNax:false,
            naxV:"#ff0000",

        } 
        this.obj=JSON.parse(JSON.stringify(this.objStart))

        if(this.par.par.ols.lineAnd==undefined){
            this.par.par.ols.lineAnd=this.obj
        } else{
            this.obj= this.par.par.ols.lineAnd
        } 



        this.panel=new DPanel(this.dCont,this.otstup,this.otstup*4+this.swh)
        this.panel.width=this.width1;

        this.arrBName=[32, 64, 128, 256, 512];

        let yy=this.otstup;

        var l=new DLabel(this.panel,this.otstup,yy,"Свойства линии")
        l.activMouse=false;
        l.fontSize=this.fontSizeLitel
        l.width=this.width1;

        yy+=this.fontSizeLitel+this.otstup

        this.chek=new DCheckBox(this.panel, this.par.otstup,yy,"line",function(){
            self.obj.blColor=this.value;
            self.dColor.activMouse=self.obj.blColor
            self.slider.activMouse=self.obj.blColor; 
            self.drag();
            
        })
        this.chek.value=self.obj.blColor

        this.dColor=new DColor(this.panel, 60,yy,"#000000",function(){
            self.obj.lColor=this.value;
            self.drag()
            
        })
        this.dColor.width=this.panel.width-this.otstup-this.dColor.x
        this.dColor.height=this.swh
        
        yy+=this.swh+this.otstup;
        this.slider=new DSliderBig(this.panel, this.otstup, yy,function(){            
            self.obj.lineSah=this.value;
            self.drag()
            
        },"lineSah",0,50);
        this.slider.mobile=true
        this.slider.height=this.swh
        this.slider.width=this.panel.width-this.otstup*2
        this.slider.okrug=1
        
        
        yy+=this.slider.height+this.otstup;

        var yyy2=this.otstup;
        this.dNuz=new DCont(this.panel)
        //////////BitMap//////////////////////
        this.panBM=new DPanel(this.panel,0,yy)
        this.panBM.width=this.width1;
        this.panBM.visible=false
        var l=new DLabel(this.panBM,this.otstup,yyy2,"Свойства картинки")
        l.activMouse=false;
        l.fontSize=this.fontSizeLitel
        l.width=this.width1;
        yyy2+=this.fontSizeLitel+this.otstup;

        this.panBM.height=yyy2;

        

        this.button=new DButton(this.panBM, this.par.otstup*2, yyy2,"Load",function(e){            
            self.body.piclink=e;
        })
        this.button.width=this.width1-this.par.otstup*2;
        this.button.height=this.swh
        this.button.startFile("image/*")

        yyy2+=this.swh+this.otstup;

        this.sliderBit1=new DSliderBig(this.panBM, this.otstup*2+100, yyy2,function(){            
            self.obj.naxV=this.value;
            self.drag()
            self.body.drag2();  
            
        },"naxV",1,50);
        this.sliderBit1.mobile=true
        this.sliderBit1.height=this.swh
        this.sliderBit1.width=this.panel.width-this.otstup*3-100
        this.sliderBit1.okrug=1


     

        this.chekColBit1=new DCheckBox(this.panBM, this.par.otstup,yyy2,"nPix",function(){
            self.obj.bmBNax=this.value;
            self.drag();
            self.body.drag2();

        })
        yyy2+=this.swh+this.otstup;


        this.dColBit=new DColor(this.panBM, this.par.otstup*2+100,yyy2,"#000000",function(){
            self.obj.bmColor=this.value;
            self.drag();
            self.body.drag2();          
        })
        this.dColBit.width=this.width1-this.par.otstup*3-100;
        this.dColBit.height=this.swh;

        this.chekColBit=new DCheckBox(this.panBM, this.par.otstup,yyy2,"color",function(){
            self.obj.bmBColor=this.value;
            self.drag();
            self.body.drag2();

        })

        yyy2+=this.swh+this.otstup;




        ///////////////////////////////




        var l=new DLabel(this.dNuz,this.otstup,yy,"Свойства заливки")
        l.activMouse=false;
        l.fontSize=this.fontSizeLitel
        l.width=this.width1;
        yy+=this.fontSizeLitel+this.otstup
        this.chek1=new DCheckBox(this.dNuz, this.par.otstup,yy,"full",function(){
            self.obj.bfColor=this.value;
            self.dColor1.activMouse=self.obj.bfColor            
            self.drag();
        })
        

        this.dColor1=new DColor(this.dNuz, 60,yy,"#000000",function(){
            self.obj.fcolor=this.value;
            self.drag()            
        })
        this.dColor1.width=this.panel.width-this.otstup-this.dColor.x
        this.dColor1.height=this.swh;
        
        
        yy+=this.swh+this.otstup;


        this.chek2=new DCheckBox(this.dNuz, this.par.otstup,yy,"round",function(){
            self.obj.bRound=this.value;
            
  
            self.drag();
        })

        this.button=new DButton(this.dNuz, this.par.otstup+70, yy,"Дерг всех",function(){
            self.par.par.par.scane.wScane.setObjAll(self.obj)
            fun("dragScane")
        })
        this.button.width=this.panel.width-this.otstup-this.button.x
        this.button.height=this.swh
        

        yy+=this.swh+this.otstup;

        this.panel.height=yy;

        this.getObjInf=function(){
            return this.obj       
        }

        this.dragPP=function(){
            this.dColor1.activMouse=self.obj.bfColor;
            this.chek1.value=self.obj.bfColor;
            this.slider.value = this.obj.lineSah; 
            this.slider.activMouse=self.obj.blColor; 
            this.dColor.value=this.obj.lColor;
            this.dColor.activMouse=self.obj.blColor;
            this.dColor1.value=this.obj.fcolor;
            this.chek2.value=self.obj.bRound

            this.chekColBit.value=self.obj.bmBColor
            this.dColBit.value=self.obj.bmColor

            this.chekColBit1.value=self.obj.bmBNax
            this.sliderBit1.value=self.obj.naxV
        }
        this.dragPP()

        this.body=null
        this.bo=null
        this.setBody=function(body){
            this.body=body;
            this.bo=null;
            var bb=false
            
            
            
            if(this.body && this.body.object){
                this.bo=this.body.object;
                for (var s in this.bo) {
                    if( self.obj[s]!=undefined)self.obj[s]=this.bo[s]
                }
                this.dragPP()
                if(this.body.object.type=="BitMap")bb=true
            }

            this.panBM.visible=bb
            this.dNuz.visible=!bb
        }

        var bb
        this.drag=function(){
            this.par.par.par.saveLoc();
            
            if(this.bo && this.body){
                for (var s in this.obj) {
                    
                    if( this.bo[s]!=undefined)this.bo[s]=this.obj[s]
                }
                bb=this.par.par.par.scane.drEvent.drButton._aBody
                if(bb){
                    if(bb.idArr==this.body.idArr){
                        
                        if(this.body.object.type=="Text"){
                            this.par.par.par.scane.drEvent.drButton.korText()
                        }
                    }
                }
                this.par.par.par.scane.drScane.getPicBody(this.body)
            }
            fun("dragScane")

            this.par.par.par.restart();
        }
    }
}





export class MibBase {
    constructor(par,  fun) {
        var self=this
        this.type="MibBase"
        this.par=par
        this.fun=fun;
        this.dCont=new DCont(this.par.dCont);

        this.rPar=par.rPar

        this.otstup=this.par.otstup;
        this.width1=this.par.width1;
        this.fontSizeLitel=this.par.fontSizeLitel;
        this.swh=this.par.swh;


        this.objStart={
            wh:200,
            type:".svg",
            sahTen:1,
            color:"#000000",
            glowSah:7
        } 
        this.obj=JSON.parse(JSON.stringify(this.objStart))
        if(this.par.par.ols.base==undefined){
            this.par.par.ols.base=this.obj
        } else{
            this.obj= this.par.par.ols.base
        } 



        this.panel=new DPanel(this.dCont,this.otstup,this.otstup*4+this.swh)
        this.panel.width=this.width1;

        this.arrBName=[32, 64, 128, 200, 256];

        
        
        let yy=this.otstup;



        var l=new DLabel(this.panel,this.otstup,yy,"размер рх")
        l.activMouse=false;
        l.fontSize=this.fontSizeLitel
        l.width=this.width1;

        var l=new DLabel(this.panel,145,yy,"формат")
        l.activMouse=false;
        l.fontSize=this.fontSizeLitel
        l.width=this.width1;
       

        yy+=this.fontSizeLitel+this.otstup
        this.buttons=new DButtons(this.panel, this.par.otstup,yy,this.arrBName,function(){
            self.obj.wh=self.arrBName[this.index]
            self.drag()
        })
        this.buttons.fontSize=this.fontSizeLitel
        this.buttons.wh=this.swh;
        
        this.pan200=new DPanel(this.panel,0,0)
        this.pan200.height=this.swh+this.otstup*2;
        this.pan200.color=dcmParam.colorActive
        this.pan200.alpha=0.75

        this.pan200.x=this.buttons.x+this.buttons.array[3].x-this.otstup
        this.pan200.width=this.buttons.array[3].width+this.otstup*2
        this.pan200.y=this.buttons.y-this.otstup


        //yy+=this.buttons.height+this.otstup;

        


        this.arrTT=[".png",".svg"];
        this.buttons1=new DButtons(this.panel, 145 ,yy,this.arrTT,function(){
            self.obj.type=self.arrTT[this.index]
            self.drag()
        })
        this.buttons1.fontSize=this.fontSizeLitel
        this.buttons1.wh=this.swh;


        

        yy+=this.buttons1.height+this.otstup;


        var l=new DLabel(this.panel,this.otstup,yy,"Ттени под рисунком")
        l.activMouse=false;
        l.fontSize=this.fontSizeLitel
        l.width=this.width1;
        yy+=this.fontSizeLitel+this.otstup

        this.arrBSlo=["нет", 1,  2, 3 ]
        this.buts=new DButtons(this.panel, this.par.otstup,yy,this.arrBSlo,function(){
            self.obj.sahTen=this.index
            self.drag()
        })
        this.buts.fontSize=this.fontSizeLitel
        this.buts.wh=this.swh
        

        this.dColor=new DColor(this.panel, this.par.otstup*2+this.buts.width,yy,"#000000",function(){
            self.obj.color=this.value;
            self.drag()
        })
        this.dColor.width=this.panel.width-this.otstup-this.dColor.x
        this.dColor.height=this.swh
        
        yy+=this.swh+this.otstup;


        this.slider=new DSliderBig(this.panel, this.otstup, yy,function(){            
            self.obj.glowSah=this.value;
            self.drag()
        },"glowSah",0,50);
        this.slider.mobile=true
        this.slider.height=this.swh
        this.slider.width=this.panel.width-this.otstup*2
        this.slider.okrug=1
          
        yy+=this.slider.height+this.otstup;

        var l=new DLabel(this.panel,this.otstup,yy,"Стили")
        l.activMouse=false;
        l.fontSize=this.fontSizeLitel
        l.width=this.width1;
        yy+=this.fontSizeLitel+this.otstup

        this.arrBase=[
            {   type:"xz1", 
                json:'{"base":{"wh":200,"type":".svg","sahTen":1,"color":"#0a0a0a","glowSah":5},"lineAnd":{"lineSah":20,"lColor":"#ffffff","blColor":true,"fcolor":"#150036","bfColor":false,"bBlur":true,"bRound":false,"type":"Сircle","bmBColor":false,"bmColor":"#0a0a0a","bmBColor1":true,"bmColor1":"#f85714","bmBNax":true,"naxV":14},"privazka":true,"bPoint":true,"metodType":"Base"}',
                icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNSIgd2lkdGg9IjEwIiB5PSItNSIgaGVpZ2h0PSIxMCI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjUiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMzAgMzAsMTcwIDE3MCwxNzAgMTcwLDMwIDMwLDMwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBhMGEwYSIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDEyMCAzMCwzMCAxMTAsMzAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGEwYTBhIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMTQwIDcwLDkwIDEyMCwxNDAgMTcwLDEwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiMwYTBhMGEiIHN0cm9rZS13aWR0aD0iMTAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTQuMTQyMTM1NjIzNzMwOTUxIiBmaWxsPSJub25lIiBzdHJva2U9IiMwYTBhMGEiIHN0cm9rZS13aWR0aD0iOCIvPjwvZz48L2c+PHBvbHlsaW5lIHBvaW50cz0iMzAsMzAgMzAsMTcwIDE3MCwxNzAgMTcwLDMwIDMwLDMwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDEyMCAzMCwzMCAxMTAsMzAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMTQwIDcwLDkwIDEyMCwxNDAgMTcwLDEwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTQuMTQyMTM1NjIzNzMwOTUxIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iOCIvPjwvc3ZnPg=='
            },
            {   type:"xz2", 
                json:'{"base":{"wh":200,"type":".svg","sahTen":2,"color":"#ffffff","glowSah":10},"lineAnd":{"lineSah":10,"lColor":"#040404","blColor":true,"fcolor":"#150036","bfColor":false,"bBlur":true,"bRound":false,"type":"Line","bmBColor":false,"bmColor":"#0a0a0a","bmBColor1":true,"bmColor1":"#f85714","bmBNax":true,"naxV":14},"privazka":true,"bPoint":true,"metodType":"Base"}',
                icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItMTAiIHdpZHRoPSIyMCIgeT0iLTEwIiBoZWlnaHQ9IjIwIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTAiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMzAgMzAsMTcwIDE3MCwxNzAgMTcwLDMwIDMwLDMwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMTIwIDMwLDMwIDExMCwzMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDE0MCA3MCw5MCAxMjAsMTQwIDE3MCwxMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTQuMTQyMTM1NjIzNzMwOTUxIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48L2c+PGcgZmlsdGVyPSJ1cmwoI2YyKSI+PGxpbmUgeDE9Ii01MCIgeTE9Ii01MCIgeDI9Ii01MCIgeTI9Ii01MCIgc3Ryb2tlPSIjMGEwYTBhIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDMwIDMwLDE3MCAxNzAsMTcwIDE3MCwzMCAzMCwzMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDEyMCAzMCwzMCAxMTAsMzAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIzMCwxNDAgNzAsOTAgMTIwLDE0MCAxNzAsMTAwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+PGNpcmNsZSBjeD0iMTIwIiBjeT0iNzAiIHI9IjE0LjE0MjEzNTYyMzczMDk1MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+PC9nPjwvZz48cG9seWxpbmUgcG9pbnRzPSIzMCwzMCAzMCwxNzAgMTcwLDE3MCAxNzAsMzAgMzAsMzAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNDA0MDQiIHN0cm9rZS13aWR0aD0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIzMCwxMjAgMzAsMzAgMTEwLDMwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDQwNDA0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMTQwIDcwLDkwIDEyMCwxNDAgMTcwLDEwMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA0MDQwNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjcwIiByPSIxNC4xNDIxMzU2MjM3MzA5NTEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA0MDQwNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjwvc3ZnPg=='
            },
            {   type:"xz2", 
                json:'{"base":{"wh":200,"type":".svg","sahTen":3,"color":"#008CBA","glowSah":9},"lineAnd":{"lineSah":20,"lColor":"#f28044","blColor":true,"fcolor":"#150036","bfColor":false,"bBlur":true,"bRound":false,"type":"Line","bmBColor":false,"bmColor":"#0a0a0a","bmBColor1":true,"bmColor1":"#f85714","bmBNax":true,"naxV":14},"privazka":true,"bPoint":true,"metodType":"Base"}',
                icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItOSIgd2lkdGg9IjE4IiB5PSItOSIgaGVpZ2h0PSIxOCI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjkiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMzAgMzAsMTcwIDE3MCwxNzAgMTcwLDMwIDMwLDMwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA4Q0JBIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMTIwIDMwLDMwIDExMCwzMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwOENCQSIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDE0MCA3MCw5MCAxMjAsMTQwIDE3MCwxMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDhDQkEiIHN0cm9rZS13aWR0aD0iMjAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTQuMTQyMTM1NjIzNzMwOTUxIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDhDQkEiIHN0cm9rZS13aWR0aD0iMjAiLz48L2c+PGcgZmlsdGVyPSJ1cmwoI2YyKSI+PGxpbmUgeDE9Ii01MCIgeTE9Ii01MCIgeDI9Ii01MCIgeTI9Ii01MCIgc3Ryb2tlPSIjMGEwYTBhIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDMwIDMwLDE3MCAxNzAsMTcwIDE3MCwzMCAzMCwzMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwOENCQSIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDEyMCAzMCwzMCAxMTAsMzAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDhDQkEiIHN0cm9rZS13aWR0aD0iMjAiLz48cG9seWxpbmUgcG9pbnRzPSIzMCwxNDAgNzAsOTAgMTIwLDE0MCAxNzAsMTAwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA4Q0JBIiBzdHJva2Utd2lkdGg9IjIwIi8+PGNpcmNsZSBjeD0iMTIwIiBjeT0iNzAiIHI9IjE0LjE0MjEzNTYyMzczMDk1MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA4Q0JBIiBzdHJva2Utd2lkdGg9IjIwIi8+PC9nPjxnIGZpbHRlcj0idXJsKCNmMikiPjxsaW5lIHgxPSItNTAiIHkxPSItNTAiIHgyPSItNTAiIHkyPSItNTAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cG9seWxpbmUgcG9pbnRzPSIzMCwzMCAzMCwxNzAgMTcwLDE3MCAxNzAsMzAgMzAsMzAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDhDQkEiIHN0cm9rZS13aWR0aD0iMjAiLz48cG9seWxpbmUgcG9pbnRzPSIzMCwxMjAgMzAsMzAgMTEwLDMwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA4Q0JBIiBzdHJva2Utd2lkdGg9IjIwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMTQwIDcwLDkwIDEyMCwxNDAgMTcwLDEwMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwOENCQSIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjcwIiByPSIxNC4xNDIxMzU2MjM3MzA5NTEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwOENCQSIgc3Ryb2tlLXdpZHRoPSIyMCIvPjwvZz48L2c+PHBvbHlsaW5lIHBvaW50cz0iMzAsMzAgMzAsMTcwIDE3MCwxNzAgMTcwLDMwIDMwLDMwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjI4MDQ0IiBzdHJva2Utd2lkdGg9IjIwIi8+PHBvbHlsaW5lIHBvaW50cz0iMzAsMTIwIDMwLDMwIDExMCwzMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YyODA0NCIgc3Ryb2tlLXdpZHRoPSIyMCIvPjxwb2x5bGluZSBwb2ludHM9IjMwLDE0MCA3MCw5MCAxMjAsMTQwIDE3MCwxMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjgwNDQiIHN0cm9rZS13aWR0aD0iMjAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTQuMTQyMTM1NjIzNzMwOTUxIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjgwNDQiIHN0cm9rZS13aWR0aD0iMjAiLz48L3N2Zz4='
            },
        ]

        if(self.par.par.ols.arrScin==undefined){
            self.par.par.ols.arrScin=[]
        }

        for (var i = 0; i < self.par.par.ols.arrScin.length; i++) {
            this.arrBase.push(self.par.par.ols.arrScin[i])
        }


        this.bb=new DButton(this.panel, 0,yy,"+",function(){
            if(this.text=="-"){
                self.par.par.ols.arrScin.pop();
                self.arrBB[self.arrBB.length-1].visible=false
                self.arrBB.pop();
                self.dragss()
                self.par.par.par.saveLoc()
                return
            }


            let o=JSON.parse(JSON.stringify(self.par.par.ols))
            o.arrScin=undefined;
            let oo={}
            oo.type="xz"
            oo.json=o;
            
            oo.icon=self.par.par.par.getBase64(32);
            self.par.par.ols.arrScin.push(oo);
            self.par.par.par.saveLoc()
            self.pluss(oo)

        })
        this.bb.fontSize=this.fontSizeLitel;
        this.bb.width=this.bb.height=this.swh;
                
        this.dragss=function(){
            let xx=this.par.otstup
            for (var i = 0; i < this.arrBB.length; i++) {
                this.arrBB[i].x=xx
                xx+=(this.swh+this.par.otstup)
            }
            if(xx>this.panel.width-this.swh*2)this.bb.text="-";
            else this.bb.text="+";
            this.bb.x=xx
        }


        this.arrBB=[]
        var yyyyy=yy
        this.pluss=function(o){
            var bb=new DButton(this.panel, 0,yyyyy," ",function(){
                
                let s1=JSON.stringify(self.par.par.ols)
                

                let k=this.objXZ.json
                if(typeof k =="string")k=JSON.parse(this.objXZ.json)
                


                for(var s in k.base){
                    if(self.par.par.ols.base[s]!=undefined){
                        self.par.par.ols.base[s]=k.base[s]
                    }
                }
                for(var s in k.lineAnd){
                    if(self.par.par.ols.lineAnd[s]!=undefined){
                        self.par.par.ols.lineAnd[s]=k.lineAnd[s]
                    }
                }
                self.par.par.aBody=null
                self.par.mibLinsAnd.dragPP()
                self.dragPP();
                self.par.par.par.scane.wScane.setObjAll(self.par.par.ols.lineAnd)
                fun("dragScane")
                self.par.par.par.saveLoc()
            })
            bb.fontSize=this.fontSizeLitel;
            bb.width=bb.height=this.swh;
            bb.objXZ=o;
            bb.link=o.icon;
            this.arrBB.push(bb);
            this.dragss();
        }

        for (var i = 0; i < this.arrBase.length; i++) {
            this.pluss(this.arrBase[i])            
        }





        yy+=this.swh+this.otstup;


        this.setAT=function(s){
            for (var i = 0; i < this.buttons1.array.length; i++) {
                if(this.buttons1.array[i].text==s){
                    
                    self.buttons1.index=i
                    this.buttons1.array[i].animat("alpha",2000,0);
                    self.obj.type=self.arrTT[i]
                    self.drag()
                    return
                }
            }
            
        }



        this.dragPP=function(){
            this.slider.value = this.obj.glowSah;
            this.dColor.value=this.obj.color;
            this.buts.index=this.obj.sahTen

            for (var i = 0; i < this.arrBName.length; i++) {
                if( this.arrBName[i]==this.obj.wh){
                    this.buttons.index=i;
                    break
                }
            }
            let p=0            
            if(this.obj.type==".svg")p=1            
            this.buttons1.index=p; 
            if(p==0)  {
                this.pan200.visible=false
                this.buttons.activMouse=true
            } else{
                this.pan200.visible=true
                this.buttons.activMouse=false
            }
            
        }
        this.dragPP()




        this.panel.height=yy;

        this.drag=function(){
            this.dragPP();
            this.par.par.par.saveLoc();
            fun("dragScane");
            this.par.par.par.restart();

        }
    }
}



export class MDrawW {
    constructor(par,  fun) {
        var self=this
        this.type="MDrawW"
        this.par=par
        this.fun=fun;
        this.rPar=par.rPar;

        this.dC=new DCont(this.par.dCont);
        this.dCont=new DCont(this.dC);
        this.dCont1=new DCont(this.dC);
        this.dCont2=new DCont(this.dC);

        this.ols=this.par.ols
        this.dCont2.visible=this.ols.privazka
        

        this.dC.x=this.rPar.width1+this.rPar.otstup*2
        this.dC.y=this.rPar.swh+this.rPar.otstup*4

        this.otstup=this.rPar.otstup;
        this.width1=this.rPar.width1;
        this.swh=this.rPar.swh;
        this.fontSizeLitel=this.rPar.fontSizeLitel

        this.width=this.rPar.whScane;
        this.height=this.rPar.whScane;

        this.array=[]; 
        
        this.array[0]=this.drPod=new DrPod(this, function(){
           
        });
    }

    set metodType(value) { 
        if(this._metodType!=value){  
            this._metodType=value;
                      
        }
    }   
    get metodType() { return  this._metodType}
}


import { DDCanvas } from '../dSArray/DDCanvas.js';
export class DrPod {
    constructor(par, fun) {
        var self=this
        this.type="DrPod"
        this.par=par
        this.fun=fun;
        this.dCont=new DCont(this.par.dCont);

        this.otstup=this.par.otstup;
        this.width1=this.par.width1;
        this.swh=this.par.swh;
        this.fontSizeLitel=this.par.fontSizeLitel

        this.width=this.par.width;
        this.height=this.par.height;

        this.panel=new DPanel(this.dCont);
        this.panel.width=this.width;
        this.panel.height=this.height;


        this.dDCanvas=new DDCanvas(this.dCont)
        this.dDCanvas.bSetkaCobe=true
        this.dDCanvas.bSetkaText=false
        this.dDCanvas.mashtab=1
        this.dDCanvas.width=this.width;
        this.dDCanvas.height=this.height;



        this.dDCanvas1=new DDCanvas(this.par.dCont2)
        this.dDCanvas1.bSetkaCobe=true
        this.dDCanvas1.bSetkaText=false
        this.dDCanvas1.mashtab=1
        this.dDCanvas1.width=this.width;
        this.dDCanvas1.height=this.height;

        this.dDCanvas1.clear()
        var ww=20;
        this.dDCanvas1.setRect(
            {x:ww,y:ww,width:this.width-ww*2,height:this.height-ww*2,},
            1,
            undefined,
            0.4
        )

        ww=40;
        this.dDCanvas1.setRect(
            {x:ww,y:ww,width:this.width-ww*2,height:this.height-ww*2,},
            1,
            undefined,
            0.4
        )

        this.dDCanvas1.setLine(
            {x:0,y:this.height/2},
            {x:this.width,y:this.height/2},
            1,
            undefined,
            0.4
        )

        this.dDCanvas1.setLine(
            {x:this.width/2,y:0},
            {x:this.width/2,y:this.height},
            1,
            undefined,
            0.4
        )

        for (var i = 0; i < this.width; i+=10) {
            for (var j = 0; j < this.height; j+=10) {
                this.dDCanvas1.setPoint(
                    {x:i,y:j},
                    0.5,
                    1,
                    undefined,
                    0.4
                )
            }
        }

    }
}
