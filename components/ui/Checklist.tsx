type ChecklistItem = {
  label: string;
};

type ChecklistProps = {
  title: string;
  items: ChecklistItem[];
};

export function Checklist({ title, items }: ChecklistProps) {
  return (
    <div className="surface p-5 space-y-3">
      <h3 className="text-xs font-mono tracking-[0.18em] text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2">
            <span className="mt-[6px] h-3 w-3 rounded-full border border-[rgba(23,23,23,0.16)]" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

