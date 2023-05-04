// import printer1 from "../assets/printer1.png";
// import printer2 from "../assets/printer2.png";
import printer1 from "../assets/printer3.jpg"
import printer2 from "../assets/printer4.jpg"
import printer3 from "../assets/printer3.jpg"
import printer4 from "../assets/printer4.jpg"
import printer5 from "../assets/printer5.jpg"
import printer6 from "../assets/printer6.jpg"
import printer7 from "../assets/printer7.jpg"
import printer8 from "../assets/printer8.jpg"
import printer9 from "../assets/printer9.jpg"

interface Printer {
  name: string;
  filament: string;
  status: string;
  timeStarted: string;
  currentJob? : string
  id: string;
  image: string;
}

const printers: Printer[] = [
  {
    name: "Printer 1",
    filament: "Green",
    status: "busy",
    timeStarted: "01:23:00",
    id: "1",
    image: printer1,
  },
  {
    name: "Printer 2",
    filament: "Red",
    status: "available",
    timeStarted: "01:23:00",
    id: "2",
    image: printer2,
  },
  {
    name: "Printer 3",
    filament: "Yellow",
    status: "maintenance",
    timeStarted: "00:00:00",
    id: "3",
    image: printer3,
  },
  {
    name: "Printer 4",
    filament: "Purple",
    timeStarted: "01:12:34",
    status: "pending",
    id: "4",
    image: printer4,
  },
  {
    name: "Printer 5",
    filament: "Blue",
    timeStarted: "01:23:00",
    status: "reserved",
    id: "5",
    image: printer5,
  },
  {
    name: "Printer 6",
    filament: "Black",
    timeStarted: "00:00:00",
    status: "available",
    id: "6",
    image: printer6,
  },
  {
    name: "Printer 7",
    filament: "Green",
    timeStarted: "00:00:00",
    status: "available",
    id: "7",
    image: printer7,
  },
  {
    name: "Printer 8",
    filament: "Red",
    timeStarted: "01:23:00",
    status: "busy",
    id: "8",
    image: printer8,
  },
  {
    name: "Printer 9",
    filament: "Red",
    timeStarted: "01:23:00",
    status: "pending",
    id: "9",
    image: printer9,
  },
];

export default printers;
