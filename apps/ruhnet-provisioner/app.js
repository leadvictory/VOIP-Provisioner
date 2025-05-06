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
        url: "api/{accountId}/customconfig/{groupname}",
        verb: "DELETE",
      },
      //phone models
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
        verb: "POST",
      },
      "provisioner.phonemodels.update": {
        apiRoot: monster.config.api.provisioner,
        url: "api/phones",
        verb: "PUT",
      },
      "provisioner.account_groups.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/groups",
        verb: "GET",
      },
      "provisioner.account_groups.save": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/groups/{newgruopname",
        verb: "PUT",
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

      self.getDialplanSettings(function (settings) {
        const $dialplan = $(
          self.getTemplate({
            name: "dialplanSettings",
            data: {
              digit_map: settings.digit_map || "",
              dial_delay: settings.dial_delay || "",
            },
          })
        );

        $(".dialplan-settings").empty().append($dialplan);

        $(".dialplan-delete").on("click", function () {
          self.deleteDialplanSettings();
        });

        $("#save-dialplan").on("click", function () {
          const digitMap = $("#digit_map").val();
          const dialDelay = parseInt($("#dial_delay").val(), 10);

          if (!digitMap || isNaN(dialDelay)) {
            monster.ui.alert("Please provide valid dialplan values.");
            return;
          }

          self.setDialplanSettings({
            digit_map: digitMap,
            dial_delay: dialDelay,
          });
        });
      });
    },

    loadCustomConfig: function () {
      var self = this;

      self.getCustomConfig(function (data) {
        console.log("Custom Config Data:", data);

        const formattedJSON = JSON.stringify(data, null, 2);
        const $customConfig = $(
          self.getTemplate({
            name: "customconfig",
            data: { custom_config: formattedJSON },
          })
        );

        $(".custom-config").empty().append($customConfig);
        const configData = [
          {
            id: "polycom",
            name: "polycom",
            families: [
              {
                id: "polycom_ccx",
                name: "ccx",
                models: [{ id: "polycom_ccx_500", name: "500" }],
              },
              {
                id: "polycom_spip",
                name: "spip",
                models: [
                  { id: "polycom_spip_335", name: "335" },
                  { id: "polycom_spip_430", name: "430" },
                  { id: "polycom_spip_450", name: "450" },
                  { id: "polycom_spip_550", name: "550" },
                  { id: "polycom_spip_600", name: "600" },
                  { id: "polycom_spip_650", name: "650" },
                  { id: "polycom_spip_670", name: "670" },
                ],
              },
              {
                id: "polycom_vvx",
                name: "vvx",
                models: [
                  { id: "polycom_vvx_250", name: "250" },
                  { id: "polycom_vvx_301", name: "301" },
                  { id: "polycom_vvx_410", name: "410" },
                  { id: "polycom_vvx_500", name: "500" },
                  { id: "polycom_vvx_501", name: "501" },
                  { id: "polycom_vvx_600", name: "600" },
                  { id: "polycom_vvx_601", name: "601" },
                ],
              },
            ],
          },
          {
            id: "yealink",
            name: "yealink",
            families: [
              {
                id: "yealink_",
                name: "",
                models: [{ id: "yealink__t46u", name: "t46u" }],
              },
              {
                id: "yealink_ax",
                name: "ax",
                models: [{ id: "yealink_ax_ax83h", name: "ax83h" }],
              },
              {
                id: "yealink_t2x",
                name: "t2x",
                models: [{ id: "yealink_t2x_t29g", name: "t29g" }],
              },
              {
                id: "yealink_t4x",
                name: "t4x",
                models: [
                  { id: "yealink_t4x_t40g", name: "t40g" },
                  { id: "yealink_t4x_t42g", name: "t42g" },
                  { id: "yealink_t4x_t42s", name: "t42s" },
                  { id: "yealink_t4x_t46g", name: "t46g" },
                  { id: "yealink_t4x_t46s", name: "t46s" },
                  { id: "yealink_t4x_t46u", name: "t46u" },
                ],
              },
              {
                id: "yealink_t5x",
                name: "t5x",
                models: [{ id: "yealink_t5x_t54w", name: "t54w" }],
              },
              {
                id: "yealink_w5x",
                name: "w5x",
                models: [
                  { id: "yealink_w5x_w52p", name: "w52p" },
                  { id: "yealink_w5x_w60p", name: "w60p" },
                  { id: "yealink_w5x_w70b", name: "w70b" },
                ],
              },
            ],
          },
        ];

        self.getGroups(function (groups) {
          const $group = $("#config-group");
          $group.empty().append(`<option value="">Select group</option>`);

          groups.forEach((group) => {
            $group.append(
              `<option value="${group.id}">${group.name || group.id}</option>`
            );
          });
        });
        $("#show-new-group").on("click", function () {
          $("#new-group-container").toggle();
        });

        $("#save-new-group").on("click", function () {
          const newGroup = $("#new-group-name").val().trim();

          if (!newGroup) {
            monster.ui.alert("Group name cannot be empty.");
            return;
          }

          self.saveGroup(newGroup, function (success) {
            if (success) {
              const $group = $("#config-group");
              if (!$group.find(`option[value="${newGroup}"]`).length) {
                $group.append(
                  `<option value="${newGroup}">${newGroup}</option>`
                );
              }

              $group.val(newGroup);
              $("#new-group-container").hide();
              $("#new-group-name").val("");
            }
          });
        });

        const $brand = $("#config-brand");
        configData.forEach((brand) => {
          $brand.append(`<option value="${brand.id}">${brand.name}</option>`);
        });

        $brand.on("change", function () {
          const selectedBrand = $(this).val();
          const $family = $("#config-family").empty().prop("disabled", true);
          const $model = $("#config-model").empty().prop("disabled", true);

          $family.append(`<option value="">Select family</option>`);
          $model.append(`<option value="">Select model</option>`);

          const brandObj = configData.find((b) => b.id === selectedBrand);
          if (brandObj) {
            brandObj.families.forEach((fam) => {
              $family.append(
                `<option value="${fam.id}">${fam.name || fam.id}</option>`
              );
            });
            $family.prop("disabled", false);
          }
        });

        $("#config-family").on("change", function () {
          const selectedBrand = $("#config-brand").val();
          const selectedFamily = $(this).val();
          const $model = $("#config-model").empty().prop("disabled", true);
          $model.append(`<option value="">Select model</option>`);

          const brandObj = configData.find((b) => b.id === selectedBrand);
          if (brandObj) {
            const familyObj = brandObj.families.find(
              (f) => f.id === selectedFamily
            );
            if (familyObj) {
              familyObj.models.forEach((m) => {
                $model.append(`<option value="${m.id}">${m.name}</option>`);
              });
              $model.prop("disabled", false);
            }
          }
        });
        $(".custom-config")
          .off("click", "#add-kv-row")
          .on("click", "#add-kv-row", function () {
            var $row = $(
              '<div class="config-kv-row">\
            <input class="config-key" type="text" placeholder="Key (e.g., features.config_dsskey_length)">\
            <input class="config-value" type="text" placeholder="Value (e.g., 2)">\
            <button class="remove-kv btn btn-link">&times;</button>\
            </div>'
            );
            $("#config-kv-list").append($row);
            $row.find(".remove-kv").show();
          });

        $(".custom-config")
          .off("click", ".remove-kv")
          .on("click", ".remove-kv", function () {
            $(this).closest(".config-kv-row").remove();
          });

        $("#save-custom-config").on("click", function () {
          try {
            const parsed = JSON.parse($("#custom-config-input").val());
            self.setCustomConfig(parsed);
          } catch (e) {
            monster.ui.alert("Invalid JSON format.");
          }
        });

        $(".custom-config-delete").on("click", function () {
          self.deleteCustomConfig();
        });

        $("#add-config-button").on("click", function () {
          const brand = $("#config-brand").val().trim();
          const family = $("#config-family").val().trim();
          const model = $("#config-model").val().trim();
          const group = $("#config-group").val().trim();

          if (!brand || !family || !model || !group) {
            monster.ui.alert("Brand, Family, Model, and Group are required.");
            return;
          }

          let anyError = false;
          const kvPairs = [];
          $("#config-kv-list .config-kv-row").each(function () {
            const k = $(this).find(".config-key").val().trim();
            const v = $(this).find(".config-value").val().trim();
            if (!k || !v) anyError = true;
            kvPairs.push([k, v]);
          });

          if (anyError) {
            monster.ui.alert("Every key/value field must be filled in.");
            return;
          }
          if (kvPairs.length === 0) {
            monster.ui.alert("At least one key/value pair is required.");
            return;
          }

          const modelObj = {};
          kvPairs.forEach(([k, v]) => {
            modelObj[k] = v;
          });

          const config = {
            [brand]: {
              [family]: {
                [model]: modelObj,
              },
            },
          };

          self.setCustomConfig(config, group);

          $("#config-kv-list").html(
            '<div class="config-kv-row">\
            <input class="config-key" type="text" placeholder="Key (e.g., features.config_dsskey_length)">\
            <input class="config-value" type="text" placeholder="Value (e.g., 2)">\
            <button class="remove-kv btn btn-link" style="display:none;">&times;</button>\
            </div>'
          );
          $("#config-key, #config-value").val("");
        });
      });
    },

    loadDeviceTable: function () {
      var self = this;

      self.listDevices(function (devices) {
        const $deviceTable = $(
          self.getTemplate({
            name: "devicesetting", // maps to id="template-device-settings"
            data: {
              devices: devices,
            },
          })
        );

        $(".device-table").empty().append($deviceTable);
      });
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

      self.getPhoneModels(function (phoneModelsArray) {
        var $models = $(
          self.getTemplate({
            name: "phonemodels",
            data: { phone_models: phoneModelsArray },
          })
        );

        $(".phone-models").empty().append($models);

        $("#phone-model-add-button").on("click", function () {
          try {
            var upgrades = [];
            $("#upgrades-list .upgrade-entry").each(function () {
              var from = $(this).find(".upgrade-from").val().trim();
              var to = $(this).find(".upgrade-to").val().trim();

              if (from && to) {
                upgrades.push({ from: from, to: to });
              }
            });

            var getVal = function (id) {
              var val = $("#" + id)
                .val()
                ?.trim();
              return val !== "" ? val : undefined;
            };

            var getIntVal = function (id) {
              var val = parseInt($("#" + id).val(), 10);
              return isNaN(val) ? undefined : val;
            };

            var firmwareVersion = getVal("firmware_version");
            var firmwareSection =
              firmwareVersion || upgrades.length
                ? {
                    version: firmwareVersion,
                    upgrades: upgrades,
                  }
                : undefined;

            var modelData = {
              brand: getVal("brand"),
              family: getVal("family"),
              model: getVal("model"),
              settings: {
                user_agent: getVal("user_agent"),
                template_file: getVal("template_file"),
                token_use_limit: getIntVal("token_use_limit"),
                provisioning_protocol: getVal("provisioning_protocol"),
                content_type: getVal("content_type"),
                combo_keys: {
                  quantity: getIntVal("combo_keys"),
                },
                feature_keys: {
                  quantity: getIntVal("feature_keys"),
                },
                voicemail_code: getVal("voicemail_code"),
                firmware: firmwareSection,
              },
            };

            console.log(
              "Sending modelData:",
              JSON.stringify(modelData, null, 2)
            );
            self.addPhoneModel(modelData);
          } catch (e) {
            monster.ui.alert(
              "Invalid input, please check fields: " + e.message
            );
          }
        });

        var state = {
          brandIdx: null,
          familyKey: null,
          modelKey: null,
        };

        $(".phone-models")
          .off("click", ".brand-item")
          .on("click", ".brand-item", function () {
            state.brandIdx = $(this).data("brand-idx");
            state.familyKey = null; //
            state.modelKey = null;
            renderFamilyList();
          });

        $(".phone-models")
          .off("click", ".family-item")
          .on("click", ".family-item", function () {
            state.familyKey = $(this).data("family-key");
            state.modelKey = null;
            renderModelList();
          });

        $(".phone-models")
          .off("click", ".model-item")
          .on("click", ".model-item", function () {
            state.modelKey = $(this).data("model-key");
            renderModelDetails();
          });

        $(".phone-models")
          .off("click", ".back-to-brands")
          .on("click", ".back-to-brands", function () {
            renderBrandList();
          });
        $(".phone-models")
          .off("click", ".back-to-families")
          .on("click", ".back-to-families", function () {
            state.familyKey = null;
            state.modelKey = null;
            renderFamilyList();
          });
        $(".phone-models")
          .off("click", ".back-to-models")
          .on("click", ".back-to-models", function () {
            state.modelKey = null;
            renderModelList();
          });

        function renderBrandList() {
          state.brandIdx = null;
          state.familyKey = null;
          state.modelKey = null;
          $(".brand-list-section").show();
          $(".family-list-section").hide();
          $(".model-list-section").hide();
          $(".model-details-section").hide();
        }

        function renderFamilyList() {
          state.familyKey = null;
          state.modelKey = null;

          var brand = phoneModelsArray[state.brandIdx];
          if (!brand) {
            console.error("Brand not found for index", state.brandIdx);
            renderBrandList();
            return;
          }

          var familyKeys = Object.keys(brand.families);
          var $familyList = $(".family-list").empty();

          familyKeys.forEach(function (familyKey) {
            $("<li>", {
              html: brand.families[familyKey].name,
              class: "family-item",
              "data-family-key": familyKey,
            }).appendTo($familyList);
          });

          $(".brand-list-section").hide();
          $(".family-list-section").show();
          $(".model-list-section").hide();
          $(".model-details-section").hide();
        }

        function renderModelList() {
          state.modelKey = null;

          var brand = phoneModelsArray[state.brandIdx];
          var family = brand.families[state.familyKey];
          if (!brand || !family) {
            console.error("Family not found for key", state.familyKey);
            renderFamilyList();
            return;
          }

          var modelKeys = Object.keys(family.models);
          var $modelList = $(".model-list").empty();

          modelKeys.forEach(function (modelKey) {
            $("<li>", {
              html: family.models[modelKey].name,
              class: "model-item",
              "data-model-key": modelKey,
            }).appendTo($modelList);
          });

          $(".brand-list-section").hide();
          $(".family-list-section").hide();
          $(".model-list-section").show();
          $(".model-details-section").hide();
        }

        function renderModelDetails() {
          var brand = phoneModelsArray[state.brandIdx];
          var family = brand.families[state.familyKey];
          var model = family.models[state.modelKey];

          if (!brand || !family || !model) {
            $(".model-details").html(
              "<div><em>Unable to load model details. (Missing brand, family, or model.)</em></div>"
            );
            $(".brand-list-section").hide();
            $(".family-list-section").hide();
            $(".model-list-section").hide();
            $(".model-details-section").show();
            console.error(
              "Missing data in renderModelDetails. State:",
              state,
              "Data:",
              brand,
              family,
              model
            );
            return;
          }

          var settings =
            Array.isArray(model.settings) && model.settings.length > 0
              ? model.settings[0]
              : {};

          function capitalize(str) {
            return (str + "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (x) => x.toUpperCase());
          }

          function fieldRow(key, val) {
            if (val === undefined || val === null || val === "") return "";
            if (key === "firmware") {
              if (typeof val === "string") {
                return `<li><strong>Firmware Version:</strong> ${val}</li>`;
              } else if (typeof val === "object" && val !== null) {
                return `<li><strong>Firmware:</strong>
                    <ul>
                      ${
                        val.version
                          ? `<li><strong>Version:</strong> ${val.version}</li>`
                          : ""
                      }
                      ${
                        Array.isArray(val.upgrades) && val.upgrades.length
                          ? `<li><strong>Upgrades:</strong>
                              <ul>
                                ${val.upgrades
                                  .map(
                                    (upg) =>
                                      `<li>From <code>${upg.from}</code> to <code>${upg.to}</code></li>`
                                  )
                                  .join("")}
                              </ul>
                             </li>`
                          : ""
                      }
                    </ul>
                  </li>`;
              }
              return "";
            }
            if (key === "combo_keys" || key === "feature_keys") {
              if (
                typeof val === "object" &&
                val !== null &&
                val.quantity !== undefined &&
                val.quantity !== null
              ) {
                return `<li><strong>${capitalize(key)}:</strong>
                     <ul>
                       <li><strong>Quantity:</strong> ${val.quantity}</li>
                     </ul>
                   </li>`;
              }
              return "";
            }
            return `<li><strong>${capitalize(key)}:</strong> ${val}</li>`;
          }

          var settingsHtml = Object.keys(settings)
            .map(function (key) {
              return fieldRow(key, settings[key]);
            })
            .join("");

          var html = `
              <div>
                <strong>Brand:</strong> ${brand.name}<br>
                <strong>Family:</strong> ${family.name}<br>
                <strong>Model:</strong> ${model.name}<br>
                <strong>Setting:</strong>
                <ul>
                  ${settingsHtml}
                </ul>
              </div>`;

          $(".model-details").html(html);
          $(".brand-list-section").hide();
          $(".family-list-section").hide();
          $(".model-list-section").hide();
          $(".model-details-section").show();
        }

        renderBrandList();
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

    getDialplanSettings: function (callback) {
      var self = this;

      monster.request({
        resource: "provisioner.dialplan.get",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          callback(res.data || {});
        },
        error: function (res) {
          if (res.status === 401) {
            monster.util.logoutAndReload();
          } else {
            monster.ui.alert("ERROR: Failed to get dialplan settings");
            callback({});
          }
        },
      });
    },

    setDialplanSettings: function (data) {
      var self = this;

      monster.request({
        resource: "provisioner.dialplan.set",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: data,
        },
        success: function () {
          monster.ui.alert("Dialplan settings updated successfully.");
          $("#refresh").click();
        },
        error: function () {
          monster.ui.alert("Failed to update dialplan settings.");
        },
      });
    },

    deleteDialplanSettings: function () {
      var self = this;

      monster.request({
        resource: "provisioner.dialplan.delete",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function () {
          monster.ui.alert("Dialplan settings deleted.");
          $("#refresh").click();
        },
        error: function () {
          monster.ui.alert("Failed to delete dialplan settings.");
        },
      });
    },

    setCustomConfig: function (config, group) {
      var self = this;

      monster.request({
        resource: "provisioner.account_customconfig.set",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          group: group,
          data: config,
        },
        success: function () {
          monster.ui.alert("Custom config saved successfully.");
          self.loadCustomConfig();
        },
        error: function () {
          monster.ui.alert("Failed to save custom config.");
        },
      });
    },

    getCustomConfig: function (callback) {
      var self = this;
      monster.request({
        resource: "provisioner.account_customconfig.get",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          console.log("Custom Config Data:", res.data);
          callback(res.data);
        },
        error: function (res) {
          if (res.status === 404) {
            callback({});
          } else {
            monster.ui.alert("Failed to get custom config");
            callback({});
          }
        },
      });
    },

    deleteCustomConfig: function () {
      var self = this;
      monster.request({
        resource: "provisioner.account_customconfig.delete",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function () {
          monster.ui.alert("Custom config deleted.");
          $("#refresh").click();
        },
        error: function () {
          monster.ui.alert("Failed to delete custom config.");
        },
      });
    },

    getGroups: function (callback) {
      var self = this;

      monster.request({
        resource: "provisioner.account_groups.list",
        data: {
          accountId: self.accountId,
        },
        success: function (res) {
          console.log("Groups Raw Data:", res.data);

          // Convert object of groups into an array
          const groupsObject = res.data;
          const groups = Object.keys(groupsObject).map((key) => ({
            id: key,
            name: groupsObject[key].name || key,
          }));

          callback(groups);
        },
        error: function (res) {
          monster.ui.alert("Failed to get groups.");
          callback([]);
        },
      });
    },

    saveGroup: function (groupName, callback) {
      var self = this;

      monster.request({
        resource: "provisioner.account_groups.save",
        data: {
          accountId: self.accountId,
          data: {
            name: groupName,
          },
        },
        success: function () {
          monster.ui.toast({
            type: "success",
            message: "Group saved successfully.",
          });
          callback && callback(true);
        },
        error: function () {
          monster.ui.alert("Failed to save the group.");
          callback && callback(false);
        },
      });
    },

    addPhoneModel: function (modelData) {
      var self = this;

      monster.request({
        resource: "provisioner.phonemodels.add",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
          data: [modelData], // 👈 not wrapped in an array
        },
        success: function () {
          monster.ui.alert("Phone model added successfully.");
          $("#refresh").click();
        },
        error: function (error) {
          console.error("API Error:", error);
          monster.ui.alert("Failed to add phone model.");
        },
      });
    },

    getPhoneModels: function (callback) {
      var self = this;

      monster.request({
        resource: "provisioner.phonemodels.list",
        data: {
          accountId: self.accountId,
          userId: monster.apps.auth.currentUser.id,
        },
        success: function (res) {
          var phoneModelsArray = Object.values(res.data);
          console.log(phoneModelsArray);
          callback(phoneModelsArray);
        },
        error: function (res) {
          if (res.status === 401) {
            monster.util.logoutAndReload();
          } else {
            monster.ui.alert("ERROR: Failed to get phone models");
            callback([]);
          }
        },
      });
    },

    listDevices: function (callback) {
      var self = this;
      self.callApi({
        resource: "device.list",
        data: {
          accountId: self.accountId,
          filters: {
            paginate: false,
          },
        },
        success: function (devices) {
          //console.log(devices.data);
          callback(devices.data);
        },
        error: function (err) {
          console.log("Error in listDevices:");
          console.log(err);
          callback([]);
        },
      });
    },

    removeDeviceLock: function (macAddress) {
      var self = this;

      monster.request({
        resource: "provisioner.device_lock.delete",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function (response) {
          monster.ui.alert("Device lock removed successfully.");
          console.log(response);
        },
        error: function (error) {
          monster.ui.alert("Failed to remove device lock.");
          console.error(error);
        },
      });
    },
    ////////////////////////////////////////////////////////
  };

  return app;
});
