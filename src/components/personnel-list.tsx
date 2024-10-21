"use client";

import { use, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Personnel } from "@/lib/data";
import { onValue, ref, remove, set } from "firebase/database";
import { database } from "@/helpers/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function PersonnelList() {
  const [personnel, setPersonnel] = useState({} as Personnel);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteRfid, setDeleteRfid] = useState("");

  useEffect(() => {
    const dbRef = ref(database, "Users");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const personnelData: Personnel = snapshot.val();
      setPersonnel(personnelData);
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []); // Only run once, no need for deps here

  const handleDelete = (rfid: string) => {
    try {
      remove(ref(database, `Users/${rfid}`));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteRfid("");
      window.location.reload();
    }
  };
  return (
    <div className="space-y-4 w-full">
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>Delete Personnel</DialogHeader>
          Are you sure you want to delete this personnel?
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => handleDelete(deleteRfid)}
            >
              Delete
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h3 className="text-2xl font-bold">Personnel List</h3>
      <ScrollArea className="h-[400px] rounded-md border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 bg-background"></TableHead>
              <TableHead className="sticky top-0 bg-background">Name</TableHead>
              <TableHead className="sticky top-0 bg-background">RFID</TableHead>
              <TableHead className="sticky top-0 bg-background">Vest</TableHead>
              <TableHead className="sticky top-0 bg-background">
                Position
              </TableHead>
              <TableHead className="sticky top-0 bg-background">
                Restriction
              </TableHead>
              <TableHead className="sticky top-0 bg-background">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(personnel).map((person) => (
              <TableRow key={person.rfid}>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{`${person.firstName} ${person.lastName}`}</TableCell>
                <TableCell>{person.rfid}</TableCell>
                <TableCell>{person.vest}</TableCell>
                <TableCell>{person.position}</TableCell>
                <TableCell>{person.restrictedFloors}</TableCell>
                <TableCell>{person.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
