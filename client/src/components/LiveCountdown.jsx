import { useEffect, useState } from "react";
import { getCountdown } from "../utils/time";

function LiveCountdown({ datetime }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((v) => v + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{getCountdown(datetime)}</span>;
}

export default LiveCountdown;