export interface ITestimonial {
  id: number
  body: string
  clientTypeId: number
  userId: string
  createdAt?: Date | null
}

export interface IUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  role?: string
  image?: string | null
  createdAt: string
  updatedAt: string
}

export type TUser = Omit<
  IUser,
  'email' | 'emailVerified' | 'createdAt' | 'updatedAt' | 'role'
>