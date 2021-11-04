import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Person} from './person.model';

@model()
export class Credit extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  idCredit: string;

  @property({
    type: 'number',
    required: true,
  })
  interest: number;

  @property({
    type: 'number',
    required: true,
  })
  insurance: number;

  @property({
    type: 'number',
    required: true,
  })
  fees: number;

  @property({
    type: 'number',
    required: true,
  })
  fee: number;

  @property({
    type: 'number',
    required: true,
  })
  intFee: number;

  @property({
    type: 'number',
    required: true,
  })
  capital: number;

  @property({
    type: 'number',
    required: true,
  })
  interests: number;

  @belongsTo(() => Person)
  personId: string;

  constructor(data?: Partial<Credit>) {
    super(data);
  }
}

export interface CreditRelations {
  // describe navigational properties here
}

export type CreditWithRelations = Credit & CreditRelations;
