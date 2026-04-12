/**
 * @generated SignedSource<<6176618c4e84243fee4afc8b6bb0f8f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProductCondition = "Good" | "Like_new" | "New" | "Used" | "%future added value";
export type ProductsInsertInput = {
  categoryId?: string | null | undefined;
  condition?: ProductCondition | null | undefined;
  createdAt?: string | null | undefined;
  description?: string | null | undefined;
  isPublic?: boolean | null | undefined;
  name?: string | null | undefined;
  price?: number | null | undefined;
  userId?: string | null | undefined;
};
export type InsertProductMutationMutation$variables = {
  objects: ReadonlyArray<ProductsInsertInput>;
};
export type InsertProductMutationMutation$data = {
  readonly insertIntoProductsCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly categoryId: string;
      readonly condition: ProductCondition;
      readonly description: string;
      readonly id: string;
      readonly name: string;
      readonly price: number;
      readonly userId: string;
    }>;
  } | null | undefined;
};
export type InsertProductMutationMutation = {
  response: InsertProductMutationMutation$data;
  variables: InsertProductMutationMutation$variables;
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
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "condition",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InsertProductMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProductsCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Products",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/)
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
    "name": "InsertProductMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProductsCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Products",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
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
    "cacheID": "2a3732bdd94d6d2c1c915ee83c72bb4e",
    "id": null,
    "metadata": {},
    "name": "InsertProductMutationMutation",
    "operationKind": "mutation",
    "text": "mutation InsertProductMutationMutation(\n  $objects: [ProductsInsertInput!]!\n) {\n  insertIntoProductsCollection(objects: $objects) {\n    affectedCount\n    records {\n      id\n      name\n      price\n      description\n      condition\n      categoryId\n      userId\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "83d508631291ab71c273f42b716dc135";

export default node;
