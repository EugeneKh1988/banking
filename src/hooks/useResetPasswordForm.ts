import { createFormHook, formOptions } from "@tanstack/react-form";
import z from "zod";
import { fieldContext, formContext } from "./useForm";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { InputGroupInlineEnd, SubscribeButton } from "#/routes/(auth)/login";

const formSchema = z.object({
  newPassword: z
      .string()
      .min(8, "Min 8 symbols")
      .max(255, "Max 255 symbols"),
});

type TResetPasswordForm = z.infer<typeof formSchema>;

const defaultValues: TResetPasswordForm = { newPassword: "" };

const formOpts = formOptions({ defaultValues }); 

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputGroupInlineEnd,
  },
  formComponents: {
    SubscribeButton,
  },
})

const routeApi = getRouteApi('/(auth)/reset-password');

export default function useResetPasswordForm() {
  const [shownPassword, setViewPassword] = useState<boolean>(false)

  const toggleViewPassword = () => {
    setViewPassword((prev) => !prev)
  }
  // navigate
  const navigate = useNavigate({ from: "/reset-password" });
  
  // get search params
  const { token } = routeApi.useSearch();

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      //console.log(value);
            
      await authClient.resetPassword(
        {
          newPassword: value.newPassword,
          token,
        },
        {
          onSuccess: () => {
            // go to login page
            navigate({ to: "/login" });
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message ?? "Reset password error", {
              position: "bottom-right",
            });
          },
          /* onRequest: () => {
            setLoading(true);
          }, */
        },
      );
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  return { form, shownPassword, toggleViewPassword };
}