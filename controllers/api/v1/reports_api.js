const Report = require('../../../models/report');

module.exports.reportStatus = async function (req, res) {
    const Status = req.params.status;

    try {
        //getting reports for perticular status and populating the Patients of those reports
        let reports = await Report.find({"status": Status })
                                  .populate('Patient');

        if (reports.length == 0) {
            return res.status(200).json({
                "message": "No reports found with such Status"
            });
        } else {
            return res.status(200).json(reports);
        }
    } catch (err) {
        if (err) {
            return res.status(500).json({
                "message": "Internal Server error"
            });
        }
    }
}