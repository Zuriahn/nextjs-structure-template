import AxiosService from "@/config/axios.service.config";

import { IResponse } from "@/entities/response.class";
import { ICreateAuthorDto } from "@/entities/author/create.author.dto";
import { IAuthorDto } from "@/entities/author/author.dto";

class AuthorService extends AxiosService {
  constructor() {
    super("/Authors");
  }

  async create(body: ICreateAuthorDto) {
    return await this.axiosInstance.post<IResponse<null>>("", body);
  }

  async getAll() : Promise<IAuthorDto[]> {
    const { data } = await this.axiosInstance.get<IAuthorDto[]>("");
    return data;
  }
}

export const authService = new AuthorService();
