import * as React from 'react';

export default class DragPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    component list
                    <div draggable>this component is draggable</div>
                </div>
                <div>drag area</div>
                <div>config area</div>
            </div>
        );
    }
}
