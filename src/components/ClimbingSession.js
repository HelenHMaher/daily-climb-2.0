import React from "react";

function ClimbingSession() {
  return (
    <div>
      <h2>Log a Climbing Session</h2>

      <form id="newSessionForm">
        <input type="date" name="date" id="date" />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Location"
        />
        <input type="radio" id="indoor" name="indoorOutdoor" value="indoor" />
        <label for="indoor">Indoor</label>
        <input type="radio" id="outdoor" name="indoorOutdoor" value="outdoor" />
        <label for="outdoor">Outdoor</label>

        <button type="submit" value="Submit" id="newClimb">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ClimbingSession;
