import { ArrowUpward, InfoOutlined } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Concept, Mapping } from "../@types/service";

type MappingResultGroupProps = {
  tag: string;
  predicate: (m: Mapping) => boolean;
  result: Mapping[];
};

const printResults = (items: Concept[]) => {
  const newArray = [...items]
    .sort((a, b) => {
      if (a.domain < b.domain) {
        return 1;
      }
      if (a.domain > b.domain) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    })
    .map((c) => c.name);
  return newArray.join(" + ");
};

let mappingExplanation: (m: Mapping) => JSX.Element = function (
  m: Mapping
): JSX.Element {
  const printConcepts = (items: Concept[]) => {
    const newArray = items.map(
      (c) => c.name + " (" + c.vocabulary + " " + c.concept_class + ") "
    );
    return newArray.join(" AND ");
  };

  return (
    <div style={{ fontSize: 14 }}>
      <div>
        {m?.to?.map((item) => {
          return (
            <div style={{ fontWeight: "bold" }}>
              <br />
              <em>{printConcepts(item.concepts)}</em>
              <br />
            </div>
          );
        })}
      </div>
      <br />
      <div className={"centered-flex"}>
        <ArrowUpward fontSize={"medium"} />
        <div>
          {m.description as string}{" "}
          {m.penalty
            ? " (penalty: " + Math.round(m.penalty * 100) / 100 + ")"
            : ""}
        </div>
      </div>
      {m.preceding_mapping ? (
        mappingExplanation(m.preceding_mapping)
      ) : (
        <div>
          {m?.from?.map((item) => {
            return (
              <div style={{ fontWeight: "bold" }}>
                <br />
                <em>{printConcepts(item.concepts)}</em>
                <br />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const MappingResultGroup: FunctionComponent<MappingResultGroupProps> = ({
  tag,
  result,
  predicate,
}) => {
  const [resultData, setResultData] = useState<Mapping[]>([]);

  useEffect(() => {
    setResultData(result);
  }, [result]);

  if (resultData?.filter(predicate).length > 0) {
    const sortedMappings = [...resultData].sort((a, b) => {
      const dist = Math.abs(a.total_penalty) - Math.abs(b.total_penalty);
      const items =
        Math.abs(a.to[0].concepts.length - 2) -
        Math.abs(b.to[0].concepts.length - 2);
      return dist === 0
        ? items === 0
          ? a.to[0].concepts[0].name.length - b.to[0].concepts[0].name.length
          : items
        : dist;
    });
    return (
      <div>
        <h4>{tag}</h4>
        {sortedMappings.map((m2) => {
          if (predicate(m2)) {
            return (
              <div
                key={m2?.to && m2.to[0].concepts[0].code}
                style={{ padding: "4px" }}
              >
                <span>{m2?.to && printResults(m2.to[0].concepts)} </span>
                <span style={{ fontSize: "small" }}>
                  {m2.total_penalty
                    ? "  (" + Math.round(m2.total_penalty * 100) / 100 + ")  "
                    : "  "}
                </span>
                <Tooltip title={mappingExplanation(m2)}>
                  <InfoOutlined
                    style={{ fontSize: "13px", color: "#00216d" }}
                  />
                </Tooltip>
              </div>
            );
          } else {
            return <div />;
          }
        })}
      </div>
    );
  } else {
    return <div />;
  }
};

export default MappingResultGroup;
