"use client";
import type { BaseVectorContext } from "../../lib/types";
import { ExtVector } from "./ext-vector";
import { IntVector } from "./int-vector";

export type GetContextClientParams = {
  vector?: {
    url: string;
    token: string;
  },
  namespace: string;
};

export const getContextClient = (
  params?: GetContextClientParams
): BaseVectorContext => {
  const vectorUrl = params?.vector?.url;
  const vectorToken = params?.vector?.token;
  const namespace = params?.namespace;

  if (vectorUrl && vectorToken && namespace) {
    return new ExtVector(
      { url: vectorUrl, token: vectorToken },
      namespace!
    );
  }
  
  return new IntVector(namespace!)
};
