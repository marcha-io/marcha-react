/**
 * @generated SignedSource<<cabee31e7afdde64aeba3e54dbc7efb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type RsvpStatus = "attending" | "not_attending" | "%future added value";
export type EventRsvpsFilter = {
  and?: ReadonlyArray<EventRsvpsFilter> | null | undefined;
  createdAt?: DatetimeFilter | null | undefined;
  eventId?: UUIDFilter | null | undefined;
  id?: UUIDFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: EventRsvpsFilter | null | undefined;
  or?: ReadonlyArray<EventRsvpsFilter> | null | undefined;
  status?: RsvpStatusFilter | null | undefined;
  userId?: UUIDFilter | null | undefined;
};
export type UUIDFilter = {
  eq?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: string | null | undefined;
};
export type RsvpStatusFilter = {
  eq?: RsvpStatus | null | undefined;
  in?: ReadonlyArray<RsvpStatus> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: RsvpStatus | null | undefined;
};
export type DatetimeFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
};
export type IDFilter = {
  eq?: string | null | undefined;
};
export type RsvpMutationsDeleteMutation$variables = {
  atMost: number;
  filter: EventRsvpsFilter;
};
export type RsvpMutationsDeleteMutation$data = {
  readonly deleteFromEventRsvpsCollection: {
    readonly affectedCount: number;
  };
};
export type RsvpMutationsDeleteMutation = {
  response: RsvpMutationsDeleteMutation$data;
  variables: RsvpMutationsDeleteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "atMost"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "atMost",
        "variableName": "atMost"
      },
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      }
    ],
    "concreteType": "EventRsvpsDeleteResponse",
    "kind": "LinkedField",
    "name": "deleteFromEventRsvpsCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "affectedCount",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RsvpMutationsDeleteMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RsvpMutationsDeleteMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d01dca55474cbdf032ace07b1e46da45",
    "id": null,
    "metadata": {},
    "name": "RsvpMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation RsvpMutationsDeleteMutation(\n  $filter: EventRsvpsFilter!\n  $atMost: Int!\n) {\n  deleteFromEventRsvpsCollection(filter: $filter, atMost: $atMost) {\n    affectedCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "9da924eadbb94db955fa4fc655d1fca5";

export default node;
