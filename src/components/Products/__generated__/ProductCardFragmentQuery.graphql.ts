/**
 * @generated SignedSource<<7676b95b78b89c4525f56db6cc35a03e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ProductCondition = "Good" | "Like_new" | "New" | "Used" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ProductCardFragmentQuery$data = {
  readonly categoryId: string;
  readonly condition: ProductCondition;
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
    readonly firstName: string | null | undefined;
    readonly lastName: string | null | undefined;
    readonly username: string | null | undefined;
  } | null | undefined;
  readonly userId: string;
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
      "args": null,
      "kind": "ScalarField",
      "name": "categoryId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "condition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userId",
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
          "name": "avatarUrl",
          "storageKey": null
        },
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
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        }
      ],
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
    }
  ],
  "type": "Products",
  "abstractKey": null
};

(node as any).hash = "4fbc45ddef2aaafd8250978c3fd589c0";

export default node;
