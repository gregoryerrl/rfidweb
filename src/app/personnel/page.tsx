import { PersonnelList } from "@/components/personnel-list";
import { PersonnelForm } from "@/components/forms/personnel-form";

export default function PersonnelPage() {
  return (
    <div>
      <div className="w-full flex justify-center items-center py-10 mb-6">
        <h2 className="text-3xl font-bold text-center">Personnel Management</h2>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between px-4 lg:px-0">
        <PersonnelForm />
        <div className="lg:w-7/12">
          <PersonnelList />
        </div>
      </div>
    </div>
  );
}
