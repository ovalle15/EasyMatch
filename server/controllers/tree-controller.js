const { response } = require('express');
const Tree = require('../models/tree-model');

getTree = async(req, res) => {
    await Tree.find({}, (err, trees) => {
        if (err) {
            console.error(`400 in 'getTree': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!trees.length) {
            console.error(`404 in 'getTrees': Items not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Items not found',
                });
        }
        console.log(`200 in 'getTree': Items fetched!`);
        return res
            .status(200)
            .json({
                success: true,
                items: trees,
            });
    }).catch(err => {
        console.error(`caught error in 'getTree': ${err}`);
        console.error(err);
        return res
            .status(404)
            .json({
                success: false,
                error: err
            });
    });
};
getTreeById = async(req, res) => {
    await Tree.find({ _id: req.params.id }, (err, trees) => {
        if (err) {
            console.error(`[Hack.Diversity React Template] - 400 in 'getTreeById': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!trees.length) {
            console.error(`[Hack.Diversity React Template] - 404 in 'getTreeById': Item not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Item not found',
                });
        }
        console.log(`[Hack.Diversity React Template] - 200 in 'getTreeById': Item fetched!`);
        return res
            .status(200)
            .json({
                success: true,
                item: trees[0],
            });
    }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'getTreeById': ${err}`);
        console.error(err);
        return err;
    });
};
createTree = (req, res) => {
    const body = req.body;
    // console.log('----------------------- createItem: req -----------------------')
    // console.log(req);
    // console.log('----------------------- createItem: body -----------------------')
    // console.log(body);

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item.',
            });
    }

    const tree = new Tree(body);

    if (!tree) {
        console.error(`[Hack.Diversity React Template] - 400 in 'createItem': 'item' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'item' is malformed"
            });
    }

    return tree
        .save()
        .then(() => {
            console.error(`[Hack.Diversity React Template] - 201 in 'createItem': Item created!`);
            return res
                .status(201)
                .json({
                    success: true,
                    id: tree._id,
                    message: 'Item created!',
                });
        })
        .catch(err => {
            console.error(`[Hack.Diversity React Template] - caught error in 'createItem': ${err.errors.name}`);
            Object.keys(err.errors).forEach(errorKey => {
                console.error(`ERROR for: ${errorKey}`);
                console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
            })
            return res
                .status(400)
                .json({
                    success: false,
                    error: err.errors,
                    message: err.errors.name,
                });
        });
};
updateTree = (req, res) => {
    const body = req.body;
    // console.log('----------------------- updateItem: req -----------------------');
    // console.log(req);
    // console.log('----------------------- updateItem: body -----------------------');
    // console.log(body);
    if (!body) {
        console.error(`[Hack.Diversity React Template] - 400 in 'updateItem': You must provide an item to update.`);
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item to update.',
            });
    }

    const treeForUpdate = {
        _id: req.params.id,
        name: body.name,
        daysOfWeek: body.daysOfWeek,
        timeframeNote: body.timeframeNote,
        priority: body.priority,
        content: body.content,
    };

    // console.log('----------------------- updateItem: res -----------------------');
    // console.log(res);

    return Tree.updateOne({ _id: req.params.id }, treeForUpdate, (err, writeOpRes) => {
        if (err) {
            console.error(`[Hack.Diversity React Template] - 404 in 'updateItem': Item not found!`);
            console.error(err);
            return res
                .status(404)
                .json({
                    success: false,
                    error: err,
                    message: 'Item not found!',
                });
        }
        // TODO: make this neater
        // console.log('----------------------- updateItem: item -----------------------');
        // console.log(item);
        return writeOpRes;
    })
    .then(res => {
        // console.log('----------------------- updateItem - findOne: res -----------------------');
        // console.log(res);
        console.log(`[Hack.Diversity React Template] - 200 in 'updateItem': Item updated!`);
        return res
            .status(200)
            .json({
                success: true,
                id: req.params.id,
                message: 'Item updated!',
                writeOpResult: res
            });
    }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'updateItem': ${err}`);
        console.error(err);
        return err;
    });
};
deleteTree = async (req, res) => {
    await Tree.findOneAndDelete({ _id: req.params.id }, (err, tree) => {
        if (err) {
            console.error(`[Hack.Diversity React Template] - 400 in 'deleteItem': ${err}`);
            return res
                .status(400)
                .json({
                    succes: false,
                    error: err,
                });
        }

        if (!tree) {
            console.error(`[Hack.Diversity React Template] - 400 in 'deleteItem': Item not found!`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: 'Item not found!',
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                item: tree,
            });
    }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'deleteItem': ${err}`);
        console.error(err);
        return err;
    });
};
module.exports = {
    getTree,
    getTreeById,
    createTree,
    updateTree,
    deleteTree,
};