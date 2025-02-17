import {Meta} from "./types";

/**
 * Enum representing the possible relationships between nodes.
 */
export enum NodeRelationship {
    LEFT,
    RIGHT,
}

/**
 * Represents a node in a graph or tree structure.
 *
 * @template META - The type of metadata, which extends the `Meta` type.
 * @template KIND - The type of the kind or type of the node.
 * @template CONTENT - The type of the content of the node.
 */
export class Node<META extends Meta = Meta, KIND = string, CONTENT = string> {
    /**
     * The metadata associated with the node.
     */
    readonly meta: META;

    /**
     * The kind or type of the node.
     */
    readonly kind: KIND;

    /**
     * The content of the node.
     */
    readonly content: CONTENT;

    /**
     * A record of relationships between this node and other nodes.
     */
    relationships: Record<NodeRelationship, Node<META, KIND, CONTENT>[]> = {
        [NodeRelationship.LEFT]: [],
        [NodeRelationship.RIGHT]: [],
    };

    /**
     * Constructs a new Node instance.
     *
     * @param kind - The kind or type of the node.
     * @param content - The content of the node.
     * @param meta - The metadata for the node.
     */
    constructor(kind: KIND, content: CONTENT, meta?: META) {
        this.meta = meta || {} as META;
        this.kind = kind;
        this.content = content;
    }

    /**
     * Adds a node to the left relationship of this node.
     *
     * @param node - The node to add to the left relationship.
     */
    setLeft(node: Node<META, KIND, CONTENT>) {
        this.relationships[NodeRelationship.LEFT].push(node);
    }

    /**
     * Adds a node to the right relationship of this node.
     *
     * @param node - The node to add to the right relationship.
     */
    setRight(node: Node<META, KIND, CONTENT>) {
        this.relationships[NodeRelationship.RIGHT].push(node);
    }

    /**
     * Retrieves the nodes in the left relationship of this node.
     *
     * @returns An array of nodes in the left relationship.
     */
    lefts(): Node<META, KIND, CONTENT>[] {
        return this.relationships[NodeRelationship.LEFT];
    }

    /**
     * Retrieves the nodes in the right relationship of this node.
     *
     * @returns An array of nodes in the right relationship.
     */
    rights(): Node<META, KIND, CONTENT>[] {
        return this.relationships[NodeRelationship.RIGHT];
    }
}
