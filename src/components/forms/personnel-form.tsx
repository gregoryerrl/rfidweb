"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { child, get, onValue, ref, set } from "firebase/database";
import { database } from "@/helpers/firebase";
import { toast } from "sonner";
import { unsubscribe } from "diagnostics_channel";

export function PersonnelForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    rfid: "",
    vest: 0,
    restrictedFloors: "",
    status: "",
    position: "",
    currentFloor: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dbRef = ref(database);
    get(child(dbRef, `Users/${data.rfid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        toast.error("Personnel with that RFID already exists!");
      } else {
        set(ref(database, "Users/" + data.rfid), {
          firstName: data.firstName,
          lastName: data.lastName,
          rfid: data.rfid,
          vest: data.vest,
          restrictedFloors: data.restrictedFloors,
          positionL: data.position,
        });

        setData({
          firstName: "",
          lastName: "",
          rfid: "",
          vest: 0,
          restrictedFloors: "",
          status: "",
          position: "",
          currentFloor: "",
        });

        toast.success("Personnel added successfully!");
      }
    });
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
        </div>{" "}
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
        <div>
          <Label htmlFor="restrictedFloors">
            Restricted Floors (comma-separated)
          </Label>
          <Input
            id="restrictedFloors"
            name="restrictedFloors"
            value={data.restrictedFloors}
            onChange={handleChange}
          />
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
