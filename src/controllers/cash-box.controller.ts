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
import {CashBox} from '../models';
import {CashBoxRepository} from '../repositories';

export class CashBoxController {
  constructor(
    @repository(CashBoxRepository)
    public cashBoxRepository : CashBoxRepository,
  ) {}

  @post('/cash-boxes')
  @response(200, {
    description: 'CashBox model instance',
    content: {'application/json': {schema: getModelSchemaRef(CashBox)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CashBox, {
            title: 'NewCashBox',
            exclude: ['id'],
          }),
        },
      },
    })
    cashBox: Omit<CashBox, 'id'>,
  ): Promise<CashBox> {
    return this.cashBoxRepository.create(cashBox);
  }

  @get('/cash-boxes/count')
  @response(200, {
    description: 'CashBox model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CashBox) where?: Where<CashBox>,
  ): Promise<Count> {
    return this.cashBoxRepository.count(where);
  }

  @get('/cash-boxes')
  @response(200, {
    description: 'Array of CashBox model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CashBox, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CashBox) filter?: Filter<CashBox>,
  ): Promise<CashBox[]> {
    return this.cashBoxRepository.find(filter);
  }

  @patch('/cash-boxes')
  @response(200, {
    description: 'CashBox PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CashBox, {partial: true}),
        },
      },
    })
    cashBox: CashBox,
    @param.where(CashBox) where?: Where<CashBox>,
  ): Promise<Count> {
    return this.cashBoxRepository.updateAll(cashBox, where);
  }

  @get('/cash-boxes/{id}')
  @response(200, {
    description: 'CashBox model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CashBox, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CashBox, {exclude: 'where'}) filter?: FilterExcludingWhere<CashBox>
  ): Promise<CashBox> {
    return this.cashBoxRepository.findById(id, filter);
  }

  @patch('/cash-boxes/{id}')
  @response(204, {
    description: 'CashBox PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CashBox, {partial: true}),
        },
      },
    })
    cashBox: CashBox,
  ): Promise<void> {
    await this.cashBoxRepository.updateById(id, cashBox);
  }

  @put('/cash-boxes/{id}')
  @response(204, {
    description: 'CashBox PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cashBox: CashBox,
  ): Promise<void> {
    await this.cashBoxRepository.replaceById(id, cashBox);
  }

  @del('/cash-boxes/{id}')
  @response(204, {
    description: 'CashBox DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cashBoxRepository.deleteById(id);
  }
}
