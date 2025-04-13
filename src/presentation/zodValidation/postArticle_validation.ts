import {z} from "zod";

export const formSchema = z.object({
  titulo: z.string().nonempty({message: "El titulo es requerido"}),
  contenido: z.string().nonempty({message: "El contenido es requerido"}),
  id_categoria: z.number({message: "La categoria es requerida"}),
  imagen_principal: z.string().nonempty({message: "La imagen es requerida"})
});

export type FormArticle = z.infer<typeof formSchema>;