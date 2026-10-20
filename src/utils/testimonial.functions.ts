import { db } from "#/db";
import { clientType, testimonials, user } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { inArray, desc, eq, getTableColumns } from "drizzle-orm";
import z from "zod";
import type { ITestimonial, TUser } from "./interfaces";

// schema for getting data
const getTestimonialSchema = z.object({
  limit: z
    .number()
    .optional()
    .transform((v) => Number(v ?? 4))
    .refine((v) => v > 0 && v <= 20, {
      message: "limit must be between 1 and 20",
    }),
    client: z
    .string()
    .optional()
    .transform((v) => String(v ?? "individual"))
    .refine((v) => v && v.length > 0, {
      message: "clientType must be set",
    }),
});

type TTestimonial = {testimonials: ITestimonial[], users: TUser[] };

export const getTestimonial = createServerFn({ method: 'GET' })
  .validator(getTestimonialSchema)
  .handler(async ({ data }): Promise<TTestimonial> => {
    const { limit, client } = data
    const testimonial = await db
      .select({...getTableColumns(testimonials)})
      .from(testimonials)
      .orderBy(desc(testimonials.id))
      .leftJoin(clientType, eq(testimonials.clientTypeId, clientType.id))
      .where(eq(clientType.name, client))
      .limit(limit)

    const usersId = [...new Set(testimonial.map((f) => f.userId))]

    const users = await db
      .select({ id: user.id, name: user.name, image: user.image })
      .from(user)
      .where(inArray(user.id, usersId))

    return { testimonials: testimonial, users }
  })