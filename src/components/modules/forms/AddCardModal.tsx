'use client';

import type * as i from 'types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCategoriesStore } from 'store/categories';
import { ComboboxForm } from 'common/form/Combobox';
import { Form, FormField } from 'common/form/Form';
import { InputForm } from 'common/form/Input';
import { Button } from 'common/interaction/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'common/interaction/Dialog';

const FormSchema = z.object({
  category: z.custom<i.Categories>(),
  title: z.string().min(1),
  description: z.string().optional(),
});

export type AddCardForm = z.infer<typeof FormSchema>;

export function AddCardModal() {
  const { data, setData } = useCategoriesStore();

  const form = useForm<AddCardForm>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmitCard(values: AddCardForm) {
    console.log(values);

    const currentCategory = data?.[values.category];

    setData({
      [values.category]: [
        ...(currentCategory || []),
        {
          title: values.title,
          description: values.description,
        },
      ],
    });
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
      <DialogContent className="min-w-[600px] p-8 bg-blackOff overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle>Add a new user story</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitCard)}>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <ComboboxForm
                    className="mb-4"
                    label="Category *"
                    field={field}
                    options={[
                      { label: 'Good', value: 'good' },
                      { label: 'Bad', value: 'bad' },
                      { label: 'Actions', value: 'actions' },
                      { label: 'Ideas', value: 'ideas' },
                    ]}
                  />
                );
              }}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <InputForm
                    className="mb-4"
                    label="Title *"
                    field={field}
                  />
                );
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <InputForm
                    label="Description"
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
              Add card
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
