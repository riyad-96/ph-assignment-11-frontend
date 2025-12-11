export type TicketFormFieldType = {
  title: string;
  image_files: File[];
  from: string;
  to: string;
  transport: string;
  price: string;
  quantity: string;
  departure_time: number | string | Date;
  perks: string[];
};

export type Ticket = {
  _id: string;
  vendor_email: string;
  vendor_name: string;
  title: string;
  thumbnail: string;
  status: 'pending' | 'approved' | 'rejected';
  from: string;
  to: string;
  transport: string;
  price: number | string;
  quantity: number | string;
  departure_time: Date | string | number;
  perks: string[];
  created_at: Date | string | number;
  updated_at: Date | string | number;
};

export type TicketDeletePayloadType = {
  ticketTitle: string;
  ticketId: string;
};
