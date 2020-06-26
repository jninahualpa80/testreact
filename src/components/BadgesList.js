import React from "react";
import { Link } from "react-router-dom";

import "./styles/BadgesList.css";
import Gravatar from "./Gravatar";

function BadgesListItem(props) {
  return (
    <div className="BadgesListItem">
      {/* <Gravatar className="BadgesListItem__avatar" email={props.badge.email} /> */}
      <img src={props.badge.image} className="list__image--width" />
      <div>
        <strong>
          {props.badge.name} {props.badge.gender}
        </strong>
        <br />@{props.badge.species}
        <br />
        {props.badge.created}
      </div>
    </div>
  );
}

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");
  const [filteredBadges, SetfilteredBadges] = React.useState(badges);
  React.useMemo(() => {
    const result = badges.filter((badge) => {
      return `${badge.name}`.toLowerCase().includes(query.toLowerCase());
    });
    SetfilteredBadges(result);
  }, [badges, query]);
  return { query, setQuery, filteredBadges };
}

function BadgesList(props) {
  const badges = props.badges;
  //console.log(badges);

  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group mr-4">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control mb-2"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <h3>No badges were found</h3>

        <Link className="btn btn-primary" to="/badges/new">
          Create new badge
        </Link>
      </div>
    );
  }

  return (
    <div className="BadgesList">
      <div className="form-group mr-4">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control mb-2"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <div className="container">
        <ul className="row list-unstyled">
          {filteredBadges.map((badge) => {
            return (
              <li key={badge.id} className="col-12 col-md-3 ">
                <BadgesListItem badge={badge} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default BadgesList;
