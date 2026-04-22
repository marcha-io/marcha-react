/**
 * @generated SignedSource<<7bb2eb6dd66b0c4a7f71a776b001600d>>
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
  input: ReadonlyArray<NoticesInsertInput>;
};
export type InsertNoticeMutation$data = {
  readonly insertIntoNoticesCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly id: string;
      readonly nodeId: string;
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
    "cacheID": "73dc63be8cca17ad64ac40110f0414f7",
    "id": null,
    "metadata": {},
    "name": "InsertNoticeMutation",
    "operationKind": "mutation",
    "text": "mutation InsertNoticeMutation(\n  $input: [NoticesInsertInput!]!\n) {\n  insertIntoNoticesCollection(objects: $input) {\n    affectedCount\n    records {\n      id\n      title\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "92bf5b1820c5f1d795e5f82646496ba0";

export default node;
