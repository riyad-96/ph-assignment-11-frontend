type LoadingDataLengthErrorsProps = {
  isLoading: boolean;
  error: unknown;
  dataLength: number | null | undefined;
  emptyMessage: string;
};

export default function LoadingDataLengthErrors({
  isLoading,
  error,
  dataLength,
  emptyMessage,
}: LoadingDataLengthErrorsProps) {
  if (isLoading) {
    return (
      <div className="text-content-light mt-8 text-center text-lg font-medium">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-content-light mt-8 text-center text-lg font-medium">
        Error loading data. Please try again.
      </div>
    );
  }
  if (dataLength === 0) {
    return (
      <div className="text-content-light mt-8 text-center text-lg font-medium">
        {emptyMessage}
      </div>
    );
  }
  return null;
}
