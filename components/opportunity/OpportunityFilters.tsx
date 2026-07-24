"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OpportunityFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {/* Type */}
      <select
        className="input"
        defaultValue={searchParams.get("type") ?? ""}
        onChange={(e) =>
          updateFilter("type", e.target.value)
        }
      >
        <option value="">All Types</option>
        <option value="SCHOLARSHIP">Scholarship</option>
        <option value="INTERNSHIP">Internship</option>
        <option value="HACKATHON">Hackathon</option>
        <option value="JOB">Job</option>
        <option value="COURSE">Course</option>
        <option value="COMPETITION">Competition</option>
      </select>

      {/* Mode */}
      <select
        className="input"
        defaultValue={searchParams.get("mode") ?? ""}
        onChange={(e) =>
          updateFilter("mode", e.target.value)
        }
      >
        <option value="">All Modes</option>
        <option value="ONLINE">Online</option>
        <option value="OFFLINE">Offline</option>
        <option value="HYBRID">Hybrid</option>
      </select>

      {/* Source */}
      <select
        className="input"
        defaultValue={searchParams.get("source") ?? ""}
        onChange={(e) =>
          updateFilter("source", e.target.value)
        }
      >
        <option value="">All Sources</option>
        <option value="GOVERNMENT">Government</option>
        <option value="COMPANY">Company</option>
        <option value="UNIVERSITY">University</option>
        <option value="PRIVATE">Private</option>
        <option value="NGO">NGO</option>
      </select>

      {/* Education */}
      <select
        className="input"
        defaultValue={
          searchParams.get("educationLevel") ?? ""
        }
        onChange={(e) =>
          updateFilter(
            "educationLevel",
            e.target.value
          )
        }
      >
        <option value="">All Levels</option>
        <option value="SCHOOL">School</option>
        <option value="INTERMEDIATE">Intermediate</option>
        <option value="UNDERGRADUATE">
          Undergraduate
        </option>
        <option value="POSTGRADUATE">
          Postgraduate
        </option>
      </select>

      {/* Sort */}
      <select
        className="input"
        defaultValue={searchParams.get("sort") ?? ""}
        onChange={(e) =>
          updateFilter("sort", e.target.value)
        }
      >
        <option value="">Newest</option>
        <option value="deadline">Deadline</option>
        <option value="featured">Featured</option>
      </select>

      {/* Featured Toggle */}
      <label className="flex items-center gap-2 rounded-xl border border-border px-4 py-2">
        <input
          type="checkbox"
          checked={
            searchParams.get("featured") === "true"
          }
          onChange={(e) =>
            updateFilter(
              "featured",
              e.target.checked ? "true" : ""
            )
          }
        />
        Featured Only
      </label>

      {/* Clear Filters */}
      <button
        onClick={() => router.push(pathname)}
        className="btn-ghost"
      >
        Clear Filters
      </button>
    </div>
  );
}