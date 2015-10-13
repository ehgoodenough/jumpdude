var React = require("react")

var ForEachView = React.createClass({
    render: function() {
        var renderings = new Array()
        for(var key in this.props.data) {
            renderings.push(
                <this.props.view key={key}
                    data={this.props.data[key]}/>
            )
        }
        return (
            <div>
                {renderings}
            </div>
        )
    }
})

module.exports = ForEachView
