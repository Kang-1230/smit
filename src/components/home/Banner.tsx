import Link from "next/link";

type Props = {
  title: string;
  description: string;
  link: string;
};

export default function Banner({ title, description, link }: Props) {
  return (
    <section className="bg-[#d9d9d9] p-6 rounded-md">
      <Link href={link}>
        <h2 className="font-semibold text-xs">EVENT</h2>
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-[#666] text-xs mt-4">{description}</p>
      </Link>
    </section>
  );
}
