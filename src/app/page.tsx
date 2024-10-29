"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { eventsData } from "@/lib/data";
import { OctagonAlert } from "lucide-react";
import { onValue, ref, set } from "firebase/database";
import { database } from "@/helpers/firebase";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Vest = {
  accident: boolean;
  name: string;
};

type Vests = Record<string, Vest>;

type User = {
  firstName: string;
  lastName: string;
  vest: string;
};

type Users = Record<string, User>;

export default function Dashboard() {
  const [vestList, setVestList] = useState<Vests | null>(null);
  const [userList, setUserList] = useState<Users | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const totalPersonnel = 10;
  const activePersonnel = 10;

  const findPersonByVestNumber = (vestNumber: string) => {
    if (userList) {
      return Object.values(userList).find((user) => user.vest === vestNumber);
    }
    return null;
  };

  useEffect(() => {
    const vestDbRef = ref(database, "Vests");
    const userDbRef = ref(database, "Users");

    const vestUnsubscribe = onValue(vestDbRef, (vestSnapshot) => {
      if (!vestSnapshot.exists()) return;
      const vestData: Vests = vestSnapshot.val();
      setVestList(vestData);
    });

    const userUnsubscribe = onValue(userDbRef, (userSnapshot) => {
      if (!userSnapshot.exists()) return;
      const userData: Users = userSnapshot.val();
      setUserList(userData);
    });

    return () => {
      vestUnsubscribe();
      userUnsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Vest List:", vestList);
    if (userList) {
      console.log(Object.values(userList).find((user) => (user.vest = "1")));
    }
  });

  useEffect(() => {
    if (
      vestList &&
      Object.values(vestList).some((vest) => vest.accident === true)
    ) {
      setAlertDialogOpen(true);
    }
  }, [vestList]);

  useEffect(() => {
    if (
      vestList &&
      Object.values(vestList).every((vest) => vest.accident === false)
    ) {
      setAlertDialogOpen(false);
    }
  }, [vestList]);

  const handleResolve = (vestNumber: string) => {
    set(ref(database, "Vests/" + vestNumber), {
      accident: false,
    });
    if (vestList) {
      setVestList({
        ...vestList,
        [vestNumber]: {
          accident: false,
          name: vestList[vestNumber].name,
        },
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent>
          {" "}
          <DialogHeader>
            <DialogTitle>Accident Tracker</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-5 w-full">
            {vestList &&
              Object.entries(vestList).map(
                ([vestNumber, vest]: [string, Vest]) =>
                  vest.accident === true ? (
                    <div
                      key={vestNumber}
                      className="w-full flex gap-x-3 items-center justify-between border-t pt-2"
                    >
                      <span>
                        {findPersonByVestNumber(vestNumber)
                          ? `${findPersonByVestNumber(vestNumber)?.firstName} ${
                              findPersonByVestNumber(vestNumber)?.lastName
                            }`
                          : `Vest ${vestNumber}`}
                      </span>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleResolve(vestNumber)}
                      >
                        Resolve
                      </Button>
                    </div>
                  ) : null
              )}
          </div>
        </DialogContent>
      </Dialog>

      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Personnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPersonnel}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Personnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePersonnel}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventsData.map((event, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{true ? `asdd sdd` : "Unknown"}</TableCell>
                      <TableCell className="flex gap-x-2">
                        {event.description}{" "}
                        {event.type === "accident" ? (
                          <span className="text-red-500">
                            <OctagonAlert />
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {new Date(event.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
