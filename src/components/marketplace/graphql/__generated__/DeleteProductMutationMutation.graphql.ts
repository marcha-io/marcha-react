/**
 * @generated SignedSource<<427ef6670687db8951442053b4e3a570>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type ProductCondition = "Good" | "Like_new" | "New" | "Used" | "%future added value";
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
export type DeleteProductMutationMutation$variables = {
  atMost: number;
  filter: ProductsFilter;
};
export type DeleteProductMutationMutation$data = {
  readonly deleteFromProductsCollection: {
    readonly affectedCount: number;
  };
};
export type DeleteProductMutationMutation = {
  response: DeleteProductMutationMutation$data;
  variables: DeleteProductMutationMutation$variables;
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
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "atMost",
        "variableName": "atMost"
      },
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      }
    ],
    "concreteType": "ProductsDeleteResponse",
    "kind": "LinkedField",
    "name": "deleteFromProductsCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "affectedCount",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteProductMutationMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DeleteProductMutationMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "54154641035a50eb95e50bdb2aa1deb1",
    "id": null,
    "metadata": {},
    "name": "DeleteProductMutationMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteProductMutationMutation(\n  $filter: ProductsFilter!\n  $atMost: Int!\n) {\n  deleteFromProductsCollection(filter: $filter, atMost: $atMost) {\n    affectedCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "b0f1dd68b67def2cb1e8d3b0895bb9fa";

export default node;
