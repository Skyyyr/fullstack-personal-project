function AboutMe(props) {



    return (
        <div>
            <h1>
                Welcome to your profile: {props.user.username}
            </h1>
        </div>
    )
}

export default AboutMe