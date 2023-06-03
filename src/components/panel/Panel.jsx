import "./panel.scss"
import { useRef, useEffect, useState, useMemo } from "react";
export default function PanelManager(params) {
    const {sendChar} = params
    const [expanded, setExpanded] = useState(true)

    if (!expanded) {
        return (
            <div className="inactive-panel-manager" onClick={()=>setExpanded(true)}>
                <div className="toggle">
                    ▲ &nbsp;&nbsp; tap to collapse expand keys &nbsp;&nbsp; ▲
                </div>
            </div>
        )
    }

    return (
            <div className="panel-manager" >
                <div className="toggle" onClick={()=>setExpanded(false)}>▼ &nbsp;&nbsp; tap to collapse function keys &nbsp;&nbsp; ▼</div> 
                <div className="panel">
                    <div className="row">
                        <button>aaaa</button>
                        <button>bbbb</button>
                        <button>cccc</button>
                        <button>dddd</button>
                        <button>eeee</button>

                        <button>aaaa2</button>
                        <button>bbbb2</button>
                        <button>cccc2</button>
                        <button>dddd2</button>
                        <button>eeee2</button>

                        <button>aaaa3</button>
                        <button>bbbb3</button>
                        <button>cccc3</button>
                        <button>dddd3</button>
                        <button>eeee3</button>
                    </div>
                </div>
            </div>
    )
}