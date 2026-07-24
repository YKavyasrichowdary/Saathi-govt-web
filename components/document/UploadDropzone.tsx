"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface Props {
  onFileSelected: (file: File) => void;
}

export default function UploadDropzone({
  onFileSelected,
}: Props) {
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      multiple: false,

      maxFiles: 1,

      accept: {
        "application/pdf": [".pdf"],
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      },

      onDrop(files) {
        if (files.length) {
          onFileSelected(files[0]);
        }
      },
    });

  return (
    <div
      {...getRootProps()}
      className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud className="mx-auto h-12 w-12 text-primary" />

      <h3 className="mt-4 text-lg font-semibold">
        {isDragActive
          ? "Drop your file here"
          : "Drag & Drop your document"}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        or click to browse files
      </p>

      <p className="mt-4 text-xs text-muted-foreground">
        PDF • JPG • PNG
      </p>

      <p className="text-xs text-muted-foreground">
        Maximum size: 5 MB
      </p>

    </div>
  );
}