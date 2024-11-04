"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { database } from "@/helpers/firebase";

interface RFIDStatus {
  active: boolean;
}

interface User {
  firstName: string;
  lastName: string;
}

interface FloorAssignments {
  [key: string]: string[];
}

const FloorList: React.FC = () => {
  const [floorAssignments, setFloorAssignments] = useState<FloorAssignments>({
    "1": [],
    "2": [],
    "3": [],
    "4": [],
  });

  useEffect(() => {
    const floor1Ref = ref(database, "Floor1");

    // Listen to all changes on Floor1
    const unsubscribeFloor1 = onValue(
      floor1Ref,
      (floor1Snapshot: DataSnapshot) => {
        const floor1Data = floor1Snapshot.val();
        const activeUsers: string[] = [];

        // Process each RFID on Floor1
        Object.entries(floor1Data || {}).forEach(([rfidId, rfidData]) => {
          const status = rfidData as RFIDStatus;

          if (status?.active === true) {
            // Get user details for active RFIDs
            const userRef = ref(database, `Users/${rfidId}`);
            onValue(userRef, (userSnapshot: DataSnapshot) => {
              const userData = userSnapshot.val() as User;

              if (userData) {
                const fullName = `${userData.firstName} ${userData.lastName}`;
                if (!activeUsers.includes(fullName)) {
                  activeUsers.push(fullName);
                }
              }

              // Update floor assignments after processing all RFIDs
              setFloorAssignments((prev) => ({
                ...prev,
                "1": activeUsers,
              }));
            });
          }
        });

        // If no active users are found, set floor 1 to empty
        if (activeUsers.length === 0) {
          setFloorAssignments((prev) => ({
            ...prev,
            "1": [],
          }));
        }
      }
    );

    // Cleanup
    return () => {
      unsubscribeFloor1();
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(floorAssignments)
        .sort(([a], [b]) => Number(a) - Number(b))
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
                      <li key={index} className="text-sm border-b pb-2">
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
};

export default FloorList;
