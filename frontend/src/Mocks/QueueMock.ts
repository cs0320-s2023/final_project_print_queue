export interface QueueCard {
  name: string;
  time: string;
  printer: string;
  started: boolean;
  status: string;
  id: string;
}

const QueueItems: QueueCard[] = [];

// const QueueItems: QueueCard[] = [
//   {
//     name: "Ivan Pineda-Dominguez",
//     time: "01:23:00",
//     printer: "Printer 1",
//     started: true,
//     status: "Printing",
//     id: "1",
//   },
//   {
//     name: "Milo Kron",
//     time: "01:12:00",
//     printer: "Printer 2",
//     started: true,
//     status: "Printing",
//     id: "2",
//   },
//   {
//     name: "Patrick Otriz",
//     time: "00:10:00",
//     printer: "Printer 3",
//     started: false,
//     status: "Pending",
//     id: "3",
//   },
//   {
//     name: "Mebele Onwuaduegbo",
//     time: "00:00:00",
//     printer: "",
//     started: false,
//     status: "In Queue",
//     id: "4",
//   },
// ];

export default QueueItems;
