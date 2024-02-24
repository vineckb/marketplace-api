import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MerchantEntity } from '../entity';

@ObjectType()
export class Merchant {
  @Field(() => ID, { nullable: true })
  public id: string = '';

  @Field({ nullable: true })
  public name: string = '';

  @Field({ nullable: true })
  public media: string = '';

  @Field({ nullable: true })
  public address: string = '';

  @Field({ nullable: true })
  public lat: number = 0;

  @Field({ nullable: true })
  public lng: number = 0;

  constructor(merchant: MerchantEntity) {
    console.log('constructor', merchant, !!merchant);
    if (merchant) {
      this.id = `${merchant.id}`;
      this.name = `${merchant.name}`;
      this.media = `${merchant.media}`;
      this.address = `${merchant.address}`;
      this.lat = merchant.lat + 0;
      this.lng = merchant.lng + 0;
    }
  }
}
