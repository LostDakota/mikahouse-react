import React from "react";

const title = "Who's Home";

let buildPeopleCards = people => {
    return people.map((user, i) => {
        return (
            <div key={i} className="col-4">
                <div className="card">
                    <img alt={user.name} src={`/images/${user.name.toLowerCase()}.webp`} />
                    <p className="t-small t-muted t-center m-5-t">{user.name} - {user.status}</p>
                </div>
            </div>
        )
    })
}

const People = props => {
    return (
        <div className="col-12-xs col-6-sm col-6-md col-6-lg">
            <p className="t-center t-bold">{title}</p>
            {buildPeopleCards(props.people)}
        </div>
    )
}

export default People;