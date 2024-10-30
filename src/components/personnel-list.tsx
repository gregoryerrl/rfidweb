"use client";

import {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Personnel} from "@/lib/data";
import {onValue, ref, remove, set} from "firebase/database";
import {database} from "@/helpers/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {EllipsisVertical, Pencil, Trash} from "lucide-react";
import {toast} from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {Button} from "./ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Person = {
  firstName: string;
  lastName: string;
  rfid: string;
  vest: string;
  position: string;
  restrictedFloors: string;
  status: string;
};

export function PersonnelList() {
  const [personnel, setPersonnel] = useState({} as Personnel);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteRfid, setDeleteRfid] = useState("");
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  useEffect(() => {
    const dbRef = ref(database, "Users");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const personnelData: Personnel = snapshot.val();
      setPersonnel(personnelData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (rfid: string) => {
    try {
      remove(ref(database, `Users/${rfid}`));
      toast.success("Personnel deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete personnel");
    } finally {
      setDeleteRfid("");
      setOpenDelete(false);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    if (!editingPerson) return;

    try {
      await set(ref(database, `Users/${editingPerson.rfid}`), editingPerson);
      toast.success("Personnel updated successfully");
      setOpenEdit(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update personnel");
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Personnel</DialogTitle>
          </DialogHeader>
          Are you sure you want to delete this personnel?
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(deleteRfid)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Personnel Information</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={editingPerson?.firstName || ""}
                className="col-span-3"
                onChange={(e) =>
                  setEditingPerson((prev) =>
                    prev ? {...prev, firstName: e.target.value} : null
                  )
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={editingPerson?.lastName || ""}
                className="col-span-3"
                onChange={(e) =>
                  setEditingPerson((prev) =>
                    prev ? {...prev, lastName: e.target.value} : null
                  )
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vest" className="text-right">
                Vest
              </Label>
              <Input
                id="vest"
                value={editingPerson?.vest || ""}
                className="col-span-3"
                onChange={(e) =>
                  setEditingPerson((prev) =>
                    prev ? {...prev, vest: e.target.value} : null
                  )
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                value={editingPerson?.position || ""}
                className="col-span-3"
                onChange={(e) =>
                  setEditingPerson((prev) =>
                    prev ? {...prev, position: e.target.value} : null
                  )
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restricted" className="text-right">
                Restriction
              </Label>
              <Input
                id="restricted"
                value={editingPerson?.restrictedFloors || ""}
                className="col-span-3"
                onChange={(e) =>
                  setEditingPerson((prev) =>
                    prev ? {...prev, restrictedFloors: e.target.value} : null
                  )
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={editingPerson?.status}
                onValueChange={(value) =>
                  setEditingPerson((prev) =>
                    prev ? {...prev, status: value} : null
                  )
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save changes</Button>
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
                        <DropdownMenuItem onClick={() => handleEdit(person)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setDeleteRfid(person.rfid);
                            setOpenDelete(true);
                          }}
                        >
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
