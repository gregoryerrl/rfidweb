export interface Personnel {
  firstName: string;
  lastName: string;
  rfid: string;
  restrictedFloors: string[];
  status: string;
  position: string;
  currentFloor: string;
}

export interface Event {
  rfid: string;
  type: string;
  description: string;
  timestamp: string;
}

export const personnelData: Personnel[] = [
  {
    firstName: "John",
    lastName: "Doe",
    rfid: "12345",
    restrictedFloors: ["1", "2"],
    status: "Active",
    position: "Electrician",
    currentFloor: "1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    rfid: "67890",
    restrictedFloors: ["3"],
    status: "Active",
    position: "Plumber",
    currentFloor: "1",
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    rfid: "24680",
    restrictedFloors: ["2"],
    status: "Active",
    position: "Carpenter",
    currentFloor: "1",
  },
  {
    firstName: "Alice",
    lastName: "Williams",
    rfid: "13579",
    restrictedFloors: ["4"],
    status: "Active",
    position: "Painter",
    currentFloor: "1",
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
    rfid: "97531",
    restrictedFloors: ["1", "3"],
    status: "Active",
    position: "Mason",
    currentFloor: "1",
  },
  {
    firstName: "Eva",
    lastName: "Davis",
    rfid: "86420",
    restrictedFloors: ["2", "4"],
    status: "Active",
    position: "Welder",
    currentFloor: "1",
  },
  {
    firstName: "Frank",
    lastName: "Miller",
    rfid: "75319",
    restrictedFloors: [],
    status: "Active",
    position: "Foreman",
    currentFloor: "1",
  },
  {
    firstName: "Grace",
    lastName: "Taylor",
    rfid: "95173",
    restrictedFloors: ["1"],
    status: "Active",
    position: "Electrician",
    currentFloor: "1",
  },
  {
    firstName: "Henry",
    lastName: "Anderson",
    rfid: "15973",
    restrictedFloors: ["3", "4"],
    status: "Active",
    position: "Plumber",
    currentFloor: "1",
  },
  {
    firstName: "Ivy",
    lastName: "Thomas",
    rfid: "35791",
    restrictedFloors: ["2"],
    status: "Active",
    position: "Carpenter",
    currentFloor: "1",
  },
];

export const eventsData: Event[] = [
  {
    rfid: "12345",
    type: "accident",
    description: "Fell down",
    timestamp: "2022-01-01T10:00:00Z",
  },
  {
    rfid: "67890",
    type: "tracking",
    description: "Person entered floor 1",
    timestamp: "2022-01-01T10:00:00Z",
  },
  {
    rfid: "24680",
    type: "tracking",
    description: "Person entered floor 1",
    timestamp: "2022-01-01T10:00:00Z",
  },
];
