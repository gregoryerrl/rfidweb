"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {child, get, ref, set} from "firebase/database";
import {database} from "@/helpers/firebase";
import {toast} from "sonner";
import {X} from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  rfid: string;
  vest: string;
  restrictedFloors: string[];
  status: string;
  position: string;
  currentFloor: string;
};

export function PersonnelForm() {
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    rfid: "",
    vest: "",
    restrictedFloors: [],
    status: "active", // Set default status
    position: "",
    currentFloor: "",
  });

  const [newFloor, setNewFloor] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const addRestrictedFloor = () => {
    if (!newFloor) return;
    if (!data.restrictedFloors.includes(newFloor)) {
      setData({
        ...data,
        restrictedFloors: [...data.restrictedFloors, newFloor],
      });
    }
    setNewFloor("");
  };

  const removeRestrictedFloor = (floor: string) => {
    setData({
      ...data,
      restrictedFloors: data.restrictedFloors.filter((f) => f !== floor),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dbRef = ref(database);

    try {
      const snapshot = await get(child(dbRef, `Users/${data.rfid}`));
      if (snapshot.exists()) {
        toast.error("Personnel with that RFID already exists!");
        return;
      }

      await set(ref(database, "Users/" + data.rfid), {
        firstName: data.firstName,
        lastName: data.lastName,
        rfid: data.rfid,
        vest: data.vest,
        restrictedFloors: data.restrictedFloors,
        position: data.position,
        status: "active", // Set default status for new personnel
      });

      // Reset form
      setData({
        firstName: "",
        lastName: "",
        rfid: "",
        vest: "",
        restrictedFloors: [],
        status: "active",
        position: "",
        currentFloor: "",
      });

      toast.success("Personnel added successfully!");
    } catch (error) {
      console.error("Error adding personnel:", error);
      toast.error("Failed to add personnel");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Add New Personnel</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="rfid">RFID</Label>
          <Input
            id="rfid"
            name="rfid"
            value={data.rfid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="vest">Vest Number</Label>
          <Input
            id="vest"
            name="vest"
            type="number"
            value={data.vest}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Restricted Floors</Label>
          <div className="flex gap-2">
            <Input
              value={newFloor}
              onChange={(e) => setNewFloor(e.target.value)}
              placeholder="Add floor number"
            />
            <Button
              type="button"
              onClick={addRestrictedFloor}
              className="whitespace-nowrap"
            >
              Add Floor
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.restrictedFloors.map((floor) => (
              <Badge key={floor} variant="secondary">
                {floor}
                <button
                  type="button"
                  onClick={() => removeRestrictedFloor(floor)}
                  className="ml-1 hover:bg-muted rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            value={data.position}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Add Personnel</Button>
      </form>
    </div>
  );
}
