import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Person} from './person.model';

@model()
export class CashBox extends Entity {
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
  nInvoice: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  concept: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @belongsTo(() => Person)
  personId: string;

  constructor(data?: Partial<CashBox>) {
    super(data);
  }
}

export interface CashBoxRelations {
  // describe navigational properties here
}

export type CashBoxWithRelations = CashBox & CashBoxRelations;
