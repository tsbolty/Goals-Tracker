import React, { Component } from 'react';
import Widget from '../Widget/index';
import { Line } from 'react-chartjs-2';
import './index.css';

class GraphWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                labels: ["???", "???", "???", "???", "???", "???", "???"],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scaleShowGridLines: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontFamily: "'Didact Gothic', sans-serif",
                            fontSize: 18,
                            fontColor: "#ecf0f1",
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "'Didact Gothic', sans-serif",
                            fontSize: 18,
                            fontColor: "#ecf0f1",
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        }
    }

    // Update the state based on changing props
    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.generateDatasets(nextProps);
        }
    }

   
    generateDatasets(props) {
        let datasets = [];

       
        props.data.forEach(function (data) {
            datasets.push({
                label: data.label,
                data: data.data,
                fill: false,
                tension: 0,
                borderColor: data.color,
                borderWidth: 8,
                pointRadius: 0,
                pointHitRadius: 10
            });
        }, this);

       
        this.setState({
            values: {
                datasets
            }
        });
    }

    render() {
        return (
            // Wrap the graphing component in the generic wrapper
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} loading={this.props.loading}>
                <div className="GraphWidget">
                    <Line data={this.state.values} options={this.state.chartOptions} />
                </div>
            </Widget>
        );
    }
}

export default GraphWidget;