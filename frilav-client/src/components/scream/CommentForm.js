import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Material-ui stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//Redux staff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = {
      primary: {
        light: '#33c9dc',
        main: '#00bcd4',
        dark: '#008394',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff6333',
        main: '#ff3d00',
        dark: '#b22a00',
        contrastText: '#fff'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    }
}

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState ({ body: '' });
        }
    }

    handleChange = (event) => {
        this.setState ({ [event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body:this.state.body });
    }

    render() {
        const { classes, authenticated } = this.props
        const errors = this.state.errors;

        const CommentFormMarkup = authenticated ? (
            <Grid item sm = {12} style = {{textAlign: 'center'}}>
                <form onSubmit = {this.handleSubmit}>
                    <TextField
                        name = "body"
                        type = "text"
                        label = "Comment"
                        error = {errors.comment ? true : false}
                        helperText = {errors.comment}
                        value = {this.state.body}
                        onChange = {this.handleChange}
                        fullWidth
                        className = {classes.textField}
                        />
                        <Button type = "submit"
                        variant = "container" 
                        color = "primary"
                        className = {classes.button}>
                            Submit
                        </Button>
                </form>
                <hr className = {classes.visibleSeparator}/>
            </Grid>
        ) : null
        return CommentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect (mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))
