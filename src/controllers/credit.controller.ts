import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Credit} from '../models';
import {CreditRepository} from '../repositories';

export class CreditController {
  constructor(
    @repository(CreditRepository)
    public creditRepository : CreditRepository,
  ) {}

  @post('/credits')
  @response(200, {
    description: 'Credit model instance',
    content: {'application/json': {schema: getModelSchemaRef(Credit)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credit, {
            title: 'NewCredit',
            exclude: ['id'],
          }),
        },
      },
    })
    credit: Omit<Credit, 'id'>,
  ): Promise<Credit> {
    return this.creditRepository.create(credit);
  }

  @get('/credits/count')
  @response(200, {
    description: 'Credit model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Credit) where?: Where<Credit>,
  ): Promise<Count> {
    return this.creditRepository.count(where);
  }

  @get('/credits')
  @response(200, {
    description: 'Array of Credit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Credit, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Credit) filter?: Filter<Credit>,
  ): Promise<Credit[]> {
    return this.creditRepository.find(filter);
  }

  @patch('/credits')
  @response(200, {
    description: 'Credit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credit, {partial: true}),
        },
      },
    })
    credit: Credit,
    @param.where(Credit) where?: Where<Credit>,
  ): Promise<Count> {
    return this.creditRepository.updateAll(credit, where);
  }

  @get('/credits/{id}')
  @response(200, {
    description: 'Credit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Credit, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Credit, {exclude: 'where'}) filter?: FilterExcludingWhere<Credit>
  ): Promise<Credit> {
    return this.creditRepository.findById(id, filter);
  }

  @patch('/credits/{id}')
  @response(204, {
    description: 'Credit PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credit, {partial: true}),
        },
      },
    })
    credit: Credit,
  ): Promise<void> {
    await this.creditRepository.updateById(id, credit);
  }

  @put('/credits/{id}')
  @response(204, {
    description: 'Credit PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() credit: Credit,
  ): Promise<void> {
    await this.creditRepository.replaceById(id, credit);
  }

  @del('/credits/{id}')
  @response(204, {
    description: 'Credit DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.creditRepository.deleteById(id);
  }
}
