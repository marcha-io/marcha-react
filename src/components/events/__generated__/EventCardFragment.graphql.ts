/**
 * @generated SignedSource<<74591075271d0f1a2937a9245a82f65a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventCardFragment$data = {
  readonly description: string | null | undefined;
  readonly eventDate: string;
  readonly eventRsvpsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
      };
    }>;
  } | null | undefined;
  readonly id: string;
  readonly imageUrl: string | null | undefined;
  readonly location: string | null | undefined;
  readonly maxAttendees: number | null | undefined;
  readonly title: string;
  readonly " $fragmentType": "EventCardFragment";
};
export type EventCardFragment$key = {
  readonly " $data"?: EventCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventCardFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventCardFragment",
  "selections": [
    (v0/*: any*/),
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
      "name": "description",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "maxAttendees",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "filter",
          "value": {
            "status": {
              "eq": "attending"
            }
          }
        }
      ],
      "concreteType": "EventRsvpsConnection",
      "kind": "LinkedField",
      "name": "eventRsvpsCollection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventRsvpsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "EventRsvps",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "eventRsvpsCollection(filter:{\"status\":{\"eq\":\"attending\"}})"
    }
  ],
  "type": "Events",
  "abstractKey": null
};
})();

(node as any).hash = "192c8ec07efca39c5dde992b3e51761b";

export default node;
