sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast" 
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.mindset.apps.project6.controller.View1", {
        copiedJSON: null,

        onInit: function () {
            const dataModel = new JSONModel();

            dataModel.attachRequestCompleted(function () {
                this.copiedJSON = JSON.parse(JSON.stringify(dataModel.getData().masterJSON));
                this.getView().getModel().setProperty("/copiedJSON", this.copiedJSON);
            }.bind(this));

            dataModel.loadData("/model/data.json");
            this.getView().setModel(dataModel);
        },
        handleChange: function (oEvent) {
            const inputId = oEvent.getSource().getId();
            let isValid = true; 

            switch (inputId) {
                case this.getView().createId("inputName"):
                    this.copiedJSON.name = oEvent.getParameter("value");
                    break;
                case this.getView().createId("inputAge"):
                    const age = parseInt(oEvent.getParameter("value"));
                    if (!isNaN(age)) {
                        this.copiedJSON.age = age;
                    } else {
                        isValid = false;
                        MessageToast.show("Invalid age input"); 
                    }
                    break;
                case this.getView().createId("inputEmail"):
                    const email = oEvent.getParameter("value");
                    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
                        this.copiedJSON.email = email;
                    } else {
                        isValid = false;
                        MessageToast.show("Invalid email input"); 
                    }
                    break;
                case this.getView().createId("inputPhone"):
                    const phoneNumber = oEvent.getParameter("value");
                    if (/^\d{10}$/.test(phoneNumber)) {
                        this.copiedJSON.phoneNumber = phoneNumber;
                    } else {
                        isValid = false;
                        MessageToast.show("Invalid phone number input"); 
                    }
                    break;
                case this.getView().createId("inputAddress"):
                    this.copiedJSON.address = oEvent.getParameter("value");
                    break;
                case this.getView().createId("inputHobbies"):
                    this.copiedJSON.hobbies.push(oEvent.getParameter("value"));
                    break;
                case this.getView().createId("inputSchool"):
                    this.copiedJSON.education.highSchool = oEvent.getParameter("value");
                    break;
                case this.getView().createId("inputCollege"):
                    this.copiedJSON.education.college = oEvent.getParameter("value");
                    break;
                default:
                    break;
            }

            if (!isValid) {
                MessageToast.show("Invalid input"); 
            } else {
                const oModel = this.getView().getModel();
                oModel.setProperty("/copiedJSON", this.copiedJSON);
            }
        }
    });
});
