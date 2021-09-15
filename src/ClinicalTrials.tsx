import styled from "styled-components";
import React, { Fragment, useCallback } from "react";

import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import { PatientsSortDirection } from "./App";
import {CountrySortDirection } from "./App";

const Table = styled.div`
  border-collapse: separate;
  border-spacing: 0px 8px;
  display: table;
`;

const Header = styled.div`
  display: table-header-group;
`;

const Body = styled.div`
  display: table-row-group;
`;

const Row = styled.div`
  display: table-row;
`;

const HeaderCell = styled.div`
  display: table-cell;
  padding: 8px 32px;
  border-radius: 4px;
`;

const ClickableHeaderCell = styled(HeaderCell)`
  cursor: pointer;
  &:hover {
    background-color: #b5b6ba;
  }
`;

const Cell = styled.div`
  --border-color: #eaedf1;
  display: table-cell;
  vertical-align: middle;
  padding: 16px 32px;
  background: #ffffff;
  border-width: 1px;
  border-style: solid none;
  border-color: var(--border-color);

  &:first-child {
    border-left: 1px solid var(--border-color);
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-right: 1px solid var(--border-color);
    border-radius: 0 4px 4px 0;
  }
`;

interface Props {
  clinicalTrials: AppQueryResponse["clinicalTrials"];
  patientsSortDirection: PatientsSortDirection;
  countrySortDirection : CountrySortDirection ;
  search : string;
  setPatientsSortDirection: (
    patientsSortDirection: PatientsSortDirection

  
  ) => void;

  setCountrySortDirection: (
    countrySortDirection: CountrySortDirection

  
  ) => void;

  setSearch: (
    search: string

  ) => void;
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  countrySortDirection,
  setCountrySortDirection,
  search,
  setSearch

}: Props) => {
  const togglePatientsSortDirection = useCallback(() => {
    if (patientsSortDirection == null ) {
      //to not link the patient with the county in the up and down direction when clicking on the flech so we put null for setCoutrydirection in the asc & desc 
      setPatientsSortDirection("asc");
      setCountrySortDirection(null);
    } else if (patientsSortDirection === "asc") {

      setPatientsSortDirection("desc");
      setCountrySortDirection(null);

    } else {
      setPatientsSortDirection(null);
    }
  }, [patientsSortDirection, setPatientsSortDirection]);

// Sorting by country 
  const toggleCountrySortDirection = useCallback(() => {
 //to not link the patient with the county in the up and down direction when clicking on the flech so we put null for setCoutryPatient in the asc & desc 

    if (countrySortDirection == null ) {

      setCountrySortDirection("asc");
      setPatientsSortDirection(null);

    } else if (countrySortDirection === "asc" ) {
      setCountrySortDirection("desc");
      setPatientsSortDirection(null);

    } else {
      setCountrySortDirection(null);
    }
  }, [countrySortDirection, setCountrySortDirection]);



  
  return (
    <Fragment>

      <h1>Clinical trials</h1>
      <input type ="text" value ={search} placeholder="Search Country" className = "prompt" onChange={(event)=>
              setSearch(event.target.value)
            }/>
     {console.log(search )}
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
          <ClickableHeaderCell onClick ={toggleCountrySortDirection}>country{sortDirectionIndicatorCountry(countrySortDirection)}</ClickableHeaderCell>
          <HeaderCell>city</HeaderCell>

          <ClickableHeaderCell onClick={togglePatientsSortDirection}>
            patients{sortDirectionIndicatorPatient(patientsSortDirection)}
          </ClickableHeaderCell>
        </Header>
        <Body>
          {clinicalTrials.map(clinicalTrial => (
            <Row key={clinicalTrial.site}>
              <Cell>{clinicalTrial.site}</Cell>
              <Cell>{clinicalTrial.country}</Cell>
              <Cell>{clinicalTrial.city.charAt(0).toUpperCase() + clinicalTrial.city.slice(1)}</Cell>
              <Cell>{clinicalTrial.patients}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Fragment>
  );
};

const sortDirectionIndicatorPatient = (
  patientsSortDirection: PatientsSortDirection,
) => {
  if (patientsSortDirection === "asc" ) return "↑";
  if (patientsSortDirection === "desc") return "↓";
  return "";
};


const sortDirectionIndicatorCountry = (
  
  countrySortDirection :CountrySortDirection
) => {
  if (countrySortDirection ==="asc" ) return "↑";
  if (countrySortDirection ==="desc" ) return "↓";
  return "";
};
export default ClinicalTrials;
