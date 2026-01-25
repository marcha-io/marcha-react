/**
 * @generated SignedSource<<47e674e7115e4ffb124baecc9e5b59e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunitiesProductsContainerWrapperQuery$variables = {
  id?: string | null | undefined;
};
export type CommunitiesProductsContainerWrapperQuery$data = {
  readonly productsCommunitiesCollection: {
    readonly __typename: "ProductsCommunitiesConnection";
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly product: {
          readonly " $fragmentSpreads": FragmentRefs<"ProductCardFragmentQuery">;
        } | null | undefined;
      };
    }>;
  } | null | undefined;
};
export type CommunitiesProductsContainerWrapperQuery = {
  response: CommunitiesProductsContainerWrapperQuery$data;
  variables: CommunitiesProductsContainerWrapperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "eq",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "communityId"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
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
    "name": "CommunitiesProductsContainerWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsCommunitiesConnection",
        "kind": "LinkedField",
        "name": "productsCommunitiesCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductsCommunitiesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProductsCommunities",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Products",
                    "kind": "LinkedField",
                    "name": "product",
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
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommunitiesProductsContainerWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProductsCommunitiesConnection",
        "kind": "LinkedField",
        "name": "productsCommunitiesCollection",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductsCommunitiesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProductsCommunities",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Products",
                    "kind": "LinkedField",
                    "name": "product",
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
                        "name": "image",
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
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
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
    "cacheID": "434e3dfb64fd16d048c2122fef5d7c57",
    "id": null,
    "metadata": {},
    "name": "CommunitiesProductsContainerWrapperQuery",
    "operationKind": "query",
    "text": "query CommunitiesProductsContainerWrapperQuery(\n  $id: BigInt\n) {\n  productsCommunitiesCollection(filter: {communityId: {eq: $id}}) {\n    __typename\n    edges {\n      node {\n        product {\n          ...ProductCardFragmentQuery\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n\nfragment ProductCardFragmentQuery on Products {\n  name\n  description\n  price\n  image\n  id\n  user {\n    avatarUrl\n    username\n    nodeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee09e93f504c43995539d7652d27cfa7";

export default node;
