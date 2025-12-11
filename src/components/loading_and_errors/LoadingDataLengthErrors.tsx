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
      <div className="text-content-light mt-30 text-center font-medium lg:text-lg">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-content-light mt-30 text-center font-medium lg:text-lg">
        Error loading data. Please try again.
      </div>
    );
  }
  if (dataLength === 0) {
    return (
      <div className="text-content-light mt-30 text-center font-medium lg:text-lg">
        {emptyMessage}
      </div>
    );
  }
  return null;
}
