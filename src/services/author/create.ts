import {authService} from "@/modules/author.module";

import { ICreateAuthorDto } from "@/entities/author/create.author.dto";

export async function createAuthor(body: ICreateAuthorDto){
    return authService.create(body);
}