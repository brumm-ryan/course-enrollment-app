import React from "react";
import "./App.css";

class StarRating extends React.Component {

  handleRating(rating) {
    // This function is called when a user clicks on a star.
    // It updates the rating of the course stored in App's state (completedCourses).

    this.props.setRating(this.props.data.number, rating);
  }

  getStars() {
    return Array.from({ length: 5 }).map((star, idx) => {

      let starGlyph = "★";

      if (idx + 1 > this.props.data.rating || !this.props.data.rating) {
        // If the star is not selected, or if there is no rating (rating === 0),
        // then use the empty star.

        starGlyph = "☆";
      }

      return (
        <button
          className="star"
          key={idx + 1}
          onClick={() => this.handleRating(idx + 1)}
        >
          {starGlyph}
        </button>
      );
    });
  }

  render() {
    return (
      <div className="mt-1">
        <p className="rating">
          Rating:{" "}
          {this.props.data.rating
            ? `${this.props.data.rating} stars`
            : `Not rated`}
        </p>
        {this.getStars()}
      </div>
    );
  }
}

export default StarRating;
