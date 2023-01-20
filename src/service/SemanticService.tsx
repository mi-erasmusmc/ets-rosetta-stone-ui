import axios from "axios";

import { Concept, Mapping, MappingAlgorithm } from "../@types/service";

const base = window._env_.BACKEND_BASE_URL;

function client() {
  return axios.create({
    baseURL: base,
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
}

export const doLookup = async (
  value: string,
  domain: string,
  vocabulary: string
): Promise<string[]> => {
  return client()
    .get<{ terms: string[] }>(
      `/concepts/lookup?vocabularies=${vocabulary}&domains=${domain}&query=${value}`
    )
    .then((resp) => {
      return resp.data?.terms ? resp.data.terms : [""];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const doMedDRALookup = async (value: string): Promise<string[]> => {
  return client()
    .get<{ terms: string[] }>(
      `/concepts/lookup?vocabularies=MEDDRA&&conceptClass=PT&query=${value}`
    )
    .then((resp) => {
      return resp.data?.terms ? resp.data.terms : [""];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const fetchTerms = async (vocabulary: string): Promise<Concept[]> => {
  return client()
    .get<Concept[]>(`/concepts?vocabulary=${vocabulary}&excludeUnmapped=true`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const normalize = async (
  value: string,
  vocabulary: string
): Promise<{ concepts: Concept[] }> => {
  return client()
    .get<{ concepts: Concept[] }>(
      `/concepts/normalize?vocabularies=${vocabulary}&term=${value}`
    )
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const fetchMappings = (
  mappingAlgorithm: MappingAlgorithm,
  penalty: string,
  organCode: string,
  findingCode: string
) => {
  if (mappingAlgorithm) {
    const codes = [];
    if (mappingAlgorithm.organ) {
      codes.push(organCode);
    }
    if (mappingAlgorithm.finding) {
      codes.push(findingCode);
    }
    return client()
      .get<Mapping[]>(`/mappings`, {
        params: {
          algorithm: mappingAlgorithm.name,
          conceptCodes: codes.toString(),
          explain: true,
          maxPenalty: penalty,
        },
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
};
