import { useEffect, useState } from "react";
import { getCountdown } from "../utils/time";

function LiveCountdown({ date, time }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((v) => v + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{getCountdown(date, time)}</span>;
}

export default LiveCountdown;