"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  search: string;
  onSearch: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
}

export default function OpportunityFilters({
  search,
  onSearch,
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">

      <div className="relative flex-1">

        <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder="Search opportunities..."
          className="pl-10"
        />

      </div>

      <Select
        value={status}
        onValueChange={(val) => {
          if (val !== null) onStatusChange(val);
        }}
      >

        <SelectTrigger className="w-full md:w-52">

          <SelectValue />

        </SelectTrigger>

        <SelectContent>

          <SelectItem value="ALL">
            All
          </SelectItem>

          <SelectItem value="OPEN">
            Open
          </SelectItem>

          <SelectItem value="DRAFT">
            Draft
          </SelectItem>

          <SelectItem value="CLOSED">
            Closed
          </SelectItem>

          <SelectItem value="EXPIRED">
            Expired
          </SelectItem>

        </SelectContent>

      </Select>

    </div>
  );
}