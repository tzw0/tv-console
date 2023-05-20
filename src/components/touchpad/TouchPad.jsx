import "./touchpad.scss"
import { useRef, useEffect, useState, useMemo } from "react";
import Controller from "./parser";
export default function TouchPad() {
    const [display, setDisplay] = useState("");
    const [inputText, setInputText] = useState("");
    const [log, setLog] = useState("");
    const divRef = useRef();
    const scrollRef = useRef();
    const keyboardEventWS = useMemo(() => new WebSocket('ws://192.168.18.2:8000'), []);
    const mouseEventWS = useMemo(() => new WebSocket('ws://192.168.18.2:8001'), []);
    const controller = useMemo(() => new Controller(), []);

    useEffect(() => {
        // 👇 Get the DOM element from the React element
        const element = divRef.current;
        const scroller = scrollRef.current;
        if (!element || !scroller) return;

        keyboardEventWS.addEventListener('open', function (e) {
            console.log("keyboard event ws connection established")
        })
        mouseEventWS.addEventListener('open', function (e) {
            console.log("mouse event ws connection established")
        })

        const handleGesture = (e) => {
            controller.SendGesture(e, mouseEventWS, false)
        };

        const handleScroll = (e) => {
            controller.SendGesture(e, mouseEventWS, true)
        }

        const handleClick = (e) => {
            controller.GetClickType(e, mouseEventWS)
        }

        const setPosition = (e) => {
            controller.SetPosition(e, mouseEventWS)
        }

        scroller.addEventListener("touchstart", setPosition);
        element.addEventListener("touchstart", setPosition);
        scroller.addEventListener("touchmove", handleScroll)
        element.addEventListener("touchmove", handleGesture);
        scroller.addEventListener("touchend", handleClick);
        element.addEventListener("touchend", handleClick);
        return () => {
            scroller.removeEventListener("touchstart", setPosition);
            element.removeEventListener("touchstart", setPosition);
            scroller.removeEventListener("touchmove", handleScroll)
            element.removeEventListener("touchmove", handleGesture);
            scroller.removeEventListener("touchend", handleClick);
            element.removeEventListener("touchend", handleClick);
        };

    }, [keyboardEventWS, controller, mouseEventWS]);

    const handleSubmit = (e) => {
        console.log(inputText)
        controller.InputText(inputText, keyboardEventWS)
        e.preventDefault()
        setInputText("")
        setDisplay(controller.GetDisplayText())
    }

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
            <div className="paste">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="<paste here>"
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText} />
                </form>
            </div>
            <div className="event-pickup" ref={divRef} tabIndex="0">
                <input type="text" onKeyDown={handleCharInput} onInput={handleMobileInput} value={"_"}></input>
                <div className="text">
                    <code>*Tap here to open Keyboard*</code>
                    <h3>{display}</h3>
                    <div className="sep"></div>
                    <text><br /><br /> {log}</text>
                </div>
            </div>
            <div className="control-panel">
                <div className="scroll-controller" ref={scrollRef}>
                </div>
            </div>
        </div>
    )
}
