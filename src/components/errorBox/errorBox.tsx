interface errorBoxProps {
  message: string;
}
export default function errorBox({ message }: errorBoxProps) {
  return (
    <div className="w-full bg-red-950 text-gray-50 text-center font-bold p-3">
      {message}
    </div>
  );
}
