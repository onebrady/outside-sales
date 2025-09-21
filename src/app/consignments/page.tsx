import { ConsignmentGrid } from "./_components/ConsignmentGrid";

export default function ConsignmentsPage() {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Consignments</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Consignment Trailer Inventory</h1>
        <p className="text-sm text-slate-600">
          Browse our consignment trailer inventory with detailed specifications and pricing.
        </p>
      </div>
      <ConsignmentGrid />
    </div>
  );
}