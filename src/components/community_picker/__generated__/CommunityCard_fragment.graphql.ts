/**
 * @generated SignedSource<<aab3d53a4eee04151ecb526059d6b592>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommunityUserReviewStatus = "ACCEPTED" | "PENDING" | "REJECTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CommunityCard_fragment$data = {
  readonly community: {
    readonly address: string;
    readonly description: string;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly name: string;
  } | null | undefined;
  readonly communityId: string;
  readonly status: CommunityUserReviewStatus;
  readonly " $fragmentType": "CommunityCard_fragment";
};
export type CommunityCard_fragment$key = {
  readonly " $data"?: CommunityCard_fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityCard_fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunityCard_fragment",
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
  "type": "CommunityUsers",
  "abstractKey": null
};

(node as any).hash = "d6db5c587d1248d38cd983693fdf2b83";

export default node;
