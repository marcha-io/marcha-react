/**
 * @generated SignedSource<<cbff3a67fdc7223faca80832662118fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type EventsUpdateInput = {
  communityId?: string | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: string | null | undefined;
  description?: string | null | undefined;
  eventDate?: string | null | undefined;
  id?: string | null | undefined;
  imageUrl?: string | null | undefined;
  location?: string | null | undefined;
  maxAttendees?: number | null | undefined;
  pinned?: boolean | null | undefined;
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
};
export type EventsFilter = {
  and?: ReadonlyArray<EventsFilter> | null | undefined;
  communityId?: BigIntFilter | null | undefined;
  createdAt?: DatetimeFilter | null | undefined;
  createdBy?: UUIDFilter | null | undefined;
  description?: StringFilter | null | undefined;
  eventDate?: DatetimeFilter | null | undefined;
  id?: UUIDFilter | null | undefined;
  imageUrl?: StringFilter | null | undefined;
  location?: StringFilter | null | undefined;
  maxAttendees?: IntFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: EventsFilter | null | undefined;
  or?: ReadonlyArray<EventsFilter> | null | undefined;
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
export type IntFilter = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: ReadonlyArray<number> | null | undefined;
  is?: FilterIs | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
  neq?: number | null | undefined;
};
export type BooleanFilter = {
  eq?: boolean | null | undefined;
  is?: FilterIs | null | undefined;
};
export type IDFilter = {
  eq?: string | null | undefined;
};
export type UpdateEventMutation$variables = {
  atMost: number;
  filter: EventsFilter;
  set: EventsUpdateInput;
};
export type UpdateEventMutation$data = {
  readonly updateEventsCollection: {
    readonly affectedCount: number;
    readonly records: ReadonlyArray<{
      readonly description: string | null | undefined;
      readonly eventDate: string;
      readonly id: string;
      readonly imageUrl: string | null | undefined;
      readonly location: string | null | undefined;
      readonly maxAttendees: number | null | undefined;
      readonly nodeId: string;
      readonly pinned: boolean;
      readonly title: string;
    }>;
  };
};
export type UpdateEventMutation = {
  response: UpdateEventMutation$data;
  variables: UpdateEventMutation$variables;
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
      },
      {
        "kind": "Variable",
        "name": "set",
        "variableName": "set"
      }
    ],
    "concreteType": "EventsUpdateResponse",
    "kind": "LinkedField",
    "name": "updateEventsCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "affectedCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Events",
        "kind": "LinkedField",
        "name": "records",
        "plural": true,
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
            "args": null,
            "kind": "ScalarField",
            "name": "pinned",
            "storageKey": null
          },
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateEventMutation",
    "selections": (v3/*: any*/),
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
    "name": "UpdateEventMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "1830ea65a55db1d378f08c6eb33da9e9",
    "id": null,
    "metadata": {},
    "name": "UpdateEventMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateEventMutation(\n  $set: EventsUpdateInput!\n  $filter: EventsFilter!\n  $atMost: Int!\n) {\n  updateEventsCollection(set: $set, filter: $filter, atMost: $atMost) {\n    affectedCount\n    records {\n      id\n      title\n      description\n      eventDate\n      location\n      imageUrl\n      maxAttendees\n      pinned\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2789f63a5e33b304f9651e743a2bb8aa";

export default node;
