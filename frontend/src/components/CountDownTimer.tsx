import Countdown, { zeroPad } from "react-countdown";
import { Printer, Status } from "../utils/types";
import { Text } from "@chakra-ui/react";
import { useState } from "react";

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface CountDownTimerProps {
  printer: Printer;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setJobFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

function CountDownTimer({
  printer,
  setUpdate,
  setJobFinished,
}: CountDownTimerProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const renderer = ({ hours, minutes, seconds, completed }: TimerProps) => {
    if (completed) {
      // Render a completed state
      return (
        <span style={{ color: isCompleted ? "red" : "" }}>
          -{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const renderCounter = () => {
    const moment = require("moment");
    const timestamp = moment(printer.timeStarted, "HH:mm:ss.SSSSSSSSS");

    if (printer.currentJob?.printTime) {
      if (printer.status == Status.PENDING) {
        return (
          <Countdown
            date={timestamp.subtract(4, "hours").add(5, "seconds").toDate()}
            overtime={true}
            onComplete={() => {
              setJobFinished(true);
            }}
            renderer={renderer}
          />
        );
      } else {
        return (
          <Countdown
            date={timestamp
              .subtract(4, "hours")
              .add(printer.currentJob.printTime, "seconds")
              .toDate()}
            overtime={true}
            onComplete={() => {
              setJobFinished(true);
            }}
            renderer={renderer}
          />
        );
      }
    } else {
      return <Text color="red.600">Busy</Text>;
    }
  };

  return <div>{renderCounter()} </div>;
}

export default CountDownTimer;
