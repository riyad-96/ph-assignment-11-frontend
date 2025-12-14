import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import { serverAPI } from '@/helpers/server';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

type PaymentResponse = {
  code: 'TRANSACTION_EXISTS' | 'TICKET_PAID' | 'PAYMENT_SUCCESS';
  message: string;
  data?: {
    ticket_title: string;
    quantity: number;
    total_price: number;
  };
};

export default function PaymentSuccess() {
  const server = serverAPI(true);
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');
  const navigate = useNavigate();

  const {
    data: paymentResponse,
    isLoading: paymentLoading,
    error: paymentError,
  } = useQuery<PaymentResponse>({
    queryKey: ['payment-response'],
    queryFn: async () => {
      const response = await server.post('/user/payment-success', {
        session_id,
      });
      return response.data;
    },
  });

  return (
    <div className="px-3 py-12 pt-3">
      {paymentLoading && (
        <div className="loading loading-spinner loading-xl py-28"></div>
      )}
      {paymentError && <LoadingErrorSection />}
      {paymentResponse &&
        (paymentResponse.code === 'TRANSACTION_EXISTS' ||
          paymentResponse.code === 'TICKET_PAID') && (
          <div className="space-y-2" >
            <h2 className="text-xl font-medium">Already Paid</h2>
            <p>
              You have already paid for this booking (
              <strong>{paymentResponse.data?.ticket_title}</strong>)
            </p>
            <button
              className="bg-brand w-fit rounded-full px-6 py-2 text-white"
              onClick={() => navigate('/dashboard/transactions')}
            >
              Transaction history
            </button>
          </div>
        )}
      {!paymentLoading &&
        paymentResponse &&
        paymentResponse.code === 'PAYMENT_SUCCESS' && (
          <div className="max-w-[400px]">
            {/* 2. Success Message */}
            <h1 className="text-content mb-2 text-3xl font-semibold">
              Payment Successful!
            </h1>
            <p className="text-content-light mb-6 text-xl">
              Your booking is now confirmed.
            </p>

            <hr className="mb-6 border-gray-200" />
            <div className="rounded-lg bg-green-100 p-4 dark:bg-green-950">
              <p className="mb-1 text-sm font-medium text-green-600 uppercase">
                Ticket Title
              </p>
              <h2 className="text-content text-lg font-semibold">
                {paymentResponse.data?.ticket_title} (
                {paymentResponse.data?.quantity} Tickets)
              </h2>
              <p className="text-sm font-medium">
                Total: {paymentResponse.data?.total_price}
              </p>
            </div>

            <div className="mt-8 grid gap-2">
              <button
                className="bg-brand rounded-full px-6 py-2 text-white"
                onClick={() => navigate('/dashboard/transactions')}
              >
                Transaction history
              </button>

              <button
                className="border-brand text-brand rounded-full border px-6 py-2"
                onClick={() => navigate('/dashboard/booked-tickets')}
              >
                Booked Tickets
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
