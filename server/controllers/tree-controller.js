
const { response } = require('express');
const Tree = require('../models/tree-model');

getTrees =  async(req, res) => {
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
        console.log(`200 in 'getTreetitles'`, trees.map((c) => {return c.title}));
        return res.format({
            // Json format requests
            // test by: curl -X GET -H "Accept:application/json" http://localhost:3000/api/trees
            "application/json": () => {
              res.json({
                  succes: true,
                  items: trees
              });
            },
            // XML requests
            // test by running : // curl -X GET -H "Accept:application/xml" http://localhost:3000/api/trees
            "application/xml": () => {
              const zipXml = `
              <?xml version="1.0"?>
              ${trees.map((c) => `
            <trees>
                <treeId> ${c._id} </treeId>
                <title>${c.title}</title>
                <createdDate>${c.createdAt}</createdDate>
                <updatedDate>${c.updatedAt}</updatedDate>
            </trees>
                `)}
              `;
              res.type("application/xml");
              res.send(zipXml);
            }
        })
    });
};
getTreeById = async(req, res) => {
    await Tree.find({ _id: req.params.id }, (err, trees) => {
        if (err) {
            console.error(`400 in 'getTreeById': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!trees.length) {
            console.error(`404 in 'getTreeById': Item not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'Item not found',
                });
        }
        console.log(`200 in 'getTreeById': Item fetched!`);
        return res
            .status(200)
            .json({
                success: true,
                item: trees[0],
            });
    }).catch(err => {
        console.error(`caught error in 'getTreeById': ${err}`);
        console.error(err);
        return err;
    });
};
createTree = (req, res) => {
    const body = req.body;
    console.log('----------------------- createItem: req -----------------------')
    console.log(req);
    console.log('----------------------- createItem: body -----------------------')
    console.log(body);
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
        console.error(`400 in 'createTree': 'Tree' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'Tree' is malformed"
            });
    }

    return tree
        .save()
        .then((saved) => {
            console.log(saved);
            if (saved) {
                console.error(`201 in 'createTree': Tree created!`);
                return res
                    .status(201)
                    .json({
                        success: true,
                        id: tree._id,
                        message: 'Tree created!',
                    });
            };
        })
        .catch(err => {
            console.error(`caught error in 'createITree': ${err.errors.name}`);
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

    console.log("This is the body ---->", req.body)
    const body = req.body;
    // console.log('----------------------- updateItem: req -----------------------');
    // console.log(req);
    // console.log('----------------------- updateItem: body -----------------------');
    // console.log(body);
    if (!body) {
        console.error(` 400 in 'updateTree': You must provide an Tree to update.`);
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an item to update.',
            });
    }

    const treeForUpdate = {
        _id: req.params.id,
        title: body.title,
        children: body.children
    };

    // console.log('----------------------- updateItem: res -----------------------');
    // console.log(res);

    return Tree.updateOne({ _id: req.params.id }, treeForUpdate, (err, writeOpRes) => {
        console.log("This is the tree to be updated ->", req.params.id);
        if (err) {
            console.error(`'updateTree': Item not found!`);
            console.error(err);
            return res
                .status(404)
                .json({
                    success: false,
                    error: err,
                    message: 'Tree not found!',
                });
        };

        console.log('----------------------- updateItem: item -----------------------');
        console.log(writeOpRes);
        return writeOpRes;
    })
    .then(result => {
        console.log('----------------------- updateItem - findOne: result -----------------------');
        console.log(result);
        console.log('----------------------- updateItem - findOne: res -----------------------');
        console.log(res);
        console.log(` 200 in 'updateTree': Tree updated!`);
        return res
            .status(200)
            .json({
                success: true,
                id: req.params.id,
                message: 'Tree updated!',
                writeOpResult: result
            });
    }).catch(err => {
        console.error(`caught error in 'updateTree': ${err}`);
        console.error(err);
        return err;
    });
};
deleteTree = async (req, res) => {
    await Tree.findOneAndDelete({ _id: req.params.id }, (err, tree) => {
        if (err) {
            console.error(`400 in 'deleteTree': ${err}`);
            return res
                .status(400)
                .json({
                    succes: false,
                    error: err,
                });
        }

        if (!tree) {
            console.error(` 400 in 'deleteTree': Item not found!`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: 'Tree not found!',
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                item: tree,
            });
    }).catch(err => {
        console.error(`caught error in 'deleteTree': ${err}`);
        console.error(err);
        return err;
    });
};
module.exports = {
    getTrees,
    getTreeById,
    createTree,
    updateTree,
    deleteTree
};