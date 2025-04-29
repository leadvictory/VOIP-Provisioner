define(function (require) {
  var $ = require("jquery"),
    _ = require("lodash"),
    monster = require("monster");

  var app = {
    name: "provisioner",

    css: ["app"],

    i18n: {
      "en-US": { customCss: false },
    },

    // Defines API requests not included in the SDK
    requests: {
      "provisioner.provurl.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/initialtoken",
        verb: "GET",
      },
      "provisioner.phone_configfile.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/customconfigs",
        verb: "GET",
      },
      "provisioner.phone_configfile.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/customconfigs",
        verb: "GET",
      },
      "provisioner.phone_configfile.add": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/customconfigs",
        verb: "PUT",
      },
      "provisioner.phone_configfile.remove": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/customconfigs",
        verb: "DELETE",
      },
      "provisioner.account_configfile.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/accountconfigs",
        verb: "GET",
      },
      "provisioner.account_configfile.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/accountconfigs",
        verb: "GET",
      },
      "provisioner.account_configfile.add": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/accountconfigs",
        verb: "PUT",
      },
      "provisioner.account_configfile.remove": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/files/accountconfigs",
        verb: "DELETE",
      },
      "provisioner.acls.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/acl",
        verb: "GET",
      },
      "provisioner.acls.add": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/acl",
        verb: "PUT",
      },
      "provisioner.acls.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/acl",
        verb: "DELETE",
      },
      "provisioner.devicepassword.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/devicepassword",
        verb: "GET",
      },
      "provisioner.devicepassword.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/devicepassword",
        verb: "POST",
      },
      "provisioner.devicepassword.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/devicepassword",
        verb: "DELETE",
      },
      //Dialplan setting
      "provisioner.dialplan.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/dialplan",
        verb: "GET",
      },
      "provisioner.dialplan.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/dialplan",
        verb: "POST",
      },
      "provisioner.dialplan.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/dialplan",
        verb: "DELETE",
      },
      //custom config
      "provisioner.account_customconfig.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/customconfig",
        verb: "GET",
      },
      "provisioner.account_customconfig.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/customconfig",
        verb: "POST",
      },
      "provisioner.account_customconfig.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/customconfig",
        verb: "DELETE",
      },
      "provisioner.phonemodels.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/phones",
        verb: "GET",
      },
      "provisioner.phonemodels.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/phones/{brand}/{family}/{model}",
        verb: "GET",
      },
      "provisioner.phonemodels.add": {
        apiRoot: monster.config.api.provisioner,
        url: "api/phones",
        verb: "PUT",
      },
      "provisioner.phonemodels.update": {
        apiRoot: monster.config.api.provisioner,
        url: "api/phones",
        verb: "POST",
      },
    },

    // Define the events available for other apps
    subscribe: {},

    // Method used by the Monster-UI Framework, shouldn't be touched unless you're doing some advanced kind of stuff!
    load: function (callback) {
      var self = this;

      self.initApp(function () {
        callback && callback(self);
      });
    },

    // Method used by the Monster-UI Framework, shouldn't be touched unless you're doing some advanced kind of stuff!
    initApp: function (callback) {
      var self = this;

      // Used to init the auth token and account id of this app
      monster.pub("auth.initApp", {
        app: self,
        callback: callback,
      });
    },

    //////////////////////////////////////////////////////////
    // Entry Point of the app
    //////////////////////////////////////////////////////////

    render: function (container) {
      var self = this,
        $container = _.isEmpty(container) ? $("#monster_content") : container,
        $layout = $(self.getTemplate({ name: "layout" }));

      monster.ui.tooltips($layout);

      self.bindEvents({
        template: $layout,
      });
      $container.empty().append($layout); // draw the page
      // Load all 3 tabs contents
      self.loadAccountSettings();
      self.loadDevicesAndLogs();
      self.loadPhoneModels();
    },

    bindEvents: function (args) {
      var self = this,
        $template = args.template;

      // Refresh button
      $template.find("#refresh").on("click", function (e) {
        self.loadAccountSettings();
        self.loadDevicesAndLogs();
        self.loadPhoneModels();
      });

      // Help Button/Dialog
      $template.find("#help-button").on("click", function (e) {
        var helptemplate = $(
          app.getTemplate({
            name: "dialog-help",
          })
        );

        monster.ui.dialog(helptemplate, {
          title: app.i18n.active().provisioner.help.title,
          width: "600px",
          onClose: function () {},
        });
      });
    },

    loadAccountSettings: function () {
      var self = this;

      self.loadProvUrl();

      self.getAcls(function (aclinfo) {
        var $aclinfo = $(
          self.getTemplate({
            name: "aclinfo",
            data: { acls: aclinfo },
          })
        );
        $(".aclinfo").empty().append($aclinfo);

        $(".acl-delete").on("click", function () {
          var aclEntry = $(this).closest(".acl-entry").attr("id");
          self.deleteAcl(aclEntry);
        });

        $("#acl-add-button").on("click", function () {
          var acl = $("#acl-add-input").val();
          self.addAcl(acl);
        });
      });

      self.getDevicePassword(function (devicepassword) {
        var $devicepassword = $(
          self.getTemplate({
            name: "devicepassword",
            data: { devicepassword: devicepassword },
          })
        );
        $(".devicepassword").empty().append($devicepassword);

        $(".devicepassword-delete").on("click", function () {
          self.deleteDevicePassword("#devicepassword");
        });

        $("#devicepassword-set-button").on("click", function () {
          var dp = $("#devicepassword-set-input").val();
          if (dp.length >= 3) {
            self.setDevicePassword(dp);
          } else {
            monster.ui.alert(
              "Password too short: must be at least 3 characters."
            );
          }
        });
      });

      self.loadDialplanSettings();
      self.loadCustomConfig();
    },

    loadDevicesAndLogs: function () {
      var self = this;

      self.loadDeviceTable();
      self.loadDeviceActions();
      self.loadLogEvents();
    },

    loadPhoneModels: function () {
      var self = this;

      self.loadPhoneModelsTable();
    },

    // Extra small loading functions
    loadProvUrl: function () {
      var self = this;
      monster.request({
        resource: "provisioner.provurl.get",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          $("#provurl").html(res.data.provision_url);
        },
        error: function (res) {
          if (res.status == 401) {
            monster.util.logoutAndReload();
          } else {
            monster.ui.alert("ERROR: Failed to get provisioning URL");
          }
        },
      });
    },

    loadDialplanSettings: function () {
      var self = this;

      monster.request({
        resource: "provisioner.dialplan.get",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          var settings = res.data || {};

          var $dialplanSettings = $(
            self.getTemplate({
              name: "dialplanSettings",
              data: {
                digit_map: settings.digit_map || "",
                dial_delay: settings.dial_delay || "",
              },
            })
          );

          $(".dialplan-settings").empty().append($dialplanSettings);

          $(document)
            .off("click", "#save-dialplan")
            .on("click", "#save-dialplan", function () {
              self.saveDialplanSettings();
            });
        },
        error: function () {
          $(".dialplan-settings").html(
            "<p>No dialplan settings found or failed to load.</p>"
          );
        },
      });
    },

    loadCustomConfig: function () {
      var self = this;

      monster.request({
        resource: "provisioner.account_configfile.list",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          var formattedJSON = JSON.stringify(res.data, null, 2); // nicely formatted
          var $customConfig = $(
            self.getTemplate({
              name: "customconfig",
              data: {
                custom_config: formattedJSON,
              },
            })
          );

          $(".custom-config").empty().append($customConfig);

          // Bind save button
          $("#save-custom-config").on("click", function () {
            try {
              var parsed = JSON.parse($("#custom-config-input").val());
              self.setCustomConfig(parsed);
            } catch (e) {
              monster.ui.alert("Invalid JSON format.");
            }
          });
        },
        error: function () {
          monster.ui.alert("Failed to load custom config");
        },
      });
    },

    loadDeviceTable: function () {
      var self = this;
      $(".device-table").html("<p>Devices list will load here</p>");
    },

    loadDeviceActions: function () {
      var self = this;
      $(".device-actions-buttons").html("<p>Device actions will load here</p>");
    },

    loadLogEvents: function () {
      var self = this;
      $(".log-events").html("<p>Log events will load here</p>");
    },

    loadPhoneModelsTable: function () {
      var self = this;
      monster.request({
        resource: "provisioner.phone_configfile.list",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          var $models = $("<div>").text("Phone models loaded");
          $(".phone-models").empty().append($models);
        },
        error: function (res) {
          monster.ui.alert("Failed to load phone models");
        },
      });
    },

    updateDevicePasswordTemplate: function (devicepassword) {
      var self = this;
      var $aclinfo = $(
        app.getTemplate({
          name: "devicepassword",
          data: {
            devicepassword: devicepassword,
          },
        })
      );
    },

    getDevicePassword: function (callback) {
      var self = this;
      monster.request({
        resource: "provisioner.devicepassword.get",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          //console.log(data);
          callback(res.data);
        },
        error: function (res) {
          if (res.status == 404) {
            callback([]); //Populate results with nothing
          } else if (res.status == 401) {
            monster.util.logoutAndReload();
          } else {
            monster.ui.alert(
              "ERROR: Failed to get account device password: " + parsedError
            );
            callback([]); //Populate results with nothing
          }
        },
      });
    }, //end getDevicePassword

    setDevicePassword: function (devicepassword) {
      var self = this;

      monster.request({
        resource: "provisioner.devicepassword.set",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: {
            password: devicepassword,
          },
        },
        success: function (res) {
          //console.log(data);
          let newpassword = `<div id="devicepassword" title="account-device-password" class="devicepassword-entry">${devicepassword}&nbsp;&nbsp;<i class="fa fa-remove devicepassword-delete"></i></div>`;
          $("#devicepassword-list").append(newpassword);

          $("#refresh").click(); //??
        },
        error: function (res) {
          if (res.status == 401) {
            //monster.util.logoutAndReload();
          } else {
            monster.ui.alert(
              "ERROR: Failed to add account device password: " + parsedError
            );
          }
        },
      });
    },

    deleteDevicePassword: function (devicepassword) {
      var self = this;
      monster.request({
        resource: "provisioner.devicepassword.delete",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: {
            devicepassword: devicepassword,
          },
        },
        success: function (res) {
          //console.log(data);
          //self.getAcls(self.updateAclsTemplate);
          //"select[title='" + acl + "']").remove();
          $("#refresh").click();
        },
        error: function (res) {
          if (res.status == 401) {
            monster.util.logoutAndReload();
          } else {
            monster.ui.alert(
              "ERROR: Failed to delete account device password: " + parsedError
            );
          }
        },
      });
    },

    updateAclsTemplate: function (aclinfo) {
      var self = this;
      var $aclinfo = $(
        app.getTemplate({
          name: "aclinfo",
          data: {
            acls: aclinfo,
          },
        })
      );
      //$(".aclinfo").empty().append($aclinfo);

      /*
			$(".acl-delete").on("click", function (e) {
			console.log(self);
				let aclEntry = $(this).closest(".acl-entry").attr("id"); //get the id, which is the ACL itself
				self.deleteAcl(aclEntry);
			});
			*/
    },

    getAcls: function (callback) {
      var self = this;
      //$.ajax({
      //	url: monster.config.api.provisioner + 'api/' + self.accountId + '/acl' ,
      monster.request({
        resource: "provisioner.acls.list",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          //number: dialNumber,
        },
        success: function (res) {
          //console.log(data);
          //$('#oncalldr').html(data.data.doctor);
          //$('#oncallthru').html(data.data.end);
          callback(res.data.acls);
        },
        error: function (res) {
          if (res.status == 404) {
            callback([]); //Populate results with nothing
          } else if (res.status == 401) {
            monster.util.logoutAndReload();
          } else {
            monster.ui.alert("ERROR: Failed to get ACLs: " + parsedError);
            callback([]); //Populate results with nothing
          }
        },
      });
    }, //end getAcls

    addAcl: function (acl) {
      var self = this;
      monster.request({
        resource: "provisioner.acls.add",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: {
            net: acl,
          },
        },
        success: function (res) {
          //console.log(data);
          //acl = res.data.acls[res.data.acls.length - 1];
          let newacl = `<div id="${acl}" title="${acl}" class="acl-entry">${acl}&nbsp;&nbsp;<i class="fa fa-remove acl-delete"></i></div>`;
          $("#acl-list").append(newacl);
          $("#refresh").click();
        },
        error: function (res) {
          if (res.status == 401) {
            //monster.util.logoutAndReload();
          } else {
            monster.ui.alert("ERROR: Failed to add ACL: " + parsedError);
          }
        },
      });
    },

    deleteAcl: function (acl) {
      var self = this;
      monster.request({
        resource: "provisioner.acls.delete",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: {
            net: acl,
          },
        },
        success: function (res) {
          //console.log(data);
          //self.getAcls(self.updateAclsTemplate);
          //"select[title='" + acl + "']").remove();
          $("#refresh").click();
        },
        error: function (res) {
          if (res.status == 401) {
            monster.util.logoutAndReload();
          } else {
            monster.ui.alert("ERROR: Failed to add ACL: " + parsedError);
          }
        },
      });
    },

    saveDialplanSettings: function () {
      var self = this;
      var digit_map = $("#digit_map").val();
      var dial_delay = parseInt($("#dial_delay").val(), 10);

      var payload = {
        data: {
          digit_map: digit_map,
          dial_delay: dial_delay,
        },
      };

      monster.request({
        resource: "provisioner.dialplan.set",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: payload.data,
        },
        success: function (res) {
          monster.ui.alert("Dialplan settings updated successfully.");
        },
        error: function () {
          monster.ui.alert("Failed to update dialplan settings.");
        },
      });
    },

    setCustomConfig: function (config) {
      var self = this;

      monster.request({
        resource: "provisioner.account_configfile.add",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: config,
        },
        success: function () {
          monster.ui.alert("Custom config saved successfully.");
        },
        error: function () {
          monster.ui.alert("Failed to save custom config.");
        },
      });
    },
    ////////////////////////////////////////////////////////
  };

  return app;
});
