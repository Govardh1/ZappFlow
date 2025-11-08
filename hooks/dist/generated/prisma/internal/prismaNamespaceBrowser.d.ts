import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Zap: "Zap";
    readonly Trigger: "Trigger";
    readonly AvailableTrigger: "AvailableTrigger";
    readonly Action: "Action";
    readonly AvailableAction: "AvailableAction";
    readonly ZapRun: "ZapRun";
    readonly ZapRunOutBox: "ZapRunOutBox";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ZapScalarFieldEnum: {
    readonly id: "id";
    readonly triggerId: "triggerId";
};
export type ZapScalarFieldEnum = (typeof ZapScalarFieldEnum)[keyof typeof ZapScalarFieldEnum];
export declare const TriggerScalarFieldEnum: {
    readonly id: "id";
    readonly zapId: "zapId";
    readonly triggerId: "triggerId";
};
export type TriggerScalarFieldEnum = (typeof TriggerScalarFieldEnum)[keyof typeof TriggerScalarFieldEnum];
export declare const AvailableTriggerScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type AvailableTriggerScalarFieldEnum = (typeof AvailableTriggerScalarFieldEnum)[keyof typeof AvailableTriggerScalarFieldEnum];
export declare const ActionScalarFieldEnum: {
    readonly id: "id";
    readonly zapId: "zapId";
    readonly actionId: "actionId";
};
export type ActionScalarFieldEnum = (typeof ActionScalarFieldEnum)[keyof typeof ActionScalarFieldEnum];
export declare const AvailableActionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type AvailableActionScalarFieldEnum = (typeof AvailableActionScalarFieldEnum)[keyof typeof AvailableActionScalarFieldEnum];
export declare const ZapRunScalarFieldEnum: {
    readonly id: "id";
    readonly zapId: "zapId";
    readonly metadata: "metadata";
};
export type ZapRunScalarFieldEnum = (typeof ZapRunScalarFieldEnum)[keyof typeof ZapRunScalarFieldEnum];
export declare const ZapRunOutBoxScalarFieldEnum: {
    readonly id: "id";
    readonly zapRunId: "zapRunId";
};
export type ZapRunOutBoxScalarFieldEnum = (typeof ZapRunOutBoxScalarFieldEnum)[keyof typeof ZapRunOutBoxScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map