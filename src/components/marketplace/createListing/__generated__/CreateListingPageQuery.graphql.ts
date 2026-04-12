/**
 * @generated SignedSource<<3acc2c97c2e57ebbfcdc6c807672338a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CreateListingPageQuery$variables = Record<PropertyKey, never>;
export type CreateListingPageQuery$data = {
  readonly categoriesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly nodeId: string;
      };
    }>;
  } | null | undefined;
};
export type CreateListingPageQuery = {
  response: CreateListingPageQuery$data;
  variables: CreateListingPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateListingPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateListingPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fdbe710352d4e151bf8372bbfa92f8bf",
    "id": null,
    "metadata": {},
    "name": "CreateListingPageQuery",
    "operationKind": "query",
    "text": "query CreateListingPageQuery {\n  categoriesCollection {\n    edges {\n      node {\n        id\n        name\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5eaa56fb4e05fc54abd615ded9d75032";

export default node;
