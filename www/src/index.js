import { DCont } from './dCont/DCont.js';
import { DCM, DComboBoxOld, DComboBox,DButton, DGlow,DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DBitmapData,DScrollBarH,DScrollBarV,DWindowS,DButSim} from './dCont/DCM.js';
import { DSettings} from './dCont/DSettings.js';
import { DParamObject} from './dCont/DParamObject.js';
import { DGallery,DBox} from './dCont/DGallery.js';
import { DHelp} from './dCont/DHelp.js';

import { DThree} from './dCont/DThree.js';
import { DButtonDrag, DAroundButton} from './dCont/DPlus.js';
import {DDragPic} from './dCont/DDragPic.js';
import {DHole} from './dCont/DHole.js';

import {DHoleDrag} from './dCont/DHoleDrag.js';


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
global.DComboBoxOld=DComboBoxOld

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
global.DGlow=DGlow
global.DHole=DHole
global.DHoleDrag = DHoleDrag;


export { DCont, DCM,DDragPic, DButton,DGlow,DComboBox, DComboBoxOld, DButtonDrag,DAroundButton, DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DSettings,DParamObject,DGallery,DBitmapData,DScrollBarH,DScrollBarV,DBox,DWindowS,DButSim,DHelp,DThree,DHole,DHoleDrag};
