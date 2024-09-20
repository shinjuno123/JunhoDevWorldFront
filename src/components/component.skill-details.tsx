export function SkillDetails(details: { imageLink: string, skillName: string, description: string }) {
    return <>

        <div className="skill-details">
            <h3 className="skill-details__skillname">{details.skillName}</h3>
            <hr />
            <div className="skill-details__description-box">
                <img src={details.imageLink} alt={details.skillName} />
                <p className="skill-details__description" dangerouslySetInnerHTML={{__html: details.description}}></p>
            </div>
        </div>

    </>
}