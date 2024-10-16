"use client";

import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {personnelData} from "@/lib/data";

export function FloorList() {
  const [floorAssignments, setFloorAssignments] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const assignments: Record<string, string[]> = {};
    const maxFloor = 4;

    // Initialize all floors
    for (let i = 1; i <= maxFloor; i++) {
      assignments[i.toString()] = [];
    }

    personnelData.forEach((person) => {
      if (person.status === "Active") {
        assignments[person.currentFloor].push(
          `${person.firstName} ${person.lastName}`
        );
      }
    });
    setFloorAssignments(assignments);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(floorAssignments)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([floor, personnel]) => (
          <Card key={floor} className="w-full">
            <CardHeader>
              <CardTitle>Floor {floor}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {personnel.length > 0 ? (
                  <ul className="space-y-2">
                    {personnel.map((person, index) => (
                      <li key={index} className="text-sm border-b">
                        {person}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Floor is empty
                  </p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
