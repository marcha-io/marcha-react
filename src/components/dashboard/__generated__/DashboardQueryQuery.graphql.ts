/**
 * @generated SignedSource<<af9ba20389d145204fcd567f4c74e4d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type BigIntFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
};
export type DashboardQueryQuery$variables = {
  communityId: BigIntFilter;
};
export type DashboardQueryQuery$data = {
  readonly communityUsersCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly community: {
          readonly address: string;
          readonly description: string;
          readonly id: string;
          readonly image: string | null | undefined;
          readonly name: string;
        } | null | undefined;
        readonly communityId: string;
      };
    }>;
  } | null | undefined;
  readonly profilesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly avatarUrl: string | null | undefined;
        readonly firstName: string | null | undefined;
        readonly lastName: string | null | undefined;
      };
    }>;
  } | null | undefined;
};
export type DashboardQueryQuery = {
  response: DashboardQueryQuery$data;
  variables: DashboardQueryQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "communityId"
  }
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v2 = [
  (v1/*: any*/)
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
  "name": "lastName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v6 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "communityId",
        "variableName": "communityId"
      },
      {
        "kind": "Literal",
        "name": "status",
        "value": {
          "eq": "ACCEPTED"
        }
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  (v1/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "communityId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
},
v13 = {
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
    "name": "DashboardQueryQuery",
    "selections": [
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
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "profilesCollection(first:1)"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
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
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Communities",
                    "kind": "LinkedField",
                    "name": "community",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/)
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
    "name": "DashboardQueryQuery",
    "selections": [
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "profilesCollection(first:1)"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
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
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Communities",
                    "kind": "LinkedField",
                    "name": "community",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/)
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
    "cacheID": "b03781f506c3f69c6dc053192208caeb",
    "id": null,
    "metadata": {},
    "name": "DashboardQueryQuery",
    "operationKind": "query",
    "text": "query DashboardQueryQuery(\n  $communityId: BigIntFilter!\n) {\n  profilesCollection(first: 1) {\n    edges {\n      node {\n        firstName\n        lastName\n        avatarUrl\n        nodeId\n      }\n    }\n  }\n  communityUsersCollection(filter: {communityId: $communityId, status: {eq: ACCEPTED}}, first: 1) {\n    edges {\n      node {\n        communityId\n        community {\n          id\n          name\n          description\n          address\n          image\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d9b67fbb066155ab9582fe55b8af01b2";

export default node;
