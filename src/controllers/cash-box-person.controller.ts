import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CashBox,
  Person,
} from '../models';
import {CashBoxRepository} from '../repositories';

export class CashBoxPersonController {
  constructor(
    @repository(CashBoxRepository)
    public cashBoxRepository: CashBoxRepository,
  ) { }

  @get('/cash-boxes/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to CashBox',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof CashBox.prototype.id,
  ): Promise<Person> {
    return this.cashBoxRepository.person(id);
  }
}
