"use client";

import Link from "next/link";
import { FileText, Upload } from "lucide-react";
import ProgressCircle from "@/components/ui/ProgressCircle";

interface ResumeData {
  overallScore: number;
  atsScore: number;
  summary?: string;
  document?: string;
}

interface ResumeHealthProps {
  data?: ResumeData | null;
}

export default function ResumeHealth({ data }: ResumeHealthProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">Resume Health</h2>
          <p className="text-sm text-muted-foreground">
            AI evaluation of your resume.
          </p>
        </div>
        {data?.document && (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {data.document}
          </span>
        )}
      </div>

      {!data ? (
        <div className="mt-8 flex flex-col items-center justify-center py-8 text-center">
          <div className="rounded-full bg-muted p-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Upload and analyze your resume to see your health score.
          </p>
          <Link
            href="/documents"
            className="btn-primary mt-6 inline-flex items-center gap-2 text-sm"
          >
            <Upload className="h-4 w-4" />
            Upload Resume
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 flex justify-center">
            <ProgressCircle
              value={data.overallScore}
              label="Resume Score"
              variant={
                data.overallScore >= 80
                  ? "success"
                  : data.overallScore >= 60
                  ? "primary"
                  : "warning"
              }
            />
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>ATS Compatibility</span>
                <span className="font-semibold">{data.atsScore}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, data.atsScore))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Overall Impact</span>
                <span className="font-semibold">{data.overallScore}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, data.overallScore))}%` }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}