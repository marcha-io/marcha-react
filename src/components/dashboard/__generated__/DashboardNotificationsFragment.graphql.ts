/**
 * @generated SignedSource<<e720fee5421100ab66615cf612ef251e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardNotificationsFragment$data = {
  readonly latestNotices: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly body: string;
        readonly createdAt: string;
        readonly id: string;
        readonly pinned: boolean;
        readonly profiles: {
          readonly avatarUrl: string | null | undefined;
          readonly firstName: string | null | undefined;
          readonly lastName: string | null | undefined;
        } | null | undefined;
        readonly title: string;
      };
    }>;
  } | null | undefined;
  readonly pinnedNotices: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly body: string;
        readonly createdAt: string;
        readonly id: string;
        readonly pinned: boolean;
        readonly profiles: {
          readonly avatarUrl: string | null | undefined;
          readonly firstName: string | null | undefined;
          readonly lastName: string | null | undefined;
        } | null | undefined;
        readonly title: string;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "DashboardNotificationsFragment";
};
export type DashboardNotificationsFragment$key = {
  readonly " $data"?: DashboardNotificationsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardNotificationsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "communityId",
  "variableName": "communityId"
},
v1 = {
  "kind": "Literal",
  "name": "orderBy",
  "value": [
    {
      "createdAt": "DescNullsLast"
    }
  ]
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NoticesEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Notices",
        "kind": "LinkedField",
        "name": "node",
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
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "communityId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "DashboardNotificationsFragment",
  "selections": [
    {
      "alias": "pinnedNotices",
      "args": [
        {
          "fields": [
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "pinned",
              "value": {
                "eq": true
              }
            }
          ],
          "kind": "ObjectValue",
          "name": "filter"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        (v1/*: any*/)
      ],
      "concreteType": "NoticesConnection",
      "kind": "LinkedField",
      "name": "noticesCollection",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": "latestNotices",
      "args": [
        {
          "fields": [
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "pinned",
              "value": {
                "eq": false
              }
            }
          ],
          "kind": "ObjectValue",
          "name": "filter"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 2
        },
        (v1/*: any*/)
      ],
      "concreteType": "NoticesConnection",
      "kind": "LinkedField",
      "name": "noticesCollection",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "026c16f7a5e1336a546d4d86afa2f704";

export default node;
