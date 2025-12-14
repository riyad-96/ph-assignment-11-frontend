export type BookedTicket= {
  _id: string;
  title: string;
  thumbnail: string;
  from: string;
  to: string;
  price: number;
  quantity: number;
  total_price: number;
  departure_time: string | number | Date;
  status: 'pending' | 'accepted' | 'rejected' | 'paid';
}