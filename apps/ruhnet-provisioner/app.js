require.config({
  paths: {
    jsonview: "apps/ruhnet-provisioner/lib/jsonview",
  },
});

define(function (require) {
  var $ = require("jquery"),
    _ = require("lodash"),
    monster = require("monster");

  var jsonview = require("jsonview");

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
        verb: "PUT",
      },
      "provisioner.phonemodels.update": {
        apiRoot: monster.config.api.provisioner,
        url: "api/phones",
        verb: "POST",
      },
      "provisioner.account_groups.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/groups",
        verb: "GET",
      },
      "provisioner.account_groups.save": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/groups/{newgruopname}",
        verb: "PUT",
      },
      "provisioner.device_lock.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/locks/{accountId}/{mac_address}",
        verb: "DELETE",
      },
      "provisioner.device_custom_config.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/customconfig",
        verb: "GET",
      },
      "provisioner.device_custom_config.add": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/customconfig",
        verb: "POST",
      },
      "provisioner.device_custom_config.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/customconfig",
        verb: "DELETE",
      },
      "provisioner.macdevice_password.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/devicepassword",
        verb: "POST",
      },
      "provisioner.macdevice_password.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/devicepassword",
        verb: "GET",
      },
      "provisioner.macdevice_password.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/devicepassword",
        verb: "DELETE",
      },
      "provisioner.device.sync": {
        apiRoot: monster.config.api.provisioner,
        url: "v2/accounts/{accountId}/devices/{deviceId}/sync",
        verb: "POST",
      },
      "provisioner.device_dialplan.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/dialplan",
        verb: "GET",
      },
      "provisioner.device_dialplan.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/dialplan",
        verb: "POST",
      },
      "provisioner.device_dialplan.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/dialplan",
        verb: "DELETE",
      },
      // DSS keys setting
      "provisioner.device_dsskeys.list": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/keys",
        verb: "GET",
      },
      "provisioner.device_dsskeys.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/keys",
        verb: "POST",
      },
      "provisioner.device_dsskeys.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/resetdevkeys",
        verb: "DELETE",
      },
      "provisioner.device_group.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/group",
        verb: "POST",
      },
      "provisioner.device_group.get": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/group",
        verb: "GET",
      },
      "provisioner.device_group.delete": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/{mac_address}/group",
        verb: "DELETE",
      },
      "provisioner.device_dsskeys_group.set": {
        apiRoot: monster.config.api.provisioner,
        url: "api/{accountId}/keys/{groupname}",
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
      $template.find('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        const target = $(e.target).attr("href");
        if (target === "#devices") {
          self.loadLogEvents(); // ✅ Now it's visible
        }
      });
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

        // const formattedJSON = JSON.stringify(data, null, 2);
        const $customConfig = $(
          self.getTemplate({
            name: "customconfig",
            data: { custom_config: "" }, // keep template logic intact
          })
        );

        $(".custom-config").empty().append($customConfig);

        // Render tree into the proper container
        const $treeContainer = $("#custom-config-show").empty();
        self.renderExpandableJSON(data, $treeContainer);

        // const tree = jsonview.create(formattedJSON);
        // jsonview.render(tree, document.querySelector(".custom-config"));

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

        self.getGroups(function (groupsData) {
          const groups = Object.entries(groupsData).map(([key, group]) => ({
            id: key,
            name: group.name || key,
          }));

          const $group = $("#config-group");
          $group.empty().append(`<option value="">Select group</option>`);

          groups.forEach((group) => {
            $group.append(`<option value="${group.id}">${group.name}</option>`);
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
          self.deleteallCustomConfig();
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

      self.getGroups(function (groupsData) {
        console.log(groupsData);
        const groupedDevices = [];

        // Flatten groups and sub_members
        Object.keys(groupsData).forEach((groupName) => {
          const group = groupsData[groupName];
          const combinedMembers = [
            ...(group.members || []),
            ...(group.sub_members || []),
          ];
          combinedMembers.forEach((device) => {
            if (device.mac && device.brand && device.family && device.model) {
              groupedDevices.push({
                id: device.id || device.mac, // fallback to MAC as ID
                name: device.name || "",
                mac_address: device.mac,
                group: groupName,
              });
            }
          });
        });

        const grouped = _.groupBy(groupedDevices, "group");

        const $deviceTable = $(
          self.getTemplate({
            name: "devicesetting",
            data: { groupedDevices: grouped },
          })
        );

        $(".device-table").empty().append($deviceTable);

        // Rebind buttons
        $(".device-details").on("click", function () {
          const mac = $(this).data("mac");
          const device = groupedDevices.find((d) => d.mac_address === mac);
          if (device) self.showDeviceDetails(device);
        });

        $(".dss-keys").on("click", function () {
          const mac = $(this).data("mac");
          self.getDSSKeys(mac);
        });

        $(".unlock-device").on("click", function () {
          const mac = $(this).data("mac");
          self.removeDeviceLock(mac);
        });

        $(".check-sync").on("click", function () {
          const deviceId = $(this).data("id");
          self.sendDeviceSync(deviceId);
        });
      });
    },

    loadDeviceActions: function () {
      var self = this;
      $(".device-actions-buttons").html("<p>Device actions will load here</p>");
    },

    // loadLogEvents: function () {
    //   var self = this;
    //   $(".log-events").html("<p>Log events will load here</p>");
    // },

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

        $("#add-phone-model-form").on("click", function () {
          const $form = $(".phone-model-form").first().clone(true);

          // Clear all input values in the cloned form
          $form.find("input").val("");
          $(".phone-model-forms").append($form);
        });

        $("#phone-model-update-button").on("click", function () {
          $(".phone-model-form").each(function () {
            const $form = $(this);

            const getVal = (id) =>
              $form.find(`#${id}`).val()?.trim() || undefined;
            const getIntVal = (id) => {
              const val = parseInt($form.find(`#${id}`).val(), 10);
              return isNaN(val) ? undefined : val;
            };

            const upgrades = [];
            $form.find(".upgrade-entry").each(function () {
              const from = $(this).find(".upgrade-from").val().trim();
              const to = $(this).find(".upgrade-to").val().trim();
              if (from && to) upgrades.push({ from, to });
            });

            const firmwareVersion = getVal("firmware_version");
            const firmwareSection =
              firmwareVersion || upgrades.length
                ? { version: firmwareVersion, upgrades }
                : undefined;

            const modelData = {
              brand: getVal("brand"),
              family: getVal("family"),
              model: getVal("model"),
              settings: {
                user_agent: getVal("user_agent"),
                template_file: getVal("template_file"),
                token_use_limit: getIntVal("token_use_limit"),
                provisioning_protocol: getVal("provisioning_protocol"),
                content_type: getVal("content_type"),
                combo_keys: { quantity: getIntVal("combo_keys") },
                feature_keys: { quantity: getIntVal("feature_keys") },
                voicemail_code: getVal("voicemail_code"),
                firmware: firmwareSection,
              },
            };

            console.log("Sending modelData:", modelData);
            self.addPhoneModel(modelData);
          });
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

    deleteallCustomConfig: function () {
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

    deleteCustomConfig: function (brand, family, model) {
      var self = this;

      self.getCustomConfig(function (config) {
        if (
          config[brand] &&
          config[brand][family] &&
          config[brand][family][model]
        ) {
          delete config[brand][family][model];

          // Clean up empty parent levels if needed
          if (Object.keys(config[brand][family]).length === 0) {
            delete config[brand][family];
          }
          if (Object.keys(config[brand]).length === 0) {
            delete config[brand];
          }

          self.setCustomConfig(config);
        } else {
          monster.ui.alert("Model config not found.");
        }
      });
    },

    // getGroups: function (callback) {
    //   var self = this;

    //   monster.request({
    //     resource: "provisioner.account_groups.list",
    //     data: {
    //       accountId: self.accountId,
    //     },
    //     success: function (res) {
    //       console.log("Groups Raw Data:", res.data);

    //       // Convert object of groups into an array
    //       const groupsObject = res.data;
    //       const groups = Object.keys(groupsObject).map((key) => ({
    //         id: key,
    //         name: groupsObject[key].name || key,
    //       }));

    //       callback(groups);
    //     },
    //     error: function (res) {
    //       monster.ui.alert("Failed to get groups.");
    //       callback([]);
    //     },
    //   });
    // },

    getGroups: function (callback) {
      var self = this;

      monster.request({
        resource: "provisioner.account_groups.list",
        data: {
          accountId: self.accountId,
        },
        success: function (res) {
          callback(res.data);
        },
        error: function () {
          monster.ui.alert("Failed to get groups.");
          callback({});
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
        resource: "provisioner.phonemodels.update",
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
          console.log(devices);
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

    getDeviceCustomConfig: function (macAddress, callback) {
      var self = this;

      monster.request({
        resource: "provisioner.device_custom_config.list",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function (response) {
          // console.log(response);
          if (callback) callback(response);
        },
        error: function (error) {
          monster.ui.alert("Failed to retrieve custom config.");
          console.error(error);
        },
      });
    },

    addDeviceCustomConfig: function (macAddress, configData) {
      var self = this;

      monster.request({
        resource: "provisioner.device_custom_config.add",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
          data: configData,
        },
        success: function (response) {
          monster.ui.alert("Custom config updated successfully.");
          // console.log(response);
        },
        error: function (error) {
          // console.log(data);
          monster.ui.alert("Failed to update custom config.");
          console.error(error);
        },
      });
    },

    deleteDeviceCustomConfig: function (macAddress) {
      var self = this;

      monster.request({
        resource: "provisioner.device_custom_config.delete",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function (response) {
          monster.ui.alert("Custom config deleted successfully.");
          // console.log(response);
        },
        error: function (error) {
          monster.ui.alert("Failed to delete custom config.");
          console.error(error);
        },
      });
    },

    showDeviceDetails: function (device) {
      var self = this;

      self.getDeviceDialplan(device.mac_address, function (dialplanSettings) {
        const $modal = $(
          self.getTemplate({
            name: "deviceDetailsModal",
            data: {
              deviceType: device.device_type,
              name: device.name,
              macAddress: device.mac_address,
              ownerName: device.username,
              enabled: device.enabled,
              customConfig: device.customConfig || {},
              dialplan: dialplanSettings || {},
            },
          })
        );

        $("body").append($modal);

        // Custom config
        self.getDeviceCustomConfig(device.mac_address, function (response) {
          const config = response.data || {};
          const filteredConfig = {};

          Object.entries(config).forEach(([key, value]) => {
            if (typeof value !== "object" || value === null) {
              filteredConfig[key] = value;
            }
          });

          const $customConfigWrapper = $("<div>").append(
            "<h3>Custom Config</h3>"
          );
          const $configFields = $('<div class="config-fields">');

          Object.entries(filteredConfig).forEach(([key, value]) => {
            const $pair = $(`
              <div class="config-pair" style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <label>Key:</label>
                <input type="text" class="config-key" value="${key}" style="flex: 1" readonly />
                <label>Value:</label>
                <input type="text" class="config-value" value="${value}" style="flex: 1" readonly />
              </div>
            `);
            $configFields.append($pair);
          });

          if (Object.keys(filteredConfig).length === 0) {
            $configFields.append("<div>No Custom Config</div>");
          }

          $customConfigWrapper.append($configFields);
          $modal
            .find(".custom-config-container")
            .empty()
            .append($customConfigWrapper);
        });

        // Add/Remove custom config rows
        $modal.on("click", "#add-config-pair", function () {
          const html = `
            <div class="config-pair" style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
              <label>Key:</label>
              <input type="text" class="config-key" placeholder="Key" style="flex: 1;" />
              <label>Value:</label>
              <input type="text" class="config-value" placeholder="Value" style="flex: 1;" />
              <button type="button" class="remove-pair" style="background: #e74c3c; color: white; border: none; padding: 4px 8px; cursor: pointer;">🗑</button>
            </div>`;
          $modal.find(".config-fields.dynamic").append($(html));
        });

        $modal.on("click", ".remove-pair", function () {
          $(this).closest(".config-pair").remove();
        });

        $modal.on("click", "#submit-custom-config", function () {
          const config = {};
          let valid = true;

          $modal.find(".config-pair").each(function () {
            const key = $(this).find(".config-key").val().trim();
            const value = $(this).find(".config-value").val().trim();
            if (key && value) {
              config[key] = value;
            } else {
              valid = false;
            }
          });

          if (!valid) {
            monster.ui.alert("Please fill out all key and value fields.");
            return;
          }

          self.addDeviceCustomConfig(device.mac_address, config);
        });

        $modal.on("click", "#delete-custom-config", function () {
          self.deleteDeviceCustomConfig(device.mac_address);
        });

        // Device password
        self.getmacDevicePassword(device.mac_address, function (password) {
          const $passwordSection = $modal.find(".device-password-section");

          const passwordHtml = `
            ${
              password
                ? `
              <div id="devicepassword" class="devicepassword-entry" style="margin-bottom: 10px;">
                <strong>Current Password:</strong> ${password}
                <i class="fa fa-remove devicepassword-delete" style="cursor: pointer; margin-left: 10px;" title="Delete Password"></i>
              </div>`
                : `<div><em>No password set</em></div>`
            }
            <div style="margin-top: 10px;">
              <input id="devicepassword-set-input" type="text" placeholder="NewPa$$w0rD" class="form-control" />
              <button id="macdevicepassword-set-button" class="btn btn-primary" style="margin-top: 5px;">Set Password</button>
            </div>`;

          $passwordSection.html(passwordHtml);

          $modal
            .find("#macdevicepassword-set-button")
            .off("click")
            .on("click", function () {
              const newPassword = $modal
                .find("#devicepassword-set-input")
                .val()
                .trim();
              if (newPassword.length >= 3) {
                self.setmacDevicePassword(device.mac_address, newPassword);
              } else {
                monster.ui.alert(
                  "Password too short. Must be at least 3 characters."
                );
              }
            });

          $modal.on("click", ".devicepassword-delete", function () {
            self.deletemacDevicePassword(device.mac_address);
            $modal.remove();
          });
        });

        // Device Dialplan logic already fetched — just bind actions
        $modal.on("click", "#set-device-dialplan", function () {
          const digitMap = $modal.find("#dialplan-digitmap").val().trim();
          const dialDelay = parseInt($modal.find("#dialplan-delay").val(), 10);

          self.setDeviceDialplan(device.mac_address, {
            digit_map: digitMap,
            dial_delay: dialDelay,
          });
        });

        $modal.on("click", "#delete-device-dialplan", function () {
          self.deleteDeviceDialplan(device.mac_address);
        });

        self.getDeviceGroup(device.mac_address, function (groupData) {
          let group = "",
            subgroup = "";
          if (typeof groupData === "string") {
            group = groupData;
          } else if (typeof groupData === "object") {
            group = groupData.group || "";
            subgroup = groupData.subgroup || "";
          }

          $modal.find("#device-group").val(group);
          $modal.find("#device-subgroup").val(subgroup);

          $modal
            .find("#device-group-status")
            .html(
              `Current Group: <strong>${group || "(none)"}</strong><br>` +
                `Subgroup: <strong>${subgroup || "(none)"}</strong>`
            );
        });

        $modal.on("click", "#set-device-group", function () {
          const group = $modal.find("#device-group").val().trim();
          const subgroup = $modal.find("#device-subgroup").val().trim();
          if (!group) {
            monster.ui.alert("Group is required.");
            return;
          }

          self.setDeviceGroup(device.mac_address, group, subgroup);
        });

        // Delete Device Group
        $modal.on("click", "#delete-device-group", function () {
          self.deleteDeviceGroup(device.mac_address);
          $modal.find("#device-group-status").text("Group deleted.");
        });

        $modal.on("click", "#close-modal", function () {
          $modal.remove();
        });
      });
    },

    setmacDevicePassword: function (macAddress, password) {
      var self = this;
      monster.request({
        resource: "provisioner.macdevice_password.set",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
          data: {
            password: password,
          },
        },
        success: function (response) {
          monster.ui.alert("Device password set successfully.");
        },
        error: function (error) {
          monster.ui.alert("Failed to set device password.");
          console.error(error);
        },
      });
    },

    getmacDevicePassword: function (macAddress, callback) {
      var self = this;

      monster.request({
        resource: "provisioner.macdevice_password.get",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function (response) {
          const password = response.data || null; // Safe access
          callback(password);
        },
        error: function (error) {
          monster.ui.alert("Failed to get device password.");
          console.error(error);
        },
      });
    },

    deletemacDevicePassword: function (macAddress) {
      var self = this;

      monster.request({
        resource: "provisioner.macdevice_password.delete",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function (response) {
          monster.ui.alert("Device password deleted.");
        },
        error: function (error) {
          monster.ui.alert("Failed to delete device password.");
          console.error(error);
        },
      });
    },

    sendDeviceSync: function (deviceId) {
      var self = this;

      self.callApi({
        resource: "device.restart",
        data: {
          accountId: self.accountId,
          deviceId: deviceId,
        },
        success: function () {
          monster.ui.alert("Check-Sync sent to device successfully.");
        },
        error: function () {
          monster.ui.alert("Failed to send Check-Sync to device.");
        },
      });
    },

    getDeviceDialplan: function (macAddress, callback) {
      var self = this;

      monster.request({
        resource: "provisioner.device_dialplan.get",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function (res) {
          callback(res.data || {});
        },
        error: function () {
          monster.ui.alert("Failed to fetch device dialplan.");
          callback({});
        },
      });
    },

    setDeviceDialplan: function (macAddress, settings) {
      var self = this;

      monster.request({
        resource: "provisioner.device_dialplan.set",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
          data: settings,
        },
        success: function () {
          monster.ui.alert("Device dialplan updated successfully.");
        },
        error: function () {
          monster.ui.alert("Failed to update device dialplan.");
        },
      });
    },

    deleteDeviceDialplan: function (macAddress) {
      var self = this;

      monster.request({
        resource: "provisioner.device_dialplan.delete",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function () {
          monster.ui.alert("Device dialplan deleted.");
        },
        error: function () {
          monster.ui.alert("Failed to delete device dialplan.");
        },
      });
    },

    getDSSKeys: function (macAddress) {
      var self = this;

      const dssTypes = [
        "",
        "line",
        "presence",
        "parking",
        "speed_dial",
        "blf",
        "url",
        "mwi",
        "dtmf",
        "transfer",
        "hold",
        "dnd",
        "record",
        "page",
        "ringgroup",
        "queueagent",
      ];

      monster.request({
        resource: "provisioner.device_dsskeys.list",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function (res) {
          const keys = Object.values(res.data.combo_keys || {});
          const $modal = $(
            monster.template(self, "dsskeysModal", {
              macAddress,
              keys,
              dssTypes,
            })
          );

          $("body").append($modal);

          // Add DSS Row
          $modal.on("click", "#add-dss-row", function () {
            const typeOptions = dssTypes
              .map((type) => `<option value="${type}">${type}</option>`)
              .join("");

            const rowHtml = `
              <div class="dss-key-row" style="margin-bottom: 16px">
                <div class="form-row">
                  <label>Position:</label>
                  <input type="number" class="dss-position" min="0" max="18" />
                </div>
                <div class="form-row">
                  <label>Type:</label>
                  <select class="dss-type">
                    ${dssTypes
                      .map((type) => `<option value="${type}">${type}</option>`)
                      .join("")}
                  </select>
                </div>
                <div class="form-row">
                  <label>Label:</label>
                  <input type="text" class="dss-label" />
                </div>
                <div class="form-row">
                  <label>Value:</label>
                  <input type="text" class="dss-value" />
                </div>
                <div class="form-row">
                  <label>User ID:</label>
                  <input type="text" class="dss-user-id" />
                </div>
                <button type="button" class="remove-dss-row btn btn-link">🗑</button>
              </div>
            `;

            $("#dss-keys-container").append(rowHtml);
          });

          // Remove DSS Row
          $modal.on("click", ".remove-dss-row", function () {
            $(this).closest(".dss-key-row").remove();
          });

          // Save DSS Keys
          $modal.on("click", "#save-dss-keys", function () {
            self.setDSSKeys(macAddress, $modal);
          });

          // Delete All
          $modal.on("click", "#delete-all-dss-keys", function () {
            if (
              confirm(
                "Are you sure you want to delete all DSS keys for this device?"
              )
            ) {
              self.removeDSSKeys(macAddress);
              $modal.remove();
            }
          });

          // Close
          $modal.on("click", ".close-dss-modal", function () {
            $modal.remove();
          });
        },
        error: function () {
          monster.ui.alert("Failed to fetch DSS keys.");
        },
      });
    },

    setDSSKeys: function (macAddress, $modal) {
      var self = this;
      const comboKeys = [];

      $modal.find(".dss-key-row").each(function () {
        const row = $(this);
        const key = {
          position: parseInt(row.find(".dss-position").val(), 10),
          type: row.find(".dss-type").val().trim(),
          label: row.find(".dss-label").val().trim(),
          value: row.find(".dss-value").val().trim(),
          user_id: row.find(".dss-user-id").val().trim(),
        };

        if (!isNaN(key.position) && key.type) {
          comboKeys.push(key);
        }
      });

      monster.request({
        resource: "provisioner.device_dsskeys.set",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
          data: { combo_keys: comboKeys },
        },
        success: function () {
          monster.ui.toast({ type: "success", message: "DSS Keys saved." });
          $modal.remove();
        },
        error: function () {
          monster.ui.alert("Failed to save DSS keys.");
        },
      });
    },

    removeDSSKeys: function (macAddress) {
      var self = this;

      monster.request({
        resource: "provisioner.device_dsskeys.delete",
        data: {
          accountId: self.accountId,
          mac_address: macAddress,
        },
        success: function () {
          monster.ui.toast({
            type: "success",
            message: "All DSS keys removed.",
          });
          $("#refresh").click();
        },
        error: function () {
          monster.ui.alert("Failed to remove DSS keys.");
        },
      });
    },

    getDeviceGroup: function (mac, callback) {
      var self = this;

      monster.request({
        resource: "provisioner.device_group.get",
        data: {
          accountId: self.accountId,
          mac_address: mac,
        },
        success: function (res) {
          if (callback) callback(res.data);
        },
        error: function () {
          monster.ui.alert("Failed to retrieve group.");
          if (callback) callback({});
        },
      });
    },

    setDeviceGroup: function (mac, group, subgroup) {
      var self = this;

      monster.request({
        resource: "provisioner.device_group.set",
        data: {
          accountId: self.accountId,
          mac_address: mac,
          data: {
            group: group,
            subgroup: subgroup || undefined,
          },
        },
        success: function () {
          monster.ui.toast({
            type: "success",
            message: "Device group set successfully.",
          });
        },
        error: function () {
          monster.ui.alert("Failed to set device group.");
        },
      });
    },

    deleteDeviceGroup: function (mac) {
      var self = this;

      monster.request({
        resource: "provisioner.device_group.delete",
        data: {
          accountId: self.accountId,
          mac_address: mac,
        },
        success: function () {
          monster.ui.toast({
            type: "success",
            message: "Device group deleted.",
          });
        },
        error: function () {
          monster.ui.alert("Failed to delete device group.");
        },
      });
    },

    setGroupDSSKeys: function (groupName, dssKeysData) {
      var self = this;

      monster.request({
        resource: "provisioner.device_dsskeys_group.set",
        data: {
          accountId: self.accountId,
          groupname: groupName,
          data: dssKeysData,
        },
        success: function () {
          monster.ui.alert(
            `DSS Keys set successfully for group "${groupName}".`
          );
        },
        error: function (err) {
          console.error(err);
          monster.ui.alert("Failed to set DSS keys for group.");
        },
      });
    },

    loadLogEvents: function () {
      var self = this;

      // const $logsContainer = $(`
      //   <div class="logs-wrapper">
      //     <h4>Live Device Logs</h4>
      //     <div class="logs-data" style="max-height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background: #f9f9f9;"></div>
      //   </div>
      // `);

      // $(".log-events").empty().append($logsContainer);
      $(".log-events").empty().append(`
        <div class="log-header" style="display: flex; gap: 12px; font-weight: bold; border-bottom: 2px solid #ccc; padding-bottom: 6px; font-family: monospace;">
          <div style="flex: 0 0 160px;">Timestamp</div>
          <div style="flex: 0 0 120px;">MAC</div>
          <div style="flex: 0 0 280px;">Event Type</div>
          <div style="flex: 0 0 100px;">Status</div>
          <div style="flex: 1;">Preview</div>
        </div>
      `);
      $(".log-events").append(`<div class="log-entries"></div>`);

      const wsurl = `wss://p.4x5.co/api/${self.accountId}/socket`;
      console.log("🔌 Connecting to WebSocket:", wsurl);
      const socket = new WebSocket(wsurl);

      socket.onopen = function () {
        console.log("✅ WebSocket connected");
        const authPayload = {
          type: "auth",
          data: monster.util.getAuthToken(),
        };
        console.log("🔐 Sending auth:", authPayload);
        socket.send(JSON.stringify(authPayload));
      };

      socket.onmessage = function (event) {
        try {
          const msg = JSON.parse(event.data);
          console.log(msg);
          if (msg.type === "log") {
            self.appendLogToUI(msg.data);
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message", err);
        }
      };

      socket.onerror = function (err) {
        console.error("WebSocket error:", err);
      };

      socket.onclose = function () {
        console.warn("WebSocket connection closed.");
      };

      // Optional: Keep reference if needed
      self._logSocket = socket;
    },

    appendLogToUI: function (log) {
      const $logsData = $(".log-entries");

      const id = log.id || log.device_details?.mac || log.timestamp;
      let mac = log.device_details?.mac || log.path?.split("/")[4] || "";
      mac = mac.length === 12 ? mac : "unknown";
      const eventType = log.event_type || "unknown";
      const status = log.event_status || "";
      const timestamp = new Date(log.timestamp).toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const body = `Path: ${log.path || ""}\nMethod: ${
        log.method || ""
      }\nUser-Agent: ${log.user_agent || ""}`;
      const preview =
        body.substring(0, 80).replace(/\n/g, " ") +
        (body.length > 80 ? "..." : "");
      const logId = `log-${id}`.replace(/[^a-zA-Z0-9_-]/g, "_");

      const html = `
    <div class="log-entry" id="${logId}" style="border-bottom: 1px solid #eee; cursor: pointer; padding: 6px 0;">
      <div class="log-summary" style="display: flex; gap: 12px; font-family: monospace;">
        <div style="flex: 0 0 160px;">${timestamp}</div>
        <div style="flex: 0 0 120px;">${mac}</div>
        <div style="flex: 0 0 280px;">${eventType}</div>
        <div style="flex: 0 0 100px;">${status}</div>
        <div style="flex: 1;">"${preview}"</div>
      </div>
      <pre class="log-details" style="display:none; background: #f9f9f9; padding: 8px; margin-top: 4px; font-family: monospace;">
      Timestamp: ${timestamp}
      MAC: ${mac}
      Event Type: ${eventType}
      Status: ${status}
      Path: ${log.path || ""}
      Method: ${log.method || ""}
      User-Agent: ${log.user_agent || ""}
      </pre>
    </div>
  `;

      const $existing = $(`#${logId}`);
      const $entry = $(document.createElement("div")).html(html).children();

      if ($existing.length > 0) {
        $existing.replaceWith($entry);
      } else {
        $logsData.prepend($entry);
      }

      $entry.find(".log-summary").on("click", function () {
        $entry.find(".log-details").slideToggle(150);
      });

      if ($logsData.children().length > 100) {
        $logsData.children().last().remove();
      }
    },

    renderExpandableJSON: function (obj, container, path = []) {
      const self = this;
      const ul = $("<ul>").css({
        "list-style-type": "none",
        paddingLeft: "16px",
      });

      Object.entries(obj).forEach(([key, value]) => {
        const li = $("<li>");

        if (typeof value === "object" && value !== null) {
          const toggle = $("<span>").text("▸ ").css("cursor", "pointer");
          const keySpan = $("<strong>").text(key + ": ");
          const nestedContainer = $("<div>").hide();

          toggle.on("click", function () {
            nestedContainer.toggle();
            toggle.text(nestedContainer.is(":visible") ? "▾ " : "▸ ");
          });

          li.append(toggle, keySpan);

          if (path.length === 2) {
            const [brand, family] = path;
            const deleteBtn = $("<span>")
              .text("🗑")
              .css({ color: "red", cursor: "pointer", marginLeft: "8px" })
              .on("click", function () {
                self.deleteCustomConfig(brand, family, key);
              });
            li.append(deleteBtn);
          }

          self.renderExpandableJSON(value, nestedContainer, [...path, key]);
          li.append(nestedContainer);
        } else {
          li.html(`<strong>${key}:</strong> ${value}`);
        }

        ul.append(li);
      });

      container.append(ul);
    },

    ////////////////////////////////////////////////////////
  };

  return app;
});
