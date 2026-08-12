import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";
import documentService from "@/services/document/document.service";
import profileService from "@/services/profile/profile.service";

import UploadDocumentDialog from "@/components/document/UploadDocumentDialog";
import DocumentVaultClient from "@/components/document/DocumentVaultClient";

export default async function DocumentsPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const [documents, profile] =
    await Promise.all([
      documentService.getDocuments(
        session.user.id
      ),
      profileService.getProfile(
        session.user.id
      ),
    ]);

  return (
    <AppShell
      title="Document Vault"
      subtitle={`${documents.length} document${
        documents.length === 1
          ? ""
          : "s"
      } stored`}
    >
      <div className="space-y-6">
        <UploadDocumentDialog />

        <DocumentVaultClient
          documents={documents}
          primaryResumeId={
            profile?.resumeId ?? null
          }
        />
      </div>
    </AppShell>
  );
}