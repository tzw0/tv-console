/* InterpretGesture will check if the gesture is one of these:
 0. Tracking current location.
 1. basic movement (vectorX, vectorY)
 2. pinch zoom in/out at 0. 2 finger pinch/widen almost opp vector with threshold.
 3. panning and scrolling. 2 finger almost same vectore with threshold.
 4. switch tab. 3 finger movement.
*/

class vector {
    startX: number
    startY: number
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.startX = 0;
        this.startY = 0;
    }
    setStartPoint(startX: number, startY: number) {
        this.startX = startX
        this.startY = startY
    }
    GetVectorTo(pos: vector): vector {
        const v: vector = new vector(pos.x - this.x, pos.y - this.y)
        v.setStartPoint(this.x, this.y)
        return v
    }
    getMagnitude(): number {
        return Math.round(Math.sqrt(this.x * this.x + this.y * this.y))
    }
    getDirection(): direction {
        return new direction((Math.atan(Number(this.GetY() / this.GetX())) * 180 / Math.PI + 360) % 360)
    }
    getAverage(v: vector): vector {
        return new vector((this.x + v.x) / 2, this.y + v.y / 2)
    }
    ToString(): string {
        return `${this.x.toFixed(2)},${this.y.toFixed(2)}`
    }
    GetX(): number {
        return this.x
    }
    GetY(): number {
        return this.y
    }

}

class direction {
    degrees: number

    constructor(degrees: number) {
        this.degrees = degrees
    }

    Deg(): number {
        this.degrees = (this.degrees + 360) % 360
        return this.degrees
    }

    Difference(d: direction): number {
        return (Math.abs(this.Deg() - d.Deg() + 360)) % 360
    }

    Flip(): direction {
        return new direction((this.degrees + 180) % 360)
    }
}

enum gestureType {
    movement = 1,
    scrolling,
    zoomin, // magnitude vector betwen 2 points
    zoomout, // magnitude vector betwen 2 points
    panning, // scrolling
    utility, // switch tabs?
    invalid,
}

class Gesture {
    type: gestureType
    vector: vector

    constructor(vectors: vector[]) {
        switch (vectors.length) {
            case 1:
                this.type = gestureType.movement
                this.vector = vectors[0]
                break;
            default:
                this.type = gestureType.invalid
                this.vector = new vector(0, 0)
        }
    }

    SetScroll() {
        this.type = gestureType.scrolling
    }

    ToString(): string {
        return this.vector.ToString() + "," + this.type
    }
}

export default class Controller {
    currentPosition: vector
    displayText: string
    lastSentTime: number
    touchStart: vector
    touchStartTime: number

    constructor() {
        this.currentPosition = new vector(0, 0)
        this.displayText = ""
        this.lastSentTime = 0
        this.touchStart = new vector(0, 0)
        this.touchStartTime = 0
    }

    SendGesture(e: TouchEvent, ws: WebSocket, isScroll: boolean) {
        if (ws.readyState === WebSocket.CLOSED) {
            return
        }

        const nextPos = new vector(Number(e.touches.item(0)?.clientX), Number(e.touches.item(0)?.clientY))
        if (this.currentPosition.GetX() === 0 && this.currentPosition.GetY() === 0) {
            this.currentPosition = nextPos
            return
        }
        if (this.lastSentTime + 10 > e.timeStamp) {
            return
        }
        const gesture = new Gesture([this.currentPosition.GetVectorTo(nextPos)])
        if (isScroll) gesture.SetScroll()
        ws.send(gesture.ToString())
        console.log(gesture.ToString())
        this.lastSentTime = e.timeStamp
    }

    GetClickType(e: TouchEvent, ws: WebSocket) {
        const nextPos = new vector(Number(e.changedTouches.item(0)?.clientX), Number(e.changedTouches.item(0)?.clientY))
        const mag = this.touchStart.GetVectorTo(nextPos).getMagnitude()
        console.log(mag, e.timeStamp, this.touchStartTime)
        if (mag > 5) {
            // Not a click
            return
        }
        if (this.touchStartTime + 500 > e.timeStamp) {
            console.log("left click")
            ws.send("left-click")
            return
        }

        ws.send("right-click")
        console.log("right click")
    }

    EnterKey(e: KeyboardEvent, ws: WebSocket) {
        if (e.which < 32 && e.which !== 8) {
            return
        }

        if (e.key === "Unidentified") {
            return
        }

        ws.send(String(e.key))
        if (e.which === 8) {
            if (this.displayText.length > 0) {
                this.displayText = this.displayText.slice(0, this.displayText.length - 1)
            }
        } else {
            this.displayText += e.key
        }
    }

    SendChar(str: string, isPasted: boolean, ws: WebSocket): string {
        if (str === null || this.displayText === null) {
            return ""
        }
        var ogStr = str
        if (isPasted) {
            str = "*paste*" + str
        }

        if (str === "Unidentified") return ""

        if (str === "Backspace") {
            if (this.displayText.length > 0) {
                // Backspaced.
                this.displayText = this.displayText.slice(0, this.displayText.length - 1)
            }
        }
        else if (str === "Enter") {
            this.displayText = ""
        }
        else if (str.length === 1) {
            this.displayText += str
        }

        if (isPasted) {
            ws.send(str)
            this.displayText = ogStr
            return `pasted (${ogStr})`
        }

        ws.send(str)
        return `send (${str})`
    }

    CheckCtrlChars(e: KeyboardEvent, ws: WebSocket): string {
        if (e.which < 32) {

            if (e.which === 13) {
                this.displayText = ""
                return e.key
            }

            console.log(e.code, e)
            ws.send(e.key)
            if (e.which === 8) {
                if (this.displayText.length > 0) {
                    this.displayText = this.displayText.slice(0, this.displayText.length - 1)
                }
                return e.key
            }

            return ""
        }

        return ""
    }

    GetDisplayText(): string {
        return this.displayText
    }

    InputText(str: string, ws: WebSocket) {
        ws.send("*paste*" + str)
        this.displayText += str
    }

    SetPosition(e: TouchEvent, ws: WebSocket) {
        const nextPos = new vector(Number(e.touches.item(0)?.clientX), Number(e.touches.item(0)?.clientY))
        this.touchStart = nextPos
        this.touchStartTime = e.timeStamp
        this.currentPosition = nextPos
    }
}
