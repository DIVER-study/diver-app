export default async function page({ params }: { params: Promise<{ realm: string }> }) {
  const { realm } = await params;
  return <div>{realm}</div>;
}
