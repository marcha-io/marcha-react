/**
 * @generated SignedSource<<319e376a40e8defddeeaf0153f038217>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type UUIDFilter = {
  eq?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: string | null | undefined;
};
export type CommunityPickerComponentQuery$variables = {
  userId: UUIDFilter;
};
export type CommunityPickerComponentQuery$data = {
  readonly profilesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly firstName: string | null | undefined;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCard_query">;
};
export type CommunityPickerComponentQuery = {
  response: CommunityPickerComponentQuery$data;
  variables: CommunityPickerComponentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "userId",
  "variableName": "userId"
},
v2 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "userId"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v4 = {
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
    "name": "CommunityPickerComponentQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "CommunityCard_query"
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommunityPickerComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "fields": [
              {
                "kind": "Literal",
                "name": "status",
                "value": {
                  "eq": "ACCEPTED"
                }
              },
              (v1/*: any*/)
            ],
            "kind": "ObjectValue",
            "name": "filter"
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/)
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
    "cacheID": "8647967e14f5e897db9c748842992e50",
    "id": null,
    "metadata": {},
    "name": "CommunityPickerComponentQuery",
    "operationKind": "query",
    "text": "query CommunityPickerComponentQuery(\n  $userId: UUIDFilter!\n) {\n  ...CommunityCard_query_1xxw8p\n  profilesCollection(filter: {id: $userId}, first: 1) {\n    edges {\n      node {\n        firstName\n        nodeId\n      }\n    }\n  }\n}\n\nfragment CommunityCard_query_1xxw8p on Query {\n  communityUsersCollection(filter: {userId: $userId, status: {eq: ACCEPTED}}) {\n    edges {\n      node {\n        communityId\n        status\n        community {\n          id\n          name\n          description\n          address\n          image\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ca80fc656ebe24dba2f156193e3d2d93";

export default node;
