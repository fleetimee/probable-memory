"use client";

import { createThreadSchema } from "@/lib/validations/thread";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormAction } from "@/hooks/use-form-actions";
import { useToast } from "@/components/ui/use-toast";
import { createThread } from "@/action/thread-action";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof createThreadSchema>;

export function CreateThreadForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const { toast } = useToast();

  const [state, formAction, pending] = useActionState(createThread, undefined);

  const form = useFormAction<Inputs>({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      threadTitle: "",
      threadContent: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session?.user.uuid!,
      updatedBy: session?.user.uuid!,
    },
    state,
    onSuccess: () => {
      toast({
        title: "Thread created successfully",
        duration: 5000,
      });
    },
  });

  return (
    <Form {...form}>
      <form action={formAction} className="flex flex-col w-full">
        <CreateThreadFormFields pending={pending} form={form} />
      </form>
    </Form>
  );
}

interface CreateThreadFormFieldsProps {
  form: any;
  pending: boolean;
}

function CreateThreadFormFields({
  form,
  pending,
}: CreateThreadFormFieldsProps) {
  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="threadTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center justify-between">
              Judul Thread
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} disabled={pending} className="min-w-3.5" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="threadContent"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center justify-between">
              Konten Thread
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Textarea {...field} disabled={pending} />
            </FormControl>
          </FormItem>
        )}
      />
      <input type="hidden" {...form.register("createdAt")} />
      <input type="hidden" {...form.register("updatedAt")} />
      <input type="hidden" {...form.register("createdBy")} />
      <input type="hidden" {...form.register("updatedBy")} />

      <div className="flex justify-end">
        <Button disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Thread"}
        </Button>
      </div>
    </div>
  );
}
