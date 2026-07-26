import {
  CheckCircle2,
  Circle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
}

interface TaskChecklistProps {
  title: string;
  tasks: Task[];
}

export default function TaskChecklist({
  title,
  tasks,
}: TaskChecklistProps) {
  const completed =
    tasks.filter(task => task.completed).length;

  return (
    <section className="surface-card rounded-3xl border border-border p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Task Checklist
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {title}
          </h2>

        </div>

        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          {completed}/{tasks.length} Completed
        </span>

      </div>

      <div className="mt-8 space-y-4">

        {tasks.map((task) => (

          <div
            key={task.id}
            className={`flex items-center justify-between rounded-2xl border p-5 transition-all ${
              task.completed
                ? "border-primary/20 bg-primary/5"
                : "border-border"
            }`}
          >

            <div className="flex items-center gap-4">

              {task.completed ? (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}

              <div>

                <h3
                  className={`font-medium ${
                    task.completed
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {task.estimatedMinutes} mins
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}