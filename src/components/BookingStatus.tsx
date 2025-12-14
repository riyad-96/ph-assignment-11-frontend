type BookingStatusPropsType = {
  status: 'pending' | 'accepted' | 'rejected' | 'paid';
};

export default function BookingStatus({ status }: BookingStatusPropsType) {
  if (status === 'pending') {
    return (
      <div className="rounded-full bg-amber-200 px-2 pt-1 pb-0.5 text-xs font-medium tracking-wide text-amber-900">
        PENDING
      </div>
    );
  }
  if (status === 'accepted') {
    return (
      <div className="rounded-full bg-green-200 px-2 pt-1 pb-0.5 text-xs font-medium tracking-wide text-green-900">
        ACCEPTED
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className="rounded-full bg-red-200 px-2 pt-1 pb-0.5 text-xs font-medium tracking-wide text-red-900">
        REJECTED
      </div>
    );
  }
  if (status === 'paid') {
    return (
      <div className="rounded-full bg-gray-200 px-2 pt-1 pb-0.5 text-xs font-medium tracking-wide text-gray-900">
        PAID
      </div>
    );
  }
}
