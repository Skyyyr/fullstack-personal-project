/**
 * This component is used for both sign-up and login pages.
 * It doesn't provide the buttons, but just the form for the user to fill out.
 * @returns {JSX.Element}
 * @constructor
 */
function LoginCredentialForm() {
    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-12'}>
                    <hr/>
                    <div className={'row'}>
                        <div className={'col-4'}>
                            Email:
                        </div>
                        <div className={'col-8'}>
                            <input id={'email-form'} type={'email'}/>
                        </div>
                    </div>
                </div>
                <div className={'col-12'}>
                    <hr/>
                    <div className={'row'}>
                        <div className={'col-4'}>
                            Password:
                        </div>
                        <div className={'col-8'}>
                            <input id={'password-form'} type={'password'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginCredentialForm