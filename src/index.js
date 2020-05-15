import { DCont } from './dCont/DCont.js';
import { DCM, DComboBox,DButton, DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DBitmapData,DScrollBarH,DScrollBarV,DWindowS,DButSim} from './dCont/DCM.js';
import { DSettings} from './dCont/DSettings.js';
import { DParamObject} from './dCont/DParamObject.js';
import { DGallery,DBox} from './dCont/DGallery.js';
import { DHelp} from './dCont/DHelp.js';

import { DThree} from './dCont/DThree.js';
import { DButtonDrag, DAroundButton} from './dCont/DPlus.js';
import {DDragPic} from './dCont/DDragPic.js';

global.DDragPic = DDragPic;
global.DButton = DButton;
global.DPanel = DPanel;
global.DImage = DImage;
global.DLabel = DLabel;
global.DSlider = DSlider;
global.DSliderBig=DSliderBig;
global.DInput = DInput;
global.DTextArea = DTextArea;
global.DCheckBox=DCheckBox
global.DColor=DColor
global.DWindow=DWindow
global.DScrollBarH=DScrollBarH
global.DScrollBarV=DScrollBarV
global.DComboBox=DComboBox

global.DButtonDrag=DButtonDrag
global.DAroundButton=DAroundButton

global.DCM = DCM;
global.DCont = DCont;

//global.DAroundButton=DAroundButton

global.DSettings=DSettings
global.DParamObject=DParamObject

global.DGallery=DGallery
global.DBox=DBox
global.DBitmapData=DBitmapData

global.DButSim=DButSim
global.DWindowS=DWindowS
global.DHelp=DHelp
global.DThree=DThree

export { DCont, DCM,DDragPic, DButton,DComboBox, DButtonDrag,DAroundButton, DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DSettings,DParamObject,DGallery,DBitmapData,DScrollBarH,DScrollBarV,DBox,DWindowS,DButSim,DHelp,DThree};
