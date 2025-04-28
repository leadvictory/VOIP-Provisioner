# RuhNet Provisioner Control for Monster-UI

This app allows you to control the RuhNet Provisioner for Kazoo.

You can add/update phone models and provisioner settings.

## Installation
Clone the repository to your Monster UI apps directory (often /var/www/html/monster-ui/apps, but may be different on your system). Then you may register the app on KAZOO with a sup command (with your specific Crossbar API location):

```bash
cd /var/www/html/monster-ui/apps

git clone https://github.com/ruhnet/monster-ui-ruhnet-provisioner provisioner

sup crossbar_maintenance init_app '/var/www/html/monster-ui/apps/provisioner' \
'http://mycrossbarapi.tld:8000/v2'
```

![Provisioner Screen](https://github.com/ruhnet/monster-ui-ruhnet-provisioner/raw/master/metadata/screenshots/Provisioner.png)

