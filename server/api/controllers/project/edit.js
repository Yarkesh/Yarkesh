const Projects = require('../../models/projects');
const config = require('config');
const path = require('path');
const Resize = require('../image/Resize');


module.exports.editProject = (req, res) => {
    const imagePath = path.join(__dirname, '../../../pictures/projects');
    const info = `${req.body.projectId}__${req.body.title}.jpg`;
    const fileUpload = new Resize(imagePath, info);
    let imageUrl = config.get('app.webServer.baseUrl') + '/pictures/projects/' + req.body.projectId + '__' + req.body.title + '.jpg';
    Projects.update({
            title: req.body.title,
            description: req.body.description,
            sprintDuration: req.body.sprintDuration,
            logo: imageUrl
        }, {
            where: {
                projectId: req.body.projectId
            }
        }).then(async () => {

            if (req.file) {
                const filename = await fileUpload.save(req.file.buffer);
                imageUrl

            }
            return res.status(200).json({
                title: req.body.title,
                description: req.body.description,
                sprintDuration: req.body.sprintDuration,
                imageUrl
            })
        })
        .catch(err => {
            return res.status(500).json({
                editProjectError: err
            })
        })
}




// module.exports.setActiveSprint = (req, res) => {
//     Sprints.findOne({
//         where: {
//             sprintId: req.body.activeSprint,
//             projectId: req.body.projectId
//         }
//     }).then((sprint) => {
//         if (sprint) {
//             Projects.update(
//                 {
//                     activeSprint: req.body.activeSprint
//                 },
//                 {
//                     where: {
//                         projectId: req.body.projectId
//                     }
//                 }
//             )
//                 .then((updated) => {
//                     return res.status(200).json({
//                         updated
//                     });
//                 })
//                 .catch((err) => {
//                     return res.status(500).json({
//                         message: 'cant change activesprint',
//                         err
//                     });
//                 });
//         } else {
//             return res.status(500).json({
//                 message: 'sprint not found'
//             });
//         }
//     });
// };