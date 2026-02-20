/**
 * @generated SignedSource<<7224b31ff034900375e8dbd5a6bc4f2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CommunityUserReviewStatus = "ACCEPTED" | "PENDING" | "REJECTED" | "%future added value";
export type CommunityPickerQueryQuery$variables = Record<PropertyKey, never>;
export type CommunityPickerQueryQuery$data = {
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
        readonly status: CommunityUserReviewStatus;
      };
    }>;
  } | null | undefined;
  readonly profilesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly firstName: string | null | undefined;
      };
    }>;
  } | null | undefined;
};
export type CommunityPickerQueryQuery = {
  response: CommunityPickerQueryQuery$data;
  variables: CommunityPickerQueryQuery$variables;
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
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "communityId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
},
v10 = {
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
    "name": "CommunityPickerQueryQuery",
    "selections": [
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
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Communities",
                    "kind": "LinkedField",
                    "name": "community",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/)
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
        "storageKey": "communityUsersCollection(filter:{\"status\":{\"eq\":\"ACCEPTED\"}})"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CommunityPickerQueryQuery",
    "selections": [
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
                  (v10/*: any*/)
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
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Communities",
                    "kind": "LinkedField",
                    "name": "community",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "communityUsersCollection(filter:{\"status\":{\"eq\":\"ACCEPTED\"}})"
      }
    ]
  },
  "params": {
    "cacheID": "60530d813598f81971f366c8c3a679a8",
    "id": null,
    "metadata": {},
    "name": "CommunityPickerQueryQuery",
    "operationKind": "query",
    "text": "query CommunityPickerQueryQuery {\n  profilesCollection(first: 1) {\n    edges {\n      node {\n        firstName\n        nodeId\n      }\n    }\n  }\n  communityUsersCollection(filter: {status: {eq: ACCEPTED}}) {\n    edges {\n      node {\n        communityId\n        status\n        community {\n          id\n          name\n          description\n          address\n          image\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e6d114165dea9e4745b5ea50b120e1d0";

export default node;
