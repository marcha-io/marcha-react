/**
 * @generated SignedSource<<467e2b60158f62cd9362fb80e4aee1e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProductsCommunitiesInsertInput = {
  communityId?: string | null | undefined;
  createdAt?: string | null | undefined;
  productId?: string | null | undefined;
};
export type InsertProductCommunityMutationMutation$variables = {
  objects: ReadonlyArray<ProductsCommunitiesInsertInput>;
};
export type InsertProductCommunityMutationMutation$data = {
  readonly insertIntoProductsCommunitiesCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly communityId: string | null | undefined;
      readonly id: string;
      readonly productId: string;
    }>;
  } | null | undefined;
};
export type InsertProductCommunityMutationMutation = {
  response: InsertProductCommunityMutationMutation$data;
  variables: InsertProductCommunityMutationMutation$variables;
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
    "kind": "Variable",
    "name": "objects",
    "variableName": "objects"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "affectedCount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "productId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "communityId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InsertProductCommunityMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsCommunitiesInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProductsCommunitiesCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductsCommunities",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InsertProductCommunityMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsCommunitiesInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProductsCommunitiesCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductsCommunities",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "816d39f770c15889cdfa44de567067c9",
    "id": null,
    "metadata": {},
    "name": "InsertProductCommunityMutationMutation",
    "operationKind": "mutation",
    "text": "mutation InsertProductCommunityMutationMutation(\n  $objects: [ProductsCommunitiesInsertInput!]!\n) {\n  insertIntoProductsCommunitiesCollection(objects: $objects) {\n    affectedCount\n    records {\n      id\n      productId\n      communityId\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e2e54c8b9bb00cb2c0e18bc84567b9cf";

export default node;
