/**
 * @generated SignedSource<<870f8d6245f06b494e7427093cd93a18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProductImagesInsertInput = {
  createdAt?: string | null | undefined;
  displayOrder?: number | null | undefined;
  imageUrl?: string | null | undefined;
  productId?: string | null | undefined;
};
export type InsertProductImagesMutationMutation$variables = {
  objects: ReadonlyArray<ProductImagesInsertInput>;
};
export type InsertProductImagesMutationMutation$data = {
  readonly insertIntoProductImagesCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly displayOrder: number;
      readonly id: string;
      readonly imageUrl: string;
      readonly productId: string;
    }>;
  } | null | undefined;
};
export type InsertProductImagesMutationMutation = {
  response: InsertProductImagesMutationMutation$data;
  variables: InsertProductImagesMutationMutation$variables;
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
  "name": "imageUrl",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayOrder",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InsertProductImagesMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductImagesInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProductImagesCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductImages",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
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
    "name": "InsertProductImagesMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductImagesInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoProductImagesCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductImages",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
    "cacheID": "7f76a5f42b2a7a7a1dc3ca9bab78a8f3",
    "id": null,
    "metadata": {},
    "name": "InsertProductImagesMutationMutation",
    "operationKind": "mutation",
    "text": "mutation InsertProductImagesMutationMutation(\n  $objects: [ProductImagesInsertInput!]!\n) {\n  insertIntoProductImagesCollection(objects: $objects) {\n    affectedCount\n    records {\n      id\n      productId\n      imageUrl\n      displayOrder\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "248f208ce2716f0258850fac5dd5b64a";

export default node;
