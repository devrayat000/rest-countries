type Props<T> = {
  label: string;
  value: T;
};

const Info = function <T>({ label, value }: Props<T>) {
  if (!value) {
    return <></>;
  }

  return (
    <p className="my-0">
      <>
        <span className="font-extrabold">{label}:</span>
        &nbsp;{value}
      </>
    </p>
  );
};

export default Info;
