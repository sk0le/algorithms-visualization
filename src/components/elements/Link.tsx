import { useRouter } from "next/router";

interface CProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ to, children, className }: CProps) {
  const router = useRouter();
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        router.push(to);
      }}
      className={`${
        className
          ? className
          : "text-gray-300 font-medium text-base cursor-pointer hover:decoration-blue-600 hover:text-zinc-100 decoration-2 underline decoration-transparent underline-offset-2"
      }`}
    >
      {children}
    </a>
  );
}
