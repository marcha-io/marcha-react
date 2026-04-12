/**
 * @generated SignedSource<<827bef5296f40a98f8f64b69e92cf418>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityCardContainer_query$data = {
  readonly communityUsersCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"CommunityCard_fragment">;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "CommunityCardContainer_query";
};
export type CommunityCardContainer_query$key = {
  readonly " $data"?: CommunityCardContainer_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCardContainer_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityCardContainer_query",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CommunityCard_fragment"
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

(node as any).hash = "b45021186d501b979bc957a8d87e38a8";

export default node;
