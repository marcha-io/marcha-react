/**
 * @generated SignedSource<<97ffd4004ca514346f960fd8d983de07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardCommunityUpdatesFragment$data = {
  readonly communityUsersCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly user: {
          readonly noticesCollection: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly body: string;
                readonly createdAt: string;
                readonly id: string;
                readonly profiles: {
                  readonly avatarUrl: string | null | undefined;
                  readonly firstName: string | null | undefined;
                  readonly lastName: string | null | undefined;
                } | null | undefined;
                readonly title: string;
              };
            }>;
          } | null | undefined;
        } | null | undefined;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "DashboardCommunityUpdatesFragment";
};
export type DashboardCommunityUpdatesFragment$key = {
  readonly " $data"?: DashboardCommunityUpdatesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardCommunityUpdatesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DashboardCommunityUpdatesFragment",
  "selections": [
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
                        {
                          "kind": "Literal",
                          "name": "first",
                          "value": 1
                        },
                        {
                          "kind": "Literal",
                          "name": "orderBy",
                          "value": [
                            {
                              "createdAt": "DescNullsLast"
                            }
                          ]
                        }
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
                                  "name": "title",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "body",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "createdAt",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "Profiles",
                                  "kind": "LinkedField",
                                  "name": "profiles",
                                  "plural": false,
                                  "selections": [
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "firstName",
                                      "storageKey": null
                                    },
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "lastName",
                                      "storageKey": null
                                    },
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "avatarUrl",
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
                      "storageKey": "noticesCollection(first:1,orderBy:[{\"createdAt\":\"DescNullsLast\"}])"
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
      "storageKey": "communityUsersCollection(filter:{\"role\":{\"eq\":\"admin\"}},first:20)"
    }
  ],
  "type": "Communities",
  "abstractKey": null
};

(node as any).hash = "907304743effc82772fb716279415341";

export default node;
