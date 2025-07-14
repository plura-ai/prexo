"use client";
import type { BaseVectorContext } from "../../lib/types";
import { ExtVector } from "./ext-vector";
import { IntVector } from "./int-vector";

export type GetContextClientParams = {
  vector?: {
    url: string;
    token: string;
    namespace: string;
  },
};

export const getContextClient = (
  params?: GetContextClientParams
): BaseVectorContext | undefined => {
  const vectorUrl = params?.vector?.url;
  const vectorToken = params?.vector?.token;
  const namespace = params?.vector?.namespace;

  if (vectorUrl && vectorToken && namespace) {
    return new ExtVector(
      { url: vectorUrl, token: vectorToken },
      namespace
    );
  } else {
    console.log("Vector DB is not initialised!");
    return undefined;
  }
};
