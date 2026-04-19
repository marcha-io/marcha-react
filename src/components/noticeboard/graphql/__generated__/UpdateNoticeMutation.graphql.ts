/**
 * @generated SignedSource<<01cf2602044bc4e043716b434fb02a78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type NoticesUpdateInput = {
  body?: string | null | undefined;
  communityId?: string | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: string | null | undefined;
  id?: string | null | undefined;
  pinned?: boolean | null | undefined;
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
};
export type NoticesFilter = {
  and?: ReadonlyArray<NoticesFilter> | null | undefined;
  body?: StringFilter | null | undefined;
  communityId?: BigIntFilter | null | undefined;
  createdAt?: DatetimeFilter | null | undefined;
  createdBy?: UUIDFilter | null | undefined;
  id?: UUIDFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: NoticesFilter | null | undefined;
  or?: ReadonlyArray<NoticesFilter> | null | undefined;
  pinned?: BooleanFilter | null | undefined;
  title?: StringFilter | null | undefined;
  updatedAt?: DatetimeFilter | null | undefined;
};
export type UUIDFilter = {
  eq?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: string | null | undefined;
};
export type StringFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  ilike?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  iregex?: string | null | undefined;
  is?: FilterIs | null | undefined;
  like?: string | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
  regex?: string | null | undefined;
  startsWith?: string | null | undefined;
};
export type BooleanFilter = {
  eq?: boolean | null | undefined;
  is?: FilterIs | null | undefined;
};
export type BigIntFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
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
export type UpdateNoticeMutation$variables = {
  atMost: number;
  filter: NoticesFilter;
  set: NoticesUpdateInput;
};
export type UpdateNoticeMutation$data = {
  readonly updateNoticesCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly body: string;
      readonly id: string;
      readonly nodeId: string;
      readonly pinned: boolean;
      readonly title: string;
    }>;
  };
};
export type UpdateNoticeMutation = {
  response: UpdateNoticeMutation$data;
  variables: UpdateNoticeMutation$variables;
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
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "set"
},
v3 = [
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
      },
      {
        "kind": "Variable",
        "name": "set",
        "variableName": "set"
      }
    ],
    "concreteType": "NoticesUpdateResponse",
    "kind": "LinkedField",
    "name": "updateNoticesCollection",
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
            "name": "body",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateNoticeMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UpdateNoticeMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "fd39afabaaa6c27585f667a1b300dc17",
    "id": null,
    "metadata": {},
    "name": "UpdateNoticeMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateNoticeMutation(\n  $set: NoticesUpdateInput!\n  $filter: NoticesFilter!\n  $atMost: Int!\n) {\n  updateNoticesCollection(set: $set, filter: $filter, atMost: $atMost) {\n    affectedCount\n    records {\n      id\n      title\n      body\n      pinned\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b16cd94185b794160fcb1756ec1fb0db";

export default node;
