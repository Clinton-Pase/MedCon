import { ImportWizard } from "@/components/import-wizard";

export default function ImportClaimsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Import Claims</h1>
      <ImportWizard />
    </div>
  );
}