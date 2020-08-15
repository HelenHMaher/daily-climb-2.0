import React from "react";
import { StyledAddClimb } from "./AddClimb.styled";

function AddClimb() {
  return (
    <StyledAddClimb>
      <h2>Current Session</h2>
      {/*Display Basic Session Info*/}

      <h3>Add Climb</h3>
      <form id="NewClimb">
        <input type="text" id="rating" name="rating" placeholder="Rating" />

        <input type="radio" id="boulder" name="climbType" value="boulder" />
        <label for="boulder">Boulder Problem</label>
        <input type="radio" id="topRope" name="climbType" value="topRope" />
        <label for="topRope">Top Rope</label>
        <input type="radio" id="lead" name="climbType" value="lead" />
        <label for="leadSport">Lead Sport</label>
        <input type="radio" id="leadTrad" name="climbType" value="leadTrad" />
        <label for="leadTrad">Lead Trad</label>

        <input type="textarea" id="notes" name="notes" placeholder="notes" />

        <button type="submit" value="Submit" id="newClimb">
          Submit
        </button>
      </form>

      <h2>Climbs</h2>
      {/*Display Climbs*/}

      <h3>Change Session Details</h3>
      <form id="EditSessionForm">
        <input type="date" id="date" />
        <input type="text" id="location" placeholder="Location" />
        <input type="radio" id="indoor" name="indoorOutdoor" value="indoor" />
        <label for="indoor">Indoor</label>
        <input type="radio" id="outdoor" name="indoorOutdoor" value="outdoor" />
        <label for="outdoor">Outdoor</label>

        <button type="submit" value="Submit" id="newClimb">
          Submit Changes
        </button>
      </form>
    </StyledAddClimb>
  );
}

export default AddClimb;
