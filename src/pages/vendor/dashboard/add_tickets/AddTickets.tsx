import DashboardH1 from '@/components/DashboardH1';
import { serverAPI } from '@/helpers/server';
import InputField from '@/components/form/InputField';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'kitzo/react';
import { useForm } from 'react-hook-form';
import SelectField from '@/components/form/SelectField';
import { useAuthContext } from '@/hooks/useAuthContext';
import SubmitButton from '@/components/form/SubmitButton';
import uploadImageToImgbb from '@/helpers/imageUpload';
import Checkbox from '@/components/form/Checkbox';
import { perks } from '@/constants/perksData';
import type { TicketFormFieldType } from '../../types';

export default function AddTickets() {
  const { user } = useAuthContext();
  const server = serverAPI(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TicketFormFieldType>();

  // Create ticket
  const { mutate: createTicket, isPending: isAddingTicket } = useMutation({
    mutationFn: async (data: TicketFormFieldType) => {
      const ticketPhotoURL = await uploadImageToImgbb(data.image_files);

      const newTicketData = {
        title: data.title,
        thumbnail: ticketPhotoURL,
        from: data.from,
        to: data.to,
        transport: data.transport,
        price: parseFloat(data.price),
        quantity: Math.floor(parseFloat(data.quantity)),
        departure_time: data.departure_time,
        perks: data.perks,
      };

      const response = await server.post(
        '/vendor/create-ticket',
        newTicketData,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Ticket added, wait for approval', { duration: 3500 });
      reset();
    },
    onError: () => {
      toast.error('Error while adding ticket, please try again');
    },
  });

  function requestAddTicket(data: TicketFormFieldType) {
    if (isAddingTicket) return;
    createTicket(data);
  }

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Add Tickets" />

      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          Fill out all the fields to add ticket
        </h2>

        <div className="mt-4 max-w-[800px]">
          <form onSubmit={handleSubmit(requestAddTicket)}>
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
                label="Ticket image:"
                id="image_file"
                error={errors.image_files?.message}
                type="file"
                placeholder="Ticket image"
                {...register('image_files', {
                  required: {
                    value: true,
                    message: 'Ticket image is required',
                  },
                })}
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
              <InputField
                label="Your name"
                id="vendor_name"
                type="text"
                defaultValue={user?.name}
                readOnly
                disabled
              />
              <InputField
                label="Your email"
                id="vendor_email"
                type="text"
                defaultValue={user?.email}
                readOnly
                disabled
              />
            </div>

            <Checkbox
              checkboxName="perks"
              options={perks}
              {...register('perks')}
            />

            <div className="mt-4">
              <SubmitButton
                isSubmitting={isAddingTicket}
                content="Add Ticket"
                className="w-[120px]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
