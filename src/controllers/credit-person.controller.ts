import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Credit,
  Person,
} from '../models';
import {CreditRepository} from '../repositories';

export class CreditPersonController {
  constructor(
    @repository(CreditRepository)
    public creditRepository: CreditRepository,
  ) { }

  @get('/credits/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Credit',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Credit.prototype.id,
  ): Promise<Person> {
    return this.creditRepository.person(id);
  }
}
