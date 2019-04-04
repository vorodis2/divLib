import { DCont } from './dCont/DCont.js';
import { DCM, DButton, DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DScrollBarH,DScrollBarV} from './dCont/DCM.js';
import { DSettings} from './dCont/DSettings.js';
import { DParamObject} from './dCont/DParamObject.js';
import { DGallery} from './dCont/DGallery.js';
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


global.DCM = DCM;
global.DCont = DCont;

global.DSettings=DSettings
global.DParamObject=DParamObject

global.DGallery=DGallery

export { DCont, DCM , DButton, DPanel,DImage,DLabel,DSlider,DSliderBig,DInput,DTextArea,DCheckBox,DColor,DWindow,DSettings,DParamObject,DGallery,DScrollBarH,DScrollBarV};
