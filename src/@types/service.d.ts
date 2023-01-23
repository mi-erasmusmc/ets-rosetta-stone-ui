export type MappingAlgorithm = {
  label: string;
  name: string;
  organ: boolean;
  finding: boolean;
  options: string;
};

export type Mapping = {
  to: MappingItem[];
  from?: MappingItem[];
  description?: string;
  penalty?: number;
  total_penalty: number;
  preceding_mapping?: Mapping;
};

export type MappingItem = {
  concepts: Concept[];
};

export type Concept = {
  id: number;
  name: string;
  code: string;
  concept_class: string;
  domain: string;
  vocabulary: string;
  invalid_reason?: string;
};

declare global {
  interface String {
    ngrams(n: number): string[];
  }

  interface Window {
    _env_: {
      KEYCLOAK_ENABLED: string;
      BACKEND_BASE_URL: string;
      KEYCLOAK_URL: string;
      KEYCLOAK_REALM: string;
      KEYCLOAK_CLIENT_ID: string;
      TOXHUB_HOME: string;
    };
  }
}

declare interface String {
  ngrams(n: number): string[];
}
