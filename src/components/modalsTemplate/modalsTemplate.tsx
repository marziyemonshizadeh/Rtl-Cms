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
      <div className="fixed inset-0 bg-overlay/50 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-card text-left text-card-foreground shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
