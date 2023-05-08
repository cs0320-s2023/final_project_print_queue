import { Printer, Status } from "../utils/types";

const printers: Printer[] = [
  {
    name: "Printer 1",
    filament: "Green",
    status: Status.BUSY,
    timeStarted: "01:23:00",
    currentJob: {
      user: "Ivan Pineda-Dominguez",
      contact: "505-918-3333",
      printTime: "01:23:00",
      timeQueued: "01:23:00",
      uid: "MINoWrrZcVf25hw0cyuNmYbWBs72",
      JobID: "2",
    },
  },
  {
    name: "Printer 2",
    filament: "Red",
    status: Status.BUSY,
    timeStarted: "01:23:00",
    currentJob: {
      user: "Milo Kron",
      contact: "505-918-3334",
      printTime: "01:23:00",
      timeQueued: "01:23:00",
      uid: "2",
      JobID: "2",
    },
  },
  {
    name: "Printer 3",
    filament: "Red",
    status: Status.AVAILABLE,
    timeStarted: "01:23:00",
    currentJob: {
      user: "Patrick Otriz",
      contact: "505-918-3335",
      printTime: "01:23:00",
      timeQueued: "01:23:00",
      // status: "Printing",
      uid: "3",
      JobID: "3",
    },
  },
  {
    name: "Printer 4",
    filament: "Red",
    status: Status.PENDING,
    timeStarted: "01:23:00",
    currentJob: {
      user: "Mebele Onwuaduegbo",
      contact: "505-918-3336",
      printTime: "01:23:00",
      timeQueued: "01:23:00",
      uid: "4",
      JobID: "4",
    },
  },
  {
    name: "Printer 5",
    filament: "Red",
    status: Status.PENDING,
    timeStarted: "01:23:00",
    currentJob: {
      user: "Ivan Pineda-Dominguez",
      contact: "505-918-3333",
      printTime: "01:23:00",
      timeQueued: "01:23:00",
      uid: "MINoWrrZcVf25hw0cyuNmYbWBs72",
      JobID: "5",
    },
  },
  {
    name: "Printer 6",
    filament: "Red",
    status: Status.BUSY,
    timeStarted: "01:23:00",
  },
  {
    name: "Printer 7",
    filament: "Red",
    status: Status.MAINTENANCE,
    timeStarted: "01:23:00",
  },
  {
    name: "Printer 8",
    filament: "Red",
    status: Status.RESERVED,
    timeStarted: "01:23:00",
  },
];

export default printers;
