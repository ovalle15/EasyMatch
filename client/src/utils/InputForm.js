import React from 'react';


class InputForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: ''};

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        }
        handleChange(event) {
            this.setState({value:event.target.value});
        };
        handleSubmit(event) {
            alert("something was submitted" + this.state.value);
            event.preventDefault();
        };

        main () {
            let out = (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={this.state.value} onchange={this.handleChange}/>
                    </label>
                </form>

            )
            this.emit("main", out)
        }
}

export default InputForm;