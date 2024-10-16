"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {personnelData} from "@/lib/data";

export function PersonnelForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rfid: "",
    restrictedFloors: "",
    status: "",
    position: "",
    currentFloor: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson = {
      ...formData,
      restrictedFloors: formData.restrictedFloors
        .split(",")
        .map((floor) => floor.trim()),
    };
    personnelData.push(newPerson);
    setFormData({
      firstName: "",
      lastName: "",
      rfid: "",
      restrictedFloors: "",
      status: "",
      position: "",
      currentFloor: "",
    });
    alert("New personnel added successfully!");
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
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
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
            value={formData.rfid}
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
            value={formData.restrictedFloors}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Add Personnel</Button>
      </form>
    </div>
  );
}
