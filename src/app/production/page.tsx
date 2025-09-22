import { ProductionGrid } from "./_components/ProductionGrid";

export default function ProductionPage() {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Production</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Coming Soon Trailers</h1>
        <p className="text-sm text-slate-600">
          Browse our upcoming trailer inventory currently in production.
        </p>
      </div>
      <ProductionGrid />
    </div>
  );
}