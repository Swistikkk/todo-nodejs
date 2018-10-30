import React from 'react';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography";

export default class TodoItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isChecked: false
        }
    }

    onClickItem() {
        const { id } = this.props;
        this.props.delete(id);

        this.setState({
            isChecked: !this.state.isChecked
        })
    }

    render() {
        const { todo, id } = this.props;
        const { isChecked } = this.state;

        return <ListItem onClick={() => this.onClickItem()}>
            <Checkbox
                checked={isChecked}
                tabIndex={-1}
                disableRipple
            />
            <ListItemText
                classes={{ text: { textDecoration: 'overline' }}}
                primary={<Typography type="body2" style={{ textDecoration: isChecked ? 'line-through' : 'inherit' }}>{todo}</Typography>}
                disableTypography
            />
        </ListItem>
    }
}