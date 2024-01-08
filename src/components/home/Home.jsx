import "./home.scss"
// import QRCode from 'react-qr-code';
// import qrCode from "./qr-code.png"
import Bookmarks from "./Bookmarks"
import QRCode from 'react-qr-code';

export default function Home() {
    const pasteURL = window.location.href.replaceAll("/rat-tv","")

    return (
        <div className="home">
            <p>
                Welcome to
            </p>
            <h1>
                Rat-TV
            </h1>
            <p>
                Type in the URL below or goto: <strong>{pasteURL}</strong> from another device.
            </p>

        <Bookmarks/>
        <br />

            <QRCode value={pasteURL} size={"13%"} />


            {/* <QRCode
                title="RatTV"
                value={"http://localhost:3000/rat-tv/paste"}
                bgColor={"black"}
                fgColor={"white"}
                size={"40%"}
            /> */}
            {/* <br /> */}
            {/* <img src={qrCode} alt="" width={"240px"} /> */}
        </div>
    )
}