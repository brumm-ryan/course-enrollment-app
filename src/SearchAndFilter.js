class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    if (search !== "") {
      var coursesAfterSearch = [];

      // Filter the courses by the search string
      for (const course of Object.values(courses)) {
        if (
          course.description
            .toLowerCase()
            .includes(search.toLowerCase().trim()) ||
          course.name.toLowerCase().includes(search.toLowerCase().trim())
        ) {
          coursesAfterSearch.push(course);
        }
      }

      courses = coursesAfterSearch;
    }

    // Filter the courses by the subject
    if (subject !== "All") {
      var coursesAfterSubject = [];

      for (const course of Object.values(courses)) {
        if (course.subject === subject) {
          coursesAfterSubject.push(course);
        }
      }
      courses = coursesAfterSubject;
    }

    // Filter the courses by the credits
    if (minimumCredits !== "") {
      var coursesAfterMinimumCredits = [];

      for (const course of Object.values(courses)) {
        if (course.credits >= parseInt(minimumCredits, 10))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }
    if (maximumCredits !== "") {
      var coursesAfterMaximumCredits = [];

      for (const course of Object.values(courses)) {
        if (course.credits <= parseInt(maximumCredits, 10))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    return courses;
  }
}

export default SearchAndFilter;
