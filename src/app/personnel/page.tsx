import {PersonnelList} from "@/components/personnel-list";
import {PersonnelForm} from "@/components/forms/personnel-form";

export default function PersonnelPage() {
  return (
    <div>
      <div className="w-full flex justify-center items-center py-10 mb-6">
        <h2 className="text-3xl font-bold">Personnel Management</h2>
      </div>
      <div className="flex w-screen justify-around">
        <div className="max-w-lg">
          <PersonnelForm />
        </div>
        <PersonnelList />
      </div>
    </div>
  );
}
