import "./media.scss"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export default function MediaController(params) {
    const {enableKeyboard, sendChar} = params
    return (
        <div className="media">
            <div className="row">
            <button onClick={()=>sendChar("+alt+left")}><ArrowBackIcon fontSize="inherit"/> <text>back</text> </button>
            <button onClick={()=>{sendChar("f11")}}><FitScreenIcon fontSize="inherit"/> <text>f11</text> </button>
            <button onClick={()=>sendChar("up")}><KeyboardArrowUpIcon fontSize="inherit"/> <text>up</text> </button> 
            <button onClick={()=>sendChar("fullscreen")}><FullscreenIcon fontSize="inherit"/> <text>f/esc</text> </button>
            <button onClick={()=>sendChar("+ctrl+alt+up")}><VolumeUpIcon fontSize="inherit"/> <text>vol+</text> </button>
            </div>
            <div className="row">
            <button onClick={()=>sendChar("+alt+right")}><ArrowForwardIcon fontSize="inherit"/> <text>forward</text> </button>
            <button onClick={()=>sendChar("left")}><ArrowBackIosIcon fontSize="inherit"/> <text>left</text> </button>
            <button onClick={()=>sendChar("+down")}><KeyboardArrowDownIcon fontSize="inherit"/> <text>down</text> </button> 
            <button onClick={()=>sendChar("+right")}><ArrowForwardIosIcon fontSize="inherit"/> <text>right</text> </button>
            <button onClick={()=>sendChar("+ctrl+alt+down")}><VolumeDownIcon fontSize="inherit"/> <text>vol-</text> </button>
            </div>
            <div className="row">
                <button onClick={()=>sendChar("+alt+win+del")}><PowerSettingsNewIcon fontSize="inherit"/> <text></text> </button> 
                <button onClick={()=>sendChar("shift+tab")} className="img-hor-vert"><KeyboardTabIcon fontSize="inherit"/> <text></text> </button> 
                <button onClick={()=>sendChar("enter")}><KeyboardReturnIcon fontSize="inherit"/> <text></text> </button>
                <button onClick={()=>sendChar("tab")}><KeyboardTabIcon fontSize="inherit"/> <text></text> </button> 
                <button onClick={enableKeyboard}><KeyboardIcon fontSize="inherit"/> <text></text> </button> 
            </div>
        </div>
    )
}