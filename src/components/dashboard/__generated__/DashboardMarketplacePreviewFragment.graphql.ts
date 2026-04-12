/**
 * @generated SignedSource<<9b386aa68b1a233682a91d40a32a0baf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardMarketplacePreviewFragment$data = {
  readonly productsCommunitiesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly product: {
          readonly createdAt: string;
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
        } | null | undefined;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "DashboardMarketplacePreviewFragment";
};
export type DashboardMarketplacePreviewFragment$key = {
  readonly " $data"?: DashboardMarketplacePreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardMarketplacePreviewFragment">;
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
  "name": "DashboardMarketplacePreviewFragment",
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
          "value": 3
        },
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "createdAt": "DescNullsLast"
            }
          ]
        }
      ],
      "concreteType": "ProductsCommunitiesConnection",
      "kind": "LinkedField",
      "name": "productsCommunitiesCollection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ProductsCommunitiesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ProductsCommunities",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Products",
                  "kind": "LinkedField",
                  "name": "product",
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
                      "name": "name",
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
                      "name": "createdAt",
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

(node as any).hash = "fad02f42f60123a1273ff29a36e60f9b";

export default node;
