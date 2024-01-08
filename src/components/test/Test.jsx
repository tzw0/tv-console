import "./styles.css";
import DeviceMotionTest from "./DeviceMotionTest";
import DeviceOrientationTest from "./DeviceOrientationTest.jsx";
export default function Test() {
  return (
    <div className="test">
        <h1>TEST</h1>
      <DeviceMotionTest />
      <DeviceOrientationTest />
    </div>
  );
}
