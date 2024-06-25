import { createThreadSchema } from "@/lib/validations/thread";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormAction } from "@/hooks/use-form-actions";
import { useToast } from "@/components/ui/use-toast";
import { createThread } from "@/action/thread-action";

type Inputs = z.infer<typeof createThreadSchema>;

export function CreateThreadForm() {
  const { data: session } = useSession();

  const { toast } = useToast();

  const [state, formAction, pending] = useActionState(createThread, undefined);

  const form = useFormAction<Inputs>({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      thredTitle: "",
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

  //   const form = useForm<Inputs>({
  //     resolver: zodResolver(addThreadSchema),
  //     defaultValues: {
  //       thredTitle: "",
  //       threadContent: "",
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       createdBy: session?.user.uuid!,
  //       updatedBy: session?.user.uuid!,
  //     },
  //   });

  function onSubmit(data: Inputs) {
    console.log(data);
  }
}
