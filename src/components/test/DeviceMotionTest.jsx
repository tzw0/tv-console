import DeviceMotion from "react-device-motion";

const DeviceMotionTest = () => (
  <DeviceMotion>
    {({
      acceleration,
      accelerationIncludingGravity,
      interval,
      rotationRate
    }) => (
      <div>
        {`Acceleration: ${JSON.stringify(acceleration)}`}
        {`Acceleration including gravity: ${JSON.stringify(
          accelerationIncludingGravity
        )}`}
        {`Interval: ${interval}`}
        {`Rotation rate: ${JSON.stringify(rotationRate)}`}
      </div>
    )}
  </DeviceMotion>
);

export default DeviceMotionTest;
