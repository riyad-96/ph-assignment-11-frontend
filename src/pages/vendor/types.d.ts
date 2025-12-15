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
  isOnAd: boolean;
};

export type TicketDeletePayloadType = {
  ticketTitle: string;
  ticketId: string;
};

export type BookedTicketStatusUpdatePayload = {
  ticket_title: string;
  booked_ticket_id: string;
  new_status: 'accepted' | 'rejected';
};

export type BookedTicket = {
  _id: string | ObjectId;
  user_name: string;
  user_email: string;
  title: string;
  quantity: number;
  total_price: number;
  departure_time: string | number | Date;
  created_at: string | number | Date;
  status: 'pending' | 'accepted' | 'rejected' | 'paid';
};

export type PieChartDataType = {
  name: string;
  value: number;
};

export type KPIData = { label: string; value: number };

export type KPIDataRaw = {
  total_sell: number;
  total_tickets: number;
  total_sold_tickets: number;
  unsold_tickets: number;
  sales_percentage: number;
  average_ticket_price: number;
};

export type ServerRevenueDataType = {
  kpi_data_raw: KPIDataRaw;
  kpi_data: KPIData[];
}