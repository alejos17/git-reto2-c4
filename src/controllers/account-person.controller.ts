import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Account,
  Person,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountPersonController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Account',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Account.prototype.id,
  ): Promise<Person> {
    return this.accountRepository.person(id);
  }
}
