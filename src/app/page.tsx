"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {personnelData, eventsData} from "@/lib/data";
import {OctagonAlert} from "lucide-react";
import {onValue, ref, set} from "firebase/database";
import {database} from "@/helpers/firebase";
import {useEffect, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

type Vest = {
  accident: boolean;
};

type Vests = Record<string, Vest>;

export default function Dashboard() {
  const [vestList, setVestList] = useState<Vests | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const totalPersonnel = personnelData.length;
  const activePersonnel = personnelData.filter(
    (p) => p.status === "Active"
  ).length;

  const findPersonnelByRfid = (rfid: string) => {
    // Find the personnel object matching the event's rfid
    return personnelData.find((personnel) => personnel.rfid === rfid);
  };

  useEffect(() => {
    const dbRef = ref(database, "Vests");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const vestData: Vests = snapshot.val();
      setVestList(vestData);

      // Vest data is correct here, so log it
      console.log("Vest data:", vestData);
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []); // Only run once, no need for deps here

  // This effect will track changes to vestList
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleResolve = (index: number) => {
    set(ref(database, "Vests/" + index), {
      accident: false,
    });
    if (vestList) {
      setVestList({
        ...vestList,
        [index.toString()]: {
          accident: false,
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
                      className="w-2/3 flex gap-x-3 items-center justify-between"
                    >
                      <span>Vest {vestNumber}</span>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleResolve(Number(vestNumber))}
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
                  const personnel = findPersonnelByRfid(event.rfid);

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {personnel
                          ? `${personnel.firstName} ${personnel.lastName}`
                          : "Unknown"}
                      </TableCell>
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
