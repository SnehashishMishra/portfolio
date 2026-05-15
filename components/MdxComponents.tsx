import type { ComponentPropsWithoutRef } from "react";

function Table({ children }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="not-prose my-8 w-full overflow-x-auto rounded-xl border border-neutral-200 shadow-sm dark:border-white/10">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

function Thead({ children }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className="bg-neutral-100 text-neutral-700 dark:bg-white/5 dark:text-neutral-300">
      {children}
    </thead>
  );
}

function Tbody({ children }: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody className="divide-y divide-neutral-200 dark:divide-white/10">
      {children}
    </tbody>
  );
}

function Tr({ children }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr className="transition-colors hover:bg-neutral-50 dark:hover:bg-white/3">
      {children}
    </tr>
  );
}

function Th({ children }: ComponentPropsWithoutRef<"th">) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold tracking-wider uppercase">
      {children}
    </th>
  );
}

function Td({ children }: ComponentPropsWithoutRef<"td">) {
  return (
    <td className="px-5 py-3 text-neutral-800 dark:text-neutral-200">
      {children}
    </td>
  );
}

export const mdxComponents = {
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
};
