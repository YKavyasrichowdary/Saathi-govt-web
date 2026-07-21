export default function AuthDivider() {
  return (
    <div className="relative flex py-4 items-center">
      <div className="flex-grow border-t border-border/50" />

      <span className="mx-4 text-xs uppercase text-muted-foreground font-medium">
        or connect with
      </span>

      <div className="flex-grow border-t border-border/50" />
    </div>
  );
}