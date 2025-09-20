import { InStockGrid } from "./_components/InStockGrid";

export default function InStockPage() {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">In Stock</p>
      <h2 className="text-2xl font-semibold text-slate-900">Live trailer inventory</h2>
      <p className="text-sm text-slate-600">
        We&apos;ll layer in specs and actions next—here&apos;s the photo feed to start exploring units.
      </p>
      <div className="pt-5">
        <InStockGrid />
      </div>
    </div>
  );
}
