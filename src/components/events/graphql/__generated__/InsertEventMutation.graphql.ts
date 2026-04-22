/**
 * @generated SignedSource<<d4b8a45aa0017bc6ff70e9cc9d6bf08b>>
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
  imageUrl?: string | null | undefined;
  location?: string | null | undefined;
  maxAttendees?: number | null | undefined;
  pinned?: boolean | null | undefined;
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
};
export type InsertEventMutation$variables = {
  input: ReadonlyArray<EventsInsertInput>;
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
    "cacheID": "e098ae31b65dd6a203459570543afcdc",
    "id": null,
    "metadata": {},
    "name": "InsertEventMutation",
    "operationKind": "mutation",
    "text": "mutation InsertEventMutation(\n  $input: [EventsInsertInput!]!\n) {\n  insertIntoEventsCollection(objects: $input) {\n    affectedCount\n    records {\n      id\n      title\n      eventDate\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "51ac599dea3e9605cef38116b89aff85";

export default node;
