import { useRouter } from "next/router";

interface CProps {
  to: string;
  name: string;
}

export default function Link({ to, name }: CProps) {
  const router = useRouter();
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        router.push(to);
      }}
      className="text-gray-300 font-medium text-base cursor-pointer hover:decoration-blue-600 hover:text-zinc-100 decoration-2 underline decoration-transparent underline-offset-2"
    >
      {name}
    </a>
  );
}
