import { ConsignmentGrid } from "./_components/ConsignmentGrid";

export default function ConsignmentsPage() {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Consignments</p>
      <h2 className="text-2xl font-semibold text-slate-900">Consignment trailer inventory</h2>
      <p className="text-sm text-slate-600">
        Browse our consignment trailer inventory with detailed specifications and pricing.
      </p>
      <div className="pt-5">
        <ConsignmentGrid />
      </div>
    </div>
  );
}