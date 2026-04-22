/**
 * @generated SignedSource<<1d9dc89e75b19a08febc38101130ef70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardUpcomingEventsFragment$data = {
  readonly eventsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly eventDate: string;
        readonly id: string;
        readonly location: string | null | undefined;
        readonly title: string;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "DashboardUpcomingEventsFragment";
};
export type DashboardUpcomingEventsFragment$key = {
  readonly " $data"?: DashboardUpcomingEventsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardUpcomingEventsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "communityId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "DashboardUpcomingEventsFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "communityId",
              "variableName": "communityId"
            }
          ],
          "kind": "ObjectValue",
          "name": "filter"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
        },
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "eventDate": "AscNullsLast"
            }
          ]
        }
      ],
      "concreteType": "EventsConnection",
      "kind": "LinkedField",
      "name": "eventsCollection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Events",
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
                  "name": "eventDate",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "location",
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "87042a05045db2fa62321c9889f36872";

export default node;
