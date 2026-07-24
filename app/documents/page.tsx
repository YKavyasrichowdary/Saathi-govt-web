import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";

import { getSession } from "@/lib/auth";

import documentService from "@/services/document/document.service";
import DocumentCard from "@/components/document/DocumentCard";

export default async function DocumentsPage() {

  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const documents =
    await documentService.getDocuments(
      session.user.id
    );

  return (
    <AppShell
      title="Documents"
      subtitle={`${documents.length} uploaded`}
    >

      <div className="space-y-4">

        {documents.length === 0 ? (

          <div className="surface-card rounded-2xl p-10 text-center">

            <h2 className="text-xl font-semibold">

              No documents uploaded

            </h2>

            <p className="mt-2 text-muted-foreground">

              Upload your documents to reuse them across opportunities.

            </p>

          </div>

        ) : (

       <div className="grid gap-6 lg:grid-cols-2">

  {documents.map((document) => (

    <DocumentCard
      key={document.id}
      document={document}
    />

  ))}

</div>

        )}

      </div>

    </AppShell>
  );

}