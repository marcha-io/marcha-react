/**
 * @generated SignedSource<<8ff225aa05498e441da2d100c821d3ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunitiesContainerWrapperQuery$variables = Record<PropertyKey, never>;
export type CommunitiesContainerWrapperQuery$data = {
  readonly communitiesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"CommunitiesCardFragmentQuery">;
      };
    }>;
  } | null | undefined;
};
export type CommunitiesContainerWrapperQuery = {
  response: CommunitiesContainerWrapperQuery$data;
  variables: CommunitiesContainerWrapperQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunitiesContainerWrapperQuery",
    "selections": [
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CommunitiesCardFragmentQuery"
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
    "name": "CommunitiesContainerWrapperQuery",
    "selections": [
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
                    "name": "address",
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
    ]
  },
  "params": {
    "cacheID": "435a026ab03ce53faefe643029571041",
    "id": null,
    "metadata": {},
    "name": "CommunitiesContainerWrapperQuery",
    "operationKind": "query",
    "text": "query CommunitiesContainerWrapperQuery {\n  communitiesCollection {\n    edges {\n      node {\n        ...CommunitiesCardFragmentQuery\n        nodeId\n      }\n    }\n  }\n}\n\nfragment CommunitiesCardFragmentQuery on Communities {\n  name\n  address\n  image\n  id\n  nodeId\n}\n"
  }
};

(node as any).hash = "ddd48dbbd496718860ec93240140e8f0";

export default node;
