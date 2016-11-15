import React, { PropTypes, Component } from "react";
import GridCell from "dnn-grid-cell";
import GridSystem from "dnn-grid-system";
import DropdownWithError from "dnn-dropdown-with-error";
import Switch from "dnn-switch";
import FolderDropdown from "../common/FolderDropdown";
import { validationMapNewModule, valueMapNewModule } from "../common/helperFunctions";
import Button from "dnn-button";
import Localization from "localization";
import styles from "./style.less";

const dropdownStyle = { width: "100%", marginBottom: 64 };
function getValidateRequired(key) {
    switch (key) {
        case "moduleFolder":
        case "fileName":
            return true;
        default:
            return false;
    }
}

const emptyNewModule = {
    type: 2,
    moduleFolder: "",
    ownerFolder: "",
    addPage: true,
    fileName: "",
    moduleName: "",
    description: ""
};

class FromManifest extends Component {
    constructor() {
        super();
        this.state = {
            newModule: validationMapNewModule(emptyNewModule, getValidateRequired),
            triedToSave: false
        };
    }

    componentWillReceiveProps(props) {
        if (props.moduleFiles.length > 0) {
            let { newModule } = this.state;
            newModule.fileName.value = props.moduleFiles[0].value;
            newModule.fileName.error = false;

            this.setState({
                newModule
            });
        }
    }

    onFolderSelect(key, option) {
        const { props, state } = this;
        let {newModule, triedToSave} = this.state;
        if (key === "ownerFolder") {
            props.onSelectOwnerFolder(option.value);
        }
        if (key === "moduleFolder" && option.value !== "") {
            props.onSelectModuleFolder({
                ownerFolder: state.newModule.ownerFolder.value,
                moduleFolder: option.value,
                type: 3 //.dnn files
            });
        }
        if (newModule[key].required) {
            newModule[key].error = !option.value;
        }
        newModule[key].value = option.value;
        this.setState({
            newModule,
            triedToSave
        });
    }

    onChange(key, event) {
        let value = typeof event === "object" ? event.target.value : event;
        let {newModule} = this.state;
        newModule[key].value = value;
        if (newModule[key].required) {
            newModule[key].error = !value;
        }
        this.setState({
            newModule
        });
    }

    validateFields() {
        let {triedToSave, newModule} = this.state;
        let errorCount = 0;
        Object.keys(newModule).forEach((key) => {
            if (newModule[key].error) {
                errorCount++;
            }
        });
        triedToSave = true;
        this.setState({
            newModule,
            triedToSave
        });
        return errorCount === 0;
    }

    onCreateNewModule() {
        let {state, props} = this;
        let {triedToSave} = state;
        triedToSave = true;
        if (!this.validateFields()) {
            return;
        }
        this.setState({
            triedToSave
        });
        props.onCreateNewModule(valueMapNewModule(state.newModule));
    }

    render() {
        const {props, state} = this;
        return (
            <GridCell className={styles.fromManifest + " extension-form"} style={{ padding: 0 }}>
                <GridSystem className="with-right-border top-half">
                    <div style={{ paddingRight: 15 }}>
                        <FolderDropdown
                            folders={props.ownerFolders}
                            label={Localization.get("NewModule_OwnerFolder.Label")}
                            type="ownerFolder"
                            tooltipMessage={Localization.get("NewModule_OwnerFolder.HelpText")}
                            onFolderSelect={this.onFolderSelect.bind(this, "ownerFolder")}
                            value={state.newModule.ownerFolder.value}
                            onAddNewFolder={props.onAddNewFolder.bind(this)} />
                        <FolderDropdown
                            folders={props.moduleFolders}
                            label={Localization.get("NewModule_ModuleFolder.Label")}
                            type="moduleFolder"
                            tooltipMessage={Localization.get("NewModule_ModuleFolder.HelpText")}
                            onFolderSelect={this.onFolderSelect.bind(this, "moduleFolder")}
                            value={state.newModule.moduleFolder.value}
                            onAddNewFolder={props.onAddNewFolder.bind(this)}
                            error={state.newModule.moduleFolder.error && state.triedToSave} />

                    </div>
                    <div style={{ paddingLeft: 15 }}>
                        <DropdownWithError
                            label={Localization.get("NewModule_Resource.Label")}
                            tooltipMessage={Localization.get("NewModule_Resource.HelpText")}
                            style={dropdownStyle}
                            options={props.moduleFiles}
                            onSelect={this.onFolderSelect.bind(this, "fileName")}
                            value={state.newModule.fileName.value}
                            error={state.newModule.fileName.error && state.triedToSave}
                            />
                        <Switch value={state.newModule.addPage.value}
                            tooltipMessage={Localization.get("NewModule_AddTestPage.HelpText")}
                            label={Localization.get("NewModule_AddTestPage.Label")}
                            onChange={this.onChange.bind(this, "addPage")} />
                    </div>
                </GridSystem>
                <GridCell columnSize={100} className="modal-footer">
                    <Button type="secondary" onClick={props.onCancel.bind(this)}>{Localization.get("NewModule_Cancel.Button")}</Button>
                    <Button type="primary"
                        onClick={this.onCreateNewModule.bind(this)}>{Localization.get("NewModule_Create.Button")}</Button>
                </GridCell>
            </GridCell>
        );
        // <p className="modal-pagination"> --1 of 2 -- </p>
    }
}

FromManifest.PropTypes = {
    onCancel: PropTypes.func,
    ownerFolders: PropTypes.array,
    moduleFolders: PropTypes.array,
    moduleFiles: PropTypes.array,
    onCreateNewModule: PropTypes.func
};

export default FromManifest;