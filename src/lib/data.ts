export interface Personnel {
  firstName: string;
  lastName: string;
  rfid: string;
  vest: number;
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
