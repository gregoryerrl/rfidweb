import FloorList from "@/components/floor-list";

export default function FloorTracker() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center items-center py-10 mb-6">
        <h2 className="text-3xl font-bold">Floor Tracker</h2>
      </div>
      <div className="w-full px-4">
        <FloorList />
      </div>
    </div>
  );
}
