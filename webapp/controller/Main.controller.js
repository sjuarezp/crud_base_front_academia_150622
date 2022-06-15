sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/ui/commons/form/SimpleForm",
    "sap/m/Input",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Dialog,SimpleForm,Input,Button) {
        "use strict";

        return Controller.extend("com.csti.proveedores.crud.frontend001.controller.Main", {
            onInit: function () {
               this.loadData();
            },
            loadData:function(oEvent){
                var that=this;
                $.ajax({
                    url: "./api/proveedor/findAll",
                    type: 'GET',
                    success: function(res) {
                        console.log(res);
                        let model=new sap.ui.model.json.JSONModel(res)
                        that.byId("idProveedoresTable").setModel(model);
                        
                    }
                });

            },
            onUpdate:function(){
                this.loadData();
            },
            onDelete:function(){
                var that=this;
                let item=this.byId("idProveedoresTable").getSelectedItem().getBindingContext().getObject();
                $.ajax({
                    url: "./api/proveedor/"+item.id,
                    type: 'DELETE',
                    success: function(res) {
                        that.loadData();
                        
                    }
                });
                console.info(item);

            },
            onNew:function(){

                var ruc,rs,df,pw,cc;
                var that=this;

                if (!this.oDraggableDialog) {
                   
                    var formProveedor = new SimpleForm("formProveedor", {
                        content: [
                            new sap.m.Label({ text: "RUC" }),
                            ruc=new Input("new_ruc",{ id: "new_ruc" }),

                            new sap.m.Label({ text: "Razon Social" }),
                            rs=new Input({ id: "new_razon_social" }),

                            new sap.m.Label({ text: "Direccion Fiscal" }),
                            df=new Input({ id: "new_direccion_fiscal" }),

                            new sap.m.Label({ text: "Página Web" }),
                            pw=new Input({ id: "new_pagina_web" }),

                            new sap.m.Label({ text: "Correo Coporativo" }),
                            cc=new Input({ id: "new_correo_corporativo" })

                        ]
                    });


                    this.oDraggableDialog = new Dialog({
                        title: "Nuevo Proveedor",
                        contentWidth: "550px",
                        contentHeight: "300px",
                        draggable: true,
                        content: formProveedor,
                        beginButton: new Button({
                            text: "Guardar",
                            type: "Success",
                            press: function () {
                                

                                $.ajax({
                                    url: "/api/proveedor/create",
                                    type: 'POST',
                                    dataType: 'json',
                                    contentType: "application/json",
                                    data: JSON.stringify({
                                        "ruc": ruc.getValue(),
                                        "razonSocial": rs.getValue(),
                                        "direccionFiscal": df.getValue(),
                                        "paginaWeb": pw.getValue(),
                                        "correoCorporativo": cc.getValue(),
                                        "idSet": true
                                    }),
                                    success: function (result) {
                                        console.info(result);
                                        that.loadData();
                
                                    },
                                    failure: function () {

                                    }

                                });



                                this.oDraggableDialog.close();
                            }.bind(this)
                        }),
                        endButton:
                            new Button({
                                text: "Cancelar",
                                press: function () {
                                    this.oDraggableDialog.close();
                                }.bind(this)
                            })

                    });
                }

                this.oDraggableDialog.open();                

            }
        });
    });
