/**
 * @generated SignedSource<<92d149526ef0c19d0a8e69e292b6e401>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RsvpStatus = "attending" | "not_attending" | "%future added value";
export type EventRsvpsInsertInput = {
  createdAt?: string | null | undefined;
  eventId?: string | null | undefined;
  id?: string | null | undefined;
  status?: RsvpStatus | null | undefined;
  userId?: string | null | undefined;
};
export type RsvpMutationsInsertMutation$variables = {
  objects: ReadonlyArray<EventRsvpsInsertInput>;
};
export type RsvpMutationsInsertMutation$data = {
  readonly insertIntoEventRsvpsCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly eventId: string;
      readonly id: string;
      readonly nodeId: string;
      readonly status: RsvpStatus;
      readonly userId: string;
    }>;
  } | null | undefined;
};
export type RsvpMutationsInsertMutation = {
  response: RsvpMutationsInsertMutation$data;
  variables: RsvpMutationsInsertMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "objects"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "objects",
        "variableName": "objects"
      }
    ],
    "concreteType": "EventRsvpsInsertResponse",
    "kind": "LinkedField",
    "name": "insertIntoEventRsvpsCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "affectedCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EventRsvps",
        "kind": "LinkedField",
        "name": "records",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "eventId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nodeId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RsvpMutationsInsertMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RsvpMutationsInsertMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ee4a5a55d583fcce14c05527f91ca4a8",
    "id": null,
    "metadata": {},
    "name": "RsvpMutationsInsertMutation",
    "operationKind": "mutation",
    "text": "mutation RsvpMutationsInsertMutation(\n  $objects: [EventRsvpsInsertInput!]!\n) {\n  insertIntoEventRsvpsCollection(objects: $objects) {\n    affectedCount\n    records {\n      id\n      eventId\n      userId\n      status\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1bbe8f237600090ae02cb1e5e071c930";

export default node;
