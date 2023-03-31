import clsx from "clsx";

export default function Center({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx("flex flex-col items-center justify-center", className)}
      {...props}
    />
  );
}
