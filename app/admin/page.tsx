import { AppShell } from "@/components/AppShell";
import { adminNavigation } from "@/config/admin-navigation";

export default function AdminDashboardPage() {
  return (
    <AppShell
      navigation={adminNavigation}
      title="Admin Dashboard"
      subtitle="Manage opportunities, users and platform activity."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="surface-card p-6">
          <h3 className="text-sm text-muted-foreground">
            Total Opportunities
          </h3>

          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="surface-card p-6">
          <h3 className="text-sm text-muted-foreground">
            Published
          </h3>

          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="surface-card p-6">
          <h3 className="text-sm text-muted-foreground">
            Drafts
          </h3>

          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="surface-card p-6">
          <h3 className="text-sm text-muted-foreground">
            Total Users
          </h3>

          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

      </div>
    </AppShell>
  );
}