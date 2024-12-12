import { z } from 'zod';

const bookSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  autor: z.string(),
  paginas: z.coerce.number(),
  papel: z.string().optional(),
  precio: z.coerce.number().optional(),
  imagen: z.string(),
});

export type Book = z.infer<typeof bookSchema>;

export type BookLanding = Book & {
  selected: boolean;
};

export type CartItemType = Book & {
  cantidad: number;
};
