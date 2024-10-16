"use client";

import {useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {ScrollArea} from "@/components/ui/scroll-area";
import {personnelData} from "@/lib/data";

export function PersonnelList() {
  const [personnel] = useState(personnelData);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Personnel List</h3>
      <ScrollArea className="h-[400px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 bg-background">Name</TableHead>
              <TableHead className="sticky top-0 bg-background">RFID</TableHead>
              <TableHead className="sticky top-0 bg-background">
                Restricted Floors
              </TableHead>
              <TableHead className="sticky top-0 bg-background">
                Status
              </TableHead>
              <TableHead className="sticky top-0 bg-background">
                Position
              </TableHead>
              <TableHead className="sticky top-0 bg-background">
                Current Floor
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personnel.map((person) => (
              <TableRow key={person.rfid}>
                <TableCell>{`${person.firstName} ${person.lastName}`}</TableCell>
                <TableCell>{person.rfid}</TableCell>
                <TableCell>{person.restrictedFloors.join(", ")}</TableCell>
                <TableCell>{person.status}</TableCell>
                <TableCell>{person.position}</TableCell>
                <TableCell>{person.currentFloor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
