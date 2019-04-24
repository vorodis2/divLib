import { DCont } from './dCont/DCont.js';
import { DCM, DButton, DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DScrollBarH,DScrollBarV} from './dCont/DCM.js';
import { DSettings} from './dCont/DSettings.js';
import { DParamObject} from './dCont/DParamObject.js';
import { DGallery,DBox} from './dCont/DGallery.js';

//import { DButtonDrag} from './dCont/DPus.js';

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


//global.DButtonDrag=DButtonDrag


global.DCM = DCM;
global.DCont = DCont;

//global.DAroundButton=DAroundButton

global.DSettings=DSettings
global.DParamObject=DParamObject

global.DGallery=DGallery
global.DBox=DBox

export { DCont, DCM, DButton,  DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DSettings,DParamObject,DGallery,DScrollBarH,DScrollBarV,DBox};
