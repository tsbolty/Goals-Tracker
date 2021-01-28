import React, { Component } from 'react';

// Import components
import Widget from '../Widget';
import ListDisplay from '../ListDisplay';
import ListItem from '../ListItem';

// Import styling
import './index.css';

class ListWidget extends Component {
    //Sort items in descending order
    sortListItems() {
      if(this.props.listItems){
        let sortedItems = this.props.listItems.slice();
        return sortedItems.sort((a, b) => {
            if (a.value > b.value) {
                return -1;
            } else if (a.value < b.value) {
                return 1;
            }
            return 0;
        });
      }
    }

    // Decide whether to show widget
    showWidget() {
        let sortedItems = this.sortListItems();

        // Show loading indicator while initial data is being fetched
        if (this.props.listItems && this.props.listItems.length === 0) {
            return null;
        }

        // Get min/max values for progress bar
        let min = 0;
        let max = sortedItems && sortedItems[0].value;

        return (
            <ListDisplay>
                {/* Add a ListItem for each piece of data */}
                {sortedItems.map((item, index) => <ListItem key={item.label} label={item.label} value={item.value} min={min} max={max} />)}
            </ListDisplay>
        );
    }

    render() {
        return (
            // Wrap the list display component in the generic wrapper
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} loading={this.props.loading} >
                <div className="ListWidget">
                    {/* Conditionally show the widget */}
                    {this.showWidget()}
                </div>
            </Widget>
        );
    }
}

export default ListWidget;