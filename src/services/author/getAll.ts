import { IAuthorDto } from "@/entities/author/author.dto";
import { authService } from "@/modules/author.module";

export async function getAll() : Promise<IAuthorDto[]> {
  return authService.getAll();
}
