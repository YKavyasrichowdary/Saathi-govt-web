"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import DocumentCard from "./DocumentCard";

interface DocumentItem {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  mimeType?: string;
  type?: string;
  createdAt?: string | Date;
}

interface Props {
  documents: DocumentItem[];
  primaryResumeId: string | null;
}

export default function DocumentVaultClient({ documents, primaryResumeId }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  // Step 9 - Document Statistics
  const totalCount = documents.length;

  const resumeCount = documents.filter(
    (d) => d.type === "RESUME"
  ).length;

  const certificateCount = documents.filter(
    (d) =>
      d.type === "BONAFIDE" ||
      d.type === "INCOME_CERTIFICATE" ||
      d.type === "CASTE_CERTIFICATE"
  ).length;
 

  // Step 5, 6, 7 - Search, Filter, Sorting
  const filteredDocuments = documents
    .filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        filterType === "ALL"
          ? true
          : filterType === "CERTIFICATES"
          ? doc.type === "BONAFIDE" ||
            doc.type === "INCOME_CERTIFICATE" ||
            doc.type === "CASTE_CERTIFICATE"
          : doc.type === filterType;

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "NEWEST") {
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      }
      if (sortBy === "OLDEST") {
        return (
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
        );
      }
      if (sortBy === "NAME") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "TYPE") {
        return (a.type || "").localeCompare(b.type || "");
      }
      return 0;
    });

  // Step 3 - Product-like Empty State
  if (totalCount === 0) {
    return (
      <div className="surface-card rounded-2xl p-10 md:p-14 text-center max-w-lg mx-auto my-6 border border-border">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
          📄
        </div>

        <h2 className="mt-5 text-xl font-bold text-foreground">
          Document Vault
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Store your important academic documents securely.
        </p>

        <p className="mt-3 text-xs text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-xl">
          Upload once. Reuse across scholarships, internships, and applications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step 9 — Document Statistics */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="surface-card rounded-2xl p-4 text-center border border-border">
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {totalCount}
          </div>
          <div className="text-xs font-medium text-muted-foreground mt-1">
            Uploaded
          </div>
        </div>

        <div className="surface-card rounded-2xl p-4 text-center border border-border">
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {resumeCount}
          </div>
          <div className="text-xs font-medium text-muted-foreground mt-1">
            Resumes
          </div>
        </div>

        <div className="surface-card rounded-2xl p-4 text-center border border-border">
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {certificateCount}
          </div>
          <div className="text-xs font-medium text-muted-foreground mt-1">
            Certificates
          </div>
        </div>
      </div>

      {/* Step 5, 6, 7 — Search, Filter, Sort Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Step 5: Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-9 text-sm"
          />
        </div>

        <div className="flex gap-2">
          {/* Step 6: Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input text-xs"
          >
            <option value="ALL">All Types</option>
            <option value="RESUME">Resume</option>
            <option value="CERTIFICATES">Certificates</option>
            <option value="AADHAAR">Aadhaar</option>
            <option value="PAN">PAN</option>
            <option value="MARKS_MEMO">Marks Memo</option>
            <option value="OTHER">Other</option>
          </select>

          {/* Step 7: Sorting Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input text-xs"
          >
            <option value="NEWEST">Newest</option>
            <option value="OLDEST">Oldest</option>
            <option value="NAME">Name</option>
            <option value="TYPE">Type</option>
          </select>
        </div>
      </div>

      {/* Documents Grid or Empty Filter Result */}
      {filteredDocuments.length === 0 ? (
        <div className="surface-card rounded-2xl p-8 text-center border border-border">
          <p className="text-sm font-medium text-foreground">
            No documents match your filter.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search query or dropdown filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredDocuments.map((document) => (
  <DocumentCard
    key={document.id}
    document={document}
    isPrimaryResume={
      document.id === primaryResumeId
    }
  />
))}
        </div>
      )}
    </div>
  );
}
