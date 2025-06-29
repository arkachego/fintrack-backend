// Libraries
import { Model, RelationMappings } from 'objection';
import Knex, { Knex as KnexType } from 'knex';

// Utilities
import knexConfig from '../migrations/knexfile';

// Initialize Knex
const knex: KnexType = Knex(knexConfig);

// Bind all Models to the knex instance
Model.knex(knex);

// Export
export { Model, RelationMappings, knex };
