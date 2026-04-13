/**
 * @generated SignedSource<<687de451704ac96d75b6cb77daff6453>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NoticesInsertInput = {
  body?: string | null | undefined;
  communityId?: string | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: string | null | undefined;
  id?: string | null | undefined;
  pinned?: boolean | null | undefined;
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
};
export type InsertNoticeMutation$variables = {
  objects: ReadonlyArray<NoticesInsertInput>;
};
export type InsertNoticeMutation$data = {
  readonly insertIntoNoticesCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly id: string;
      readonly nodeId: string;
      readonly pinned: boolean;
      readonly title: string;
    }>;
  } | null | undefined;
};
export type InsertNoticeMutation = {
  response: InsertNoticeMutation$data;
  variables: InsertNoticeMutation$variables;
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
    "concreteType": "NoticesInsertResponse",
    "kind": "LinkedField",
    "name": "insertIntoNoticesCollection",
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
        "concreteType": "Notices",
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
            "name": "pinned",
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
    "name": "InsertNoticeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InsertNoticeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fe77491b835a80b8cec0266ea75f63dd",
    "id": null,
    "metadata": {},
    "name": "InsertNoticeMutation",
    "operationKind": "mutation",
    "text": "mutation InsertNoticeMutation(\n  $objects: [NoticesInsertInput!]!\n) {\n  insertIntoNoticesCollection(objects: $objects) {\n    affectedCount\n    records {\n      id\n      title\n      pinned\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "44d7d4de1dca1dc5cf3dfb7154781aad";

export default node;
