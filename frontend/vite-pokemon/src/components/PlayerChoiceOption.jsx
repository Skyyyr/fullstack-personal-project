function PlayerChoiceOption(props) {

    console.log(props.option.id, props.option.text)

    return (
        <div>
            <div className='col-12 menu-section'>
                <button onClick={() => props.clickFunction(props.option.id, props.id)} className={'menu-option'}>
                    {props.option.text}
                </button>
            </div>
        </div>
    )
}

export default PlayerChoiceOption