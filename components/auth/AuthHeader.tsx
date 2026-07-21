interface Props {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function AuthHeader({
  title,
  subtitle,
  badge,
}: Props) {
  return (
    <div className="text-center mb-8">
      {badge && (
        <div className="text-xs text-muted-foreground mb-2">
          {badge}
        </div>
      )}

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="text-sm text-muted-foreground mt-2">
        {subtitle}
      </p>
    </div>
  );
}