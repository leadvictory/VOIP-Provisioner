/**
 * This file lets you connect your different backend services to Monster UI and
 * exposes other settings like whitelabeling that can be set for the entire UI.
 *
 * This minimal, working example is designed to get you up and running in no
 * time when Monster UI is installed on the same server running Kazoo and the
 * APIs are accessible at the default location (`:8000/v2/`).
 *
 * If that is not the case, you will need to hook up your Kazoo server with the
 * `api.'default'` property and you should be good to go.
 *
 * For a full list and description of configurable options, head over to:
 * https://docs.2600hz.com/ui/docs/configuration/
 */
define({
	api: {
		//provisioner: 'https://4x5.co:1443/api/',
		provisioner: 'https://p.4x5.co/',
		//provisioner: 'https://prv.ruel.im/',
		//socket: 'wss://harrier.ruhnet.net:7777',
		socket: 'wss://ws.4x5.co:7777',
		socketWebphone: 'wss://ws.4x5.co:5065',
		texter: 'https://dev.nq.rs/api/v1/',
		//default: 'https://harrier.ruhnet.net:8800/v2/'
		default: 'https://api.4x5.co:8443/v2/'
	},

	switchboard: {
		features: {
			transfer: true, //BETA
			callflow: true, //ALPHA
			block: true,
			park: true,    //NON-WORKING - uses transfer, which doesn't work correctly with Konami and non-user/device transfers
			pickup: true,
			retrieve: true,
			metaflowAutoCreation: true, //a metaflow (of some sort) is required for transfer to work.
		},
	},

	paths: {
		'hljs': 'js/vendor/highlight.pack',
		'bootstraptour': 'js/vendor/bootstrap-tour.min',
	},
	advancedView: true,
	disableBraintree: true,
	whitelabel: {
		companyName: 'RuhNet VoIP',
		applicationTitle: 'RuhNet VoIP UI',
		domain: '4x5.co',
		//announcement: 'YO BOZO Thanks for logging in. Read our new terms and conditions.',
		callReportEmail: 'support@4x5.co',
		social: ['twitter'],
		nav: {
			help: 'http://wiki.2600hz.com'
		},
		allowAnyOwnedNumberAsCallerID: true,
		brandColor: '#CC0044',
		logoPath: 'logos/logo.png',
		custom_welcome_message: 'Solid communications platform for YOUR business.',
		hide_powered: true,
		//This will render apploader as dropdown instead of page.
		//useDropdownApploader: true,
		choices: ['RuhNet Carrier', 'Telnyx', 'AnveoDirect'],
		logoutTimer: 300,
		port: {
			loa: 'http://ui.zswitch.net/Editable.LOA.Form.pdf',
			resporg: 'http://ui.zswitch.net/Editable.Resporg.Form.pdf'
		}
	}
});
