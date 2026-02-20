/**
 * @generated SignedSource<<4e6a14edf2151ecd0f54fb882386007e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommunityUserReviewStatus = "ACCEPTED" | "PENDING" | "REJECTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CommunityCard_query$data = {
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
  readonly " $fragmentType": "CommunityCard_query";
};
export type CommunityCard_query$key = {
  readonly " $data"?: CommunityCard_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCard_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "userId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityCard_query",
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
            {
              "kind": "Variable",
              "name": "userId",
              "variableName": "userId"
            }
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "2e863810dcd5b64569d10815f87e9f0c";

export default node;
