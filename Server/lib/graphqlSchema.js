const { buildSchema } = require('graphql');
const { mergeTypes } = require('merge-graphql-schemas');

const actor = require('./actorManager.js');

exports.schema = buildSchema(mergeTypes([actor.schema], {all: true}));

exports.rootValue = {
  ...actor.rootValue
};