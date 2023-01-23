import { InfoOutlined } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Autocomplete, TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";

import { Concept, Mapping, MappingAlgorithm } from "../@types/service";
import "../App.css";
import MappingResultGroup from "../components/MappingResultGroup";
import { algorithms } from "../json/algorithms";
import { filterOptions } from "../service/FilterService";
import {
  doLookup,
  doMedDRALookup,
  fetchMappings,
  fetchTerms,
  normalize,
} from "../service/SemanticService";

const algorithmOptions = [...algorithms].sort((a, b) => {
  if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
  if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
  return 0;
});

function Translate() {
  const [request, setRequest] = useState({ findingCode: "", organCode: "" });
  const [result, setResult] = useState<Mapping[]>([]);
  const [loading, setLoading] = useState(false);
  const [penalty, setPenalty] = useState("2");
  const [findingOptions, setFindingOptions] = useState<Concept[]>([]);
  const [organOptions, setOrganOptions] = useState<Concept[]>([]);

  const [mappingAlgorithm, setMappingAlgorithm] = useState<
    MappingAlgorithm | undefined
  >(undefined);

  useEffect(() => {
    setResult([]);
    if (mappingAlgorithm) {
      if (
        mappingAlgorithm.options === "meddra" ||
        mappingAlgorithm.options === "snomed"
      ) {
        setFindingOptions([]);
        setOrganOptions([]);
      } else if (mappingAlgorithm.options === "etox") {
        fetchTerms("HPATH").then((terms) => setFindingOptions(terms));
        fetchTerms("MA").then((terms) => setOrganOptions(terms));
      } else if (mappingAlgorithm.options.includes("send")) {
        fetchSend();
      }
    }
  }, [mappingAlgorithm]);

  const handleFindingSelect = (finding: Concept) => {
    if (finding) {
      const organCode = request.organCode;
      if (mappingAlgorithm?.options === "meddra") {
        normalize(finding.name, "MEDDRA").then((resp) => {
          setRequest({
            organCode: organCode,
            findingCode: resp.concepts[0].code,
          });
        });
      } else {
        setRequest({ findingCode: finding.code, organCode: organCode });
      }
    }
  };

  const searchSNOMED = (q: string) => {
    doLookup(q, "SPEC_ANATOMIC_SITE", "SNOMED").then((words) => {
      let options: Concept[] = [];
      words.forEach((o) =>
        options.push({
          concept_class: "",
          domain: "",
          id: 0,
          invalid_reason: undefined,
          vocabulary: "",
          name: o,
          code: "",
        })
      );
      setOrganOptions(options);
    });
  };

  const searchMedDRA = (value: string) => {
    doMedDRALookup(value).then((words) => {
      let options: Concept[] = [];
      words.forEach((o) =>
        options.push({
          concept_class: "",
          domain: "",
          id: 0,
          invalid_reason: undefined,
          vocabulary: "",
          name: o,
          code: "",
        })
      );
      setFindingOptions(options);
    });
  };

  const fetchSend = () => {
    let send: Concept[] = [];
    if (mappingAlgorithm?.options?.includes("lb")) {
      fetchTerms("LABORATORY_TEST_NAME").then((terms) => {
        terms.forEach((c) => send.push(c));
        setFindingOptions(send);
      });
    }
    if (mappingAlgorithm?.options?.includes("non")) {
      fetchTerms("NON_NEOPLASTIC_FINDING").then((terms) => {
        terms.forEach((c) => send.push(c));
        setFindingOptions(send);
      });
    }
    if (mappingAlgorithm?.options?.includes("neo")) {
      fetchTerms("NEOPLASM_TYPE").then((terms) => {
        terms.forEach((c) => send.push(c));
        setFindingOptions(send);
      });
    }
    fetchTerms("SPECIMEN").then((terms) => setOrganOptions(terms));
  };

  const handleOrganSelect = (organ: Concept) => {
    const findingCode = request.findingCode;
    if (organ) {
      if (mappingAlgorithm?.options === "snomed") {
        normalize(organ.name, "SNOMED").then((resp) => {
          setRequest({
            findingCode: findingCode,
            organCode: resp.concepts[0].code,
          });
        });
      } else {
        setRequest({ findingCode: findingCode, organCode: organ.code });
      }
    }
  };

  const handleAlgorithmSelect = (a: MappingAlgorithm) => {
    if (a) {
      setMappingAlgorithm(a);
    }
  };

  const handlePenaltySelect = (n: string) => {
    if (n) {
      setPenalty(n);
    }
  };

  const fetchTranslation = async () => {
    setLoading(true);
    setResult([]);
    if (mappingAlgorithm) {
      const r = fetchMappings(
        mappingAlgorithm,
        penalty,
        request.organCode,
        request.findingCode
      );
      if (r) {
        r.then((resp) => {
          setResult(resp);
          setLoading(false);
        }).catch((err) => {
          setResult([]);
          setLoading(false);
          console.log(err);
        });
      }
    }
  };

  const translate = async () => {
    setResult([]);
    if (request) {
      setResult([]);
      await fetchTranslation();
    }
  };

  return (
    <div>
      <div className={"regular"}>
        <h2>Terminology Translator</h2>
      </div>
      <div className={"regular"}>
        <div className="App-block">
          <Autocomplete
            disablePortal={true}
            onChange={(_event, a) => {
              if (a) {
                handleAlgorithmSelect(a);
              }
            }}
            options={algorithmOptions}
            getOptionLabel={(a: MappingAlgorithm) => a.label}
            sx={{ width: "35vw" }}
            placeholder="Select a translation"
            renderInput={(params) => (
              <TextField {...params} label="Translation" />
            )}
          />
        </div>
      </div>
      <hr />
      <div className={"regular"}>
        {mappingAlgorithm?.organ && (
          <div className="App-block">
            <Autocomplete
              key={mappingAlgorithm.label + "organ"}
              disablePortal
              onInputChange={(_event, value: string) => {
                if (mappingAlgorithm?.options === "snomed") {
                  if (value && value.length > 3) {
                    searchSNOMED(value);
                  }
                }
              }}
              onChange={(_event, organ) => {
                if (organ) {
                  handleOrganSelect(organ);
                }
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              filterOptions={filterOptions}
              options={organOptions}
              getOptionLabel={(o: Concept) => o.name}
              sx={{ width: "30vw" }}
              placeholder="Select an organ"
              renderInput={(params) => <TextField {...params} label="Organ" />}
            />
          </div>
        )}
        {mappingAlgorithm?.finding && (
          <div className="App-block">
            <Autocomplete
              key={mappingAlgorithm.label + "finding"}
              disablePortal={true}
              onInputChange={(_event, value: string) => {
                if (mappingAlgorithm?.options === "meddra") {
                  if (value && value.length > 3) {
                    searchMedDRA(value);
                  }
                }
              }}
              onChange={(_event, finding) => {
                if (finding) {
                  handleFindingSelect(finding);
                }
              }}
              options={findingOptions}
              filterOptions={filterOptions}
              getOptionLabel={(o: Concept) => o.name}
              sx={{ width: "30vw" }}
              placeholder="Select a finding"
              renderInput={(params) => (
                <TextField {...params} label="Finding" />
              )}
            />
          </div>
        )}
        {mappingAlgorithm && (
          <div className="App-block">
            <div className="App-block" style={{ padding: "0" }}>
              <Autocomplete
                disablePortal
                onChange={(_event, p) => {
                  if (p) {
                    handlePenaltySelect(p);
                  }
                }}
                defaultValue={"2"}
                options={["0", "1", "2", "3"]}
                sx={{ width: "12vw" }}
                getOptionLabel={(n: string) => n}
                placeholder="Max penalty"
                renderInput={(params) => (
                  <TextField {...params} label="Max penalty" />
                )}
              />
            </div>
            <div className="App-block" style={{ paddingLeft: "10px" }}>
              <Tooltip
                title={
                  <div style={{ fontSize: 14 }}>
                    Penalty scores are awarded for traversal within a vocabulary
                    hierarchy and disregarding 'and' and 'or' mappings.
                    <br />
                    <br />
                    Reduce or increase the amount of results returned by the
                    Rosetta Stone by changing the maximum penalty.
                    <br />
                    <br />
                    Please be aware that setting the threshold above 2 can lead
                    to long loading times for mappings involving organ - finding
                    combinations.
                  </div>
                }
              >
                <InfoOutlined style={{ fontSize: "15px", color: "#00216d" }} />
              </Tooltip>
            </div>
          </div>
        )}
        <div className={"regular"}>
          <LoadingButton
            disabled={mappingAlgorithm === undefined}
            loading={loading}
            variant="outlined"
            onClick={() => translate()}
          >
            Translate
          </LoadingButton>
        </div>
      </div>
      {mappingAlgorithm && (
        <div>
          <hr />
          <div className="regular">
            {result.length > 0 || loading ? (
              <div className={"regular"}>
                <MappingResultGroup
                  tag="Unable to translate"
                  result={result}
                  predicate={(m: Mapping) => m.total_penalty === 0 && !m.to}
                />
                <MappingResultGroup
                  tag="Perfect matches"
                  result={result}
                  predicate={(m: Mapping) => m.to && m.total_penalty === 0}
                />
                <MappingResultGroup
                  tag="Imperfect matches"
                  result={result}
                  predicate={(m: Mapping) => m.total_penalty > 0}
                />
                <MappingResultGroup
                  tag={
                    mappingAlgorithm.name.includes("MEDDRAPT2")
                      ? "Disregarding either organs or findings:"
                      : "Disregarding organ:"
                  }
                  result={result}
                  predicate={(m: Mapping) => m.total_penalty < 0}
                />
              </div>
            ) : (
              <div className="regular">
                <h4>Nothing found, try again</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Translate;
