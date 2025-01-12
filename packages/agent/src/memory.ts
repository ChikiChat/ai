/**
 * Represents a simple in-memory key-value store.
 * This class provides methods to store, retrieve, update, and delete key-value pairs.
 * It uses a `Map` to efficiently manage the data.
 */
export class Memory {
    private memory: Map<string, any>;

    constructor() {
        this.memory = new Map();
    }

    /**
     * Stores a value in memory with the given key.
     * If the key already exists, its value will be updated.
     *
     * @param key The key to store the value under.
     * @param value The value to store.
     */
    public set(key: string, value: any): void {
        this.memory.set(key, value);
    }

    /**
     * Retrieves the value associated with the given key.
     *
     * @param key The key to look up.
     *
     * @returns The value associated with the key, or undefined if not found.
     */
    public get(key: string): any {
        return this.memory.get(key);
    }

    /**
     * Deletes the key-value pair associated with the given key.
     *
     * @param key The key to delete.
     *
     * @returns True if the key was found and deleted, false otherwise.
     */
    public delete(key: string): boolean {
        return this.memory.delete(key);
    }

    /**
     * Checks if a key exists in memory.
     *
     * @param key The key to check for.
     *
     * @returns True if the key exists, false otherwise.
     */
    public has(key: string): boolean {
        return this.memory.has(key);
    }

    /**
     * Returns an iterator over the keys in memory.
     *
     * @returns An iterator over the keys.
     */
    public keys(): IterableIterator<string> {
        return this.memory.keys();
    }

    /**
     * Returns an iterator over the values in memory.
     *
     * @returns An iterator over the values.
     */
    public values(): IterableIterator<any> {
        return this.memory.values();
    }

    /**
     * Returns an iterator over the key-value pairs in memory.
     *
     * @returns An iterator over the entries.
     */
    public entries(): IterableIterator<[string, any]> {
        return this.memory.entries();
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
     * @returns The size of the memory.
     */
    public size(): number {
        return this.memory.size;
    }
}


