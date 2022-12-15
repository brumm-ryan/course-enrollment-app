import React, { useCallback } from "react";
import "./App.css";
import Section from "./Section";
import App from "./App";
import StarRating from "./StarRating";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import { width } from "dom-helpers";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false, // whether the course is expanded (i.e. description is shown) or not
      showModal: false, // whether to display the modal that shows sections and subsection
    };
  }

  getSections() {
    // Maps the sections of the course to a list of Section components
    let sections = [];
    let course = this.props.courseKey;

    for (const section of Object.values(this.props.data.sections)) {
      sections.push(
        <Section
          key={section.number}
          data={section}
          courseKey={course}
          sectionKey={section.number}
        />
      );
    }

    return sections;
  }

  setExpanded(value) {
    // Sets the expanded state of the course
    this.setState({ expanded: value });
  }

  getCourseButton() {
    // Returns a button that adds/remove the course to/from the cart
    if (!this.props.cartCourses) return;

    let cartCourses = this.props.cartCourses;
    let course = this.props.data;

    let inCart = (cartCourses.some((c) => c.number === course.number))
    let buttonText = inCart ? "Remove Course" : "Add Course";

    const handleClick = event => {
      if (cartCourses.some((c) => c.number === course.number)) {
        event.currentTarget.style.backgroundColor = '#0d6efd';
        this.removeCourse(course);
      } else {
        event.currentTarget.style.backgroundColor = "red"
        this.addCourse(course);
      }
    };


    return (
      <div>
        {this.getGoToCartButton()}
      <Button onClick={handleClick}>
        {buttonText}
      </Button>
      </div>
    );
  }

  getGoToCartButton() {
    let cartCourses = this.props.cartCourses;
    let course = this.props.data;

    if (cartCourses.some((c) => c.number === course.number)) {
      return(
        <Button style={{fill:"#baf1f5"}} onClick={this.props.cartCallback}>Go To Cart</Button>
      )
    } else {
      return;
    }

  }

  getExpansionButton() {
    // Returns a button that expands/collapses the course description
    let buttonText = this.state.expanded ?  "▲" :  "▼";
    let buttonOnClick = () => this.setExpanded(!this.state.expanded);

    return (
      <Button
        style={{fill:"#baf1f5"}}
        onClick={buttonOnClick}
      >
        {buttonText}
      </Button>
    );
  }

  addCourse = () => {
    // Adds the course to the cart
    this.props.addCartCourse(this.props.data);
  };

  removeCourse(course) {
    // Removes the course from the cart
    this.props.removeCartCourse(course);
  }

  getRequisites() {
    // Returns the requisites of the course as a formatted string
    let requisites = this.props.data.requisites;
    let reqList = [];
    let reqString = "";

    if (requisites.length > 0) {
      requisites.forEach((req) => {
        reqList.push("(" + req.join(" OR ") + ")");
      });
    } else {
      reqList.push("None");
    }
    reqString = reqList.join(" AND ");

    return reqString;
  }

  getKeywords() {
    // Returns the keywords of the course as a formatted string
    return this.props.data.keywords.join(", ");
  }

  showStarRating() {
    // Shows the star rating if it's under Completed Courses tab
    if (this.props.ratingMode === true) {
      return (
        <StarRating data={this.props.data} setRating={this.props.setRating} />
      );
    }
  }

  render() {
    let course = this.props.data.number;
    let name = this.props.data.name;
    let credits = this.props.data.credits;
    let description = this.props.data.description;

    return (
      <Card style={{marginBottom: 15, maxWidth: 800}}>
        <Card.Title className="d-flex justify-content-between">
          {name} 
          <div>
            {this.getCourseButton()}
            {this.getExpansionButton()}
          </div>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {course} · {credits + " Credits"}
        </Card.Subtitle>

        {this.state.expanded && <p>{description}</p>}

        {!this.props.compactView && (
          <>
            <span><strong>Requisites: </strong> {this.getRequisites()}</span>
            <span>
              <u>Keywords:</u> {this.getKeywords()}
            </span>
          </>
        )}

        {/* Completed courses do not have sections/subsections */}
        {!this.props.ratingMode && (
          <Button backgroundColor={"#baf1f5"} onClick={() => this.props.selectCourse(this.props.data.sections)}>
            View sections and subsections
          </Button>
        )}

        {/* Star ratings are only shown when it's rendered under Completed Courses tab */}
        {this.showStarRating()}

      </Card>
    );
  }
}

export default Course;
