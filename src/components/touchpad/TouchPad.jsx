import "./touchpad.scss"
import { useRef, useEffect, useState, useMemo } from "react";
import Controller from "./parser";
// import PanelManager from "../panel/Panel";
import MediaController from "../media/Media";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

export default function TouchPad() {
    const [display, setDisplay] = useState("");
    const [keyControler, setKeyController] = useState(0);
    const [log, setLog] = useState("");
    const divRef = useRef();
    const scrollupRef = useRef();
    const scrolldownRef = useRef();
    const inputRef = useRef();
    const keyboardEventWS = useMemo(() => new WebSocket(`ws://${process.env.REACT_APP_IP}:8000`), []);
    const mouseEventWS = useMemo(() => new WebSocket(`ws://${process.env.REACT_APP_IP}:8001`), []);
    const controller = useMemo(() => new Controller(), []);

    console.log("server envs:", process.env)
    console.log("server ip:", process.env.REACT_APP_IP)
    useEffect(() => {
        // 👇 Get the DOM element from the React element
        const element = divRef.current;
        const scrollup = scrollupRef.current;
        const scrolldown = scrolldownRef.current;
        const inputElement = inputRef.current;
        if (!element || !scrollup || !scrolldown || !inputElement) return;

        keyboardEventWS.addEventListener('open', function (e) {
            console.log("keyboard event ws connection established")
        })
        mouseEventWS.addEventListener('open', function (e) {
            console.log("mouse event ws connection established")
        })

        const handleGesture = (e) => {
            controller.SendGesture(e, mouseEventWS, false)
        };

        // const handleScroll = (e) => {
        //     controller.SendGesture(e, mouseEventWS, true)
        // }

        const handleClick = (e) => {
            controller.GetClickType(e, mouseEventWS)
        }

        const setPosition = (e) => {
            inputElement.blur()
            controller.ClearInput()
            setDisplay(controller.GetDisplayText())

            controller.SetPosition(e, mouseEventWS)
        }

        const scrollupAction = (e) => {
            controller.scrollUp(mouseEventWS)
        }

        const scrolldownAction = (e) => {
            controller.scrolldown(mouseEventWS)
        }

        scrolldown.addEventListener("touchstart", scrolldownAction);
        scrollup.addEventListener("touchstart", scrollupAction);

        element.addEventListener("touchstart", setPosition);
        element.addEventListener("touchmove", handleGesture);
        element.addEventListener("touchend", handleClick);
        return () => {
            scrollup.removeEventListener("touchstart", scrollupAction);
            scrolldown.removeEventListener("touchstart", scrolldownAction);

            element.removeEventListener("touchstart", setPosition);
            element.removeEventListener("touchmove", handleGesture);
            element.removeEventListener("touchend", handleClick);
        };

    }, [keyboardEventWS, controller, mouseEventWS]);

    const handleCharInput = (e) => {
        const logInfo = controller.SendChar(e.key, false, keyboardEventWS)
        setDisplay(controller.GetDisplayText())
        if (logInfo !== "") setLog((e.timeStamp % 987).toFixed(0) + ", char, " + logInfo)
    }

    const handleMobileInput = (e) => {
        const isPasted = e.nativeEvent.data !== null && e.nativeEvent.data.length > 1
        const logInfo = controller.SendChar(e.nativeEvent.data, isPasted, keyboardEventWS)
        console.log(controller.GetDisplayText())
        setDisplay(controller.GetDisplayText())
        if (logInfo !== "") setLog((e.timeStamp % 987).toFixed(0) + ", input, " + logInfo)
    }

    return (
        <div className="touchpad" >
            <div className="key-inputs">
            {(keyControler)?
                <MediaController enableKeyboard={()=>setKeyController(0)}
                sendChar={(char)=>{
                    controller.SendChar("*raw-command*"+char, false, keyboardEventWS)}}
                 />:<div></div>}
                <div className={(keyControler)?"keyboard close":"keyboard"}>
                    <input type="text" onKeyDown={handleCharInput} onInput={handleMobileInput} value={"_"}
                    ref={inputRef}></input>
                    <div className="text">
                        <code>*Tap here to open Keyboard*</code>
                        <h3>{display}</h3>
                        <div className="sep"></div>
                        <text><br /><br /> {log}</text>
                    </div>
                    <div className="media-controller" onClick={() => setKeyController(1)}><VideogameAssetIcon fontSize="inherit"/></div>
                </div>
            </div>
            <div className="event-pickup" ref={divRef} >
                
            </div>

            {/* <PanelManager SendChar={(char)=>{
                controller.SendChar(char, false, keyboardEventWS)
            }}/> */}

            <div className="scroll-controller-up" ref={scrollupRef}><KeyboardDoubleArrowUpIcon/></div>
            <div className="scroll-controller-down" ref={scrolldownRef}><KeyboardDoubleArrowDownIcon/></div>
        </div>
    )
}
