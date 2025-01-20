import {Properties} from "./types";

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
 * @template KIND - The type of the kind or type of the node, which defaults to `string`.
 * @template CONTENT - The type of content, which defaults to `string`.
 * @template PROPERTIES - The type of properties associated with the node, which defaults to `Properties`.
 */
export class Node<KIND = string, CONTENT = string, PROPERTIES extends Properties = Properties> {
    /**
     * The kind or type of the node.
     */
    readonly kind: KIND;

    /**
     * The content of the node.
     */
    readonly content: CONTENT;

    /**
     * A record of properties associated with the node.
     */
    readonly properties: PROPERTIES;

    /**
     * A record of relationships between this node and other nodes.
     */
    relationships: Record<NodeRelationship, Node<KIND, CONTENT, PROPERTIES>[]> = {
        [NodeRelationship.LEFT]: [],
        [NodeRelationship.RIGHT]: [],
    };

    /**
     * Creates a new node.
     *
     * @param kind - The kind or type of the node.
     * @param content - The content of the node.
     * @param properties - Optional properties associated with the node.
     */
    constructor(kind: KIND, content: CONTENT, properties?: PROPERTIES) {
        this.kind = kind;
        this.content = content;
        this.properties = properties || {} as PROPERTIES;
    }

    /**
     * Adds a node to the left relationship of this node.
     *
     * @param node - The node to add to the left relationship.
     */
    setLeft(node: Node<KIND, CONTENT, PROPERTIES>) {
        this.relationships[NodeRelationship.LEFT].push(node);
    }

    /**
     * Adds a node to the right relationship of this node.
     *
     * @param node - The node to add to the right relationship.
     */
    setRight(node: Node<KIND, CONTENT, PROPERTIES>) {
        this.relationships[NodeRelationship.RIGHT].push(node);
    }

    /**
     * Retrieves the nodes in the left relationship of this node.
     *
     * @returns An array of nodes in the left relationship.
     */
    lefts(): Node<KIND, CONTENT, PROPERTIES>[] {
        return this.relationships[NodeRelationship.LEFT];
    }

    /**
     * Retrieves the nodes in the right relationship of this node.
     *
     * @returns An array of nodes in the right relationship.
     */
    rights(): Node<KIND, CONTENT, PROPERTIES>[] {
        return this.relationships[NodeRelationship.RIGHT];
    }
}
