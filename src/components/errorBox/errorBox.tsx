interface errorBoxProps {
  message: string;
}
export default function errorBox({ message }: errorBoxProps) {
  return (
    <div className="w-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 text-center font-semibold p-4 rounded-lg border border-red-200 dark:border-red-800">
      {message}
    </div>
  );
}
