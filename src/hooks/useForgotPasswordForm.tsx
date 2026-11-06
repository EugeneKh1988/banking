import { createFormHook, formOptions } from "@tanstack/react-form";
import z from "zod";
import { fieldContext, formContext } from "./useForm";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import { SubscribeButton, TextField } from "#/routes/(auth)/login";

const formSchema = z.object({
  email: z.email("Invalid email"),
});

type TRegisterForm = z.infer<typeof formSchema>;

const defaultValues: TRegisterForm = { email: "" };

const formOpts = formOptions({ defaultValues }); 

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField
  },
  formComponents: {
    SubscribeButton,
  },
})

export default function useForgotPasswordForm() {

  // navigate
  const navigate = useNavigate({ from: "/forgot-password" });

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      //console.log(value);
            
      await authClient.requestPasswordReset(
        {
          email: value.email,
          redirectTo: "/reset-password"
        },
        {
          onSuccess: () => {
            // go to home page
            navigate({ to: "/login" });
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message ?? "Forgot password error", {
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

  return { form };
}