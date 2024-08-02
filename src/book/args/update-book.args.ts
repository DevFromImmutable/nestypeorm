import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookArgs {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field((type) => Int)
  price: number;
}
