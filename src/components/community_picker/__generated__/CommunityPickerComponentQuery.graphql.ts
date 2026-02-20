/**
 * @generated SignedSource<<d7225879bb7d89b7300959c7b3cd50fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityPickerComponentQuery$variables = Record<PropertyKey, never>;
export type CommunityPickerComponentQuery$data = {
  readonly profilesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly firstName: string | null | undefined;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCardContainer_query">;
};
export type CommunityPickerComponentQuery = {
  response: CommunityPickerComponentQuery$data;
  variables: CommunityPickerComponentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v2 = {
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
    "name": "CommunityPickerComponentQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "CommunityCardContainer_query"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ProfilesConnection",
        "kind": "LinkedField",
        "name": "profilesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProfilesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Profiles",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "profilesCollection(first:1)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CommunityPickerComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "filter",
            "value": {
              "status": {
                "eq": "ACCEPTED"
              }
            }
          }
        ],
        "concreteType": "CommunityUsersConnection",
        "kind": "LinkedField",
        "name": "communityUsersCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommunityUsersEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommunityUsers",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "communityId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Communities",
                    "kind": "LinkedField",
                    "name": "community",
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "communityUsersCollection(filter:{\"status\":{\"eq\":\"ACCEPTED\"}})"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ProfilesConnection",
        "kind": "LinkedField",
        "name": "profilesCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProfilesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Profiles",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "profilesCollection(first:1)"
      }
    ]
  },
  "params": {
    "cacheID": "5dbb760b311872df22f5264210b3cf95",
    "id": null,
    "metadata": {},
    "name": "CommunityPickerComponentQuery",
    "operationKind": "query",
    "text": "query CommunityPickerComponentQuery {\n  ...CommunityCardContainer_query\n  profilesCollection(first: 1) {\n    edges {\n      node {\n        firstName\n        nodeId\n      }\n    }\n  }\n}\n\nfragment CommunityCardContainer_query on Query {\n  communityUsersCollection(filter: {status: {eq: ACCEPTED}}) {\n    edges {\n      node {\n        ...CommunityCard_fragment\n        nodeId\n      }\n    }\n  }\n}\n\nfragment CommunityCard_fragment on CommunityUsers {\n  communityId\n  status\n  community {\n    id\n    name\n    description\n    address\n    image\n    nodeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "a7b6a0c84acfabb4822131a88839d854";

export default node;
