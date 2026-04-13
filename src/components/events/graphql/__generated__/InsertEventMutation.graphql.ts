/**
 * @generated SignedSource<<377fc26f6c5898691927a367e86f3a41>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EventsInsertInput = {
  communityId?: string | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: string | null | undefined;
  description?: string | null | undefined;
  eventDate?: string | null | undefined;
  id?: string | null | undefined;
  image?: string | null | undefined;
  location?: string | null | undefined;
  maxAttendees?: number | null | undefined;
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
};
export type InsertEventMutation$variables = {
  objects: ReadonlyArray<EventsInsertInput>;
};
export type InsertEventMutation$data = {
  readonly insertIntoEventsCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly eventDate: string;
      readonly id: string;
      readonly nodeId: string;
      readonly title: string;
    }>;
  } | null | undefined;
};
export type InsertEventMutation = {
  response: InsertEventMutation$data;
  variables: InsertEventMutation$variables;
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
    "concreteType": "EventsInsertResponse",
    "kind": "LinkedField",
    "name": "insertIntoEventsCollection",
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
        "concreteType": "Events",
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "eventDate",
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
    "name": "InsertEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InsertEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0488b65f704f0f6d5d2820b13259b765",
    "id": null,
    "metadata": {},
    "name": "InsertEventMutation",
    "operationKind": "mutation",
    "text": "mutation InsertEventMutation(\n  $objects: [EventsInsertInput!]!\n) {\n  insertIntoEventsCollection(objects: $objects) {\n    affectedCount\n    records {\n      id\n      title\n      eventDate\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "961978b4c1ab0ae62c17b164dd22ea4b";

export default node;
