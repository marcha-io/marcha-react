/**
 * @generated SignedSource<<df0319ed2b9207000b44c6d91f3faa63>>
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
export type ProductCondition = "Good" | "Like_new" | "New" | "Used" | "%future added value";
export type ProductsFilter = {
  and?: ReadonlyArray<ProductsFilter> | null | undefined;
  categoryId?: UUIDFilter | null | undefined;
  condition?: ProductConditionFilter | null | undefined;
  createdAt?: DatetimeFilter | null | undefined;
  description?: StringFilter | null | undefined;
  id?: BigIntFilter | null | undefined;
  isPublic?: BooleanFilter | null | undefined;
  name?: StringFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: ProductsFilter | null | undefined;
  or?: ReadonlyArray<ProductsFilter> | null | undefined;
  price?: FloatFilter | null | undefined;
  userId?: UUIDFilter | null | undefined;
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
export type FloatFilter = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: ReadonlyArray<number> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  neq?: number | null | undefined;
};
export type UUIDFilter = {
  eq?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: string | null | undefined;
};
export type ProductConditionFilter = {
  eq?: ProductCondition | null | undefined;
  in?: ReadonlyArray<ProductCondition> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: ProductCondition | null | undefined;
};
export type BooleanFilter = {
  eq?: boolean | null | undefined;
  is?: FilterIs | null | undefined;
};
export type IDFilter = {
  eq?: string | null | undefined;
};
export type ProductsOrderBy = {
  categoryId?: OrderByDirection | null | undefined;
  condition?: OrderByDirection | null | undefined;
  createdAt?: OrderByDirection | null | undefined;
  description?: OrderByDirection | null | undefined;
  id?: OrderByDirection | null | undefined;
  isPublic?: OrderByDirection | null | undefined;
  name?: OrderByDirection | null | undefined;
  price?: OrderByDirection | null | undefined;
  userId?: OrderByDirection | null | undefined;
};
export type MarketplacePaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  filter?: ProductsFilter | null | undefined;
  orderBy?: ReadonlyArray<ProductsOrderBy> | null | undefined;
};
export type MarketplacePaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MarketplacePaginationFragment">;
};
export type MarketplacePaginationQuery = {
  response: MarketplacePaginationQuery$data;
  variables: MarketplacePaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 12,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filter"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderBy"
  }
],
v1 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v2 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v3 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MarketplacePaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "MarketplacePaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MarketplacePaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ProductsConnection",
        "kind": "LinkedField",
        "name": "productsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Products",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "price",
                    "storageKey": null
                  },
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
                    "name": "categoryId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "condition",
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
                    "concreteType": "Profiles",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatarUrl",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "username",
                        "storageKey": null
                      },
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 1
                      },
                      {
                        "kind": "Literal",
                        "name": "orderBy",
                        "value": [
                          {
                            "displayOrder": "AscNullsLast"
                          }
                        ]
                      }
                    ],
                    "concreteType": "ProductImagesConnection",
                    "kind": "LinkedField",
                    "name": "productImagesCollection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ProductImagesEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ProductImages",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "imageUrl",
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "productImagesCollection(first:1,orderBy:[{\"displayOrder\":\"AscNullsLast\"}])"
                  },
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "filter",
          "orderBy"
        ],
        "handle": "connection",
        "key": "Marketplace_productsCollection",
        "kind": "LinkedHandle",
        "name": "productsCollection"
      }
    ]
  },
  "params": {
    "cacheID": "51e63ccd39d220e7b54ebaa79f6805a4",
    "id": null,
    "metadata": {},
    "name": "MarketplacePaginationQuery",
    "operationKind": "query",
    "text": "query MarketplacePaginationQuery(\n  $count: Int = 12\n  $cursor: Cursor\n  $filter: ProductsFilter\n  $orderBy: [ProductsOrderBy!]\n) {\n  ...MarketplacePaginationFragment_1FfpYs\n}\n\nfragment MarketplacePaginationFragment_1FfpYs on Query {\n  productsCollection(first: $count, after: $cursor, filter: $filter, orderBy: $orderBy) {\n    edges {\n      node {\n        ...ProductCardFragmentQuery\n        nodeId\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ProductCardFragmentQuery on Products {\n  name\n  description\n  price\n  id\n  categoryId\n  condition\n  userId\n  user {\n    avatarUrl\n    username\n    firstName\n    lastName\n    nodeId\n  }\n  productImagesCollection(first: 1, orderBy: [{displayOrder: AscNullsLast}]) {\n    edges {\n      node {\n        imageUrl\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cf7c17b8ff3769edc7966dbb76103109";

export default node;
