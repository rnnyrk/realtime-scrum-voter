'use client';

import { useForm } from 'react-hook-form';

import { Button } from 'common/interaction/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'common/interaction/Dialog';

export type AddCardModalValues = {
  order: number;
};

export function AddCardModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCardModalValues>();

  function onSubmit(data: AddCardModalValues) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="fixed bottom-4 left-2/4 -translate-x-2/4"
        >
          Add user story
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px] bg-solidtecBlack p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Change selected block</DialogTitle>
        </DialogHeader>

        <form
          className="pt-4 pb-8 px-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Button
            type="submit"
            className="mt-8"
            disabled={Object.keys(errors).length > 0}
          >
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
