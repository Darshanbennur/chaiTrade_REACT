const Chart = require('../models/Chart.js');

const getAllCharts = async (req, res, next) => {
    try {
        const allCharts = await Chart.aggregate([
            {
                $group: {
                    _id: '$type',
                    charts: { $push: '$$ROOT' }
                }
            }
        ]);

        const categorizedCharts = {
            companyStock: [],
            commodityStock: [],
            forexStock: [],
            cryptoStock: []
        };

        allCharts.forEach(chartGroup => {
            switch (chartGroup._id) {
                case 'Company':
                    categorizedCharts.companyStock = chartGroup.charts;
                    break;
                case 'Commodity':
                    categorizedCharts.commodityStock = chartGroup.charts;
                    break;
                case 'Forex':
                    categorizedCharts.forexStock = chartGroup.charts;
                    break;
                case 'Crypto':
                    categorizedCharts.cryptoStock = chartGroup.charts;
                    break;
                default:
                    break;
            }
        });

        res.status(200).
            json({
                ...categorizedCharts,
                custom: 'Successfully fetched all the chart data'
            });
    }
    catch (err) {
        console.log('Error in fetching Charts:', err);
        res.status(500)
            .json({
                error: 'Failed to fetch chart data'
            });
    }
};

const updateCharts = async (req, res, next) => {
    try {
        const allCharts = await Chart.find();

        allCharts.forEach(async (chart) => {
            // Calculate the percentage range for change
            const changePercentage = Math.floor(Math.random() * 3) + 1;;
            const changeRange = chart.chart_ltp * (changePercentage / 100);

            const change = Math.random() * (2 * changeRange) - changeRange;

            // Update chart_ltp with +/- change
            chart.chart_ltp = parseFloat((chart.chart_ltp + change).toFixed(2));

            // Calculate chart_change
            const previousLtp = chart.chart_ltp - change;
            chart.chart_change = parseFloat((chart.chart_ltp - previousLtp).toFixed(2));

            // Update chart_percentage
            chart.chart_percentage = parseFloat(((chart.chart_change / previousLtp) * 100).toFixed(2));

            // Save the updated chart data
            await chart.save();
        });

        res.status(200).json({
            message: 'Successfully updated all chart data'
        });
    } catch (err) {
        console.log('Error in updating Charts:', err);
        res.status(500).json({
            error: 'Failed to update chart data'
        });
    }
};

module.exports = { updateCharts };



module.exports = { getAllCharts, updateCharts }