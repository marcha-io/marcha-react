/**
 * @generated SignedSource<<7a747d7527ab85743cf2aac24fd7232e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type OrderByDirection = "AscNullsFirst" | "AscNullsLast" | "DescNullsFirst" | "DescNullsLast" | "%future added value";
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
export type IDFilter = {
  eq?: string | null | undefined;
};
export type EventsOrderBy = {
  communityId?: OrderByDirection | null | undefined;
  createdAt?: OrderByDirection | null | undefined;
  createdBy?: OrderByDirection | null | undefined;
  description?: OrderByDirection | null | undefined;
  eventDate?: OrderByDirection | null | undefined;
  id?: OrderByDirection | null | undefined;
  imageUrl?: OrderByDirection | null | undefined;
  location?: OrderByDirection | null | undefined;
  maxAttendees?: OrderByDirection | null | undefined;
  title?: OrderByDirection | null | undefined;
  updatedAt?: OrderByDirection | null | undefined;
};
export type EventsPageWrapperQuery$variables = {
  filter?: EventsFilter | null | undefined;
  first?: number | null | undefined;
  orderBy?: ReadonlyArray<EventsOrderBy> | null | undefined;
};
export type EventsPageWrapperQuery$data = {
  readonly eventsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"EventCardFragment">;
      };
    }>;
  } | null | undefined;
};
export type EventsPageWrapperQuery = {
  response: EventsPageWrapperQuery$data;
  variables: EventsPageWrapperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v3 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
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
    "name": "EventsPageWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
                  (v4/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "EventCardFragment"
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
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "EventsPageWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
                  (v4/*: any*/),
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
                              (v4/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "eventRsvpsCollection(filter:{\"status\":{\"eq\":\"attending\"}})"
                  },
                  (v5/*: any*/)
                ],
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
    "cacheID": "39bd98dceb29886795aa99d3b20929a9",
    "id": null,
    "metadata": {},
    "name": "EventsPageWrapperQuery",
    "operationKind": "query",
    "text": "query EventsPageWrapperQuery(\n  $filter: EventsFilter\n  $orderBy: [EventsOrderBy!]\n  $first: Int\n) {\n  eventsCollection(filter: $filter, orderBy: $orderBy, first: $first) {\n    edges {\n      node {\n        id\n        ...EventCardFragment\n        nodeId\n      }\n    }\n  }\n}\n\nfragment EventCardFragment on Events {\n  id\n  title\n  description\n  eventDate\n  location\n  imageUrl\n  maxAttendees\n  eventRsvpsCollection(filter: {status: {eq: attending}}) {\n    edges {\n      node {\n        id\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c0f9812e1c98e0720606b59671bd11c9";

export default node;
