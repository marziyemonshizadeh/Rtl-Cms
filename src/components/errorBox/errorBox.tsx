interface errorBoxProps {
  message: string;
}
export default function errorBox({ message }: errorBoxProps) {
  return (
    <div className="w-full bg-destructive/10 text-destructive text-center font-semibold p-4 rounded-lg border border-destructive/20">
      {message}
    </div>
  );
}
