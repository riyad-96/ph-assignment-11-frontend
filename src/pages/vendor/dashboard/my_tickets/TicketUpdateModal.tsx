import { useForm } from "react-hook-form";
import type { Ticket, TicketFormFieldType } from "../../types";
import { formatForDatetimeLocal } from "@/helpers/helper";
import Modal from "@/components/ticket_cards/modal/Modal";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import Checkbox from "@/components/form/Checkbox";
import SubmitButton from "@/components/form/SubmitButton";
import { perks } from "@/constants/perksData";

type TicketUpdateModalPropsType = {
  ticket: Ticket;
  closeFn: () => void;
  isUpdatingTicket: boolean;
  updateTicket: (data: TicketFormFieldType) => void;
};

export default function TicketUpdateModal({
  ticket,
  closeFn,
  isUpdatingTicket,
  updateTicket,
}: TicketUpdateModalPropsType) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TicketFormFieldType>({
    defaultValues: {
      title: ticket.title,
      from: ticket.from,
      to: ticket.to,
      price: ticket.price as string,
      quantity: ticket.quantity as string,
      transport: ticket.transport,
      departure_time: formatForDatetimeLocal(ticket.departure_time as string),
      perks: ticket.perks,
    },
  });

  return (
    <Modal
      closeFn={closeFn}
      className="bg-canvas rounded-2xl p-6 shadow-md"
    >
      <form
        onSubmit={handleSubmit((data) => {
          if (isUpdatingTicket) return;
          updateTicket(data);
        })}
      >
        <div className="grid gap-x-3 sm:grid-cols-2">
          <InputField
            label="Ticket title:"
            id="title"
            error={errors.title?.message}
            type="text"
            placeholder="Ticket title"
            {...register('title', {
              required: {
                value: true,
                message: 'Ticket title is required',
              },
            })}
          />
          <InputField
            label="Ticket image (optional):"
            id="image_file"
            type="file"
            accept="image/*"
            placeholder="Ticket image"
            {...register('image_files')}
          />
          <InputField
            label="Origin:"
            id="origin"
            error={errors.from?.message}
            type="text"
            placeholder="e.g., Dhaka, Mymensingh"
            {...register('from', {
              required: {
                value: true,
                message: 'Departure city is required',
              },
            })}
          />
          <InputField
            label="Destination:"
            id="destination"
            error={errors.to?.message}
            type="text"
            placeholder="e.g., Chittagong, Cox's Bazar"
            {...register('to', {
              required: {
                value: true,
                message: 'Arrival city is required',
              },
            })}
          />
          <SelectField
            id="transport"
            label="Transport:"
            title="Transport"
            {...register('transport', {
              required: {
                value: true,
                message: 'Transport is required',
              },
            })}
            error={errors.transport?.message}
            options={[
              { label: 'Bus', value: 'bus' },
              { label: 'Train', value: 'train' },
              { label: 'Lonch', value: 'lonch' },
              { label: 'Plane', value: 'plane' },
            ]}
          />
          <InputField
            label="Price:"
            id="price"
            error={errors.price?.message}
            type="number"
            step="any"
            placeholder="Price per unit"
            {...register('price', {
              required: {
                value: true,
                message: 'Ticket price is required',
              },
            })}
          />
          <InputField
            label="Ticket quantity:"
            id="ticket_quantity"
            error={errors.quantity?.message}
            type="number"
            step="1"
            placeholder="Ticket quantity"
            {...register('quantity', {
              required: {
                value: true,
                message: 'Ticket quantity is required',
              },
              min: {
                value: 1,
                message: 'Must be at least one ticket',
              },
            })}
          />
          <InputField
            label="Departure time:"
            id="departure_time"
            error={errors.departure_time?.message}
            type="datetime-local"
            {...register('departure_time', {
              required: {
                value: true,
                message: 'Departure time & date is required',
              },
              validate: (time) => {
                const timeInMs = new Date(time).getTime();
                const currentTimeInMs = new Date().getTime();
                if (timeInMs < currentTimeInMs) {
                  return 'Departure time cannot be in the past';
                }
              },
            })}
          />
        </div>

        <Checkbox
          checkboxName="perks"
          options={perks}
          {...register('perks')}
        />

        <div className="mt-4 flex justify-end">
          <SubmitButton
            isSubmitting={isUpdatingTicket}
            content="Update Ticket"
            className="w-[140px]"
          />
        </div>
      </form>
    </Modal>
  );
}
