/**
 * @generated SignedSource<<08cedd69ce7c015ea8451717a6214b96>>
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
  input: ReadonlyArray<EventRsvpsInsertInput>;
};
export type RsvpMutationsInsertMutation$data = {
  readonly insertIntoEventRsvpsCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly id: string;
      readonly nodeId: string;
      readonly status: RsvpStatus;
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
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "objects",
        "variableName": "input"
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
    "cacheID": "33bc5104b4fd8c904ee7038db9e4e593",
    "id": null,
    "metadata": {},
    "name": "RsvpMutationsInsertMutation",
    "operationKind": "mutation",
    "text": "mutation RsvpMutationsInsertMutation(\n  $input: [EventRsvpsInsertInput!]!\n) {\n  insertIntoEventRsvpsCollection(objects: $input) {\n    affectedCount\n    records {\n      id\n      status\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a76f66e6d2049d238362d50995e6b71e";

export default node;
