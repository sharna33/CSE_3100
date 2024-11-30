import greetings from "@/lib/greetings";

export default async function defaultDashBoard() {
  const greeting = await greetings();
  return (
    <div className="text-center mt-12">
      <h1>{greeting}</h1>
    </div>
  );
}
