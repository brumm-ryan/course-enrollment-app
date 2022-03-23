import React from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";
import Section from "./Section";
import SearchAndFilter from "./SearchAndFilter";

class SectionSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  getSections() {
    // Maps the sections of the course to a list of Section components
    let sections = [];
    console.log(this.props.sections);
    for (const section of Object.values(this.props.sections)) {
      sections.push(
        <Section
          key={section.number}
          data={section}
          sectionKey={section.number}
        />
      );
    }

    return sections;
  }

  componentDidMount() {
     this.buildAccord(); 
  }

  componentDidUpdate() {
      this.buildAccord();
  }

  buildAccord() {
    if (typeof this.props.sections !== 'undefined') {
          return (
            <Accordion defaultActiveKey={1}>
            {this.getSections()}
          </Accordion>
          )
      } else {
          return;
      }
  }


  render() {
    return (
      <Card className="sidebarRight">
        <Card.Body>
          <Card.Title><h3>Subsections</h3></Card.Title>
          <div id="accord">{this.buildAccord()}</div>
        </Card.Body>
      </Card>
    );
  }
}

export default SectionSidebar;
