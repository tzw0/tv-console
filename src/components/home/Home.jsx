import "./home.scss"
// import QRCode from 'react-qr-code';
import qrCode from "./qr-code.png"

export default function Home() {
    const pasteURL = window.location.href.replaceAll("/rat-tv","")

    return (
        <div className="home">
            <h2>
                Welcome to
            </h2>
            <h1>
                Rat-TV
            </h1>


            <p>
                Type in the URL below or goto: <strong>{pasteURL}</strong> from another device.
            </p>
            <br />
            <br />

            {/* <QRCode
                title="RatTV"
                value={"http://localhost:3000/rat-tv/paste"}
                bgColor={"black"}
                fgColor={"white"}
                size={"40%"}
            /> */}
            <img src={qrCode} alt="" width={"300px"} />
        </div>
    )
}