/**
 * @generated SignedSource<<2f4d8daa192856609fcc089a3e6f597b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CommunitiesContainerWrapperQuery$variables = Record<PropertyKey, never>;
export type CommunitiesContainerWrapperQuery$data = {
  readonly communitiesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly description: string;
        readonly id: string;
        readonly image: string | null | undefined;
        readonly name: string;
        readonly nodeId: string;
      };
    }>;
  } | null | undefined;
};
export type CommunitiesContainerWrapperQuery = {
  response: CommunitiesContainerWrapperQuery$data;
  variables: CommunitiesContainerWrapperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CommunitiesConnection",
    "kind": "LinkedField",
    "name": "communitiesCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommunitiesEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Communities",
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
    "name": "CommunitiesContainerWrapperQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CommunitiesContainerWrapperQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "dd12f63b12567093311ea8d8500f6ad5",
    "id": null,
    "metadata": {},
    "name": "CommunitiesContainerWrapperQuery",
    "operationKind": "query",
    "text": "query CommunitiesContainerWrapperQuery {\n  communitiesCollection {\n    edges {\n      node {\n        name\n        description\n        image\n        id\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "816f3fd4381abe3831a52e37d3247988";

export default node;
