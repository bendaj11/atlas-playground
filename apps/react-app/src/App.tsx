interface AppProps {
  name?: string;
}

export function App({ name = "React App" }: AppProps) {
  return (
    <section>
      <h1>{name}</h1>
      <p>Single-page Atlas app</p>
    </section>
  );
}
