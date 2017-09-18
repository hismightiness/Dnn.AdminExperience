import React, { Component } from "react";
import GridCell from "dnn-grid-cell";
import { PropTypes } from "prop-types";
import { DragSource } from 'react-dnd';


import "./styles.less";

import PersonaBarPageIcon from "./_PersonaBarPageIcon";
import PersonaBarSelectionArrow from "./_PersonaBarSelectionArrow";
import PersonaBarExpandCollapseIcon from "./_PersonaBarExpandCollapseIcon";
import PersonaBarDraftPencilIcon from "./_PersonaBarDraftPencilIcon";

export class PersonaBarPageTreeMenu extends Component {

    constructor() {
        super();
        this.state = {};
    }



    render_tree(childListItems) {
        return (
            <PersonaBarPageTreeMenu
                onAddPage={this.props.onAddPage}
                onViewPage={this.props.onViewPage}
                onViewEditPage={this.props.onViewEditPage}
                onDuplicatePage={this.props.onDuplicatePage}
                listItems={childListItems}
                _traverse={this.props._traverse}
                pageInContextComponents={this.props.pageInContextComponents}
            />
        );
    }


    render_parentExpandIcon(item) {
        return (
            <PersonaBarExpandCollapseIcon isOpen={item.isOpen} item={item} />
        );
    }

    render_parentExpandButton(item) {
        return (
            <div className="parent-expand-button" style={{ visibility: "hidden" }}>
                {item.childCount > 0 ? this.render_parentExpandIcon(item) : <div className="parent-expand-icon"></div>}
            </div>
        );
    }


    render_li() {
        const { listItems, _traverse } = this.props;

        return listItems.map((item) => {
            return (
                <li className="list-item-menu">
                    <div
                        className={(item.selected) ? "list-item-highlight" : null}
                        style={{ height: "28px" }}>
                        <div className="draft-pencil">
                            <PersonaBarSelectionArrow
                                onAddPage={this.props.onAddPage}
                                onViewPage={this.props.onViewPage}
                                onViewEditPage={this.props.onViewEditPage}
                                onDuplicatePage={this.props.onDuplicatePage}
                                item={item}
                                pageInContextComponents={this.props.pageInContextComponents}
                                _traverse={_traverse} />
                        </div>
                    </div>
                    {item.childListItems && item.isOpen ? this.render_tree(item.childListItems) : null}
                </li>
            );
        });
    }

    render() {

        return (
            <ul className="dnn-persona-bar-treeview-menu dnn-persona-bar-treeview-ul">
                {this.render_li()}
            </ul>
        );
    }

}

PersonaBarPageTreeMenu.propTypes = {
    onAddPage: PropTypes.func.isRequired,
    onViewPage: PropTypes.func.isRequired,
    onViewEditPage: PropTypes.func.isRequired,
    onDuplicatePage: PropTypes.func.isRequired,
    _traverse: PropTypes.func.isRequired,
    listItems: PropTypes.array.isRequired,
    pageInContextComponents: PropTypes.array.isRequired
};