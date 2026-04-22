/**
 * @generated SignedSource<<5b70cc892d4f28c5393465ba5e793afb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type OrderByDirection = "AscNullsFirst" | "AscNullsLast" | "DescNullsFirst" | "DescNullsLast" | "%future added value";
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
export type NoticesOrderBy = {
  body?: OrderByDirection | null | undefined;
  communityId?: OrderByDirection | null | undefined;
  createdAt?: OrderByDirection | null | undefined;
  createdBy?: OrderByDirection | null | undefined;
  id?: OrderByDirection | null | undefined;
  pinned?: OrderByDirection | null | undefined;
  title?: OrderByDirection | null | undefined;
  updatedAt?: OrderByDirection | null | undefined;
};
export type NoticeboardPageWrapperQuery$variables = {
  filter?: NoticesFilter | null | undefined;
  first?: number | null | undefined;
  orderBy?: ReadonlyArray<NoticesOrderBy> | null | undefined;
};
export type NoticeboardPageWrapperQuery$data = {
  readonly noticesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"NoticeCardFragment">;
      };
    }>;
  } | null | undefined;
};
export type NoticeboardPageWrapperQuery = {
  response: NoticeboardPageWrapperQuery$data;
  variables: NoticeboardPageWrapperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v3 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NoticeboardPageWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "NoticesConnection",
        "kind": "LinkedField",
        "name": "noticesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NoticesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Notices",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "NoticeCardFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "NoticeboardPageWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "NoticesConnection",
        "kind": "LinkedField",
        "name": "noticesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NoticesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Notices",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
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
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdBy",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profiles",
                    "kind": "LinkedField",
                    "name": "profiles",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "firstName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatarUrl",
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0cb3a0cb553f1b27904d1f09728f9cb0",
    "id": null,
    "metadata": {},
    "name": "NoticeboardPageWrapperQuery",
    "operationKind": "query",
    "text": "query NoticeboardPageWrapperQuery(\n  $filter: NoticesFilter\n  $orderBy: [NoticesOrderBy!]\n  $first: Int\n) {\n  noticesCollection(filter: $filter, orderBy: $orderBy, first: $first) {\n    edges {\n      node {\n        id\n        ...NoticeCardFragment\n        nodeId\n      }\n    }\n  }\n}\n\nfragment NoticeCardFragment on Notices {\n  id\n  title\n  body\n  pinned\n  createdAt\n  createdBy\n  profiles {\n    firstName\n    lastName\n    avatarUrl\n    nodeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "441c1affb5b0c0651ff9940579a520ef";

export default node;
