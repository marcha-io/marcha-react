/**
 * @generated SignedSource<<744beda48e9e68cd7400f63b78fff63f>>
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
  readonly image: string;
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
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      "action": "THROW",
      "path": "name"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "address",
        "storageKey": null
      },
      "action": "THROW",
      "path": "address"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
      "action": "THROW",
      "path": "image"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      "action": "THROW",
      "path": "id"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "nodeId",
        "storageKey": null
      },
      "action": "THROW",
      "path": "nodeId"
    }
  ],
  "type": "Communities",
  "abstractKey": null
};

(node as any).hash = "ce08f812931624530f3bf894c641bded";

export default node;
