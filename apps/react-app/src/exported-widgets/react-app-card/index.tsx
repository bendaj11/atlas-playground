export interface ReactAppCardWidgetProps {
  subtitle?: string;
}

export default function ReactAppCardWidget({
  subtitle,
}: ReactAppCardWidgetProps) {
  return (
    <section>
      <h2>This is React Card Widget!</h2>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}
