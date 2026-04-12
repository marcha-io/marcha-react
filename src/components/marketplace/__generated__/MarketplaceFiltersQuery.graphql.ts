/**
 * @generated SignedSource<<f5118db7c45f854419810de545c12eb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MarketplaceFiltersQuery$variables = Record<PropertyKey, never>;
export type MarketplaceFiltersQuery$data = {
  readonly categoriesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }>;
  } | null | undefined;
};
export type MarketplaceFiltersQuery = {
  response: MarketplaceFiltersQuery$data;
  variables: MarketplaceFiltersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MarketplaceFiltersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CategoriesConnection",
        "kind": "LinkedField",
        "name": "categoriesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoriesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Categories",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
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
    "name": "MarketplaceFiltersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CategoriesConnection",
        "kind": "LinkedField",
        "name": "categoriesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoriesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Categories",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7866f7b2fd161a9086343659b08ef1ae",
    "id": null,
    "metadata": {},
    "name": "MarketplaceFiltersQuery",
    "operationKind": "query",
    "text": "query MarketplaceFiltersQuery {\n  categoriesCollection {\n    edges {\n      node {\n        id\n        name\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "14324b77c485fa49e6cbb9e83622452a";

export default node;
