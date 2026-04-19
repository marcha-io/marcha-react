/**
 * @generated SignedSource<<9293cc46ce6e138cc3f0fd634087e212>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoticeCardFragment$data = {
  readonly body: string;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly id: string;
  readonly pinned: boolean;
  readonly profiles: {
    readonly avatarUrl: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly lastName: string | null | undefined;
  } | null | undefined;
  readonly title: string;
  readonly " $fragmentType": "NoticeCardFragment";
};
export type NoticeCardFragment$key = {
  readonly " $data"?: NoticeCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NoticeCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoticeCardFragment",
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
      "name": "pinned",
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
      "kind": "ScalarField",
      "name": "createdBy",
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
  "type": "Notices",
  "abstractKey": null
};

(node as any).hash = "79e3d44726e7f35c0e616296e3671c97";

export default node;
