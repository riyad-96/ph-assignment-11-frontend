import DashboardH1 from '@/components/DashboardH1';

export default function VendorDashboard() {
  return (
    <div className="px-3">
      <DashboardH1 text="Dashboard" />

      <div className="mx-auto mt-8 max-w-xl p-10 text-center">
        <div className="mb-6 flex justify-center">
          <svg
            className="text-brand h-16 w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2v2m0 0v2m-3-2h6M5 12h2m10 0h2M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            ></path>
          </svg>
        </div>

        <h3 className="text-content mb-3 text-2xl font-bold">
          Welcome to TicketBari
        </h3>

        <p className="text-content-light mb-2 text-lg">
          The simplest way to discover, book, and manage tickets for
          unforgettable events and experiences worldwide.
        </p>

        <p className="text-content-light mt-4 text-sm">
          Sign in to access your profile, manage your inventory, or control
          administrative tools.
        </p>
      </div>
    </div>
  );
}
