/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        const mvp_multiplied = MatrixMult(mvp, this.trs.getTransformationMatrix());

        const mv_multiplied = MatrixMult(modelView, this.trs.getTransformationMatrix());

        const normal_multiplied = MatrixMult(normalMatrix, this.trs.getTransformationMatrix());
        
        const mm_multiplied = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(mvp_multiplied, mv_multiplied, normal_multiplied, mm_multiplied);
        }

        this.children.forEach(child => {
            child.draw(mvp_multiplied, mv_multiplied, normal_multiplied, mm_multiplied);
        });    
    }
}