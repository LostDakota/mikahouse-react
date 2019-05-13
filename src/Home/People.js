import React from "react";

const title = "Who's Home";

let buildPeopleCards = people => {
    return people.map((user, i) => {
        return (
            <div key={i}>
                <img id={`person-${i}`} className="people-avatar" alt={user.name} src={`/images/${user.name.toLowerCase()}.webp`} />
                <p className="t-small t-muted t-center m-5-t normal-line-height">{user.name} - {user.status}</p>
            </div>
        )
    })
}

const People = props => {
    return (
        <div className="card">
            <div className="content grid-three">
                <p className="t-center t-bold title-item m-5-b">{title}</p>
                {buildPeopleCards(props.people)}                
            </div>                        
        </div>
    )
}

export default People;