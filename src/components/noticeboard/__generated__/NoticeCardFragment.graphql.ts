/**
 * @generated SignedSource<<db4883c360ec46241f83fb76f8323e75>>
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
    }
  ],
  "type": "Notices",
  "abstractKey": null
};

(node as any).hash = "41884e07e770fee084cb174311bda2c2";

export default node;
