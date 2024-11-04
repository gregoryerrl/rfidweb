"use client";

import { Button } from "@/components/ui/button";
import { onValue, ref, set } from "firebase/database";
import { use, useEffect, useState } from "react";
import { database } from "@/helpers/firebase";
import { toast } from "sonner";

export default function RfidChecker() {
  const [rfid, setRfid] = useState("");

  useEffect(() => {
    const dbRef = ref(database, "Checker/RFID");

    onValue(dbRef, (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.val();
      console.log(data);
      setRfid(data);
    });
  }, [rfid]);

  const handleClear = () => {
    try {
      setRfid("");

      const dbRef = ref(database, "Checker/RFID");

      set(dbRef, "");
    } catch (error) {
      console.error(error);
    } finally {
      toast.success("RFID cleared successfully");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center items-center py-10 mb-6">
        <h2 className="text-3xl font-bold">RFID Checker</h2>
      </div>
      <div className="w-full flex flex-col items-center py-4">
        <h3>RFID</h3>
        <div className="border p-4 rounded mb-4 w-1/2 text-center">{rfid}</div>
        <div>
          <Button
            className="w-auto"
            variant={"destructive"}
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
