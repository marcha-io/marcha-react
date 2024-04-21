/**
 * @generated SignedSource<<ffc10b016c6c02d1270131f5dd0d8814>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductsContainerWrapperQuery$variables = Record<PropertyKey, never>;
export type ProductsContainerWrapperQuery$data = {
  readonly productsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ProductCardFragmentQuery">;
      };
    }>;
  } | null | undefined;
};
export type ProductsContainerWrapperQuery = {
  response: ProductsContainerWrapperQuery$data;
  variables: ProductsContainerWrapperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsContainerWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ProductCardFragmentQuery"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProductsContainerWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
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
                    "name": "id",
                    "storageKey": null
                  },
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
                    "name": "image",
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
                        "name": "username",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatarUrl",
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v0/*: any*/)
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
    "cacheID": "689652605c14b1319fefe54263a6290a",
    "id": null,
    "metadata": {},
    "name": "ProductsContainerWrapperQuery",
    "operationKind": "query",
    "text": "query ProductsContainerWrapperQuery {\n  productsCollection {\n    edges {\n      node {\n        ...ProductCardFragmentQuery\n        nodeId\n      }\n    }\n  }\n}\n\nfragment ProductCardFragmentQuery on Products {\n  id\n  name\n  description\n  price\n  image\n  user {\n    username\n    avatarUrl\n    nodeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff5e9c6aedc4cabb6df976ded11512cf";

export default node;
