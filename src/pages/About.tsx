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
          The <em>eTransafe Rosetta Stone</em> is a translational system which
          aims to bridge the incongruity between preclinical (SEND, HPATH, MA)
          and clinical vocabularies (MedDRA). It was developed by the{" "}
          <a
            href="https://biosemantics.erasmusmc.nl/"
            target="_blank"
            rel="noreferrer"
          >
            BioSemantics Group
          </a>{" "}
          at the Erasmus MC{" "}
          <a
            href="https://www.erasmusmc.nl/en/research/departments/medical-informatics"
            target="_blank"
            rel="noreferrer"
          >
            Department of Medical Informatics
          </a>{" "}
          for the{" "}
          <a href="https://etransafe.eu/" target="_blank" rel="noreferrer">
            eTransafe
          </a>{" "}
          project
        </div>
        <div className="about-sub-item">
          The translation strategy is based on the use of the Systematized
          Nomenclature of Medicine, Clinical Terms (SNOMED CT) as an
          intermediate ontology, where both preclinical and clinical terms are
          first mapped to SNOMED CT and the link between preclinical and
          clinical terms is sought using existing relations defined within
          SNOMED CT.
        </div>
        <div className="about-sub-item">
          The preclinical mappings to SNOMED CT were manually established and
          limited to terms used in eTransafe data sources and are available{" "}
          <a
            href="https://github.com/mi-erasmusmc/send-snomed-mappings"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          . For the mappings between MedDRA and SNOMED CT the Rosetta Stone
          relies on existing terminological resources which provide mappings
          between MedDRA and SNOMED CT, such as the Unified Medical Language
          System (UMLS), WEB-RADR and Athena. These three resources combined
          contain mappings for 12.715 out of 25.433 MedDRA Preferred Terms to
          SNOMED
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
            1 point for ignoring a finding site (organ) or abnormality
            associated with a 'clinical finding'
          </li>
          <li>1 point for ignoring an 'AND' mapping</li>
          <li>
            0.1 point for moving between MedDRA Preferred Term (PT) and MedDRA
            Low Level Term (LLT)
          </li>
          <li>
            0.1 point for using mappings between MedDRA and SNOMED in the
            opposite direction of which they were created.
          </li>
          <li>
            0.1 point for a non-exact (broad, narrow or related) mapping from
            preclinical to snomed.
          </li>
          <li>
            Negative scores are given to clinical terms that are mapped from an
            organ - finding combination but do not include the organ. For
            example the preclinical terms lip and abscess are mapped to
            'abscess' this mapping then receives a negative score. When mapping
            from MedDRA to a preclinical vocabulary negative scores are reserved
            when all we can provide is a finding site, e.g. HEAD as the result
            of Headache receives a score of -1
          </li>
        </div>
        <div className="about-sub-item">
          <b>The mapping seems wrong, can you fix it?</b>
        </div>
        <div className="about-sub-item">
          Mappings from preclinical terminologies to SNOMED have been manually
          created and are available on{" "}
          <a
            href="https://github.com/mi-erasmusmc/send-snomed-mappings"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          You can send an email to r.parry@erasmusmc.nl if you would like to
          contribute to the manual mappings. Mappings from MedDRA to SNOMED are
          sourced from UMLS, Athena and WEB-RADR. It is possible to recommend
          changes and new mappings through the{" "}
          <a
            href="https://www.meddra.org/mapping"
            target="_blank"
            rel="noreferrer"
          >
            MedDRA website
          </a>
          . The end to end mapping is the result of using the relations defined
          in SNOMED CT, if the traversal seems to contain errors or omissions
          please get in touch.
        </div>
        <div className="about-sub-item">
          <b>Can you send me a file with all the generated mappings?</b>
        </div>
        <div className="about-sub-item">
          We have for the time being opted to simply generate individual
          mappings though the algorithm on demand, this allows us the
          flexibility to deal with changes in the terminologies and improve the
          mapping algorithm without having to run all terms and combinations
          through the app on each update. Generating a list of all MedDRA PTs to
          the best results in a preclinical terminology is not much effort, if
          you ask politely we can send you one. Vice versa the amount of
          possible organ - finding combinations make this task a rather long
          running process. You can of course translate all terms and
          combinations which are relevant to you through the API or when running
          the app on your own machinery.
        </div>
        <div className="about-sub-item">
          <b>Is there an API?</b>
        </div>
        <div className="about-sub-item">
          We have basic{" "}
          <a
            href={base + "/swagger-ui/index.html#/"}
            rel="docs noreferrer"
            target="_blank"
          >
            API documentation
          </a>{" "}
          available for those who are interested in integrating the eTransafe
          Rosetta Stone into another app or generating a larger quantity of
          mappings. Besides terminology translation there are additional
          endpoints available to lookup, harmonize and expand terms.The publicly
          facing API has a rate limit of 100 requests per minute, and the expand
          endpoint has been disabled for the MedDRA hierarchy, because a MedDRA
          licence is required to obtain this information. If you have questions
          about the API or are interested in using it beyond the current
          restrictions feel free to get in touch. Alternatively you can install
          the eTransafe Rosetta Stone on your own machinery.
        </div>
        <div className="about-sub-item">
          <b>Can I run the eTransafe Rosetta Stone locally?</b>
        </div>
        <div>
          Yes. If you want to run your own copy of the eTransafe Rosetta Stone
          the source code is publicly available on{" "}
          <a
            href="https://github.com/mi-erasmusmc/ets-rosetta-stone"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          you may use it as you please.
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
          (December 2022)
        </div>
        <div className="about-sub-item">
          <a href="https://www.snomed.org/" target="_blank" rel="noreferrer">
            SNOMED CT
          </a>{" "}
          (November 2021)
        </div>
      </div>
      <hr />
      <h2>Licencing</h2>
      <div className="about-item">
        <div className="about-sub-item">
          The manual mappings as well as the generated mappings from the
          eTransafe Rosetta Stone are licensed under a{" "}
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            Creative Commons Attribution 4.0 International License
          </a>
          .
        </div>
        <div className="about-sub-item">
          "SNOMED" and "SNOMED CT" are registered trademarks of the IHTSDO. Use
          of SNOMED CT content is subject to the terms and conditions set forth
          in the SNOMED CT Affiliate License Agreement. It is the responsibility
          of those implementing this product to ensure that they are
          appropriately licensed. For more information on the license, including
          how to register as an Affiliate Licensee, please refer to{" "}
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
        <div className="about-sub-item">
          Users that are using the MedDRA hierarchy and/or MedDRA coding system
          are required to have a MedDRA licence. Most pharmaceutical companies
          have such a license. The license is free for academic institutions.
          For more details see{" "}
          <a
            href="https://www.meddra.org/subscription-rates"
            rel="noreferrer"
            target="_blank"
          >
            https://www.meddra.org/subscription-rates
          </a>
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
