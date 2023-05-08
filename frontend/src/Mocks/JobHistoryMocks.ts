interface History {
  user: string;
  date: string 
  filename: string;
  time: string;
  id: string;
}

const History: History[] = [
  {
    user: "ipinedad",
    date: "04/18/2023",
    filename: "randomFile.gcode",
    time: "01:23:00",
    id: "1",
  },
  
  {
    user: "conwuadu",
    date: "04/18/2023",
    filename: "randomFile.gcode",
    time: "01:45:00",
    id: "3",
  },
  {
    user: "mkron",
    date: "04/18/2023",
    filename: "randomFile.gcode",
    time: "02:15:00",
    id: "5",
  },
  {
    user: "portiz",
    date: "04/18/2023",
    filename: "randomFile.gcode",
    time: "01:30:00",
    id: "9",
  },
  {
    user: "ctrains",
    date: "04/18/2023",
    filename: "randomFile.gcode",
    time: "01:45:00",
    id: "7",
  },
];

export default History;