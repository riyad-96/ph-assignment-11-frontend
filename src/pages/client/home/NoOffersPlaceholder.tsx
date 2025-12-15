export default function NoOffersPlaceholder() {
  return (
    <div
      className="border-brand/20 bg-brand/10 rounded-lg border p-4"
      role="status"
    >
      <div className="flex items-center">
        {/* Icon: Tag/Offer Symbol */}
        <div className="shrink-0">
          <svg
            className="h-6 w-6 text-blue-500 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h10a2 2 0 012 2v10a2 2 0 01-2 2h-3L7 21v-3H5a2 2 0 01-2-2V5a2 2 0 012-2z"
            ></path>
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-500">
            No Offers Available Right Now
          </h3>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
            We couldn't find any special deals or promotions at this moment.
            Please check back later, as our offers update frequently!
          </p>
        </div>
      </div>
    </div>
  );
}
