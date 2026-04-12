/**
 * @generated SignedSource<<7f8d5a91bd5f6783d7bc4451cbcb26bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type ProfilesUpdateInput = {
  avatarUrl?: string | null | undefined;
  description?: string | null | undefined;
  firstName?: string | null | undefined;
  id?: string | null | undefined;
  lastName?: string | null | undefined;
  onboarded?: boolean | null | undefined;
  updatedAt?: string | null | undefined;
  username?: string | null | undefined;
};
export type ProfilesFilter = {
  and?: ReadonlyArray<ProfilesFilter> | null | undefined;
  avatarUrl?: StringFilter | null | undefined;
  description?: StringFilter | null | undefined;
  firstName?: StringFilter | null | undefined;
  id?: UUIDFilter | null | undefined;
  lastName?: StringFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: ProfilesFilter | null | undefined;
  onboarded?: BooleanFilter | null | undefined;
  or?: ReadonlyArray<ProfilesFilter> | null | undefined;
  updatedAt?: DatetimeFilter | null | undefined;
  username?: StringFilter | null | undefined;
};
export type UUIDFilter = {
  eq?: string | null | undefined;
  in?: ReadonlyArray<string> | null | undefined;
  is?: FilterIs | null | undefined;
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
export type BooleanFilter = {
  eq?: boolean | null | undefined;
  is?: FilterIs | null | undefined;
};
export type IDFilter = {
  eq?: string | null | undefined;
};
export type UpdateProfileMutationMutation$variables = {
  atMost: number;
  filter: ProfilesFilter;
  set: ProfilesUpdateInput;
};
export type UpdateProfileMutationMutation$data = {
  readonly updateProfilesCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly avatarUrl: string | null | undefined;
      readonly description: string | null | undefined;
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly lastName: string | null | undefined;
      readonly onboarded: boolean;
      readonly username: string | null | undefined;
    }>;
  };
};
export type UpdateProfileMutationMutation = {
  response: UpdateProfileMutationMutation$data;
  variables: UpdateProfileMutationMutation$variables;
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
  "name": "firstName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onboarded",
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
    "name": "UpdateProfileMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ProfilesUpdateResponse",
        "kind": "LinkedField",
        "name": "updateProfilesCollection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profiles",
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
    "name": "UpdateProfileMutationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ProfilesUpdateResponse",
        "kind": "LinkedField",
        "name": "updateProfilesCollection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Profiles",
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
    "cacheID": "b67e478ee633e19e1a0c868d1beb66ef",
    "id": null,
    "metadata": {},
    "name": "UpdateProfileMutationMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateProfileMutationMutation(\n  $set: ProfilesUpdateInput!\n  $filter: ProfilesFilter!\n  $atMost: Int!\n) {\n  updateProfilesCollection(set: $set, filter: $filter, atMost: $atMost) {\n    affectedCount\n    records {\n      id\n      firstName\n      lastName\n      username\n      avatarUrl\n      description\n      onboarded\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f0f6a0d634de8620c8e8bb4ebcfd5edf";

export default node;
