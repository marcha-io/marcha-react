/**
 * @generated SignedSource<<9e89f935b724c5af8cb10a04dcdaa92f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type NoticesFilter = {
  and?: ReadonlyArray<NoticesFilter> | null | undefined;
  body?: StringFilter | null | undefined;
  communityId?: BigIntFilter | null | undefined;
  createdAt?: DatetimeFilter | null | undefined;
  createdBy?: UUIDFilter | null | undefined;
  id?: UUIDFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: NoticesFilter | null | undefined;
  or?: ReadonlyArray<NoticesFilter> | null | undefined;
  pinned?: BooleanFilter | null | undefined;
  title?: StringFilter | null | undefined;
  updatedAt?: DatetimeFilter | null | undefined;
};
export type UUIDFilter = {
  eq?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
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
export type BooleanFilter = {
  eq?: boolean | null | undefined;
  is?: FilterIs | null | undefined;
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
export type IDFilter = {
  eq?: string | null | undefined;
};
export type DeleteNoticeMutation$variables = {
  atMost: number;
  filter: NoticesFilter;
};
export type DeleteNoticeMutation$data = {
  readonly deleteFromNoticesCollection: {
    readonly affectedCount: number;
  };
};
export type DeleteNoticeMutation = {
  response: DeleteNoticeMutation$data;
  variables: DeleteNoticeMutation$variables;
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
    "concreteType": "NoticesDeleteResponse",
    "kind": "LinkedField",
    "name": "deleteFromNoticesCollection",
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
    "name": "DeleteNoticeMutation",
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
    "name": "DeleteNoticeMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "621ebc215b1d92592dc1946de81bedd3",
    "id": null,
    "metadata": {},
    "name": "DeleteNoticeMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteNoticeMutation(\n  $filter: NoticesFilter!\n  $atMost: Int!\n) {\n  deleteFromNoticesCollection(filter: $filter, atMost: $atMost) {\n    affectedCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "4d435298fac02acd35249670ff34f0b6";

export default node;
