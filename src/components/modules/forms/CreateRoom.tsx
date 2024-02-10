'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRoomStore } from 'store/room';
import { generateRoomId } from 'utils';
import { Form, FormField } from 'common/form/Form';
import { InputForm } from 'common/form/Input';
import { Button } from 'common/interaction/Button';

const FormSchema = z.object({
  username: z.string().min(1),
  roomCode: z.string().min(6).max(6).optional(),
});

export type CreateRoomForm = z.infer<typeof FormSchema>;

export function CreateRoom() {
  const router = useRouter();
  const { setUsername } = useRoomStore();

  const form = useForm<CreateRoomForm>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmitRoom(values: CreateRoomForm) {
    setUsername(values.username);

    if (values.roomCode) {
      router.push(`/${values.roomCode}`);
    } else {
      const roomId = generateRoomId(6);
      router.push(`/${roomId}`);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitRoom)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <InputForm
                  className="mb-4"
                  label="Username *"
                  field={field}
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="roomCode"
            render={({ field }) => {
              return (
                <InputForm
                  className="mb-4"
                  label="Room code"
                  description="Leaving the room code empty will create a new room"
                  field={field}
                />
              );
            }}
          />

          <Button
            type="submit"
            className="mt-8"
            disabled={!form.formState.isValid}
          >
            Join or create room
          </Button>
        </form>
      </Form>
    </>
  );
}
