import printer1 from "../assets/printer1.png"
import printer2 from "../assets/printer2.png"



interface Printer {
  name: string;
  time: string;
  status: string;
  color: string;
  id: string;
  image: string;
}


const printers: Printer[] = [
  {
    name: "Printer 1",
    time: "01:23:00",
    status: "In Use",
    color: "Green",
    id: "1",
    image: printer1,
  },
  {
    name: "Printer 2",
    time: "01:23:00",
    status: "In Use",
    color: "Red",
    id: "2",
    image: "../assets/printer1.png",
  },
  {
    name: "Printer 3",
    time: "00:00:00",
    status: "Available",
    color: "Yellow",
    id: "3",
    image: "../assets/printer1.png",
  },
  {
    name: "Printer 4",
    time: "01:12:34",
    status: "In Use",
    color: "Purple",
    id: "4",
    image: "../assets/printer1.png",
  },
  {
    name: "Printer 5",
    time: "01:23:00",
    status: "Under Maintenance",
    color: "Blue",
    id: "5",
    image: "../assets/printer1.png",
  },
  {
    name: "Printer 6",
    time: "00:00:00",
    status: "Available",
    color: "Black",
    id: "6",
    image: "../assets/printer1.png",
  },
  {
    name: "Printer 7",
    time: "00:00:00",
    status: "Available",
    color: "Green",
    id: "7",
    image: "../assets/printer1.png",
  },
  {
    name: "Printer 8",
    time: "01:23:00",
    status: "Reserved",
    color: "Red",
    id: "8",
    image: "../assets/printer1.png",
  },
];

export default printers;
