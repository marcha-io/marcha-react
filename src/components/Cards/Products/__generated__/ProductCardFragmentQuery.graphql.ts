/**
 * @generated SignedSource<<6e034bf23aa945d439f9e0c2bd95e677>>
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
  readonly id: string;
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
          "name": "username",
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
  "type": "Products",
  "abstractKey": null
};

(node as any).hash = "4bb887f442289a3a812593b929679176";

export default node;
