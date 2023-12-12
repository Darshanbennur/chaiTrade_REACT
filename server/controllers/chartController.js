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


module.exports = { getAllCharts }