/**
 * @generated SignedSource<<a43b5b278f3311de7ba61eaa7645cf45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FilterIs = "NOT_NULL" | "NULL" | "%future added value";
export type RsvpStatus = "attending" | "not_attending" | "%future added value";
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
export type EventRsvpsFilter = {
  and?: ReadonlyArray<EventRsvpsFilter> | null | undefined;
  createdAt?: DatetimeFilter | null | undefined;
  eventId?: UUIDFilter | null | undefined;
  id?: UUIDFilter | null | undefined;
  nodeId?: IDFilter | null | undefined;
  not?: EventRsvpsFilter | null | undefined;
  or?: ReadonlyArray<EventRsvpsFilter> | null | undefined;
  status?: RsvpStatusFilter | null | undefined;
  userId?: UUIDFilter | null | undefined;
};
export type RsvpStatusFilter = {
  eq?: RsvpStatus | null | undefined;
  in?: ReadonlyArray<RsvpStatus> | null | undefined;
  is?: FilterIs | null | undefined;
  neq?: RsvpStatus | null | undefined;
};
export type EventDetailPageWrapperQuery$variables = {
  eventFilter?: EventsFilter | null | undefined;
  rsvpFilter?: EventRsvpsFilter | null | undefined;
};
export type EventDetailPageWrapperQuery$data = {
  readonly currentUserRsvp: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly status: RsvpStatus;
      };
    }>;
  } | null | undefined;
  readonly eventsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdAt: string;
        readonly createdBy: string;
        readonly description: string | null | undefined;
        readonly eventDate: string;
        readonly eventRsvpsCollection: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly id: string;
              readonly status: RsvpStatus;
              readonly userId: string;
            };
          }>;
        } | null | undefined;
        readonly id: string;
        readonly imageUrl: string | null | undefined;
        readonly location: string | null | undefined;
        readonly maxAttendees: number | null | undefined;
        readonly pinned: boolean;
        readonly profiles: {
          readonly avatarUrl: string | null | undefined;
          readonly firstName: string | null | undefined;
          readonly lastName: string | null | undefined;
        } | null | undefined;
        readonly title: string;
      };
    }>;
  } | null | undefined;
};
export type EventDetailPageWrapperQuery = {
  response: EventDetailPageWrapperQuery$data;
  variables: EventDetailPageWrapperQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventFilter"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "rsvpFilter"
  }
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v2 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "eventFilter"
  },
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventDate",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxAttendees",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdBy",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pinned",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v16 = [
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
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userId",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v19 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "rsvpFilter"
  },
  (v1/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventDetailPageWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profiles",
                    "kind": "LinkedField",
                    "name": "profiles",
                    "plural": false,
                    "selections": [
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v16/*: any*/),
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
                              (v3/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/)
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
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "currentUserRsvp",
        "args": (v19/*: any*/),
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
                  (v3/*: any*/),
                  (v18/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventDetailPageWrapperQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profiles",
                    "kind": "LinkedField",
                    "name": "profiles",
                    "plural": false,
                    "selections": [
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v20/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v16/*: any*/),
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
                              (v3/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v20/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "eventRsvpsCollection(filter:{\"status\":{\"eq\":\"attending\"}})"
                  },
                  (v20/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "currentUserRsvp",
        "args": (v19/*: any*/),
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
                  (v3/*: any*/),
                  (v18/*: any*/),
                  (v20/*: any*/)
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
    "cacheID": "b796fb7ff5576dbc0b3164b01f34f9ca",
    "id": null,
    "metadata": {},
    "name": "EventDetailPageWrapperQuery",
    "operationKind": "query",
    "text": "query EventDetailPageWrapperQuery(\n  $eventFilter: EventsFilter\n  $rsvpFilter: EventRsvpsFilter\n) {\n  eventsCollection(filter: $eventFilter, first: 1) {\n    edges {\n      node {\n        id\n        title\n        description\n        eventDate\n        location\n        imageUrl\n        maxAttendees\n        createdAt\n        createdBy\n        pinned\n        profiles {\n          firstName\n          lastName\n          avatarUrl\n          nodeId\n        }\n        eventRsvpsCollection(filter: {status: {eq: attending}}) {\n          edges {\n            node {\n              id\n              userId\n              status\n              nodeId\n            }\n          }\n        }\n        nodeId\n      }\n    }\n  }\n  currentUserRsvp: eventRsvpsCollection(filter: $rsvpFilter, first: 1) {\n    edges {\n      node {\n        id\n        status\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "977f4cc0ec981251c887643bd378148c";

export default node;
