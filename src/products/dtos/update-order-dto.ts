import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  IsUUID,
} from 'class-validator';

export class UpdateOrderDTO {

@IsNotEmpty()
  @IsUUID()
  @IsString()
clientId: string;

  @IsInt()
  @Min(0)
  price: number;

  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  address: string;

   @IsNotEmpty()
  @IsUUID()
  @IsString()
productId: string;
}
