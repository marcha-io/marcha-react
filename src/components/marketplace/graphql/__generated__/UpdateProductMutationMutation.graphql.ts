/**
 * @generated SignedSource<<33de8044ec445b55d71db31c17ad456a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type ProductCondition = "Good" | "Like_new" | "New" | "Used" | "%future added value";
export type ProductsUpdateInput = {
  categoryId?: string | null | undefined;
  condition?: ProductCondition | null | undefined;
  createdAt?: string | null | undefined;
  description?: string | null | undefined;
  isPublic?: boolean | null | undefined;
  name?: string | null | undefined;
  price?: number | null | undefined;
  userId?: string | null | undefined;
};
export type ProductsFilter = {
  and?: ReadonlyArray<ProductsFilter> | null | undefined;
  categoryId?: UUIDFilter | null | undefined;
  condition?: ProductConditionFilter | null | undefined;
  createdAt?: DatetimeFilter | null | undefined;
  description?: StringFilter | null | undefined;
  id?: BigIntFilter | null | undefined;
  isPublic?: BooleanFilter | null | undefined;
  name?: StringFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: ProductsFilter | null | undefined;
  or?: ReadonlyArray<ProductsFilter> | null | undefined;
  price?: FloatFilter | null | undefined;
  userId?: UUIDFilter | null | undefined;
};
export type BigIntFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
};
export type DatetimeFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
};
export type StringFilter = {
  eq?: string | null | undefined;
  gt?: string | null | undefined;
  gte?: string | null | undefined;
  ilike?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  iregex?: string | null | undefined;
  is?: FilterIs | null | undefined;
  like?: string | null | undefined;
  lt?: string | null | undefined;
  lte?: string | null | undefined;
  neq?: string | null | undefined;
  regex?: string | null | undefined;
  startsWith?: string | null | undefined;
};
export type FloatFilter = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: ReadonlyArray<number> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  neq?: number | null | undefined;
};
export type UUIDFilter = {
  eq?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: string | null | undefined;
};
export type ProductConditionFilter = {
  eq?: ProductCondition | null | undefined;
  in?: ReadonlyArray<ProductCondition> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: ProductCondition | null | undefined;
};
export type BooleanFilter = {
  eq?: boolean | null | undefined;
  is?: FilterIs | null | undefined;
};
export type IDFilter = {
  eq?: string | null | undefined;
};
export type UpdateProductMutationMutation$variables = {
  atMost: number;
  filter: ProductsFilter;
  set: ProductsUpdateInput;
};
export type UpdateProductMutationMutation$data = {
  readonly updateProductsCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly categoryId: string;
      readonly condition: ProductCondition;
      readonly description: string;
      readonly id: string;
      readonly name: string;
      readonly price: number;
      readonly userId: string;
    }>;
  };
};
export type UpdateProductMutationMutation = {
  response: UpdateProductMutationMutation$data;
  variables: UpdateProductMutationMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "atMost"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "set"
},
v3 = [
  {
    "kind": "Variable",
    "name": "atMost",
    "variableName": "atMost"
  },
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  },
  {
    "kind": "Variable",
    "name": "set",
    "variableName": "set"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "affectedCount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "condition",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryId",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateProductMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ProductsUpdateResponse",
        "kind": "LinkedField",
        "name": "updateProductsCollection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Products",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UpdateProductMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ProductsUpdateResponse",
        "kind": "LinkedField",
        "name": "updateProductsCollection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Products",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nodeId",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1e1a724f04466816fc8001fdccdc381f",
    "id": null,
    "metadata": {},
    "name": "UpdateProductMutationMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateProductMutationMutation(\n  $set: ProductsUpdateInput!\n  $filter: ProductsFilter!\n  $atMost: Int!\n) {\n  updateProductsCollection(set: $set, filter: $filter, atMost: $atMost) {\n    affectedCount\n    records {\n      id\n      name\n      price\n      description\n      condition\n      categoryId\n      userId\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "39177b9140de70ce97a61e204b773361";

export default node;
