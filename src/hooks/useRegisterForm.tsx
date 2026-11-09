import { createFormHook, formOptions } from "@tanstack/react-form";
import z from "zod";
import { fieldContext, formContext } from "./useForm";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import { InputGroupInlineEnd, SubscribeButton, TextField } from "#/routes/(auth)/login";

const formSchema = z.object({
  name: z.string().min(3, 'Min 3 symbols').max(255, 'Max 255 symbols'),
  lastName: z.string().min(3, 'Min 3 symbols').max(255, 'Max 255 symbols'),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Min 8 symbols').max(255, 'Max 255 symbols'),
})

type TRegisterForm = z.infer<typeof formSchema>;

const defaultValues: TRegisterForm = { name: "" , email: "", password: "", lastName: '' };

const formOpts = formOptions({ defaultValues }); 

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    InputGroupInlineEnd,
  },
  formComponents: {
    SubscribeButton,
  },
})

export default function useRegisterForm() {
  const [shownPassword, setViewPassword] = useState<boolean>(false);
  const toggleViewPassword = () => {
    setViewPassword((prev) => !prev)
  }

  // navigate
  const navigate = useNavigate({ from: "/register" });

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      //console.log(value);
            
      await authClient.signUp.email(
        {
          name: value.name,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            // go to home page
            navigate({ to: "/" });
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message ?? "Register error", {
              position: "bottom-right",
            });
          },
        },
      );
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  return { form, shownPassword, toggleViewPassword };
}