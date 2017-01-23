import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLUnionType,
  GraphQLBoolean
} from 'graphql';
import {makeEnumValues} from '../utils';
import {
  ADD_USER,
  AUTO_PAUSE_USER,
  REMOVE_USER,
  PAUSE_USER,
  UNPAUSE_USER
} from 'server/utils/serverConstants';

export const HookType = new GraphQLEnumType({
  name: 'HookType',
  description: 'The cause of the invoice item line being created',
  values: makeEnumValues([
    ADD_USER,
    AUTO_PAUSE_USER,
    REMOVE_USER,
    PAUSE_USER,
    UNPAUSE_USER
  ])
});

export const InvoiceItemHook = new GraphQLObjectType({
  name: 'InvoiceItemHook',
  description: 'A hook to link the subscription update to the correlating invoice items that stripe will make',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID), description: 'shortid'},
    type: {
      type: HookType,
      description: 'The reason for the subscription quantity update'
    },
    prorationDate: {
      type: GraphQLFloat,
      description: `
      *Timestamp with 1-second resolution. 
      Composite key: prorationDateSubId to link subscription change to invoice items`
    },
    subId: {
      type: GraphQLID,
      description: 'The stripeSubscriptionId from the org that is associated with the change'
    },
    userId: {
      type: GraphQLID,
      description: 'The user that was added/removed/paused/unpaused'
    }
  })
});
