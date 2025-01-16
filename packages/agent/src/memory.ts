/**
 * Represents a simple in-memory key-value store.
 * This class provides methods to store, retrieve, update, and delete key-value pairs.
 * It uses a `Map` to efficiently manage the data.
 */
export class Memory<K extends string | number = string, V = any> {
    private memory: Map<K, V>;

    constructor() {
        this.memory = new Map();
    }

    /**
     * Stores a value in memory with the given key.
     * If the key already exists, its value will be updated.
     *
     * @param key - The key to store the value under.
     * @param value - The value to store.
     */
    public set(key: K, value: V): void {
        this.memory.set(key, value);
    }

    /**
     * Retrieves the value associated with the given key.
     *
     * @param key - The key to look up.
     *
     * @returns The value associated with the key, or `undefined` if the key does not exist.
     */
    public get(key: K): V | undefined {
        return this.memory.get(key);
    }

    /**
     * Deletes the key-value pair associated with the given key.
     *
     * @param key - The key to delete.
     *
     * @returns `true` if the key was found and deleted, `false` otherwise.
     */
    public delete(key: K): boolean {
        return this.memory.delete(key);
    }

    /**
     * Checks if a key exists in memory.
     *
     * @param key - The key to check for.
     *
     * @returns `true` if the key exists, `false` otherwise.
     */
    public has(key: K): boolean {
        return this.memory.has(key);
    }

    /**
     * Returns an iterator over the keys in memory.
     *
     * @returns An iterator over the keys.
     */
    public keys(): IterableIterator<K> {
        return this.memory.keys();
    }

    /**
     * Returns an iterator over the values in memory.
     *
     * @returns An iterator over the values.
     */
    public values(): IterableIterator<V> {
        return this.memory.values();
    }

    /**
     * Returns an iterator over the key-value pairs in memory.
     *
     * @returns An iterator over the entries.
     */
    public entries(): IterableIterator<[K, V]> {
        return this.memory.entries();
    }

    /**
     * Returns an array of all key-value pairs in memory.
     *
     * @returns An array of key-value pairs.
     */
    public asArray(): [K, V][] {
        return Array.from(this.memory.entries());
    }

    /**
     * Returns an object representation of the key-value pairs in memory.
     * Note: If the keys are not strings, they will be converted to strings using `toString()`.
     *
     * @returns An object with keys as strings and values as their corresponding values.
     */
    public asObject(): { [key: string]: V } {
        return Object.fromEntries(
            this.asArray().map(([key, value]) => [String(key), value])
        );
    }

    /**
     * Clears all key-value pairs from memory.
     */
    public clear(): void {
        this.memory.clear();
    }

    /**
     * Returns the number of key-value pairs in memory.
     *
     * @returns The number of key-value pairs.
     */
    public size(): number {
        return this.memory.size;
    }
}
