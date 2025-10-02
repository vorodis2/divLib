

import { Menu} from './Menu.js';
import { Scane} from './Scane.js';

export class DCreatIcon extends DCont{
    constructor(dCont, _x, _y, _key, _fun) {
        super();
        var self=this
        this.type="DCreatIcon"
        this.infoThis=`
            var dci = new DCreatIcon(this.dCont,0,0,"xzKeyLS",function(){});
            .getFile() :: .getFile(64)//токо png вернет не смотре на тип
            .getBase64() :: Вернет base64 можно пихнкуть размер
            .setLink(link) :: Если svg и сделан тут, то откроет по слоям, иначе просто подгрузит
            .funGetFile(file) :: Кнопка результата отдают фаил
        `

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);         
        this.x=_x||0; 
        this.y=_y||0;

        this.funGetFile=undefined


        if(_key==undefined){
            _key="keyHerEgoZnaet"
        }
        this.key=_key
        this.ls=null;
        this.ols={};
        if(_key!=undefined){
            this.ls=new LocalStorageWW(function(){
                
            },_key)
            self.ols=this.ls.object
        }

        this.rPar={}

        this.rPar.otstup=2;
        this.rPar.width1=236;
        
        this.rPar.swh=24;
        this.rPar.fontSizeLitel=10
        this.rPar.linkXZ='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNyIgd2lkdGg9IjE0IiB5PSItNyIgaGVpZ2h0PSIxNCI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjciLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIiBzdHJva2U9IiMzMjI3Y2YiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSI0MCIgeTE9IjQwIiB4Mj0iMTYwIiB5Mj0iMTYwIiBzdHJva2U9IiMwYTBhMGEiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSIxNjAiIHkxPSI0MCIgeDI9IjQwIiB5Mj0iMTYwIiBzdHJva2U9IiMwYTBhMGEiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PGxpbmUgeDE9IjQwIiB5MT0iNDAiIHgyPSIxNjAiIHkyPSIxNjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjE2MCIgeTE9IjQwIiB4Mj0iNDAiIHkyPSIxNjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+'
        this.rPar.whScane=200;
        this.rPar.width=this.rPar.width1+this.rPar.otstup*4+this.rPar.whScane+this.rPar.swh*1.5;
        this.rPar.height=this.rPar.swh+this.rPar.otstup*5+this.rPar.whScane;
        this.rPar.fontFamily="Arial"//dcmParam._fontFamily
        
        this.width=this.rPar.width
        this.height=this.rPar.height

        this._metodType="ниже от [1]";
        this._aBody=null

        this.panel=new DPanel(this)
        this.panel.width=this.rPar.width
        this.panel.height=this.rPar.height

        this.dCont=new DCont(this.panel)

