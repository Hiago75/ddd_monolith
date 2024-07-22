export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface AddClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FindClientFacadeInputDTO {
  id: string;
}

export interface FindClientFacadeOutputDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date
}

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>
  find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>
}