import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Credit, CreditRelations, Person} from '../models';
import {PersonRepository} from './person.repository';

export class CreditRepository extends DefaultCrudRepository<
  Credit,
  typeof Credit.prototype.id,
  CreditRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof Credit.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Credit, dataSource);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
