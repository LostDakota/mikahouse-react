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
        <div className="col-12-xs col-6-sm col-6-md col-4-lg">
            <div className="row">
                <div className="col-12">
                    <p className="t-center t-bold">{title}</p>
                </div>
            </div>
            <div className="row">
                {buildPeopleCards(props.people)}
            </div>
        </div>
    )
}

export default People;