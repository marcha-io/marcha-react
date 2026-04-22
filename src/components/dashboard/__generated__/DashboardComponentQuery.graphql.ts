/**
 * @generated SignedSource<<62c385b4b22b53ba19e0ada9d298901c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
export type DashboardComponentQuery$variables = {
  communityId: BigIntFilter;
};
export type DashboardComponentQuery$data = {
  readonly communityUsersCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly community: {
          readonly address: string;
          readonly description: string;
          readonly id: string;
          readonly image: string | null | undefined;
          readonly name: string;
          readonly " $fragmentSpreads": FragmentRefs<"DashboardCommunityUpdatesFragment">;
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
  readonly " $fragmentSpreads": FragmentRefs<"DashboardMarketplacePreviewFragment" | "DashboardUpcomingEventsFragment">;
};
export type DashboardComponentQuery = {
  response: DashboardComponentQuery$data;
  variables: DashboardComponentQuery$variables;
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
},
v14 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/),
  (v13/*: any*/)
],
v15 = {
  "kind": "Literal",
  "name": "orderBy",
  "value": [
    {
      "createdAt": "DescNullsLast"
    }
  ]
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v18 = {
  "fields": [
    {
      "kind": "Literal",
      "name": "communityId",
      "value": null
    }
  ],
  "kind": "ObjectValue",
  "name": "filter"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardComponentQuery",
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
                      (v12/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "DashboardCommunityUpdatesFragment"
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
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "DashboardMarketplacePreviewFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "DashboardUpcomingEventsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DashboardComponentQuery",
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
                "selections": (v14/*: any*/),
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
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "filter",
                            "value": {
                              "role": {
                                "eq": "admin"
                              }
                            }
                          },
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 20
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
                                    "concreteType": "Profiles",
                                    "kind": "LinkedField",
                                    "name": "user",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": [
                                          (v1/*: any*/),
                                          (v15/*: any*/)
                                        ],
                                        "concreteType": "NoticesConnection",
                                        "kind": "LinkedField",
                                        "name": "noticesCollection",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "NoticesEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Notices",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v8/*: any*/),
                                                  (v16/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "body",
                                                    "storageKey": null
                                                  },
                                                  (v17/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "Profiles",
                                                    "kind": "LinkedField",
                                                    "name": "profiles",
                                                    "plural": false,
                                                    "selections": (v14/*: any*/),
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
                                        "storageKey": "noticesCollection(first:1,orderBy:[{\"createdAt\":\"DescNullsLast\"}])"
                                      },
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
                        "storageKey": "communityUsersCollection(filter:{\"role\":{\"eq\":\"admin\"}},first:20)"
                      },
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
      },
      {
        "alias": null,
        "args": [
          (v18/*: any*/),
          {
            "kind": "Literal",
            "name": "first",
            "value": 3
          },
          (v15/*: any*/)
        ],
        "concreteType": "ProductsCommunitiesConnection",
        "kind": "LinkedField",
        "name": "productsCommunitiesCollection",
        "plural": false,
        "selections": [
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
                      (v8/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "price",
                        "storageKey": null
                      },
                      (v17/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          (v1/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "orderBy",
                            "value": [
                              {
                                "displayOrder": "AscNullsLast"
                              }
                            ]
                          }
                        ],
                        "concreteType": "ProductImagesConnection",
                        "kind": "LinkedField",
                        "name": "productImagesCollection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ProductImagesEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ProductImages",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "imageUrl",
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
                        "storageKey": "productImagesCollection(first:1,orderBy:[{\"displayOrder\":\"AscNullsLast\"}])"
                      },
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
        "storageKey": "productsCommunitiesCollection(filter:{\"communityId\":null},first:3,orderBy:[{\"createdAt\":\"DescNullsLast\"}])"
      },
      {
        "alias": null,
        "args": [
          (v18/*: any*/),
          {
            "kind": "Literal",
            "name": "first",
            "value": 5
          },
          {
            "kind": "Literal",
            "name": "orderBy",
            "value": [
              {
                "eventDate": "AscNullsLast"
              }
            ]
          }
        ],
        "concreteType": "EventsConnection",
        "kind": "LinkedField",
        "name": "eventsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Events",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "eventDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "location",
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
        "storageKey": "eventsCollection(filter:{\"communityId\":null},first:5,orderBy:[{\"eventDate\":\"AscNullsLast\"}])"
      }
    ]
  },
  "params": {
    "cacheID": "749696d6278554866ac289581317759f",
    "id": null,
    "metadata": {},
    "name": "DashboardComponentQuery",
    "operationKind": "query",
    "text": "query DashboardComponentQuery(\n  $communityId: BigIntFilter!\n) {\n  profilesCollection(first: 1) {\n    edges {\n      node {\n        firstName\n        lastName\n        avatarUrl\n        nodeId\n      }\n    }\n  }\n  communityUsersCollection(filter: {communityId: $communityId, status: {eq: ACCEPTED}}, first: 1) {\n    edges {\n      node {\n        communityId\n        community {\n          id\n          name\n          description\n          address\n          image\n          ...DashboardCommunityUpdatesFragment\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n  ...DashboardMarketplacePreviewFragment\n  ...DashboardUpcomingEventsFragment\n}\n\nfragment DashboardCommunityUpdatesFragment on Communities {\n  communityUsersCollection(first: 20, filter: {role: {eq: admin}}) {\n    edges {\n      node {\n        user {\n          noticesCollection(first: 1, orderBy: [{createdAt: DescNullsLast}]) {\n            edges {\n              node {\n                id\n                title\n                body\n                createdAt\n                profiles {\n                  firstName\n                  lastName\n                  avatarUrl\n                  nodeId\n                }\n                nodeId\n              }\n            }\n          }\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n\nfragment DashboardMarketplacePreviewFragment on Query {\n  productsCommunitiesCollection(first: 3, orderBy: [{createdAt: DescNullsLast}], filter: {}) {\n    edges {\n      node {\n        product {\n          id\n          name\n          price\n          createdAt\n          productImagesCollection(first: 1, orderBy: [{displayOrder: AscNullsLast}]) {\n            edges {\n              node {\n                imageUrl\n                nodeId\n              }\n            }\n          }\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n}\n\nfragment DashboardUpcomingEventsFragment on Query {\n  eventsCollection(first: 5, orderBy: [{eventDate: AscNullsLast}], filter: {}) {\n    edges {\n      node {\n        id\n        title\n        eventDate\n        location\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e06001a48123bbe681fcaba4804e6822";

export default node;
