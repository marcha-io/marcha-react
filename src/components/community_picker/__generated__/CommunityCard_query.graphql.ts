/**
 * @generated SignedSource<<769af703e54e1352b6e4c8a8bcc40f6f>>
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityCard_query",
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
      "storageKey": "communityUsersCollection(filter:{\"status\":{\"eq\":\"ACCEPTED\"}})"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a07074671b1bd7005c41d60dd0ca43ab";

export default node;
