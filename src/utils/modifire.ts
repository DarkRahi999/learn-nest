import { ClassConstructor, plainToInstance } from 'class-transformer';
declare function ItoResponse<T, V>(cls: ClassConstructor<T>, plain: V[]): T[];
declare function ItoResponse<T, V>(cls: ClassConstructor<T>, plain: V): T;
export const toResponse: typeof ItoResponse = (Cls, data) => {
  return plainToInstance(Cls, data, { excludeExtraneousValues: true });
};
