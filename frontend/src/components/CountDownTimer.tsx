import Countdown, { zeroPad } from "react-countdown";
import { Printer, Status } from "../utils/types";
import { Text } from "@chakra-ui/react";

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface CountDownTimerProps {
  printer: Printer;
}

function CountDownTimer({ printer }: CountDownTimerProps) {
  const renderer = ({ hours, minutes, seconds, completed }: TimerProps) => {
    if (completed) {
      // Render a completed state
      return <Text>Completed</Text>;
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
    const momentObject = moment(printer.timeStarted, "HH:mm:ss");
    momentObject.subtract(4, "hours"); // Time difference of server deployed region.

    if (printer.currentJob?.printTime) {
      // let busyEndtime = momentObject;
      if (printer.status == Status.PENDING) {
        // use custom delay time if user provided it
        console.log("Included Delay");
        // let pendingEndtime = momentObject.add(5, "minutes").utc().format();
        return (
          <Countdown
            date={momentObject.add(5, "minutes").utc().format()}
            renderer={renderer}
          />
        );
      } else {
        return (
          <Countdown
            date={momentObject
              .add(printer.currentJob.printTime, "seconds")
              .utc()
              .format()}
            renderer={renderer}
          />
        );
      }
    } else {
      return <Text color="red.600">Busy</Text>;
    }
  };

  return renderCounter();
}

export default CountDownTimer;
