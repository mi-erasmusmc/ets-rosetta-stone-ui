import React from "react";

import "../App.css";
import "../styles/about.css";

export const About = () => {
  const base = window._env_.BACKEND_BASE_URL;

  return (
    <div>
      <h2>eTransafe Rosetta Stone</h2>
      <div className="about-item">
        <div className="about-sub-item">
          The <em>eTransafe Rosetta Stone</em> is a translation system which
          aims to bridge the incongruity between preclinical (HPATH, MA, SEND)
          and clinical vocabularies (MedDRA).
        </div>
        <div className="about-sub-item">
          The translation strategy is based on the use of the Systematized
          Nomenclature of Medicine, Clinical Terms (SNOMED CT) as an
          intermediate ontology, where both preclinical and clinical terms are
          first mapped to SNOMED CT and the link between preclinical and
          clinical is sought using existing relations defined within SNOMED CT.
        </div>
        <div className="about-sub-item">
          The preclinical mappings to SNOMED CT were manually established and
          limited to terms used in eTRANSAFE data sources. For the clinical
          mappings we predominantly use existing terminological resources which
          provide mappings between MedDRA and SNOMED CT, such as the Unified
          Medical Language System (UMLS) and WEB-RADR.
        </div>
      </div>
      <hr />
      <h2>FAQ</h2>
      <div className="about-item">
        <div className="about-sub-item">
          <b>How are the penalty scores calculated?</b>
        </div>
        <div className="about-sub-item">
          At present penalties are awarded as follows:
          <li>1 point for a traversal within the SNOMED CT hierarchy</li>
          <li>
            1 point for ignoring a finding site (organ) associated with a
            'clinical finding'
          </li>
          <li>1 point for ignoring an 'AND' mapping</li>
          <li>0.1 point for ignoring an 'OR' mapping</li>
          <li>
            0.1 point for moving from MedDRA Preferred Term (PT) to MedDRA Low
            Level Term (LLT)
          </li>
          <li>
            Negative scores for not mapping from single clinical terms to
            preclinical <em>combinations</em> and vice versa
          </li>
        </div>
        <div className="about-sub-item">
          <b>The mapping seems wrong, can you fix it?</b>
        </div>
        <div className="about-sub-item">
          Mapping from preclinical to SNOMED and MedDRA to SNOMED are manually
          done and we can change them, send an email to r.parry@erasmusmc.nl.
          Please note that in the current set up mappings were only made in one
          direction (towards SNOMED) due to this suboptimal mappings from SNOMED
          towards preclinical or MedDRA are common, bi-directional mapping is on
          the agenda.
        </div>
      </div>
      <hr />
      <h2>Vocabularies</h2>
      <div className="about-item">
        <div className="about-sub-item">
          <a
            href="https://github.com/Novartis/hpath"
            target="_blank"
            rel="noreferrer"
          >
            HPATH
          </a>{" "}
          (April 2018)
        </div>
        <div className="about-sub-item">
          <a href="https://www.meddra.org/" target="_blank" rel="noreferrer">
            MedDRA
          </a>{" "}
          (version 25.0, March 2022)
        </div>
        <div className="about-sub-item">
          <a
            href="https://bioportal.bioontology.org/ontologies/MA"
            target="_blank"
            rel="noreferrer"
          >
            Mouse Anatomy
          </a>{" "}
          (October 2017)
        </div>
        <div className="about-sub-item">
          <a
            href="https://www.cdisc.org/standards/foundational/send"
            target="_blank"
            rel="noreferrer"
          >
            SEND
          </a>{" "}
          (June 2022)
        </div>
        <div className="about-sub-item">
          <a href="https://www.snomed.org/" target="_blank" rel="noreferrer">
            SNOMED CT
          </a>{" "}
          (November 2021)
        </div>
      </div>
      <hr />
      <h2>API</h2>
      <div className="about-item">
        <div className="about-sub-item">
          Would you like to integrate the <em>eTransafe Rosetta Stone</em> with
          your app? Check out the{" "}
          <a
            href={base + "/swagger-ui/index.html#/"}
            rel="docs noreferrer"
            target="_blank"
          >
            API documentation
          </a>
        </div>
      </div>
      <hr />
      <h2>Licencing</h2>
      <div className="about-item">
        <div className="about-sub-item">
          All users of the eTransafe Rosetta Stone are required to have a MedDRA
          licence. Most pharmaceutical companies have such a license. The
          license is free for academic institutions. For more details see{" "}
          <a
            href="https://www.meddra.org/subscription-rates"
            rel="noreferrer"
            target="_blank"
          >
            https://www.meddra.org/subscription-rates
          </a>
        </div>
        <div className="about-sub-item">
          "SNOMED" and "SNOMED CT" are registered trademarks of the IHTSDO. Use
          of SNOMED CT content is subject to the terms and conditions set forth
          in the SNOMED CT Affiliate License Agreement. It is the responsibility
          of those implementing this product to ensure that they are
          appropriately licensed and for more information on the license,
          including how to register as an Affiliate Licensee, please refer to{" "}
          <a
            href="https://www.snomed.org/snomed-ct/get-snomed-ct"
            rel="noreferrer"
            target="_blank"
          >
            https://www.snomed.org/snomed-ct/get-snomed-ct
          </a>{" "}
          or info@snomed.org. Under the terms of the Affiliate License, use of
          SNOMED CT in countries that are not IHTSDO Members is subject to
          reporting and fee payment obligations.
        </div>
      </div>
      <hr />
      <h2>Contact</h2>
      <div className="about-item">
        <div className="about-sub-item">
          Questions or suggestions? Send an email to r.parry@erasmusmc.nl
        </div>
      </div>
    </div>
  );
};
