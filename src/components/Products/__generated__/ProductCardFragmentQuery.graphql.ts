/**
 * @generated SignedSource<<17d1bf2b3003828ac4cd63109ca28b4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductCardFragmentQuery$data = {
  readonly description: string;
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly productImagesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly imageUrl: string;
      };
    }>;
  } | null | undefined;
  readonly user: {
    readonly avatarUrl: string | null | undefined;
    readonly username: string | null | undefined;
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
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "displayOrder": "AscNullsLast"
            }
          ]
        }
      ],
      "concreteType": "ProductImagesConnection",
      "kind": "LinkedField",
      "name": "productImagesCollection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ProductImagesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ProductImages",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "imageUrl",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "productImagesCollection(first:1,orderBy:[{\"displayOrder\":\"AscNullsLast\"}])"
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

(node as any).hash = "08122c576ca08993f97d404ad1b92875";

export default node;
