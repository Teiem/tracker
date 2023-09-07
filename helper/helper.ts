export const ObjectEntriesExact = <TKey extends PropertyKey, TValue>(obj: Record<TKey, TValue>): [TKey, TValue][] => Object.entries(obj) as [TKey, TValue][];
export const ObjectFromEntriesExact = <TKey extends PropertyKey, TValue>(entries: readonly [TKey, TValue][]): Record<TKey, TValue> => Object.fromEntries(entries) as Record<TKey, TValue>;

export const mapObject = <TKey extends PropertyKey, TValue, TReturn>(obj: Record<TKey, TValue>, mapCallback: (arg: [TKey, TValue], i: number) => TReturn): Record<TKey, TReturn> => ObjectFromEntriesExact(ObjectEntriesExact(obj).map((arg, i) => [arg[0], mapCallback(arg, i)]));
export const reduceObject = <TKey extends PropertyKey, TValue, TReturn>(obj: Record<TKey, TValue>, reduceCallback: (acc: TReturn, cur: [TKey, TValue], i: number) => TReturn): TReturn => ObjectEntriesExact(obj).reduce(reduceCallback);

export const range = (length: number) => [...Array(length).keys()];
export const unique = (value: unknown, index: number, array: unknown[]) => array.indexOf(value) === index;
