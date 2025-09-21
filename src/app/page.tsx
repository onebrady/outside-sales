import { InStockGrid } from "./_components/InStockGrid";

export default function InStockPage() {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">In Stock</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Live Trailer Inventory</h1>
        <p className="text-sm text-slate-600">
          Browse our complete selection of in-stock trailers with real-time availability.
        </p>
      </div>
      <InStockGrid />
    </div>
  );
}
