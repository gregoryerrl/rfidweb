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

export default function Dashboard() {
  const totalPersonnel = personnelData.length;
  const activePersonnel = personnelData.filter(
    (p) => p.status === "Active"
  ).length;

  const findPersonnelByRfid = (rfid: string) => {
    // Find the personnel object matching the event's rfid
    return personnelData.find((personnel) => personnel.rfid === rfid);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
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
