import { DeviceOrientation } from "react-fns";

const DeviceOrientationTest = () => (
  <DeviceOrientation
    render={({ alpha, beta, gamma, absolute }) => (
      <pre>{JSON.stringify({ alpha, beta, gamma, absolute }, null, 2)}</pre>
    )}
  />
);

export default DeviceOrientationTest;
