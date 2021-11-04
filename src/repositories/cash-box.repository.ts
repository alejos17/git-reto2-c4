import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CashBox, CashBoxRelations, Person} from '../models';
import {PersonRepository} from './person.repository';

export class CashBoxRepository extends DefaultCrudRepository<
  CashBox,
  typeof CashBox.prototype.id,
  CashBoxRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof CashBox.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(CashBox, dataSource);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
