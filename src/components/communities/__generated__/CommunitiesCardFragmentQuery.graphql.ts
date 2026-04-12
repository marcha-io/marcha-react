/**
 * @generated SignedSource<<cad5ea9c1ff5899d1ff3fe478dc0d138>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunitiesCardFragmentQuery$data = {
  readonly address: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly name: string;
  readonly nodeId: string;
  readonly " $fragmentType": "CommunitiesCardFragmentQuery";
};
export type CommunitiesCardFragmentQuery$key = {
  readonly " $data"?: CommunitiesCardFragmentQuery$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunitiesCardFragmentQuery">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunitiesCardFragmentQuery",
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
      "name": "address",
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nodeId",
      "storageKey": null
    }
  ],
  "type": "Communities",
  "abstractKey": null
};

(node as any).hash = "1ad8154c18ac9b674356b9a434592b5d";

export default node;
