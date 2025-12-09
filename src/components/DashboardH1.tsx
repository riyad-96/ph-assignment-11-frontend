export default function DashboardH1({ text }: { text: string }) {
  return (
    <h1 className="text-content-light mt-3 text-2xl font-semibold lg:text-3xl">
      {text}
    </h1>
  );
}
