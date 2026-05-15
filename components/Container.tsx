import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "from-background via-background-container to-background relative mx-auto w-full max-w-4xl bg-linear-to-r",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
