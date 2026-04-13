/**
 * @generated SignedSource<<c0b97416ee8fd631a27a87e777ba2491>>
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
  readonly id: string;
  readonly pinned: boolean;
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
    }
  ],
  "type": "Notices",
  "abstractKey": null
};

(node as any).hash = "e7a9603b91155abdd7cba74d2b1fd554";

export default node;
