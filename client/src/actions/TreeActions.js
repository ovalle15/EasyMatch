import api from '../api';

export const fetchAllTrees = () => {
    return api.getAllItrees();
};


export const fetchSingleTree = () => {
    return api.getTreeById();
};

export const insertSingleTree = () => {
    return api.insertTree();
};

export const updateSingleTree = tree => {
    return api.updateTreeById(tree._id, tree);
};

export const deleteSingleTree = treeId => {
    return api.deleteTreeById(treeId);
}