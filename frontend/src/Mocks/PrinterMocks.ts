interface Printer {
  name: string;
  time: string;
  status: string;
  color: string;
  id: string;
}

const printers: Printer[] = [
  {
    name: "Printer 1",
    time: "01:23:00",
    status: "In Use",
    color: "Green",
    id: "1",
  },
  {
    name: "Printer 2",
    time: "01:23:00",
    status: "In Use",
    color: "Red",
    id: "2",
  },
  {
    name: "Printer 3",
    time: "00:00:00",
    status: "Available",
    color: "Yellow",
    id: "3",
  },
  {
    name: "Printer 4",
    time: "01:12:34",
    status: "In Use",
    color: "Purple",
    id: "4",
  },
  {
    name: "Printer 5",
    time: "01:23:00",
    status: "Under Maintenance",
    color: "Blue",
    id: "5",
  },
  {
    name: "Printer 6",
    time: "00:00:00",
    status: "Available",
    color: "Black",
    id: "6",
  },
  {
    name: "Printer 7",
    time: "00:00:00",
    status: "Available",
    color: "Green",
    id: "7",
  },
  {
    name: "Printer 8",
    time: "01:23:00",
    status: "Reserved",
    color: "Red",
    id: "8",
  },
];

export default printers;
