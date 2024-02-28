import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  client: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  address: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
productId: string;

@IsNotEmpty()
  @IsUUID()
  @IsString()
clientId: string;

}
