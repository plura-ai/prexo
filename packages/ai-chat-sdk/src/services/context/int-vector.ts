import { Index } from "@upstash/vector";
import { VectorDB } from "./vector-db";
import type { AddContextPayload, VectorPayload, SaveOperationResult } from "../../lib/types";

export class IntVector {
  private vectorDB: VectorDB;
  private namespace: string;

  constructor(namespace: string) {
    const index = new Index({
      url: process.env.UPSTASH_VECTOR_REST_URL!,
      token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
    });
    this.vectorDB = new VectorDB(index);
    this.namespace = namespace;
  }

  async addContext(input: AddContextPayload): Promise<SaveOperationResult> {
    // Always use the internal namespace
    if (!input.options) input.options = {};
    input.options.namespace = this.namespace;
    return this.vectorDB.save(input);
  }

  async removeContext(ids: string[]): Promise<void> {
    await this.vectorDB.delete({ ids, namespace: this.namespace });
  }

  async getContext<TMetadata = any>(payload: Omit<VectorPayload, "namespace">): Promise<{ data: string; id: string; metadata: TMetadata }[]> {
    return this.vectorDB.retrieve<TMetadata>({ ...payload, namespace: this.namespace });
  }

  async resetContext(): Promise<void> {
    await this.vectorDB.reset({ namespace: this.namespace });
  }
}
