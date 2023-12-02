interface ModalsTemplateProps {
  children: React.ReactNode;
}
export default function ModalsTemplate({ children }: ModalsTemplateProps) {
  return (
    <div
      className="relative z-40"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:text-black">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
