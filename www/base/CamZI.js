export class CamZI {
    constructor (_fun) {
        var self=this;        
        this.type = "DCam";
        this.fun=_fun;

        this.bmp = new DBitmapData(2, 2,null,function(){
            self.fun("complite");
        });

        // this.bmpDist = new DBitmapData(1000, 500, null, function(){
        //     self.fun("complite dist");
        // });

        this.load = async function(url){
            this.bmp.load(url, true);
        }

        this.getArr = function(ii, jj, w, h) {
            let arr = [];
            let x = ii;
            let y = jj;

            for (let j = 0; j < h-jj; j++, y++) {
                arr[j]=[];
                for (let i = 0; i < w-ii; i++, x++) {
                    x = ii + i;
                    arr[j][i]=[...this.bmp.getPixel(y, x)];                 
                }
            }  

            return arr;
        }

        this.setArr = function(ii, jj, arr, isNeedUpdate) {
            let x = ii;
            let y = jj;

            for (let j = 0; j < arr.length; j++, y++) {
                for (let i = 0; i < arr[j].length; i++) {
                    x = ii + i;
                    this.bmp.setPixel(y, x, arr[j][i]); 
                }
            }

            if (isNeedUpdate) this.bmp.upDate();
        }

        this.mirroX = function(ii, jj, arr) {
            let resArr = [];

            for (let j = 0; j < arr.length; j++) {
                resArr[j] = [];
                for (let i = 0; i < arr[j].length; i++) {
                    resArr[j][i] = arr[arr.length-j-1][i];
                }
            }

            this.setArr(ii, jj, resArr, true);
        }

        this.mirroY = function(ii, jj, arr) {
            let resArr = [];

            for (let j = 0; j < arr.length; j++) {
                resArr[j] = [];
                for (let i = 0; i < arr[j].length; i++) {
                    resArr[j][i] = arr[j][arr[j].length-i-1];
                }
            }

            this.setArr(ii, jj, resArr, true);
        }
        
       
        this.create = function() {
            
            let arr=[]
            let c,n,n1;

            const ii=this.bmp.width
            // const jj=this.bmp.height  
           /**/ var jj=40//this.bmp.height          
            for (let j = 39; j < jj; j++) {
        
            // for (let j = 0; j < jj; j++) {
                n=Math.abs(j/jj*2-1)
                n1=Math.cos(n*Math.PI/2)

                for (let i = 0; i < ii; i++) {
                    arr.push([...this.bmp.getPixel(i, j)]);
                }

                ///arr-полоса фото
                this.create1(arr, n1, j);      
            }

            this.bmp.upDate(); 
        }

        this.create1 = function(arr, num, _j) {
            
            let aa=[]
            for (let i = 0; i < arr.length/4; i++) {
                aa.push(arr[i])
            }

            //aa изменен
            this.create2(aa,num,true)

            for (let i = 0; i < arr.length/4; i++) {
                this.bmp.setPixel(i, _j, aa[i]);
            }
        }

        
        this.create2 = function(arr,num,bool) {
            let p = Math.round(arr.length*num)
            let pxx,sah
            let a1=[]
            let a2=[]
           
            for (let i = p; i < arr.length; i++) {
                a1.push(arr[i])
            }

            pxx=a1.length/arr.length;
            sah=p;

            for (let i = 0; i < arr.length; i++) {
                let ss=Math.floor(sah)
                if(arr[ss]){
                    a2.push([arr[ss][0],arr[ss][1],arr[ss][2],arr[ss][3]])
                }else{
                    a2.push([arr[i][0],arr[i][1],arr[i][2],arr[i][3]])
                }
                
                sah+=pxx;
            }

            for (let i = 0; i < arr.length; i++) {
                arr[i]=a2[i]
            }
        }

        this.isSI=function(){
            const w = this.bmp._width;
            const h = this.bmp._height;

            const otstup = Math.floor(w/100);

            const points = []
            const rgba = this.bmp.arrRgba;
            //1
            this.bmp.getPixel(otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 - otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 - otstup, h - otstup);
            points.push([...rgba])
            this.bmp.getPixel(otstup, h - otstup);
            points.push([...rgba])
            //2
            this.bmp.getPixel(w/2 + otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w - otstup, otstup);
            points.push([...rgba])
            this.bmp.getPixel(w - otstup, h - otstup);
            points.push([...rgba])
            this.bmp.getPixel(w/2 + otstup, h - otstup);
            points.push([...rgba])

            const maxSpread = 10;
            const maxRange = 50;

            let rgbPoint = points[0][0];
            if (rgbPoint > maxRange) return false;

            for (const point of points) {                
                if (point[3] != 255) return false;
                for (let i = 0; i < 3; i++) {
                    if (rgbPoint + maxSpread < point[i]) return false;
                    if (rgbPoint - maxSpread > point[i]) return false;
                }
            }                
            return true
        }
    }  
}


        // this.fish2Sphere = function() {

        //     const aperture = 195 * Math.PI / 180;

        //     const wDist = this.bmpDist._width;
        //     const hDist = this.bmpDist._height;

        //     const wSrc = this.bmp._width;
        //     const hSrc = this.bmp._height;
 
        //     for (let y = hSrc; y > 0; y--) {
        //         const yNorm = this.lerp(-1, 1, 0, hDist, y);
                
        //         for (let x = 0; x < wSrc; x++) {
        //             const xNorm = this.lerp(-1, 1, 0, wDist, x);

        //             const longitude = xNorm * Math.PI;
        //             const latitude = yNorm * Math.PI/2;

        //             const px = Math.cos(latitude) * Math.cos(longitude);
        //             const py = Math.cos(latitude) * Math.sin(longitude);
        //             const pz = Math.sin(latitude);

        //             const pxz = Math.sqrt(Math.pow(px, 2) + Math.pow(pz, 2));
        //             const r = 2 * Math.atan2(pxz, py) / aperture;
        //             const theta = Math.atan2(pz, px);

        //             const xSrcNorm = r * Math.cos(theta);
        //             const ySrcNorm = r * Math.sin(theta);

        //             const xSrc = this.lerp(0, wSrc, -1, 1, xSrcNorm);
        //             const ySrc = this.lerp(0, hSrc, -1, 1, ySrcNorm);

        //             const xRect = Math.min(wSrc - 1, Math.floor(xSrc));
        //             const yRect = Math.min(hSrc - 1, Math.floor(ySrc));
                    

        //             this.bmpDist.setPixel(xRect, yRect, [...this.bmp.getPixel(x, y)]);
        //         }
        //     }

        //     this.bmpDist.upDate();
        // }

        // this.lerp = function(y0, y1, x0, x1, x) {
        //     const m = (y1 - y0) / (x1 - x0);
        //     const b = y0;
        //     return m * (x - x0) + b;
        // }

                // this.mirro = function(b,b1,b2, b3) {
        //     var ii=this.bmp.width
        //     var jj=this.bmp.height 
        //     var ii2=ii/2
        //     var arr=[]
        //     var arr1=[]
        //     var arr2=[]
        //     if(b==true){
        //         for (let j = 0; j < jj; j++) {
        //             arr[j]=[]
        //             for (let i = 0; i < ii2; i++) {
        //                 arr[j][i]=[...this.bmp.getPixel(j, i)];                     
        //             }
        //         }  
        //     }else{
        //         for (let j = 0; j < jj; j++) {
        //             arr[j]=[]
        //             for (let i = 0; i < ii2; i++) {
        //                 arr[j][i]=[...this.bmp.getPixel(i + ii2, j)]; 
        //             }
        //         }
        //     }


        //     for (let j = 0; j < arr.length; j++) { 
        //         arr1[j]=[];
        //         arr2[j]=[];               
        //         for (let i = 0; i < arr[j].length; i++) {
        //             arr1[j][i]=0; 
        //             arr2[j][i]=0 ;
        //         }
        //     }

        //     var col;
        //     for (let j = 0; j < arr.length; j++) {                              
        //         for (let i = 0; i < arr[j].length; i++) {              
        //             arr2[j][i]=b2?arr[arr.length-j-1][i]:arr[j][i]; 
        //         }
        //     }

           
        //     for (let j = 0; j < arr2.length; j++) { 
        //         var ww= arr2[j].length                            
        //         for (let i = 0; i < arr2[j].length; i++) {
        //             var xz= (ww-i-1)                   
        //             arr1[j][i]=b1?arr2[j][xz]:arr2[j][i]; 
        //         }
        //     }

        //     if(b==true){
        //         for (let j = 0; j < jj; j++) {                    
        //             for (let i = 0; i < ii2; i++) {                  
        //                 this.bmp.setPixel(j, i,arr1[j][i]); 
        //             }
        //         } 
        //     }else{
        //        for (let j = 0; j < jj; j++) {
        //             arr[j]=[]
        //             for (let i = 0; i < ii2; i++) {
        //                 this.bmp.setPixel(i+ii2, j, arr1[j][i]); 
        //             }
        //         }
        //     }

        //     if(b3==true)this.bmp.upDate(); 
        // }
