/**
 * @generated SignedSource<<32af522c17cbeeaf2be757c545816bb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductCardFragmentQuery$data = {
  readonly description: string | null | undefined;
  readonly image: string;
  readonly name: string;
  readonly price: number;
  readonly user: {
    readonly avatarUrl: string | null | undefined;
    readonly username: string;
  } | null | undefined;
  readonly " $fragmentType": "ProductCardFragmentQuery";
};
export type ProductCardFragmentQuery$key = {
  readonly " $data"?: ProductCardFragmentQuery$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProductCardFragmentQuery">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductCardFragmentQuery",
  "selections": [
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
      "name": "price",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    },
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
          "args": null,
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Products",
  "abstractKey": null
};

(node as any).hash = "403db67e4f5665cfc9dc84f091033c26";

export default node;