        this.arrInfo=[
            {type:"Base",icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItMTAiIHdpZHRoPSIyMCIgeT0iLTEwIiBoZWlnaHQ9IjIwIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTAiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHRleHQgeD0iMTMiIHk9IjE1NCIgZm9udC1zaXplPSIxNzZweCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmaWxsPSIjM2IzYjNiIj5CPC90ZXh0Pjx0ZXh0IHg9IjEzMyIgeT0iMTUxLjUiIGZvbnQtc2l6ZT0iMzZweCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmaWxsPSIjM2IzYjNiIj5hc2U8L3RleHQ+PC9nPjxnIGZpbHRlcj0idXJsKCNmMikiPjxsaW5lIHgxPSItNTAiIHkxPSItNTAiIHgyPSItNTAiIHkyPSItNTAiLz48dGV4dCB4PSIxMyIgeT0iMTU0IiBmb250LXNpemU9IjE3NnB4IiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IiMzYjNiM2IiPkI8L3RleHQ+PHRleHQgeD0iMTMzIiB5PSIxNTEuNSIgZm9udC1zaXplPSIzNnB4IiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IiMzYjNiM2IiPmFzZTwvdGV4dD48L2c+PC9nPjx0ZXh0IHg9IjEzIiB5PSIxNTQiIGZvbnQtc2l6ZT0iMTc2cHgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iI2ZmZmVmZSI+QjwvdGV4dD48dGV4dCB4PSIxMzMiIHk9IjE1MS41IiBmb250LXNpemU9IjM2cHgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iI2ZmZmVmZSI+YXNlPC90ZXh0Pjwvc3ZnPg=='},           
            {type:"Line",icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNyIgd2lkdGg9IjE0IiB5PSItNyIgaGVpZ2h0PSIxNCI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjciLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGNpcmNsZSBjeD0iMTYwIiBjeT0iNDAiIHI9IjE0LjE0MjEzNTYyMzczMDk1MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDMwMzAzIiBzdHJva2Utd2lkdGg9IjEwIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSIxNjAiIHI9IjE0LjE0MjEzNTYyMzczMDk1MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDMwMzAzIiBzdHJva2Utd2lkdGg9IjEwIi8+PGxpbmUgeDE9IjUwIiB5MT0iMTUwIiB4Mj0iMTUwIiB5Mj0iNTAiIHN0cm9rZT0iIzAzMDMwMyIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PC9nPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQwIiByPSIxNC4xNDIxMzU2MjM3MzA5NTEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iMTYwIiByPSIxNC4xNDIxMzU2MjM3MzA5NTEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxsaW5lIHgxPSI1MCIgeTE9IjE1MCIgeDI9IjE1MCIgeTI9IjUwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9zdmc+'},
            {type:"Line2",icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGNpcmNsZSBjeD0iNzMiIGN5PSI4OCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxMyIvPjxjaXJjbGUgY3g9IjMzIiBjeT0iMTY4IiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjEzIi8+PGNpcmNsZSBjeD0iMTIzIiBjeT0iMTU4IiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjEzIi8+PGNpcmNsZSBjeD0iMTYzIiBjeT0iMjgiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTMiLz48bGluZSB4MT0iMzQuNDU0NjgxMzk2NDg0Mzc1IiB5MT0iMTYwIiB4Mj0iNjYuNDU0NjgxMzk2NDg0MzgiIHkyPSI5OCIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxsaW5lIHgxPSI3Ny40NTQ2ODEzOTY0ODQzOCIgeTE9Ijk1IiB4Mj0iMTE1LjQ1NDY4MTM5NjQ4NDM4IiB5Mj0iMTQ4IiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PGxpbmUgeDE9IjEyNi40NTQ2ODEzOTY0ODQzOCIgeTE9IjE0OCIgeDI9IjE1OC40NTQ2ODEzOTY0ODQzOCIgeTI9IjQwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PC9nPjwvZz48Y2lyY2xlIGN4PSI3MyIgY3k9Ijg4IiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEzIi8+PGNpcmNsZSBjeD0iMzMiIGN5PSIxNjgiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTMiLz48Y2lyY2xlIGN4PSIxMjMiIGN5PSIxNTgiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTMiLz48Y2lyY2xlIGN4PSIxNjMiIGN5PSIyOCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMyIvPjxsaW5lIHgxPSIzNC40NTQ2ODEzOTY0ODQzNzUiIHkxPSIxNjAiIHgyPSI2Ni40NTQ2ODEzOTY0ODQzOCIgeTI9Ijk4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PGxpbmUgeDE9Ijc3LjQ1NDY4MTM5NjQ4NDM4IiB5MT0iOTUiIHgyPSIxMTUuNDU0NjgxMzk2NDg0MzgiIHkyPSIxNDgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48bGluZSB4MT0iMTI2LjQ1NDY4MTM5NjQ4NDM4IiB5MT0iMTQ4IiB4Mj0iMTU4LjQ1NDY4MTM5NjQ4NDM4IiB5Mj0iNDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L3N2Zz4='},
            {type:"Line3",icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGNpcmNsZSBjeD0iMTcwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTMiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjE3MCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxMyIvPjxjaXJjbGUgY3g9IjE3MCIgY3k9IjE3MCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxMyIvPjxwYXRoIGQ9Ik0gMTcwIDQwQyAxNjAgMTcwLCA0MCAxNzAsIDQwIDE3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjIwIi8+PC9nPjxnIGZpbHRlcj0idXJsKCNmMikiPjxsaW5lIHgxPSItNTAiIHkxPSItNTAiIHgyPSItNTAiIHkyPSItNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIxMyIvPjxjaXJjbGUgY3g9IjE3MCIgY3k9IjMwIiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjEzIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIxNzAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTMiLz48Y2lyY2xlIGN4PSIxNzAiIGN5PSIxNzAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTMiLz48cGF0aCBkPSJNIDE3MCA0MEMgMTYwIDE3MCwgNDAgMTcwLCA0MCAxNzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIvPjwvZz48L2c+PGNpcmNsZSBjeD0iMTcwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTMiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjE3MCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMyIvPjxjaXJjbGUgY3g9IjE3MCIgY3k9IjE3MCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMyIvPjxwYXRoIGQ9Ik0gMTcwIDQwQyAxNjAgMTcwLCA0MCAxNzAsIDQwIDE3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIi8+PC9zdmc+'},
            
            {type:"Сircle",icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNyIgd2lkdGg9IjE0IiB5PSItNyIgaGVpZ2h0PSIxNCI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjciLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDMwMzAzIiBzdHJva2Utd2lkdGg9IjIwIi8+PC9nPjwvZz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjcwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjAiLz48L3N2Zz4='},
            {type:"Rect",icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNyIgd2lkdGg9IjE0IiB5PSItNyIgaGVpZ2h0PSIxNCI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjciLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDMwMzAzIiBzdHJva2Utd2lkdGg9IjIwIi8+PC9nPjwvZz48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjAiLz48L3N2Zz4="},
           
            {type:"LineDrag",icon:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItNiIgd2lkdGg9IjEyIiB5PSItNiIgaGVpZ2h0PSIxMiI+PGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjYiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIxNjAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNyIvPjxwb2x5bGluZSBwb2ludHM9IjUwLDE1MCAzMCwxMjAgMzAsMzAgNzAsMzAgNzAsMTIwIDUwLDE1MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTUiLz48cGF0aCBkPSJNIDYwIDE2MEMgODAgMTkwLCAxMTAgMTYwLCAxMTAgMTYwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI3Ii8+PHBhdGggZD0iTSAxNzAgMTYwQyAxMzAgMTMwLCAxMTAgMTYwLCAxMTAgMTYwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI3Ii8+PGxpbmUgeDE9IjcwIiB5MT0iMTIwIiB4Mj0iMzAiIHkyPSIxMjAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PGcgZmlsdGVyPSJ1cmwoI2YyKSI+PGxpbmUgeDE9Ii01MCIgeTE9Ii01MCIgeDI9Ii01MCIgeTI9Ii01MCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMTYwIiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjciLz48cG9seWxpbmUgcG9pbnRzPSI1MCwxNTAgMzAsMTIwIDMwLDMwIDcwLDMwIDcwLDEyMCA1MCwxNTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjE1Ii8+PHBhdGggZD0iTSA2MCAxNjBDIDgwIDE5MCwgMTEwIDE2MCwgMTEwIDE2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNyIvPjxwYXRoIGQ9Ik0gMTcwIDE2MEMgMTMwIDEzMCwgMTEwIDE2MCwgMTEwIDE2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNyIvPjxsaW5lIHgxPSI3MCIgeTE9IjEyMCIgeDI9IjMwIiB5Mj0iMTIwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjwvZz48Y2lyY2xlIGN4PSI1MCIgY3k9IjE2MCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI3Ii8+PHBvbHlsaW5lIHBvaW50cz0iNTAsMTUwIDMwLDEyMCAzMCwzMCA3MCwzMCA3MCwxMjAgNTAsMTUwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxNSIvPjxwYXRoIGQ9Ik0gNjAgMTYwQyA4MCAxOTAsIDExMCAxNjAsIDExMCAxNjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjciLz48cGF0aCBkPSJNIDE3MCAxNjBDIDEzMCAxMzAsIDExMCAxNjAsIDExMCAxNjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjciLz48bGluZSB4MT0iNzAiIHkxPSIxMjAiIHgyPSIzMCIgeTI9IjEyMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg=="},

            {type:"Text",icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItMyIgd2lkdGg9IjYiIHk9Ii0zIiBoZWlnaHQ9IjYiPjxmZUdhdXNzaWFuQmx1ciBpbj0iU291cmNlR3JhcGhpYyIgc3RkRGV2aWF0aW9uPSIzIi8+PC9maWx0ZXI+PGc+PGcgZmlsdGVyPSJ1cmwoI2YyKSI+PGxpbmUgeDE9Ii01MCIgeTE9Ii01MCIgeDI9Ii01MCIgeTI9Ii01MCIvPjxsaW5lIHgxPSI0MCIgeTE9IjQwIiB4Mj0iMTYwIiB5Mj0iNDAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjEwMCIgeTE9IjQwIiB4Mj0iMTAwIiB5Mj0iMTYwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSI4MCIgeTE9IjE2MCIgeDI9IjEyMCIgeTI9IjE2MCIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PGcgZmlsdGVyPSJ1cmwoI2YyKSI+PGxpbmUgeDE9Ii01MCIgeTE9Ii01MCIgeDI9Ii01MCIgeTI9Ii01MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iNDAiIHkxPSI0MCIgeDI9IjE2MCIgeTI9IjQwIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSIxMDAiIHkxPSI0MCIgeDI9IjEwMCIgeTI9IjE2MCIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iODAiIHkxPSIxNjAiIHgyPSIxMjAiIHkyPSIxNjAiIHN0cm9rZT0iIzMwMzAzMCIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjwvZz48bGluZSB4MT0iNDAiIHkxPSI0MCIgeDI9IjE2MCIgeTI9IjQwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxsaW5lIHgxPSIxMDAiIHkxPSI0MCIgeDI9IjEwMCIgeTI9IjE2MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iODAiIHkxPSIxNjAiIHgyPSIxMjAiIHkyPSIxNjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+'},
            {type:"BitMap",icon:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBzdHlsZT0id2lkdGg6IDIwMHB4OyBoZWlnaHQ6IDIwMHB4OyI+PHBhdGgvPjxmaWx0ZXIgaWQ9ImYyIiB4PSItMTAiIHdpZHRoPSIyMCIgeT0iLTEwIiBoZWlnaHQ9IjIwIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTAiLz48L2ZpbHRlcj48Zz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIi8+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgcng9IjAiIHJ5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjNiM2IiIHN0cm9rZS13aWR0aD0iMTAiLz48bGluZSB4MT0iMzAiIHkxPSIxNDAiIHgyPSI2MCIgeTI9IjExMCIgc3Ryb2tlPSIjM2IzYjNiIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iODAiIHkxPSIxMzAiIHgyPSI2MCIgeTI9IjExMCIgc3Ryb2tlPSIjM2IzYjNiIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iMTMwIiB5MT0iODAiIHgyPSI4MCIgeTI9IjEzMCIgc3Ryb2tlPSIjM2IzYjNiIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48bGluZSB4MT0iMTcwIiB5MT0iMTcwIiB4Mj0iMTMwIiB5Mj0iODAiIHN0cm9rZT0iIzNiM2IzYiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNiM2IzYiIgc3Ryb2tlLXdpZHRoPSIxMiIvPjwvZz48ZyBmaWx0ZXI9InVybCgjZjIpIj48bGluZSB4MT0iLTUwIiB5MT0iLTUwIiB4Mj0iLTUwIiB5Mj0iLTUwIiBzdHJva2U9IiMzYjNiM2IiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIHJ4PSIwIiByeT0iMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2IzYjNiIiBzdHJva2Utd2lkdGg9IjEwIi8+PGxpbmUgeDE9IjMwIiB5MT0iMTQwIiB4Mj0iNjAiIHkyPSIxMTAiIHN0cm9rZT0iIzNiM2IzYiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjgwIiB5MT0iMTMwIiB4Mj0iNjAiIHkyPSIxMTAiIHN0cm9rZT0iIzNiM2IzYiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjEzMCIgeTE9IjgwIiB4Mj0iODAiIHkyPSIxMzAiIHN0cm9rZT0iIzNiM2IzYiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjE3MCIgeTE9IjE3MCIgeDI9IjEzMCIgeTI9IjgwIiBzdHJva2U9IiMzYjNiM2IiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjNiM2IiIHN0cm9rZS13aWR0aD0iMTIiLz48L2c+PC9nPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIHJ4PSIwIiByeT0iMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZWZlIiBzdHJva2Utd2lkdGg9IjEwIi8+PGxpbmUgeDE9IjMwIiB5MT0iMTQwIiB4Mj0iNjAiIHkyPSIxMTAiIHN0cm9rZT0iI2ZmZmVmZSIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjgwIiB5MT0iMTMwIiB4Mj0iNjAiIHkyPSIxMTAiIHN0cm9rZT0iI2ZmZmVmZSIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjEzMCIgeTE9IjgwIiB4Mj0iODAiIHkyPSIxMzAiIHN0cm9rZT0iI2ZmZmVmZSIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGxpbmUgeDE9IjE3MCIgeTE9IjE3MCIgeDI9IjEzMCIgeTI9IjgwIiBzdHJva2U9IiNmZmZlZmUiIHN0cm9rZS13aWR0aD0iMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZlZmUiIHN0cm9rZS13aWR0aD0iMTIiLz48L3N2Zz4='},


        ]

        this.objInfo={}
        for (var i = 0; i < this.arrInfo.length; i++) {
            this.objInfo[this.arrInfo[i].type]=this.arrInfo[i];
            this.objInfo[this.arrInfo[i].type].idArr=i
        }

        this.menu=new Menu(this,function(s,p,p1){
            
            if(s=="dragScane")self.scane.drScane.draw()
        });
        this.scane=new Scane(this,function(s,p,p1){

        }, this.menu.mDrawW.dCont1);
       

        ///////////////////////////////////////////////
        this.getFile=function(wh){
            return this.scane.drScane.getFile(wh);
        }
        this.getBase64=function(wh){
            return this.scane.drScane.getBase64(wh);
        }

        ///////////////////////////////////////////////
        this.sahLoad=-1;
        this.setLink=function(link, bClear, bType){
            this.sahLoad++;

            return this.scane.setLink(link, bClear, bType);
        }



        ////////////////////////////////////////////
        this.saveLoc=function(){
            if(this.ls){
                this.ls.save()
            }
        }

        this.link=""
        this.restart=function(){
            console.warn(this)
            this.link=this.scane.drScane.getPic()
            this.menu.mScaneA.setLink(this.link)
            this.menu.mVerhStart.input.text=this.link;

            if(this.menu.mThree3d)this.menu.mThree3d.setLink(this.link)
           
            this.menu.mVerhStart.button.text=this.ols.base.type
        }

        this.oldM=1
        this.rPar.objStart=null
        this.dragIndex=function(){
           
            
            this.rPar.objStart=this.menu.getObjInf()
            this.rPar.objStart.type=this.arrInfo[this.oldM].type;           
        }

        if(this.ls.object.metodType==undefined){
            this.ls.object.metodType=this.arrInfo[1].type

        }

        this.metodType=this.ls.object.metodType;
    } 

    set metodType(value) { 
        if(this._metodType!=value){
            

            this._metodType=value;
            if(this.objInfo[this._metodType] && this.objInfo[this._metodType].idArr!=0)this.oldM=this.objInfo[this._metodType].idArr
            
            this.menu.metodType=value;

            this.dragIndex()
            this.scane.metodType=value; 
            
        }
    }   
    get metodType() { return  this._metodType} 

    set aBody(value) { 
        
        if(this._aBody!=value){  
            this._aBody=value;
            this.menu.aBody=value;   
            
            this.scane.aBody=value; 
        }
    }   
    get aBody() { return  this._aBody} 


}












































export function LocalStorageWW(fun,_key) {
    this.fun = fun;
    var self = this;
    this.object;
    this.key = _key||'shirt';
    this.object; // тут храняться все данные с localStorage
    var b;
    // инициализация localStorage
    this.initLoad=function() {
        b=true;
        this.object = window.localStorage[this.key];
        if(this.object == "undefined")b=false;
        if(this.object == undefined)b=false;
        
        // проверка пуст ли  localStorage
        if(b == false) {
            this.object = {}; // если localStorage пуст, записываем обьект с функции getStartObj
        }else {
            this.object = JSON.parse(this.object); // если localStorage не пуст записываем содержимое предварительно
        }   
        if(this.fun){
            setTimeout(function() {self.fun();}, 1);  
        }
    }
    
 

    // сохраняем в localStorage данные
    this.save = function() {        
        window.localStorage[this.key] = JSON.stringify(self.object);
    }

    // удаляем из localStorage данные
    this.clear = function() {
        window.localStorage[this.key] = undefined;
    }
    self.initLoad();     
}


